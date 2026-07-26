import { createFileRoute } from "@tanstack/react-router";

import { TrainingWorkspaceScreen } from "@/components/training/training-workspace-screen";

export const Route = createFileRoute("/_app/treino/programas/")({
  component: ProgramasPage,
});

function ProgramasPage() {
  return <TrainingWorkspaceScreen tab="programas" />;
}
