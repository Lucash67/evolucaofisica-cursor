import { getHeroNutritionCopy } from "@/lib/domain/nutrition/progress-copy";

import type { ExperienceContext, ExperienceIntent, HeroProjection } from "./types";

function nutritionHeroCopy(ctx: ExperienceContext, postWorkout: boolean) {
  return getHeroNutritionCopy({
    proteinGap: ctx.proteinGap,
    proteinCurrent: ctx.proteinCurrent,
    proteinTarget: ctx.proteinTarget,
    timeOfDay: ctx.timeOfDay,
    postWorkout,
    postWorkoutMealRegistered: ctx.postWorkoutMealRegistered,
  });
}

/** Hero Engine — EP-01 + Sprint 02.2.1 Nutrition Calibration */
export function buildHeroProjection(
  primaryIntent: ExperienceIntent,
  ctx: ExperienceContext,
): HeroProjection {
  if (primaryIntent === "recover.postWorkout") {
    const copy = nutritionHeroCopy(ctx, true);
    return {
      mode: "WORKOUT_DONE",
      headline: copy.headline,
      subheadline: copy.subheadline,
      observation: null,
      primaryAction: {
        type: "registerMeal",
        label: "Registrar refeição",
      },
    };
  }

  if (primaryIntent === "close.protein") {
    const copy = nutritionHeroCopy(ctx, false);
    return {
      mode: "NUTRITION_PROGRESS",
      headline: copy.headline,
      subheadline: copy.subheadline,
      observation: null,
      primaryAction:
        ctx.proteinGap > 0
          ? {
              type: "registerMeal",
              label: "Registrar refeição",
            }
          : null,
    };
  }

  return {
    mode: "WORKOUT_EXECUTE",
    headline: ctx.workoutName,
    subheadline: `${ctx.workoutDurationMin} min · ${ctx.workoutsThisWeek}/${ctx.workoutsTarget} esta semana`,
    observation: null,
    primaryAction: {
      type: "startWorkout",
      label: "Iniciar treino",
    },
  };
}
