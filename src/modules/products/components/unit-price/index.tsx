import { Text } from "@medusajs/ui"

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

// Unit type labels in Spanish
const UNIT_LABELS: Record<string, string> = {
  g: "g",
  kg: "kg",
  mg: "mg",
  ml: "ml",
  L: "L",
  oz: "oz",
  lb: "lb",
  capsule: "cáps",
  tablet: "tab",
  unit: "und",
  serving: "porción",
}

export function calculatePricePerUnit(
  price: number,
  unitPricing: UnitPricing
): number {
  if (!unitPricing.unit_amount || unitPricing.unit_amount === 0) {
    return 0
  }
  return (price / unitPricing.unit_amount) * unitPricing.base_unit_amount
}

export function formatPricePerUnit(
  pricePerUnit: number,
  currencyCode: string
): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(pricePerUnit)
}

export default function UnitPrice({
  price,
  currencyCode,
  unitPricing,
  className = "",
}: UnitPriceProps) {
  if (!unitPricing || !unitPricing.unit_amount || unitPricing.unit_amount === 0) {
    return null
  }

  const pricePerUnit = calculatePricePerUnit(price, unitPricing)
  const formattedPrice = formatPricePerUnit(pricePerUnit, currencyCode)
  const unitLabel = UNIT_LABELS[unitPricing.unit_type] || unitPricing.unit_type

  return (
    <Text
      className={`text-sm text-ui-fg-muted ${className}`}
      data-testid="unit-price"
    >
      {formattedPrice} / {unitPricing.base_unit_amount}{unitLabel}
    </Text>
  )
}
