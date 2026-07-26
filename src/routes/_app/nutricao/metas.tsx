import { createFileRoute } from "@tanstack/react-router";

import { NutritionWorkspaceScreen } from "@/components/nutrition/nutrition-workspace-screen";

export const Route = createFileRoute("/_app/nutricao/metas")({
  component: NutricaoMetasPage,
});

function NutricaoMetasPage() {
  return <NutritionWorkspaceScreen tab="metas" />;
}
