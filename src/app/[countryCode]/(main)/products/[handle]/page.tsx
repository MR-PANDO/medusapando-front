import { Metadata } from "next"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"
import { listProducts } from "@lib/data/products"
import { getRegion, listRegions } from "@lib/data/regions"
import { getSeoMetadata } from "@lib/data/seo"
import { buildMetadata } from "@modules/seo/utils/build-metadata"
import SeoHead from "@modules/seo/components/seo-head"
import FaqSection from "@modules/seo/components/faq-section"
import GeoSection from "@modules/seo/components/geo-section"
import SxoIntentLayout from "@modules/seo/components/sxo-intent-layout"
import ProductTemplate from "@modules/products/templates"
import { HttpTypes } from "@medusajs/types"

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
  searchParams: Promise<{ v_id?: string }>
}

export async function generateStaticParams() {
  try {
    const countryCodes = await listRegions().then((regions) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    )

    if (!countryCodes) {
      return []
    }

    const promises = countryCodes.map(async (country) => {
      const { response } = await listProducts({
        countryCode: country,
        queryParams: { limit: 100, fields: "handle" },
      })

      return {
        country,
        products: response.products,
      }
    })

    const countryProducts = await Promise.all(promises)

    return countryProducts
      .flatMap((countryData) =>
        countryData.products.map((product) => ({
          countryCode: countryData.country,
          handle: product.handle,
        }))
      )
      .filter((param) => param.handle)
  } catch (error) {
    console.error(
      `Failed to generate static paths for product pages: ${
        error instanceof Error ? error.message : "Unknown error"
      }.`
    )
    return []
  }
}

function getImagesForVariant(
  product: HttpTypes.StoreProduct,
  selectedVariantId?: string
) {
  if (!selectedVariantId || !product.variants) {
    return product.images
  }

  const variant = product.variants!.find((v) => v.id === selectedVariantId)
  if (!variant || !variant.images.length) {
    return product.images
  }

  const imageIdsMap = new Map(variant.images.map((i) => [i.id, true]))
  return product.images!.filter((i) => imageIdsMap.has(i.id))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { handle } = params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const product = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle },
  }).then(({ response }) => response.products[0])

  if (!product) {
    notFound()
  }

  const fallback = {
    title: `${product.title} | Medusa Store`,
    description: product.description || product.title,
    image: product.thumbnail || undefined,
  }

  try {
    const seo = await getSeoMetadata("product", product.id)
    return buildMetadata(seo, fallback)
  } catch {
    return buildMetadata(null, fallback)
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  const region = await getRegion(params.countryCode)
  const searchParams = await props.searchParams

  const selectedVariantId = searchParams.v_id

  if (!region) {
    notFound()
  }

  const pricedProduct = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle: params.handle },
  }).then(({ response }) => response.products[0])

  const images = getImagesForVariant(pricedProduct, selectedVariantId)

  if (!pricedProduct) {
    notFound()
  }

  let seo = null
  try {
    seo = await getSeoMetadata("product", pricedProduct.id)
  } catch {
    // SEO fetch failed — render page without SEO enhancements
  }

  return (
    <>
      {seo && <SeoHead seo={seo} />}
      <ProductTemplate
        product={pricedProduct}
        region={region}
        countryCode={params.countryCode}
        images={images}
      />
      {seo && (
        <div className="content-container">
          <FaqSection seo={seo} />
          <GeoSection seo={seo} />
          <SxoIntentLayout seo={seo} />
        </div>
      )}
    </>
  )
}
