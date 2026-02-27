"use client"

import { useState } from "react"
import { SeoMetadata } from "@lib/data/seo"

type FaqSectionProps = {
  seo: SeoMetadata | null
}

const FaqSection = ({ seo }: FaqSectionProps) => {
  const faqs = seo?.aeo_faqs || []
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (faqs.length === 0) return null

  return (
    <section className="py-8">
      <h2 className="text-xl font-semibold mb-4">Preguntas Frecuentes</h2>
      <div className="space-y-2">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border rounded-lg overflow-hidden">
            <button
              type="button"
              className="w-full text-left px-4 py-3 font-medium flex items-center justify-between hover:bg-gray-50 transition-colors"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              aria-expanded={openIndex === idx}
            >
              <span>{faq.question}</span>
              <svg
                className={`w-5 h-5 transition-transform ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openIndex === idx && (
              <div className="px-4 pb-3 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default FaqSection
