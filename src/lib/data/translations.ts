const BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

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
    const res = await fetch(
      `${BACKEND_URL}/store/translations/${entityType}?locale=${locale}&entity_ids=${ids}`,
      { next: { revalidate: 60 } }
    )

    if (!res.ok) {
      return new Map()
    }

    const data = await res.json()
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
    const res = await fetch(
      `${BACKEND_URL}/store/translations/${entityType}/${entityId}?locale=${locale}`,
      { next: { revalidate: 60 } }
    )

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    return data.translation || null
  } catch (error) {
    console.error("Error fetching translation:", error)
    return null
  }
}
