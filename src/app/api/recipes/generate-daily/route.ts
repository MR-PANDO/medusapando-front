import { NextRequest, NextResponse } from "next/server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

// Initialize S3 client for Minio
const s3Client = new S3Client({
  region: "us-east-1",
  endpoint: process.env.MINIO_ENDPOINT,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY || "",
    secretAccessKey: process.env.MINIO_SECRET_KEY || "",
  },
  forcePathStyle: true,
})

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY || "a587c68a1d054fa2a05da1c7e872efd4"
const CRON_SECRET = process.env.CRON_SECRET || process.env.REVALIDATE_SECRET || "0462f2f0498cba3f0dbdbe26ca4bb08b26e5570d8f4162e76e4e72a1d23020ee"

// Map our diet IDs to Spoonacular diet parameters
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

interface Recipe {
  id: string
  title: string
  description: string
  image?: string
  sourceUrl?: string
  diet: string
  dietName: string
  prepTime: string
  cookTime: string
  servings: number
  difficulty: "Fácil" | "Medio" | "Difícil"
  ingredients: string[]
  instructions: string[]
  products: RecipeProduct[]
  nutrition: NutritionInfo
  tips?: string
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

// Find matching products from our store based on recipe ingredients
function findMatchingProducts(
  ingredientNames: string[],
  products: Product[],
  dietId: string
): RecipeProduct[] {
  const matchedProducts: RecipeProduct[] = []
  const usedProductIds = new Set<string>()

  // First, try to match products that have the diet tag
  const dietProducts = products.filter((p) => {
    const tags = p.tags?.map((t) => t.value.toLowerCase()) || []
    return tags.includes(dietId.toLowerCase())
  })

  // Search for matches in ingredients
  for (const ingredientName of ingredientNames) {
    const lowerIngredient = ingredientName.toLowerCase()

    // Try diet-compatible products first, then all products
    const searchPools = [dietProducts, products]

    for (const pool of searchPools) {
      for (const product of pool) {
        if (usedProductIds.has(product.id)) continue

        const productTitle = product.title.toLowerCase()

        // Check if product name matches ingredient
        const ingredientWords = lowerIngredient.split(/\s+/)
        const hasMatch = ingredientWords.some(
          (word) => word.length > 3 && productTitle.includes(word)
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

async function fetchRecipesFromSpoonacular(
  diet: typeof DIETS[0],
  count: number = 4
): Promise<SpoonacularRecipe[]> {
  const params = new URLSearchParams({
    apiKey: SPOONACULAR_API_KEY,
    number: String(count + 2), // Fetch extra in case some don't have enough info
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
  if ("maxSugar" in diet && diet.maxSugar) {
    params.append("maxSugar", String(diet.maxSugar))
  }

  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`
  )

  if (!response.ok) {
    console.error(`Spoonacular API error for ${diet.name}:`, response.status)
    return []
  }

  const data = await response.json()
  const recipeIds = data.results?.map((r: { id: number }) => r.id) || []

  if (recipeIds.length === 0) return []

  // Fetch full recipe details
  const detailsResponse = await fetch(
    `https://api.spoonacular.com/recipes/informationBulk?ids=${recipeIds.join(",")}&includeNutrition=true&apiKey=${SPOONACULAR_API_KEY}`
  )

  if (!detailsResponse.ok) {
    console.error("Failed to fetch recipe details")
    return []
  }

  return detailsResponse.json()
}

async function generateRecipesForDiet(
  diet: typeof DIETS[0],
  products: Product[],
  count: number = 4
): Promise<Recipe[]> {
  const spoonacularRecipes = await fetchRecipesFromSpoonacular(diet, count)

  const recipes: Recipe[] = []

  for (const spRecipe of spoonacularRecipes) {
    if (recipes.length >= count) break

    // Skip if no instructions
    if (!spRecipe.analyzedInstructions?.[0]?.steps?.length) continue

    // Get ingredient names for matching
    const ingredientNames = spRecipe.extendedIngredients?.map((i) => i.name) || []

    // Find matching products from our store
    const matchedProducts = findMatchingProducts(ingredientNames, products, diet.id)

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

    // Build recipe object
    const recipe: Recipe = {
      id: `${diet.id}-${spRecipe.id}-${Date.now()}`,
      title: spRecipe.title,
      description: stripHtml(spRecipe.summary).slice(0, 200) + "...",
      image: spRecipe.image,
      sourceUrl: spRecipe.sourceUrl,
      diet: diet.id,
      dietName: diet.name,
      prepTime: `${spRecipe.preparationMinutes || Math.floor(spRecipe.readyInMinutes / 3)} min`,
      cookTime: `${spRecipe.cookingMinutes || Math.floor(spRecipe.readyInMinutes * 2 / 3)} min`,
      servings: spRecipe.servings,
      difficulty: getDifficulty(spRecipe.readyInMinutes),
      ingredients: spRecipe.extendedIngredients?.map((i) => i.original) || [],
      instructions: spRecipe.analyzedInstructions[0]?.steps?.map((s) => s.step) || [],
      products: matchedProducts,
      nutrition,
      generatedAt: new Date().toISOString(),
    }

    recipes.push(recipe)
  }

  return recipes
}

async function generateAllRecipes() {
  console.log("Starting daily recipe generation from Spoonacular...")

  const products = await fetchProducts()
  console.log(`Fetched ${products.length} products from store`)

  const allRecipes: Recipe[] = []

  for (const diet of DIETS) {
    console.log(`Fetching recipes for ${diet.name}...`)
    const recipes = await generateRecipesForDiet(diet, products, 4)
    allRecipes.push(...recipes)

    // Delay to respect API rate limits
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  console.log(`Fetched ${allRecipes.length} total recipes`)

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

    const recipesData = await generateAllRecipes()

    return NextResponse.json({
      success: true,
      count: recipesData.recipes.length,
      generatedAt: recipesData.generatedAt,
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

    const recipesData = await generateAllRecipes()

    return NextResponse.json({
      success: true,
      count: recipesData.recipes.length,
      generatedAt: recipesData.generatedAt,
    })
  } catch (error) {
    console.error("Error generating daily recipes:", error)
    return NextResponse.json(
      { error: "Error generating recipes" },
      { status: 500 }
    )
  }
}
