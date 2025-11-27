"use client"
import React, { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

// ⬇️ CAMBIA ESTA URL POR TU IMAGEN DE BANNER ⬇️
const BANNER_IMAGE = "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2074&auto=format&fit=crop"

type CategoryWithChildren = HttpTypes.StoreProductCategory & {
  category_children?: HttpTypes.StoreProductCategory[]
}

const CategoryIcon = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-[#5B8C3E]">
      <path d="M4 6h16M4 12h16M4 18h7" />
    </svg>
  )
}

const MenuItem = ({
  category,
  isOpen,
  onToggle,
  onShowSubmenu
}: {
  category: CategoryWithChildren
  isOpen: boolean
  onToggle: () => void
  onShowSubmenu: (category: CategoryWithChildren | null) => void
}) => {
  const hasChildren = category.category_children && category.category_children.length > 0

  return (
    <div
      className="border-b border-gray-100 last:border-b-0"
      onMouseEnter={() => hasChildren && onShowSubmenu(category)}
      onMouseLeave={() => hasChildren && onShowSubmenu(null)}
    >
      <div className="flex items-center">
        <LocalizedClientLink
          href={`/categories/${category.handle}?sortBy=sales_count`}
          className="flex-1 flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors group"
        >
          <CategoryIcon />
          <span className="text-xs text-gray-700 group-hover:text-[#5B8C3E] transition-colors truncate">
            {category.name}
          </span>
        </LocalizedClientLink>
        {hasChildren && (
          <div className="px-3 py-2 text-gray-400">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

export default function HeroClient({
  categories
}: {
  categories: CategoryWithChildren[]
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<CategoryWithChildren | null>(null)

  const toggleMenu = (id: string) => {
    setOpenMenu(openMenu === id ? null : id)
  }

  return (
    <div className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[600px]">
      {/* Full-width Background Banner */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BANNER_IMAGE})` }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/20" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full">

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden absolute top-4 left-4 z-20 bg-white rounded-lg p-3 shadow-lg"
        >
          <svg className="w-6 h-6 text-[#5B8C3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Sidebar Menu Container - includes both main menu and submenu */}
        <div
          className={`
            fixed lg:absolute inset-y-0 left-0 z-30
            flex
            transform transition-transform duration-300 ease-in-out
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            lg:inset-y-auto lg:top-6 lg:left-6 lg:bottom-auto
          `}
        >
          {/* Main Menu */}
          <aside className="w-56 bg-white shadow-xl rounded-lg overflow-hidden">
            {/* Menu Header */}
            <div className="bg-[#333] text-white px-4 py-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="font-semibold tracking-wide text-xs uppercase">Categorías</span>
            </div>

            {/* Menu Items with custom scrollbar */}
            <nav
              className="bg-white overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              style={{ maxHeight: 'calc(600px - 100px)' }}
            >
              {categories.length > 0 ? (
                categories.map((category) => (
                  <MenuItem
                    key={category.id}
                    category={category}
                    isOpen={openMenu === category.id}
                    onToggle={() => toggleMenu(category.id)}
                    onShowSubmenu={setHoveredCategory}
                  />
                ))
              ) : (
                <div className="px-4 py-2 text-xs text-gray-500">
                  No hay categorías disponibles
                </div>
              )}
            </nav>
          </aside>

          {/* Submenu Slide Panel */}
          <div
            className={`
              w-48 bg-white shadow-xl rounded-lg ml-1 overflow-hidden
              transform transition-all duration-300 ease-in-out origin-left
              ${hoveredCategory ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 pointer-events-none'}
            `}
            onMouseEnter={() => hoveredCategory && setHoveredCategory(hoveredCategory)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {hoveredCategory && (
              <>
                <div className="bg-[#5B8C3E] text-white px-4 py-3">
                  <span className="font-semibold text-xs uppercase truncate block">
                    {hoveredCategory.name}
                  </span>
                </div>
                <nav
                  className="overflow-y-auto"
                  style={{ maxHeight: 'calc(600px - 100px)' }}
                >
                  {hoveredCategory.category_children?.map((child) => (
                    <LocalizedClientLink
                      key={child.id}
                      href={`/categories/${child.handle}?sortBy=sales_count`}
                      className="block px-4 py-2 text-xs text-gray-600 hover:text-[#5B8C3E] hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <span className="truncate block">{child.name}</span>
                    </LocalizedClientLink>
                  ))}
                </nav>
              </>
            )}
          </div>
        </div>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Hero Content - Positioned to the right of menu */}
        <div className="flex items-center justify-center lg:justify-start min-h-[500px] md:min-h-[600px] lg:min-h-[600px] px-6 py-20 lg:py-0 lg:pl-[280px] lg:pr-12">
          <div className="max-w-xl text-center lg:text-left">
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
              className="text-base md:text-lg text-white/90 mb-8 leading-relaxed drop-shadow-md max-w-md mx-auto lg:mx-0"
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
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600&display=swap');

        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 2px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 2px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
    </div>
  )
}
