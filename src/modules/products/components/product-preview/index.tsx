import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import ProductActionsPreview from "./product-actions-preview"
import WishlistButton from "./wishlist-button"

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
}: {
  product: ProductWithBrand
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
  countryCode?: string
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  // Get unit pricing from product metadata
  const metadata = product.metadata as Record<string, unknown> | undefined
  const unitPricing = metadata?.unit_pricing as UnitPricing | undefined

  // Get first variant for add to cart
  const firstVariant = product.variants?.[0]
  const variantId = firstVariant?.id

  // Check stock status - assume in stock if manage_inventory is false or inventory_quantity > 0
  const inStock = firstVariant
    ? !firstVariant.manage_inventory ||
      (firstVariant.inventory_quantity && firstVariant.inventory_quantity > 0)
    : true

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
      <WishlistButton productId={product.id!} />

      {/* Discount badge */}
      {hasDiscount && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          -{discountPercentage}%
        </div>
      )}

      {/* Product image */}
      <LocalizedClientLink href={`/products/${product.handle}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
            className="!rounded-none !shadow-none"
          />
        </div>
      </LocalizedClientLink>

      {/* Product info */}
      <div className="p-3">
        {/* Availability status */}
        <div className="flex items-center gap-1 mb-2">
          <span
            className={`w-2 h-2 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`}
          />
          <Text className="text-xs text-gray-600">
            {inStock ? "Disponible" : "Agotado"}
          </Text>
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
            {product.title}
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
