import type { ExperienceContext, ExperienceIntent } from "./types";

const INTENTS: ExperienceIntent[] = [
  "execute.workout",
  "recover.postWorkout",
  "close.protein",
];

/** Priority Engine — EP-01 + Sprint 02.2.1 Nutrition Calibration */
export function scoreIntent(intent: ExperienceIntent, ctx: ExperienceContext): number {
  switch (intent) {
    case "execute.workout":
      if (ctx.workoutStatus === "planned" || ctx.workoutStatus === "pending") {
        if (ctx.timeOfDay === "evening") return 50;
        return 100;
      }
      return 0;

    case "recover.postWorkout":
      if (ctx.dayState === "RECOVERY" && !ctx.postWorkoutMealRegistered) {
        return 100;
      }
      return 0;

    case "close.protein": {
      if (ctx.proteinGap <= 0 && ctx.proteinCurrent >= ctx.proteinTarget) {
        return ctx.dayState === "RECOVERY" || ctx.timeOfDay === "evening" ? 85 : 55;
      }
      if (ctx.proteinGap <= 0) return 0;
      if (ctx.dayState === "RECOVERY" && ctx.postWorkoutMealRegistered) {
        return 100;
      }
      if (ctx.timeOfDay === "evening") return 90;
      if (ctx.timeOfDay === "afternoon") return 75;
      return 0;
    }

    default:
      return 0;
  }
}

export function rankIntents(ctx: ExperienceContext): ExperienceIntent[] {
  return [...INTENTS].sort((a, b) => scoreIntent(b, ctx) - scoreIntent(a, ctx));
}

export function getPrimaryIntent(ctx: ExperienceContext): ExperienceIntent {
  return rankIntents(ctx)[0];
}
