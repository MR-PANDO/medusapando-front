import { Suspense } from "react"
import { HttpTypes } from "@medusajs/types"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

// Map tag slugs to display names
const TAG_DISPLAY_NAMES: Record<string, string> = {
  vegano: "Vegano",
  vegetariano: "Vegetariano",
  "sin-lactosa": "Sin Lactosa",
  organico: "Orgánico",
  "sin-azucar": "Sin Azúcar",
  paleo: "Paleo",
  "sin-gluten": "Sin Gluten",
  keto: "Keto",
  ofertas: "Ofertas",
  nuevo: "Nuevos",
}

const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  "quesos": "Quesos",
  "lacteos": "Lácteos",
  "panaderia": "Panadería",
  "bebidas": "Bebidas",
  "snacks": "Snacks",
  "despensa": "Despensa",
}

type CategoryWithChildren = HttpTypes.StoreProductCategory & {
  category_children?: HttpTypes.StoreProductCategory[]
}

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  tags,
  categoryHandle,
  searchQuery,
  categories,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  tags?: string
  categoryHandle?: string
  searchQuery?: string
  categories?: CategoryWithChildren[]
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  // Get display title based on filters
  const getTitle = () => {
    if (searchQuery) {
      return `Resultados para "${searchQuery}"`
    }
    if (categoryHandle) {
      const categoryName = CATEGORY_DISPLAY_NAMES[categoryHandle] || categoryHandle
      return `Productos: ${categoryName}`
    }
    if (tags) {
      const tagName = TAG_DISPLAY_NAMES[tags] || tags
      return `Productos ${tagName}`
    }
    return "Todos los productos"
  }

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      <RefinementList
        sortBy={sort}
        categories={categories}
        selectedCategory={categoryHandle}
        selectedTags={tags}
      />
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1 data-testid="store-page-title">{getTitle()}</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
            tags={tags}
            categoryHandle={categoryHandle}
            searchQuery={searchQuery}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
