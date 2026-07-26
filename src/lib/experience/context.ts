import type { DayState } from "@/lib/domain/types";

import type { ConceptualDayState, ExperienceContext } from "./types";

/** Context Engine mínimo — EP-01 */
export function buildExperienceContext(state: DayState): ExperienceContext | null {
  const { todayWorkout, nutrition, workoutsThisWeek, workoutsTarget } = state;

  if (todayWorkout.status === "rest" || state.isFirstDay) {
    return null;
  }

  const isCompleted = todayWorkout.status === "completed";
  const dayState: ConceptualDayState = isCompleted ? "RECOVERY" : "PREPARATION";

  return {
    workoutStatus: todayWorkout.status,
    proteinGap: Math.max(0, nutrition.proteinTarget - nutrition.proteinCurrent),
    proteinCurrent: nutrition.proteinCurrent,
    proteinTarget: nutrition.proteinTarget,
    dayState,
    timeOfDay: state.timeOfDay,
    workoutName: todayWorkout.name,
    workoutDurationMin: todayWorkout.durationMin,
    workoutsThisWeek,
    workoutsTarget,
    postWorkoutMealRegistered: state.postWorkoutMealRegistered,
  };
}
