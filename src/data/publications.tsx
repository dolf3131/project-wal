export interface Publication {
  title: string;
  authors: string[];
  venue: string; // 학회명 또는 저널명
  date: string;
  type: "Journal" | "Conference" | "Poster" | "Preprint";
  link?: string; // 논문 PDF 또는 링크
  code?: string; // 관련 깃허브 코드
}

export const publications: Publication[] = [
  {
    title: "Deterministic Ground State Preparation via Power-Cosine Filtering of Time Evolution Operators",
    authors: ["Jeongbin Jo"], // 본인 이름 포함
    venue: "arXiv",
    date: "Feb 2026",
    type: "Preprint",
    // 링크가 있다면 추가, 없으면 생략 가능
    link: "https://arxiv.org/abs/2602.19556", 
  },
  {
    title: "Enhancing Quantum Diffusion Models for Complex Image Generation",
    authors: ["Jeongbin Jo", "Santanam Wishal", "etc..."], // 본인 이름 포함
    venue: "arXiv",
    date: "Feb 2026",
    type: "Preprint",
    // 링크가 있다면 추가, 없으면 생략 가능
    link: "https://arxiv.org/abs/2602.03405", 
    code: "https://github.com/dolf3131/Enhancing-Quantum-Diffusion-Models-for-Complex-Image-Generation",
  },
  // 나중에 추가될 논문들...
];