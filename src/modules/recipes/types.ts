export interface RecipeProduct {
  id: string
  variantId: string
  title: string
  handle: string
  thumbnail?: string
  quantity: string
  price?: number
}

export interface NutritionInfo {
  calories: number      // kcal por porción
  carbs: number         // gramos de carbohidratos por porción
  protein: number       // gramos de proteína por porción
  fat: number           // gramos de grasa por porción
  fiber?: number        // gramos de fibra por porción
}

export interface Recipe {
  id: string
  title: string
  description: string
  diet: string
  dietName: string
  prepTime: string
  cookTime: string
  servings: number
  difficulty: "Fácil" | "Medio" | "Difícil"
  ingredients: string[]
  instructions: string[]
  products: RecipeProduct[]
  nutrition: NutritionInfo
  tips?: string
  generatedAt: string
}

export interface RecipesData {
  generatedAt: string
  recipes: Recipe[]
}

export interface DietOption {
  id: string
  name: string
  tag: string
  color: string
}

export const DIET_OPTIONS: DietOption[] = [
  { id: "vegano", name: "Vegano", tag: "vegano", color: "#4ade80" },
  { id: "vegetariano", name: "Vegetariano", tag: "vegetariano", color: "#bef264" },
  { id: "sin-lactosa", name: "Sin Lactosa", tag: "sin-lactosa", color: "#fbcfe8" },
  { id: "organico", name: "Orgánico", tag: "organico", color: "#22c55e" },
  { id: "sin-azucar", name: "Sin Azúcar", tag: "sin-azucar", color: "#fef08a" },
  { id: "paleo", name: "Paleo", tag: "paleo", color: "#fcd34d" },
  { id: "sin-gluten", name: "Sin Gluten", tag: "sin-gluten", color: "#f9a8d4" },
  { id: "keto", name: "Keto", tag: "keto", color: "#bfdbfe" },
]
