import { createFileRoute } from "@tanstack/react-router";

import { NutritionWorkspaceScreen } from "@/components/nutrition/nutrition-workspace-screen";

export const Route = createFileRoute("/_app/nutricao/historico")({
  component: NutricaoHistoricoPage,
});

function NutricaoHistoricoPage() {
  return <NutritionWorkspaceScreen tab="historico" />;
}
