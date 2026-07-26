import type { WorkoutStatus } from "@/lib/domain/types";

/** Estados conceituais mínimos do EP-01 */
export type ConceptualDayState = "PREPARATION" | "RECOVERY";

export type ExperienceIntent =
  | "execute.workout"
  | "recover.postWorkout"
  | "close.protein";

export type ExperienceEventType = "workout.completed" | "meal.registered";

export interface ExperienceEvent {
  type: ExperienceEventType;
  at: number;
}

export interface ExperienceContext {
  workoutStatus: WorkoutStatus;
  proteinGap: number;
  proteinCurrent: number;
  proteinTarget: number;
  dayState: ConceptualDayState;
  workoutName: string;
  workoutDurationMin: number;
  workoutsThisWeek: number;
  workoutsTarget: number;
  postWorkoutMealRegistered: boolean;
}

export type HeroMode = "WORKOUT_EXECUTE" | "WORKOUT_DONE" | "NUTRITION_PROGRESS";

export type HeroActionType = "startWorkout" | "registerMeal";

export interface HeroAction {
  type: HeroActionType;
  label: string;
}

export interface HeroProjection {
  mode: HeroMode;
  headline: string;
  subheadline: string | null;
  observation: string | null;
  primaryAction: HeroAction | null;
}

export type SurfaceBlockId = "nutrition" | "habits" | "workoutCollapsed";

export type SurfaceBlockEmphasis = "default" | "featured";

export interface SurfaceBlock {
  id: SurfaceBlockId;
  visibility: "visible" | "collapsed";
  emphasis: SurfaceBlockEmphasis;
  order: number;
}

export interface SurfaceProjection {
  blocks: SurfaceBlock[];
}

export interface RenderPlan {
  primaryIntent: ExperienceIntent;
  hero: HeroProjection;
  surface: SurfaceProjection;
}
