import type { ReactNode } from "react";

function BadgeShell({ children }: { children: ReactNode }) {
  return (
    <div className="glass-subtle inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm font-medium text-zinc-800 shadow-xs dark:text-zinc-100">
      {children}
    </div>
  );
}

function FallbackIcon({ label }: { label: string }) {
  const letters = label
    .replace(/[^a-zA-Z0-9]/g, " ")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .filter(Boolean)
    .join("");

  return (
    <span className="inline-flex size-5 items-center justify-center rounded-full bg-zinc-900/10 font-mono text-[9px] font-bold text-zinc-700 dark:bg-white/10 dark:text-zinc-200">
      {letters || "•"}
    </span>
  );
}

function IconWrap({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex size-5 items-center justify-center shrink-0">
      {children}
    </span>
  );
}

const icons: Record<string, ReactNode> = {
  javascript: (
    <svg viewBox="0 0 24 24" className="size-[15px] shrink-0" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#F7DF1E" />
      <path
        d="M13.7 17.6c.4.7.9 1.3 1.9 1.3.8 0 1.3-.4 1.3-1 0-.7-.6-1-1.5-1.4l-.5-.2c-1.5-.6-2.5-1.4-2.5-3.1 0-1.5 1.2-2.7 3.1-2.7 1.3 0 2.3.5 3 1.7l-1.6 1c-.3-.6-.7-.9-1.4-.9-.6 0-1 .4-1 .9 0 .7.4 1 1.3 1.4l.5.2c1.8.8 2.8 1.5 2.8 3.3 0 1.9-1.5 2.9-3.5 2.9-2 0-3.2-.9-3.8-2.1l1.9-1.1Zm-8.2.2c.3.5.6.9 1.2.9.6 0 1-.2 1-1.2V10h2.3v7.6c0 2.3-1.3 3.3-3.2 3.3-1.7 0-2.7-.9-3.2-2l1.9-1.1Z"
        fill="#111111"
      />
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 24 24" className="size-[15px] shrink-0" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#3178C6" />
      <path
        d="M10.4 10.2H8.2V18H6.2v-7.8H4v-1.7h6.4v1.7Zm6.8 2.7c-.2-.7-.7-1-1.5-1-.8 0-1.3.4-1.3.9 0 .6.7.8 1.7 1 1.5.3 2.7.9 2.7 2.6 0 1.8-1.4 2.7-3.3 2.7-1.8 0-3-.8-3.4-2.3l1.9-.5c.2.9.7 1.3 1.6 1.3.9 0 1.4-.4 1.4-1 0-.7-.6-.9-1.7-1.2-1.5-.3-2.7-.9-2.7-2.5 0-1.6 1.3-2.6 3.1-2.6 1.6 0 2.7.7 3.2 2l-1.7.6Z"
        fill="#ffffff"
      />
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" className="size-[17px] shrink-0 animate-[spin_16s_linear_infinite]" aria-hidden="true">
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      <g fill="none" stroke="#61DAFB" strokeWidth="1.4">
        <ellipse cx="12" cy="12" rx="9" ry="3.5" />
        <ellipse cx="12" cy="12" rx="3.5" ry="9" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="3.5" ry="9" transform="rotate(120 12 12)" />
      </g>
    </svg>
  ),
  "next.js": (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" aria-hidden="true">
      <circle cx="12" cy="12" r="9" className="fill-black dark:fill-white" />
      <path
        d="M8.2 15.9V8.4h1.6l5 6.6V8.4h1.5v7.5h-1.4l-5.2-6.9v6.9H8.2Z"
        className="fill-white dark:fill-black"
      />
    </svg>
  ),
  node: (
    <svg viewBox="0 0 24 24" className="size-[17px] shrink-0" aria-hidden="true">
      <path
        d="M12 2.6 4.5 7v10L12 21.4 19.5 17V7L12 2.6Z"
        fill="#539E43"
      />
      <path
        d="M12 6.2c-2.2 0-4 .9-4 2.1v7.1c0 1.2 1.8 2.1 4 2.1s4-.9 4-2.1V8.3c0-1.2-1.8-2.1-4-2.1Zm0 1.4c1.5 0 2.6.5 2.6 1.1S13.5 9.8 12 9.8s-2.6-.5-2.6-1.1S10.5 7.6 12 7.6Zm2.6 7.8c0 .6-1.1 1.1-2.6 1.1s-2.6-.5-2.6-1.1v-1c.6.4 1.6.6 2.6.6s2-.2 2.6-.6v1Z"
        className="fill-zinc-950 dark:fill-zinc-100"
        opacity=".65"
      />
    </svg>
  ),
  "tailwind css": (
    <svg viewBox="0 0 24 24" className="size-[17px] shrink-0" aria-hidden="true">
      <path
        d="M12 6c-2.7 0-4.4 1.3-5.1 3.9 1-1.3 2.2-1.8 3.6-1.5.8.2 1.4.8 2 1.4.9.9 1.8 1.8 3.5 1.8 2.7 0 4.4-1.3 5.1-3.9-1 1.3-2.2 1.8-3.6 1.5-.8-.2-1.4-.8-2-1.4-.9-.9-1.8-1.8-3.5-1.8Zm-5.1 6.4C4.2 12.4 2.5 13.7 1.8 16.3c1-1.3 2.2-1.8 3.6-1.5.8.2 1.4.8 2 1.4.9.9 1.8 1.8 3.5 1.8 2.7 0 4.4-1.3 5.1-3.9-1 1.3-2.2 1.8-3.6 1.5-.8-.2-1.4-.8-2-1.4-.9-.9-1.8-1.8-3.5-1.8Z"
        fill="#38BDF8"
      />
    </svg>
  ),
  git: (
    <svg viewBox="0 0 24 24" className="size-[14px] shrink-0" aria-hidden="true">
      <path
        d="M13.4 2.6a2 2 0 0 0-2.8 0L2.6 10.6a2 2 0 0 0 0 2.8l8 8a2 2 0 0 0 2.8 0l8-8a2 2 0 0 0 0-2.8l-8-8Z"
        fill="#F05032"
      />
      <path
        d="M14 12.2a2 2 0 0 1-1.2 1.8v3.5a1 1 0 1 1-2 0v-3.5a2 2 0 1 1 3.2-2.3l2.6-2.6a2 2 0 1 1 1.2 1.2l-2.6 2.6c0 .1 0 .2 0 .3Z"
        fill="#ffffff"
        opacity=".9"
      />
    </svg>
  ),
};

function normalize(label: string) {
  const s = label.trim().toLowerCase();
  if (s === "node.js" || s === "nodejs") return "node";
  if (s === "next" || s === "nextjs" || s === "next.js") return "next.js";
  if (s === "tailwind" || s === "tailwindcss") return "tailwind css";
  if (s === "js") return "javascript";
  if (s === "ts") return "typescript";
  return s;
}

export function SkillBadge({ label }: { label: string }) {
  const key = normalize(label);
  const icon = icons[key];

  return (
    <BadgeShell>
      <IconWrap>{icon ?? <FallbackIcon label={label} />}</IconWrap>
      <span className="whitespace-nowrap">{label}</span>
    </BadgeShell>
  );
}

export function TechTag({ label }: { label: string }) {
  const key = normalize(label);
  const icon = icons[key];

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-white/40 px-2 py-0.5 text-[11px] font-medium text-zinc-700 shadow-xs dark:border-white/10 dark:bg-zinc-800/30 dark:text-zinc-300 backdrop-blur-xs">
      <span className="inline-flex size-4 items-center justify-center shrink-0 *:scale-80">
        {icon ?? <FallbackIcon label={label} />}
      </span>
      <span className="whitespace-nowrap">{label}</span>
    </span>
  );
}

