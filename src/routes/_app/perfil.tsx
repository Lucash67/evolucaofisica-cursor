import { createFileRoute } from "@tanstack/react-router";

import { useDay } from "@/context/day-context";
import type { DemoScenario } from "@/lib/domain/types";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/perfil")({
  component: PerfilPage,
});

const scenarios: { id: DemoScenario; label: string }[] = [
  { id: "default", label: "Manhã · planejado" },
  { id: "completed", label: "Treino concluído" },
  { id: "rest", label: "Dia de descanso" },
  { id: "night", label: "Noite · pendências" },
  { id: "first-day", label: "Primeiro dia" },
];

function PerfilPage() {
  const { state, setScenario } = useDay();

  return (
    <div className="max-w-2xl lg:max-w-3xl">
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Perfil</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight lg:text-3xl">{state.user.name}</h1>
      <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-1">
        <div className="flex justify-between border-b border-border/50 pb-3">
          <dt className="text-muted-foreground">Objetivo</dt>
          <dd className="font-medium">{state.user.objective}</dd>
        </div>
        <div className="flex justify-between border-b border-border/50 pb-3">
          <dt className="text-muted-foreground">Fase</dt>
          <dd className="font-medium">{state.user.phase}</dd>
        </div>
      </dl>

      <section className="mt-10 rounded-2xl border border-dashed border-border/60 p-4">
        <p className="text-xs font-medium text-muted-foreground">Demo — estados da Sprint 01</p>
        <div className="mt-3 flex flex-col gap-2">
          {scenarios.map((s) => (
            <Button key={s.id} variant="outline" size="sm" onClick={() => setScenario(s.id)}>
              {s.label}
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
}
