import type { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-4xl px-5 sm:border-x sm:border-[color:var(--line)] sm:px-8 lg:px-10">{children}</div>
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
    <section id={id} className="screen-line-bottom scroll-mt-20 py-11 sm:py-14">
      <div className="mb-6">
        {eyebrow ? (
          <div className="mb-2 font-mono text-xs tracking-wide text-[color:var(--muted-foreground)]">
            {eyebrow}
          </div>
        ) : null}
        <h2 className="text-[2rem] font-medium tracking-tight text-[color:var(--foreground)] sm:text-3xl">
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

