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

  return sdk.client
    .fetch<WompiCheckoutConfig>("/store/wompi/checkout-config", {
      method: "POST",
      body: { cart_id: cartId },
      headers,
    })
    .catch(() => null)
}

export async function verifyWompiTransaction(
  transactionId: string,
  cartId: string
): Promise<{ status: string; transaction?: any }> {
  return sdk.client
    .fetch<{ status: string; transaction?: any }>(
      "/store/wompi/verify-transaction",
      {
        method: "POST",
        body: { transaction_id: transactionId, cart_id: cartId },
      }
    )
    .catch(() => ({ status: "ERROR" }))
}
