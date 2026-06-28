"use client";

import { useSyncExternalStore, useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function GitHubContributions({
  username,
}: {
  username: string;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    // Check initial state
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    // Watch for theme toggler class changes
    const observer = new MutationObserver(() => {
      const isDarkNow = document.documentElement.classList.contains("dark");
      setTheme(isDarkNow ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="glass rounded-xl p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="font-mono text-xs tracking-wide text-zinc-500">
          github
        </div>
        <a
          className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
        >
          @{username}
        </a>
      </div>
      <div className="github-scroll overflow-x-auto">
        {mounted ? (
          <GitHubCalendar
            username={username}
            year={new Date().getFullYear()}
            blockSize={12}
            blockMargin={4}
            fontSize={12}
            colorScheme={theme}
            theme={{
              light: [
                "#ebedf0",
                "#9be9a8",
                "#40c463",
                "#30a14e",
                "#216e39",
              ],
              dark: [
                "#161b22",
                "#0e4429",
                "#006d32",
                "#26a641",
                "#39d353",
              ],
            }}
          />
        ) : (
          <div className="h-[146px] min-w-[768px]" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
