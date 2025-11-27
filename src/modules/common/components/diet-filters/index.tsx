import LocalizedClientLink from "@modules/common/components/localized-client-link"
import brushPattern from "@assets/brush-pattern.png"

// SVG Icons for each diet type
const VeganoIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M32 8c-4 8-4 16 0 24s4 16 0 24" strokeLinecap="round" />
    <path d="M20 20c8 4 16 4 24 0" strokeLinecap="round" />
    <path d="M20 44c8-4 16-4 24 0" strokeLinecap="round" />
    <circle cx="32" cy="32" r="4" fill="currentColor" />
  </svg>
)

const VegetarianoIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M32 56V36" strokeLinecap="round" />
    <path d="M32 36c-12 0-20-12-16-24 8 4 16 8 16 24z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M32 36c12 0 20-12 16-24-8 4-16 8-16 24z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const SinLactosaIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M24 12h16l4 16v24a4 4 0 01-4 4H24a4 4 0 01-4-4V28l4-16z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M24 12c0-4 3.5-4 8-4s8 0 8 4" strokeLinecap="round" />
    <path d="M20 28h24" strokeLinecap="round" />
    <path d="M12 56L52 8" strokeLinecap="round" strokeWidth="3" />
  </svg>
)

const OrganicoIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="32" cy="32" r="20" strokeLinecap="round" />
    <path d="M32 20v24" strokeLinecap="round" />
    <path d="M32 28c-6 0-10 4-10 8" strokeLinecap="round" />
    <path d="M32 28c6 0 10 4 10 8" strokeLinecap="round" />
    <path d="M32 20c0-6 4-10 10-8-2 6-6 8-10 8z" strokeLinecap="round" fill="currentColor" fillOpacity="0.2" />
  </svg>
)

const SinAzucarIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="20" y="20" width="24" height="32" rx="4" strokeLinecap="round" />
    <path d="M28 20v-4c0-2 1.8-4 4-4s4 2 4 4v4" strokeLinecap="round" />
    <path d="M28 32h8" strokeLinecap="round" />
    <path d="M28 40h8" strokeLinecap="round" />
    <path d="M12 56L52 8" strokeLinecap="round" strokeWidth="3" />
  </svg>
)

const PaleoIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="32" cy="36" rx="20" ry="16" strokeLinecap="round" />
    <path d="M24 32c0 8 8 12 8 16" strokeLinecap="round" />
    <path d="M40 32c0 8-8 12-8 16" strokeLinecap="round" />
    <circle cx="26" cy="30" r="2" fill="currentColor" />
    <circle cx="38" cy="30" r="2" fill="currentColor" />
    <path d="M28 40h8" strokeLinecap="round" />
  </svg>
)

const SinGlutenIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M32 52V28" strokeLinecap="round" />
    <path d="M32 28c-4-2-6-6-6-10 4 0 6 4 6 10z" strokeLinecap="round" fill="currentColor" fillOpacity="0.2" />
    <path d="M32 28c4-2 6-6 6-10-4 0-6 4-6 10z" strokeLinecap="round" fill="currentColor" fillOpacity="0.2" />
    <path d="M32 22c-3-2-4-5-4-8 3 0 4 3 4 8z" strokeLinecap="round" fill="currentColor" fillOpacity="0.2" />
    <path d="M32 22c3-2 4-5 4-8-3 0-4 3-4 8z" strokeLinecap="round" fill="currentColor" fillOpacity="0.2" />
    <path d="M12 56L52 8" strokeLinecap="round" strokeWidth="3" />
  </svg>
)

const KetoIcon = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="32" cy="38" rx="18" ry="14" strokeLinecap="round" />
    <path d="M20 36c4 4 10 6 16 4s10-6 12-10" strokeLinecap="round" />
    <path d="M26 32c0-2 2-4 4-4" strokeLinecap="round" />
    <path d="M38 30c0-2-2-4-4-4" strokeLinecap="round" />
    <path d="M32 18v-6M28 14l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// Diet filter data with icons and hex colors for brush
const DIET_FILTERS = [
  { id: "vegano", name: "Vegano", tag: "vegano", icon: VeganoIcon, brushColor: "#4ade80" },
  { id: "vegetariano", name: "Vegetariano", tag: "vegetariano", icon: VegetarianoIcon, brushColor: "#bef264" },
  { id: "sin-lactosa", name: "Sin Lactosa", tag: "sin-lactosa", icon: SinLactosaIcon, brushColor: "#fbcfe8" },
  { id: "organico", name: "Orgánico", tag: "organico", icon: OrganicoIcon, brushColor: "#22c55e" },
  { id: "sin-azucar", name: "Sin Azúcar", tag: "sin-azucar", icon: SinAzucarIcon, brushColor: "#fef08a" },
  { id: "paleo", name: "Paleo", tag: "paleo", icon: PaleoIcon, brushColor: "#fcd34d" },
  { id: "sin-gluten", name: "Sin Gluten", tag: "sin-gluten", icon: SinGlutenIcon, brushColor: "#f9a8d4" },
  { id: "keto", name: "Keto", tag: "keto", icon: KetoIcon, brushColor: "#bfdbfe" },
]

type DietFiltersProps = {
  className?: string
}

export default function DietFilters({ className = "" }: DietFiltersProps) {
  return (
    <div className={`content-container py-8 mb-8 ${className}`}>
      {/* Two rows of 4 items each */}
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 px-4">
          {DIET_FILTERS.map((diet) => {
            const IconComponent = diet.icon
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

                  {/* Icon - black by default, white on hover */}
                  <div className="relative z-10 w-[38px] h-[38px] sm:w-[45px] sm:h-[45px] md:w-[52px] md:h-[52px] lg:w-[58px] lg:h-[58px]
                                  text-gray-800 group-hover:text-white transition-colors duration-300">
                    <IconComponent />
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
