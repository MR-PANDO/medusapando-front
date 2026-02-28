import { Suspense } from "react"
import { HttpTypes } from "@medusajs/types"
import { getTranslations } from "next-intl/server"

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

const StoreTemplate = async ({
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
  const t = await getTranslations("store")
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  // Get display title based on filters
  const getTitle = () => {
    if (searchQuery) {
      return t("resultsFor", { query: searchQuery })
    }
    if (categoryHandle) {
      const categoryName = CATEGORY_DISPLAY_NAMES[categoryHandle] || categoryHandle
      return t("productsInCategory", { name: categoryName })
    }
    if (tags) {
      const tagNames = tags.split(",").map((tag) => TAG_DISPLAY_NAMES[tag] || tag)
      return t("productsInCategory", { name: tagNames.join(" + ") })
    }
    return t("allProducts")
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
