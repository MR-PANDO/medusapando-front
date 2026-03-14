"use client"

import { Wishlist, removeFromWishlist } from "@lib/data/wishlist"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useState, useTransition } from "react"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductActionsPreview from "@modules/products/components/product-preview/product-actions-preview"

type WishlistTemplateProps = {
  wishlist: Wishlist | null
  region: HttpTypes.StoreRegion
}

export default function WishlistTemplate({ wishlist, region }: WishlistTemplateProps) {
  const t = useTranslations("account")
  const { countryCode } = useParams() as { countryCode: string }
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
        <div className="grid grid-cols-2 small:grid-cols-3 gap-4">
          {items.map((item) => {
            const variant = item.variant
            const product = variant?.product

            return (
              <div
                key={item.id}
                className={`group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden ${
                  removingId === item.id ? "opacity-50" : ""
                }`}
              >
                {/* Remove from wishlist button */}
                <button
                  onClick={() => handleRemove(item.id)}
                  disabled={isPending}
                  className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all"
                  title={t("removeFromWishlist")}
                >
                  <svg
                    className="h-5 w-5 text-red-500 fill-red-500"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={0}
                  >
                    <path
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>

                {/* Product image */}
                <LocalizedClientLink href={`/products/${product?.handle || ""}`}>
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    {product?.thumbnail ? (
                      <Image
                        src={product.thumbnail}
                        alt={product.title || ""}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </LocalizedClientLink>

                {/* Product info */}
                <div className="p-3">
                  {/* Title */}
                  <LocalizedClientLink href={`/products/${product?.handle || ""}`}>
                    <p className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-emerald-600 transition-colors min-h-[2.5rem]">
                      {product?.title || t("unknownProduct")}
                    </p>
                  </LocalizedClientLink>

                  {variant?.title && variant.title !== "Default" && (
                    <p className="text-xs text-gray-500 mt-1">{variant.title}</p>
                  )}

                  {/* Add to cart with quantity */}
                  {variant?.id && (
                    <ProductActionsPreview
                      variantId={variant.id}
                      countryCode={countryCode || region.countries?.[0]?.iso_2 || "co"}
                      inStock={product?.status === "published"}
                    />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
