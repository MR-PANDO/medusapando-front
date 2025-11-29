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
}

export default async function Checkout({ params }: Props) {
  const { countryCode } = await params
  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()

  // Get recently purchased items if customer is logged in
  const recentlyPurchased = customer ? await getRecentlyPurchased(6) : []

  return (
    <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] content-container gap-x-40 py-12">
      <PaymentWrapper cart={cart}>
        <CheckoutForm cart={cart} customer={customer} />
      </PaymentWrapper>
      <div className="flex flex-col">
        <CheckoutSummary cart={cart} />
        {recentlyPurchased.length > 0 && (
          <BuyAgain items={recentlyPurchased} countryCode={countryCode} />
        )}
      </div>
    </div>
  )
}
