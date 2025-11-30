"use client"

import { useState } from "react"
import { Recipe, DietOption, DIET_OPTIONS } from "../../types"
import DietSelector from "../diet-selector"
import RecipeCard from "../recipe-card"
import { HttpTypes } from "@medusajs/types"

interface RecipeGeneratorProps {
  products: HttpTypes.StoreProduct[]
  countryCode: string
}

export default function RecipeGenerator({ products, countryCode }: RecipeGeneratorProps) {
  const [selectedDiet, setSelectedDiet] = useState<DietOption | null>(null)
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerateRecipe = async () => {
    if (!selectedDiet) return

    setIsLoading(true)
    setError(null)
    setRecipe(null)

    try {
      // Prepare products data for the API
      const productData = products.map((p) => ({
        id: p.id,
        title: p.title,
        handle: p.handle,
        description: p.description,
        thumbnail: p.thumbnail,
        tags: p.tags?.map((t) => ({ value: t.value })),
      }))

      const response = await fetch("/api/recipes/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          diet: selectedDiet.id,
          products: productData,
        }),
      })

      if (!response.ok) {
        throw new Error("Error al generar la receta")
      }

      const data = await response.json()
      setRecipe(data.recipe)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setIsLoading(false)
    }
  }

  const getDietName = (dietId: string) => {
    return DIET_OPTIONS.find((d) => d.id === dietId)?.name || dietId
  }

  return (
    <div className="space-y-8">
      {/* Diet Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          1. Selecciona tu tipo de dieta
        </h2>
        <DietSelector
          selectedDiet={selectedDiet?.id || null}
          onSelect={setSelectedDiet}
          disabled={isLoading}
        />
      </div>

      {/* Generate Button */}
      <div className="text-center">
        <button
          onClick={handleGenerateRecipe}
          disabled={!selectedDiet || isLoading}
          className={`
            px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200
            ${selectedDiet && !isLoading
              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          {isLoading ? (
            <span className="flex items-center gap-3">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Generando receta con IA...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generar Receta {selectedDiet ? getDietName(selectedDiet.id) : ""}
            </span>
          )}
        </button>
        {selectedDiet && (
          <p className="text-sm text-gray-500 mt-2">
            Usaremos IA para crear una receta personalizada con productos de nuestra tienda
          </p>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={handleGenerateRecipe}
            className="mt-2 text-red-700 underline hover:no-underline"
          >
            Intentar de nuevo
          </button>
        </div>
      )}

      {/* Recipe Result */}
      {recipe && (
        <div className="animate-fade-in">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Tu Receta Personalizada
          </h2>
          <RecipeCard recipe={recipe} countryCode={countryCode} />

          {/* Generate Another Button */}
          <div className="text-center mt-6">
            <button
              onClick={handleGenerateRecipe}
              disabled={isLoading}
              className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2 mx-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Generar otra receta
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
