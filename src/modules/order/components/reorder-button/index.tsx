"use client"

import { reorder } from "@lib/data/orders"
import { ArrowUpRightMini } from "@medusajs/icons"
import { useParams, useRouter } from "next/navigation"
import React, { useState } from "react"

type ReorderButtonProps = {
  orderId: string
}

const ReorderButton: React.FC<ReorderButtonProps> = ({ orderId }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { countryCode } = useParams()

  const handleReorder = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const cart = await reorder(orderId)

      if (cart?.id) {
        router.push(`/${countryCode}/cart`)
      }
    } catch (err: any) {
      setError(err?.message || "Error al crear el nuevo pedido")
    } finally {
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
        {isLoading ? "Creando pedido..." : "Volver a Pedir"}
      </button>
      {error && (
        <span className="text-sm text-ui-fg-error">{error}</span>
      )}
    </div>
  )
}

export default ReorderButton
