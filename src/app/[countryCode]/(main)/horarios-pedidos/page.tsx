import { getTranslations } from "next-intl/server"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export async function generateMetadata() {
  const t = await getTranslations("pages.scheduleOrders")
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  }
}

export default async function HorariosPedidosPage() {
  const t = await getTranslations("pages.scheduleOrders")
  const tCommon = await getTranslations("common")

  const DELIVERY_ZONES = [
    {
      zone: t("medellinArea"),
      description: t("medellinAreaDesc"),
      time: t("medellinTime"),
      cost: t("medellinCost"),
    },
    {
      zone: t("orienteArea"),
      description: t("orienteAreaDesc"),
      time: t("orienteTime"),
      cost: t("orienteCost"),
    },
    {
      zone: t("nationalArea"),
      description: t("nationalAreaDesc"),
      time: t("nationalTime"),
      cost: t("nationalCost"),
    },
  ]

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

      {/* Hero Section */}
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1 bg-[#5B8C3E]/10 text-[#5B8C3E] text-sm font-medium rounded-full mb-4">
          {t("heroTag")}
        </span>
        <h1
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {t("heroTitle")}
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          {t("heroDescription")}
        </p>
      </div>

      {/* Ordering Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Physical Store */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8">
          <div className="w-14 h-14 bg-[#5B8C3E] rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">{t("physicalStores")}</h3>
          <p className="text-gray-600 mb-4">
            {t("physicalStoresDesc")}
          </p>
          <LocalizedClientLink
            href="/sedes"
            className="inline-flex items-center text-[#5B8C3E] font-medium hover:underline"
          >
            {t("viewLocations")}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </LocalizedClientLink>
        </div>

        {/* Online */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
          <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">{t("onlineStore")}</h3>
          <p className="text-gray-600 mb-4">
            {t("onlineStoreDesc")}
          </p>
          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center text-blue-600 font-medium hover:underline"
          >
            {t("goToStore")}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </LocalizedClientLink>
        </div>

        {/* Phone */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8">
          <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">{t("byPhone")}</h3>
          <p className="text-gray-600 mb-4">
            {t("byPhoneDesc")}
          </p>
          <a
            href="tel:+576043228482"
            className="inline-flex items-center text-orange-600 font-medium hover:underline"
          >
            604 322 84 82
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm mb-16">
        <div className="bg-gray-50 p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">{t("operationHoursTitle")}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">{t("service")}</th>
                <th className="text-left p-4 font-medium text-gray-600">{t("monSat")}</th>
                <th className="text-left p-4 font-medium text-gray-600">{t("sunHolidays")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-800">{t("physicalStores")}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-600">9:00 AM - 7:30 PM</td>
                <td className="p-4 text-gray-600">9:30 AM - 4:00 PM</td>
              </tr>
              <tr>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-800">{t("onlineDispatches")}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-600">9:00 AM - 4:00 PM</td>
                <td className="p-4 text-gray-500 italic">{t("notOperating")}</td>
              </tr>
              <tr>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-800">{t("phoneService")}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-600">9:00 AM - 4:00 PM</td>
                <td className="p-4 text-gray-500 italic">{t("notAvailable")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Delivery Zones */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          {t("deliveryZonesTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DELIVERY_ZONES.map((zone) => (
            <div key={zone.zone} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-2">{zone.zone}</h3>
              <p className="text-gray-600 text-sm mb-4">{zone.description}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{t("time")}</span>
                  <span className="font-medium text-gray-800">{zone.time}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{t("cost")}</span>
                  <span className="font-medium text-[#5B8C3E]">{zone.cost}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 mb-16">
        <h3 className="font-bold text-amber-800 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {t("importantInfoTitle")}
        </h3>
        <ul className="space-y-3 text-amber-700 text-sm">
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {t("importantItem1")}
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {t("importantItem2")}
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {t("importantItem3")}
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {t("importantItem4")}
          </li>
        </ul>
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-50 rounded-3xl p-8 md:p-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {t("paymentTitle")}
        </h2>
        <p className="text-gray-600 mb-8">
          {t("paymentDescription")}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-white rounded-xl px-6 py-4 shadow-sm">
            <span className="font-bold text-gray-800">{t("cash")}</span>
          </div>
          <div className="bg-white rounded-xl px-6 py-4 shadow-sm">
            <span className="font-bold text-blue-600">{t("bankTransfer")}</span>
          </div>
          <div className="bg-white rounded-xl px-6 py-4 shadow-sm">
            <span className="font-bold text-gray-800">{t("cards")}</span>
          </div>
          <div className="bg-white rounded-xl px-6 py-4 shadow-sm">
            <span className="font-bold text-[#E91E63]">{t("nequi")}</span>
          </div>
          <div className="bg-white rounded-xl px-6 py-4 shadow-sm">
            <span className="font-bold text-orange-600">{t("vouchers")}</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-6">
          {t("paymentNote")}
        </p>
      </div>
    </div>
  )
}
