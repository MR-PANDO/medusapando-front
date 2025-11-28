import LocalizedClientLink from "@modules/common/components/localized-client-link"
import brushPattern from "@assets/brush-pattern.png"
import Image from "next/image"

// Import SVG icons
import VeganoSvg from "@assets/vegano.svg"
import VegetarianoSvg from "@assets/vegetariano.svg"
import SinLactosaSvg from "@assets/sin_lactosa.svg"
import OrganicoSvg from "@assets/organico.svg"
import SinAzucarSvg from "@assets/sin_azucar.svg"
import PaleoSvg from "@assets/paleo.svg"
import SinGlutenSvg from "@assets/sin_gluten.svg"
import KetoSvg from "@assets/keto.svg"

// Diet filter data with icons and hex colors for brush
const DIET_FILTERS = [
  { id: "vegano", name: "Vegano", tag: "vegano", icon: VeganoSvg, brushColor: "#4ade80" },
  { id: "vegetariano", name: "Vegetariano", tag: "vegetariano", icon: VegetarianoSvg, brushColor: "#bef264" },
  { id: "sin-lactosa", name: "Sin Lactosa", tag: "sin-lactosa", icon: SinLactosaSvg, brushColor: "#fbcfe8" },
  { id: "organico", name: "Orgánico", tag: "organico", icon: OrganicoSvg, brushColor: "#22c55e" },
  { id: "sin-azucar", name: "Sin Azúcar", tag: "sin-azucar", icon: SinAzucarSvg, brushColor: "#fef08a" },
  { id: "paleo", name: "Paleo", tag: "paleo", icon: PaleoSvg, brushColor: "#fcd34d" },
  { id: "sin-gluten", name: "Sin Gluten", tag: "sin-gluten", icon: SinGlutenSvg, brushColor: "#f9a8d4" },
  { id: "keto", name: "Keto", tag: "keto", icon: KetoSvg, brushColor: "#bfdbfe" },
]

type DietFiltersProps = {
  className?: string
}

export default function DietFilters({ className = "" }: DietFiltersProps) {
  return (
    <div className={`content-container py-8 mb-8 ${className}`}>
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Encuentra tu Estilo de Vida
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          Filtra nuestros productos según tus preferencias alimenticias y descubre opciones perfectas para ti
        </p>
      </div>

      {/* Two rows of 4 items each */}
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 px-4">
          {DIET_FILTERS.map((diet) => {
            return (
              <LocalizedClientLink
                key={diet.id}
                href={`/store?tags=${diet.tag}`}
                className="flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-linear group
                           p-1 sm:p-2"
              >
                {/* Brush stroke background with icon */}
                <div className="relative w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] md:w-[100px] md:h-[100px] lg:w-[110px] lg:h-[110px]
                                flex items-center justify-center
                                transition-all duration-300 group-hover:scale-110">
                  {/* Brush stroke background using CSS mask-image */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor: diet.brushColor,
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

                  {/* Icon - uses brightness/invert filter for hover to make it white */}
                  <div className="relative z-10 w-[38px] h-[38px] sm:w-[45px] sm:h-[45px] md:w-[52px] md:h-[52px] lg:w-[58px] lg:h-[58px]
                                  transition-all duration-300">
                    <Image
                      src={diet.icon}
                      alt={diet.name}
                      width={58}
                      height={58}
                      className="w-full h-full object-contain
                                 transition-all duration-300
                                 group-hover:brightness-0 group-hover:invert"
                    />
                  </div>
                </div>

                {/* Label - black by default, emerald on hover */}
                <span className="mt-1 sm:mt-2 text-gray-800 font-bold text-[10px] sm:text-xs md:text-sm lg:text-base capitalize text-center whitespace-nowrap
                                 group-hover:text-emerald-600 transition-colors duration-300">
                  {diet.name}
                </span>
              </LocalizedClientLink>
            )
          })}
        </div>
      </div>
    </div>
  )
}
