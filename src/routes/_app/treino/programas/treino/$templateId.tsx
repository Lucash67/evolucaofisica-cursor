import { createFileRoute } from "@tanstack/react-router";

import { TemplateEditorScreen } from "@/components/training/template-editor-screen";

export const Route = createFileRoute("/_app/treino/programas/treino/$templateId")({
  component: TemplateEditorPage,
  validateSearch: (search: Record<string, unknown>) => ({
    programId: (search.programId as string) || undefined,
  }),
});

function TemplateEditorPage() {
  const { templateId } = Route.useParams();
  const { programId } = Route.useSearch();
  return <TemplateEditorScreen templateId={templateId} programId={programId} />;
}
