"use client";

import { GitHubCalendar } from "react-github-calendar";

export function GitHubContributions({
  username,
}: {
  username: string;
}) {
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
        <GitHubCalendar
          username={username}
          year={new Date().getFullYear()}
          blockSize={12}
          blockMargin={4}
          fontSize={12}
          colorScheme="dark"
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
      </div>
    </div>
  );
}

