export interface ProjectLink {
  label: string;
  href: string;
}

export interface CuratedProject {
  slug: string;
  title: string;
  category: string;
  period: string;
  status: string;
  summary: string;
  impact: string;
  stack: string[];
  highlights: string[];
  links: ProjectLink[];
  featured?: boolean;
}

export const curatedProjects: CuratedProject[] = [
  {
    slug: "sui-dev-korea",
    title: "Sui Dev Korea Community Hub",
    category: "Ecosystem Platform",
    period: "2026",
    status: "Live community contribution",
    summary:
      "Contributed to the public-facing Sui Dev Korea hub, helping shape a Korean entry point for ecosystem updates, builder onboarding, and community discovery.",
    impact:
      "This work matters because it supports real ecosystem participation: not just a one-off demo, but a live community surface that people can keep using as they learn and build on Sui.",
    stack: ["Sui Ecosystem", "Community UX", "GitHub Pages", "Frontend Contribution"],
    highlights: [
      "Helped improve a live community-facing site instead of only shipping an isolated portfolio demo.",
      "Focused on making Sui-related information easier to approach for Korean builders and newcomers.",
      "Framed the contribution as ecosystem infrastructure with ongoing public visibility.",
    ],
    links: [
      {
        label: "Live Site",
        href: "https://sui-dev-korea.github.io/",
      },
    ],
    featured: true,
  },
  {
    slug: "quantum-diffusion",
    title: "Hybrid Quantum Diffusion Models",
    category: "Research Software",
    period: "2025 - 2026",
    status: "Preprint + implementation",
    summary:
      "Built a hybrid quantum-classical U-Net for diffusion-based image generation, combining a 4-qubit bottleneck with adaptive non-local observables to make quantum feature extraction more expressive.",
    impact:
      "Positioned the project as a research artifact rather than a notebook dump, with a paper, reproducible implementation, and a clearer narrative around why the quantum layer matters.",
    stack: ["PennyLane", "PyTorch", "Diffusion Models", "Quantum ML"],
    highlights: [
      "Designed a quantum bottleneck inside a classical U-Net rather than replacing the full model.",
      "Focused on multi-class generation and reducing mode collapse across ten digit classes.",
      "Connected the implementation to a public preprint and research-facing documentation.",
    ],
    links: [
      {
        label: "Paper",
        href: "https://arxiv.org/abs/2602.03405",
      },
      {
        label: "GitHub",
        href: "https://github.com/dolf3131/Enhancing-Quantum-Diffusion-Models-for-Complex-Image-Generation",
      },
    ],
  },
  {
    slug: "kaist-mit-review",
    title: "Logical Quantum Processor Review",
    category: "Research Review",
    period: "Jan 2026",
    status: "Poster presentation",
    summary:
      "Prepared a paper review and poster on logical quantum processors built from reconfigurable neutral-atom arrays during the 2026 KAIST-MIT Quantum Winter Camp.",
    impact:
      "Turned a dense Nature paper into a concise technical presentation focused on fault tolerance, atom-array architecture, and the practical implications of logical qubit control.",
    stack: ["Quantum Error Correction", "Neutral Atoms", "Technical Writing"],
    highlights: [
      "Summarized surface-code and transversal-gate ideas for a mixed research audience.",
      "Produced final review notes and a presentation poster as shareable outputs.",
      "Used the project as a bridge between theory reading and communication design.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/dolf3131/2026-kaist-mit",
      },
      {
        label: "Nature Paper",
        href: "https://www.nature.com/articles/s41586-023-06927-3",
      },
    ],
  },
  {
    slug: "sui-crowdfunding",
    title: "Sui Crowdfunding DApp",
    category: "Blockchain Product",
    period: "2025",
    status: "Hackathon prototype",
    summary:
      "Designed a decentralized crowdfunding flow on Sui where campaigns, funding, and supporter rewards are handled through Move contracts and a React-based front end.",
    impact:
      "Framed the chain not just as storage or settlement, but as part of the product logic by combining funding flows with NFT-based participation receipts.",
    stack: ["Sui", "Move", "React", "@mysten/dapp-kit"],
    highlights: [
      "Implemented campaign creation, funding, and withdrawal logic in Sui Move.",
      "Connected wallet interactions to a simpler front-end flow for demo use.",
      "Added NFT rewards to make contributions visible and on-chain.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/dolf3131/2025-Blockthon",
      },
    ],
  },
  {
    slug: "instant-insanity",
    title: "Instant Insanity Quantum Solver",
    category: "Quantum Algorithms",
    period: "2025",
    status: "Hardware experiment",
    summary:
      "Formulated the classic Instant Insanity puzzle as a QUBO problem and solved it with a Subspace Krylov Quantum Dynamics pipeline on IBM Quantum hardware.",
    impact:
      "The interesting part was not only the quantum formulation, but the recovery pipeline that made noisy hardware results interpretable enough to reconstruct valid puzzle states.",
    stack: ["Qiskit", "IBM Quantum", "QUBO", "Python"],
    highlights: [
      "Mapped a combinatorial puzzle into a quantum-friendly optimization problem.",
      "Ran the workflow against IBM hardware instead of stopping at simulation.",
      "Added rotation-aware post-processing to recover valid solutions from noisy outputs.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/dolf3131/Instant_Insanity",
      },
    ],
  },
  {
    slug: "quantum-challenge",
    title: "Quantum Challenge Working Notes",
    category: "Competition Study",
    period: "2025",
    status: "Open notebook archive",
    summary:
      "Collected working notes and experimental notebooks for the 2025 Quantum Challenge, keeping the process public even where the final official answers lived elsewhere.",
    impact:
      "Useful as a study artifact because it shows the exploration path, not just the polished answer sheet.",
    stack: ["Jupyter", "Problem Solving", "Quantum Computing"],
    highlights: [
      "Organized competition experiments into a shareable repository.",
      "Documented assumptions and partial solutions instead of hiding dead ends.",
      "Kept the repo intentionally lightweight and easy to browse.",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/dolf3131/2025-Quantum-Challenge",
      },
      {
        label: "Challenge",
        href: "https://qcenter.kr/sub/sub04_02.php?boardid=ionq&mode=view&idx=87&sk=&sw=&offset=&category=",
      },
    ],
  },
];
