"use client"

import { instantMeiliSearch } from "@meilisearch/instant-meilisearch"
import { useParams } from "next/navigation"
import { useState, useRef, useEffect, useCallback } from "react"
import { useTranslations, useLocale } from "next-intl"
import { InstantSearch, useSearchBox, useHits } from "react-instantsearch"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { addToCart } from "@lib/data/cart"

const { searchClient } = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILISEARCH_HOST || "http://localhost:7700",
  process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY || ""
)

type ProductHit = {
  id: string
  title: string
  title_en?: string
  handle: string
  description?: string
  description_en?: string
  thumbnail?: string
  variant_id?: string
}

function SearchInput({
  onFocus,
  onBlur,
}: {
  onFocus: () => void
  onBlur: () => void
}) {
  const t = useTranslations("search")
  const { refine } = useSearchBox()
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState("")
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    // Debounce the search to prevent re-renders that dismiss mobile keyboard
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      refine(value)
    }, 300)
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="search"
        value={inputValue}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={t("placeholder")}
        className="w-full h-10 px-4 pr-10 text-sm bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white transition-colors"
        autoComplete="off"
      />
      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  )
}

function AddToCartButton({
  variantId,
  countryCode
}: {
  variantId: string
  countryCode: string
}) {
  const t = useTranslations("search")
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!variantId) return

    setIsAdding(true)
    try {
      await addToCart({
        variantId,
        quantity,
        countryCode,
      })
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } catch (error) {
      console.error("Failed to add to cart:", error)
    } finally {
      setIsAdding(false)
    }
  }

  const decrementQty = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (quantity > 1) setQuantity(q => q - 1)
  }

  const incrementQty = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (quantity < 10) setQuantity(q => q + 1)
  }

  return (
    <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
      <div className="flex items-center border border-gray-200 rounded">
        <button
          onClick={decrementQty}
          className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
          type="button"
        >
          -
        </button>
        <span className="px-2 py-1 text-sm min-w-[24px] text-center">{quantity}</span>
        <button
          onClick={incrementQty}
          className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
          type="button"
        >
          +
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        disabled={isAdding || !variantId}
        className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
          added
            ? "bg-green-500 text-white"
            : isAdding
            ? "bg-gray-300 text-gray-500 cursor-wait"
            : "bg-black text-white hover:bg-gray-800"
        }`}
        type="button"
      >
        {added ? t("added") : isAdding ? "..." : t("add")}
      </button>
    </div>
  )
}

function SearchResults({ onResultClick }: { onResultClick: () => void }) {
  const t = useTranslations("search")
  const locale = useLocale()
  const { hits } = useHits<ProductHit>()
  const params = useParams()
  const countryCode = (params.countryCode as string) || "ve"

  if (hits.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        {t("noResults")}
      </div>
    )
  }

  return (
    <div>
      {hits.slice(0, 8).map((hit) => (
        <div
          key={hit.id}
          className="flex items-center gap-3 md:gap-4 p-3 md:p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
        >
          <LocalizedClientLink
            href={`/products/${hit.handle}`}
            className="w-16 h-16 md:w-12 md:h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50"
            onClick={onResultClick}
          >
            <Thumbnail thumbnail={hit.thumbnail} size="square" />
          </LocalizedClientLink>
          <div className="flex-1 min-w-0">
            <LocalizedClientLink
              href={`/products/${hit.handle}`}
              onClick={onResultClick}
            >
              <p className="text-sm md:text-sm font-semibold text-gray-900 line-clamp-2 md:truncate hover:text-emerald-600 transition-colors">
                {locale === "en" ? (hit.title_en || hit.title) : hit.title}
              </p>
            </LocalizedClientLink>
            {(hit.description || hit.description_en) && (
              <p className="text-xs text-gray-500 line-clamp-1 mt-0.5 hidden md:block">
                {locale === "en" ? (hit.description_en || hit.description) : hit.description}
              </p>
            )}
          </div>
          {hit.variant_id && (
            <div className="hidden md:block">
              <AddToCartButton
                variantId={hit.variant_id}
                countryCode={countryCode}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function SearchContent() {
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const { query } = useSearchBox()
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [handleClickOutside])

  useEffect(() => {
    if (query && query.length > 0 && isFocused) {
      setIsOpen(true)
    }
  }, [query, isFocused])

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <SearchInput
        onFocus={() => {
          setIsFocused(true)
          if (query && query.length > 0) {
            setIsOpen(true)
          }
        }}
        onBlur={() => {
          setIsFocused(false)
        }}
      />
      {isOpen && query && query.length > 0 && (
        <div className="fixed md:absolute left-0 right-0 md:left-auto md:right-auto top-auto mt-2 bg-white border border-gray-200 md:rounded-lg shadow-lg z-[100] md:w-full max-h-[70vh] md:max-h-[400px] overflow-hidden flex flex-col">
          {/* Header with close button */}
          <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-gray-100 md:hidden flex-shrink-0">
            <span className="text-sm text-gray-700 font-semibold">Resultados</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
              type="button"
              aria-label="Cerrar resultados"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="overflow-y-auto flex-1">
            <SearchResults onResultClick={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default function SearchBox() {
  return (
    <InstantSearch
      indexName="products"
      searchClient={searchClient}
      future={{ preserveSharedStateOnUnmount: true }}
    >
      <SearchContent />
    </InstantSearch>
  )
}
