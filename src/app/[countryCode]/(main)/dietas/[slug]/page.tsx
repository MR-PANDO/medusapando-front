import { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getDietBySlug, getAllDietSlugs, DIETS_DATA } from "@lib/data/diets"
import brushPattern from "@assets/brush-pattern.png"

type Props = {
  params: Promise<{ countryCode: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const diet = getDietBySlug(slug)

  if (!diet) {
    return {
      title: "Dieta no encontrada | Vita Integral",
    }
  }

  return {
    title: `Dieta ${diet.name} - Guía Completa | Vita Integral`,
    description: diet.fullDescription.substring(0, 160),
  }
}

export async function generateStaticParams() {
  return getAllDietSlugs().map((slug) => ({ slug }))
}

export default async function DietPage({ params }: Props) {
  const { slug, countryCode } = await params
  const diet = getDietBySlug(slug)

  if (!diet) {
    notFound()
  }

  // Get other diets for the sidebar
  const otherDiets = DIETS_DATA.filter((d) => d.slug !== slug)

  return (
    <div className="content-container py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <LocalizedClientLink href="/" className="hover:text-[#5B8C3E]">
          Inicio
        </LocalizedClientLink>
        <span>/</span>
        <LocalizedClientLink href="/dietas" className="hover:text-[#5B8C3E]">
          Dietas
        </LocalizedClientLink>
        <span>/</span>
        <span className="text-gray-800 font-medium">{diet.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Hero Section */}
          <div className="flex items-start gap-6 mb-10">
            {/* Icon with Brush */}
            <div className="relative w-28 h-28 flex-shrink-0">
              <div
                className="absolute inset-0"
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
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
            </div>

            <div>
              <h1
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Dieta <span className="text-[#5B8C3E]">{diet.name}</span>
              </h1>
              <p className="text-gray-600 text-lg">{diet.shortDescription}</p>
            </div>
          </div>

          {/* Full Description */}
          <div className="prose prose-lg max-w-none mb-10">
            <p className="text-gray-700 leading-relaxed">{diet.fullDescription}</p>
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              Beneficios
            </h2>
            <ul className="space-y-4">
              {diet.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Considerations Section */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              Consideraciones Importantes
            </h2>
            <ul className="space-y-4">
              {diet.considerations.map((consideration, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">{consideration}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tips Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              Consejos Prácticos
            </h2>
            <ul className="space-y-4">
              {diet.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Foods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Allowed Foods */}
            <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-emerald-700 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Alimentos Permitidos
              </h3>
              <ul className="space-y-2">
                {diet.allowedFoods.map((food, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700 text-sm">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    {food}
                  </li>
                ))}
              </ul>
            </div>

            {/* Foods to Avoid */}
            <div className="bg-white border-2 border-red-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Alimentos a Evitar
              </h3>
              <ul className="space-y-2">
                {diet.avoidFoods.map((food, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700 text-sm">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    {food}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div
            className="rounded-2xl p-8 text-center"
            style={{ backgroundColor: `${diet.brushColor}20` }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ¿Listo para comenzar tu dieta {diet.name}?
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Descubre nuestra selección de productos {diet.name.toLowerCase()} cuidadosamente
              seleccionados para ayudarte a mantener tu estilo de vida.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <LocalizedClientLink
                href={`/store?tags=${diet.tag}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#5B8C3E] text-white rounded-full
                           font-medium text-sm hover:bg-[#4A7A2E] transition-all duration-300
                           hover:shadow-lg hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Ver Productos {diet.name}
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
                Ver Recetas
              </LocalizedClientLink>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-800 mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                <LocalizedClientLink
                  href={`/store?tags=${diet.tag}`}
                  className="flex items-center gap-3 p-3 bg-emerald-50 text-emerald-700 rounded-xl
                             hover:bg-emerald-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span className="font-medium text-sm">Productos {diet.name}</span>
                </LocalizedClientLink>
                <LocalizedClientLink
                  href="/recetas"
                  className="flex items-center gap-3 p-3 bg-orange-50 text-orange-700 rounded-xl
                             hover:bg-orange-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="font-medium text-sm">Recetas</span>
                </LocalizedClientLink>
              </div>
            </div>

            {/* Other Diets */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-800 mb-4">Otras Dietas</h3>
              <div className="space-y-2">
                {otherDiets.map((otherDiet) => (
                  <LocalizedClientLink
                    key={otherDiet.id}
                    href={`/dietas/${otherDiet.slug}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <div
                        className="absolute inset-0 transition-transform duration-200 group-hover:scale-110"
                        style={{
                          backgroundColor: otherDiet.brushColor,
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
                          src={otherDiet.icon}
                          alt={otherDiet.name}
                          width={22}
                          height={22}
                          className="object-contain transition-all duration-200 group-hover:brightness-0 group-hover:invert"
                        />
                      </div>
                    </div>
                    <span className="text-sm text-gray-700 group-hover:text-[#5B8C3E] font-medium transition-colors">
                      {otherDiet.name}
                    </span>
                  </LocalizedClientLink>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-amber-700 text-xs leading-relaxed">
                  Esta información es solo con fines educativos. Consulta con un profesional antes de iniciar cualquier dieta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
