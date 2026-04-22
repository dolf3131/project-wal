import { Atom, Cpu, Orbit } from "lucide-react";

const interests = [
  {
    icon: Atom,
    title: "Quantum algorithms",
    description:
      "I work on practical algorithm design around state preparation, variational methods, and quantum workflows that can still be explained in classical engineering terms.",
  },
  {
    icon: Cpu,
    title: "Computational physics",
    description:
      "My physics background keeps pulling me toward numerical simulation, PDE-oriented thinking, and the question of how computation changes what we can model or optimize.",
  },
  {
    icon: Orbit,
    title: "Distributed systems",
    description:
      "On the systems side, I am interested in how Sui and Walrus can become product infrastructure rather than just speculative technology demos.",
  },
];

export function ResearchSection() {
  return (
    <section id="research" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 space-y-4">
          <span className="section-kicker">Research Focus</span>
          <h2 className="section-heading">Problems I keep returning to.</h2>
          <p className="section-copy">
            My work sits between theory, implementation, and communication. I
            like projects that demand mathematical clarity but still end in
            something people can run, read, or evaluate.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {interests.map((interest) => (
            <article
              key={interest.title}
              className="surface-panel soft-ring rounded-[1.75rem] border border-white/8 p-6"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <interest.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-slate-100">
                {interest.title}
              </h3>
              <p className="text-sm leading-7 text-muted-foreground">
                {interest.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
