import { Outlet, createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/layout/app-shell";
import { DayProvider } from "@/context/day-context";
import { TrainingProvider } from "@/context/training-context";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <DayProvider>
      <TrainingProvider>
        <AppShell>
          <Outlet />
        </AppShell>
      </TrainingProvider>
    </DayProvider>
  );
}
