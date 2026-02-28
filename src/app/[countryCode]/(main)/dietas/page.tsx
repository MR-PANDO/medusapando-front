import { getTranslations } from "next-intl/server"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import { getTranslatedDiets } from "@lib/data/diets"
import brushPattern from "@assets/brush-pattern.png"

// Force dynamic rendering to avoid static/cookies conflict with layout
export const dynamic = "force-dynamic"

export async function generateMetadata() {
  const t = await getTranslations("dietPages")
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  }
}

export default async function DietasPage() {
  const t = await getTranslations("dietPages")
  const tDiet = await getTranslations("dietContent")
  const diets = getTranslatedDiets(tDiet)
  return (
    <div className="content-container py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1 bg-[#5B8C3E]/10 text-[#5B8C3E] text-sm font-medium rounded-full mb-4">
          {t("nutritionalGuide")}
        </span>
        <h1
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {t("findYourLifestyle")}
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          {t("heroDescription")}
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-[#5B8C3E] mb-1">8</div>
          <div className="text-gray-600 text-sm">{t("dietTypes")}</div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-1">500+</div>
          <div className="text-gray-600 text-sm">{t("products")}</div>
        </div>
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-pink-600 mb-1">100%</div>
          <div className="text-gray-600 text-sm">{t("verifiedInfo")}</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-1">24h</div>
          <div className="text-gray-600 text-sm">{t("fastDelivery")}</div>
        </div>
      </div>

      {/* Diets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {diets.map((diet, index) => (
          <LocalizedClientLink
            key={diet.id}
            href={`/dietas/${diet.slug}`}
            className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl
                       transition-all duration-300 hover:-translate-y-1 border border-gray-100
                       overflow-hidden"
          >
            {/* Background Accent */}
            <div
              className="absolute top-0 right-0 w-48 h-48 opacity-10 transition-opacity duration-300 group-hover:opacity-20"
              style={{
                backgroundColor: diet.brushColor,
                borderRadius: "0 1rem 0 100%",
              }}
            />

            <div className="flex gap-6">
              {/* Icon with Brush */}
              <div className="relative w-24 h-24 flex-shrink-0">
                <div
                  className="absolute inset-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: diet.brushColor,
                    WebkitMaskImage: `url(${brushPattern.src})`,
                    maskImage: `url(${brushPattern.src})`,
                    WebkitMaskPosition: "center center",
                    maskPosition: "center center",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={diet.icon}
                    alt={diet.name}
                    width={52}
                    height={52}
                    className="object-contain transition-all duration-300
                               group-hover:brightness-0 group-hover:invert"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-[#5B8C3E] transition-colors">
                  {diet.name}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {diet.shortDescription}
                </p>

                {/* Benefits Preview */}
                <div className="space-y-1 mb-4">
                  {diet.benefits.slice(0, 2).map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                      <svg
                        className="w-3 h-3 text-[#5B8C3E] flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="line-clamp-1">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center text-[#5B8C3E] text-sm font-medium">
                  <span>{t("learnMoreAbout", { name: diet.name })}</span>
                  <svg
                    className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </LocalizedClientLink>
        ))}
      </div>

      {/* Info Section */}
      <div className="bg-gradient-to-r from-[#5B8C3E]/5 to-emerald-50 rounded-3xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {t("evidenceBasedInfo")}
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {t("evidenceBasedDescription")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <LocalizedClientLink
              href="/store"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#5B8C3E] text-white rounded-full
                         font-medium text-sm hover:bg-[#4A7A2E] transition-all duration-300
                         hover:shadow-lg hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {t("exploreProducts")}
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/recetas"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-800 rounded-full
                         font-medium text-sm border border-gray-200 hover:border-[#5B8C3E]
                         hover:text-[#5B8C3E] transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {t("viewRecipes")}
            </LocalizedClientLink>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-xl">
        <div className="flex items-start gap-4">
          <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h3 className="font-bold text-amber-800 mb-1">{t("importantNotice")}</h3>
            <p className="text-amber-700 text-sm leading-relaxed">
              {t("disclaimerText")}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
