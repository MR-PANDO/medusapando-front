import { Metadata } from "next"
import { notFound } from "next/navigation"
import { retrieveBrand } from "@lib/data/brands"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { Heading, Text } from "@medusajs/ui"
import ProductPreview from "@modules/products/components/product-preview"

type Props = {
  params: Promise<{ countryCode: string; id: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const brand = await retrieveBrand(params.id)

  if (!brand) {
    return {
      title: "Marca no encontrada",
    }
  }

  return {
    title: `${brand.name} | Vita Integral`,
    description: `Productos de la marca ${brand.name}`,
  }
}

export default async function BrandPage(props: Props) {
  const params = await props.params
  const { countryCode, id } = params

  const [brand, region] = await Promise.all([
    retrieveBrand(id),
    getRegion(countryCode),
  ])

  if (!brand || !region) {
    notFound()
  }

  // Get products for this brand using the Query API fields parameter
  // This fetches products that are linked to the brand
  const { response } = await listProducts({
    countryCode,
    queryParams: {
      limit: 100,
      fields: "*variants.calculated_price,+variants.inventory_quantity,+brand.*",
    },
  })

  // Filter products by brand ID (since we can't filter by brand in the API yet)
  const brandProducts = response.products.filter(
    (product: any) => product.brand?.id === id
  )

  return (
    <div className="flex flex-col py-6 content-container">
      <div className="mb-8">
        <Heading level="h1" className="text-2xl mb-2">
          {brand.name}
        </Heading>
        <Text className="text-ui-fg-subtle">
          {brandProducts.length} producto{brandProducts.length !== 1 ? "s" : ""}
        </Text>
      </div>

      {brandProducts.length > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-8">
          {brandProducts.map((product: any) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} />
            </li>
          ))}
        </ul>
      ) : (
        <Text className="text-ui-fg-subtle">
          No hay productos disponibles para esta marca.
        </Text>
      )}
    </div>
  )
}
