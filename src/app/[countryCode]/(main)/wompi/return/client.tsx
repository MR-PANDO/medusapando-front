"use client"

import { verifyWompiTransaction } from "@lib/data/wompi"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type WompiReturnClientProps = {
  transactionId?: string
  countryCode: string
}

export default function WompiReturnClient({
  transactionId,
  countryCode,
}: WompiReturnClientProps) {
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "pending" | "failed">("loading")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!transactionId) {
      setStatus("failed")
      setError("No se encontro la transaccion")
      return
    }

    // Get cart_id from cookie or localStorage
    const cartId = document.cookie
      .split("; ")
      .find((row) => row.startsWith("_medusa_cart_id="))
      ?.split("=")[1]

    if (!cartId) {
      setStatus("failed")
      setError("No se encontro el carrito")
      return
    }

    verifyWompiTransaction(transactionId, cartId).then((result) => {
      if (result.status === "APPROVED") {
        setStatus("success")
        // Redirect to order confirmation after a brief delay
        setTimeout(() => {
          router.push(`/${countryCode}/order/confirmed`)
        }, 2000)
      } else if (result.status === "PENDING") {
        setStatus("pending")
      } else {
        setStatus("failed")
        setError(`Pago ${result.status?.toLowerCase() || "fallido"}`)
      }
    })
  }, [transactionId, countryCode, router])

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        {status === "loading" && (
          <>
            <svg className="w-16 h-16 animate-spin text-emerald-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Verificando pago</h2>
            <p className="text-sm text-gray-500">Estamos confirmando tu transaccion con Wompi...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-emerald-700 mb-2">Pago aprobado</h2>
            <p className="text-sm text-gray-500">Redirigiendo a la confirmacion de tu pedido...</p>
          </>
        )}

        {status === "pending" && (
          <>
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-amber-700 mb-2">Pago pendiente</h2>
            <p className="text-sm text-gray-500">Tu pago esta siendo procesado. Recibiras una confirmacion por correo.</p>
            <button
              onClick={() => router.push(`/${countryCode}/store`)}
              className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm"
            >
              Volver a la tienda
            </button>
          </>
        )}

        {status === "failed" && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-700 mb-2">Pago no aprobado</h2>
            <p className="text-sm text-gray-500">{error || "El pago no fue procesado exitosamente."}</p>
            <button
              onClick={() => router.push(`/${countryCode}/checkout?step=payment`)}
              className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm"
            >
              Intentar de nuevo
            </button>
          </>
        )}
      </div>
    </div>
  )
}
