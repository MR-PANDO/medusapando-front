"use client"

import { useLocale } from "next-intl"
import { useRouter } from "next/navigation"
import { locales, type Locale } from "i18n/routing"

export default function LanguageSwitcher() {
  const currentLocale = useLocale()
  const router = useRouter()

  const handleSwitch = (locale: Locale) => {
    if (locale === currentLocale) return
    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=${60 * 60 * 24 * 365}`
    router.refresh()
  }

  return (
    <div className="flex items-center gap-1 text-xs">
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center">
          {i > 0 && <span className="text-gray-300 mx-1">|</span>}
          <button
            onClick={() => handleSwitch(locale)}
            className={`px-1 py-0.5 rounded transition-colors ${
              currentLocale === locale
                ? "text-emerald-700 font-bold"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {locale.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  )
}
