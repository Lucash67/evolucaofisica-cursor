import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { createScenarioState } from "@/lib/domain/scenarios";
import type {
  DayState,
  DemoScenario,
  MealType,
  SleepQuality,
} from "@/lib/domain/types";

export interface MealMacros {
  protein: number;
  calories: number;
  carbs: number;
  fat: number;
}

interface DayContextValue {
  state: DayState;
  workoutJustCompleted: boolean;
  workoutClosureSeen: boolean;
  mealJustRegistered: boolean;
  registerMeal: (type: MealType, macros: MealMacros) => void;
  applyMealRegistration: (type: MealType, macros: MealMacros) => void;
  hydrateNutrition: (snapshot: {
    proteinTarget: number;
    caloriesTarget: number;
    proteinCurrent: number;
    caloriesCurrent: number;
    registeredMeals: MealType[];
  }) => void;
  completeWorkout: () => void;
  completeWorkoutAfterClosure: () => void;
  acknowledgeHeroExperience: () => void;
  acknowledgeNutritionJourney: () => void;
  rescheduleWorkout: () => void;
  logSleep: (hours: number, quality: SleepQuality) => void;
  addWaterCup: () => void;
  setScenario: (scenario: DemoScenario) => void;
  getPendingItems: () => string[];
  getNextAction: () => { label: string; detail?: string };
}

const DayContext = createContext<DayContextValue | null>(null);

function getInitialScenario(): DemoScenario {
  if (typeof window === "undefined") return "default";
  const params = new URLSearchParams(window.location.search);
  const demo = params.get("demo") as DemoScenario | null;
  const valid: DemoScenario[] = ["default", "completed", "rest", "night", "first-day"];
  return demo && valid.includes(demo) ? demo : "default";
}

