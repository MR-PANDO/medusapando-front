"use client"

import { useState } from "react"
import { Recipe } from "../../types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import { addToCart } from "@lib/data/cart"

interface RecipeCardProps {
  recipe: Recipe
  countryCode: string
}

export default function RecipeCard({ recipe, countryCode }: RecipeCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

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

  const handleAddAllToCart = async () => {
    if (recipe.products.length === 0) return

    setIsAddingToCart(true)
    try {
      // Add each product to cart
      for (const product of recipe.products) {
        await addToCart({
          variantId: product.variantId,
          quantity: 1,
          countryCode,
        })
      }
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 3000)
    } catch (error) {
      console.error("Error adding products to cart:", error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const totalPrice = recipe.products.reduce((sum, p) => sum + (p.price || 0), 0)

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-5 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="inline-block px-2 py-0.5 bg-white/20 rounded text-xs font-medium mb-2">
              {recipe.dietName}
            </span>
            <h3 className="text-lg font-bold leading-tight">{recipe.title}</h3>
          </div>
          <span className={`flex-shrink-0 px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
        </div>
        <p className="text-emerald-100 text-sm mt-2 line-clamp-2">{recipe.description}</p>
      </div>

      {/* Meta Info */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b text-xs text-gray-600">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {recipe.prepTime}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
            {recipe.cookTime}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {recipe.servings} porc.
          </span>
        </div>
      </div>

      {/* Nutrition Info */}
      {recipe.nutrition && (
        <div className="px-4 py-3 border-b">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-orange-50 rounded-lg p-2">
              <div className="text-orange-600 font-bold text-sm">{recipe.nutrition.calories}</div>
              <div className="text-[10px] text-gray-500 uppercase">kcal</div>
            </div>
            <div className="bg-amber-50 rounded-lg p-2">
              <div className="text-amber-600 font-bold text-sm">{recipe.nutrition.carbs}g</div>
              <div className="text-[10px] text-gray-500 uppercase">Carbs</div>
            </div>
            <div className="bg-red-50 rounded-lg p-2">
              <div className="text-red-600 font-bold text-sm">{recipe.nutrition.protein}g</div>
              <div className="text-[10px] text-gray-500 uppercase">Proteína</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-2">
              <div className="text-blue-600 font-bold text-sm">{recipe.nutrition.fat}g</div>
              <div className="text-[10px] text-gray-500 uppercase">Grasa</div>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-2">Por porción (valores aproximados)</p>
        </div>
      )}

      {/* Products from Store - Always visible */}
      {recipe.products.length > 0 && (
        <div className="p-4 border-b">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4z" />
            </svg>
            Productos necesarios ({recipe.products.length})
          </h4>
          <div className="space-y-2">
            {recipe.products.map((product) => (
              <LocalizedClientLink
                key={product.id}
                href={`/products/${product.handle}`}
                className="flex items-center gap-3 bg-gray-50 hover:bg-emerald-50 rounded-lg p-2 transition-colors"
              >
                {product.thumbnail && (
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={40}
                    height={40}
                    className="rounded-md object-cover"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-gray-800 text-sm block truncate">{product.title}</span>
                  {product.price && (
                    <span className="text-emerald-600 text-xs">
                      ${product.price.toLocaleString("es-CO")}
                    </span>
                  )}
                </div>
              </LocalizedClientLink>
            ))}
          </div>

          {/* Add All to Cart Button */}
          <button
            onClick={handleAddAllToCart}
            disabled={isAddingToCart || recipe.products.length === 0}
            className={`
              w-full mt-4 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2
              transition-all duration-200
              ${addedToCart
                ? "bg-green-500 text-white"
                : isAddingToCart
                ? "bg-gray-200 text-gray-400 cursor-wait"
                : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg"
              }
            `}
          >
            {addedToCart ? (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Agregado al carrito
              </>
            ) : isAddingToCart ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Agregando...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Agregar todo al carrito
                {totalPrice > 0 && (
                  <span className="bg-white/20 px-2 py-0.5 rounded ml-1">
                    ${totalPrice.toLocaleString("es-CO")}
                  </span>
                )}
              </>
            )}
          </button>
        </div>
      )}

      {/* Expandable Section */}
      <div className="px-4 py-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
        >
          <span>Ver receta completa</span>
          <svg
            className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t">
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
                  <span className="text-emerald-500 mt-0.5">•</span>
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
      )}
    </div>
  )
}
