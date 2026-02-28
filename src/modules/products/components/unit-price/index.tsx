"use client"

import { Text } from "@medusajs/ui"
import { useTranslations, useLocale } from "next-intl"

type UnitPricing = {
  unit_type: string
  unit_amount: number
  base_unit_amount: number
}

type UnitPriceProps = {
  price: number // The product price in cents or smallest currency unit
  currencyCode: string
  unitPricing?: UnitPricing | null
  className?: string
}

// Standard unit labels that don't need translation
const STANDARD_UNITS: Record<string, string> = {
  g: "g",
  kg: "kg",
  mg: "mg",
  ml: "ml",
  L: "L",
  oz: "oz",
  lb: "lb",
}

// Unit types that need translation
const TRANSLATABLE_UNITS = ["capsule", "tablet", "unit", "serving"]

export function calculatePricePerUnit(
  price: number,
  unitPricing: UnitPricing
): number {
  if (!unitPricing.unit_amount || unitPricing.unit_amount === 0) {
    return 0
  }
  // Price per single unit (e.g., price per 1g, price per 1ml)
  return price / unitPricing.unit_amount
}

export default function UnitPrice({
  price,
  currencyCode,
  unitPricing,
  className = "",
}: UnitPriceProps) {
  const tUnits = useTranslations("units")
  const locale = useLocale()

  if (!unitPricing || !unitPricing.unit_amount || unitPricing.unit_amount === 0) {
    return null
  }

  const pricePerUnit = calculatePricePerUnit(price, unitPricing)
  const formattedPrice = new Intl.NumberFormat(locale === "es" ? "es-CO" : "en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(pricePerUnit)

  const unitLabel = TRANSLATABLE_UNITS.includes(unitPricing.unit_type)
    ? tUnits(unitPricing.unit_type)
    : STANDARD_UNITS[unitPricing.unit_type] || unitPricing.unit_type

  return (
    <Text
      className={`text-sm text-ui-fg-muted ${className}`}
      data-testid="unit-price"
    >
      {formattedPrice} / {unitLabel}
    </Text>
  )
}
