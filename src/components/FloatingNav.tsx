"use client";

import { useEffect, useMemo, useState, useRef } from "react";

type Item = { id: string; label: string; href: string };

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function FloatingNav({ items }: { items: Item[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "intro");
  const [activeRect, setActiveRect] = useState<{ left: number; width: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const activeTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    setTheme(activeTheme);

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

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  };

  return (
    <header className="nav-bar fixed inset-x-0 top-0 z-50 h-14 border-b border-zinc-200/50 dark:border-white/[0.06]">
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

        {/* Theme toggle on the right */}
        <div className="flex w-[110px] justify-end">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="pointer-events-auto flex size-8.5 items-center justify-center rounded-full border border-zinc-200 bg-white/40 text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:border-white/10 dark:bg-zinc-800/10 dark:text-zinc-400 dark:hover:border-white/20 dark:hover:text-zinc-100"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                // Sun Icon (shows in dark mode to switch to light)
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4.5 w-4.5"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                // Moon Icon (shows in light mode to switch to dark)
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4.5 w-4.5"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
