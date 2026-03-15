"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders } from "./cookies"

export type WompiCheckoutConfig = {
  public_key: string
  reference: string
  amount_in_cents: number
  currency: string
  signature: string
  redirect_url: string
  customer_data: {
    email?: string
    full_name?: string
    phone_number?: string
    phone_number_prefix?: string
  }
  shipping_address: {
    address_line_1?: string
    city?: string
    region?: string
    country?: string
    phone_number?: string
  }
}

export type WompiPaymentMethods = {
  widget_enabled: boolean
  checkout_web_enabled: boolean
  payment_link_enabled: boolean
}

export async function getWompiPaymentMethods(): Promise<WompiPaymentMethods> {
  return sdk.client
    .fetch<WompiPaymentMethods>("/store/wompi/payment-methods", {
      method: "GET",
    })
    .catch(() => ({
      widget_enabled: false,
      checkout_web_enabled: false,
      payment_link_enabled: true,
    }))
}

export async function getWompiCheckoutConfig(
  cartId: string
): Promise<WompiCheckoutConfig | null> {
  const headers = await getAuthHeaders()

  try {
    const result = await sdk.client.fetch<WompiCheckoutConfig>(
      "/store/wompi/checkout-config",
      {
        method: "POST",
        body: { cart_id: cartId },
        headers,
      }
    )
    // Explicitly return a plain object (server actions serialize the response)
    return {
      public_key: result.public_key,
      reference: result.reference,
      amount_in_cents: result.amount_in_cents,
      currency: result.currency,
      signature: result.signature,
      redirect_url: result.redirect_url,
      customer_data: result.customer_data || {},
      shipping_address: result.shipping_address || {},
    }
  } catch (err) {
    console.error("[Wompi] checkout-config error:", err)
    return null
  }
}

export async function verifyWompiTransaction(
  transactionId: string,
  cartId: string
): Promise<{ status: string; transaction?: any }> {
  try {
    const result = await sdk.client.fetch<{ status: string; transaction?: any }>(
      "/store/wompi/verify-transaction",
      {
        method: "POST",
        body: { transaction_id: transactionId, cart_id: cartId },
      }
    )
    return { status: result.status, transaction: result.transaction || null }
  } catch {
    return { status: "ERROR" }
  }
}
