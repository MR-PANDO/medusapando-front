"use client"

import { useState, useEffect, useRef, useCallback, ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"
import Image from 'next/image'
import { useTranslations } from "next-intl"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import LanguageSwitcher from "@modules/common/components/language-switcher"
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

// Diet data for dropdown (nameKey maps to diets.* translations)
const DIET_NAV_ITEMS = [
  { id: "vegano", nameKey: "vegan" as const, slug: "vegano", icon: VeganoSvg, brushColor: "#4ade80" },
  { id: "vegetariano", nameKey: "vegetarian" as const, slug: "vegetariano", icon: VegetarianoSvg, brushColor: "#bef264" },
  { id: "sin-lactosa", nameKey: "lactoseFree" as const, slug: "sin-lactosa", icon: SinLactosaSvg, brushColor: "#fbcfe8" },
  { id: "organico", nameKey: "organic" as const, slug: "organico", icon: OrganicoSvg, brushColor: "#22c55e" },
  { id: "sin-azucar", nameKey: "sugarFree" as const, slug: "sin-azucar", icon: SinAzucarSvg, brushColor: "#fef08a" },
  { id: "paleo", nameKey: "paleo" as const, slug: "paleo", icon: PaleoSvg, brushColor: "#fcd34d" },
  { id: "sin-gluten", nameKey: "glutenFree" as const, slug: "sin-gluten", icon: SinGlutenSvg, brushColor: "#f9a8d4" },
  { id: "keto", nameKey: "keto" as const, slug: "keto", icon: KetoSvg, brushColor: "#bfdbfe" },
]

// Quick nav links for the second row (nameKey maps to nav.* translations)
const NAV_LINKS = [
  { nameKey: "home" as const, href: "/" },
  { nameKey: "store" as const, href: "/store" },
  { nameKey: "offers" as const, href: "/store?tags=ofertas", highlight: true },
  { nameKey: "new" as const, href: "/store?tags=nuevo" },
  { nameKey: "brands" as const, href: "/brands" },
  { nameKey: "diets" as const, href: "/dietas", hasDropdown: true },
  { nameKey: "recipes" as const, href: "/recetas", isNew: true },
]

type NavHeaderProps = {
  sideMenu: ReactNode
  searchBox: ReactNode
  cartButton: ReactNode
  cartButtonCompact?: ReactNode
}

export default function NavHeader({ sideMenu, searchBox, cartButton, cartButtonCompact }: NavHeaderProps) {
  const t = useTranslations("nav")
  const tDiets = useTranslations("diets")
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDietsOpen, setIsDietsOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const isStorePage = pathname?.includes("/store")
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

            {/* Right side - Language, Account & Cart */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Language Switcher */}
              <LanguageSwitcher />

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
                  <span className="text-xs text-gray-500">{t("signIn")}</span>
                  <p className="text-sm font-medium">{t("myAccount")}</p>
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
                    key={link.nameKey}
                    className="relative"
                    onMouseEnter={handleDietsMouseEnter}
                    onMouseLeave={handleDietsMouseLeave}
                  >
                    <LocalizedClientLink
                      href={link.href}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors inline-flex items-center gap-1"
                    >
                      {t(link.nameKey)}
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
                          <h3 className="text-sm font-bold text-gray-800">{t("exploreByDiet")}</h3>
                          <LocalizedClientLink
                            href="/dietas"
                            className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                          >
                            {t("viewAll")}
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
                                    alt={tDiets(diet.nameKey)}
                                    width={22}
                                    height={22}
                                    className="object-contain transition-all duration-200 group-hover:brightness-0 group-hover:invert"
                                  />
                                </div>
                              </div>
                              <span className="text-sm text-gray-700 group-hover:text-emerald-600 font-medium transition-colors">
                                {tDiets(diet.nameKey)}
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
                            {t("viewAllProducts")}
                          </LocalizedClientLink>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <LocalizedClientLink
                    key={link.nameKey}
                    href={link.href}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      link.highlight
                        ? 'text-red-600 hover:text-red-700'
                        : 'text-gray-700 hover:text-emerald-600'
                    }`}
                  >
                    {t(link.nameKey)}
                    {link.highlight && (
                      <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-red-500 text-white rounded uppercase">
                        {t("sale")}
                      </span>
                    )}
                    {link.isNew && (
                      <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-emerald-500 text-white rounded uppercase">
                        {t("ai")}
                      </span>
                    )}
                  </LocalizedClientLink>
                )
              ))}
            </nav>

            {/* Right side - always on bottom row */}
            <div className="flex items-center gap-1 sm:gap-3 ml-auto">
              {/* Mobile inline search — expands from right to left */}
              {isMobileSearchOpen ? (
                <div className="flex items-center gap-2 flex-1 md:hidden animate-in slide-in-from-right duration-200">
                  <div className="flex-1">
                    {searchBox}
                  </div>
                  <button
                    onClick={() => setIsMobileSearchOpen(false)}
                    className="p-2 text-gray-600 hover:text-gray-900 flex-shrink-0"
                    type="button"
                    aria-label="Cerrar busqueda"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  {/* Search icon */}
                  <button
                    onClick={() => setIsMobileSearchOpen(true)}
                    className={`p-2 text-gray-600 hover:text-emerald-600 ${
                      isScrolled ? 'block' : 'md:hidden'
                    }`}
                    type="button"
                    aria-label="Buscar"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>

                  {/* Filters icon — opens filters on store page, navigates to store on other pages */}
                  <button
                    onClick={() => {
                      if (isStorePage) {
                        window.dispatchEvent(new Event("open-store-filters"))
                      } else {
                        router.push(pathname?.split("/")[1] ? `/${pathname.split("/")[1]}/store` : "/store")
                      }
                    }}
                    className="p-2 text-gray-600 hover:text-emerald-600 md:hidden"
                    type="button"
                    aria-label="Filtros"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </button>

                  {/* Account icon */}
                  <LocalizedClientLink
                    href="/account"
                    className={`p-2 text-gray-600 hover:text-emerald-600 transition-opacity duration-300 ${
                      isScrolled ? 'opacity-100' : 'sm:opacity-0 sm:pointer-events-none'
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
