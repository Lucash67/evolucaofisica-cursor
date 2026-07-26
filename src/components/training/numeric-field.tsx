"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface NumericFieldProps {
  value: number | null;
  onChange: (value: number | null) => void;
  placeholder?: string;
  suffix?: string;
  inputMode?: "decimal" | "numeric";
  className?: string;
}

export function NumericField({
  value,
  onChange,
  placeholder = "—",
  suffix,
  inputMode = "decimal",
  className,
}: NumericFieldProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const display =
    value != null
      ? suffix
        ? `${value}${suffix}`
        : String(value)
      : placeholder;

  const commit = () => {
    setEditing(false);
    const trimmed = draft.trim();
    if (trimmed === "") {
      onChange(null);
      return;
    }
    const n = Number(trimmed.replace(",", "."));
    onChange(Number.isFinite(n) ? n : null);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        type="text"
        inputMode={inputMode}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
        }}
        className={cn(
          "h-11 w-full rounded-lg bg-background px-3 text-center text-sm tabular-nums ring-2 ring-accent/50 focus:outline-none",
          className,
        )}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        setDraft(value != null ? String(value) : "");
        setEditing(true);
      }}
      className={cn(
        "flex h-11 w-full items-center justify-center rounded-lg bg-background/80 text-sm tabular-nums ring-1 ring-border/40 hover:ring-accent/40",
        value == null && "text-muted-foreground",
        className,
      )}
    >
      {display}
    </button>
  );
}
