import { profile } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <p className="text-accent font-mono text-sm">{"01 / about"}</p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          A bit about me
        </h2>
      </Reveal>
      <Reveal delay={160}>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          <p className="text-muted text-lg leading-relaxed md:col-span-2">
            {profile.bio}
          </p>
          <dl className="border-border space-y-4 border-t pt-6 font-mono text-sm md:border-t-0 md:border-l md:pt-0 md:pl-6">
            <div>
              <dt className="text-muted">Role</dt>
              <dd className="text-foreground mt-1">{profile.headline}</dd>
            </div>
            {profile.location && (
              <div>
                <dt className="text-muted">Based in</dt>
                <dd className="text-foreground mt-1">{profile.location}</dd>
              </div>
            )}
            <div>
              <dt className="text-muted">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${profile.email}`}
                  className="focus-ring text-accent hover:underline"
                >
                  {profile.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
