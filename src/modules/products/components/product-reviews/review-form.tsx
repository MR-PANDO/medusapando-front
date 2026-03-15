"use client"

import { submitReview } from "@lib/data/reviews"
import { useState, useTransition } from "react"
import { useTranslations } from "next-intl"
import StarRating from "./star-rating"

type ReviewFormProps = {
  productId: string
}

export default function ReviewForm({ productId }: ReviewFormProps) {
  const t = useTranslations("products")
  const [isOpen, setIsOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isPending, startTransition] = useTransition()
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!rating || !content.trim()) {
      setError(t("reviewRequiredFields"))
      return
    }

    setError(null)
    startTransition(async () => {
      const result = await submitReview({
        product_id: productId,
        rating,
        content: content.trim(),
        title: title.trim() || undefined,
      })

      if (result.success) {
        setSubmitted(true)
        setIsOpen(false)
        setRating(0)
        setTitle("")
        setContent("")
      } else {
        setError(result.error || t("reviewError"))
      }
    })
  }

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
        <svg className="w-8 h-8 text-emerald-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm font-medium text-emerald-700">{t("reviewSubmitted")}</p>
        <p className="text-xs text-emerald-600 mt-1">{t("reviewPendingApproval")}</p>
      </div>
    )
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition-colors"
      >
        {t("writeReview")}
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-3 md:p-4 space-y-3 md:space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-900">{t("writeReview")}</h4>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="p-2 text-gray-400 hover:text-gray-600 -mr-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Rating */}
      <div>
        <label className="text-xs font-medium text-gray-700 mb-1 block">{t("rating")} *</label>
        <StarRating rating={rating} interactive onChange={setRating} size="lg" />
      </div>

      {/* Title */}
      <div>
        <label className="text-xs font-medium text-gray-700 mb-1 block">{t("reviewTitle")}</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t("reviewTitlePlaceholder")}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
          maxLength={100}
        />
      </div>

      {/* Content */}
      <div>
        <label className="text-xs font-medium text-gray-700 mb-1 block">{t("reviewContent")} *</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t("reviewContentPlaceholder")}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 min-h-[80px] resize-y"
          maxLength={1000}
          required
        />
      </div>

      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={isPending || !rating || !content.trim()}
        className="w-full py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? t("submitting") : t("submitReview")}
      </button>
    </form>
  )
}
