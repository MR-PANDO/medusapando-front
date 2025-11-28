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

  return sdk.client
    .fetch<{ products: any[]; count: number }>(
      `/store/brands/${brandId}/products`,
      {
        method: "GET",
        query: {
          limit,
          offset,
          ...(regionId && { region_id: regionId }),
        },
        next,
        cache: "force-cache",
      }
    )
    .then(({ products, count }) => ({
      products,
      count,
    }))
    .catch(() => ({ products: [], count: 0 }))
}
