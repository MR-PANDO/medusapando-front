"use client"

import { useEffect, useState } from "react"

type NutritionData = {
  id: string
  productId: string
  servingSize: string | null
  servingsPerContainer: string | null
  nutritionData: Record<string, string>
  labelImageUrl: string | null
  scannedAt: string
}

type ProductNutritionProps = {
  productId: string
}

// Ordered list of nutrients to display (in preferred order)
const NUTRIENT_ORDER = [
  "calorias",
  "calories",
  "energia",
  "energy",
  "calorias_de_grasa",
  "grasa_total",
  "total_fat",
  "grasa_saturada",
  "saturated_fat",
  "grasas_saturadas",
  "grasa_trans",
  "trans_fat",
  "grasas_trans",
  "grasa_monoinsaturada",
  "grasa_poliinsaturada",
  "colesterol",
  "cholesterol",
  "sodio",
  "sodium",
  "carbohidratos_totales",
  "total_carbohydrates",
  "carbohidratos",
  "carbohydrates",
  "fibra_dietetica",
  "dietary_fiber",
  "fibra",
  "fiber",
  "azucares",
  "sugars",
  "azucares_anadidos",
  "added_sugars",
  "proteina",
  "protein",
  "proteinas",
  "vitamina_a",
  "vitamin_a",
  "vitamina_c",
  "vitamin_c",
  "vitamina_d",
  "vitamin_d",
  "vitamina_e",
  "vitamina_b12",
  "calcio",
  "calcium",
  "hierro",
  "iron",
  "potasio",
  "potassium",
  "magnesio",
  "zinc",
  "fosforo",
]

// Main nutrients that should be bold
const MAIN_NUTRIENTS = [
  "calorias",
  "calories",
  "energia",
  "energy",
  "grasa_total",
  "total_fat",
  "carbohidratos_totales",
  "total_carbohydrates",
  "carbohidratos",
  "proteina",
  "protein",
  "proteinas",
]

