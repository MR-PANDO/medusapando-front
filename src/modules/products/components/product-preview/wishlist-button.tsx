"use client"

import { useState } from "react"

type WishlistButtonProps = {
  productId: string
}

export default function WishlistButton({ productId }: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    // TODO: Implement wishlist persistence with localStorage or backend
  }

  return (
    <button
      onClick={toggleWishlist}
      className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all"
      type="button"
      title={isWishlisted ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 transition-colors ${
          isWishlisted ? "text-red-500 fill-red-500" : "text-gray-400"
        }`}
        fill={isWishlisted ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  )
}
