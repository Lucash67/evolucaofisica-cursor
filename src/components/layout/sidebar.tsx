import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarDays, Dumbbell, Home, User } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Seu Dia", icon: Home },
  { to: "/treino", label: "Treino", icon: Dumbbell },
  { to: "/progresso", label: "Progresso", icon: CalendarDays },
  { to: "/perfil", label: "Perfil", icon: User },
] as const;

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (pathname.startsWith("/treino/sessao") || pathname.startsWith("/treino/fechamento")) return null;

  return (
    <aside
      className="fixed inset-y-0 left-0 z-40 hidden w-[200px] flex-col border-r border-border/30 bg-background lg:flex"
      aria-label="Navegação principal"
    >
      <div className="flex h-[52px] items-center px-5">
        <span className="text-[13px] font-semibold tracking-tight text-foreground/90">Evolução</span>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-2 pt-1">
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to === "/treino" && pathname.startsWith("/treino"));
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "relative flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] transition-colors duration-200",
                active
                  ? "bg-muted/40 font-medium text-foreground"
                  : "text-muted-foreground hover:bg-muted/25 hover:text-foreground",
              )}
            >
              {active && (
                <span className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-accent" aria-hidden />
              )}
              <Icon className={cn("h-4 w-4 opacity-70", active && "opacity-100")} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
