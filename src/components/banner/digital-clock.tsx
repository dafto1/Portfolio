"use client";

import { useEffect, useState } from "react";

function formatClock(date: Date): string {
  return [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

export function DigitalClock({ className }: { className?: string }) {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const update = () => setTime(formatClock(new Date()));

    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      role="timer"
      aria-label="Local time"
      className={[
        "pointer-events-none inline-flex items-center gap-2 border border-white/15 bg-black/55",
        "px-2.5 py-1.5 font-mono text-[10px] leading-none text-zinc-100/85",
        "backdrop-blur-md sm:text-[11px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="clock-dot size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
      <span className="tabular-nums">{time}</span>
    </div>
  );
}
