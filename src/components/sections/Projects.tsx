"use client";

import { useMemo, useState } from "react";
import { allProjectTags, projects } from "@/lib/data";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { TagFilter } from "@/components/ui/TagFilter";
import { Reveal } from "@/components/ui/Reveal";

export function Projects() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (!activeTag) return projects;
    return projects.filter((project) => project.tags.includes(activeTag));
  }, [activeTag]);

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <p className="text-accent font-mono text-sm">{"03 — projects"}</p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Things I&rsquo;ve built
        </h2>
      </Reveal>

      <Reveal delay={160}>
        <div className="mt-8">
          <TagFilter
            tags={allProjectTags}
            activeTag={activeTag}
            onSelect={setActiveTag}
          />
        </div>
      </Reveal>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2">
        {filteredProjects.map((project, index) => (
          <Reveal as="li" key={project.slug} delay={index * 100}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </ul>

      {filteredProjects.length === 0 && (
        <p className="text-muted mt-8 font-mono text-sm">
          No projects match that tag yet.
        </p>
      )}
    </section>
  );
}
