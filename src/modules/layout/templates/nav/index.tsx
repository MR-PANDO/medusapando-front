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
              className="flex flex-col items-center text-gray-700 hover:text-emerald-600 transition-colors"
              href="/cart"
              data-testid="nav-cart-link"
            >
              <div className="relative">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
                  0
                </span>
              </div>
              <span className="text-sm font-medium mt-0.5">$0</span>
              <span className="text-xs text-gray-500">Mi Carrito</span>
            </LocalizedClientLink>
          }
        >
          <CartButton />
        </Suspense>
      }
      cartButtonCompact={
        <Suspense
          fallback={
            <LocalizedClientLink
              href="/cart"
              className="text-gray-600 hover:text-emerald-600 transition-colors relative inline-flex items-center justify-center"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold min-w-[16px] h-[16px] rounded-full flex items-center justify-center">
                0
              </span>
            </LocalizedClientLink>
          }
        >
          <CartButton compact />
        </Suspense>
      }
    />
  )
}
