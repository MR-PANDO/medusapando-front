"use client"

import { DIET_OPTIONS, DietOption } from "../../types"

interface DietSelectorProps {
  selectedDiet: string | null
  onSelect: (diet: DietOption) => void
  disabled?: boolean
}

export default function DietSelector({
  selectedDiet,
  onSelect,
  disabled = false,
}: DietSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {DIET_OPTIONS.map((diet) => {
        const isSelected = selectedDiet === diet.id
        return (
          <button
            key={diet.id}
            onClick={() => onSelect(diet)}
            disabled={disabled}
            className={`
              relative p-4 rounded-xl border-2 transition-all duration-200
              ${isSelected
                ? "border-emerald-500 bg-emerald-50 shadow-md"
                : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            <div
              className="w-8 h-8 rounded-full mx-auto mb-2"
              style={{ backgroundColor: diet.color }}
            />
            <span
              className={`text-sm font-medium block text-center ${
                isSelected ? "text-emerald-700" : "text-gray-700"
              }`}
            >
              {diet.name}
            </span>
            {isSelected && (
              <div className="absolute top-2 right-2">
                <svg
                  className="w-5 h-5 text-emerald-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
