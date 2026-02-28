// Diet data and types for the diets section
// Sources: NIDDK, NIH, Academia de Nutrición y Dietética, FACE, SciELO, MedlinePlus

import VeganoSvg from "@assets/vegano.svg"
import VegetarianoSvg from "@assets/vegetariano.svg"
import SinLactosaSvg from "@assets/sin_lactosa.svg"
import OrganicoSvg from "@assets/organico.svg"
import SinAzucarSvg from "@assets/sin_azucar.svg"
import PaleoSvg from "@assets/paleo.svg"
import SinGlutenSvg from "@assets/sin_gluten.svg"
import KetoSvg from "@assets/keto.svg"

export interface DietInfo {
  id: string
  name: string
  slug: string
  tag: string
  icon: any
  brushColor: string
  shortDescription: string
  fullDescription: string
  benefits: string[]
  considerations: string[]
  tips: string[]
  allowedFoods: string[]
  avoidFoods: string[]
}

export interface DietStaticData {
  id: string
  slug: string
  tag: string
  icon: any
  brushColor: string
}

// Static data that doesn't need translation
export const DIETS_STATIC: DietStaticData[] = [
  { id: "vegano", slug: "vegano", tag: "vegano", icon: VeganoSvg, brushColor: "#4ade80" },
  { id: "vegetariano", slug: "vegetariano", tag: "vegetariano", icon: VegetarianoSvg, brushColor: "#bef264" },
  { id: "sin-lactosa", slug: "sin-lactosa", tag: "sin-lactosa", icon: SinLactosaSvg, brushColor: "#fbcfe8" },
  { id: "organico", slug: "organico", tag: "organico", icon: OrganicoSvg, brushColor: "#22c55e" },
  { id: "sin-azucar", slug: "sin-azucar", tag: "sin-azucar", icon: SinAzucarSvg, brushColor: "#fef08a" },
  { id: "paleo", slug: "paleo", tag: "paleo", icon: PaleoSvg, brushColor: "#fcd34d" },
  { id: "sin-gluten", slug: "sin-gluten", tag: "sin-gluten", icon: SinGlutenSvg, brushColor: "#f9a8d4" },
  { id: "keto", slug: "keto", tag: "keto", icon: KetoSvg, brushColor: "#bfdbfe" },
]

// Array counts per diet for indexed key lookups
const DIET_ARRAY_COUNTS: Record<string, { benefits: number; considerations: number; tips: number; allowedFoods: number; avoidFoods: number }> = {
  "vegano": { benefits: 5, considerations: 5, tips: 4, allowedFoods: 6, avoidFoods: 6 },
  "vegetariano": { benefits: 5, considerations: 4, tips: 4, allowedFoods: 6, avoidFoods: 5 },
  "sin-lactosa": { benefits: 5, considerations: 4, tips: 4, allowedFoods: 6, avoidFoods: 5 },
  "organico": { benefits: 5, considerations: 4, tips: 4, allowedFoods: 5, avoidFoods: 5 },
  "sin-azucar": { benefits: 5, considerations: 4, tips: 4, allowedFoods: 6, avoidFoods: 6 },
  "paleo": { benefits: 5, considerations: 5, tips: 4, allowedFoods: 6, avoidFoods: 6 },
  "sin-gluten": { benefits: 5, considerations: 5, tips: 4, allowedFoods: 6, avoidFoods: 6 },
  "keto": { benefits: 5, considerations: 5, tips: 4, allowedFoods: 7, avoidFoods: 6 },
}

// Helper to build an array of translated strings from indexed keys
function buildArray(t: (key: string) => string, prefix: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => t(`${prefix}_${i}`))
}

// Build a fully translated DietInfo from static data + translation function
function buildTranslatedDiet(staticData: DietStaticData, t: (key: string) => string): DietInfo {
  const id = staticData.id
  const counts = DIET_ARRAY_COUNTS[id]

  return {
    ...staticData,
    name: t(`${id}.name`),
    shortDescription: t(`${id}.shortDescription`),
    fullDescription: t(`${id}.fullDescription`),
    benefits: buildArray(t, `${id}.benefits`, counts.benefits),
    considerations: buildArray(t, `${id}.considerations`, counts.considerations),
    tips: buildArray(t, `${id}.tips`, counts.tips),
    allowedFoods: buildArray(t, `${id}.allowedFoods`, counts.allowedFoods),
    avoidFoods: buildArray(t, `${id}.avoidFoods`, counts.avoidFoods),
  }
}

/**
 * Get all diets with translated content.
 * @param t - Translation function from useTranslations("dietContent") or getTranslations("dietContent")
 */
export function getTranslatedDiets(t: (key: string) => string): DietInfo[] {
  return DIETS_STATIC.map(staticData => buildTranslatedDiet(staticData, t))
}

/**
 * Get a single diet by slug with translated content.
 * @param t - Translation function from useTranslations("dietContent") or getTranslations("dietContent")
 * @param slug - The diet slug
 */
export function getTranslatedDietBySlug(t: (key: string) => string, slug: string): DietInfo | undefined {
  const staticData = DIETS_STATIC.find(d => d.slug === slug)
  if (!staticData) return undefined
  return buildTranslatedDiet(staticData, t)
}

export function getAllDietSlugs(): string[] {
  return DIETS_STATIC.map(diet => diet.slug)
}
