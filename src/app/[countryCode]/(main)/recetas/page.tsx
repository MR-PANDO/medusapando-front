import { Metadata } from "next"
import { listProducts } from "@lib/data/products"
import RecipeGenerator from "@modules/recipes/components/recipe-generator"

export const metadata: Metadata = {
  title: "Recetas Saludables | Vita Integral",
  description:
    "Genera recetas personalizadas con IA usando productos de nuestra tienda. Recetas veganas, keto, sin gluten y más.",
}

export default async function RecetasPage(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  // Fetch products to use in recipe generation
  const { response } = await listProducts({
    pageParam: 1,
    queryParams: {
      limit: 100, // Get more products for variety
    },
    countryCode,
  })

  return (
    <div className="content-container py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Generador de Recetas con IA
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Descubre recetas deliciosas y saludables personalizadas para tu dieta,
          usando productos de nuestra tienda. Nuestra IA crea recetas únicas
          adaptadas a tus preferencias alimenticias.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Recetas con IA</h3>
          <p className="text-gray-600 text-sm">
            Generamos recetas únicas usando inteligencia artificial avanzada
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Nuestros Productos</h3>
          <p className="text-gray-600 text-sm">
            Cada receta incluye productos disponibles en nuestra tienda
          </p>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Tu Dieta</h3>
          <p className="text-gray-600 text-sm">
            Adaptadas a vegano, keto, sin gluten, paleo y más
          </p>
        </div>
      </div>

      {/* Recipe Generator */}
      <RecipeGenerator products={response.products} countryCode={countryCode} />

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
              Selecciona tu tipo de dieta preferida
            </p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              2
            </div>
            <p className="text-gray-600 text-sm">
              Haz clic en "Generar Receta"
            </p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              3
            </div>
            <p className="text-gray-600 text-sm">
              Nuestra IA crea una receta única para ti
            </p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              4
            </div>
            <p className="text-gray-600 text-sm">
              ¡Compra los productos y cocina!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
