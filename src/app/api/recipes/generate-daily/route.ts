import { NextRequest, NextResponse } from "next/server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import Anthropic from "@anthropic-ai/sdk"

// Initialize S3 client for Minio (fallback)
const s3Client = new S3Client({
  region: "us-east-1",
  endpoint: process.env.MINIO_ENDPOINT,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY || "",
    secretAccessKey: process.env.MINIO_SECRET_KEY || "",
  },
  forcePathStyle: true,
})

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY || ""
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || ""
const CRON_SECRET = process.env.CRON_SECRET || process.env.REVALIDATE_SECRET || ""

// Diet definitions with Spoonacular mappings
const DIETS = [
  { id: "vegano", name: "Vegano", spoonacularDiet: "vegan", spoonacularIntolerances: "" },
  { id: "vegetariano", name: "Vegetariano", spoonacularDiet: "vegetarian", spoonacularIntolerances: "" },
  { id: "sin-lactosa", name: "Sin Lactosa", spoonacularDiet: "", spoonacularIntolerances: "dairy" },
  { id: "organico", name: "Orgánico", spoonacularDiet: "whole30", spoonacularIntolerances: "" },
  { id: "sin-azucar", name: "Sin Azúcar", spoonacularDiet: "", spoonacularIntolerances: "", maxSugar: 5 },
  { id: "paleo", name: "Paleo", spoonacularDiet: "paleo", spoonacularIntolerances: "" },
  { id: "sin-gluten", name: "Sin Gluten", spoonacularDiet: "gluten free", spoonacularIntolerances: "gluten" },
  { id: "keto", name: "Keto", spoonacularDiet: "ketogenic", spoonacularIntolerances: "" },
]

interface Product {
  id: string
  title: string
  handle: string
  thumbnail?: string
  tags?: Array<{ value: string }>
  variants?: Array<{ id: string; calculated_price?: { calculated_amount: number } }>
}

interface RecipeProduct {
  id: string
  variantId: string
  title: string
  handle: string
  thumbnail?: string
  quantity: string
  price?: number
}

interface NutritionInfo {
  calories: number
  carbs: number
  protein: number
  fat: number
  fiber?: number
}

// Updated Recipe interface with multiple diets
interface Recipe {
  id: string
  title: string
  description: string
  image?: string
  sourceUrl?: string
  diets: string[]      // Multiple diet IDs
  dietNames: string[]  // Multiple diet display names
  prepTime: string
  cookTime: string
  servings: number
  difficulty: "Fácil" | "Medio" | "Difícil"
  ingredients: string[]
  instructions: string[]
  products: RecipeProduct[]
  nutrition: NutritionInfo
  tips?: string
  spoonacularId: number
  generatedAt: string
}

interface SpoonacularRecipe {
  id: number
  title: string
  image: string
  sourceUrl: string
  readyInMinutes: number
  preparationMinutes?: number
  cookingMinutes?: number
  servings: number
  summary: string
  vegan?: boolean
  vegetarian?: boolean
  glutenFree?: boolean
  dairyFree?: boolean
  veryHealthy?: boolean
  lowFodmap?: boolean
  extendedIngredients: Array<{
    original: string
    name: string
  }>
  analyzedInstructions: Array<{
    steps: Array<{
      step: string
    }>
  }>
  nutrition?: {
    nutrients: Array<{
      name: string
      amount: number
      unit: string
    }>
  }
}

