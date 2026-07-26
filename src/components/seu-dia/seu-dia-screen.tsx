"use client";

import { useState } from "react";
import { Link } from "@tanstack/react-router";

import { EngineDrivenDay } from "@/components/seu-dia/engine-driven-day";
import { MealSheet } from "@/components/seu-dia/meal-sheet";
import { SeuDiaHeader } from "@/components/seu-dia/seu-dia-header";
import { Button } from "@/components/ui/button";
import { Surface, SurfaceSection } from "@/components/ui/surface";
import { useDay } from "@/context/day-context";
import { useRenderPlan } from "@/hooks/use-render-plan";

export function SeuDiaScreen() {
  const { state } = useDay();
  const renderPlan = useRenderPlan();
  const [mealOpen, setMealOpen] = useState(false);
  const openMeal = () => setMealOpen(true);

  if (state.isFirstDay) {
    return <FirstDayView />;
  }

  const engineActive = renderPlan !== null;

  return (
    <div className="animate-in fade-in duration-300">
      <SeuDiaHeader engineActive={engineActive} />

      {renderPlan ? (
        <>
          <div className="md:hidden">
            <EngineDrivenDay plan={renderPlan} onRegisterMeal={openMeal} layout="mobile" />
          </div>
          <div className="hidden md:block lg:hidden">
            <EngineDrivenDay plan={renderPlan} onRegisterMeal={openMeal} layout="tablet" />
          </div>
          <div className="hidden lg:block ultra:hidden">
            <EngineDrivenDay plan={renderPlan} onRegisterMeal={openMeal} layout="desktop" />
          </div>
          <div className="hidden ultra:block">
            <EngineDrivenDay plan={renderPlan} onRegisterMeal={openMeal} layout="ultra" />
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">Dia de descanso — engine não aplicável no EP-01.</p>
      )}

      <MealSheet open={mealOpen} onOpenChange={setMealOpen} />
    </div>
  );
}

function FirstDayView() {
  const { state } = useDay();
  return (
    <div className="animate-in fade-in flex min-h-[65dvh] flex-col justify-center duration-300 lg:max-w-lg">
      <h1 className="text-[1.75rem] font-semibold leading-tight tracking-tight lg:text-[2rem]">
        Seu plano está pronto.
      </h1>
      <p className="mt-3 text-muted-foreground">Primeiro treino · {state.todayWorkout.durationMin} min</p>
      <Surface variant="featured" className="mt-8 px-6 py-6">
        <p className="text-2xl font-semibold tracking-tight">{state.todayWorkout.name}</p>
        <Button asChild className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90">
          <Link to="/treino">Iniciar treino</Link>
        </Button>
      </Surface>
    </div>
  );
}
