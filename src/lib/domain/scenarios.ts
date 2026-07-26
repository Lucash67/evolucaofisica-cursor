import type { DayState, DemoScenario } from "./types";

const baseState = (): DayState => ({
  user: {
    name: "Lucas",
    objective: "Hipertrofia",
    phase: "Bulking",
    weekNumber: 6,
    dayOfWeek: "Quarta",
  },
  todayWorkout: {
    name: "Pernas",
    durationMin: 45,
    exerciseCount: 6,
    status: "planned",
  },
  tomorrowWorkout: { name: "Costas", durationMin: 40 },
  nutrition: {
    proteinTarget: 160,
    proteinCurrent: 95,
    caloriesTarget: 2400,
    caloriesCurrent: 1420,
  },
  yesterday: {
    workoutDone: true,
    proteinGrams: 145,
    sleepHours: "7h",
  },
  sleepLastNight: { hours: 5.5, quality: "ruim" },
  sleepLoggedToday: false,
  waterCups: 2,
  waterTarget: 8,
  workoutsThisWeek: 2,
  workoutsTarget: 4,
  isFirstDay: false,
  timeOfDay: "morning",
  registeredMeals: ["cafe"],
  postWorkoutMealRegistered: false,
});

export function createScenarioState(scenario: DemoScenario): DayState {
  const state = baseState();

  switch (scenario) {
    case "completed":
      return {
        ...state,
        todayWorkout: { ...state.todayWorkout, status: "completed" },
        workoutsThisWeek: 3,
        nutrition: {
          ...state.nutrition,
          proteinCurrent: 120,
          caloriesCurrent: 1680,
        },
        sleepLoggedToday: true,
        waterCups: 5,
        registeredMeals: ["cafe", "almoco"],
        postWorkoutMealRegistered: true,
      };
    case "rest":
      return {
        ...state,
        todayWorkout: {
          name: "Recuperação",
          durationMin: 0,
          exerciseCount: 0,
          status: "rest",
        },
        user: { ...state.user, dayOfWeek: "Terça" },
      };
    case "night":
      return {
        ...state,
        timeOfDay: "evening",
        todayWorkout: { ...state.todayWorkout, status: "pending" },
        nutrition: {
          ...state.nutrition,
          proteinCurrent: 110,
          caloriesCurrent: 1850,
        },
        registeredMeals: ["cafe", "almoco"],
      };
    case "first-day":
      return {
        ...state,
        isFirstDay: true,
        workoutsThisWeek: 0,
        nutrition: {
          proteinTarget: 160,
          proteinCurrent: 0,
          caloriesTarget: 2400,
          caloriesCurrent: 0,
        },
        yesterday: {
          workoutDone: false,
          proteinGrams: 0,
          sleepHours: "—",
        },
        sleepLastNight: { hours: 7, quality: "ok" },
        sleepLoggedToday: false,
        waterCups: 0,
        registeredMeals: [],
        todayWorkout: {
          name: "Peito",
          durationMin: 45,
          exerciseCount: 5,
          status: "planned",
        },
      };
    default:
      return state;
  }
}
