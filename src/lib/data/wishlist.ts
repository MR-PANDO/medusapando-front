"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders, getCacheOptions, getCacheTag } from "./cookies"
import { revalidateTag } from "next/cache"

export type WishlistItem = {
  id: string
  product_variant_id: string
  variant: {
    id: string
    title: string
    sku: string
    product: {
      id: string
      title: string
      handle: string
      thumbnail: string | null
      status: string
    } | null
    calculated_price?: {
      calculated_amount: number
      currency_code: string
    } | null
  } | null
}

export type Wishlist = {
  id: string
  customer_id: string
  items: WishlistItem[]
}

export async function getWishlist(): Promise<Wishlist | null> {
  const headers = await getAuthHeaders()
  if (!headers.authorization && !headers.cookie) return null

  const next = await getCacheOptions("wishlist")

  return sdk.client
    .fetch<{ wishlist: Wishlist }>("/store/customers/me/wishlists", {
      method: "GET",
      query: { currency_code: "cop" },
      headers,
      next,
      cache: "force-cache",
    })
    .then(({ wishlist }) => wishlist)
    .catch(() => null)
}

export async function addToWishlist(variantId: string): Promise<Wishlist | null> {
  const headers = await getAuthHeaders()

  const result = await sdk.client
    .fetch<{ wishlist: Wishlist }>("/store/customers/me/wishlists/items", {
      method: "POST",
      body: { variant_id: variantId },
      headers,
    })
    .then(({ wishlist }) => wishlist)
    .catch(() => null)

  const tag = await getCacheTag("wishlist")
  revalidateTag(tag)

  return result
}

export async function removeFromWishlist(wishlistItemId: string): Promise<Wishlist | null> {
  const headers = await getAuthHeaders()

  const result = await sdk.client
    .fetch<{ wishlist: Wishlist }>(`/store/customers/me/wishlists/items/${wishlistItemId}`, {
      method: "DELETE",
      headers,
    })
    .then(({ wishlist }) => wishlist)
    .catch(() => null)

  const tag = await getCacheTag("wishlist")
  revalidateTag(tag)

  return result
}

export async function isInWishlist(variantId: string): Promise<{ inWishlist: boolean; itemId: string | null }> {
  const wishlist = await getWishlist()
  if (!wishlist) return { inWishlist: false, itemId: null }

  const item = wishlist.items.find((i) => i.product_variant_id === variantId)
  return {
    inWishlist: !!item,
    itemId: item?.id || null,
  }
}
