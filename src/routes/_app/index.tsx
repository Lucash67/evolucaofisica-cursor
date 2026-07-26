import { createFileRoute } from "@tanstack/react-router";

import { SeuDiaScreen } from "@/components/seu-dia/seu-dia-screen";

export const Route = createFileRoute("/_app/")({
  component: SeuDiaPage,
});

function SeuDiaPage() {
  return <SeuDiaScreen />;
}
