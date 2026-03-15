import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import { getTranslations } from "next-intl/server"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import ProductActionsPreview from "./product-actions-preview"
import WishlistButton from "./wishlist-button"
import ImageZoomButton from "./image-zoom-button"

type UnitPricing = {
  unit_type: string
  unit_amount: number
  base_unit_amount: number
}

type ProductWithBrand = HttpTypes.StoreProduct & {
  brand?: { id: string; name: string }
}

export default async function ProductPreview({
  product,
  isFeatured,
  region,
  countryCode,
  translation,
}: {
  product: ProductWithBrand
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
  countryCode?: string
  translation?: { title?: string | null; description?: string | null }
}) {
  const t = await getTranslations("products")
  const { cheapestPrice } = getProductPrice({
    product,
  })

  // Get unit pricing and review data from product metadata
  const metadata = product.metadata as Record<string, unknown> | undefined
  const unitPricing = metadata?.unit_pricing as UnitPricing | undefined
  const avgRating = Number(metadata?.avg_rating) || 0
  const reviewCount = Number(metadata?.review_count) || 0

  // Get first variant for add to cart
  const firstVariant = product.variants?.[0]
  const variantId = firstVariant?.id

  // Check stock status — product is in stock if ANY variant has stock or allows backorder
  const inStock =
    !product.variants || product.variants.length === 0
      ? true
      : product.variants.some(
          (v) =>
            !v.manage_inventory ||
            v.allow_backorder ||
            (v.inventory_quantity ?? 0) > 0
        )

  // Calculate discount percentage
  const discountPercentage = Number(cheapestPrice?.percentage_diff) || 0
  const hasDiscount = discountPercentage > 0

  // Default country code from region
  const resolvedCountryCode =
    countryCode || region.countries?.[0]?.iso_2 || "ve"

  return (
    <div
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
      data-testid="product-wrapper"
    >
      {/* Wishlist button */}
      <WishlistButton productId={product.id!} variantId={variantId} />

      {/* Discount badge */}
      {hasDiscount && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          -{discountPercentage}%
        </div>
      )}

      {/* Product image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <LocalizedClientLink href={`/products/${product.handle}`} className="block w-full h-full">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
            className="!rounded-none !shadow-none"
          />
        </LocalizedClientLink>
        <ImageZoomButton
          imageSrc={product.thumbnail || product.images?.[0]?.url || null}
          alt={product.title || ""}
        />
      </div>

      {/* Product info */}
      <div className="p-3">
        {/* Availability + Rating row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <span
              className={`w-2 h-2 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`}
            />
            <Text className="text-xs text-gray-600">
              {inStock ? t("available") : t("outOfStock")}
            </Text>
          </div>
          {/* Stars — always show, gray when no reviews */}
          <div className="flex items-center gap-0.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-3 h-3 ${avgRating > 0 && star <= Math.round(avgRating) ? "text-amber-400" : "text-gray-200"}`}
                  fill={avgRating > 0 && star <= Math.round(avgRating) ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={avgRating > 0 && star <= Math.round(avgRating) ? 0 : 1}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              ))}
            </div>
            {reviewCount > 0 && (
              <span className="text-[10px] text-gray-400">({reviewCount})</span>
            )}
          </div>
        </div>

        {/* Brand */}
        {product.brand && (
          <Text className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            {product.brand.name}
          </Text>
        )}

        {/* Title */}
        <LocalizedClientLink href={`/products/${product.handle}`}>
          <Text
            className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-emerald-600 transition-colors min-h-[2.5rem]"
            data-testid="product-title"
          >
            {translation?.title || product.title}
          </Text>
        </LocalizedClientLink>

        {/* Price section */}
        <div className="mt-2">
          {cheapestPrice && (
            <PreviewPrice price={cheapestPrice} unitPricing={unitPricing} />
          )}
        </div>

        {/* Add to cart section */}
        {variantId && (
          <ProductActionsPreview
            variantId={variantId}
            countryCode={resolvedCountryCode}
            inStock={!!inStock}
          />
        )}
      </div>
    </div>
  )
}
