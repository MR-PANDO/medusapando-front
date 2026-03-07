"use client"

import { Container } from "@medusajs/ui"

import ChevronDown from "@modules/common/icons/chevron-down"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { useTranslations } from "next-intl"
import { AbandonedCart } from "@lib/data/cart"
import Image from "next/image"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
  abandonedCart: AbandonedCart | null
}

const Overview = ({ customer, orders, abandonedCart }: OverviewProps) => {
  const t = useTranslations("account")
  return (
    <div data-testid="overview-page-wrapper">
      <div className="hidden small:block">
        <div className="text-xl-semi flex justify-between items-center mb-4">
          <span data-testid="welcome-message" data-value={customer?.first_name}>
            {t("hello", { name: customer?.first_name })}
          </span>
          <span className="text-small-regular text-ui-fg-base">
            {t("signedInAs")}{" "}
            <span
              className="font-semibold"
              data-testid="customer-email"
              data-value={customer?.email}
            >
              {customer?.email}
            </span>
          </span>
        </div>
        <div className="flex flex-col py-8 border-t border-gray-200">
          <div className="flex flex-col gap-y-4 h-full col-span-1 row-span-2 flex-1">
            <div className="flex items-start gap-x-16 mb-6">
              <div className="flex flex-col gap-y-4">
                <h3 className="text-large-semi">{t("profile")}</h3>
                <div className="flex items-end gap-x-2">
                  <span
                    className="text-3xl-semi leading-none"
                    data-testid="customer-profile-completion"
                    data-value={getProfileCompletion(customer)}
                  >
                    {getProfileCompletion(customer)}%
                  </span>
                  <span className="uppercase text-base-regular text-ui-fg-subtle">
                    {t("completed")}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-y-4">
                <h3 className="text-large-semi">{t("addresses")}</h3>
                <div className="flex items-end gap-x-2">
                  <span
                    className="text-3xl-semi leading-none"
                    data-testid="addresses-count"
                    data-value={customer?.addresses?.length || 0}
                  >
                    {customer?.addresses?.length || 0}
                  </span>
                  <span className="uppercase text-base-regular text-ui-fg-subtle">
                    {t("saved")}
                  </span>
                </div>
              </div>
            </div>

            {abandonedCart && (
              <AbandonedCartSection cart={abandonedCart} />
            )}

            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-2">
                <h3 className="text-large-semi">{t("recentOrders")}</h3>
              </div>
              <ul
                className="flex flex-col gap-y-4"
                data-testid="orders-wrapper"
              >
                {orders && orders.length > 0 ? (
                  orders.slice(0, 5).map((order) => {
                    return (
                      <li
                        key={order.id}
                        data-testid="order-wrapper"
                        data-value={order.id}
                      >
                        <LocalizedClientLink
                          href={`/account/orders/details/${order.id}`}
                        >
                          <Container className="bg-gray-50 flex justify-between items-center p-4">
                            <div className="grid grid-cols-3 grid-rows-2 text-small-regular gap-x-4 flex-1">
                              <span className="font-semibold">{t("datePlaced")}</span>
                              <span className="font-semibold">
                                {t("orderNumber")}
                              </span>
                              <span className="font-semibold">
                                {t("totalAmount")}
                              </span>
                              <span data-testid="order-created-date">
                                {new Date(order.created_at).toDateString()}
                              </span>
                              <span
                                data-testid="order-id"
                                data-value={order.display_id}
                              >
                                #{order.display_id}
                              </span>
                              <span data-testid="order-amount">
                                {convertToLocale({
                                  amount: order.total,
                                  currency_code: order.currency_code,
                                })}
                              </span>
                            </div>
                            <button
                              className="flex items-center justify-between"
                              data-testid="open-order-button"
                            >
                              <span className="sr-only">
                                {t("goToOrder", { id: order.display_id })}
                              </span>
                              <ChevronDown className="-rotate-90" />
                            </button>
                          </Container>
                        </LocalizedClientLink>
                      </li>
                    )
                  })
                ) : (
                  <span data-testid="no-orders-message">{t("noRecentOrders")}</span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const AbandonedCartSection = ({ cart }: { cart: AbandonedCart }) => {
  const t = useTranslations("account")

  const daysLeft = Math.max(
    0,
    Math.ceil(
      (new Date(cart.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    )
  )

  return (
    <div className="flex flex-col gap-y-4 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="text-large-semi">{t("abandonedCart")}</h3>
        <span className="text-small-regular text-ui-fg-subtle">
          {t("expiresIn", { days: daysLeft })}
        </span>
      </div>
      <Container className="bg-amber-50 border border-amber-200 p-4">
        <p className="text-small-regular text-ui-fg-base mb-4">
          {t("abandonedCartMessage")}
        </p>
        <div className="flex gap-3 mb-4 overflow-x-auto">
          {cart.items.slice(0, 4).map((item) => (
            <div key={item.id} className="flex items-center gap-3 min-w-0">
              {item.thumbnail && (
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={48}
                  height={48}
                  className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                />
              )}
              <div className="min-w-0">
                <p className="text-small-regular font-medium truncate">
                  {item.title}
                </p>
                <p className="text-xs text-ui-fg-subtle">
                  x{item.quantity}
                </p>
              </div>
            </div>
          ))}
          {cart.items.length > 4 && (
            <div className="flex items-center text-small-regular text-ui-fg-subtle flex-shrink-0">
              +{cart.items.length - 4}
            </div>
          )}
        </div>
        <LocalizedClientLink
          href={`/cart/recover/${cart.id}`}
          className="inline-block bg-amber-600 text-white text-small-semi px-6 py-2 rounded-md hover:bg-amber-700 transition-colors"
        >
          {t("recoverCart")}
        </LocalizedClientLink>
      </Container>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  if (billingAddress) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
