import type { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-8 lg:px-10">{children}</div>
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
      className="glass-subtle inline-flex size-10 items-center justify-center rounded-full text-zinc-700 transition hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-white"
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
    <section id={id} className="scroll-mt-20 py-12 sm:py-16">
      <div className="mb-6">
        {eyebrow ? (
          <div className="mb-2 font-mono text-xs tracking-wide text-zinc-500">
            {eyebrow}
          </div>
        ) : null}
        <h2 className="font-serif text-2xl font-normal tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-[28px]">
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