// Try to call the Medusa backend to generate recipes
async function tryGenerateViaBackend(secret: string): Promise<{ success: boolean; data?: any }> {
  try {
    const backendUrl = process.env.MEDUSA_BACKEND_URL || "https://api.nutrimercados.com"

    const response = await fetch(`${backendUrl}/admin/recipes/generate?secret=${secret}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${secret}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      return { success: true, data }
    }

    console.log("Backend recipe generation not available, falling back to frontend...")
    return { success: false }
  } catch (error) {
    console.log("Backend recipe generation failed, falling back to frontend:", error)
    return { success: false }
  }
}

async function fetchProducts(): Promise<Product[]> {
  const backendUrl = process.env.MEDUSA_BACKEND_URL || "https://api.nutrimercados.com"
  const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

  const response = await fetch(
    `${backendUrl}/store/products?limit=200&fields=*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags`,
    {
      headers: {
        "x-publishable-api-key": publishableKey || "",
      },
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }

  const data = await response.json()
  return data.products || []
}

// Determine which diets a recipe is compatible with
function getCompatibleDiets(recipe: SpoonacularRecipe): { ids: string[], names: string[] } {
  const ids: string[] = []
  const names: string[] = []

  // Check Spoonacular flags
  if (recipe.vegan) {
    ids.push("vegano")
    names.push("Vegano")
  }
  if (recipe.vegetarian && !recipe.vegan) {
    ids.push("vegetariano")
    names.push("Vegetariano")
  }
  if (recipe.glutenFree) {
    ids.push("sin-gluten")
    names.push("Sin Gluten")
  }
  if (recipe.dairyFree) {
    ids.push("sin-lactosa")
    names.push("Sin Lactosa")
  }

  // Check nutrition for keto (low carb, high fat)
  const nutrients = recipe.nutrition?.nutrients || []
  const carbs = nutrients.find(n => n.name.toLowerCase() === "carbohydrates")?.amount || 0
  const fat = nutrients.find(n => n.name.toLowerCase() === "fat")?.amount || 0
  const sugar = nutrients.find(n => n.name.toLowerCase() === "sugar")?.amount || 0

  if (carbs < 20 && fat > 15) {
    ids.push("keto")
    names.push("Keto")
  }

  if (sugar < 5) {
    ids.push("sin-azucar")
    names.push("Sin Azúcar")
  }

  // If no specific diet detected, mark as general healthy
  if (ids.length === 0) {
    ids.push("saludable")
    names.push("Saludable")
  }

  return { ids, names }
}

// Common ingredient translations English <-> Spanish
const INGREDIENT_TRANSLATIONS: Record<string, string[]> = {
  // Proteins
  "chicken": ["pollo", "gallina"],
  "beef": ["carne", "res", "ternera"],
  "pork": ["cerdo", "chancho"],
  "fish": ["pescado", "pez"],
  "salmon": ["salmón"],
  "tuna": ["atún"],
  "shrimp": ["camarón", "camarones", "gambas"],
  "egg": ["huevo", "huevos"],
  "eggs": ["huevos", "huevo"],
  // Dairy
  "milk": ["leche"],
  "cheese": ["queso"],
  "butter": ["mantequilla"],
  "cream": ["crema", "nata"],
  "yogurt": ["yogur", "yogurt"],
  // Vegetables
  "tomato": ["tomate"],
  "onion": ["cebolla"],
  "garlic": ["ajo"],
  "pepper": ["pimiento", "pimienta", "ají"],
  "carrot": ["zanahoria"],
  "potato": ["papa", "patata"],
  "spinach": ["espinaca", "espinacas"],
  "broccoli": ["brócoli", "brocoli"],
  "lettuce": ["lechuga"],
  "cucumber": ["pepino"],
  "avocado": ["aguacate", "palta"],
  "corn": ["maíz", "choclo"],
  "beans": ["frijoles", "judías", "porotos"],
  "lentils": ["lentejas"],
  "chickpeas": ["garbanzos"],
  "mushroom": ["champiñón", "hongo", "setas"],
  // Fruits
  "apple": ["manzana"],
  "banana": ["banano", "plátano", "guineo"],
  "orange": ["naranja"],
  "lemon": ["limón"],
  "lime": ["lima", "limón verde"],
  "strawberry": ["fresa", "frutilla"],
  "mango": ["mango"],
  "pineapple": ["piña", "ananá"],
  "coconut": ["coco"],
  // Grains & Carbs
  "rice": ["arroz"],
  "pasta": ["pasta", "fideos"],
  "bread": ["pan"],
  "flour": ["harina"],
  "oats": ["avena"],
  "quinoa": ["quinoa", "quinua"],
  // Nuts & Seeds
  "almond": ["almendra", "almendras"],
  "walnut": ["nuez", "nueces"],
  "peanut": ["maní", "cacahuate"],
  "chia": ["chía"],
  "flax": ["linaza"],
  // Oils & Fats
  "oil": ["aceite"],
  "olive": ["oliva", "aceituna"],
  // Sweeteners
  "sugar": ["azúcar"],
  "honey": ["miel"],
  "stevia": ["stevia", "estevia"],
  // Others
  "salt": ["sal"],
  "vinegar": ["vinagre"],
  "soy": ["soya", "soja"],
  "tofu": ["tofu"],
  "chocolate": ["chocolate", "cacao"],
  "coffee": ["café"],
  "tea": ["té"],
  "cinnamon": ["canela"],
  "ginger": ["jengibre"],
  "turmeric": ["cúrcuma"],
  "protein": ["proteína", "proteina"],
  "powder": ["polvo"],
  "supplement": ["suplemento"],
  "vitamin": ["vitamina"],
  "organic": ["orgánico", "organico"],
  "gluten": ["gluten"],
  "vegan": ["vegano"],
}

// Get search terms for an ingredient (original + translations)
function getSearchTerms(ingredient: string): string[] {
  const terms: string[] = []
  const lowerIngredient = ingredient.toLowerCase()

  // Add original words
  const words = lowerIngredient.split(/\s+/).filter(w => w.length > 3)
  terms.push(...words)

  // Add translations for each word
  for (const word of words) {
    // Check if word is in translations (English key)
    if (INGREDIENT_TRANSLATIONS[word]) {
      terms.push(...INGREDIENT_TRANSLATIONS[word])
    }
    // Check if word is a Spanish translation (reverse lookup)
    for (const [english, spanish] of Object.entries(INGREDIENT_TRANSLATIONS)) {
      if (spanish.some(s => s.includes(word) || word.includes(s))) {
        terms.push(english)
      }
    }
  }

  return [...new Set(terms)] // Remove duplicates
}

// Find matching products from our store based on recipe ingredients
function findMatchingProducts(
  ingredientNames: string[],
  products: Product[],
  dietIds: string[]
): RecipeProduct[] {
  const matchedProducts: RecipeProduct[] = []
  const usedProductIds = new Set<string>()

  // First, try to match products that have any of the diet tags
  const dietProducts = products.filter((p) => {
    const tags = p.tags?.map((t) => t.value.toLowerCase()) || []
    return dietIds.some(dietId => tags.includes(dietId.toLowerCase()))
  })

  // Search for matches in ingredients
  for (const ingredientName of ingredientNames) {
    // Get all search terms (original + translations)
    const searchTerms = getSearchTerms(ingredientName)

    // Try diet-compatible products first, then all products
    const searchPools = [dietProducts, products]

    for (const pool of searchPools) {
      for (const product of pool) {
        if (usedProductIds.has(product.id)) continue

        const productTitle = product.title.toLowerCase()

        // Check if any search term matches the product title
        const hasMatch = searchTerms.some(
          (term) => term.length > 2 && productTitle.includes(term)
        )

        if (hasMatch && product.variants?.[0]) {
          matchedProducts.push({
            id: product.id,
            variantId: product.variants[0].id,
            title: product.title,
            handle: product.handle,
            thumbnail: product.thumbnail,
            quantity: "1 unidad",
            price: product.variants[0].calculated_price?.calculated_amount,
          })
          usedProductIds.add(product.id)

          if (matchedProducts.length >= 4) {
            return matchedProducts
          }
          break
        }
      }
    }
  }

  return matchedProducts
}

function getDifficulty(readyInMinutes: number): "Fácil" | "Medio" | "Difícil" {
  if (readyInMinutes <= 30) return "Fácil"
  if (readyInMinutes <= 60) return "Medio"
  return "Difícil"
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").trim()
}

// Translate recipe content to Spanish using Claude
async function translateRecipeToSpanish(recipe: {
  title: string
  description: string
  ingredients: string[]
  instructions: string[]
}): Promise<{
  title: string
  description: string
  ingredients: string[]
  instructions: string[]
  tips?: string
}> {
  if (!ANTHROPIC_API_KEY) {
    console.log("No Anthropic API key, skipping translation")
    return { ...recipe }
  }

  try {
    const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY })

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: `Traduce esta receta al español colombiano de forma natural y fluida. Responde SOLO con JSON válido, sin explicaciones adicionales.

Receta en inglés:
- Título: ${recipe.title}
- Descripción: ${recipe.description}
- Ingredientes: ${JSON.stringify(recipe.ingredients)}
- Instrucciones: ${JSON.stringify(recipe.instructions)}

Responde con este formato JSON exacto:
{
  "title": "título traducido",
  "description": "descripción traducida (máximo 200 caracteres)",
  "ingredients": ["ingrediente 1", "ingrediente 2", ...],
  "instructions": ["paso 1", "paso 2", ...],
  "tips": "un consejo útil opcional para esta receta"
}`
        }
      ]
    })

    const content = response.content[0]
    if (content.type === "text") {
      // Parse JSON response
      const jsonMatch = content.text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const translated = JSON.parse(jsonMatch[0])
        return {
          title: translated.title || recipe.title,
          description: translated.description || recipe.description,
          ingredients: translated.ingredients || recipe.ingredients,
          instructions: translated.instructions || recipe.instructions,
          tips: translated.tips,
        }
      }
    }
  } catch (error) {
    console.error("Translation error:", error)
  }

  return { ...recipe }
}

// Fetch random recipes from Spoonacular (not diet-specific to get variety)
async function fetchRandomRecipes(count: number = 40): Promise<SpoonacularRecipe[]> {
  const params = new URLSearchParams({
    apiKey: SPOONACULAR_API_KEY,
    number: String(count),
    addRecipeNutrition: "true",
    addRecipeInstructions: "true",
    fillIngredients: "true",
    instructionsRequired: "true",
  })

  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?${params.toString()}`
  )

  if (!response.ok) {
    console.error("Spoonacular API error:", response.status)
    return []
  }

  const data = await response.json()
  return data.recipes || []
}

// Fetch diet-specific recipes to ensure variety
async function fetchDietSpecificRecipes(): Promise<SpoonacularRecipe[]> {
  const allRecipes: SpoonacularRecipe[] = []
  const seenIds = new Set<number>()

  // Fetch a few recipes for each diet type
  for (const diet of DIETS) {
    if (!diet.spoonacularDiet && !diet.spoonacularIntolerances) continue

    const params = new URLSearchParams({
      apiKey: SPOONACULAR_API_KEY,
      number: "6",
      addRecipeNutrition: "true",
      addRecipeInstructions: "true",
      fillIngredients: "true",
      instructionsRequired: "true",
    })

    if (diet.spoonacularDiet) {
      params.append("diet", diet.spoonacularDiet)
    }
    if (diet.spoonacularIntolerances) {
      params.append("intolerances", diet.spoonacularIntolerances)
    }

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`
      )

      if (!response.ok) continue

      const data = await response.json()
      const recipeIds = data.results?.map((r: { id: number }) => r.id).filter((id: number) => !seenIds.has(id)) || []

      if (recipeIds.length === 0) continue

      // Mark as seen
      recipeIds.forEach((id: number) => seenIds.add(id))

      // Fetch full details
      const detailsResponse = await fetch(
        `https://api.spoonacular.com/recipes/informationBulk?ids=${recipeIds.join(",")}&includeNutrition=true&apiKey=${SPOONACULAR_API_KEY}`
      )

      if (detailsResponse.ok) {
        const recipes = await detailsResponse.json()
        allRecipes.push(...recipes)
      }

      // Delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 300))
    } catch (error) {
      console.error(`Error fetching ${diet.name} recipes:`, error)
    }
  }

  return allRecipes
}

