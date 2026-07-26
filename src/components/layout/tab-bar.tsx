import { Link, useRouterState } from "@tanstack/react-router";
import { Dumbbell, Home, User, UtensilsCrossed } from "lucide-react";

import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "Seu Dia", icon: Home },
  { to: "/treino", label: "Treino", icon: Dumbbell },
  { to: "/nutricao", label: "Nutrição", icon: UtensilsCrossed },
  { to: "/perfil", label: "Perfil", icon: User },
] as const;

export function TabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (pathname.startsWith("/treino/sessao") || pathname.startsWith("/treino/fechamento")) return null;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/30 bg-background/90 backdrop-blur-lg lg:hidden"
      aria-label="Navegação principal"
    >
      <div className="mx-auto flex h-[52px] max-w-lg items-stretch px-1 pb-[env(safe-area-inset-bottom)]">
        {tabs.map(({ to, label, icon: Icon }) => {
          const active =
            pathname === to ||
            (to === "/treino" && pathname.startsWith("/treino")) ||
            (to === "/nutricao" && pathname.startsWith("/nutricao"));
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 text-[10px] transition-colors duration-200",
                active ? "text-foreground" : "text-muted-foreground/70",
              )}
            >
              <Icon className={cn("h-[18px] w-[18px]", active && "text-accent")} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
