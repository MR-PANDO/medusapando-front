import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

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
}: {
  product: ProductWithBrand
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  // Get unit pricing from product metadata
  const metadata = product.metadata as Record<string, unknown> | undefined
  const unitPricing = metadata?.unit_pricing as UnitPricing | undefined

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div data-testid="product-wrapper">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
        />
        <div className="flex flex-col txt-compact-medium mt-4">
          {product.brand && (
            <Text className="text-ui-fg-muted text-xs font-semibold">
              {product.brand.name}
            </Text>
          )}
          <div className="flex justify-between">
            <Text className="text-ui-fg-subtle" data-testid="product-title">
              {product.title}
            </Text>
            <div className="flex items-center gap-x-2">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} unitPricing={unitPricing} />}
            </div>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
