import LocalizedClientLink from "@modules/common/components/localized-client-link"
import brushPattern from "@assets/brush-pattern.png"
import Image from "next/image"
import { DIETS_DATA } from "@lib/data/diets"

export default function DietsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="content-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-[#5B8C3E]/10 text-[#5B8C3E] text-sm font-medium rounded-full mb-4">
            Tu Estilo de Vida
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Alimentación para{" "}
            <span className="text-[#5B8C3E]">Cada Necesidad</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Descubre productos adaptados a tu dieta. Ya sea por salud, ética o preferencia,
            tenemos opciones deliciosas para ti.
          </p>
        </div>

        {/* Diets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIETS_DATA.map((diet, index) => (
            <LocalizedClientLink
              key={diet.id}
              href={`/dietas/${diet.slug}`}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl
                         transition-all duration-300 hover:-translate-y-1 border border-gray-100
                         overflow-hidden"
            >
              {/* Background Accent */}
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-20 transition-opacity duration-300 group-hover:opacity-30"
                style={{
                  backgroundColor: diet.brushColor,
                  borderRadius: "0 1rem 0 100%",
                }}
              />

              {/* Icon with Brush */}
              <div className="relative w-20 h-20 mb-4">
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
                    width={44}
                    height={44}
                    className="w-11 h-11 object-contain transition-all duration-300
                               group-hover:brightness-0 group-hover:invert"
                  />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#5B8C3E] transition-colors">
                {diet.name}
              </h3>
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
                <span>Descubrir más</span>
                <svg
                  className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </LocalizedClientLink>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <LocalizedClientLink
            href="/dietas"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#5B8C3E] text-white rounded-full
                       font-medium text-sm uppercase tracking-wider
                       hover:bg-[#4A7A2E] transition-all duration-300
                       hover:shadow-xl hover:-translate-y-0.5"
          >
            Ver Todas las Dietas
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}
