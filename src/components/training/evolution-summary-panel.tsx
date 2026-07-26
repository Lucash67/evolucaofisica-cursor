"use client";

import { Minus, Sparkles, TrendingDown, TrendingUp } from "lucide-react";

import { Surface } from "@/components/ui/surface";
import type { EvolutionInsight, EvolutionSummary } from "@/lib/domain/training/evolution-summary";

interface EvolutionSummaryPanelProps {
  summary: EvolutionSummary;
}

function InsightList({
  title,
  icon: Icon,
  items,
  emptyText,
  accentClass,
}: {
  title: string;
  icon: typeof TrendingUp;
  items: EvolutionInsight[];
  emptyText: string;
  accentClass?: string;
}) {
  return (
    <Surface className="px-4 py-4">
      <div className="mb-3 flex items-center gap-2">
        <Icon className={`h-4 w-4 ${accentClass ?? "text-muted-foreground"}`} />
        <h3 className="text-sm font-medium">{title}</h3>
        <span className="ml-auto text-xs tabular-nums text-muted-foreground">{items.length}</span>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">{emptyText}</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.exerciseName}
              className="flex items-start justify-between gap-3 rounded-lg bg-muted/20 px-3 py-2.5"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium">{item.exerciseName}</p>
                <p className="text-xs text-muted-foreground">{item.templateNames}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm tabular-nums">{item.latestLabel}</p>
                {item.deltaLabel && (
                  <p className="text-xs text-muted-foreground">{item.deltaLabel}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Surface>
  );
}

export function EvolutionSummaryPanel({ summary }: EvolutionSummaryPanelProps) {
  if (summary.totalSessions === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        Complete treinos para ver seu resumo de evolução.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <Surface className="px-4 py-4">
        <p className="text-sm text-muted-foreground">
          Com base em <span className="font-medium text-foreground">{summary.totalSessions}</span>{" "}
          sessões e{" "}
          <span className="font-medium text-foreground">{summary.totalExercisesTracked}</span>{" "}
          exercícios registrados.
        </p>
      </Surface>

      <InsightList
        title="Progrediram"
        icon={TrendingUp}
        items={summary.progressed}
        emptyText="Nenhum exercício com carga ou reps acima da última vez."
        accentClass="text-accent"
      />

      <InsightList
        title="Estagnaram"
        icon={Minus}
        items={summary.stagnated}
        emptyText="Nenhum exercício parado na mesma performance."
      />

      <InsightList
        title="Regrediram"
        icon={TrendingDown}
        items={summary.regressed}
        emptyText="Nenhum exercício abaixo da última sessão."
        accentClass="text-destructive"
      />

      <InsightList
        title="Novos ou pouco habituais"
        icon={Sparkles}
        items={summary.newExercises}
        emptyText="Exercícios com até 2 registros — ainda pouco habituais."
        accentClass="text-amber-400"
      />
    </div>
  );
}
