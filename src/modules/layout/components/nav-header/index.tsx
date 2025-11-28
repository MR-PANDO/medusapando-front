"use client"

import { useState, useEffect, useRef, useCallback, ReactNode } from "react"
import Image from 'next/image'
import LocalizedClientLink from "@modules/common/components/localized-client-link"

// Quick nav links for the second row
const NAV_LINKS = [
  { name: "Inicio", href: "/" },
  { name: "Tienda", href: "/store" },
  { name: "Ofertas", href: "/store?tags=ofertas", highlight: true },
  { name: "Nuevos", href: "/store?tags=nuevo" },
  { name: "Marcas", href: "/brands" },
]

type NavHeaderProps = {
  sideMenu: ReactNode
  searchBox: ReactNode
  cartButton: ReactNode
  cartButtonCompact?: ReactNode
}

export default function NavHeader({ sideMenu, searchBox, cartButton, cartButtonCompact }: NavHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const isScrolledRef = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

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
        className={`bg-white border-b border-gray-200 transition-all duration-300 overflow-hidden ${
          isScrolled ? 'h-0 opacity-0 border-b-0' : 'h-20 opacity-100'
        }`}
      >
        <div className="content-container h-full">
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

            {/* Logo - only visible when scrolled */}
            <LocalizedClientLink
              href="/"
              className={`flex-shrink-0 transition-all duration-300 ${
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
                </LocalizedClientLink>
              ))}
            </nav>

            {/* Right side - always on bottom row */}
            <div className="flex items-center gap-3 ml-auto">
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

              {/* Account icon - only visible when scrolled */}
              <LocalizedClientLink
                href="/account"
                className={`p-2 text-gray-600 hover:text-emerald-600 transition-opacity duration-300 ${
                  isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none hidden md:block'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </LocalizedClientLink>

              {/* Cart icon - only visible when scrolled (compact version with badge) */}
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
