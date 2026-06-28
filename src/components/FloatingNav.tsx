"use client";

import { useEffect, useMemo, useState, useRef } from "react";

type Item = { id: string; label: string; href: string };

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function FloatingNav({ items }: { items: Item[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "intro");
  const [activeRect, setActiveRect] = useState<{ left: number; width: number } | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled to the absolute bottom of the page
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;

      if (isAtBottom && items.length > 0) {
        setActiveId(items[items.length - 1].id);
        return;
      }

      const threshold = 180; // trigger point in px from top of screen
      let currentActive = items[0]?.id;

      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold) {
            currentActive = item.id;
          }
        }
      }
      setActiveId(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  useEffect(() => {
    if (!navRef.current) return;
    
    const updateRect = () => {
      const activeEl = navRef.current?.querySelector(`a[href="#${activeId}"]`) as HTMLElement;
      if (activeEl) {
        setActiveRect({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
        });
      }
    };

    updateRect();
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, [activeId]);

  return (
    <header className="nav-bar fixed inset-x-0 top-0 z-50 h-14 border-b border-white/[0.06]">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-5 sm:px-8">
        {/* Name on the left */}
        <a
          href="#intro"
          className="font-serif text-[21px] tracking-tight text-zinc-800 dark:text-zinc-100"
        >
          Shreyas Nikam
        </a>

        {/* Nav links in the center */}
        <nav ref={navRef} className="relative flex items-center gap-1">
          {/* Sliding highlight indicator */}
          {activeRect && (
            <span
              className="absolute top-1 bottom-1 rounded-full bg-zinc-900/[0.06] transition-all duration-300 ease-out dark:bg-white/[0.08]"
              style={{
                left: `${activeRect.left}px`,
                width: `${activeRect.width}px`,
              }}
              aria-hidden="true"
            />
          )}

          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={cx(
                  "relative rounded-full px-3.5 py-1.5 text-[17px] font-serif transition-colors duration-300",
                  isActive
                    ? "text-zinc-900 dark:text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200",
                )}
              >
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Spacer to balance the layout */}
        <div className="w-[110px] hidden sm:block" aria-hidden="true" />
      </div>
    </header>
  );
}
