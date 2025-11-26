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
