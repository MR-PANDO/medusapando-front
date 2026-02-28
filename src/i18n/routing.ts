export const locales = ["es", "en"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "es"

// Map Medusa country codes to locales
export const countryToLocale: Record<string, Locale> = {
  co: "es",
  us: "en",
}
