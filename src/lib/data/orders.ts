"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { getAuthHeaders, getCacheOptions, getCacheTag } from "./cookies"
import { HttpTypes } from "@medusajs/types"
import { revalidateTag } from "next/cache"

export const retrieveOrder = async (id: string) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("orders")),
  }

  return sdk.client
    .fetch<HttpTypes.StoreOrderResponse>(`/store/orders/${id}`, {
      method: "GET",
      query: {
        fields:
          "*payment_collections.payments,*items,*items.metadata,*items.variant,*items.product",
      },
      headers,
      next,
      cache: "force-cache",
    })
    .then(({ order }) => order)
    .catch(async () => {
      // Retry without variant/product expansion (may fail if products are in draft)
      return sdk.client
        .fetch<HttpTypes.StoreOrderResponse>(`/store/orders/${id}`, {
          method: "GET",
          query: {
            fields: "*payment_collections.payments,*items,*items.metadata",
          },
          headers,
          next,
          cache: "force-cache",
        })
        .then(({ order }) => order)
        .catch((err) => medusaError(err))
    })
}

export const listOrders = async (
  limit: number = 10,
  offset: number = 0,
  filters?: Record<string, any>
) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("orders")),
  }

  return sdk.client
    .fetch<HttpTypes.StoreOrderListResponse>(`/store/orders`, {
      method: "GET",
      query: {
        limit,
        offset,
        order: "-created_at",
        fields: "*items,+items.metadata,*items.variant,*items.product",
        ...filters,
      },
      headers,
      next,
      cache: "force-cache",
    })
    .then(({ orders }) => orders)
    .catch(async () => {
      // Retry without variant/product expansion (may fail if products are in draft)
      return sdk.client
        .fetch<HttpTypes.StoreOrderListResponse>(`/store/orders`, {
          method: "GET",
          query: {
            limit,
            offset,
            order: "-created_at",
            fields: "*items,+items.metadata",
            ...filters,
          },
          headers,
          next,
          cache: "force-cache",
        })
        .then(({ orders }) => orders)
        .catch((err) => medusaError(err))
    })
}

export const createTransferRequest = async (
  state: {
    success: boolean
    error: string | null
    order: HttpTypes.StoreOrder | null
  },
  formData: FormData
): Promise<{
  success: boolean
  error: string | null
  order: HttpTypes.StoreOrder | null
}> => {
  const id = formData.get("order_id") as string

  if (!id) {
    return { success: false, error: "Order ID is required", order: null }
  }

  const headers = await getAuthHeaders()

  return await sdk.store.order
    .requestTransfer(
      id,
      {},
      {
        fields: "id, email",
      },
      headers
    )
    .then(({ order }) => ({ success: true, error: null, order }))
    .catch((err) => ({ success: false, error: err.message, order: null }))
}

export const acceptTransferRequest = async (id: string, token: string) => {
  const headers = await getAuthHeaders()

  return await sdk.store.order
    .acceptTransfer(id, { token }, {}, headers)
    .then(({ order }) => ({ success: true, error: null, order }))
    .catch((err) => ({ success: false, error: err.message, order: null }))
}

export const declineTransferRequest = async (id: string, token: string) => {
  const headers = await getAuthHeaders()

  return await sdk.store.order
    .declineTransfer(id, { token }, {}, headers)
    .then(({ order }) => ({ success: true, error: null, order }))
    .catch((err) => ({ success: false, error: err.message, order: null }))
}

export type RecentlyPurchasedItem = {
  product_id: string
  variant_id: string | null
  product_title: string | null
  product_handle: string | null
  thumbnail: string | null
  last_purchased: string
  purchase_count: number
  unit_price: number
}

export type SkippedItem = {
  variant_id: string
  product_title: string | null
  variant_title: string | null
  reason: "out_of_stock" | "no_inventory" | "variant_deleted"
}

export type ReorderResult = {
  cart: HttpTypes.StoreCart | null
  skipped_items: SkippedItem[]
}

export const reorder = async (orderId: string): Promise<ReorderResult> => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const response = await sdk.client
    .fetch<{ cart: HttpTypes.StoreCart; skipped_items: SkippedItem[] }>(
      `/store/customers/me/orders/${orderId}/reorder`,
      {
        method: "POST",
        headers,
      }
    )
    .catch((err) => medusaError(err))

  const cart = response?.cart || null
  const skipped_items = response?.skipped_items || []

  if (cart?.id) {
    const { setCartId } = await import("./cookies")
    await setCartId(cart.id)

    const cartCacheTag = await getCacheTag("carts")
    revalidateTag(cartCacheTag)
  }

  return { cart, skipped_items }
}

export const getRecentlyPurchased = async (
  limit: number = 6
): Promise<RecentlyPurchasedItem[]> => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("orders")),
  }

  return sdk.client
    .fetch<{
      recently_purchased: RecentlyPurchasedItem[]
      count: number
    }>(`/store/customers/recently-purchased`, {
      method: "GET",
      query: { limit },
      headers,
      next,
      cache: "force-cache",
    })
    .then(({ recently_purchased }) => recently_purchased)
    .catch((err) => {
      console.error("Error fetching recently purchased:", err)
      return []
    })
}
