import type { MealSize } from "./types";

export const MEAL_SIZE_ESTIMATES: Record<
  MealSize,
  { protein: number; calories: number; carbs: number; fat: number; label: string }
> = {
  pequeno: { protein: 30, calories: 400, carbs: 40, fat: 12, label: "Pequeno" },
  medio: { protein: 40, calories: 600, carbs: 60, fat: 18, label: "Médio" },
  grande: { protein: 50, calories: 800, carbs: 80, fat: 24, label: "Grande" },
};

export const MEAL_TYPE_LABELS = {
  cafe: "Café",
  almoco: "Almoço",
  jantar: "Jantar",
  lanche: "Lanche",
} as const;
