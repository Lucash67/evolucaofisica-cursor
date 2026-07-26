import { createFileRoute } from "@tanstack/react-router";

import { NutritionWorkspaceScreen } from "@/components/nutrition/nutrition-workspace-screen";

export const Route = createFileRoute("/_app/nutricao/")({
  component: NutricaoIndexPage,
});

function NutricaoIndexPage() {
  return <NutritionWorkspaceScreen tab="hoje" />;
}
