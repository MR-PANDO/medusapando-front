import brushPattern from "@assets/brush-pattern.png"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

// Import SVG icons
import VeganoSvg from "@assets/vegano.svg"
import VegetarianoSvg from "@assets/vegetariano.svg"
import SinLactosaSvg from "@assets/sin_lactosa.svg"
import OrganicoSvg from "@assets/organico.svg"
import SinAzucarSvg from "@assets/sin_azucar.svg"
import PaleoSvg from "@assets/paleo.svg"
import SinGlutenSvg from "@assets/sin_gluten.svg"
import KetoSvg from "@assets/keto.svg"

// Diet badge data - maps tag values to icons and colors
const DIET_BADGES: Record<string, { name: string; slug: string; icon: any; brushColor: string }> = {
  "VEGANO": { name: "Vegano", slug: "vegano", icon: VeganoSvg, brushColor: "#4ade80" },
  "VEGETARIANO": { name: "Vegetariano", slug: "vegetariano", icon: VegetarianoSvg, brushColor: "#bef264" },
  "SIN LACTOSA": { name: "Sin Lactosa", slug: "sin-lactosa", icon: SinLactosaSvg, brushColor: "#fbcfe8" },
  "ORGANICO": { name: "Orgánico", slug: "organico", icon: OrganicoSvg, brushColor: "#22c55e" },
  "SIN AZUCAR AÑADIDA": { name: "Sin Azúcar", slug: "sin-azucar", icon: SinAzucarSvg, brushColor: "#fef08a" },
  "PALEO": { name: "Paleo", slug: "paleo", icon: PaleoSvg, brushColor: "#fcd34d" },
  "NATURALMENTE SIN GLUTEN": { name: "Sin Gluten", slug: "sin-gluten", icon: SinGlutenSvg, brushColor: "#f9a8d4" },
  "KETO": { name: "Keto", slug: "keto", icon: KetoSvg, brushColor: "#bfdbfe" },
}

type ProductDietBadgesProps = {
  tags?: { id: string; value: string }[]
  className?: string
  compact?: boolean
}

export default function ProductDietBadges({ tags, className = "", compact = false }: ProductDietBadgesProps) {
  if (!tags || tags.length === 0) return null

  // Filter tags that have matching diet badges
  const dietTags = tags.filter(tag => DIET_BADGES[tag.value])

  if (dietTags.length === 0) return null

  // Compact mode - smaller icons, inline layout, no title
  if (compact) {
    return (
      <div className={`flex flex-wrap gap-3 ${className}`}>
        {dietTags.map((tag) => {
          const badge = DIET_BADGES[tag.value]
          return (
            <LocalizedClientLink
              key={tag.id}
              href={`/store?tags=${badge.slug}`}
              className="flex items-center gap-2 cursor-pointer transition-all duration-300 group"
              title={badge.name}
            >
              {/* Brush stroke background with icon - smaller */}
              <div className="relative w-[40px] h-[40px]
                              flex items-center justify-center
                              transition-all duration-300 group-hover:scale-110">
                {/* Brush stroke background */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: badge.brushColor,
                    WebkitMaskImage: `url(${brushPattern.src})`,
                    maskImage: `url(${brushPattern.src})`,
                    WebkitMaskPosition: 'center center',
                    maskPosition: 'center center',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                  }}
                />

                {/* Icon */}
                <div className="relative z-10 w-[22px] h-[22px] transition-all duration-300">
                  <Image
                    src={badge.icon}
                    alt={badge.name}
                    width={22}
                    height={22}
                    className="w-full h-full object-contain
                               transition-all duration-300
                               group-hover:brightness-0 group-hover:invert"
                  />
                </div>
              </div>

              {/* Label - small */}
              <span className="text-gray-600 text-xs font-medium
                               group-hover:text-emerald-600 transition-colors duration-300">
                {badge.name}
              </span>
            </LocalizedClientLink>
          )
        })}
      </div>
    )
  }

  // Full mode - with title
  return (
    <div className={`${className}`}>
      <h4 className="font-medium text-gray-800 mb-4">Estilo de Vida</h4>
      <div className="flex flex-wrap gap-4">
        {dietTags.map((tag) => {
          const badge = DIET_BADGES[tag.value]
          return (
            <LocalizedClientLink
              key={tag.id}
              href={`/store?tags=${badge.slug}`}
              className="flex flex-col items-center cursor-pointer transition-all duration-300 group"
            >
              {/* Brush stroke background with icon */}
              <div className="relative w-[60px] h-[60px] sm:w-[70px] sm:h-[70px]
                              flex items-center justify-center
                              transition-all duration-300 group-hover:scale-110">
                {/* Brush stroke background using CSS mask-image */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: badge.brushColor,
                    WebkitMaskImage: `url(${brushPattern.src})`,
                    maskImage: `url(${brushPattern.src})`,
                    WebkitMaskPosition: 'center center',
                    maskPosition: 'center center',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                  }}
                />

                {/* Icon */}
                <div className="relative z-10 w-[32px] h-[32px] sm:w-[38px] sm:h-[38px]
                                transition-all duration-300">
                  <Image
                    src={badge.icon}
                    alt={badge.name}
                    width={38}
                    height={38}
                    className="w-full h-full object-contain
                               transition-all duration-300
                               group-hover:brightness-0 group-hover:invert"
                  />
                </div>
              </div>

              {/* Label */}
              <span className="mt-1 text-gray-700 font-medium text-xs sm:text-sm text-center whitespace-nowrap
                               group-hover:text-emerald-600 transition-colors duration-300">
                {badge.name}
              </span>
            </LocalizedClientLink>
          )
        })}
      </div>
    </div>
  )
}
