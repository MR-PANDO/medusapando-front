import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"

// Diet tags that we use to find related products
const DIET_TAGS = [
  "vegano",
  "vegetariano",
  "sin_lactosa",
  "sin-lactosa",
  "organico",
  "sin_azucar",
  "sin-azucar",
  "paleo",
  "sin_gluten",
  "sin-gluten",
  "keto",
  "kosher",
  "halal",
]

// Fisher-Yates shuffle algorithm for randomization
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // Get diet tags from the current product
  const productDietTags = product.tags
    ?.filter((tag) => {
      const tagValue = tag.value?.toLowerCase() || ""
      return DIET_TAGS.some(
        (dietTag) => tagValue === dietTag || tagValue.includes(dietTag)
      )
    })
    .map((t) => t.id)
    .filter(Boolean) as string[]

  // Build query params - prioritize diet tags
  const queryParams: HttpTypes.StoreProductListParams = {
    region_id: region.id,
    is_giftcard: false,
    limit: 20, // Fetch more products to randomize from
  }

  // If product has diet tags, filter by them
  if (productDietTags && productDietTags.length > 0) {
    queryParams.tag_id = productDietTags
  } else if (product.collection_id) {
    // Fallback to collection if no diet tags
    queryParams.collection_id = [product.collection_id]
  }

  let products = await listProducts({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter(
      (responseProduct) => responseProduct.id !== product.id
    )
  })

  // If no products found with diet tags, try with collection
  if (products.length === 0 && product.collection_id) {
    const fallbackParams: HttpTypes.StoreProductListParams = {
      region_id: region.id,
      collection_id: [product.collection_id],
      is_giftcard: false,
      limit: 20,
    }

    products = await listProducts({
      queryParams: fallbackParams,
      countryCode,
    }).then(({ response }) => {
      return response.products.filter(
        (responseProduct) => responseProduct.id !== product.id
      )
    })
  }

  // If still no products, get any products
  if (products.length === 0) {
    const anyParams: HttpTypes.StoreProductListParams = {
      region_id: region.id,
      is_giftcard: false,
      limit: 20,
    }

    products = await listProducts({
      queryParams: anyParams,
      countryCode,
    }).then(({ response }) => {
      return response.products.filter(
        (responseProduct) => responseProduct.id !== product.id
      )
    })
  }

  if (!products.length) {
    return (
      <p className="text-sm text-gray-500">
        No hay productos relacionados disponibles.
      </p>
    )
  }

  // Shuffle products and take first 4 for randomness
  const randomProducts = shuffleArray(products).slice(0, 4)

  return (
    <div className="flex flex-col gap-4">
      {randomProducts.map((relatedProduct) => {
        const { cheapestPrice } = getProductPrice({ product: relatedProduct })
        const hasDiscount =
          cheapestPrice?.price_type === "sale" &&
          Number(cheapestPrice.percentage_diff) > 0

        return (
          <LocalizedClientLink
            key={relatedProduct.id}
            href={`/products/${relatedProduct.handle}`}
            className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            {/* Thumbnail */}
            <div className="relative w-16 h-16 flex-shrink-0">
              {hasDiscount && (
                <span className="absolute -top-1 -left-1 z-10 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  -{cheapestPrice.percentage_diff}%
                </span>
              )}
              <Thumbnail
                thumbnail={relatedProduct.thumbnail}
                size="square"
                className="!w-16 !h-16 !rounded-md"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                {relatedProduct.title}
              </h4>

              {/* Price */}
              {cheapestPrice && (
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-sm font-bold ${hasDiscount ? "text-red-600" : "text-gray-900"}`}
                  >
                    {cheapestPrice.calculated_price}
                  </span>
                  {hasDiscount && (
                    <span className="text-xs text-gray-400 line-through">
                      {cheapestPrice.original_price}
                    </span>
                  )}
                </div>
              )}
            </div>
          </LocalizedClientLink>
        )
      })}
    </div>
  )
}
