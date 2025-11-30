import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

// Initialize S3 client for Minio
const s3Client = new S3Client({
  region: "us-east-1", // Minio doesn't care about region
  endpoint: process.env.MINIO_ENDPOINT,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY || "",
    secretAccessKey: process.env.MINIO_SECRET_KEY || "",
  },
  forcePathStyle: true, // Required for Minio
})

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Secret key to protect this endpoint (call it from a cron job)
// Hardcoded fallback for when env vars aren't available at runtime
const CRON_SECRET = process.env.CRON_SECRET || process.env.REVALIDATE_SECRET || "0462f2f0498cba3f0dbdbe26ca4bb08b26e5570d8f4162e76e4e72a1d23020ee"

const DIETS = [
  { id: "vegano", name: "Vegano", definition: "sin ningún producto de origen animal" },
  { id: "vegetariano", name: "Vegetariano", definition: "sin carne ni pescado, puede incluir lácteos y huevos" },
  { id: "sin-lactosa", name: "Sin Lactosa", definition: "sin lácteos ni productos con lactosa" },
  { id: "organico", name: "Orgánico", definition: "con ingredientes orgánicos y naturales" },
  { id: "sin-azucar", name: "Sin Azúcar", definition: "sin azúcar añadida ni edulcorantes artificiales" },
  { id: "paleo", name: "Paleo", definition: "sin granos, legumbres, lácteos ni azúcares refinados" },
  { id: "sin-gluten", name: "Sin Gluten", definition: "sin trigo, cebada, centeno ni derivados del gluten" },
  { id: "keto", name: "Keto", definition: "muy baja en carbohidratos, alta en grasas saludables" },
]

interface Product {
  id: string
  title: string
  handle: string
  description?: string
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

async function generateRecipesForDiet(
  diet: typeof DIETS[0],
  products: Product[],
  count: number = 4
): Promise<Recipe[]> {
  // Filter products that match the diet
  const compatibleProducts = products.filter((product) => {
    const productTags = product.tags?.map((t) => t.value.toLowerCase()) || []
    return productTags.includes(diet.id.toLowerCase())
  })

  // If not enough compatible products, use all products
  const productsToUse = compatibleProducts.length >= 4 ? compatibleProducts : products

  // Get product list for the prompt
  const productList = productsToUse
    .slice(0, 30) // Limit to 30 products to keep prompt size reasonable
    .map((p) => `- ${p.title} (ID: ${p.id})`)
    .join("\n")

  // Single API call to generate multiple recipes (cost optimization)
  const prompt = `Eres un chef experto en cocina saludable colombiana y nutricionista. Genera exactamente ${count} recetas diferentes que sean ${diet.definition}.

PRODUCTOS DISPONIBLES DE LA TIENDA (usa 2-4 por receta):
${productList}

Responde SOLO con un array JSON válido (sin markdown, sin \`\`\`). Cada receta debe tener esta estructura:
[
  {
    "title": "Nombre creativo",
    "description": "Descripción breve (1-2 oraciones)",
    "prepTime": "X min",
    "cookTime": "X min",
    "servings": número,
    "difficulty": "Fácil" | "Medio" | "Difícil",
    "ingredients": ["ingrediente con cantidad", ...],
    "instructions": ["paso detallado", ...],
    "productIds": ["ID exacto del producto de la lista", ...],
    "nutrition": {
      "calories": número (kcal por porción),
      "carbs": número (gramos de carbohidratos por porción),
      "protein": número (gramos de proteína por porción),
      "fat": número (gramos de grasa por porción),
      "fiber": número (gramos de fibra por porción)
    },
    "tips": "consejo útil"
  }
]

IMPORTANTE:
- Genera ${count} recetas DIFERENTES
- Usa productIds exactos de la lista de productos
- Cada receta debe usar 2-4 productos de la tienda
- Recetas prácticas con ingredientes comunes en Colombia
- Calcula la información nutricional de forma realista basándote en los ingredientes
- Responde SOLO el JSON array`

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  })

  const responseText = message.content[0].type === "text" ? message.content[0].text : ""

  let recipesData: Array<{
    title: string
    description: string
    prepTime: string
    cookTime: string
    servings: number
    difficulty: "Fácil" | "Medio" | "Difícil"
    ingredients: string[]
    instructions: string[]
    productIds: string[]
    nutrition: NutritionInfo
    tips?: string
  }>

  try {
    recipesData = JSON.parse(responseText)
  } catch {
    console.error("Failed to parse recipes JSON for diet:", diet.id)
    return []
  }

  // Map recipes with full product data
  const recipes: Recipe[] = recipesData.map((recipeData, index) => {
    const matchedProducts: RecipeProduct[] = recipeData.productIds
      .map((productId) => {
        const product = productsToUse.find((p) => p.id === productId)
        if (product && product.variants?.[0]) {
          return {
            id: product.id,
            variantId: product.variants[0].id,
            title: product.title,
            handle: product.handle,
            thumbnail: product.thumbnail,
            quantity: "1 unidad",
            price: product.variants[0].calculated_price?.calculated_amount,
          }
        }
        return null
      })
      .filter((p): p is RecipeProduct => p !== null)

    return {
      id: `${diet.id}-${Date.now()}-${index}`,
      title: recipeData.title,
      description: recipeData.description,
      diet: diet.id,
      dietName: diet.name,
      prepTime: recipeData.prepTime,
      cookTime: recipeData.cookTime,
      servings: recipeData.servings,
      difficulty: recipeData.difficulty,
      ingredients: recipeData.ingredients,
      instructions: recipeData.instructions,
      products: matchedProducts,
      nutrition: recipeData.nutrition || { calories: 0, carbs: 0, protein: 0, fat: 0 },
      tips: recipeData.tips,
      generatedAt: new Date().toISOString(),
    }
  })

  return recipes.filter((r) => r.products.length >= 2) // Only recipes with at least 2 products
}

async function generateAllRecipes() {
  console.log("Starting daily recipe generation...")

  // Fetch all products
  const products = await fetchProducts()
  console.log(`Fetched ${products.length} products`)

  // Generate recipes for each diet (4 recipes per diet)
  const allRecipes: Recipe[] = []

  for (const diet of DIETS) {
    console.log(`Generating recipes for ${diet.name}...`)
    const recipes = await generateRecipesForDiet(diet, products, 4)
    allRecipes.push(...recipes)

    // Small delay between API calls to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  console.log(`Generated ${allRecipes.length} total recipes`)

  // Save recipes to Minio
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
    // Verify cron secret - check both header and query param
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

// Also allow GET for testing (with secret in query)
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
