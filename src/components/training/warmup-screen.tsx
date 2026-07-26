"use client";

import { Link, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import { useTraining } from "@/context/training-context";
import { getLastPerformance } from "@/lib/domain/training/progression";
import { suggestLoadGoal } from "@/lib/domain/training/session-stats";

interface WarmupScreenProps {
  templateId: string;
}

export function WarmupScreen({ templateId }: WarmupScreenProps) {
  const navigate = useNavigate();
  const { getTemplate, history, startSession } = useTraining();
  const template = getTemplate(templateId);

  if (!template) {
    navigate({ to: "/treino" });
    return null;
  }

  if (template.exercises.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70dvh] max-w-md flex-col justify-center">
        <Surface className="px-6 py-8 text-center">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Pré-sessão
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">{template.name}</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Treino sem exercícios. Apague ou adicione exercícios no programa para começar.
          </p>
          <Button asChild className="mt-6 w-full" variant="outline">
            <Link
              to="/treino/programas/treino/$templateId"
              params={{ templateId: template.id }}
            >
              Editar treino
            </Link>
          </Button>
          <Button asChild variant="ghost" className="mt-2 w-full">
            <Link to="/treino">Voltar</Link>
          </Button>
        </Surface>
      </div>
    );
  }

  const primaryExercise = [...template.exercises].sort((a, b) => a.order - b.order)[0];
  const lastPerf = primaryExercise
    ? getLastPerformance(history, primaryExercise.name)
    : null;
  const goal = suggestLoadGoal(lastPerf?.loadKg ?? null);

  const begin = () => {
    startSession(templateId);
    navigate({ to: "/treino/sessao" });
  };

  return (
    <div className="mx-auto flex min-h-[70dvh] max-w-md flex-col justify-center">
      <Surface variant="featured" className="px-6 py-8 text-center">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Pré-sessão
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">{template.name}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {template.exercises.length} exercícios
        </p>

        {primaryExercise && lastPerf && (
          <div className="mt-8 space-y-3 text-left">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Última vez · {primaryExercise.name}
            </p>
            <p className="text-lg font-semibold tabular-nums">
              {lastPerf.loadKg != null ? `${lastPerf.loadKg}kg` : "—"}
              {lastPerf.reps != null && (
                <span className="text-base font-normal text-muted-foreground">
                  {" "}
                  × {lastPerf.reps}
                </span>
              )}
            </p>
            {goal != null && (
              <p className="text-sm text-muted-foreground">
                Objetivo hoje ·{" "}
                <span className="font-medium text-foreground tabular-nums">{goal}kg</span>
              </p>
            )}
          </div>
        )}

        <Button
          className="mt-8 w-full bg-accent text-accent-foreground hover:bg-accent/90"
          size="lg"
          onClick={begin}
        >
          Iniciar sessão
        </Button>
        <button
          type="button"
          onClick={begin}
          className="mt-3 w-full py-2 text-sm text-muted-foreground hover:text-foreground"
        >
          Pular
        </button>
      </Surface>
    </div>
  );
}