// Fallback: Generate recipes via frontend and save to Minio
async function generateAllRecipesToMinio() {
  console.log("Starting daily recipe generation from Spoonacular...")

  const products = await fetchProducts()
  console.log(`Fetched ${products.length} products from store`)

  // Fetch recipes from Spoonacular
  console.log("Fetching diet-specific recipes from Spoonacular...")
  const spoonacularRecipes = await fetchDietSpecificRecipes()
  console.log(`Fetched ${spoonacularRecipes.length} unique recipes from Spoonacular`)

  // Deduplicate by spoonacular ID
  const uniqueRecipes = new Map<number, SpoonacularRecipe>()
  for (const recipe of spoonacularRecipes) {
    if (!uniqueRecipes.has(recipe.id) && recipe.analyzedInstructions?.[0]?.steps?.length) {
      uniqueRecipes.set(recipe.id, recipe)
    }
  }

  console.log(`Processing ${uniqueRecipes.size} unique recipes...`)

  const allRecipes: Recipe[] = []
  let translatedCount = 0

  for (const [spoonacularId, spRecipe] of uniqueRecipes) {
    // Limit to ~30 recipes total
    if (allRecipes.length >= 30) break

    // Get compatible diets for this recipe
    const { ids: dietIds, names: dietNames } = getCompatibleDiets(spRecipe)

    // Get ingredient names for matching
    const ingredientNames = spRecipe.extendedIngredients?.map((i) => i.name) || []

    // Find matching products from our store
    const matchedProducts = findMatchingProducts(ingredientNames, products, dietIds)

    // Extract nutrition info
    const nutrients = spRecipe.nutrition?.nutrients || []
    const getNutrient = (name: string) => {
      const n = nutrients.find((x) => x.name.toLowerCase() === name.toLowerCase())
      return Math.round(n?.amount || 0)
    }

    const nutrition: NutritionInfo = {
      calories: getNutrient("Calories"),
      carbs: getNutrient("Carbohydrates"),
      protein: getNutrient("Protein"),
      fat: getNutrient("Fat"),
      fiber: getNutrient("Fiber"),
    }

    // Translate to Spanish
    console.log(`Translating: ${spRecipe.title}...`)
    const translated = await translateRecipeToSpanish({
      title: spRecipe.title,
      description: stripHtml(spRecipe.summary).slice(0, 300),
      ingredients: spRecipe.extendedIngredients?.map((i) => i.original) || [],
      instructions: spRecipe.analyzedInstructions[0]?.steps?.map((s) => s.step) || [],
    })
    translatedCount++

    // Small delay between translations to avoid rate limits
    if (translatedCount % 5 === 0) {
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    // Build recipe object
    const recipe: Recipe = {
      id: `recipe-${spoonacularId}`,
      title: translated.title,
      description: translated.description.slice(0, 200) + (translated.description.length > 200 ? "..." : ""),
      image: spRecipe.image,
      sourceUrl: spRecipe.sourceUrl,
      diets: dietIds,
      dietNames: dietNames,
      prepTime: `${spRecipe.preparationMinutes || Math.floor(spRecipe.readyInMinutes / 3)} min`,
      cookTime: `${spRecipe.cookingMinutes || Math.floor(spRecipe.readyInMinutes * 2 / 3)} min`,
      servings: spRecipe.servings,
      difficulty: getDifficulty(spRecipe.readyInMinutes),
      ingredients: translated.ingredients,
      instructions: translated.instructions,
      products: matchedProducts,
      nutrition,
      tips: translated.tips,
      spoonacularId,
      generatedAt: new Date().toISOString(),
    }

    allRecipes.push(recipe)
  }

  console.log(`Generated ${allRecipes.length} unique translated recipes`)

  const recipesData = {
    generatedAt: new Date().toISOString(),
    recipes: allRecipes,
  }

  const bucket = process.env.MINIO_BUCKET || "vitaintegralimages"

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: "recipes.json",
      Body: JSON.stringify(recipesData, null, 2),
      ContentType: "application/json",
    })
  )

  console.log(`Recipes saved to Minio: ${bucket}/recipes.json`)

  return recipesData
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const headerSecret = authHeader?.replace("Bearer ", "")
    const querySecret = request.nextUrl.searchParams.get("secret")
    const providedSecret = headerSecret || querySecret

    if (providedSecret !== CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // First, try to generate via Medusa backend (PostgreSQL)
    const backendResult = await tryGenerateViaBackend(providedSecret)
    if (backendResult.success) {
      return NextResponse.json({
        ...backendResult.data,
        source: "postgresql",
      })
    }

    // Fallback to generating via frontend and saving to Minio
    const recipesData = await generateAllRecipesToMinio()

    return NextResponse.json({
      success: true,
      count: recipesData.recipes.length,
      generatedAt: recipesData.generatedAt,
      source: "minio",
    })
  } catch (error) {
    console.error("Error generating daily recipes:", error)
    return NextResponse.json(
      { error: "Error generating recipes" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get("secret")

    if (secret !== CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // First, try to generate via Medusa backend (PostgreSQL)
    const backendResult = await tryGenerateViaBackend(secret)
    if (backendResult.success) {
      return NextResponse.json({
        ...backendResult.data,
        source: "postgresql",
      })
    }

    // Fallback to generating via frontend and saving to Minio
    const recipesData = await generateAllRecipesToMinio()

    return NextResponse.json({
      success: true,
      count: recipesData.recipes.length,
      generatedAt: recipesData.generatedAt,
      source: "minio",
    })
  } catch (error) {
    console.error("Error generating daily recipes:", error)
    return NextResponse.json(
      { error: "Error generating recipes" },
      { status: 500 }
    )
  }
}
