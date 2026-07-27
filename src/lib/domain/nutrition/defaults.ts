import type { NutritionGoals, NutritionStore } from "./types";

export const DEFAULT_GOALS: NutritionGoals = {
  proteinTarget: 160,
  caloriesTarget: 2400,
  carbsTarget: 227,
  fatTarget: 65,
};

export function createInitialNutritionStore(): NutritionStore {
  return {
    goals: { ...DEFAULT_GOALS },
    meals: [],
  };
}
