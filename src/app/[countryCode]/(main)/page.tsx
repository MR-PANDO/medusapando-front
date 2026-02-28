import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home")
  const fallback = {
    title: t("metaTitle"),
    description: t("metaDescription"),
  }
  try {
    const seo = await getSeoMetadata("page", "home")
    return buildMetadata(seo, fallback)
  } catch {
    return buildMetadata(null, fallback)
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
