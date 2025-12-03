"use client"

import { useState, useEffect, useRef, useCallback, ReactNode } from "react"
import Image from 'next/image'
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import brushPattern from "@assets/brush-pattern.png"

// Import diet icons
import VeganoSvg from "@assets/vegano.svg"
import VegetarianoSvg from "@assets/vegetariano.svg"
import SinLactosaSvg from "@assets/sin_lactosa.svg"
import OrganicoSvg from "@assets/organico.svg"
import SinAzucarSvg from "@assets/sin_azucar.svg"
import PaleoSvg from "@assets/paleo.svg"
import SinGlutenSvg from "@assets/sin_gluten.svg"
import KetoSvg from "@assets/keto.svg"

// Diet data for dropdown
const DIET_NAV_ITEMS = [
  { id: "vegano", name: "Vegano", slug: "vegano", icon: VeganoSvg, brushColor: "#4ade80" },
  { id: "vegetariano", name: "Vegetariano", slug: "vegetariano", icon: VegetarianoSvg, brushColor: "#bef264" },
  { id: "sin-lactosa", name: "Sin Lactosa", slug: "sin-lactosa", icon: SinLactosaSvg, brushColor: "#fbcfe8" },
  { id: "organico", name: "Orgánico", slug: "organico", icon: OrganicoSvg, brushColor: "#22c55e" },
  { id: "sin-azucar", name: "Sin Azúcar", slug: "sin-azucar", icon: SinAzucarSvg, brushColor: "#fef08a" },
  { id: "paleo", name: "Paleo", slug: "paleo", icon: PaleoSvg, brushColor: "#fcd34d" },
  { id: "sin-gluten", name: "Sin Gluten", slug: "sin-gluten", icon: SinGlutenSvg, brushColor: "#f9a8d4" },
  { id: "keto", name: "Keto", slug: "keto", icon: KetoSvg, brushColor: "#bfdbfe" },
]

// Quick nav links for the second row
const NAV_LINKS = [
  { name: "Inicio", href: "/" },
  { name: "Tienda", href: "/store" },
  { name: "Ofertas", href: "/store?tags=ofertas", highlight: true },
  { name: "Nuevos", href: "/store?tags=nuevo" },
  { name: "Marcas", href: "/brands" },
  { name: "Dietas", href: "/dietas", hasDropdown: true },
  { name: "Recetas", href: "/recetas", isNew: true },
]

type NavHeaderProps = {
  sideMenu: ReactNode
  searchBox: ReactNode
  cartButton: ReactNode
  cartButtonCompact?: ReactNode
}

