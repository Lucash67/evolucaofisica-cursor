"use client";

import { useCallback } from "react";

import { DynamicHero } from "@/components/seu-dia/dynamic-hero";
import { EngineSurface } from "@/components/seu-dia/engine-surface";
import {
  ContextColumn,
  InsightsPanel,
  NextActionsPanel,
  PendingPanel,
  PhaseSummaryPanel,
  WeekSummaryPanel,
} from "@/components/seu-dia/panels/context-panels";
import { useDay } from "@/context/day-context";
import { useHeroExperience } from "@/hooks/use-hero-experience";
import { useNutritionJourney } from "@/hooks/use-nutrition-journey";
import type { RenderPlan } from "@/lib/experience/types";

interface EngineDrivenDayProps {
  plan: RenderPlan;
  onRegisterMeal: () => void;
  layout: "mobile" | "tablet" | "desktop" | "ultra";
}

function useEngineExperience(heroMode: RenderPlan["hero"]["mode"]) {
  const {
    workoutJustCompleted,
    workoutClosureSeen,
    mealJustRegistered,
    acknowledgeHeroExperience,
    acknowledgeNutritionJourney,
  } = useDay();

  const animateRecovery = workoutJustCompleted && heroMode === "WORKOUT_DONE";
  const animateNutrition = mealJustRegistered && heroMode === "NUTRITION_PROGRESS";

  const onWorkoutSettled = useCallback(() => {
    acknowledgeHeroExperience();
  }, [acknowledgeHeroExperience]);

  const onNutritionSettled = useCallback(() => {
    acknowledgeNutritionJourney();
  }, [acknowledgeNutritionJourney]);

  const workout = useHeroExperience({
    mode: heroMode === "WORKOUT_DONE" ? "WORKOUT_DONE" : "WORKOUT_EXECUTE",
    animateSequence: animateRecovery,
    skipRecognition: workoutClosureSeen,
    onSequenceSettled: onWorkoutSettled,
  });

  const nutrition = useNutritionJourney({
    animateSequence: animateNutrition,
    onSequenceSettled: onNutritionSettled,
  });

  if (heroMode === "WORKOUT_DONE") {
    return {
      workoutPhase: workout.phase,
      nutritionPhase: nutrition.phase,
      surfaceReady: workout.surfaceReady,
    };
  }

  if (heroMode === "NUTRITION_PROGRESS") {
    return {
      workoutPhase: workout.phase,
      nutritionPhase: nutrition.phase,
      surfaceReady: nutrition.surfaceReady,
    };
  }

  return {
    workoutPhase: workout.phase,
    nutritionPhase: nutrition.phase,
    surfaceReady: true,
  };
}

function EngineDayContent({
  plan,
  onRegisterMeal,
  habitsLayout,
  nutritionLayout,
  showPending,
}: {
  plan: RenderPlan;
  onRegisterMeal: () => void;
  habitsLayout?: "stack" | "grid";
  nutritionLayout?: "stack" | "split";
  showPending?: boolean;
}) {
  const { hero, surface } = plan;
  const { workoutPhase, nutritionPhase, surfaceReady } = useEngineExperience(hero.mode);

  return (
    <div className="space-y-5">
      <DynamicHero
        hero={hero}
        onRegisterMeal={onRegisterMeal}
        workoutPhase={workoutPhase}
        nutritionPhase={nutritionPhase}
      />
      <EngineSurface
        surface={surface}
        onRegisterMeal={onRegisterMeal}
        habitsLayout={habitsLayout}
        nutritionLayout={nutritionLayout}
        surfaceReady={surfaceReady}
      />
      {showPending && <PendingPanel />}
    </div>
  );
}

export function EngineDrivenDay({ plan, onRegisterMeal, layout }: EngineDrivenDayProps) {
  if (layout === "mobile") {
    return <EngineDayContent plan={plan} onRegisterMeal={onRegisterMeal} />;
  }

  if (layout === "tablet") {
    return (
      <div className="grid grid-cols-[minmax(0,1fr)_280px] gap-8">
        <EngineDayContent
          plan={plan}
          onRegisterMeal={onRegisterMeal}
          habitsLayout="grid"
          nutritionLayout="split"
          showPending
        />
        <aside className="space-y-8 rounded-2xl bg-muted/15 px-5 py-6 ring-1 ring-border/25">
          <WeekSummaryPanel />
          <NextActionsPanel />
          <InsightsPanel />
        </aside>
      </div>
    );
  }

  if (layout === "desktop") {
    return (
      <div className="grid grid-cols-[minmax(0,1fr)_300px] gap-10">
        <EngineDayContent
          plan={plan}
          onRegisterMeal={onRegisterMeal}
          habitsLayout="grid"
          nutritionLayout="split"
          showPending
        />
        <ContextColumn />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-5">
        <EngineDayContent
          plan={plan}
          onRegisterMeal={onRegisterMeal}
          habitsLayout="grid"
          nutritionLayout="split"
          showPending
        />
      </div>
      <div className="col-span-4">
        <ContextColumn />
      </div>
      <aside className="col-span-3 space-y-8 rounded-2xl bg-muted/15 px-6 py-6 ring-1 ring-border/25">
        <PhaseSummaryPanel />
        <InsightsPanel />
      </aside>
    </div>
  );
}
