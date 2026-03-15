"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import ImageLightbox from "@modules/common/components/image-lightbox"

type ImageZoomButtonProps = {
  imageSrc: string | null
  alt: string
}

export default function ImageZoomButton({ imageSrc, alt }: ImageZoomButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!imageSrc) return null

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(true)
        }}
        className="absolute bottom-2 right-2 z-10 w-10 h-10 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white hover:shadow-lg transition-all md:opacity-0 md:group-hover:opacity-100"
        type="button"
        title="Ver imagen"
        aria-label="Ampliar imagen"
      >
        <svg
          className="w-4 h-4 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
          />
        </svg>
      </button>

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <ImageLightbox
            src={imageSrc}
            alt={alt}
            onClose={() => setIsOpen(false)}
          />,
          document.body
        )}
    </>
  )
}
