"use client"

import { RadioGroup, Radio } from "@headlessui/react"
import { paymentInfoMap } from "@lib/constants"
import { initiatePaymentSession } from "@lib/data/cart"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { Button, Container, Heading, Text, clx } from "@medusajs/ui"
import ErrorMessage from "@modules/checkout/components/error-message"
import PaymentContainer from "@modules/checkout/components/payment-container"
import MedusaRadio from "@modules/common/components/radio"
import Divider from "@modules/common/components/divider"
import {
  getWompiPaymentMethods,
  verifyWompiTransaction,
  WompiPaymentMethods,
} from "@lib/data/wompi"
import { useTranslations } from "next-intl"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

// Virtual payment method IDs for Wompi sub-options
const WOMPI_WIDGET_ID = "wompi_widget"
const WOMPI_CHECKOUT_WEB_ID = "wompi_checkout_web"
const WOMPI_LINK_ID = "pp_wompi_wompi" // existing provider

declare global {
  interface Window {
    WidgetCheckout: any
  }
}

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any
  availablePaymentMethods: any[]
}) => {
  const t = useTranslations("checkout")
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )
  const [wompiMethods, setWompiMethods] = useState<WompiPaymentMethods | null>(null)
  const [wompiProcessing, setWompiProcessing] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  // Fetch Wompi checkout settings on mount
  useEffect(() => {
    getWompiPaymentMethods().then(setWompiMethods)
  }, [])

  // Load Wompi widget script
  useEffect(() => {
    if (typeof window === "undefined") return
    if (document.querySelector('script[src*="widget.js"]')) return
    const script = document.createElement("script")
    script.src = "https://checkout.wompi.co/widget.js"
    script.async = true
    document.head.appendChild(script)
  }, [])

  const setPaymentMethod = async (method: string) => {
    setError(null)
    setSelectedPaymentMethod(method)
  }

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  // Fetch checkout config via API route (not server action — avoids serialization issues)
  const fetchCheckoutConfig = async () => {
    const res = await fetch("/api/wompi/checkout-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart_id: cart.id }),
    })
    if (!res.ok) return null
    return res.json()
  }

  // Handle Wompi Widget payment
  const handleWompiWidget = async () => {
    setWompiProcessing(true)
    setError(null)
    try {
      const config = await fetchCheckoutConfig()
      if (!config || config.error) throw new Error(t("wompiConfigError"))
      if (!window.WidgetCheckout) throw new Error(t("wompiWidgetNotReady"))

      const checkout = new window.WidgetCheckout({
        currency: config.currency,
        amountInCents: config.amount_in_cents,
        reference: config.reference,
        publicKey: config.public_key,
        redirectUrl: config.redirect_url,
        "signature:integrity": config.signature,
        customerData: {
          email: config.customer_data.email,
          fullName: config.customer_data.full_name,
          phoneNumber: config.customer_data.phone_number,
          phoneNumberPrefix: config.customer_data.phone_number_prefix || "+57",
        },
        shippingAddress: {
          addressLine1: config.shipping_address.address_line_1,
          city: config.shipping_address.city,
          region: config.shipping_address.region,
          country: config.shipping_address.country || "CO",
          phoneNumber: config.shipping_address.phone_number,
        },
      })

      checkout.open((result: any) => {
        const transaction = result?.transaction
        if (transaction?.id) {
          verifyWompiTransaction(transaction.id, cart.id).then((res) => {
            if (res.status === "APPROVED") {
              const countryCode = pathname?.split("/")[1] || "co"
              router.push(`/${countryCode}/order/confirmed`)
            } else if (res.status === "PENDING") {
              setError(t("wompiPaymentPending"))
            } else {
              setError(t("wompiPaymentFailed"))
            }
            setWompiProcessing(false)
          })
        } else {
          setWompiProcessing(false)
        }
      })
    } catch (err: any) {
      setError(err.message || t("wompiConfigError"))
      setWompiProcessing(false)
    }
  }

  // Handle Wompi Checkout Web redirect
  const handleWompiCheckoutWeb = async () => {
    setWompiProcessing(true)
    setError(null)
    try {
      const config = await fetchCheckoutConfig()
      if (!config || config.error) throw new Error(t("wompiConfigError"))

      const params = new URLSearchParams({
        "public-key": config.public_key,
        currency: config.currency,
        "amount-in-cents": String(config.amount_in_cents),
        reference: config.reference,
        "signature:integrity": config.signature,
        "redirect-url": config.redirect_url,
      })
      if (config.customer_data.email) params.set("customer-data:email", config.customer_data.email)
      if (config.customer_data.full_name) params.set("customer-data:full-name", config.customer_data.full_name)
      if (config.customer_data.phone_number) params.set("customer-data:phone-number", config.customer_data.phone_number)
      if (config.shipping_address.address_line_1) params.set("shipping-address:address-line-1", config.shipping_address.address_line_1)
      if (config.shipping_address.city) params.set("shipping-address:city", config.shipping_address.city)
      if (config.shipping_address.region) params.set("shipping-address:region", config.shipping_address.region)

      window.location.href = `https://checkout.wompi.co/p/?${params.toString()}`
    } catch (err: any) {
      setError(err.message || t("wompiConfigError"))
      setWompiProcessing(false)
    }
  }

  const handleSubmit = async () => {
    // If Wompi widget or checkout web is selected, handle differently
    if (selectedPaymentMethod === WOMPI_WIDGET_ID) {
      return handleWompiWidget()
    }
    if (selectedPaymentMethod === WOMPI_CHECKOUT_WEB_ID) {
      return handleWompiCheckoutWeb()
    }

    // Default Medusa payment flow
    setIsLoading(true)
    try {
      const actualProviderId = selectedPaymentMethod
      const checkActiveSession = activeSession?.provider_id === actualProviderId
      if (!checkActiveSession) {
        await initiatePaymentSession(cart, {
          provider_id: actualProviderId,
        })
      }
      return router.push(
        pathname + "?" + createQueryString("step", "review"),
        { scroll: false }
      )
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  // Build the list of payment options to show
  const hasWompiProvider = availablePaymentMethods?.some(
    (m: any) => m.id === WOMPI_LINK_ID
  )

  // Filter out the base Wompi provider if we're showing widget/checkout web instead
  const filteredMethods = availablePaymentMethods?.filter((m: any) => {
    if (m.id === WOMPI_LINK_ID) {
      // Only show the link option if payment_link is enabled AND no other wompi options
      return wompiMethods?.payment_link_enabled && !wompiMethods?.widget_enabled && !wompiMethods?.checkout_web_enabled
    }
    return true
  }) || []

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && !paymentReady,
            }
          )}
        >
          {t("payment")}
          {!isOpen && paymentReady && <CheckCircleSolid />}
        </Heading>
        {!isOpen && paymentReady && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
              data-testid="edit-payment-button"
            >
              {t("edit")}
            </button>
          </Text>
        )}
      </div>
      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && (
            <RadioGroup
              value={selectedPaymentMethod}
              onChange={(value: string) => setPaymentMethod(value)}
            >
              {/* Standard Medusa payment methods (excluding base Wompi if sub-options are shown) */}
              {filteredMethods.map((paymentMethod: any) => (
                <div key={paymentMethod.id}>
                  <PaymentContainer
                    paymentInfoMap={paymentInfoMap}
                    paymentProviderId={paymentMethod.id}
                    selectedPaymentOptionId={selectedPaymentMethod}
                  />
                </div>
              ))}

              {/* Wompi Widget - Pagar en línea */}
              {hasWompiProvider && wompiMethods?.widget_enabled && (
                <Radio
                  value={WOMPI_WIDGET_ID}
                  className={clx(
                    "flex items-center justify-between text-small-regular cursor-pointer py-4 border rounded-rounded px-8 mb-2 hover:shadow-borders-interactive-with-active",
                    { "border-ui-border-interactive": selectedPaymentMethod === WOMPI_WIDGET_ID }
                  )}
                >
                  <div className="flex items-center gap-x-4">
                    <MedusaRadio checked={selectedPaymentMethod === WOMPI_WIDGET_ID} />
                    <div>
                      <span className="text-base-regular">{t("wompiWidgetTitle")}</span>
                      <p className="text-xs text-ui-fg-muted mt-0.5">{t("wompiWidgetDesc")}</p>
                    </div>
                  </div>
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                </Radio>
              )}

              {/* Wompi Checkout Web - Redirect */}
              {hasWompiProvider && wompiMethods?.checkout_web_enabled && (
                <Radio
                  value={WOMPI_CHECKOUT_WEB_ID}
                  className={clx(
                    "flex items-center justify-between text-small-regular cursor-pointer py-4 border rounded-rounded px-8 mb-2 hover:shadow-borders-interactive-with-active",
                    { "border-ui-border-interactive": selectedPaymentMethod === WOMPI_CHECKOUT_WEB_ID }
                  )}
                >
                  <div className="flex items-center gap-x-4">
                    <MedusaRadio checked={selectedPaymentMethod === WOMPI_CHECKOUT_WEB_ID} />
                    <div>
                      <span className="text-base-regular">{t("wompiCheckoutWebTitle")}</span>
                      <p className="text-xs text-ui-fg-muted mt-0.5">{t("wompiCheckoutWebDesc")}</p>
                    </div>
                  </div>
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </Radio>
              )}

              {/* Wompi Link - shown alongside if all 3 are enabled */}
              {hasWompiProvider && wompiMethods?.payment_link_enabled && (wompiMethods?.widget_enabled || wompiMethods?.checkout_web_enabled) && (
                <Radio
                  value={WOMPI_LINK_ID}
                  className={clx(
                    "flex items-center justify-between text-small-regular cursor-pointer py-4 border rounded-rounded px-8 mb-2 hover:shadow-borders-interactive-with-active",
                    { "border-ui-border-interactive": selectedPaymentMethod === WOMPI_LINK_ID }
                  )}
                >
                  <div className="flex items-center gap-x-4">
                    <MedusaRadio checked={selectedPaymentMethod === WOMPI_LINK_ID} />
                    <div>
                      <span className="text-base-regular">{t("wompiLinkTitle")}</span>
                      <p className="text-xs text-ui-fg-muted mt-0.5">{t("wompiLinkDesc")}</p>
                    </div>
                  </div>
                  <CreditCard className="text-emerald-600" />
                </Radio>
              )}
            </RadioGroup>
          )}

          {paidByGiftcard && (
            <div className="flex flex-col w-1/3">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                {t("paymentMethod")}
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method-summary"
              >
                {t("giftCard")}
              </Text>
            </div>
          )}

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          {wompiProcessing && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-3">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {t("wompiVerifying")}
            </div>
          )}

          <Button
            size="large"
            className="mt-6"
            onClick={handleSubmit}
            isLoading={isLoading || wompiProcessing}
            disabled={!selectedPaymentMethod && !paidByGiftcard}
            data-testid="submit-payment-button"
          >
            {selectedPaymentMethod === WOMPI_WIDGET_ID
              ? t("wompiWidgetTitle")
              : selectedPaymentMethod === WOMPI_CHECKOUT_WEB_ID
              ? t("wompiCheckoutWebTitle")
              : t("continueToReview")}
          </Button>
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession ? (
            <div className="flex items-start gap-x-1 w-full">
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  {t("paymentMethod")}
                </Text>
                <Text
                  className="txt-medium text-ui-fg-subtle"
                  data-testid="payment-method-summary"
                >
                  {paymentInfoMap[activeSession?.provider_id]?.title ||
                    activeSession?.provider_id}
                </Text>
              </div>
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  {t("paymentDetails")}
                </Text>
                <div
                  className="flex gap-2 txt-medium text-ui-fg-subtle items-center"
                  data-testid="payment-details-summary"
                >
                  <Container className="flex items-center h-7 w-fit p-2 bg-ui-button-neutral-hover">
                    {paymentInfoMap[selectedPaymentMethod]?.icon || (
                      <CreditCard />
                    )}
                  </Container>
                </div>
              </div>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  )
}

export default Payment
