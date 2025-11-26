"use client"

import { instantMeiliSearch } from "@meilisearch/instant-meilisearch"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect, useCallback } from "react"
import { InstantSearch, useSearchBox, useHits } from "react-instantsearch"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"

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

function SearchResults({ onResultClick }: { onResultClick: () => void }) {
  const { hits } = useHits<ProductHit>()
  const router = useRouter()

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
        <LocalizedClientLink
          key={hit.id}
          href={`/products/${hit.handle}`}
          className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors"
          onClick={onResultClick}
        >
          <div className="w-12 h-12 flex-shrink-0">
            <Thumbnail thumbnail={hit.thumbnail} size="square" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {hit.title}
            </p>
            {hit.description && (
              <p className="text-xs text-gray-500 truncate">
                {hit.description}
              </p>
            )}
          </div>
        </LocalizedClientLink>
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
          // Delay closing to allow click on results
          setTimeout(() => {
            if (!isFocused) {
              setIsOpen(false)
            }
          }, 200)
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
