import { listCategories } from "@lib/data/categories"
import { HttpTypes } from "@medusajs/types"
import HeroClient from "./hero-client"

// Desired order of categories (by handle)
const CATEGORY_ORDER = [
  "congelados",
  "cuidado-personal",
  "despensa-saludable",
  "frutas-y-verduras",
  "frutos-secos-deshidratados-semillas",
  "granolas-cereales-avenas",
  "harinas-granos",
  "lacteos-refrigerados",
  "panaderia-artesanal",
  "pollo-pavo-pescado",
  "postres-tortas",
  "proteinas-suplementos-colagenos",
  "snacks-saludables",
  "superalimentos",
  "te-aromaticas-cafe",
]

export default async function Hero() {
  const categories = await listCategories()

  // Filter to only show parent categories (no parent_category)
  const parentCategories = categories?.filter(
    (cat: HttpTypes.StoreProductCategory) => !cat.parent_category
  ) || []

  // Sort categories by the predefined order
  const sortedCategories = [...parentCategories].sort((a, b) => {
    const indexA = CATEGORY_ORDER.indexOf(a.handle || "")
    const indexB = CATEGORY_ORDER.indexOf(b.handle || "")
    // If not in the order list, put at the end
    const orderA = indexA === -1 ? CATEGORY_ORDER.length : indexA
    const orderB = indexB === -1 ? CATEGORY_ORDER.length : indexB
    return orderA - orderB
  })

  return <HeroClient categories={sortedCategories} />
}
