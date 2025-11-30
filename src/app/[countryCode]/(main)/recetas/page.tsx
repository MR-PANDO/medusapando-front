import { Metadata } from "next"
import { RecipesData } from "@modules/recipes/types"
import RecipesGrid from "@modules/recipes/components/recipes-grid"

export const metadata: Metadata = {
  title: "Recetas Saludables | Vita Integral",
  description:
    "Descubre recetas saludables generadas con IA usando productos de nuestra tienda. Recetas veganas, keto, sin gluten y más.",
}

async function getRecipes(): Promise<RecipesData | null> {
  try {
    // In production, fetch from the public JSON file
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"
    const response = await fetch(`${baseUrl}/data/recipes.json`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      return null
    }

    return response.json()
  } catch {
    return null
  }
}

export default async function RecetasPage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const recipesData = await getRecipes()
  const recipes = recipesData?.recipes || []

  return (
    <div className="content-container py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Recetas Saludables del Día
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Descubre recetas deliciosas generadas con IA, perfectas para tu estilo de vida.
          Cada receta usa productos disponibles en nuestra tienda.
        </p>
        {recipesData?.generatedAt && (
          <p className="text-sm text-gray-400 mt-2">
            Actualizado: {new Date(recipesData.generatedAt).toLocaleDateString("es-CO", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Generadas con IA</h3>
          <p className="text-gray-600 text-sm">
            Recetas únicas creadas diariamente con inteligencia artificial
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Compra Fácil</h3>
          <p className="text-gray-600 text-sm">
            Agrega todos los productos al carrito con un solo clic
          </p>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Para Cada Dieta</h3>
          <p className="text-gray-600 text-sm">
            Vegano, keto, sin gluten, paleo y más opciones
          </p>
        </div>
      </div>

      {/* Recipes Grid */}
      {recipes.length > 0 ? (
        <RecipesGrid recipes={recipes} countryCode={countryCode} />
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <svg
            className="w-20 h-20 text-gray-300 mx-auto mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            Las recetas se están preparando
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Nuestro chef con IA está creando deliciosas recetas para ti.
            ¡Vuelve pronto para descubrir nuevas ideas!
          </p>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-16 bg-gray-50 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          ¿Cómo funciona?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              1
            </div>
            <p className="text-gray-600 text-sm">
              Filtra por tu tipo de dieta favorita
            </p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              2
            </div>
            <p className="text-gray-600 text-sm">
              Explora las recetas del día
            </p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              3
            </div>
            <p className="text-gray-600 text-sm">
              Agrega todos los productos al carrito
            </p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              4
            </div>
            <p className="text-gray-600 text-sm">
              ¡Cocina y disfruta!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
