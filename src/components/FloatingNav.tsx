"use client";

import { useEffect, useMemo, useState } from "react";

type Item = { id: string; label: string; href: string };

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function FloatingNav({ items }: { items: Item[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "intro");

  const ids = useMemo(() => items.map((i) => i.id), [items]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0];
        if (!visible?.target) return;
        setActiveId((visible.target as HTMLElement).id);
      },
      {
        root: null,
        // Prefer the section around the top-middle of the viewport
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.1, 0.2, 0.4, 0.6],
      },
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center px-4">
      <div className="pointer-events-auto">
        <nav className="liquid-glass relative flex items-center gap-1 rounded-full p-1.5 text-sm">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={cx(
                  "relative rounded-full px-4 py-2 transition-colors",
                  "text-zinc-300 hover:text-zinc-100",
                  isActive && "text-zinc-100",
                )}
              >
                <span
                  className={cx(
                    "absolute inset-0 rounded-full transition-opacity duration-200",
                    isActive ? "opacity-100" : "opacity-0",
                    "bg-white/10",
                  )}
                  aria-hidden="true"
                />
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

