import { createFileRoute } from "@tanstack/react-router";

import { WarmupScreen } from "@/components/training/warmup-screen";

export const Route = createFileRoute("/_app/treino/warmup/$templateId")({
  component: WarmupPage,
});

function WarmupPage() {
  const { templateId } = Route.useParams();
  return <WarmupScreen templateId={templateId} />;
}
