"use client"

import { Wishlist, removeFromWishlist } from "@lib/data/wishlist"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useState, useTransition } from "react"
import { useTranslations } from "next-intl"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type WishlistTemplateProps = {
  wishlist: Wishlist | null
  region: HttpTypes.StoreRegion
}

export default function WishlistTemplate({ wishlist, region }: WishlistTemplateProps) {
  const t = useTranslations("account")
  const [items, setItems] = useState(wishlist?.items || [])
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleRemove = (itemId: string) => {
    setRemovingId(itemId)
    startTransition(async () => {
      const result = await removeFromWishlist(itemId)
      if (result) {
        setItems(result.items)
      }
      setRemovingId(null)
    })
  }

  return (
    <div className="w-full" data-testid="wishlist-page">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">{t("wishlist")}</h1>
        <p className="text-base-regular text-ui-fg-subtle">
          {t("wishlistDescription")}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <svg
            className="w-16 h-16 text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <p className="text-ui-fg-subtle text-lg mb-2">{t("wishlistEmpty")}</p>
          <p className="text-ui-fg-muted text-sm mb-6">{t("wishlistEmptyHint")}</p>
          <LocalizedClientLink
            href="/store"
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            {t("exploreCatalog")}
          </LocalizedClientLink>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {items.map((item) => {
            const variant = item.variant
            const product = variant?.product
            const price = variant?.calculated_price

            return (
              <div
                key={item.id}
                className={`flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 transition-opacity ${
                  removingId === item.id ? "opacity-50" : ""
                }`}
              >
                {/* Thumbnail */}
                <LocalizedClientLink
                  href={`/products/${product?.handle || ""}`}
                  className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden"
                >
                  {product?.thumbnail ? (
                    <Image
                      src={product.thumbnail}
                      alt={product.title || ""}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </LocalizedClientLink>

                {/* Product info */}
                <div className="flex-1 min-w-0">
                  <LocalizedClientLink
                    href={`/products/${product?.handle || ""}`}
                    className="text-sm font-medium text-gray-900 hover:text-emerald-600 transition-colors line-clamp-2"
                  >
                    {product?.title || t("unknownProduct")}
                  </LocalizedClientLink>
                  {variant?.title && variant.title !== "Default" && (
                    <p className="text-xs text-gray-500 mt-1">{variant.title}</p>
                  )}
                  {price && (
                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      {convertToLocale({
                        amount: price.calculated_amount,
                        currency_code: price.currency_code || region.currency_code,
                      })}
                    </p>
                  )}
                </div>

                {/* Remove button */}
                <button
                  onClick={() => handleRemove(item.id)}
                  disabled={isPending}
                  className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title={t("removeFromWishlist")}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
