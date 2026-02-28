import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import DietFilters from "@modules/common/components/diet-filters"
import DietsSection from "@modules/home/components/diets-section"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { getSeoMetadata } from "@lib/data/seo"
import { buildMetadata } from "@modules/seo/utils/build-metadata"
import SeoHead from "@modules/seo/components/seo-head"
import FaqSection from "@modules/seo/components/faq-section"
import GeoSection from "@modules/seo/components/geo-section"
import SxoIntentLayout from "@modules/seo/components/sxo-intent-layout"

const FALLBACK_META = {
  title: "Vita Integral - Tienda de Productos Saludables",
  description:
    "Descubre nuestra selección de productos naturales, orgánicos y adaptados a tu estilo de vida saludable.",
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getSeoMetadata("page", "home")
    return buildMetadata(seo, FALLBACK_META)
  } catch {
    return buildMetadata(null, FALLBACK_META)
  }
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  let seo = null
  try {
    seo = await getSeoMetadata("page", "home")
  } catch {
    // SEO fetch failed — render page without SEO enhancements
  }

  return (
    <>
      {seo && <SeoHead seo={seo} />}
      <Hero />
      <DietFilters />
      <DietsSection />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
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
