import { Outlet, createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/layout/app-shell";
import { DayProvider } from "@/context/day-context";
import { NutritionProvider } from "@/context/nutrition-context";
import { TrainingProvider } from "@/context/training-context";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <DayProvider>
      <NutritionProvider>
        <TrainingProvider>
          <AppShell>
            <Outlet />
          </AppShell>
        </TrainingProvider>
      </NutritionProvider>
    </DayProvider>
  );
}
