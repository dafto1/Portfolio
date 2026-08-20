"use client";

import { useSyncExternalStore } from "react";

function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerThemeSnapshot() {
  return false;
}

function subscribeToMount() {
  return () => {};
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);
  const mounted = useSyncExternalStore(subscribeToMount, () => true, () => false);

  if (!mounted) return <span className="blog-theme-placeholder" aria-hidden="true" />;

  return (
    <button
      type="button"
      className="blog-theme-toggle"
      aria-label="Toggle theme"
      onClick={() => {
        const next = !dark;
        document.documentElement.classList.toggle("dark", next);
        localStorage.theme = next ? "dark" : "light";
      }}
    >
      {dark ? "☼" : "☾"}
    </button>
  );
}
