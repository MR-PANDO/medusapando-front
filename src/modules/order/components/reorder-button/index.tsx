"use client"

import { reorder } from "@lib/data/orders"
import { ArrowUpRightMini } from "@medusajs/icons"
import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import React, { useState } from "react"
import { toast } from "sonner"

type ReorderButtonProps = {
  orderId: string
}

const ReorderButton: React.FC<ReorderButtonProps> = ({ orderId }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { countryCode } = useParams()
  const t = useTranslations("order")

  const handleReorder = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const { cart, skipped_items } = await reorder(orderId)

      if (skipped_items.length > 0) {
        const skippedNames = skipped_items
          .map((item) => {
            const name = item.product_title || t("unknownProduct")
            const variant = item.variant_title ? ` (${item.variant_title})` : ""
            return `${name}${variant}`
          })
          .join(", ")

        toast.warning(t("someItemsSkipped"), {
          description: skippedNames,
          duration: 8000,
        })
      }

      if (cart?.id) {
        if (skipped_items.length === 0) {
          toast.success(t("reorderSuccess"))
        }
        // Delay navigation slightly so toast is visible
        setTimeout(() => {
          window.location.href = `/${countryCode}/cart`
        }, skipped_items.length > 0 ? 2000 : 500)
      }
    } catch (err: any) {
      setError(err?.message || t("createOrderError"))
      toast.error(err?.message || t("createOrderError"))
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        onClick={handleReorder}
        disabled={isLoading}
        className="flex gap-2 items-center text-ui-fg-interactive hover:text-ui-fg-interactive-hover disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowUpRightMini />
        {isLoading ? t("creatingOrder") : t("reorder")}
      </button>
      {error && (
        <span className="text-sm text-ui-fg-error">{error}</span>
      )}
    </div>
  )
}

export default ReorderButton
