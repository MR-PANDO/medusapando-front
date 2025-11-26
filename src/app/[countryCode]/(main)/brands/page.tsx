import { Metadata } from "next"
import { listBrands } from "@lib/data/brands"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Heading } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "Marcas | Vita Integral",
  description: "Explora todas nuestras marcas de productos saludables",
}

export default async function BrandsPage() {
  const { brands } = await listBrands({ limit: 500 })

  // Sort brands alphabetically
  const sortedBrands = [...brands].sort((a, b) =>
    a.name.localeCompare(b.name, "es")
  )

  // Group brands by first letter
  const brandsByLetter = sortedBrands.reduce(
    (acc, brand) => {
      const letter = brand.name[0].toUpperCase()
      if (!acc[letter]) {
        acc[letter] = []
      }
      acc[letter].push(brand)
      return acc
    },
    {} as Record<string, typeof brands>
  )

  return (
    <div className="flex flex-col py-6 content-container">
      <Heading level="h1" className="text-2xl mb-8">
        Todas las Marcas
      </Heading>

      <div className="grid gap-8">
        {Object.entries(brandsByLetter)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([letter, letterBrands]) => (
            <div key={letter}>
              <h2 className="text-xl font-bold text-ui-fg-base mb-4 border-b pb-2">
                {letter}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {letterBrands.map((brand) => (
                  <LocalizedClientLink
                    key={brand.id}
                    href={`/brands/${brand.id}`}
                    className="text-ui-fg-subtle hover:text-ui-fg-base transition-colors"
                  >
                    {brand.name}
                  </LocalizedClientLink>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
