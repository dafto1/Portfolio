import type { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-3xl border-x border-[color:var(--line)] px-4 sm:px-8">{children}</div>
  );
}

export function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
      className="inline-flex size-9 items-center justify-center rounded-lg border border-[color:var(--border)] text-[color:var(--muted-foreground)] transition-colors hover:bg-[color:var(--muted)] hover:text-[color:var(--foreground)] active:scale-[.98]"
    >
      {children}
    </a>
  );
}

export function Section({
  id,
  title,
  eyebrow,
  children,
}: {
  id?: string;
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="screen-line-bottom scroll-mt-20 py-10 sm:py-12">
      <div className="mb-6">
        {eyebrow ? (
          <div className="mb-2 font-mono text-xs tracking-wide text-[color:var(--muted-foreground)]">
            {eyebrow}
          </div>
        ) : null}
        <h2 className="text-3xl font-medium tracking-tight text-[color:var(--foreground)]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-700 dark:border-white/15 dark:bg-black dark:text-zinc-300">
      {children}
    </span>
  );
}

