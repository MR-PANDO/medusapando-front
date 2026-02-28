"use server"

import { sdk } from "@lib/config"
import { getCacheOptions } from "./cookies"

export type SeoMetadata = {
  id: string
  resource_type: string
  resource_id: string
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string[] | null
  canonical_url: string | null
  robots: string | null
  og_title: string | null
  og_description: string | null
  og_image: string | null
  og_type: string | null
  twitter_card: string | null
  twitter_title: string | null
  twitter_description: string | null
  structured_data_type: string | null
  structured_data_json: Record<string, any> | null
  sitemap_priority: number | null
  sitemap_changefreq: string | null
  hreflang_entries: { lang: string; url: string }[] | null
  aeo_faqs: { question: string; answer: string }[] | null
  aeo_howto_steps: { name: string; text: string; image?: string }[] | null
  aeo_short_answer: string | null
  geo_entity_summary: string | null
  geo_citations: { source: string; url: string }[] | null
  geo_key_attributes: { attribute: string; value: string }[] | null
  sxo_intent: string | null
  sxo_cta_text: string | null
  sxo_internal_links: { anchor_text: string; target_url: string }[] | null
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
  try {
    const next = {
      ...(await getCacheOptions("seo")),
    }

    const { seo_metadata } = await sdk.client.fetch<{
      seo_metadata: SeoMetadata
    }>(`/store/seo/${resourceType}/${resourceId}`, {
      method: "GET",
      next,
      cache: "force-cache",
    })

    if (!seo_metadata) return null

    // Ensure array fields are always arrays (DB may return null)
    return {
      ...seo_metadata,
      seo_keywords: Array.isArray(seo_metadata.seo_keywords)
        ? seo_metadata.seo_keywords
        : [],
      hreflang_entries: Array.isArray(seo_metadata.hreflang_entries)
        ? seo_metadata.hreflang_entries
        : [],
      aeo_faqs: Array.isArray(seo_metadata.aeo_faqs)
        ? seo_metadata.aeo_faqs
        : [],
      aeo_howto_steps: Array.isArray(seo_metadata.aeo_howto_steps)
        ? seo_metadata.aeo_howto_steps
        : [],
      geo_citations: Array.isArray(seo_metadata.geo_citations)
        ? seo_metadata.geo_citations
        : [],
      geo_key_attributes: Array.isArray(seo_metadata.geo_key_attributes)
        ? seo_metadata.geo_key_attributes
        : [],
      sxo_internal_links: Array.isArray(seo_metadata.sxo_internal_links)
        ? seo_metadata.sxo_internal_links
        : [],
      structured_data_json:
        seo_metadata.structured_data_json &&
        typeof seo_metadata.structured_data_json === "object" &&
        !Array.isArray(seo_metadata.structured_data_json)
          ? seo_metadata.structured_data_json
          : null,
    }
  } catch {
    return null
  }
}
