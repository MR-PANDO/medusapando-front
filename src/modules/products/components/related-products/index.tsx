import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"

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

  // edit this function to define your related products logic
  const queryParams: HttpTypes.StoreProductListParams = {}
  if (region?.id) {
    queryParams.region_id = region.id
  }
  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id]
  }
  if (product.tags) {
    queryParams.tag_id = product.tags
      .map((t) => t.id)
      .filter(Boolean) as string[]
  }
  queryParams.is_giftcard = false
  queryParams.limit = 4

  const products = await listProducts({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter(
      (responseProduct) => responseProduct.id !== product.id
    )
  })

  if (!products.length) {
    return (
      <p className="text-sm text-gray-500">
        No hay productos relacionados disponibles.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {products.slice(0, 4).map((relatedProduct) => {
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