// Sub-nutrients that should be indented
const SUB_NUTRIENTS = [
  "grasa_saturada",
  "saturated_fat",
  "grasas_saturadas",
  "grasa_trans",
  "trans_fat",
  "grasas_trans",
  "grasa_monoinsaturada",
  "grasa_poliinsaturada",
  "fibra_dietetica",
  "dietary_fiber",
  "fibra",
  "fiber",
  "azucares",
  "sugars",
  "azucares_anadidos",
  "added_sugars",
]

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
    const translations: Record<string, string> = {
      calorias: "Calorías",
      calories: "Calorías",
      energia: "Energía",
      energy: "Energía",
      calorias_de_grasa: "Calorías de grasa",
      grasa_total: "Grasa Total",
      total_fat: "Grasa Total",
      grasa_saturada: "Grasa Saturada",
      saturated_fat: "Grasa Saturada",
      grasas_saturadas: "Grasas Saturadas",
      grasa_trans: "Grasa Trans",
      trans_fat: "Grasa Trans",
      grasas_trans: "Grasas Trans",
      grasa_monoinsaturada: "Grasa Monoinsaturada",
      grasa_poliinsaturada: "Grasa Poliinsaturada",
      colesterol: "Colesterol",
      cholesterol: "Colesterol",
      sodio: "Sodio",
      sodium: "Sodio",
      carbohidratos_totales: "Carbohidratos Totales",
      total_carbohydrates: "Carbohidratos Totales",
      carbohidratos: "Carbohidratos",
      carbohydrates: "Carbohidratos",
      fibra_dietetica: "Fibra Dietética",
      dietary_fiber: "Fibra Dietética",
      fibra: "Fibra",
      fiber: "Fibra",
      azucares: "Azúcares",
      sugars: "Azúcares",
      azucares_anadidos: "Azúcares Añadidos",
      added_sugars: "Azúcares Añadidos",
      proteina: "Proteína",
      protein: "Proteína",
      proteinas: "Proteínas",
      vitamina_a: "Vitamina A",
      vitamin_a: "Vitamina A",
      vitamina_c: "Vitamina C",
      vitamin_c: "Vitamina C",
      vitamina_d: "Vitamina D",
      vitamin_d: "Vitamina D",
      vitamina_e: "Vitamina E",
      vitamina_b12: "Vitamina B12",
      calcio: "Calcio",
      calcium: "Calcio",
      hierro: "Hierro",
      iron: "Hierro",
      potasio: "Potasio",
      potassium: "Potasio",
      magnesio: "Magnesio",
      zinc: "Zinc",
      fosforo: "Fósforo",
    }

    const lowerKey = key.toLowerCase()
    if (translations[lowerKey]) {
      return translations[lowerKey]
    }

    return key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
  }

  // Sort nutrients by predefined order
  const sortNutrients = (entries: [string, string][]) => {
    return entries.sort(([keyA], [keyB]) => {
      const indexA = NUTRIENT_ORDER.findIndex(n => n === keyA.toLowerCase())
      const indexB = NUTRIENT_ORDER.findIndex(n => n === keyB.toLowerCase())

      // If both are in the list, sort by order
      if (indexA !== -1 && indexB !== -1) return indexA - indexB
      // If only A is in the list, A comes first
      if (indexA !== -1) return -1
      // If only B is in the list, B comes first
      if (indexB !== -1) return 1
      // Otherwise, sort alphabetically
      return keyA.localeCompare(keyB)
    })
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  // Error or no data state
  if (error || !nutrition) {
    return (
      <div className="text-center py-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto text-gray-300 mb-4"
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
        <p className="text-gray-500 text-sm">
          No hay informacion nutricional disponible para este producto.
        </p>
      </div>
    )
  }

  const hasNutritionData = nutrition.nutritionData && Object.keys(nutrition.nutritionData).length > 0

  if (!hasNutritionData && !nutrition.servingSize && !nutrition.servingsPerContainer) {
    return (
      <div className="text-center py-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto text-gray-300 mb-4"
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
        <p className="text-gray-500 text-sm">
          No hay informacion nutricional disponible para este producto.
        </p>
      </div>
    )
  }

  const sortedNutrients = hasNutritionData
    ? sortNutrients(Object.entries(nutrition.nutritionData))
    : []

  return (
    <div className="max-w-md">
      {/* Nutrition Label Table */}
      <div className="border-2 border-black rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-700 text-white px-4 py-3">
          <h3 className="text-xl font-bold text-center">
            Informacion Nutricional
          </h3>
        </div>

        {/* Serving Info */}
        {(nutrition.servingSize || nutrition.servingsPerContainer) && (
          <div className="px-4 py-3 border-b-2 border-black bg-emerald-50">
            {nutrition.servingSize && (
              <div className="text-sm font-medium">
                Tamano de porcion: <span className="font-bold">{nutrition.servingSize}</span>
              </div>
            )}
            {nutrition.servingsPerContainer && (
              <div className="text-sm text-gray-600">
                Porciones por envase: {nutrition.servingsPerContainer}
              </div>
            )}
          </div>
        )}

        {/* Table Header */}
        {hasNutritionData && (
          <>
            <div className="grid grid-cols-3 bg-gray-100 border-b border-gray-300">
              <div className="px-3 py-2 text-sm font-bold text-gray-800 border-r border-gray-300">
                Nutriente
              </div>
              <div className="px-3 py-2 text-sm font-bold text-gray-800 text-center border-r border-gray-300">
                Por 100g
              </div>
              <div className="px-3 py-2 text-sm font-bold text-gray-800 text-center">
                Por porcion
              </div>
            </div>

            {/* Nutrition Rows */}
            <div className="divide-y divide-gray-200">
              {sortedNutrients.map(([key, value]) => {
                const lowerKey = key.toLowerCase()
                const isMainNutrient = MAIN_NUTRIENTS.includes(lowerKey)
                const isSubNutrient = SUB_NUTRIENTS.includes(lowerKey)

                // Try to extract per100g and perPortion values
                // Value format might be: "10g", "10g / 5g", "10g (5%)", etc.
                let per100g = value
                let perPortion = "-"

                // Check if value contains separator for two values
                if (value.includes("/")) {
                  const parts = value.split("/").map(p => p.trim())
                  per100g = parts[0]
                  perPortion = parts[1] || "-"
                } else if (value.includes("|")) {
                  const parts = value.split("|").map(p => p.trim())
                  per100g = parts[0]
                  perPortion = parts[1] || "-"
                }

                return (
                  <div
                    key={key}
                    className={`grid grid-cols-3 ${
                      isMainNutrient ? "bg-gray-50" : ""
                    }`}
                  >
                    <div
                      className={`px-3 py-2 text-sm border-r border-gray-200 ${
                        isSubNutrient ? "pl-6" : ""
                      } ${isMainNutrient ? "font-bold text-gray-900" : "text-gray-700"}`}
                    >
                      {formatKey(key)}
                    </div>
                    <div
                      className={`px-3 py-2 text-sm text-center border-r border-gray-200 ${
                        isMainNutrient ? "font-semibold text-gray-900" : "text-gray-600"
                      }`}
                    >
                      {per100g}
                    </div>
                    <div
                      className={`px-3 py-2 text-sm text-center ${
                        isMainNutrient ? "font-semibold text-gray-900" : "text-gray-600"
                      }`}
                    >
                      {perPortion}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

      </div>

      {/* Last Updated */}
      {nutrition.scannedAt && (
        <p className="text-xs text-gray-400 mt-3 text-center">
          Informacion escaneada el {new Date(nutrition.scannedAt).toLocaleDateString("es-ES")}
        </p>
      )}
    </div>
  )
}

export default ProductNutrition
