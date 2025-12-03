"use client"

import { useEffect, useState } from "react"

type NutritionData = {
  id: string
  product_id: string
  serving_size: string | null
  servings_per_container: string | null
  nutrition_data: Record<string, string>
  raw_text: string | null
  scanned_at: string
}

type ProductNutritionProps = {
  productId: string
}

const ProductNutrition = ({ productId }: ProductNutritionProps) => {
  const [nutrition, setNutrition] = useState<NutritionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchNutrition = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
        const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

        const res = await fetch(`${backendUrl}/store/nutrition/${productId}`, {
          headers: {
            "x-publishable-api-key": publishableKey,
          },
        })

        if (res.ok) {
          const data = await res.json()
          setNutrition(data.nutrition)
        } else if (res.status === 404) {
          setNutrition(null)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error("Error fetching nutrition:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchNutrition()
  }, [productId])

  // Format nutrition key for display
  const formatKey = (key: string) => {
    return key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
  }

  // Don't render anything if loading, error, or no nutrition data
  if (loading || error || !nutrition) {
    return null
  }

  const hasNutritionData = nutrition.nutrition_data && Object.keys(nutrition.nutrition_data).length > 0

  if (!hasNutritionData && !nutrition.serving_size && !nutrition.servings_per_container) {
    return null
  }

  return (
    <div className="mb-6">
      <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-emerald-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        Informacion Nutricional
      </h4>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 text-white px-4 py-3">
          <div className="text-lg font-bold">Nutrition Facts</div>
          <div className="text-sm text-gray-300">Informacion Nutricional</div>
        </div>

        {/* Serving Info */}
        {(nutrition.serving_size || nutrition.servings_per_container) && (
          <div className="px-4 py-3 border-b border-gray-300 bg-gray-50">
            {nutrition.serving_size && (
              <div className="text-sm">
                <span className="font-medium">Tamano de porcion:</span>{" "}
                {nutrition.serving_size}
              </div>
            )}
            {nutrition.servings_per_container && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Porciones por envase:</span>{" "}
                {nutrition.servings_per_container}
              </div>
            )}
          </div>
        )}

        {/* Nutrition Data */}
        {hasNutritionData && (
          <div className="divide-y divide-gray-200">
            {Object.entries(nutrition.nutrition_data).map(([key, value], index) => {
              // Highlight main nutrients
              const isMainNutrient = [
                "calorias",
                "calories",
                "grasa_total",
                "total_fat",
                "carbohidratos_totales",
                "total_carbohydrates",
                "proteina",
                "protein",
              ].includes(key.toLowerCase())

              return (
                <div
                  key={key}
                  className={`flex justify-between items-center px-4 py-2 ${
                    isMainNutrient ? "bg-gray-50 font-medium" : ""
                  } ${index === 0 ? "border-t-4 border-gray-900" : ""}`}
                >
                  <span className={`text-sm ${isMainNutrient ? "text-gray-900" : "text-gray-700"}`}>
                    {formatKey(key)}
                  </span>
                  <span className={`text-sm ${isMainNutrient ? "text-gray-900 font-semibold" : "text-gray-600"}`}>
                    {value}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        {/* Footer */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-300">
          <p className="text-xs text-gray-500">
            * Los porcentajes de Valores Diarios estan basados en una dieta de 2,000 calorias.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductNutrition
