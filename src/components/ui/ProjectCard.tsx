import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group border-border bg-surface hover:border-accent/60 flex h-full flex-col rounded-2xl border p-6 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-foreground text-xl font-semibold tracking-tight">
          {project.title}
        </h3>
        <div className="flex shrink-0 gap-2">
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.title} live site`}
              className="focus-ring border-border text-muted hover:border-accent hover:text-accent inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
                <path d="M15 3h6v6" />
                <path d="M10 14 21 3" />
              </svg>
            </a>
          )}
          {project.repoHref && (
            <a
              href={project.repoHref}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${project.title} source on GitHub`}
              className="focus-ring border-border text-muted hover:border-accent hover:text-accent inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2C6.48 2 2 6.58 2 12.19c0 4.49 2.87 8.3 6.84 9.64.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.61-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.19C22 6.58 17.52 2 12 2Z" />
              </svg>
            </a>
          )}
        </div>
      </div>

      <p className="text-muted mt-3 flex-1 text-sm leading-relaxed">
        {project.description}
      </p>

      {project.highlight && (
        <p className="text-warm mt-4 font-mono text-xs">{`// ${project.highlight}`}</p>
      )}

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="bg-surface-raised text-muted rounded-full px-3 py-1 font-mono text-xs"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
