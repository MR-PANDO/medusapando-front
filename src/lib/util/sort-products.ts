import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

interface SortableProduct extends HttpTypes.StoreProduct {
  _minPrice?: number
  _salesCount?: number
}

/**
 * Helper function to sort products by various criteria
 * @param products
 * @param sortBy
 * @returns sorted products
 */
export function sortProducts(
  products: HttpTypes.StoreProduct[],
  sortBy: SortOptions
): HttpTypes.StoreProduct[] {
  let sortedProducts = products as SortableProduct[]

  if (["price_asc", "price_desc"].includes(sortBy)) {
    // Precompute the minimum price for each product
    sortedProducts.forEach((product) => {
      if (product.variants && product.variants.length > 0) {
        product._minPrice = Math.min(
          ...product.variants.map(
            (variant) => variant?.calculated_price?.calculated_amount || 0
          )
        )
      } else {
        product._minPrice = Infinity
      }
    })

    // Sort products based on the precomputed minimum prices
    sortedProducts.sort((a, b) => {
      const diff = a._minPrice! - b._minPrice!
      return sortBy === "price_asc" ? diff : -diff
    })
  }

  if (sortBy === "created_at") {
    sortedProducts.sort((a, b) => {
      return (
        new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
      )
    })
  }

  if (sortBy === "sales_count") {
    // Sort by sales count from metadata (highest first)
    sortedProducts.forEach((product) => {
      const metadata = product.metadata as Record<string, unknown> | undefined
      product._salesCount = (metadata?.sales_count as number) || 0
    })

    sortedProducts.sort((a, b) => {
      return (b._salesCount || 0) - (a._salesCount || 0)
    })
  }

  return sortedProducts
}
