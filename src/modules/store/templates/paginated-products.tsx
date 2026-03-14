import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { getCategoryByHandle } from "@lib/data/categories"
import { getEntityTranslations } from "@lib/data/translations"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { getLocale } from "next-intl/server"

const PRODUCT_LIMIT = 12

// Map URL slugs to actual tag IDs from database
const TAG_SLUG_TO_ID: Record<string, string> = {
  vegano: "ptag_MM35AC853D60BAF59EFCE70B",
  vegetariano: "ptag_MM35AC7X54CE2FFF8CD1FDF1",
  "sin-lactosa": "ptag_MM35AC83ACBF8FF55020958F",
  organico: "ptag_MM35AC897F29DACAC0FF87BA",
  "sin-azucar": "ptag_MM35AC7W2161C6591F004C46",
  paleo: "ptag_MM35AC8604C2C59EE3E2CF72",
  "sin-gluten": "ptag_MM35AC7S0EAD8C96272EDE2B",
  keto: "ptag_MM35AC81792D2B901D49D703",
  nuevo: "ptag_MM35AC7VAFF044604F45F664",
  natural: "ptag_MM35AC9D350F48C06F7476DF",
}

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
  tag_id?: string[]
  q?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  tags,
  categoryHandle,
  searchQuery,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  tags?: string
  categoryHandle?: string
  searchQuery?: string
}) {
  const queryParams: PaginatedProductsParams = {
    limit: 12,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  // If categoryHandle is provided, get the category ID
  if (categoryHandle) {
    const category = await getCategoryByHandle([categoryHandle])
    if (category?.id) {
      queryParams["category_id"] = [category.id]
    }
  } else if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (tags) {
    const tagSlugs = tags.split(",")
    const tagIds = tagSlugs
      .map((slug) => TAG_SLUG_TO_ID[slug])
      .filter(Boolean)
    if (tagIds.length > 0) {
      queryParams["tag_id"] = tagIds
    }
  }

  if (searchQuery) {
    queryParams["q"] = searchQuery
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  let {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  // Fetch translations for non-default locales
  const locale = await getLocale()
  const productIds = products.map((p) => p.id).filter(Boolean) as string[]
  const translationsMap = await getEntityTranslations("product", productIds, locale)

  return (
    <>
      <ul
        className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
        data-testid="products-list"
      >
        {products.map((p) => {
          const translation = p.id ? translationsMap.get(p.id) : undefined
          return (
            <li key={p.id}>
              <ProductPreview
                product={p}
                region={region}
                countryCode={countryCode}
                translation={translation}
              />
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
