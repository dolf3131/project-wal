const experiences = [
  {
    title: "Quantum Algorithm & Computing Research",
    organization: "QIYA, QISCA / independent research",
    period: "2021 - Present",
    description:
      "Exploring state preparation, Hamiltonian simulation, and variational methods with an emphasis on practical implementation and careful benchmarking.",
    tags: ["Qiskit", "PennyLane", "Python", "NumPy", "SciPy"],
  },
  {
    title: "KAIST-MIT Quantum Winter Camp",
    organization: "KAIST & MIT",
    period: "Jan 2026",
    description:
      "Participated in an intensive research program centered on quantum computing literature, collaborative review, and technical presentation.",
    tags: ["Poster", "Literature Review", "Quantum Error Correction"],
  },
  {
    title: "Seoul Quantum Campus",
    organization: "KIST",
    period: "Aug 2025 - Dec 2025",
    description:
      "Worked on a finance-oriented optimization theme in the computer track, using quantum tooling to reason about portfolio-style problems.",
    tags: ["PennyLane", "TensorFlow", "Optimization"],
  },
  {
    title: "Blockchain Security Research & Sui Development",
    organization: "BlockBlock / DanB",
    period: "Jan 2025 - Feb 2026",
    description:
      "Studied post-quantum cryptography and smart-contract design while building Sui-based applications with a stronger security perspective.",
    tags: ["Move", "Rust", "Cryptography", "Sui"],
  },
  {
    title: "Computational Science Internship",
    organization: "MPMC Lab",
    period: "Dec 2024 - Feb 2025",
    description:
      "Built physics-simulation prototypes and studied numerical methods for PDE-style problems, including how classical and quantum approaches can complement each other.",
    tags: ["TypeScript", "Simulation", "Numerical Methods"],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 space-y-4">
          <span className="section-kicker">Journey</span>
          <h2 className="section-heading">Research and product experience.</h2>
        </div>

        <div className="relative">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0 md:block" />

          <div className="space-y-5">
            {experiences.map((experience) => (
              <article
                key={experience.title}
                className="surface-panel soft-ring relative rounded-[1.75rem] border border-white/8 p-6 md:ml-10"
              >
                <div className="absolute -left-[2.65rem] top-8 hidden h-4 w-4 rounded-full border-4 border-background bg-primary md:block" />
                <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-slate-100">{experience.title}</p>
                    <p className="text-sm text-primary">{experience.organization}</p>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                    {experience.period}
                  </span>
                </div>
                <p className="mb-4 text-sm leading-7 text-muted-foreground">
                  {experience.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {experience.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
