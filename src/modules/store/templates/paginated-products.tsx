import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 12

// Map URL slugs to actual tag IDs from database
const TAG_SLUG_TO_ID: Record<string, string> = {
  vegano: "ptag_MIH1ZD106B4F7ECB2C025EBB",
  vegetariano: "ptag_MIH1ZD0WE0F5BB75D98BC2DE",
  "sin-lactosa": "ptag_MIH1ZD14FF66C37851E4C4F1",
  organico: "ptag_MIH1ZD1K585E3840F803CC57",
  "sin-azucar": "ptag_MIH1ZD0S047DBC6CAF2BDCAA",
  paleo: "ptag_MIH1ZD1CAA2106DFFB237963",
  "sin-gluten": "ptag_MIH1ZD0LCB8F57C1E8CE02D2",
  keto: "ptag_MIH1ZD0723E50DF51080B187",
  nuevo: "ptag_MIH1ZD0P70B83B188A619F35",
}

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
  tag_id?: string[]
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  tags,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  tags?: string
}) {
  const queryParams: PaginatedProductsParams = {
    limit: 12,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (tags) {
    const tagId = TAG_SLUG_TO_ID[tags]
    if (tagId) {
      queryParams["tag_id"] = [tagId]
    }
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
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

  return (
    <>
      <ul
        className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
        data-testid="products-list"
      >
        {products.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview product={p} region={region} countryCode={countryCode} />
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
