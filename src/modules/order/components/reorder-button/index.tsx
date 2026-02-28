"use client"

import { reorder } from "@lib/data/orders"
import { ArrowUpRightMini } from "@medusajs/icons"
import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import React, { useState } from "react"

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
      const cart = await reorder(orderId)

      if (cart?.id) {
        // Hard navigation to ensure fresh cookies and data
        window.location.href = `/${countryCode}/cart`
      }
    } catch (err: any) {
      setError(err?.message || t("createOrderError"))
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
