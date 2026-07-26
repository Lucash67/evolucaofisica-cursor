export type WorkoutStatus = "planned" | "completed" | "rest" | "pending" | "rescheduled";

export type SleepQuality = "ruim" | "ok" | "boa";

export type MealType = "cafe" | "almoco" | "jantar" | "lanche";

export type MealSize = "pequeno" | "medio" | "grande";

export type DemoScenario = "default" | "completed" | "rest" | "night" | "first-day";

export interface UserProfile {
  name: string;
  objective: string;
  phase: string;
  weekNumber: number;
  dayOfWeek: string;
}

export interface WorkoutPlan {
  name: string;
  durationMin: number;
  exerciseCount: number;
  status: WorkoutStatus;
}

export interface NutritionTargets {
  proteinTarget: number;
  proteinCurrent: number;
  caloriesTarget: number;
  caloriesCurrent: number;
}

export interface YesterdaySummary {
  workoutDone: boolean;
  proteinGrams: number;
  sleepHours: string;
}

export interface SleepLog {
  hours: number;
  quality: SleepQuality;
}

export interface TomorrowWorkout {
  name: string;
  durationMin: number;
}

export interface DayState {
  user: UserProfile;
  todayWorkout: WorkoutPlan;
  tomorrowWorkout: TomorrowWorkout;
  nutrition: NutritionTargets;
  yesterday: YesterdaySummary;
  sleepLastNight: SleepLog;
  sleepLoggedToday: boolean;
  waterCups: number;
  waterTarget: number;
  workoutsThisWeek: number;
  workoutsTarget: number;
  isFirstDay: boolean;
  timeOfDay: "morning" | "afternoon" | "evening";
  registeredMeals: MealType[];
  postWorkoutMealRegistered: boolean;
}
