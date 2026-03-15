"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders, getCacheOptions, getCacheTag } from "./cookies"
import { revalidateTag } from "next/cache"

export type ProductReview = {
  id: string
  title: string | null
  content: string
  rating: number
  first_name: string
  last_name: string
  created_at: string
}

export async function getProductReviews(
  productId: string,
  limit = 10,
  offset = 0
): Promise<{
  reviews: ProductReview[]
  average_rating: number
  count: number
}> {
  const next = await getCacheOptions("reviews")

  return sdk.client
    .fetch<{
      reviews: ProductReview[]
      average_rating: number
      count: number
      limit: number
      offset: number
    }>(`/store/products/${productId}/reviews`, {
      method: "GET",
      query: { limit, offset, order: "-created_at" },
      next,
      cache: "force-cache",
    })
    .then((data) => ({
      reviews: data.reviews,
      average_rating: data.average_rating,
      count: data.count,
    }))
    .catch(() => ({ reviews: [], average_rating: 0, count: 0 }))
}

export async function submitReview(input: {
  product_id: string
  rating: number
  content: string
  title?: string
}): Promise<{ success: boolean; error?: string }> {
  const headers = await getAuthHeaders()

  try {
    await sdk.client.fetch("/store/reviews", {
      method: "POST",
      body: input,
      headers,
    })

    const tag = await getCacheTag("reviews")
    revalidateTag(tag)

    return { success: true }
  } catch (err: any) {
    return { success: false, error: err?.message || "Error al enviar la resena" }
  }
}
