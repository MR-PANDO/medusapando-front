import "@medusajs/types"
import { AdminProductImage } from "@medusajs/types"

declare module "@medusajs/types/dist/http/product/common" {
  interface BaseProductVariant {
    images?: AdminProductImage[] | null
  }
}