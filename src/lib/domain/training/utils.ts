export function createId(): string {
  return crypto.randomUUID();
}

export function getDayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function formatDuration(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function formatDayKey(dayKey: string): string {
  const [y, m, d] = dayKey.split("-");
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  return date.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function formatTomorrowDate(date = new Date()): string {
  const tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });
}
