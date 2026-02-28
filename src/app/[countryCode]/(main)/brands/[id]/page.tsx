import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { retrieveBrand, listProductsByBrand } from "@lib/data/brands"
import { getRegion } from "@lib/data/regions"
import { Heading, Text } from "@medusajs/ui"
import ProductPreview from "@modules/products/components/product-preview"

type Props = {
  params: Promise<{ countryCode: string; id: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const brand = await retrieveBrand(params.id)
  const t = await getTranslations("brands")

  if (!brand) {
    return {
      title: t("brandNotFound"),
    }
  }

  return {
    title: t("brandMetaTitle", { name: brand.name }),
    description: t("brandMetaDescription", { name: brand.name }),
  }
}

export default async function BrandPage(props: Props) {
  const t = await getTranslations("brands")
  const params = await props.params
  const { countryCode, id } = params

  const [brand, region] = await Promise.all([
    retrieveBrand(id),
    getRegion(countryCode),
  ])

  if (!brand || !region) {
    notFound()
  }

  // Get products for this brand
  const { products: brandProducts, count } = await listProductsByBrand({
    brandId: id,
    regionId: region.id,
    limit: 100,
  })

  return (
    <div className="flex flex-col py-6 content-container">
      <div className="mb-8">
        <Heading level="h1" className="text-2xl mb-2">
          {brand.name}
        </Heading>
        <Text className="text-ui-fg-subtle">
          {count !== 1 ? t("productCount", { count }) : t("productCountSingular", { count })}
        </Text>
      </div>

      {brandProducts.length > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-8">
          {brandProducts.map((product: any) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} countryCode={countryCode} />
            </li>
          ))}
        </ul>
      ) : (
        <Text className="text-ui-fg-subtle">
          {t("noProducts")}
        </Text>
      )}
    </div>
  )
}
