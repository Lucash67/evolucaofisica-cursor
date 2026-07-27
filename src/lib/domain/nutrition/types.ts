import type { MealSize, MealType } from "@/lib/domain/types";

export interface NutritionGoals {
  proteinTarget: number;
  caloriesTarget: number;
  carbsTarget: number;
  fatTarget: number;
}

export interface MealRegistrationInput {
  type: MealType;
  protein: number;
  calories: number;
  carbs: number;
  fat: number;
  loggedAt: number;
  dayKey: string;
}

export interface LoggedMeal {
  id: string;
  dayKey: string;
  type: MealType;
  size?: MealSize;
  protein: number;
  calories: number;
  carbs: number;
  fat: number;
  loggedAt: number;
}

export interface NutritionStore {
  goals: NutritionGoals;
  meals: LoggedMeal[];
}

export interface DayNutritionTotals {
  proteinCurrent: number;
  caloriesCurrent: number;
  carbsCurrent: number;
  fatCurrent: number;
  registeredMeals: MealType[];
}
