import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

export type NutritionTab = "hoje" | "resumo" | "semana" | "metas" | "historico";

const TABS: { id: NutritionTab; label: string; to: string }[] = [
  { id: "hoje", label: "Hoje", to: "/nutricao" },
  { id: "resumo", label: "Resumo", to: "/nutricao/resumo" },
  { id: "semana", label: "Semana", to: "/nutricao/semana" },
  { id: "metas", label: "Metas", to: "/nutricao/metas" },
  { id: "historico", label: "Histórico", to: "/nutricao/historico" },
];

interface NutritionWorkspaceNavProps {
  tab: NutritionTab;
}

export function NutritionWorkspaceNav({ tab }: NutritionWorkspaceNavProps) {
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto rounded-xl bg-muted/30 p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {TABS.map(({ id, label, to }) => (
        <Link
          key={id}
          to={to}
          className={cn(
            "min-w-[4.5rem] flex-1 shrink-0 rounded-lg py-2 text-center text-sm transition-colors",
            tab === id
              ? "bg-background font-medium text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
