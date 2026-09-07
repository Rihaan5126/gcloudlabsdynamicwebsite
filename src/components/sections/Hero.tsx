"use client";

import dynamic from "next/dynamic";
import { profile, socialLinks } from "@/lib/data";
import { useTypewriter } from "@/hooks/useTypewriter";
import { SocialIcon } from "@/components/ui/SocialIcon";

const SpinningApple = dynamic(
  () => import("@/components/three/SpinningApple").then((mod) => mod.SpinningApple),
  { ssr: false },
);

export function Hero() {
  const { output, done } = useTypewriter(profile.headline);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.25]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 100%)",
          }}
        />
        <div className="animate-drift-slow bg-accent/20 absolute top-10 -left-24 h-72 w-72 rounded-full blur-3xl" />
        <div className="animate-drift-slow-reverse bg-warm/10 absolute top-1/3 right-0 h-80 w-80 rounded-full blur-3xl" />
      </div>

      <div className="pointer-events-none absolute top-28 right-10 hidden h-56 w-56 lg:block">
        <SpinningApple />
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-24">
        <p className="text-accent mb-4 font-mono text-sm">{"> whoami"}</p>
        <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl">
          {profile.name}
        </h1>
        <p className="text-muted mt-4 font-mono text-lg sm:text-xl" aria-live="off">
          <span aria-hidden="true">{output}</span>
          <span
            className={`bg-accent ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] align-middle ${
              done ? "animate-blink" : ""
            }`}
            aria-hidden="true"
          />
          <span className="sr-only">{profile.headline}</span>
        </p>
        <p className="text-muted mt-6 max-w-2xl text-lg leading-relaxed">{profile.bio}</p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="focus-ring bg-accent text-accent-foreground inline-flex items-center justify-center rounded-full px-6 py-3 font-mono text-sm font-medium transition-transform hover:-translate-y-0.5"
          >
            View projects
          </a>
          <a
            href="#contact"
            className="focus-ring border-border text-foreground hover:border-accent hover:text-accent inline-flex items-center justify-center rounded-full border px-6 py-3 font-mono text-sm font-medium transition-colors"
          >
            Get in touch
          </a>
        </div>

        <ul className="mt-10 flex items-center gap-4">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.icon === "email" ? undefined : "_blank"}
                rel={link.icon === "email" ? undefined : "noreferrer noopener"}
                aria-label={link.label}
                className="focus-ring border-border text-muted hover:border-accent hover:text-accent inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
              >
                <SocialIcon icon={link.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
