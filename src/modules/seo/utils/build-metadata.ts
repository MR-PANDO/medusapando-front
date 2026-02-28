import { Metadata } from "next"
import { SeoMetadata } from "@lib/data/seo"

type FallbackData = {
  title?: string
  description?: string
  image?: string
}

const VALID_OG_TYPES = [
  "website",
  "article",
  "book",
  "profile",
  "music.song",
  "music.album",
  "music.playlist",
  "music.radio_station",
  "video.movie",
  "video.episode",
  "video.tv_show",
  "video.other",
]

export function buildMetadata(
  seo: SeoMetadata | null,
  fallback: FallbackData
): Metadata {
  if (!seo) {
    return {
      title: fallback.title || "",
      description: fallback.description || "",
      openGraph: {
        title: fallback.title || "",
        description: fallback.description || "",
        images: fallback.image ? [fallback.image] : [],
      },
    }
  }

  const title = seo.seo_title || fallback.title || ""
  const description = seo.seo_description || fallback.description || ""

  const keywords =
    Array.isArray(seo.seo_keywords) && seo.seo_keywords.length > 0
      ? seo.seo_keywords
      : undefined

  const hreflangEntries = Array.isArray(seo.hreflang_entries)
    ? seo.hreflang_entries
    : []

  const ogType = VALID_OG_TYPES.includes(seo.og_type || "")
    ? seo.og_type
    : "website"

  const metadata: Metadata = {
    title,
    description,
    keywords,
    robots: seo.robots || undefined,
    alternates: {
      canonical: seo.canonical_url || undefined,
      languages:
        hreflangEntries.length > 0
          ? Object.fromEntries(
              hreflangEntries.map((e) => [e.lang, e.url])
            )
          : undefined,
    },
    openGraph: {
      title: seo.og_title || title,
      description: seo.og_description || description,
      images: seo.og_image
        ? [seo.og_image]
        : fallback.image
          ? [fallback.image]
          : [],
      type: ogType as any,
    },
    twitter: {
      card: (seo.twitter_card as any) || "summary_large_image",
      title: seo.twitter_title || title,
      description: seo.twitter_description || description,
    },
  }

  return metadata
}
