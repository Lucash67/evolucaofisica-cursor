import { createFileRoute } from "@tanstack/react-router";

import { NutritionWorkspaceScreen } from "@/components/nutrition/nutrition-workspace-screen";

export const Route = createFileRoute("/_app/nutricao/resumo")({
  component: NutricaoResumoPage,
});

function NutricaoResumoPage() {
  return <NutritionWorkspaceScreen tab="resumo" />;
}
