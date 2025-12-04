import { Metadata } from "next"

import { listCartOptions, retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import { getBaseURL } from "@lib/util/env"
import { StoreCartShippingOption } from "@medusajs/types"
import { SideMenuProvider } from "@lib/context/side-menu-context"
import CartMismatchBanner from "@modules/layout/components/cart-mismatch-banner"
import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import FreeShippingPriceNudge from "@modules/shipping/components/free-shipping-price-nudge"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  let customer = null
  let cart = null
  let shippingOptions: StoreCartShippingOption[] = []

  // Wrap in try-catch to prevent backend errors from crashing the entire page
  try {
    customer = await retrieveCustomer()
  } catch (error) {
    console.error("Error retrieving customer:", error)
  }

  try {
    cart = await retrieveCart()
    if (cart) {
      const { shipping_options } = await listCartOptions()
      shippingOptions = shipping_options
    }
  } catch (error) {
    console.error("Error retrieving cart:", error)
  }

  return (
    <SideMenuProvider>
      <Nav />
      {customer && cart && (
        <CartMismatchBanner customer={customer} cart={cart} />
      )}

      {cart && (
        <FreeShippingPriceNudge
          variant="popup"
          cart={cart}
          shippingOptions={shippingOptions}
        />
      )}
      {props.children}
      <Footer />
    </SideMenuProvider>
  )
}
