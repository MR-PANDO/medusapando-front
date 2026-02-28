import LocalizedClientLink from "@modules/common/components/localized-client-link"
import brushPattern from "@assets/brush-pattern.png"
import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { DIETS_STATIC } from "@lib/data/diets"

type DietFiltersProps = {
  className?: string
}

export default async function DietFilters({ className = "" }: DietFiltersProps) {
  const t = await getTranslations("dietFilters")
  const tDiet = await getTranslations("dietContent")
  return (
    <div className={`content-container py-8 mb-8 ${className}`}>
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {t("title")}
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          {t("description")}
        </p>
      </div>

      {/* Two rows of 4 items each */}
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 px-4">
          {DIETS_STATIC.map((diet) => {
            const name = tDiet(`${diet.id}.name`)
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
                      alt={name}
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
                  {name}
                </span>
              </LocalizedClientLink>
            )
          })}
        </div>
      </div>
    </div>
  )
}
