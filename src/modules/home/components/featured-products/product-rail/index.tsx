import { listProducts } from "@lib/data/products"
import { getEntityTranslations } from "@lib/data/translations"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import { getTranslations, getLocale } from "next-intl/server"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  const [t, locale] = await Promise.all([
    getTranslations("home"),
    getLocale(),
  ])

  if (!pricedProducts) {
    return null
  }

  // Fetch product translations for non-default locales
  const productIds = pricedProducts.map((p) => p.id).filter(Boolean) as string[]
  const translationsMap = await getEntityTranslations("product", productIds, locale)

  return (
    <div className="content-container py-12 small:py-24">
      <div className="flex justify-between mb-8">
        <Text className="txt-xlarge">{collection.title}</Text>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          {t("viewAll")}
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-3 gap-x-6 gap-y-24 small:gap-y-36">
        {pricedProducts &&
          pricedProducts.map((product) => {
            const translation = product.id ? translationsMap.get(product.id) : undefined
            return (
              <li key={product.id}>
                <ProductPreview product={product} region={region} isFeatured translation={translation} />
              </li>
            )
          })}
      </ul>
    </div>
  )
}
