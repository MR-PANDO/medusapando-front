"use client"
import React, { useState } from "react"

// ⬇️ CAMBIA ESTA URL POR TU IMAGEN DE BANNER ⬇️
const BANNER_IMAGE = "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2074&auto=format&fit=crop"

const categories = [
  { 
    name: "Fresh Vegetables", 
    icon: "vegetables",
    hasSubmenu: true,
    submenu: ["Organic Vegetables", "Local Produce", "Seasonal Items"]
  },
  { 
    name: "Milk & Ice Creams", 
    icon: "milk",
    hasSubmenu: true,
    submenu: ["Fresh Milk", "Ice Cream", "Yogurt"]
  },
  { 
    name: "Fresh Juice", 
    icon: "juice",
    hasSubmenu: true,
    submenu: ["Orange Juice", "Green Juice", "Smoothies"]
  },
  { 
    name: "Ocean Foods", 
    icon: "fish",
    hasSubmenu: true,
    submenu: ["Fresh Fish", "Seafood", "Sushi Grade"]
  },
  { 
    name: "Seeds & Spices", 
    icon: "seeds",
    hasSubmenu: false 
  },
  { 
    name: "Sandwich", 
    icon: "sandwich",
    hasSubmenu: false 
  },
  { 
    name: "Canned Food", 
    icon: "canned",
    hasSubmenu: false 
  },
  { 
    name: "Wraps & Rolls", 
    icon: "wraps",
    hasSubmenu: false 
  },
]

const CategoryIcon = ({ icon }: { icon: string }) => {
  const icons: Record<string, React.ReactNode> = {
    vegetables: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M12 3c-2 0-4 2-4 5 0 2 1 4 4 4s4-2 4-4c0-3-2-5-4-5z" />
        <path d="M8 12c-3 0-5 2-5 5s2 4 5 4c2 0 4-1 4-4" />
        <path d="M16 12c3 0 5 2 5 5s-2 4-5 4c-2 0-4-1-4-4" />
        <path d="M12 8v13" />
      </svg>
    ),
    milk: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M8 2h8v4l2 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V8l2-2V2z" />
        <path d="M8 2h8" />
        <path d="M6 12h12" />
      </svg>
    ),
    juice: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M8 2h8l1 5v13a2 2 0 01-2 2h-6a2 2 0 01-2-2V7l1-5z" />
        <path d="M7 7h10" />
        <circle cx="12" cy="14" r="3" />
      </svg>
    ),
    fish: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M2 12c3-4 7-6 12-6 3 0 5 1 7 3-2 2-4 3-7 3-5 0-9-2-12-6z" />
        <path d="M2 12c3 4 7 6 12 6 3 0 5-1 7-3" />
        <circle cx="17" cy="10" r="1" fill="currentColor" />
        <path d="M20 9l3-2-3-2" />
      </svg>
    ),
    seeds: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <ellipse cx="8" cy="10" rx="3" ry="4" />
        <ellipse cx="16" cy="10" rx="3" ry="4" />
        <ellipse cx="12" cy="16" rx="3" ry="4" />
        <path d="M8 6V4M16 6V4M12 12v-2" />
      </svg>
    ),
    sandwich: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M4 11h16l-2 8H6l-2-8z" />
        <path d="M4 11c0-4 3-7 8-7s8 3 8 7" />
        <path d="M7 14h10M7 17h10" />
      </svg>
    ),
    canned: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <ellipse cx="12" cy="5" rx="7" ry="3" />
        <path d="M5 5v14c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
        <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
      </svg>
    ),
    wraps: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M3 12c0-5 4-9 9-9l6 9-6 9c-5 0-9-4-9-9z" />
        <path d="M9 8l3 4-3 4" />
        <circle cx="15" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  }
  return <span className="text-[#5B8C3E]">{icons[icon]}</span>
}

const MenuItem = ({ 
  category, 
  isOpen, 
  onToggle 
}: { 
  category: typeof categories[0]
  isOpen: boolean
  onToggle: () => void
}) => {
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <CategoryIcon icon={category.icon} />
          <span className="text-sm text-gray-700 group-hover:text-[#5B8C3E] transition-colors">
            {category.name}
          </span>
        </div>
        {category.hasSubmenu && (
          <svg 
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>
      
      {/* Submenu */}
      {category.hasSubmenu && category.submenu && (
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-gray-50 py-2">
            {category.submenu.map((item) => (
              <a
                key={item}
                href="#"
                className="block px-12 py-2 text-sm text-gray-600 hover:text-[#5B8C3E] hover:bg-gray-100 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const Hero = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMenu = (name: string) => {
    setOpenMenu(openMenu === name ? null : name)
  }

  return (
    <div className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
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

        {/* Sidebar Menu - Floating with margin */}
        <aside 
          className={`
            fixed lg:absolute inset-y-0 left-0 z-30
            w-72 lg:w-72 bg-white shadow-xl
            transform transition-transform duration-300 ease-in-out
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            overflow-y-auto
            lg:inset-y-auto lg:top-8 lg:left-8 lg:bottom-auto
          `}
        >
          {/* Menu Header */}
          <div className="bg-[#333] text-white px-5 py-4 flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="font-semibold tracking-wide text-sm uppercase">All Categories</span>
          </div>

          {/* Menu Items */}
          <nav className="bg-white">
            {categories.map((category) => (
              <MenuItem
                key={category.name}
                category={category}
                isOpen={openMenu === category.name}
                onToggle={() => toggleMenu(category.name)}
              />
            ))}
          </nav>
        </aside>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Hero Content - Positioned to the right of menu */}
        <div className="flex items-center justify-center lg:justify-start min-h-[500px] md:min-h-[600px] lg:min-h-[700px] px-6 py-20 lg:py-0 lg:pl-[340px] lg:pr-12">
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

            <button 
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#5B8C3E] text-white rounded-full 
              font-medium text-sm uppercase tracking-wider
              hover:bg-[#4A7A2E] transition-all duration-300 
              hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              Comprar Ahora
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Google Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600&display=swap');
      `}</style>
    </div>
  )
}

export default Hero