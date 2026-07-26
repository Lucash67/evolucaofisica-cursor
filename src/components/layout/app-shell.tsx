import type { ReactNode } from "react";

import { ActiveSessionBar } from "@/components/training/active-session-bar";
import { Sidebar } from "@/components/layout/sidebar";
import { TabBar } from "@/components/layout/tab-bar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-background text-foreground antialiased">
      <Sidebar />
      <main className="min-h-dvh pb-[4.5rem] lg:ml-[200px] lg:pb-10">
        <div className="mx-auto w-full max-w-[1520px] px-5 pt-7 md:px-8 md:pt-9 lg:px-12 lg:pt-10">
          {children}
        </div>
      </main>
      <ActiveSessionBar />
      <TabBar />
    </div>
  );
}
