"use client";

import { cn } from "@/lib/utils";

interface NutritionInsightsStripProps {
  insights: string[];
  className?: string;
}

export function NutritionInsightsStrip({ insights, className }: NutritionInsightsStripProps) {
  if (insights.length === 0) return null;

  return (
    <div className={cn("space-y-1.5", className)}>
      {insights.map((line) => (
        <p key={line} className="text-sm text-muted-foreground">
          {line}
        </p>
      ))}
    </div>
  );
}
