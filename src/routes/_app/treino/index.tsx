import { createFileRoute } from "@tanstack/react-router";

import { TrainingWorkspaceScreen } from "@/components/training/training-workspace-screen";

export const Route = createFileRoute("/_app/treino/")({
  component: TreinoIndexPage,
});

function TreinoIndexPage() {
  return <TrainingWorkspaceScreen tab="hoje" />;
}
