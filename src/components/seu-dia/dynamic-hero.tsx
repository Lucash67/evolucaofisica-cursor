"use client";

import { Check } from "lucide-react";

import { StartWorkoutButton } from "@/components/training/start-workout-button";
import { Button } from "@/components/ui/button";
import { useDay } from "@/context/day-context";
import type {
  HeroSequencePhase,
  NutritionSequencePhase,
} from "@/lib/experience/hero-sequence";
import type { HeroProjection } from "@/lib/experience/types";
import { cn } from "@/lib/utils";

interface DynamicHeroProps {
  hero: HeroProjection;
  onRegisterMeal: () => void;
  workoutPhase?: HeroSequencePhase;
  nutritionPhase?: NutritionSequencePhase;
  className?: string;
}

export function DynamicHero({
  hero,
  onRegisterMeal,
  workoutPhase = "action",
  nutritionPhase = "action",
  className,
}: DynamicHeroProps) {
  if (hero.mode === "WORKOUT_EXECUTE") {
    return <HeroExecute hero={hero} className={className} />;
  }

  if (hero.mode === "WORKOUT_DONE") {
    return (
      <HeroRecoverySequence
        hero={hero}
        onRegisterMeal={onRegisterMeal}
        phase={workoutPhase}
        className={className}
      />
    );
  }

  return (
    <HeroNutritionSequence
      hero={hero}
      onRegisterMeal={onRegisterMeal}
      phase={nutritionPhase}
      className={className}
    />
  );
}

function HeroExecute({ hero, className }: { hero: HeroProjection; className?: string }) {
  return (
    <section
      className={cn(
        "rounded-2xl bg-card px-5 py-6 ring-1 ring-accent/10",
        className,
      )}
    >
      <h2 className="text-2xl font-semibold tracking-tight">{hero.headline}</h2>
      {hero.subheadline && (
        <p className="mt-1.5 text-sm text-muted-foreground">{hero.subheadline}</p>
      )}
      {hero.primaryAction?.type === "startWorkout" && (
        <div className="mt-5">
          <StartWorkoutButton
            label={hero.primaryAction.label}
            className="w-full bg-accent text-accent-foreground shadow-none hover:bg-accent/90"
          />
        </div>
      )}
    </section>
  );
}

function HeroRecoverySequence({
  hero,
  onRegisterMeal,
  phase,
  className,
}: {
  hero: HeroProjection;
  onRegisterMeal: () => void;
  phase: HeroSequencePhase;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative min-h-[120px] rounded-2xl bg-card px-5 py-6 ring-1 ring-border/40",
        className,
      )}
    >
      {phase === "recognition" && (
        <div className="animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15">
              <Check className="h-4 w-4 text-accent" strokeWidth={2.5} aria-hidden />
            </span>
            <h2 className="text-2xl font-semibold tracking-tight">Treino concluído</h2>
          </div>
        </div>
      )}

      {phase === "bridge" && (
        <div className="animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15">
              <Check className="h-4 w-4 text-accent" strokeWidth={2.5} aria-hidden />
            </span>
            <h2 className="text-2xl font-semibold tracking-tight">Treino concluído</h2>
          </div>
          <p className="animate-in fade-in mt-6 text-[15px] text-muted-foreground duration-500">
            Proteína primeiro.
          </p>
        </div>
      )}

      {phase === "action" && (
        <div className="animate-in fade-in duration-300">
          {hero.primaryAction?.type === "registerMeal" && (
            <Button
              size="lg"
              className="w-full bg-accent text-accent-foreground shadow-none hover:bg-accent/90"
              onClick={onRegisterMeal}
            >
              {hero.primaryAction.label}
            </Button>
          )}
        </div>
      )}
    </section>
  );
}

function HeroNutritionSequence({
  hero,
  onRegisterMeal,
  phase,
  className,
}: {
  hero: HeroProjection;
  onRegisterMeal: () => void;
  phase: NutritionSequencePhase;
  className?: string;
}) {
  const { state } = useDay();
  const { proteinCurrent, proteinTarget } = state.nutrition;
  const proteinLine = `${proteinCurrent}/${proteinTarget}g`;

  return (
    <section
      className={cn(
        "relative min-h-[120px] rounded-2xl bg-card px-5 py-6 ring-1 ring-border/40",
        className,
      )}
    >
      {phase === "recognition" && (
        <div className="animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15">
              <Check className="h-4 w-4 text-accent" strokeWidth={2.5} aria-hidden />
            </span>
            <h2 className="text-2xl font-semibold tracking-tight">Refeição registrada</h2>
          </div>
        </div>
      )}

      {phase === "progress" && (
        <div className="animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15">
              <Check className="h-4 w-4 text-accent" strokeWidth={2.5} aria-hidden />
            </span>
            <h2 className="text-2xl font-semibold tracking-tight">Refeição registrada</h2>
          </div>
          <p className="animate-in fade-in mt-6 text-2xl font-semibold tabular-nums tracking-tight duration-500">
            {proteinLine}
          </p>
        </div>
      )}

      {phase === "action" && (
        <div className="animate-in fade-in duration-300">
          {hero.primaryAction?.type === "registerMeal" ? (
            <Button
              size="lg"
              className="w-full bg-accent text-accent-foreground shadow-none hover:bg-accent/90"
              onClick={onRegisterMeal}
            >
              {hero.primaryAction.label}
            </Button>
          ) : (
            <p className="text-xl font-semibold tracking-tight">{hero.headline}</p>
          )}
        </div>
      )}
    </section>
  );
}
