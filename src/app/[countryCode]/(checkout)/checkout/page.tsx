import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { getRecentlyPurchased } from "@lib/data/orders"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import BuyAgain from "@modules/checkout/components/buy-again"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Checkout",
}

type Props = {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{ step?: string }>
}

export default async function Checkout({ params, searchParams }: Props) {
  const { countryCode } = await params
  const { step } = await searchParams
  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()

  // Get recently purchased items if customer is logged in
  const recentlyPurchased = customer ? await getRecentlyPurchased(6) : []

  // Show BuyAgain on address, delivery, and payment steps — hide on review
  const showBuyAgain =
    recentlyPurchased.length > 0 && step !== "review"

  return (
    <>
      <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] content-container gap-x-40 py-12 pb-32">
        <PaymentWrapper cart={cart}>
          <CheckoutForm cart={cart} customer={customer} />
        </PaymentWrapper>
        <CheckoutSummary cart={cart} />
      </div>
      {showBuyAgain && (
        <BuyAgain items={recentlyPurchased} countryCode={countryCode} />
      )}
    </>
  )
}
