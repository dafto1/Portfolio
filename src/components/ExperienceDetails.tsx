"use client";

import { useState } from "react";

export function ExperienceDetails({
  company,
  work,
}: {
  company: string;
  work: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="flex size-8 items-center justify-center rounded-lg border border-zinc-200/80 text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:border-white/10 dark:text-zinc-400 dark:hover:border-white/20 dark:hover:text-zinc-100"
        aria-label={`Toggle ${company} work details`}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <svg
          viewBox="0 0 20 20"
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" />
        </svg>
      </button>

      {open ? (
        <div className="mt-5 w-full">
          <h4 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            What I&apos;ve done
          </h4>
          <ul className="mt-3 space-y-1.5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {work.map((item) => (
              <li key={item}>
                <span className="text-zinc-400 dark:text-zinc-600">- </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}
