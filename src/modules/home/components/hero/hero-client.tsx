"use client"
import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

// Change this URL to your banner image
const BANNER_IMAGE = "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2074&auto=format&fit=crop"

export default function HeroClient() {
  return (
    <div className="relative w-full min-h-[400px] md:min-h-[500px] lg:min-h-[550px]">
      {/* Full-width Background Banner */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BANNER_IMAGE})` }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-black/30" />
      </div>

      {/* Hero Content - Centered */}
      <div className="relative z-10 flex items-center justify-center min-h-[400px] md:min-h-[500px] lg:min-h-[550px] px-6 py-16">
        <div className="max-w-2xl text-center">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 drop-shadow-lg"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              textShadow: '2px 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            Comida Natural
            <br />
            <span className="text-[#7CB342]">100% Orgánica</span>
          </h1>

          <p
            className="text-base md:text-lg text-white/90 mb-8 leading-relaxed drop-shadow-md max-w-lg mx-auto"
            style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.4)' }}
          >
            Descubre nuestra selección de productos naturales, orgánicos y
            adaptados a tu estilo de vida saludable.
          </p>

          <LocalizedClientLink
            href="/store"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#5B8C3E] text-white rounded-full
            font-medium text-sm uppercase tracking-wider
            hover:bg-[#4A7A2E] transition-all duration-300
            hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
          >
            Comprar Ahora
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </LocalizedClientLink>
        </div>
      </div>

      {/* Font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600&display=swap');
      `}</style>
    </div>
  )
}
