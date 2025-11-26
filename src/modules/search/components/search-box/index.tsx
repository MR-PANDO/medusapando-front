"use client"

import { instantMeiliSearch } from "@meilisearch/instant-meilisearch"
import { useParams } from "next/navigation"
import { useState, useRef, useEffect, useCallback } from "react"
import { InstantSearch, useSearchBox, useHits } from "react-instantsearch"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { addToCart } from "@lib/data/cart"

const searchClient = instantMeiliSearch(
  process.env.NEXT_PUBLIC_MEILISEARCH_HOST || "http://localhost:7700",
  process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY || ""
)

type ProductHit = {
  id: string
  title: string
  handle: string
  description?: string
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
  const { query, refine } = useSearchBox()
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => refine(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Search products..."
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
        {added ? "Added!" : isAdding ? "..." : "Add"}
      </button>
    </div>
  )
}

function SearchResults({ onResultClick }: { onResultClick: () => void }) {
  const { hits } = useHits<ProductHit>()
  const params = useParams()
  const countryCode = (params.countryCode as string) || "ve"

  if (hits.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No products found
      </div>
    )
  }

  return (
    <div className="max-h-[400px] overflow-y-auto">
      {hits.slice(0, 8).map((hit) => (
        <div
          key={hit.id}
          className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
        >
          <LocalizedClientLink
            href={`/products/${hit.handle}`}
            className="w-12 h-12 flex-shrink-0"
            onClick={onResultClick}
          >
            <Thumbnail thumbnail={hit.thumbnail} size="square" />
          </LocalizedClientLink>
          <div className="flex-1 min-w-0">
            <LocalizedClientLink
              href={`/products/${hit.handle}`}
              onClick={onResultClick}
            >
              <p className="text-sm font-medium text-gray-900 truncate hover:text-gray-600">
                {hit.title}
              </p>
            </LocalizedClientLink>
            {hit.description && (
              <p className="text-xs text-gray-500 truncate">
                {hit.description}
              </p>
            )}
          </div>
          {hit.variant_id && (
            <AddToCartButton
              variantId={hit.variant_id}
              countryCode={countryCode}
            />
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
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <SearchResults onResultClick={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  )
}

export default function SearchBox() {
  return (
    <InstantSearch
      indexName="products"
      searchClient={searchClient.searchClient}
    >
      <SearchContent />
    </InstantSearch>
  )
}
