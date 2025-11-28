"use server"

import { sdk } from "@lib/config"
import { getCacheOptions } from "./cookies"

export type Brand = {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export const listBrands = async ({
  limit = 100,
  offset = 0,
}: {
  limit?: number
  offset?: number
} = {}): Promise<{
  brands: Brand[]
  count: number
}> => {
  const next = {
    ...(await getCacheOptions("brands")),
  }

  return sdk.client
    .fetch<{ brands: Brand[]; count: number }>(`/store/brands`, {
      method: "GET",
      query: {
        limit,
        offset,
      },
      next,
      cache: "force-cache",
    })
    .then(({ brands, count }) => ({
      brands,
      count,
    }))
}

export const retrieveBrand = async (id: string): Promise<Brand | null> => {
  const next = {
    ...(await getCacheOptions("brands")),
  }

  return sdk.client
    .fetch<{ brand: Brand }>(`/store/brands/${id}`, {
      method: "GET",
      next,
      cache: "force-cache",
    })
    .then(({ brand }) => brand)
    .catch(() => null)
}

export const listProductsByBrand = async ({
  brandId,
  limit = 100,
  offset = 0,
  regionId,
}: {
  brandId: string
  limit?: number
  offset?: number
  regionId?: string
}): Promise<{
  products: any[]
  count: number
}> => {
  const next = {
    ...(await getCacheOptions("brands")),
  }

  try {
    // First get product IDs from brand endpoint
    const brandProducts = await sdk.client.fetch<{
      products: { id: string; handle: string }[]
      count: number
    }>(`/store/brands/${brandId}/products`, {
      method: "GET",
      query: {
        limit,
        offset,
      },
      next,
      cache: "force-cache",
    })

    if (!brandProducts.products || brandProducts.products.length === 0) {
      return { products: [], count: 0 }
    }

    // Get product IDs
    const productIds = brandProducts.products.map((p) => p.id)

    // Fetch full product data with prices using the standard store API
    const fullProducts = await sdk.client.fetch<{
      products: any[]
      count: number
    }>(`/store/products`, {
      method: "GET",
      query: {
        id: productIds,
        limit,
        ...(regionId && { region_id: regionId }),
        fields:
          "*variants.calculated_price,+variants.inventory_quantity,*variants.images,+metadata,+tags",
      },
      next,
      cache: "force-cache",
    })

    return {
      products: fullProducts.products || [],
      count: brandProducts.count,
    }
  } catch (error) {
    console.error("Error fetching products by brand:", error)
    return { products: [], count: 0 }
  }
}
