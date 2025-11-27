import { Text, clx } from "@medusajs/ui"
import { VariantPrice } from "types/global"
import UnitPrice from "@modules/products/components/unit-price"

type UnitPricing = {
  unit_type: string
  unit_amount: number
  base_unit_amount: number
}

export default async function PreviewPrice({
  price,
  unitPricing,
}: {
  price: VariantPrice
  unitPricing?: UnitPricing | null
}) {
  if (!price) {
    return null
  }

  const isSale = price.price_type === "sale"

  return (
    <div className="flex flex-col">
      {/* Price row */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Current/sale price */}
        <Text
          className={clx("text-base font-bold", {
            "text-red-600": isSale,
            "text-gray-900": !isSale,
          })}
          data-testid="price"
        >
          {price.calculated_price}
        </Text>

        {/* Original price (crossed out) */}
        {isSale && (
          <Text
            className="text-sm line-through text-gray-400"
            data-testid="original-price"
          >
            {price.original_price}
          </Text>
        )}
      </div>

      {/* Unit price */}
      {unitPricing && price.currency_code && (
        <UnitPrice
          price={price.calculated_price_number}
          currencyCode={price.currency_code}
          unitPricing={unitPricing}
          className="text-xs"
        />
      )}
    </div>
  )
}
