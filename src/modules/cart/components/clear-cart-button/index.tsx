"use client"

import { clearCart } from "@lib/data/cart"
import { Trash } from "@medusajs/icons"
import { useState } from "react"
import { useTranslations } from "next-intl"
import Spinner from "@modules/common/icons/spinner"

const ClearCartButton = () => {
  const t = useTranslations("cart")
  const [isClearing, setIsClearing] = useState(false)
  const [confirm, setConfirm] = useState(false)

  const handleClear = async () => {
    if (!confirm) {
      setConfirm(true)
      return
    }

    setIsClearing(true)
    try {
      await clearCart()
    } catch {
      // silent
    } finally {
      setIsClearing(false)
      setConfirm(false)
    }
  }

  return (
    <button
      onClick={handleClear}
      onBlur={() => setConfirm(false)}
      disabled={isClearing}
      className="flex items-center gap-x-1 text-small-regular text-ui-fg-subtle hover:text-ui-fg-base disabled:opacity-50"
    >
      {isClearing ? <Spinner /> : <Trash />}
      <span>{confirm ? t("confirm") : t("clearCart")}</span>
    </button>
  )
}

export default ClearCartButton
