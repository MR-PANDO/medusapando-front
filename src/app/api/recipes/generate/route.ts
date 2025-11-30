import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Diet definitions for recipe generation
const DIET_DEFINITIONS: Record<string, string> = {
  vegano: "sin ningún producto de origen animal (carne, pescado, lácteos, huevos, miel)",
  vegetariano: "sin carne ni pescado, pero puede incluir lácteos y huevos",
  "sin-lactosa": "sin lácteos ni productos que contengan lactosa",
  organico: "preferiblemente con ingredientes orgánicos y naturales",
  "sin-azucar": "sin azúcar añadida ni edulcorantes artificiales",
  paleo: "sin granos, legumbres, lácteos ni azúcares refinados",
  "sin-gluten": "sin trigo, cebada, centeno ni derivados del gluten",
  keto: "muy baja en carbohidratos, alta en grasas saludables",
}

interface Product {
  id: string
  title: string
  handle: string
  description?: string
  thumbnail?: string
  tags?: Array<{ value: string }>
}

interface RecipeProduct {
  id: string
  title: string
  handle: string
  thumbnail?: string
  quantity: string
}

interface Recipe {
  id: string
  title: string
  description: string
  diet: string
  prepTime: string
  cookTime: string
  servings: number
  difficulty: "Fácil" | "Medio" | "Difícil"
  ingredients: string[]
  instructions: string[]
  products: RecipeProduct[]
  tips?: string
}

export async function POST(request: NextRequest) {
  try {
    const { diet, products } = await request.json() as {
      diet: string
      products: Product[]
    }

    if (!diet || !products || products.length < 2) {
      return NextResponse.json(
        { error: "Se requiere una dieta y al menos 2 productos" },
        { status: 400 }
      )
    }

    const dietDefinition = DIET_DEFINITIONS[diet] || diet

    // Filter products that match the diet (by tags)
    const compatibleProducts = products.filter((product) => {
      const productTags = product.tags?.map((t) => t.value.toLowerCase()) || []
      return productTags.includes(diet.toLowerCase())
    })

    // If not enough compatible products, use all products
    const productsToUse = compatibleProducts.length >= 2 ? compatibleProducts : products

    // Select 2-4 random products for the recipe
    const shuffled = [...productsToUse].sort(() => Math.random() - 0.5)
    const selectedProducts = shuffled.slice(0, Math.min(4, shuffled.length))

    const productList = selectedProducts
      .map((p) => `- ${p.title}: ${p.description || "producto saludable"}`)
      .join("\n")

    const prompt = `Eres un chef experto en cocina saludable colombiana e internacional. Genera UNA receta deliciosa y práctica que sea ${dietDefinition}.

PRODUCTOS DE LA TIENDA QUE DEBES INCLUIR (usa al menos 2):
${productList}

Responde SOLO con un objeto JSON válido (sin markdown, sin \`\`\`), con esta estructura exacta:
{
  "title": "Nombre creativo de la receta",
  "description": "Descripción breve y apetitosa (máximo 2 oraciones)",
  "prepTime": "tiempo de preparación (ej: 15 min)",
  "cookTime": "tiempo de cocción (ej: 30 min)",
  "servings": número de porciones,
  "difficulty": "Fácil" o "Medio" o "Difícil",
  "ingredients": ["ingrediente 1 con cantidad", "ingrediente 2 con cantidad", ...],
  "instructions": ["paso 1 detallado", "paso 2 detallado", ...],
  "products": [
    {"title": "nombre exacto del producto de la tienda", "quantity": "cantidad a usar"}
  ],
  "tips": "un consejo útil para mejorar la receta (opcional)"
}

IMPORTANTE:
- La receta debe ser apropiada para la dieta ${diet}
- Incluye ingredientes comunes en Colombia
- Los productos de la tienda deben ser ingredientes principales
- Instrucciones claras y detalladas
- Responde SOLO el JSON, nada más`

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    })

    const responseText = message.content[0].type === "text" ? message.content[0].text : ""

    // Parse the JSON response
    let recipeData: Omit<Recipe, "id" | "diet" | "products"> & { products: Array<{ title: string; quantity: string }> }
    try {
      recipeData = JSON.parse(responseText)
    } catch {
      console.error("Failed to parse recipe JSON:", responseText)
      return NextResponse.json(
        { error: "Error al generar la receta" },
        { status: 500 }
      )
    }

    // Match products from the response with actual product data
    const matchedProducts: RecipeProduct[] = recipeData.products
      .map((rp): RecipeProduct | null => {
        const found = selectedProducts.find(
          (sp) => sp.title.toLowerCase().includes(rp.title.toLowerCase()) ||
                  rp.title.toLowerCase().includes(sp.title.toLowerCase())
        )
        if (found) {
          return {
            id: found.id,
            title: found.title,
            handle: found.handle,
            thumbnail: found.thumbnail,
            quantity: rp.quantity,
          }
        }
        return null
      })
      .filter((p): p is RecipeProduct => p !== null)

    const recipe: Recipe = {
      id: `recipe-${Date.now()}`,
      diet,
      ...recipeData,
      products: matchedProducts,
    }

    return NextResponse.json({ recipe })
  } catch (error) {
    console.error("Error generating recipe:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