export default function NavHeader({ sideMenu, searchBox, cartButton, cartButtonCompact }: NavHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDietsOpen, setIsDietsOpen] = useState(false)
  const dietsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isScrolledRef = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleDietsMouseEnter = () => {
    if (dietsTimeoutRef.current) {
      clearTimeout(dietsTimeoutRef.current)
    }
    setIsDietsOpen(true)
  }

  const handleDietsMouseLeave = () => {
    dietsTimeoutRef.current = setTimeout(() => {
      setIsDietsOpen(false)
    }, 150)
  }

  const updateScrollState = useCallback((scrolled: boolean) => {
    if (isScrolledRef.current !== scrolled) {
      isScrolledRef.current = scrolled
      setIsScrolled(scrolled)
    }
  }, [])

  useEffect(() => {
    // Set initial scroll state after mount
    const initialScrolled = window.scrollY > 80
    isScrolledRef.current = initialScrolled
    setIsScrolled(initialScrolled)

    let ticking = false
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      lastScrollY = window.scrollY

      if (!ticking) {
        // Use requestAnimationFrame for smooth, batched updates
        window.requestAnimationFrame(() => {
          const scrollY = lastScrollY

          // Clear any pending timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
          }

          // Wide hysteresis gap: collapse at 100px, expand only at top (< 10px)
          if (isScrolledRef.current && scrollY < 10) {
            // Small debounce when expanding back
            timeoutRef.current = setTimeout(() => {
              updateScrollState(false)
            }, 100)
          } else if (!isScrolledRef.current && scrollY > 100) {
            updateScrollState(true)
          }

          ticking = false
        })

        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [updateScrollState])

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      {/* Top Row - Logo, Search, Account, Cart - Hidden when scrolled */}
      <header
        className={`bg-white border-b border-gray-200 transition-all duration-300 ${
          isScrolled ? 'max-h-0 opacity-0 border-b-0 pointer-events-none overflow-hidden' : 'max-h-20 opacity-100 overflow-visible'
        }`}
      >
        <div className="content-container h-20">
          <nav className="flex items-center justify-between h-20 gap-4">
            {/* Logo */}
            <LocalizedClientLink
              href="/"
              className="flex-shrink-0"
              data-testid="nav-store-link"
            >
              <Image
                src="/logo.svg"
                alt="Logo"
                width={180}
                height={50}
                priority
              />
            </LocalizedClientLink>

            {/* Search Box - center */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              {searchBox}
            </div>

            {/* Right side - Account & Cart */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Account */}
              <LocalizedClientLink
                className="hidden sm:flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors"
                href="/account"
                data-testid="nav-account-link"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <div className="hidden lg:block">
                  <span className="text-xs text-gray-500">Iniciar Sesión</span>
                  <p className="text-sm font-medium">Mi Cuenta</p>
                </div>
              </LocalizedClientLink>

              {/* Cart - hidden when scrolled (will show in bottom row) */}
              <div className={`transition-opacity duration-300 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                {cartButton}
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Bottom Row - Categories Button + Navigation Links - Always visible */}
      <div className={`bg-white border-b border-gray-200 transition-all duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}>
        <div className="content-container">
          <div className="flex items-center h-12 gap-4">
            {/* Categories Menu Button */}
            {sideMenu}

            {/* Logo - only visible when scrolled on desktop, hidden on mobile */}
            <LocalizedClientLink
              href="/"
              className={`hidden sm:block flex-shrink-0 transition-all duration-300 ${
                isScrolled ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
              }`}
            >
              <Image
                src="/logo.svg"
                alt="Logo"
                width={120}
                height={35}
                priority
              />
            </LocalizedClientLink>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                link.hasDropdown ? (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={handleDietsMouseEnter}
                    onMouseLeave={handleDietsMouseLeave}
                  >
                    <LocalizedClientLink
                      href={link.href}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors inline-flex items-center gap-1"
                    >
                      {link.name}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isDietsOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </LocalizedClientLink>

                    {/* Diets Dropdown */}
                    <div
                      className={`absolute top-full left-0 mt-1 w-80 bg-white rounded-xl shadow-xl border border-gray-100
                                  transition-all duration-200 origin-top z-50
                                  ${isDietsOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-bold text-gray-800">Explora por Dieta</h3>
                          <LocalizedClientLink
                            href="/dietas"
                            className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                          >
                            Ver todas
                          </LocalizedClientLink>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {DIET_NAV_ITEMS.map((diet) => (
                            <LocalizedClientLink
                              key={diet.id}
                              href={`/dietas/${diet.slug}`}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                              <div className="relative w-10 h-10 flex-shrink-0">
                                <div
                                  className="absolute inset-0 transition-transform duration-200 group-hover:scale-110"
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
                                    width={22}
                                    height={22}
                                    className="object-contain transition-all duration-200 group-hover:brightness-0 group-hover:invert"
                                  />
                                </div>
                              </div>
                              <span className="text-sm text-gray-700 group-hover:text-emerald-600 font-medium transition-colors">
                                {diet.name}
                              </span>
                            </LocalizedClientLink>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <LocalizedClientLink
                            href="/store"
                            className="flex items-center justify-center gap-2 w-full py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Ver Todos los Productos
                          </LocalizedClientLink>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <LocalizedClientLink
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      link.highlight
                        ? 'text-red-600 hover:text-red-700'
                        : 'text-gray-700 hover:text-emerald-600'
                    }`}
                  >
                    {link.name}
                    {link.highlight && (
                      <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-red-500 text-white rounded uppercase">
                        Sale
                      </span>
                    )}
                    {link.isNew && (
                      <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-emerald-500 text-white rounded uppercase">
                        IA
                      </span>
                    )}
                  </LocalizedClientLink>
                )
              ))}
            </nav>

            {/* Right side - always on bottom row */}
            <div className="flex items-center gap-2 sm:gap-3 ml-auto">
              {/* Search icon - only when scrolled on desktop, always on mobile */}
              <LocalizedClientLink
                href="/store"
                className={`p-2 text-gray-600 hover:text-emerald-600 ${
                  isScrolled ? 'block' : 'md:hidden'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </LocalizedClientLink>

              {/* Account icon - visible when scrolled (on all devices) */}
              <LocalizedClientLink
                href="/account"
                className={`p-2 text-gray-600 hover:text-emerald-600 transition-opacity duration-300 ${
                  isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none hidden sm:block'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </LocalizedClientLink>

              {/* Cart icon - visible when scrolled */}
              <div className={`transition-opacity duration-300 ${
                isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none hidden'
              }`}>
                {cartButtonCompact}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
