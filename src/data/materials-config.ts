export interface MaterialItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: "PDF" | "Code" | "Link";
  url: string;
}

export const materialsConfig = {
  materials: [
    {
      id: "lecture-1",
      title: "Numerical Partial Differential Equations",
      description: "Numerical Partial Differential Equations",
      date: "2026-03-02",
      category: "PDF",
      url: "https://drive.google.com/file/d/1SS1hslI9D3plvj2YujTfMn_y4wPIhsz8/view?usp=drive_link", // Local folder doesn't exist yet
    },
    {
      id: "lecture-2",
      title: "Abstract Algebra",
      description: "A Brief Review of Abstract Algebra",
      date: "2026-03-05",
      category: "PDF",
      url: "/materials/AA", 
    },
    {
      id: "lecture-3",
      title: "Hamiltonian Simulation",
      description: "With QISCA 26-winter study group",
      date: "2026-03-10",
      category: "PDF",
      url: "https://drive.google.com/file/d/1xFQYSZyb6MKvcchp2dxuxbyfslmJDovU/view?usp=drive_link", // Local folder doesn't exist yet
    },
    {
      id: "lecture-4",
      title: "Computational Physics",
      description: "Computational Physics lecture summary",
      date: "2026-04-06",
      category: "PDF",
      url: "/materials/CP", 
    },
    {
      id: "lecture-5",
      title: "Quantum Machine Learning",
      description: "Quantum Machine Learning Research",
      date: "2026-04-12",
      category: "PDF",
      url: "/materials/QML", 
    },
  ] as MaterialItem[],
};
