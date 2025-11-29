"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { HttpTypes } from "@medusajs/types"

import SortProducts, { SortOptions } from "./sort-products"

type CategoryWithChildren = HttpTypes.StoreProductCategory & {
  category_children?: HttpTypes.StoreProductCategory[]
}

// Diet/lifestyle tags
const DIET_TAGS = [
  { value: "vegano", label: "Vegano" },
  { value: "vegetariano", label: "Vegetariano" },
  { value: "sin-gluten", label: "Sin Gluten" },
  { value: "sin-lactosa", label: "Sin Lactosa" },
  { value: "sin-azucar", label: "Sin Azúcar" },
  { value: "keto", label: "Keto" },
  { value: "paleo", label: "Paleo" },
  { value: "organico", label: "Orgánico" },
]

// Promotions tags
const PROMO_TAGS = [
  { value: "ofertas", label: "Ofertas", highlight: true },
  { value: "nuevo", label: "Nuevos" },
]

type RefinementListProps = {
  sortBy: SortOptions
  categories?: CategoryWithChildren[]
  selectedCategory?: string
  selectedTags?: string
  'data-testid'?: string
}

const RefinementList = ({
  sortBy,
  categories,
  selectedCategory,
  selectedTags,
  'data-testid': dataTestId
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [categorySearch, setCategorySearch] = useState("")
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    categories: true,
    diets: true,
    promotions: true,
    sort: true,
  })

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      // Reset to page 1 when filters change
      params.delete("page")
      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const clearAllFilters = () => {
    router.push(pathname)
  }

  const hasActiveFilters = selectedCategory || selectedTags

  // Get root categories (those without parent)
  const rootCategories = categories?.filter((cat) => !cat.parent_category) || []

  const FilterContent = () => (
    <div className="flex flex-col gap-6">
      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Limpiar filtros
        </button>
      )}

      {/* Categories Section */}
      {rootCategories.length > 0 && (
        <FilterSection
          title="Categorías"
          isExpanded={expandedSections.categories}
          onToggle={() => toggleSection("categories")}
        >
          <div className="flex flex-col gap-3">
            {/* Category Search */}
            <div className="relative">
              <input
                type="text"
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                placeholder="Buscar categoría..."
                className="w-full px-3 py-2 pr-8 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              />
              {categorySearch ? (
                <button
                  type="button"
                  onClick={() => setCategorySearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ) : (
                <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </div>
            {/* Scrollable Category List */}
            <div className="max-h-[180px] overflow-y-auto pr-1 scrollbar-thin">
              <div className="flex flex-col gap-1">
                {rootCategories
                  .filter((cat) =>
                    !categorySearch ||
                    cat.name.toLowerCase().includes(categorySearch.toLowerCase()) ||
                    cat.category_children?.some((child) =>
                      child.name.toLowerCase().includes(categorySearch.toLowerCase())
                    )
                  )
                  .map((category) => (
                    <CategoryItem
                      key={category.id}
                      category={category}
                      selectedCategory={selectedCategory}
                      onSelect={(handle) => setQueryParams("category", selectedCategory === handle ? "" : handle)}
                      searchFilter={categorySearch}
                    />
                  ))}
                {categorySearch && rootCategories.filter((cat) =>
                  cat.name.toLowerCase().includes(categorySearch.toLowerCase()) ||
                  cat.category_children?.some((child) =>
                    child.name.toLowerCase().includes(categorySearch.toLowerCase())
                  )
                ).length === 0 && (
                  <p className="text-sm text-gray-500 py-2">No se encontraron categorías</p>
                )}
              </div>
            </div>
          </div>
        </FilterSection>
      )}

      {/* Diet Tags Section */}
      <FilterSection
        title="Dieta / Estilo de Vida"
        isExpanded={expandedSections.diets}
        onToggle={() => toggleSection("diets")}
      >
        <div className="flex flex-col gap-2">
          {DIET_TAGS.map((tag) => (
            <label
              key={tag.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="diet"
                checked={selectedTags === tag.value}
                onChange={() => setQueryParams("tags", selectedTags === tag.value ? "" : tag.value)}
                className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
              />
              <span className={`text-sm text-gray-700 group-hover:text-emerald-600 transition-colors ${
                selectedTags === tag.value ? "font-medium text-emerald-600" : ""
              }`}>
                {tag.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Sort Section */}
      <FilterSection
        title="Ordenar por"
        isExpanded={expandedSections.sort}
        onToggle={() => toggleSection("sort")}
      >
        <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
      </FilterSection>

      {/* Promotions Section */}
      <FilterSection
        title="Promociones"
        isExpanded={expandedSections.promotions}
        onToggle={() => toggleSection("promotions")}
      >
        <div className="flex flex-col gap-2">
          {PROMO_TAGS.map((tag) => (
            <label
              key={tag.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="promo"
                checked={selectedTags === tag.value}
                onChange={() => setQueryParams("tags", selectedTags === tag.value ? "" : tag.value)}
                className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
              />
              <span className={`text-sm group-hover:text-emerald-600 transition-colors ${
                tag.highlight ? "text-red-600 font-medium" : "text-gray-700"
              } ${selectedTags === tag.value ? "font-medium text-emerald-600" : ""}`}>
                {tag.label}
                {tag.highlight && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-red-500 text-white rounded uppercase">
                    Sale
                  </span>
                )}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  )

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="small:hidden w-full mb-4">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filtros
          {hasActiveFilters && (
            <span className="ml-1 px-2 py-0.5 text-xs bg-emerald-600 text-white rounded-full">
              Activos
            </span>
          )}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden small:block small:min-w-[280px] small:max-w-[280px] small:pr-8">
        <FilterContent />
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/50 small:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-white shadow-2xl small:hidden overflow-y-auto">
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <FilterContent />
            </div>
            {/* Apply Button */}
            <div className="sticky bottom-0 p-4 bg-white border-t border-gray-200">
              <button
                onClick={() => setIsMobileOpen(false)}
                className="w-full py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Aplicar Filtros
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

// Collapsible Section Component
function FilterSection({
  title,
  isExpanded,
  onToggle,
  children,
}: {
  title: string
  isExpanded: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
          {title}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`mt-3 ${isExpanded ? "block" : "hidden"}`}>
        {children}
      </div>
    </div>
  )
}

// Category Item with optional children
function CategoryItem({
  category,
  selectedCategory,
  onSelect,
  level = 0,
  searchFilter = "",
}: {
  category: CategoryWithChildren
  selectedCategory?: string
  onSelect: (handle: string) => void
  level?: number
  searchFilter?: string
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasChildren = category.category_children && category.category_children.length > 0
  const isSelected = selectedCategory === category.handle

  // Auto-expand if search matches a child
  const hasMatchingChild = searchFilter && category.category_children?.some((child) =>
    child.name.toLowerCase().includes(searchFilter.toLowerCase())
  )
  const shouldShowExpanded = isExpanded || hasMatchingChild

  return (
    <div>
      <div
        className={`flex items-center gap-2 py-1 ${level > 0 ? "ml-4" : ""}`}
      >
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-0.5 text-gray-400 hover:text-gray-600"
          >
            <svg
              className={`w-3 h-3 transition-transform ${shouldShowExpanded ? "rotate-90" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
        <button
          onClick={() => onSelect(category.handle)}
          className={`text-sm text-left hover:text-emerald-600 transition-colors ${
            isSelected ? "font-medium text-emerald-600" : "text-gray-700"
          } ${!hasChildren ? "ml-5" : ""}`}
        >
          {category.name}
        </button>
      </div>
      {hasChildren && shouldShowExpanded && (
        <div className="mt-1">
          {category.category_children
            ?.filter((child) =>
              !searchFilter || child.name.toLowerCase().includes(searchFilter.toLowerCase())
            )
            .map((child) => (
              <CategoryItem
                key={child.id}
                category={child as CategoryWithChildren}
                selectedCategory={selectedCategory}
                onSelect={onSelect}
                level={level + 1}
                searchFilter={searchFilter}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default RefinementList