export function DayProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DayState>(() => createScenarioState(getInitialScenario()));
  const [workoutJustCompleted, setWorkoutJustCompleted] = useState(false);
  const [workoutClosureSeen, setWorkoutClosureSeen] = useState(false);
  const [mealJustRegistered, setMealJustRegistered] = useState(false);

  const applyMealRegistration = useCallback((type: MealType, macros: MealMacros) => {
    setState((prev) => {
      if (prev.todayWorkout.status === "completed") {
        setMealJustRegistered(true);
      }
      return {
        ...prev,
        registeredMeals: prev.registeredMeals.includes(type)
          ? prev.registeredMeals
          : [...prev.registeredMeals, type],
        postWorkoutMealRegistered:
          prev.postWorkoutMealRegistered || prev.todayWorkout.status === "completed",
        nutrition: {
          ...prev.nutrition,
          proteinCurrent: prev.nutrition.proteinCurrent + macros.protein,
          caloriesCurrent: prev.nutrition.caloriesCurrent + macros.calories,
        },
      };
    });
  }, []);

  const registerMeal = applyMealRegistration;

  const hydrateNutrition = useCallback(
    (snapshot: {
      proteinTarget: number;
      caloriesTarget: number;
      proteinCurrent: number;
      caloriesCurrent: number;
      registeredMeals: MealType[];
    }) => {
      setState((prev) => ({
        ...prev,
        registeredMeals: snapshot.registeredMeals,
        nutrition: {
          proteinTarget: snapshot.proteinTarget,
          caloriesTarget: snapshot.caloriesTarget,
          proteinCurrent: snapshot.proteinCurrent,
          caloriesCurrent: snapshot.caloriesCurrent,
        },
      }));
    },
    [],
  );

  const completeWorkout = useCallback(() => {
    // EP-01 Event: workout.completed (state transition drives computeRenderPlan)
    setState((prev) => {
      if (prev.todayWorkout.status === "completed") return prev;
      setWorkoutJustCompleted(true);
      return {
        ...prev,
        todayWorkout: { ...prev.todayWorkout, status: "completed" },
        workoutsThisWeek: Math.min(prev.workoutsThisWeek + 1, prev.workoutsTarget),
      };
    });
  }, []);

  const completeWorkoutAfterClosure = useCallback(() => {
    setWorkoutClosureSeen(true);
    setState((prev) => {
      if (prev.todayWorkout.status === "completed") return prev;
      setWorkoutJustCompleted(true);
      return {
        ...prev,
        todayWorkout: { ...prev.todayWorkout, status: "completed" },
        workoutsThisWeek: Math.min(prev.workoutsThisWeek + 1, prev.workoutsTarget),
      };
    });
  }, []);

  const acknowledgeHeroExperience = useCallback(() => {
    setWorkoutJustCompleted(false);
    setWorkoutClosureSeen(false);
  }, []);

  const acknowledgeNutritionJourney = useCallback(() => {
    setMealJustRegistered(false);
  }, []);

  const rescheduleWorkout = useCallback(() => {
    setState((prev) => ({
      ...prev,
      todayWorkout: { ...prev.todayWorkout, status: "rescheduled" },
    }));
  }, []);

  const logSleep = useCallback((hours: number, quality: SleepQuality) => {
    setState((prev) => ({
      ...prev,
      sleepLoggedToday: true,
      sleepLastNight: { hours, quality },
    }));
  }, []);

  const addWaterCup = useCallback(() => {
    setState((prev) => ({
      ...prev,
      waterCups: Math.min(prev.waterCups + 1, prev.waterTarget),
    }));
  }, []);

  const setScenario = useCallback((scenario: DemoScenario) => {
    setWorkoutJustCompleted(false);
    setWorkoutClosureSeen(false);
    setMealJustRegistered(false);
    setState(createScenarioState(scenario));
  }, []);

  const getPendingItems = useCallback((): string[] => {
    const items: string[] = [];
    const { todayWorkout, registeredMeals, sleepLoggedToday, nutrition } = state;

    if (todayWorkout.status === "planned" || todayWorkout.status === "pending") {
      items.push(`Treino de ${todayWorkout.name.toLowerCase()}`);
    }
    if (!registeredMeals.includes("almoco") && state.timeOfDay !== "morning") {
      items.push("Registrar almoço");
    }
    if (!registeredMeals.includes("jantar") && state.timeOfDay === "evening") {
      items.push("Registrar jantar");
    }
    if (!sleepLoggedToday && state.timeOfDay !== "morning") {
      items.push("Registrar sono");
    }
    if (nutrition.proteinCurrent < nutrition.proteinTarget * 0.7 && state.timeOfDay === "evening") {
      items.push("Proteína abaixo da meta");
    }
    return items.slice(0, 3);
  }, [state]);

  const getNextAction = useCallback((): { label: string; detail?: string } => {
    const pending = getPendingItems();
    if (pending.length > 0) {
      return { label: pending[0] };
    }
    return {
      label: `Treino de ${state.tomorrowWorkout.name.toLowerCase()}`,
      detail: `${state.tomorrowWorkout.durationMin} minutos`,
    };
  }, [getPendingItems, state.tomorrowWorkout]);

  const value = useMemo(
    () => ({
      state,
      workoutJustCompleted,
      workoutClosureSeen,
      mealJustRegistered,
      registerMeal,
      applyMealRegistration,
      hydrateNutrition,
      completeWorkout,
      completeWorkoutAfterClosure,
      acknowledgeHeroExperience,
      acknowledgeNutritionJourney,
      rescheduleWorkout,
      logSleep,
      addWaterCup,
      setScenario,
      getPendingItems,
      getNextAction,
    }),
    [
      state,
      workoutJustCompleted,
      workoutClosureSeen,
      mealJustRegistered,
      registerMeal,
      applyMealRegistration,
      hydrateNutrition,
      completeWorkout,
      completeWorkoutAfterClosure,
      acknowledgeHeroExperience,
      acknowledgeNutritionJourney,
      rescheduleWorkout,
      logSleep,
      addWaterCup,
      setScenario,
      getPendingItems,
      getNextAction,
    ],
  );

  return <DayContext.Provider value={value}>{children}</DayContext.Provider>;
}

export function useDay() {
  const ctx = useContext(DayContext);
  if (!ctx) throw new Error("useDay must be used within DayProvider");
  return ctx;
}

export function getContextualObservation(state: DayState): string | null {
  if (state.isFirstDay) return null;

  const { todayWorkout, sleepLastNight } = state;
  const workoutLine = `Treino de ${todayWorkout.name.toLowerCase()} disponível.\n${todayWorkout.durationMin} minutos.`;

  if (sleepLastNight.hours < 6 && todayWorkout.status === "planned") {
    return `Noite curta ontem.\n${workoutLine}`;
  }
  if (todayWorkout.status === "rest") {
    return "Dia de recuperação.\nFoque em nutrição e descanso.";
  }
  if (todayWorkout.status === "completed") {
    return "Treino concluído.\nBoa consistência esta semana.";
  }
  if (todayWorkout.status === "pending") {
    return `Treino ainda disponível.\n${todayWorkout.durationMin} minutos.`;
  }
  if (todayWorkout.status === "rescheduled") {
    return `Treino remarcado.\n${state.tomorrowWorkout.name} amanhã · ${state.tomorrowWorkout.durationMin} min.`;
  }
  if (todayWorkout.status === "planned") {
    return workoutLine;
  }
  return null;
}

export function getGreeting(state: DayState): string {
  const hour = new Date().getHours();
  const period = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";
  return `${period}, ${state.user.name}.`;
}
