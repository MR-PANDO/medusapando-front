"use client"

import { addToWishlist, removeFromWishlist, isInWishlist } from "@lib/data/wishlist"
import { useState, useTransition, useEffect } from "react"

type WishlistButtonProps = {
  productId: string
  variantId?: string
}

export default function WishlistButton({
  productId,
  variantId,
}: WishlistButtonProps) {
  const [inWishlist, setInWishlist] = useState(false)
  const [itemId, setItemId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [checked, setChecked] = useState(false)

  // Check wishlist state on mount
  useEffect(() => {
    if (!variantId) return
    isInWishlist(variantId).then((result) => {
      setInWishlist(result.inWishlist)
      setItemId(result.itemId)
      setChecked(true)
    }).catch(() => setChecked(true))
  }, [variantId])

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!variantId) return

    startTransition(async () => {
      try {
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
      } catch {
        // Silently fail — user might not be logged in
      }
    })
  }

  return (
    <button
      onClick={toggleWishlist}
      disabled={isPending || !variantId || !checked}
      className={`absolute top-2 right-2 z-10 w-10 h-10 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all ${
        isPending ? "opacity-50 cursor-wait" : ""
      }`}
      type="button"
      title={inWishlist ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 transition-colors ${
          inWishlist ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-400"
        }`}
        fill={inWishlist ? "currentColor" : "none"}
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
