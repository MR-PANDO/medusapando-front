"use client"

import { clearCart } from "@lib/data/cart"
import { Trash } from "@medusajs/icons"
import { useState } from "react"
import Spinner from "@modules/common/icons/spinner"

const ClearCartButton = () => {
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
      <span>{confirm ? "Confirmar" : "Vaciar carrito"}</span>
    </button>
  )
}

export default ClearCartButton
