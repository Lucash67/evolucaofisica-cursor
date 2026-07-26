"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useDay } from "@/context/day-context";
import { useTraining } from "@/context/training-context";
import type { SessionClosureStats } from "@/lib/domain/training/types";
import { cn } from "@/lib/utils";

type ClosurePhase = "recognition" | "stats" | "bridge" | "action";

export function SessionClosureScreen() {
  const navigate = useNavigate();
  const { completeWorkoutAfterClosure } = useDay();
  const { pendingClosure, clearPendingClosure } = useTraining();
  const [phase, setPhase] = useState<ClosurePhase>("recognition");

  useEffect(() => {
    if (!pendingClosure) {
      navigate({ to: "/treino" });
      return;
    }
    const t1 = setTimeout(() => setPhase("stats"), 800);
    const t2 = setTimeout(() => setPhase("bridge"), 2400);
    const t3 = setTimeout(() => setPhase("action"), 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pendingClosure, navigate]);

  if (!pendingClosure) return null;

  const stats = pendingClosure;

  const continueHome = () => {
    completeWorkoutAfterClosure();
    clearPendingClosure();
    navigate({ to: "/treino" });
  };

  return (
    <div className="mx-auto flex min-h-[85dvh] max-w-md flex-col items-center justify-center px-6 text-center">
      <ClosureContent phase={phase} stats={stats} onContinue={continueHome} />
    </div>
  );
}

function ClosureContent({
  phase,
  stats,
  onContinue,
}: {
  phase: ClosurePhase;
  stats: SessionClosureStats;
  onContinue: () => void;
}) {
  return (
    <div className="w-full">
      {(phase === "recognition" || phase === "stats" || phase === "bridge" || phase === "action") && (
        <div className="animate-in fade-in zoom-in-95 duration-400 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
          <Check className="h-7 w-7 text-accent" strokeWidth={2.5} />
        </div>
      )}

      <h1 className="animate-in fade-in mt-6 text-2xl font-semibold tracking-tight duration-300">
        Treino concluído
      </h1>

      {(phase === "stats" || phase === "bridge" || phase === "action") && (
        <div className="animate-in fade-in mt-8 space-y-2 duration-300">
          <p className="text-3xl font-semibold tabular-nums tracking-tight">
            {stats.durationMin} min
          </p>
          <p className="text-sm text-muted-foreground">
            {stats.completedSets} séries · {stats.exerciseCount} exercícios
          </p>
          {stats.volumeDeltaPct != null && (
            <p
              className={cn(
                "text-sm font-medium tabular-nums",
                stats.volumeDeltaPct >= 0 ? "text-accent" : "text-muted-foreground",
              )}
            >
              Volume {stats.volumeDeltaPct >= 0 ? "↑" : "↓"} {Math.abs(stats.volumeDeltaPct)}%
            </p>
          )}
        </div>
      )}

      {(phase === "bridge" || phase === "action") && (
        <p className="animate-in fade-in mt-10 text-[15px] text-muted-foreground duration-500">
          Agora vamos recuperar.
        </p>
      )}

      {phase === "action" && (
        <Button
          className="animate-in fade-in mt-8 w-full bg-accent text-accent-foreground hover:bg-accent/90 duration-300"
          size="lg"
          onClick={onContinue}
        >
          Continuar
        </Button>
      )}
    </div>
  );
}
