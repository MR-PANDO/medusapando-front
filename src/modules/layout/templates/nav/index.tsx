import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"
import { StoreRegion } from "@medusajs/types"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import SearchBox from "@modules/search/components/search-box"
import NavHeader from "@modules/layout/components/nav-header"

// Desired order of categories (by handle) - must match exact handles in database
const CATEGORY_ORDER = [
  "congelados",
  "cuidado-personal",
  "despensa",
  "frutas-y-verduras",
  "frutos-secos-deshidratados-semillas",
  "granolas-cereales-avenas",
  "harinas-granos",
  "lacteos-refrigerados",
  "panaderia-artesanal",
  "pollo-pavo-pescado",
  "postres-tortas-helados",
  "proteinas-suplementos-colagenos",
  "snacks-saludables",
  "bebidas-amp-te",
  "aceites-funcionales",
]

export default async function Nav() {
  const [regions, categories] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listCategories()
  ])

  // Filter to only show parent categories that are in our predefined order
  const parentCategories = categories?.filter(
    (cat: HttpTypes.StoreProductCategory) =>
      !cat.parent_category && CATEGORY_ORDER.includes(cat.handle || "")
  ) || []

  // Sort categories by the predefined order
  const sortedCategories = [...parentCategories].sort((a, b) => {
    const indexA = CATEGORY_ORDER.indexOf(a.handle || "")
    const indexB = CATEGORY_ORDER.indexOf(b.handle || "")
    return indexA - indexB
  })

  return (
    <NavHeader
      sideMenu={<SideMenu regions={regions} categories={sortedCategories} />}
      searchBox={<SearchBox />}
      cartButton={
        <Suspense
          fallback={
            <LocalizedClientLink
              className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors"
              href="/cart"
              data-testid="nav-cart-link"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <span className="text-sm font-medium">$0</span>
            </LocalizedClientLink>
          }
        >
          <CartButton />
        </Suspense>
      }
    />
  )
}
