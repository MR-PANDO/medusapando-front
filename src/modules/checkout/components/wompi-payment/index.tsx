"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { useRouter, usePathname } from "next/navigation"
import {
  getWompiCheckoutConfig,
  getWompiPaymentMethods,
  verifyWompiTransaction,
  WompiCheckoutConfig,
  WompiPaymentMethods,
} from "@lib/data/wompi"
import { HttpTypes } from "@medusajs/types"

declare global {
  interface Window {
    WidgetCheckout: any
  }
}

type WompiPaymentProps = {
  cart: HttpTypes.StoreCart
}

export default function WompiPayment({ cart }: WompiPaymentProps) {
  const t = useTranslations("checkout")
  const router = useRouter()
  const pathname = usePathname()
  const [methods, setMethods] = useState<WompiPaymentMethods | null>(null)
  const [config, setConfig] = useState<WompiCheckoutConfig | null>(null)
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [widgetLoaded, setWidgetLoaded] = useState(false)

  // Fetch enabled payment methods
  useEffect(() => {
    getWompiPaymentMethods().then(setMethods)
  }, [])

  // Load Wompi widget script
  useEffect(() => {
    if (typeof window === "undefined") return
    if (document.querySelector('script[src*="widget.js"]')) {
      setWidgetLoaded(true)
      return
    }

    const script = document.createElement("script")
    script.src = "https://checkout.wompi.co/widget.js"
    script.async = true
    script.onload = () => setWidgetLoaded(true)
    document.head.appendChild(script)
  }, [])

  // Get checkout config when needed
  const fetchConfig = async () => {
    if (config) return config
    setLoading(true)
    setError(null)
    const result = await getWompiCheckoutConfig(cart.id)
    setLoading(false)
    if (!result) {
      setError(t("wompiConfigError"))
      return null
    }
    setConfig(result)
    return result
  }

  // Open Widget (inline payment)
  const handleWidget = async () => {
    const cfg = await fetchConfig()
    if (!cfg || !widgetLoaded || !window.WidgetCheckout) {
      setError(t("wompiWidgetNotReady"))
      return
    }

    setError(null)

    const checkout = new window.WidgetCheckout({
      currency: cfg.currency,
      amountInCents: cfg.amount_in_cents,
      reference: cfg.reference,
      publicKey: cfg.public_key,
      redirectUrl: cfg.redirect_url,
      "signature:integrity": cfg.signature,
      customerData: {
        email: cfg.customer_data.email,
        fullName: cfg.customer_data.full_name,
        phoneNumber: cfg.customer_data.phone_number,
        phoneNumberPrefix: cfg.customer_data.phone_number_prefix || "+57",
      },
      shippingAddress: {
        addressLine1: cfg.shipping_address.address_line_1,
        city: cfg.shipping_address.city,
        region: cfg.shipping_address.region,
        country: cfg.shipping_address.country || "CO",
        phoneNumber: cfg.shipping_address.phone_number,
      },
    })

    checkout.open((result: any) => {
      const transaction = result?.transaction
      if (transaction?.id) {
        handleVerifyTransaction(transaction.id)
      }
    })
  }

  // Redirect to Wompi Checkout Web
  const handleCheckoutWeb = async () => {
    const cfg = await fetchConfig()
    if (!cfg) return

    const baseUrl = "https://checkout.wompi.co/p/"
    const params = new URLSearchParams({
      "public-key": cfg.public_key,
      currency: cfg.currency,
      "amount-in-cents": String(cfg.amount_in_cents),
      reference: cfg.reference,
      "signature:integrity": cfg.signature,
      "redirect-url": cfg.redirect_url,
    })

    if (cfg.customer_data.email) params.set("customer-data:email", cfg.customer_data.email)
    if (cfg.customer_data.full_name) params.set("customer-data:full-name", cfg.customer_data.full_name)
    if (cfg.customer_data.phone_number) params.set("customer-data:phone-number", cfg.customer_data.phone_number)
    if (cfg.shipping_address.address_line_1) params.set("shipping-address:address-line-1", cfg.shipping_address.address_line_1)
    if (cfg.shipping_address.city) params.set("shipping-address:city", cfg.shipping_address.city)
    if (cfg.shipping_address.region) params.set("shipping-address:region", cfg.shipping_address.region)
    if (cfg.shipping_address.country) params.set("shipping-address:country", cfg.shipping_address.country)

    window.location.href = `${baseUrl}?${params.toString()}`
  }

  // Verify transaction after widget callback
  const handleVerifyTransaction = async (transactionId: string) => {
    setVerifying(true)
    setError(null)

    const result = await verifyWompiTransaction(transactionId, cart.id)

    if (result.status === "APPROVED") {
      // Redirect to order confirmation
      const countryCode = pathname?.split("/")[1] || "co"
      router.push(`/${countryCode}/order/confirmed`)
    } else if (result.status === "PENDING") {
      setError(t("wompiPaymentPending"))
    } else {
      setError(t("wompiPaymentFailed"))
    }

    setVerifying(false)
  }

  if (!methods) return null

  const hasOptions = methods.widget_enabled || methods.checkout_web_enabled

  if (!hasOptions) return null

  return (
    <div className="mt-4 space-y-3">
      <p className="text-sm font-medium text-gray-700 mb-2">{t("wompiPaymentOptions")}</p>

      {/* Widget - Inline Payment */}
      {methods.widget_enabled && (
        <button
          onClick={handleWidget}
          disabled={loading || verifying}
          className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg hover:border-emerald-400 hover:bg-emerald-50 transition-colors disabled:opacity-50"
        >
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">{t("wompiWidgetTitle")}</p>
              <p className="text-xs text-gray-500">{t("wompiWidgetDesc")}</p>
            </div>
          </div>
          {(loading || verifying) && (
            <svg className="w-5 h-5 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
        </button>
      )}

      {/* Checkout Web - Redirect */}
      {methods.checkout_web_enabled && (
        <button
          onClick={handleCheckoutWeb}
          disabled={loading}
          className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg hover:border-emerald-400 hover:bg-emerald-50 transition-colors disabled:opacity-50"
        >
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">{t("wompiCheckoutWebTitle")}</p>
              <p className="text-xs text-gray-500">{t("wompiCheckoutWebDesc")}</p>
            </div>
          </div>
        </button>
      )}

      {error && (
        <p className="text-xs text-red-600 mt-2">{error}</p>
      )}

      {verifying && (
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {t("wompiVerifying")}
        </div>
      )}
    </div>
  )
}
