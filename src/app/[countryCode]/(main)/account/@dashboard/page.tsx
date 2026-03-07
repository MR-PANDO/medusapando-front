import { Metadata } from "next"

import Overview from "@modules/account/components/overview"
import { notFound } from "next/navigation"
import { retrieveCustomer } from "@lib/data/customer"
import { listOrders } from "@lib/data/orders"
import { getAbandonedCart } from "@lib/data/cart"

export const metadata: Metadata = {
  title: "Account",
  description: "Overview of your account activity.",
}

export default async function OverviewTemplate() {
  const customer = await retrieveCustomer().catch(() => null)
  const [orders, abandonedCart] = await Promise.all([
    listOrders().catch(() => null),
    getAbandonedCart().catch(() => null),
  ])

  if (!customer) {
    notFound()
  }

  return (
    <Overview
      customer={customer}
      orders={orders || null}
      abandonedCart={abandonedCart}
    />
  )
}
