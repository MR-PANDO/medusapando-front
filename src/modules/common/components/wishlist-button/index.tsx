"use client"

import { addToWishlist, removeFromWishlist } from "@lib/data/wishlist"
import { useState, useTransition } from "react"

type WishlistButtonProps = {
  variantId: string
  initialInWishlist?: boolean
  initialItemId?: string | null
  className?: string
}

export default function WishlistButton({
  variantId,
  initialInWishlist = false,
  initialItemId = null,
  className = "",
}: WishlistButtonProps) {
  const [inWishlist, setInWishlist] = useState(initialInWishlist)
  const [itemId, setItemId] = useState<string | null>(initialItemId)
  const [isPending, startTransition] = useTransition()

  const handleToggle = () => {
    startTransition(async () => {
      if (inWishlist && itemId) {
        const result = await removeFromWishlist(itemId)
        if (result) {
          setInWishlist(false)
          setItemId(null)
        }
      } else {
        const result = await addToWishlist(variantId)
        if (result) {
          const newItem = result.items.find(
            (i) => i.product_variant_id === variantId
          )
          setInWishlist(true)
          setItemId(newItem?.id || null)
        }
      }
    })
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`group relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
        inWishlist
          ? "text-red-500 hover:text-red-600"
          : "text-gray-400 hover:text-red-400"
      } ${isPending ? "opacity-50 cursor-wait" : "cursor-pointer"} ${className}`}
      title={inWishlist ? "Quitar de favoritos" : "Agregar a favoritos"}
      aria-label={inWishlist ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      <svg
        className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
        fill={inWishlist ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={inWishlist ? 0 : 2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  )
}
