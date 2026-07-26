import type { ExperienceContext, ExperienceIntent, HeroProjection } from "./types";

/** Hero Engine — EP-01 + EP-02 Nutrition Journey */
export function buildHeroProjection(
  primaryIntent: ExperienceIntent,
  ctx: ExperienceContext,
): HeroProjection {
  if (primaryIntent === "recover.postWorkout") {
    return {
      mode: "WORKOUT_DONE",
      headline: "Treino concluído",
      subheadline: null,
      observation: null,
      primaryAction: {
        type: "registerMeal",
        label: "Registrar refeição",
      },
    };
  }

  if (primaryIntent === "close.protein") {
    if (ctx.proteinGap > 0) {
      return {
        mode: "NUTRITION_PROGRESS",
        headline: `${ctx.proteinGap}g restantes`,
        subheadline: `${ctx.proteinCurrent}/${ctx.proteinTarget}g`,
        observation: null,
        primaryAction: {
          type: "registerMeal",
          label: "Registrar refeição",
        },
      };
    }

    return {
      mode: "NUTRITION_PROGRESS",
      headline: "Proteína em dia",
      subheadline: null,
      observation: null,
      primaryAction: null,
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
