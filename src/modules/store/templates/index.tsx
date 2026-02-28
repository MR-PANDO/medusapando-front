import { Suspense } from "react"
import { HttpTypes } from "@medusajs/types"
import { getTranslations, getLocale } from "next-intl/server"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getEntityTranslations } from "@lib/data/translations"
import { getCategoryByHandle } from "@lib/data/categories"

import PaginatedProducts from "./paginated-products"

// Map tag slugs to display names per locale
const TAG_DISPLAY_NAMES: Record<string, Record<string, string>> = {
  es: {
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
  },
  en: {
    vegano: "Vegan",
    vegetariano: "Vegetarian",
    "sin-lactosa": "Lactose Free",
    organico: "Organic",
    "sin-azucar": "Sugar Free",
    paleo: "Paleo",
    "sin-gluten": "Gluten Free",
    keto: "Keto",
    ofertas: "Deals",
    nuevo: "New",
  },
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
  const locale = await getLocale()
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  // Fetch category translations for the refinement list
  const allCategoryIds = (categories || []).flatMap((cat) => [
    cat.id,
    ...(cat.category_children?.map((c) => c.id) || []),
  ]).filter(Boolean) as string[]
  const catTranslationsMap = await getEntityTranslations("category", allCategoryIds, locale)
  const categoryTranslations: Record<string, string> = {}
  catTranslationsMap.forEach((val, id) => {
    if (val.title) categoryTranslations[id] = val.title
  })

  // Get display title based on filters
  const getTitle = async () => {
    const tagNames = TAG_DISPLAY_NAMES[locale] || TAG_DISPLAY_NAMES["es"]

    if (searchQuery) {
      return t("resultsFor", { query: searchQuery })
    }
    if (categoryHandle) {
      // Try to get translated category name from API
      const category = await getCategoryByHandle([categoryHandle])
      let categoryName = category?.name || categoryHandle
      if (category?.id && locale !== "es") {
        const translationsMap = await getEntityTranslations("category", [category.id], locale)
        const translation = translationsMap.get(category.id)
        if (translation?.title) {
          categoryName = translation.title
        }
      }
      return t("productsInCategory", { name: categoryName })
    }
    if (tags) {
      const names = tags.split(",").map((tag) => tagNames[tag] || tag)
      return t("productsInCategory", { name: names.join(" + ") })
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
        categoryTranslations={categoryTranslations}
      />
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1 data-testid="store-page-title">{await getTitle()}</h1>
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
