import { buildMacroProgress } from "./macro-progress";
import type { DayNutritionTotals, NutritionGoals } from "./types";

export type NutritionDayState =
  | "empty"
  | "first_meal"
  | "in_progress"
  | "incomplete"
  | "protein_complete"
  | "calories_over"
  | "perfect_day";

export function getNutritionDayState(
  totals: DayNutritionTotals,
  goals: NutritionGoals,
  mealCount: number,
): NutritionDayState {
  const protein = buildMacroProgress(totals.proteinCurrent, goals.proteinTarget, "protein");
  const calories = buildMacroProgress(totals.caloriesCurrent, goals.caloriesTarget, "calories");
  const carbs = buildMacroProgress(totals.carbsCurrent, goals.carbsTarget, "carbs");
  const fat = buildMacroProgress(totals.fatCurrent, goals.fatTarget, "fat");

  if (mealCount === 0) return "empty";
  if (mealCount === 1) return "first_meal";

  const allMet =
    !protein.isOver &&
    protein.gap === 0 &&
    !calories.isOver &&
    calories.gap === 0 &&
    !carbs.isOver &&
    carbs.gap === 0 &&
    !fat.isOver &&
    fat.gap === 0;

  if (allMet && mealCount >= 2) return "perfect_day";
  if (protein.gap === 0 && !protein.isOver) return "protein_complete";
  if (calories.isOver) return "calories_over";
  if (protein.pct < 50 && mealCount > 0) return "incomplete";
  return "in_progress";
}

export function getNutritionDayStateCopy(state: NutritionDayState): string {
  switch (state) {
    case "empty":
      return "Registre quando quiser — sem pressão.";
    case "first_meal":
      return "Bom começo. Continue ao longo do dia.";
    case "in_progress":
      return "Você está construindo seu dia.";
    case "incomplete":
      return "Ainda há espaço para evoluir hoje.";
    case "protein_complete":
      return "Proteína concluída. Agora é só manter.";
    case "calories_over":
      return "Calorias acima da meta — amanhã é um novo dia.";
    case "perfect_day":
      return "Dia perfeito. Metas nutricionais fechadas.";
  }
}
