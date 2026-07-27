import { getDayKey } from "@/lib/domain/training/utils";

export function dayKeyToDate(dayKey: string): Date {
  const [y, m, d] = dayKey.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function buildLoggedAt(dayKey: string, timeHHmm: string): number {
  const [y, m, d] = dayKey.split("-").map(Number);
  const [hh, mm] = timeHHmm.split(":").map(Number);
  return new Date(y, m - 1, d, hh || 0, mm || 0, 0, 0).getTime();
}

export function formatMealTime(loggedAt: number): string {
  return new Date(loggedAt).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDayKeyLong(dayKey: string): string {
  return dayKeyToDate(dayKey).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDayKeyShort(dayKey: string): string {
  return dayKeyToDate(dayKey).toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function isTodayDayKey(dayKey: string, now = new Date()): boolean {
  return dayKey === getDayKey(now);
}

export function defaultTimeForDay(dayKey: string): string {
  if (isTodayDayKey(dayKey)) {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  }
  return "12:00";
}
