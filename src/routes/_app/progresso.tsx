import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/progresso")({
  component: ProgressoPage,
});

function ProgressoPage() {
  return (
    <div className="flex min-h-[60dvh] max-w-lg flex-col items-center justify-center text-center lg:max-w-xl lg:items-start lg:text-left">
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Progresso</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">Em breve</h1>
      <p className="mt-3 max-w-xs text-sm text-muted-foreground">
        Resumo semanal, aderência e tendências chegam na Sprint 02.
      </p>
    </div>
  );
}
