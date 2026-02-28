import { sdk } from "@lib/config"
import { getCacheOptions } from "./cookies"

const DEFAULT_LOCALE = "es"

type TranslationData = {
  title?: string | null
  description?: string | null
}

/**
 * Fetch translations for multiple entities of a given type.
 * Returns empty map for the default locale (es) — no fetch needed.
 */
export async function getEntityTranslations(
  entityType: "product" | "category",
  entityIds: string[],
  locale: string
): Promise<Map<string, TranslationData>> {
  if (locale === DEFAULT_LOCALE || entityIds.length === 0) {
    return new Map()
  }

  try {
    const ids = entityIds.join(",")
    const next = {
      ...(await getCacheOptions("translations")),
    }

    const data = await sdk.client.fetch<{
      translations: Record<string, TranslationData>
    }>(
      `/store/translations/${entityType}?locale=${locale}&entity_ids=${ids}`,
      {
        method: "GET",
        next,
        cache: "force-cache",
      }
    )

    const translations = data.translations || {}

    const map = new Map<string, TranslationData>()
    for (const [entityId, translation] of Object.entries(translations)) {
      map.set(entityId, translation as TranslationData)
    }
    return map
  } catch (error) {
    console.error("Error fetching translations:", error)
    return new Map()
  }
}

/**
 * Fetch translation for a single entity.
 * Returns null for the default locale (es).
 */
export async function getEntityTranslation(
  entityType: "product" | "category",
  entityId: string,
  locale: string
): Promise<TranslationData | null> {
  if (locale === DEFAULT_LOCALE) {
    return null
  }

  try {
    const next = {
      ...(await getCacheOptions("translations")),
    }

    const data = await sdk.client.fetch<{
      translation: TranslationData | null
    }>(
      `/store/translations/${entityType}/${entityId}?locale=${locale}`,
      {
        method: "GET",
        next,
        cache: "force-cache",
      }
    )

    return data.translation || null
  } catch (error) {
    console.error("Error fetching translation:", error)
    return null
  }
}
