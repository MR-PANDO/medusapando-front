"use client"

import { verifyWompiTransaction } from "@lib/data/wompi"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type WompiReturnClientProps = {
  transactionId?: string
  countryCode: string
}

type TransactionDetail = {
  id?: string
  status?: string
  payment_method_type?: string
  amount_in_cents?: number
  reference?: string
}

export default function WompiReturnClient({
  transactionId,
  countryCode,
}: WompiReturnClientProps) {
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "pending" | "failed" | "declined">("loading")
  const [transaction, setTransaction] = useState<TransactionDetail | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!transactionId) {
      setStatus("failed")
      setErrorMessage("No se encontró la información de la transacción")
      return
    }

    const cartId = document.cookie
      .split("; ")
      .find((row) => row.startsWith("_medusa_cart_id="))
      ?.split("=")[1]

    if (!cartId) {
      setStatus("failed")
      setErrorMessage("No se encontró el carrito de compras")
      return
    }

    verifyWompiTransaction(transactionId, cartId).then((result) => {
      setTransaction({
        id: transactionId,
        status: result.status,
        payment_method_type: result.transaction?.payment_method_type,
        amount_in_cents: result.transaction?.amount_in_cents,
        reference: result.transaction?.reference,
      })

      if (result.status === "APPROVED") {
        setStatus("success")
      } else if (result.status === "PENDING") {
        setStatus("pending")
      } else if (result.status === "DECLINED") {
        setStatus("declined")
        setErrorMessage("Tu entidad financiera no aprobó la transacción")
      } else if (result.status === "VOIDED") {
        setStatus("declined")
        setErrorMessage("La transacción fue anulada")
      } else {
        setStatus("failed")
        setErrorMessage("Ocurrió un error procesando el pago")
      }
    }).catch(() => {
      setStatus("failed")
      setErrorMessage("No pudimos verificar tu transacción")
    })
  }, [transactionId, countryCode, router])

  const formatCOP = (amountInCents: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amountInCents / 100)
  }

  const paymentMethodLabel = (type?: string) => {
    const labels: Record<string, string> = {
      CARD: "Tarjeta de crédito/débito",
      NEQUI: "Nequi",
      PSE: "PSE",
      BANCOLOMBIA_TRANSFER: "Transferencia Bancolombia",
      BANCOLOMBIA_COLLECT: "Bancolombia a la mano",
    }
    return labels[type || ""] || type || "Pago en línea"
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Card container */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {/* Top gradient bar */}
          <div className="h-1.5" style={{ background: "linear-gradient(90deg, #5B8C3E, #DA763E, #5B8C3E)" }} />

          {/* Logo */}
          <div className="flex justify-center pt-8 pb-4">
            <Image src="/logo.svg" alt="Vita Integral" width={160} height={45} priority />
          </div>

          {/* Content */}
          <div className="px-6 pb-8 text-center">

            {/* Loading */}
            {status === "loading" && (
              <>
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-16 h-16 animate-spin text-emerald-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Verificando tu pago</h1>
                <p className="text-gray-500">Estamos confirmando tu transacción con Wompi...</p>
                <p className="text-xs text-gray-400 mt-2">Esto puede tomar unos segundos</p>
              </>
            )}

            {/* Success */}
            {status === "success" && (
              <>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#f0f7ec" }}>
                  <svg className="w-10 h-10" style={{ color: "#5B8C3E" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold mb-2" style={{ color: "#5B8C3E" }}>¡Pago aprobado!</h1>
                <p className="text-gray-600 mb-6">Tu pedido ha sido procesado exitosamente</p>

                {/* Transaction details */}
                {transaction && (
                  <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2">
                    {transaction.amount_in_cents && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Total</span>
                        <span className="text-sm font-semibold text-gray-900">{formatCOP(transaction.amount_in_cents)}</span>
                      </div>
                    )}
                    {transaction.payment_method_type && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Método</span>
                        <span className="text-sm text-gray-700">{paymentMethodLabel(transaction.payment_method_type)}</span>
                      </div>
                    )}
                    {transaction.id && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Transacción</span>
                        <span className="text-xs text-gray-400 font-mono">{transaction.id}</span>
                      </div>
                    )}
                  </div>
                )}

                <p className="text-xs text-gray-400 mb-6">Recibirás un correo de confirmación con los detalles de tu pedido</p>

                <LocalizedClientLink
                  href="/account/orders"
                  className="inline-block w-full py-3 text-white font-medium rounded-lg transition-colors text-center"
                  style={{ backgroundColor: "#5B8C3E" }}
                >
                  Ver mis pedidos
                </LocalizedClientLink>
              </>
            )}

            {/* Pending */}
            {status === "pending" && (
              <>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-amber-50">
                  <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-amber-600 mb-2">Pago pendiente</h1>
                <p className="text-gray-600 mb-4">Tu pago está siendo procesado por la entidad financiera</p>
                <p className="text-sm text-gray-500 mb-6">Recibirás una confirmación por correo electrónico cuando se complete la transacción. Esto puede tomar hasta 24 horas.</p>

                {transaction?.id && (
                  <div className="bg-amber-50 rounded-xl p-4 mb-6">
                    <p className="text-xs text-amber-700">
                      Transacción: <span className="font-mono">{transaction.id}</span>
                    </p>
                  </div>
                )}

                <LocalizedClientLink
                  href="/store"
                  className="inline-block w-full py-3 text-white font-medium rounded-lg transition-colors text-center"
                  style={{ backgroundColor: "#5B8C3E" }}
                >
                  Seguir comprando
                </LocalizedClientLink>
              </>
            )}

            {/* Declined / Failed */}
            {(status === "declined" || status === "failed") && (
              <>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-red-50">
                  <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-red-600 mb-2">Pago no aprobado</h1>
                <p className="text-gray-600 mb-4">{errorMessage || "El pago no fue procesado exitosamente"}</p>

                {transaction && (
                  <div className="bg-red-50 rounded-xl p-4 mb-6 text-left space-y-2">
                    {transaction.status && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Estado</span>
                        <span className="text-sm font-medium text-red-600">{transaction.status}</span>
                      </div>
                    )}
                    {transaction.payment_method_type && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Método</span>
                        <span className="text-sm text-gray-700">{paymentMethodLabel(transaction.payment_method_type)}</span>
                      </div>
                    )}
                    {transaction.id && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Transacción</span>
                        <span className="text-xs text-gray-400 font-mono">{transaction.id}</span>
                      </div>
                    )}
                  </div>
                )}

                <p className="text-xs text-gray-400 mb-6">Puedes intentar con otro método de pago o contactar a tu entidad financiera</p>

                <div className="space-y-3">
                  <LocalizedClientLink
                    href="/checkout?step=payment"
                    className="inline-block w-full py-3 text-white font-medium rounded-lg transition-colors text-center"
                    style={{ backgroundColor: "#DA763E" }}
                  >
                    Intentar de nuevo
                  </LocalizedClientLink>
                  <LocalizedClientLink
                    href="/store"
                    className="inline-block w-full py-3 text-gray-700 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-center"
                  >
                    Volver a la tienda
                  </LocalizedClientLink>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              Pago seguro procesado por Wompi
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
