import { Metadata } from "next"
import { SeoMetadata } from "@lib/data/seo"

type FallbackData = {
  title?: string
  description?: string
  image?: string
}

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

  const metadata: Metadata = {
    title,
    description,
    keywords: seo.seo_keywords?.length ? seo.seo_keywords : undefined,
    robots: seo.robots || undefined,
    alternates: {
      canonical: seo.canonical_url || undefined,
      languages: seo.hreflang_entries?.length
        ? Object.fromEntries(
            seo.hreflang_entries.map((e) => [e.lang, e.url])
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
      type: (seo.og_type as any) || "website",
    },
    twitter: {
      card: (seo.twitter_card as any) || "summary_large_image",
      title: seo.twitter_title || title,
      description: seo.twitter_description || description,
    },
  }

  return metadata
}
