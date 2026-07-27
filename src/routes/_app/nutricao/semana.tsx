import { createFileRoute } from "@tanstack/react-router";

import { NutritionWorkspaceScreen } from "@/components/nutrition/nutrition-workspace-screen";

export const Route = createFileRoute("/_app/nutricao/semana")({
  component: NutricaoSemanaPage,
});

function NutricaoSemanaPage() {
  return <NutritionWorkspaceScreen tab="semana" />;
}
