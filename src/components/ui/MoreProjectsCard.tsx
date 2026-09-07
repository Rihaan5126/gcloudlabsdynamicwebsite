export function MoreProjectsCard({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="focus-ring group border-border hover:border-accent/60 flex h-full min-h-[180px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed p-6 text-center transition-colors"
    >
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="currentColor"
        aria-hidden="true"
        className="text-muted group-hover:text-accent transition-colors"
      >
        <path d="M12 2C6.48 2 2 6.58 2 12.19c0 4.49 2.87 8.3 6.84 9.64.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.61-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.19C22 6.58 17.52 2 12 2Z" />
      </svg>
      <span className="text-muted group-hover:text-foreground font-mono text-sm transition-colors">
        More projects on GitHub
      </span>
      <span className="text-accent font-mono text-xs">&rarr;</span>
    </a>
  );
}
