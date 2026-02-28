import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"
import { listCategories } from "@lib/data/categories"
import { getSeoMetadata } from "@lib/data/seo"
import { buildMetadata } from "@modules/seo/utils/build-metadata"
import SeoHead from "@modules/seo/components/seo-head"
import FaqSection from "@modules/seo/components/faq-section"
import GeoSection from "@modules/seo/components/geo-section"
import SxoIntentLayout from "@modules/seo/components/sxo-intent-layout"

const FALLBACK_META = {
  title: "Tienda | Vita Integral",
  description: "Explora todos nuestros productos saludables, naturales y organicos.",
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const seo = await getSeoMetadata("page", "store")
    return buildMetadata(seo, FALLBACK_META)
  } catch {
    return buildMetadata(null, FALLBACK_META)
  }
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
    tags?: string
    category?: string
    q?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page, tags, category, q } = searchParams

  const categories = await listCategories()

  let seo = null
  try {
    seo = await getSeoMetadata("page", "store")
  } catch {}

  return (
    <>
      {seo && <SeoHead seo={seo} />}
      <StoreTemplate
        sortBy={sortBy}
        page={page}
        countryCode={params.countryCode}
        tags={tags}
        categoryHandle={category}
        searchQuery={q}
        categories={categories}
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
