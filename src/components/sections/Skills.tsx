import { skillGroups } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export function Skills() {
  return (
    <section id="skills" className="border-border bg-surface/50 border-t py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="text-accent font-mono text-sm">{"02 / skills"}</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Tools I reach for
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {skillGroups.map((group, groupIndex) => (
            <Reveal key={group.category} delay={groupIndex * 100}>
              <div className="border-border bg-surface h-full rounded-2xl border p-6">
                <h3 className="text-muted font-mono text-sm">{group.category}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="border-border text-foreground rounded-full border px-3 py-1 text-sm"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
