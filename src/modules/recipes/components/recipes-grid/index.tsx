"use client"

import { useState } from "react"
import { Recipe, DIET_OPTIONS } from "../../types"
import RecipeCard from "../recipe-card"

interface RecipesGridProps {
  recipes: Recipe[]
  countryCode: string
}

// Helper to get all diets for a recipe (supports old and new format)
function getRecipeDiets(recipe: Recipe): string[] {
  if (recipe.diets && recipe.diets.length > 0) {
    return recipe.diets
  }
  if (recipe.diet) {
    return [recipe.diet]
  }
  return []
}

export default function RecipesGrid({ recipes, countryCode }: RecipesGridProps) {
  const [selectedDiet, setSelectedDiet] = useState<string | null>(null)

  // Filter recipes - a recipe matches if it has the selected diet in its diets array
  const filteredRecipes = selectedDiet
    ? recipes.filter((r) => getRecipeDiets(r).includes(selectedDiet))
    : recipes

  // Count recipes per diet (a recipe can count for multiple diets)
  const getDietCount = (dietId: string): number => {
    return recipes.filter((r) => getRecipeDiets(r).includes(dietId)).length
  }

  return (
    <div>
      {/* Diet Filter Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedDiet(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedDiet === null
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Todas ({recipes.length})
          </button>
          {DIET_OPTIONS.filter(d => d.id !== "all").map((diet) => {
            const count = getDietCount(diet.id)
            if (count === 0) return null
            return (
              <button
                key={diet.id}
                onClick={() => setSelectedDiet(diet.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedDiet === diet.id
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: diet.color }}
                />
                {diet.name} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Recipes Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              countryCode={countryCode}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 text-gray-300 mx-auto mb-4"
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
          <p className="text-gray-500">No hay recetas disponibles para esta dieta</p>
        </div>
      )}
    </div>
  )
}
