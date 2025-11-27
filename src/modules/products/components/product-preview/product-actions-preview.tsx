"use client"

import { useState } from "react"
import { addToCart } from "@lib/data/cart"

type ProductActionsPreviewProps = {
  variantId: string
  countryCode: string
  inStock?: boolean
}

export default function ProductActionsPreview({
  variantId,
  countryCode,
  inStock = true,
}: ProductActionsPreviewProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!variantId || !inStock) return

    setIsAdding(true)
    try {
      await addToCart({
        variantId,
        quantity,
        countryCode,
      })
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } catch (error) {
      console.error("Failed to add to cart:", error)
    } finally {
      setIsAdding(false)
    }
  }

  const decrementQty = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (quantity > 1) setQuantity((q) => q - 1)
  }

  const incrementQty = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (quantity < 99) setQuantity((q) => q + 1)
  }

  return (
    <div
      className="flex items-center justify-between gap-2 mt-3"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Quantity selector */}
      <div className="flex items-center border border-gray-200 rounded-lg bg-white">
        <button
          onClick={decrementQty}
          disabled={!inStock}
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        </button>
        <span className="w-8 h-8 flex items-center justify-center text-sm font-medium">
          {quantity}
        </span>
        <button
          onClick={incrementQty}
          disabled={!inStock}
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>

      {/* Add to basket button */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding || !variantId || !inStock}
        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${
          added
            ? "bg-green-500 text-white"
            : isAdding
            ? "bg-gray-300 text-gray-500 cursor-wait"
            : inStock
            ? "bg-emerald-600 text-white hover:bg-emerald-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        type="button"
        title={added ? "Agregado!" : inStock ? "Agregar al carrito" : "Sin stock"}
      >
        {added ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : isAdding ? (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          // Shopping basket icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        )}
      </button>
    </div>
  )
}
