"use client";

import { useEffect, useState } from "react";

export function TableOfContents({ headings }: { headings: { id: string; title: string }[] }) {
  const [active, setActive] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    const onScroll = () => {
      let current = headings[0]?.id ?? "";
      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (element && element.getBoundingClientRect().top <= 160) current = heading.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  if (!headings.length) return null;

  return (
    <aside className="blog-toc" aria-label="Table of contents">
      <div className="blog-toc-label">CONTENTS</div>
      <nav>
        {headings.map((heading) => (
          <a key={heading.id} href={`#${heading.id}`} className={active === heading.id ? "active" : ""}>
            {heading.title}
          </a>
        ))}
      </nav>
    </aside>
  );
}
