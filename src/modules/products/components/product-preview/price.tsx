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

  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center gap-x-2">
        {price.price_type === "sale" && (
          <Text
            className="line-through text-ui-fg-muted"
            data-testid="original-price"
          >
            {price.original_price}
          </Text>
        )}
        <Text
          className={clx("text-ui-fg-muted", {
            "text-ui-fg-interactive": price.price_type === "sale",
          })}
          data-testid="price"
        >
          {price.calculated_price}
        </Text>
      </div>
      {unitPricing && price.currency_code && (
        <UnitPrice
          price={price.calculated_price_number}
          currencyCode={price.currency_code}
          unitPricing={unitPricing}
        />
      )}
    </div>
  )
}
