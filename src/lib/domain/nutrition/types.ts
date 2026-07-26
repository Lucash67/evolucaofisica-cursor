import type { MealSize, MealType } from "@/lib/domain/types";

export interface NutritionGoals {
  proteinTarget: number;
  caloriesTarget: number;
}

export interface LoggedMeal {
  id: string;
  dayKey: string;
  type: MealType;
  size: MealSize;
  protein: number;
  calories: number;
  loggedAt: number;
}

export interface NutritionStore {
  goals: NutritionGoals;
  meals: LoggedMeal[];
}

export interface DayNutritionTotals {
  proteinCurrent: number;
  caloriesCurrent: number;
  registeredMeals: MealType[];
}
