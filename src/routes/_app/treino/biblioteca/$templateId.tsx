import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/treino/biblioteca/$templateId")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/treino/programas/treino/$templateId",
      params: { templateId: params.templateId },
    });
  },
});
