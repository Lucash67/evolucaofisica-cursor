import { createFileRoute, useRouterState } from "@tanstack/react-router";

import { TrainingWorkspaceScreen } from "@/components/training/training-workspace-screen";

export const Route = createFileRoute("/_app/treino/historico")({
  component: HistoricoPage,
});

function HistoricoPage() {
  const isSessoes = useRouterState({
    select: (s) => s.location.pathname.endsWith("/sessoes"),
  });

  return (
    <TrainingWorkspaceScreen
      tab="historico"
      historyLens={isSessoes ? "sessoes" : "evolucao"}
    />
  );
}
