import { Metadata } from "next"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import foundersImage from "../../../../assets/fundadores.jpg"
import { getSeoMetadata } from "@lib/data/seo"
import { buildMetadata } from "@modules/seo/utils/build-metadata"
import SeoHead from "@modules/seo/components/seo-head"
import FaqSection from "@modules/seo/components/faq-section"
import GeoSection from "@modules/seo/components/geo-section"
import SxoIntentLayout from "@modules/seo/components/sxo-intent-layout"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.about")
  const FALLBACK_META = {
    title: t("metaTitle"),
    description: t("metaDescription"),
  }
  try {
    const seo = await getSeoMetadata("page", "quienes-somos")
    return buildMetadata(seo, FALLBACK_META)
  } catch {
    return buildMetadata(null, FALLBACK_META)
  }
}

export default async function QuienesSomosPage() {
  const t = await getTranslations("pages.about")
  const tCommon = await getTranslations("common")

  let seo = null
  try {
    seo = await getSeoMetadata("page", "quienes-somos")
  } catch {}

  return (
    <>
    {seo && <SeoHead seo={seo} />}
    <div className="content-container py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <LocalizedClientLink href="/" className="hover:text-[#5B8C3E]">
          {tCommon("breadcrumbHome")}
        </LocalizedClientLink>
        <span>/</span>
        <span className="text-gray-800 font-medium">{t("breadcrumb")}</span>
      </nav>

      {/* Hero Section with Founders Image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <span className="inline-block px-4 py-1 bg-[#5B8C3E]/10 text-[#5B8C3E] text-sm font-medium rounded-full mb-4">
            {t("heroTitle")}
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {t("heroSubtitle")}
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {t("heroDescription")}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <div className="w-12 h-12 bg-[#5B8C3E] rounded-full flex items-center justify-center text-white font-bold border-2 border-white">
                C
              </div>
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-white">
                P
              </div>
            </div>
            <div>
              <p className="font-bold text-gray-800">{t("founders")}</p>
              <p className="text-sm text-gray-500">{t("foundersRole")}</p>
            </div>
          </div>
        </div>

        {/* Founders Image */}
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={foundersImage}
              alt="Carlos y Patricia, fundadores de Vita Integral"
              width={595}
              height={744}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#5B8C3E]/20 rounded-2xl -z-10" />
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-200/30 rounded-full -z-10" />

          {/* Badge */}
          <div className="absolute bottom-6 left-6 bg-white rounded-xl p-4 shadow-lg">
            <p className="text-sm text-gray-500">Desde</p>
            <p className="text-2xl font-bold text-[#5B8C3E]">2012</p>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-4xl mx-auto mb-16">
        {/* The Beginning */}
        <div className="relative pl-8 pb-12 border-l-2 border-[#5B8C3E]/30">
          <div className="absolute left-0 top-0 w-4 h-4 bg-[#5B8C3E] rounded-full -translate-x-[9px]"></div>
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8">
            <span className="text-[#5B8C3E] font-bold text-sm">{t("beginningsTag")}</span>
            <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-4">
              {t("beginningsTitle")}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t("beginningsText")}
            </p>
          </div>
        </div>

        {/* International Experience */}
        <div className="relative pl-8 pb-12 border-l-2 border-[#5B8C3E]/30">
          <div className="absolute left-0 top-0 w-4 h-4 bg-[#5B8C3E] rounded-full -translate-x-[9px]"></div>
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <span className="text-[#5B8C3E] font-bold text-sm">{t("internationalTag")}</span>
            <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-4">
              {t("internationalTitle")}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t("internationalText")}
            </p>
          </div>
        </div>

        {/* Birth of Vita Integral */}
        <div className="relative pl-8 pb-12 border-l-2 border-[#5B8C3E]/30">
          <div className="absolute left-0 top-0 w-4 h-4 bg-[#5B8C3E] rounded-full -translate-x-[9px]"></div>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8">
            <span className="text-orange-600 font-bold text-sm">{t("foundingDate")}</span>
            <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-4">
              {t("foundingTitle")}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t("foundingText")}
            </p>
          </div>
        </div>

        {/* Challenges */}
        <div className="relative pl-8 pb-12 border-l-2 border-[#5B8C3E]/30">
          <div className="absolute left-0 top-0 w-4 h-4 bg-[#5B8C3E] rounded-full -translate-x-[9px]"></div>
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <span className="text-[#5B8C3E] font-bold text-sm">{t("challengesTag")}</span>
            <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-4">
              {t("challengesTitle")}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t("challengesText")}
            </p>
          </div>
        </div>

        {/* Today */}
        <div className="relative pl-8">
          <div className="absolute left-0 top-0 w-4 h-4 bg-[#5B8C3E] rounded-full -translate-x-[9px]"></div>
          <div className="bg-gradient-to-br from-[#5B8C3E]/10 to-emerald-50 rounded-2xl p-8">
            <span className="text-[#5B8C3E] font-bold text-sm">{t("todayTag")}</span>
            <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-4">
              {t("todayTitle")}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t("todayText")}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
          <div className="text-4xl font-bold text-[#5B8C3E] mb-2">40+</div>
          <div className="text-gray-600 text-sm">{t("stat1")}</div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
          <div className="text-4xl font-bold text-[#5B8C3E] mb-2">2012</div>
          <div className="text-gray-600 text-sm">{t("stat2")}</div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
          <div className="text-4xl font-bold text-[#5B8C3E] mb-2">3</div>
          <div className="text-gray-600 text-sm">{t("stat3")}</div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm">
          <div className="text-4xl font-bold text-[#5B8C3E] mb-2">500+</div>
          <div className="text-gray-600 text-sm">{t("stat4")}</div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#5B8C3E] to-emerald-600 rounded-3xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          {t("ctaTitle")}
        </h2>
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
          {t("ctaDescription")}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#5B8C3E] rounded-full
                       font-medium text-sm hover:bg-gray-100 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {t("ctaExplore")}
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/sedes"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-full
                       font-medium text-sm hover:bg-white/30 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {t("ctaLocations")}
          </LocalizedClientLink>
        </div>
      </div>
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
