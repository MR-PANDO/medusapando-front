import { getTranslations } from "next-intl/server"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export async function generateMetadata() {
  const t = await getTranslations("pages.terms")
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  }
}

export default async function TerminosCondicionesPage() {
  const t = await getTranslations("pages.terms")
  const tCommon = await getTranslations("common")
  return (
    <div className="content-container py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <LocalizedClientLink href="/" className="hover:text-[#5B8C3E]">
          {tCommon("breadcrumbHome")}
        </LocalizedClientLink>
        <span>/</span>
        <span className="text-gray-800 font-medium">{t("breadcrumb")}</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {t("title")}
        </h1>
        <p className="text-gray-600">
          {t("lastUpdated")}
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className="bg-[#5B8C3E]/5 border-l-4 border-[#5B8C3E] p-6 rounded-r-xl mb-8">
          <p className="text-gray-700 m-0">
            {t("intro")}
          </p>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("s1Title")}</h2>
          <p className="text-gray-600 leading-relaxed">
            {t("s1Text")}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("s2Title")}</h2>

          <h3 className="text-xl font-bold text-gray-700 mt-6 mb-3">{t("s2_1Title")}</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            {t("s2_1Text")}
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>{t("s2_1Item1")}</li>
            <li>{t("s2_1Item2")}</li>
            <li>{t("s2_1Item3")}</li>
            <li>{t("s2_1Item4")}</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-700 mt-6 mb-3">{t("s2_2Title")}</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            {t("s2_2Text")}
          </p>

          <h3 className="text-xl font-bold text-gray-700 mt-6 mb-3">{t("s2_3Title")}</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            {t("s2_3Text")}
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>{t("s2_3Item1")}</li>
            <li>{t("s2_3Item2")}</li>
            <li>{t("s2_3Item3")}</li>
            <li>{t("s2_3Item4")}</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-4">
            {t("s2_3Note")}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("s3Title")}</h2>

          <h3 className="text-xl font-bold text-gray-700 mt-6 mb-3">{t("s3_1Title")}</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            {t("s3_1Text")}
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>{t("s3_1Item1")}</li>
            <li>{t("s3_1Item2")}</li>
            <li>{t("s3_1Item3")}</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-700 mt-6 mb-3">{t("s3_2Title")}</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            {t("s3_2Text")}
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>{t("s3_2Item1")}</li>
            <li>{t("s3_2Item2")}</li>
            <li>{t("s3_2Item3")}</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-700 mt-6 mb-3">{t("s3_3Title")}</h3>
          <p className="text-gray-600 leading-relaxed">
            {t("s3_3Text")}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("s4Title")}</h2>
          <p className="text-gray-600 leading-relaxed">
            {t("s4Text")}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("s5Title")}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {t("s5Text")}
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>{t("s5Item1")}</li>
            <li>{t("s5Item2")}</li>
            <li>{t("s5Item3")}</li>
            <li>{t("s5Item4")}</li>
            <li>{t("s5Item5")}</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-4">
            {t("s5Note")}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("s6Title")}</h2>
          <p className="text-gray-600 leading-relaxed">
            {t("s6Text")}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("s7Title")}</h2>
          <p className="text-gray-600 leading-relaxed">
            {t("s7Text")}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("s8Title")}</h2>
          <p className="text-gray-600 leading-relaxed">
            {t("s8Text")}
          </p>
          <ul className="list-none pl-0 text-gray-600 space-y-2 mt-4">
            <li>{t("s8Item1")}</li>
            <li>{t("s8Item2")}</li>
            <li>{t("s8Item3")}</li>
          </ul>
        </section>
      </div>

      {/* Related Links */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="font-bold text-gray-800 mb-4">{t("relatedDocs")}</h3>
        <div className="flex flex-wrap gap-4">
          <LocalizedClientLink
            href="/tratamiento-datos"
            className="text-[#5B8C3E] hover:underline"
          >
            {t("relatedDataPolicy")}
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/habeas-data"
            className="text-[#5B8C3E] hover:underline"
          >
            {t("relatedHabeasData")}
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/servicio-cliente"
            className="text-[#5B8C3E] hover:underline"
          >
            {t("relatedCustomerService")}
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
