"use client"

import { Recipe } from "../../types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

interface RecipeCardProps {
  recipe: Recipe
  countryCode: string
}

export default function RecipeCard({ recipe, countryCode }: RecipeCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil":
        return "bg-green-100 text-green-800"
      case "Medio":
        return "bg-yellow-100 text-yellow-800"
      case "Difícil":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white">
        <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
        <p className="text-emerald-100 text-sm">{recipe.description}</p>
      </div>

      {/* Meta Info */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Prep: {recipe.prepTime}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
            Cocción: {recipe.cookTime}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {recipe.servings} porciones
          </span>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
          {recipe.difficulty}
        </span>
      </div>

      {/* Products from Store */}
      {recipe.products.length > 0 && (
        <div className="p-4 border-b">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4z" />
            </svg>
            Productos de nuestra tienda
          </h4>
          <div className="flex flex-wrap gap-2">
            {recipe.products.map((product) => (
              <LocalizedClientLink
                key={product.id}
                href={`/products/${product.handle}`}
                className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 rounded-lg p-2 transition-colors"
              >
                {product.thumbnail && (
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={32}
                    height={32}
                    className="rounded-md object-cover"
                  />
                )}
                <div className="text-xs">
                  <span className="font-medium text-emerald-800 block">{product.title}</span>
                  <span className="text-emerald-600">{product.quantity}</span>
                </div>
              </LocalizedClientLink>
            ))}
          </div>
        </div>
      )}

      {/* Ingredients */}
      <div className="p-4 border-b">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          Ingredientes
        </h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-gray-600">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-emerald-500 mt-1">•</span>
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div className="p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Instrucciones
        </h4>
        <ol className="space-y-3 text-sm text-gray-600">
          {recipe.instructions.map((step, index) => (
            <li key={index} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Tips */}
      {recipe.tips && (
        <div className="p-4 bg-amber-50 border-t border-amber-100">
          <p className="text-sm text-amber-800 flex items-start gap-2">
            <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span><strong>Tip:</strong> {recipe.tips}</span>
          </p>
        </div>
      )}
    </div>
  )
}
