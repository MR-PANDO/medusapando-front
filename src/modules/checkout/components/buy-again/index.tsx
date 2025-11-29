"use client"

import { useState, useTransition, useRef } from "react"
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
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isPending, startTransition] = useTransition()
  const scrollRef = useRef<HTMLDivElement>(null)

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

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg transition-transform duration-300"
      style={{ transform: isCollapsed ? "translateY(calc(100% - 36px))" : "translateY(0)" }}
    >
      {/* Header - Always visible */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full flex items-center justify-between px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
      >
        <div className="flex items-center gap-2">
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span className="font-medium text-sm">Comprar de Nuevo</span>
          <span className="text-emerald-200 text-xs">
            ({items.length})
          </span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Slider Content */}
      <div className="relative bg-gray-50 px-4 py-2">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:shadow-lg transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:shadow-lg transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-thin px-5"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {items.map((item) => (
            <div
              key={item.product_id}
              className="flex-shrink-0 flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-2 pr-3"
              style={{ scrollSnapAlign: "start" }}
            >
              {/* Product Image */}
              <LocalizedClientLink
                href={`/products/${item.product_handle}`}
                className="block relative w-14 h-14 flex-shrink-0 bg-gray-100 rounded overflow-hidden"
              >
                {item.thumbnail ? (
                  <Image
                    src={item.thumbnail}
                    alt={item.product_title || "Product"}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg
                      className="w-5 h-5"
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
              <div className="flex flex-col min-w-0 max-w-[120px]">
                <LocalizedClientLink
                  href={`/products/${item.product_handle}`}
                  className="text-[11px] font-medium text-gray-900 line-clamp-1 hover:text-emerald-600 transition-colors"
                >
                  {item.product_title}
                </LocalizedClientLink>
                <p className="text-[10px] font-semibold text-gray-700">
                  {formatPrice(item.unit_price)}
                </p>
              </div>

              {/* Add Button */}
              <button
                onClick={() => handleAddToCart(item)}
                disabled={
                  !item.variant_id ||
                  addingItems[item.product_id] ||
                  isPending
                }
                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                  addedItems[item.product_id]
                    ? "bg-emerald-600 text-white"
                    : addingItems[item.product_id]
                    ? "bg-gray-100 text-gray-400 cursor-wait"
                    : "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {addedItems[item.product_id] ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : addingItems[item.product_id] ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
