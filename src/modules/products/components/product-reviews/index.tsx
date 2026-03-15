"use client"

import { getProductReviews, ProductReview } from "@lib/data/reviews"
import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import StarRating from "./star-rating"
import ReviewForm from "./review-form"

type ProductReviewsProps = {
  productId: string
}

function ReviewCard({ review }: { review: ProductReview }) {
  const date = new Date(review.created_at).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <StarRating rating={review.rating} size="sm" />
          {review.title && (
            <p className="text-sm font-semibold text-gray-900 mt-1">{review.title}</p>
          )}
        </div>
        <span className="text-xs text-gray-400 flex-shrink-0">{date}</span>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">{review.content}</p>
      <p className="text-xs text-gray-500 mt-3">
        {review.first_name} {review.last_name?.charAt(0)}.
      </p>
    </div>
  )
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const t = useTranslations("products")
  const [reviews, setReviews] = useState<ProductReview[]>([])
  const [averageRating, setAverageRating] = useState(0)
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(true)
  const limit = 6

  useEffect(() => {
    setLoading(true)
    getProductReviews(productId, limit, (page - 1) * limit).then((data) => {
      setReviews((prev) => {
        const newReviews = data.reviews.filter(
          (r) => !prev.some((p) => p.id === r.id)
        )
        return page === 1 ? data.reviews : [...prev, ...newReviews]
      })
      setAverageRating(data.average_rating)
      setCount(data.count)
      setHasMore(data.count > page * limit)
      setLoading(false)
    })
  }, [productId, page])

  return (
    <div className="mt-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{t("reviews")}</h3>
          {count > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={Math.round(averageRating)} size="sm" />
              <span className="text-sm text-gray-600">
                {averageRating.toFixed(1)} ({count} {count === 1 ? t("review") : t("reviewsCount")})
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Reviews list */}
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : !loading ? (
        <div className="text-center py-8 mb-6">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-sm text-gray-500">{t("noReviews")}</p>
          <p className="text-xs text-gray-400 mt-1">{t("beFirstReview")}</p>
        </div>
      ) : null}

      {/* Load more */}
      {hasMore && (
        <div className="text-center mb-6">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-6 py-2 text-sm font-medium text-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            {t("loadMoreReviews")}
          </button>
        </div>
      )}

      {/* Review form */}
      <ReviewForm productId={productId} />
    </div>
  )
}
