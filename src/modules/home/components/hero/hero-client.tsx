"use client"
import React, { useState, useEffect } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useSideMenu } from "@lib/context/side-menu-context"

export default function HeroClient() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { open: openSideMenu } = useSideMenu()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="relative w-full min-h-[450px] md:min-h-[520px] lg:min-h-[580px] overflow-hidden bg-white">
      {/* Background Image Container */}
      <div
        className={`absolute inset-0 bg-cover bg-right bg-no-repeat transition-transform duration-700 ${
          isHovered ? "scale-105" : "scale-100"
        }`}
        style={{ backgroundImage: "url('/banner1.webp')" }}
      />

      {/* White overlay on left side for text readability */}
      <div className="absolute inset-y-0 left-0 w-full md:w-[70%] lg:w-[60%] bg-gradient-to-r from-white via-white to-transparent z-[1]" />

      {/* Content Container */}
      <div className="relative z-10 flex items-center min-h-[450px] md:min-h-[520px] lg:min-h-[580px]">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-xl lg:max-w-lg">
            {/* Main Heading */}
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-6 leading-tight transition-all duration-700 delay-100 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Sabor
              <br />
              <span className="text-[#5B8C3E] font-normal">Natural</span>
              <br />
              <span className="text-3xl sm:text-4xl md:text-5xl text-gray-600">
                en tu mesa
              </span>
            </h1>

            {/* Description */}
            <p
              className={`text-base md:text-lg text-gray-600 mb-8 leading-relaxed max-w-md transition-all duration-700 delay-200 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Alimentos conscientes que nutren cuerpo, mente y espíritu.
              Seleccionados con amor para tu bienestar.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all duration-700 delay-300 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <LocalizedClientLink
                href="/store"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#5B8C3E] text-white rounded-full
                font-medium text-xs sm:text-sm uppercase tracking-wider
                hover:bg-[#4A7A2E] transition-all duration-300
                hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Explorar Productos
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </LocalizedClientLink>

              <button
                onClick={openSideMenu}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/80 backdrop-blur-sm text-gray-800 rounded-full
                font-medium text-xs sm:text-sm uppercase tracking-wider border border-gray-200
                hover:bg-white hover:border-[#5B8C3E] hover:text-[#5B8C3E] transition-all duration-300"
              >
                Ver Categorías
              </button>
            </div>

            {/* Trust Indicators */}
            <div
              className={`flex flex-wrap items-center gap-4 sm:gap-6 mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200/50 transition-all duration-700 delay-500 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#5B8C3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs sm:text-sm text-gray-600">100% Natural</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#5B8C3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs sm:text-sm text-gray-600">Entrega 24-72h</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#5B8C3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-xs sm:text-sm text-gray-600">Compra Segura</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600&display=swap');
      `}</style>
    </div>
  )
}
