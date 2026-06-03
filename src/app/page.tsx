import { GitHubContributions } from "@/components/GitHubContributions";
import { FloatingNav } from "@/components/FloatingNav";
import { SkillBadge, TechTag } from "@/components/SkillBadge";
import { Container, IconLink, Section } from "@/components/ui";
import { site } from "@/lib/site";

function renderDescription(text: string) {
  const parts = [];
  let lastIndex = 0;
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    parts.push(
      <a
        key={match[2]}
        href={match[2]}
        target="_blank"
        rel="noreferrer"
        className="pointer-events-auto text-zinc-900 dark:text-zinc-100 underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-zinc-900 dark:hover:decoration-zinc-100 font-medium"
      >
        {match[1]}
      </a>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <FloatingNav
        items={[
          { id: "intro", label: "Home", href: "#intro" },
          { id: "skills", label: "Skills", href: "#skills" },
          { id: "experience", label: "Experience", href: "#experience" },
          { id: "projects", label: "Projects", href: "#projects" },
          { id: "github", label: "GitHub", href: "#github" },
        ]}
      />

      <main>
        <Container>
          <div className="h-14 sm:h-16" aria-hidden="true" />
          <section id="intro" className="py-14 sm:py-20">
            <div className="flex flex-col-reverse gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-12">
              <div className="max-w-2xl flex-1">
                <div className="mb-4 font-mono text-xs tracking-wide text-zinc-500">
                  {site.role} · {site.location}
                </div>
                <h1 className="font-serif text-5xl font-normal leading-[1.05] tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
                  Hi, I’m {site.name}.
                </h1>
                <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                  {site.tagline}
                </p>

                <div className="mt-6 max-w-xl space-y-3 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
                  <p>{site.about}</p>
                  <p className="text-zinc-500 dark:text-zinc-500">
                    Currently focused on shipping small, polished projects and improving fundamentals.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2.5">
                  <IconLink href={site.socials.linkedin} label="LinkedIn">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 23.5h4V7.98h-4V23.5ZM8 7.98h3.8v2.12h.05c.53-1 1.83-2.05 3.76-2.05 4.02 0 4.76 2.65 4.76 6.1v9.35h-4v-8.3c0-1.98-.04-4.52-2.76-4.52-2.76 0-3.18 2.16-3.18 4.38v8.44H8V7.98Z" />
                    </svg>
                  </IconLink>
                  <IconLink href={site.socials.github} label="GitHub">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                      <path d="M12 .5C5.73.5.75 5.64.75 12c0 5.1 3.29 9.43 7.86 10.96.58.11.79-.26.79-.57v-2.1c-3.2.71-3.87-1.39-3.87-1.39-.53-1.37-1.3-1.73-1.3-1.73-1.06-.75.08-.73.08-.73 1.17.08 1.79 1.23 1.79 1.23 1.04 1.82 2.73 1.29 3.4.98.11-.77.41-1.29.74-1.59-2.56-.3-5.25-1.32-5.25-5.86 0-1.29.45-2.35 1.19-3.18-.12-.3-.52-1.52.11-3.17 0 0 .97-.32 3.18 1.21.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.21-1.53 3.18-1.21 3.18-1.21.63 1.65.23 2.87.11 3.17.74.83 1.19 1.89 1.19 3.18 0 4.55-2.7 5.55-5.27 5.85.42.37.79 1.1.79 2.22v3.29c0 .31.21.68.8.57 4.56-1.53 7.85-5.86 7.85-10.96C23.25 5.64 18.27.5 12 .5Z" />
                    </svg>
                  </IconLink>
                  <IconLink href={`mailto:${site.email}`} label="Email">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v.5l8 5.33L20 6.5V6H4Zm16 12V8.9l-7.45 4.97a1 1 0 0 1-1.1 0L4 8.9V18h16Z" />
                    </svg>
                  </IconLink>
                </div>
              </div>
              <div className="shrink-0 self-center sm:self-start">
                <img
                  src="/profile.png"
                  alt={site.name}
                  className="size-24 rounded-full border border-zinc-200/80 object-cover shadow-sm dark:border-white/10 sm:size-32"
                />
              </div>
            </div>
          </section>

          <div className="h-px w-full bg-zinc-200/80 dark:bg-white/10" />

          <Section id="skills" title="Skills" eyebrow="// toolbox">
            <div className="flex flex-wrap gap-2">
              {site.skills.map((s) => (
                <SkillBadge key={s} label={s} />
              ))}
            </div>
          </Section>

          <div className="h-px w-full bg-zinc-200/80 dark:bg-white/10" />

          <Section id="experience" title="Experience" eyebrow="// career">
            <div className="flex flex-col gap-0">
              {site.experience.map((exp) => (
                <div
                  key={exp.company}
                  className="group flex flex-col gap-1 py-5 pl-0"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                          {exp.url ? (
                            <a
                              href={exp.url}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:underline underline-offset-4"
                            >
                              {exp.company}
                            </a>
                          ) : (
                            exp.company
                          )}
                        </h3>
                      </div>
                      <div className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                        {exp.role}
                      </div>
                    </div>
                    <div className="mt-1 shrink-0 text-right sm:mt-0">
                      <div className="text-sm text-zinc-500">
                        {exp.period}
                      </div>
                      <div className="text-xs text-zinc-500">
                        {exp.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <div className="h-px w-full bg-zinc-200/80 dark:bg-white/10" />

          <Section id="projects" title="Projects" eyebrow="// selected work">
            <div className="space-y-3">
              {site.projects.map((p) => (
                <div
                  key={p.title}
                  className="glass relative rounded-xl p-5 shadow-sm transition-colors hover:border-zinc-300 dark:hover:border-white/20"
                >
                  {p.links?.github ? (
                    <a
                      className="absolute inset-0 z-0 rounded-xl"
                      href={p.links.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${p.title} on GitHub`}
                    />
                  ) : null}
                  <div className="pointer-events-none relative z-10 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                        {p.title}
                      </div>
                      <div className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                        {renderDescription(p.description)}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.tech.map((t) => (
                          <TechTag key={t} label={t} />
                        ))}
                      </div>
                    </div>

                    {p.links && (p.links.github || p.links.live) ? (
                      <div className="flex shrink-0 items-center gap-3 text-sm">
                        {p.links.github ? (
                          <a
                            className="pointer-events-auto text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                            href={p.links.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open ${p.title} on GitHub`}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="h-5 w-5"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M12 .5C5.73.5.75 5.64.75 12c0 5.1 3.29 9.43 7.86 10.96.58.11.79-.26.79-.57v-2.1c-3.2.71-3.87-1.39-3.87-1.39-.53-1.37-1.3-1.73-1.3-1.73-1.06-.75.08-.73.08-.73 1.17.08 1.79 1.23 1.79 1.23 1.04 1.82 2.73 1.29 3.4.98.11-.77.41-1.29.74-1.59-2.56-.3-5.25-1.32-5.25-5.86 0-1.29.45-2.35 1.19-3.18-.12-.3-.52-1.52.11-3.17 0 0 .97-.32 3.18 1.21.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.21-1.53 3.18-1.21 3.18-1.21.63 1.65.23 2.87.11 3.17.74.83 1.19 1.89 1.19 3.18 0 4.55-2.7 5.55-5.27 5.85.42.37.79 1.1.79 2.22v3.29c0 .31.21.68.8.57 4.56-1.53 7.85-5.86 7.85-10.96C23.25 5.64 18.27.5 12 .5Z" />
                            </svg>
                          </a>
                        ) : null}
                        {p.links.github && p.links.live ? (
                          <span className="text-zinc-300 dark:text-zinc-700">/</span>
                        ) : null}
                        {p.links.live ? (
                          <a
                            className="pointer-events-auto text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                            href={p.links.live}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Live
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <div className="h-px w-full bg-zinc-200/80 dark:bg-white/10" />

          <Section id="github" title="GitHub" eyebrow="// contributions">
            <GitHubContributions username={site.githubUsername} />
          </Section>

          <footer className="py-10 text-sm text-zinc-500">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
              <div className="flex flex-wrap gap-4">
                <a className="hover:text-zinc-900 dark:hover:text-zinc-100" href={site.socials.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a className="hover:text-zinc-900 dark:hover:text-zinc-100" href={site.socials.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a className="hover:text-zinc-900 dark:hover:text-zinc-100" href={`mailto:${site.email}`}>
                  Email
                </a>
              </div>
            </div>
          </footer>

        </Container>
      </main>
    </div>
  );
}
