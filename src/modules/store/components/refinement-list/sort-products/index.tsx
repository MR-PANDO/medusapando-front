"use client"

export type SortOptions = "price_asc" | "price_desc" | "created_at" | "sales_count"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const sortOptions = [
  {
    value: "sales_count",
    label: "Más Vendidos",
  },
  {
    value: "created_at",
    label: "Más Recientes",
  },
  {
    value: "price_asc",
    label: "Precio: Menor a Mayor",
  },
  {
    value: "price_desc",
    label: "Precio: Mayor a Menor",
  },
]

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
  }

  return (
    <div className="flex flex-col gap-2">
      {sortOptions.map((option) => (
        <label
          key={option.value}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <input
            type="radio"
            name="sortBy"
            checked={sortBy === option.value}
            onChange={() => handleChange(option.value as SortOptions)}
            className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
            data-testid={dataTestId}
          />
          <span className={`text-sm text-gray-700 group-hover:text-emerald-600 transition-colors ${
            sortBy === option.value ? "font-medium text-emerald-600" : ""
          }`}>
            {option.label}
          </span>
        </label>
      ))}
    </div>
  )
}

export default SortProducts
