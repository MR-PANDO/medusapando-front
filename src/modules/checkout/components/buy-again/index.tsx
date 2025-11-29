"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import { RecentlyPurchasedItem } from "@lib/data/orders"
import { addToCart } from "@lib/data/cart"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type BuyAgainProps = {
  items: RecentlyPurchasedItem[]
  countryCode: string
}

export default function BuyAgain({ items, countryCode }: BuyAgainProps) {
  const [addingItems, setAddingItems] = useState<Record<string, boolean>>({})
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({})
  const [isPending, startTransition] = useTransition()

  if (!items || items.length === 0) {
    return null
  }

  const handleAddToCart = async (item: RecentlyPurchasedItem) => {
    if (!item.variant_id) return

    setAddingItems((prev) => ({ ...prev, [item.product_id]: true }))

    startTransition(async () => {
      try {
        await addToCart({
          variantId: item.variant_id!,
          quantity: 1,
          countryCode,
        })
        setAddedItems((prev) => ({ ...prev, [item.product_id]: true }))
        // Reset "added" state after 2 seconds
        setTimeout(() => {
          setAddedItems((prev) => ({ ...prev, [item.product_id]: false }))
        }, 2000)
      } catch (error) {
        console.error("Error adding to cart:", error)
      } finally {
        setAddingItems((prev) => ({ ...prev, [item.product_id]: false }))
      }
    })
  }

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-5 h-5 text-emerald-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900">
          Comprar de Nuevo
        </h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Productos que has comprado anteriormente
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {items.map((item) => (
          <div
            key={item.product_id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col"
          >
            {/* Product Image */}
            <LocalizedClientLink
              href={`/products/${item.product_handle}`}
              className="block relative aspect-square bg-gray-100"
            >
              {item.thumbnail ? (
                <Image
                  src={item.thumbnail}
                  alt={item.product_title || "Product"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </LocalizedClientLink>

            {/* Product Info */}
            <div className="p-3 flex flex-col flex-grow">
              <LocalizedClientLink
                href={`/products/${item.product_handle}`}
                className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-emerald-600 transition-colors mb-1"
              >
                {item.product_title}
              </LocalizedClientLink>

              <p className="text-xs text-gray-500 mb-2">
                Comprado {item.purchase_count}x
              </p>

              <div className="mt-auto">
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  {formatPrice(item.unit_price)}
                </p>

                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={
                    !item.variant_id ||
                    addingItems[item.product_id] ||
                    isPending
                  }
                  className={`w-full py-2 px-3 rounded-md text-xs font-medium transition-all duration-200 ${
                    addedItems[item.product_id]
                      ? "bg-emerald-600 text-white"
                      : addingItems[item.product_id]
                      ? "bg-gray-100 text-gray-400 cursor-wait"
                      : "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {addedItems[item.product_id] ? (
                    <span className="flex items-center justify-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Agregado
                    </span>
                  ) : addingItems[item.product_id] ? (
                    <span className="flex items-center justify-center gap-1">
                      <svg
                        className="w-4 h-4 animate-spin"
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
                      Agregando...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Agregar
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
