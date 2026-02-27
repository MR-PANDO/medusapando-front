"use server"

import { sdk } from "@lib/config"
import { getCacheOptions } from "./cookies"

export type SeoMetadata = {
  id: string
  resource_type: string
  resource_id: string
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string[]
  canonical_url: string | null
  robots: string
  og_title: string | null
  og_description: string | null
  og_image: string | null
  og_type: string
  twitter_card: string
  twitter_title: string | null
  twitter_description: string | null
  structured_data_type: string | null
  structured_data_json: Record<string, any>
  sitemap_priority: number
  sitemap_changefreq: string
  hreflang_entries: { lang: string; url: string }[]
  aeo_faqs: { question: string; answer: string }[]
  aeo_howto_steps: { name: string; text: string; image?: string }[]
  aeo_short_answer: string | null
  geo_entity_summary: string | null
  geo_citations: { source: string; url: string }[]
  geo_key_attributes: { attribute: string; value: string }[]
  sxo_intent: string | null
  sxo_cta_text: string | null
  sxo_internal_links: { anchor_text: string; target_url: string }[]
  sxo_cwv_notes: string | null
  seo_score: number
  aeo_score: number
  geo_score: number
  sxo_score: number
}

export const getSeoMetadata = async (
  resourceType: string,
  resourceId: string
): Promise<SeoMetadata | null> => {
  const next = {
    ...(await getCacheOptions("seo")),
  }

  return sdk.client
    .fetch<{ seo_metadata: SeoMetadata }>(
      `/store/seo/${resourceType}/${resourceId}`,
      {
        method: "GET",
        next,
        cache: "force-cache",
      }
    )
    .then(({ seo_metadata }) => seo_metadata)
    .catch(() => null)
}
