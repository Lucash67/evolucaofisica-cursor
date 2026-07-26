import { createFileRoute } from "@tanstack/react-router";

import { ActiveSessionScreen } from "@/components/training/active-session-screen";

export const Route = createFileRoute("/_app/treino/sessao")({
  component: SessaoPage,
});

function SessaoPage() {
  return <ActiveSessionScreen />;
}
