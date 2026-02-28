import { getTranslations } from "next-intl/server"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export async function generateMetadata() {
  const t = await getTranslations("pages.dataPolicy")
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  }
}

export default async function TratamientoDatosPage() {
  const t = await getTranslations("pages.dataPolicy")
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
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-gray-600 m-0">
              <strong>Razón Social:</strong> Vita Integral SAS<br />
              <strong>NIT:</strong> 900779886<br />
              <strong>Dirección:</strong> Av. Nutibara Trv. 39B 77-40, Medellín, Antioquia<br />
              <strong>Email:</strong> info@vitaintegral.co<br />
              <strong>Teléfono:</strong> 604 322 84 82
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("s2Title")}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {t("s2Intro")}
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>{t("s2Item1")}</li>
            <li>{t("s2Item2")}</li>
            <li>{t("s2Item3")}</li>
            <li>{t("s2Item4")}</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("s3Title")}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {t("s3Intro")}
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>{t("s3Item1")}</li>
            <li>{t("s3Item2")}</li>
            <li>{t("s3Item3")}</li>
            <li>{t("s3Item4")}</li>
            <li>{t("s3Item5")}</li>
            <li>{t("s3Item6")}</li>
            <li>{t("s3Item7")}</li>
            <li>{t("s3Item8")}</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("s4Title")}</h2>
          <p className="text-gray-600 leading-relaxed">
            {t("s4Text")}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("s5Title")}</h2>
          <p className="text-gray-600 leading-relaxed">
            {t("s5Text")}
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
          <p className="text-gray-600 leading-relaxed mb-4">
            {t("s8Intro")}
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>{t("s8Item1")}</li>
            <li>{t("s8Item2")}</li>
            <li>{t("s8Item3")}</li>
            <li>{t("s8Item4")}</li>
            <li>{t("s8Item5")}</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("s9Title")}</h2>
          <p className="text-gray-600 leading-relaxed">
            {t("s9Intro")}
          </p>
          <div className="bg-gray-50 rounded-xl p-6 mt-4">
            <p className="text-gray-600 m-0">
              <strong>Email:</strong> vitaintegral1@gmail.com<br />
              <strong>Teléfono:</strong> 604 322 84 82 ext. 4<br />
              <strong>Dirección:</strong> Av. Nutibara Trv. 39B 77-40, Medellín
            </p>
          </div>
          <p className="text-gray-600 leading-relaxed mt-4">
            {t("s9Note")}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("s10Title")}</h2>
          <p className="text-gray-600 leading-relaxed">
            {t("s10Text")}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t("s11Title")}</h2>
          <p className="text-gray-600 leading-relaxed">
            {t("s11Text")}
          </p>
        </section>
      </div>

      {/* Related Links */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="font-bold text-gray-800 mb-4">{t("relatedDocs")}</h3>
        <div className="flex flex-wrap gap-4">
          <LocalizedClientLink
            href="/habeas-data"
            className="text-[#5B8C3E] hover:underline"
          >
            {t("relatedHabeasData")}
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/terminos-condiciones"
            className="text-[#5B8C3E] hover:underline"
          >
            {t("relatedTerms")}
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
