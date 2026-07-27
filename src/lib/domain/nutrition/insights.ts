import { buildMacroProgress } from "./macro-progress";
import { getProgressBandCopy } from "./progress-copy";
import type { DayNutritionTotals, NutritionGoals } from "./types";

export interface InsightInput {
  today: DayNutritionTotals;
  goals: NutritionGoals;
  yesterday: DayNutritionTotals | null;
  mealCount: number;
}

export function getNutritionInsights(input: InsightInput): string[] {
  const { today, goals, yesterday, mealCount } = input;
  const insights: string[] = [];

  const protein = buildMacroProgress(today.proteinCurrent, goals.proteinTarget, "protein");
  const calories = buildMacroProgress(today.caloriesCurrent, goals.caloriesTarget, "calories");

  if (yesterday && today.proteinCurrent > yesterday.proteinCurrent && mealCount > 0) {
    insights.push("Hoje você está melhor que ontem.");
  }

  if (protein.gap > 0 && protein.gap <= 20) {
    insights.push(`Faltam apenas ${protein.gap}g de proteína.`);
  }

  if (mealCount >= 3) {
    insights.push(`Você já registrou ${mealCount} refeições.`);
  }

  if (protein.pct >= 50 && protein.pct < 100) {
    insights.push(`Você atingiu ${protein.pct}% da meta de proteína.`);
  }

  if (calories.gap > 0 && calories.gap <= 350 && calories.pct >= 70) {
    insights.push(`Restam apenas ${calories.gap} kcal.`);
  }

  if (insights.length === 0 && mealCount === 0) {
    insights.push(getProgressBandCopy(0));
  } else if (insights.length === 0) {
    insights.push(getProgressBandCopy(protein.pct));
  }

  return insights.slice(0, 2);
}
