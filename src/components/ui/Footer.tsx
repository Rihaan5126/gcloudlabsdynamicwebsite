import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-border border-t">
      <div className="text-muted mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 text-center font-mono text-xs sm:flex-row sm:text-left">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. Built with Next.js &amp;
          Tailwind CSS.
        </p>
        <a href="#top" className="focus-ring hover:text-accent">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
