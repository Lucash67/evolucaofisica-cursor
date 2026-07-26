import { createFileRoute, useRouterState } from "@tanstack/react-router";

import { TrainingWorkspaceScreen } from "@/components/training/training-workspace-screen";

export const Route = createFileRoute("/_app/treino/historico")({
  component: HistoricoPage,
});

function HistoricoPage() {
  const historyLens = useRouterState({
    select: (s) => {
      const path = s.location.pathname;
      if (path.endsWith("/sessoes")) return "sessoes" as const;
      if (path.endsWith("/resumo")) return "resumo" as const;
      return "evolucao" as const;
    },
  });

  return <TrainingWorkspaceScreen tab="historico" historyLens={historyLens} />;
}
