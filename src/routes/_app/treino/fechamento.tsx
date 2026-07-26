import { createFileRoute } from "@tanstack/react-router";

import { SessionClosureScreen } from "@/components/training/session-closure-screen";

export const Route = createFileRoute("/_app/treino/fechamento")({
  component: FechamentoPage,
});

function FechamentoPage() {
  return <SessionClosureScreen />;
}
