import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/treino/biblioteca/")({
  beforeLoad: () => {
    throw redirect({ to: "/treino/programas" });
  },
});
