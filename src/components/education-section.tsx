"use client";

import React, { useState } from "react";
import { GraduationCap } from "lucide-react";
import { CredlyBadge } from "../components/credlybadge";

const education = [
  {
    icon: GraduationCap,
    degree: "B.S. in Physics, B.E. in Integrated Technology",
    institution: "Yonsei University",
    period: "Mar 2021 - Present",
    description:
      "Building a foundation that connects quantum theory, device-level engineering, and software implementation. The overlap between the two majors has shaped how I approach both research and product work.",
    highlights: [
      "GPA: 3.6 / 4.3",
      "Physics Student Council, 2021",
      "General Student Council, 2024",
    ],
  },
];

const certificates = [
  { title: "Badge 0 Name", id: "8cfa24c4-ba57-47d1-bad5-3af85395a203" },
  { title: "Badge 1 Name", id: "434ca4a0-a695-4c32-ae57-7801b92fa3d3" },
  { title: "Badge 2 Name", id: "06cd49d9-050f-4dac-b9ec-27e3735d7891" },
  { title: "Badge 3 Name", id: "6dbd1709-bb8b-49cb-a020-93e221ff6a57" },
  { title: "Badge 4 Name", id: "403f22b8-e4e3-49d2-93e5-503b9d83c2af" },
  { title: "Badge 5 Name", id: "087746be-f67c-4d23-b2e1-77f437bb708b" },
  { title: "Badge 6 Name", id: "277345e4-3b55-4648-bc4c-22cc5906d75a" },
  { title: "Badge 7 Name", id: "e8c489c8-40c8-4d27-aaa0-e2e2c0986fed" },
  { title: "Badge 8 Name", id: "2f8b0057-0731-4af1-84a6-31814a7aae81" },
  { title: "Badge 9 Name", id: "a63d87dd-0f9a-4a2b-875e-f47e5766a9ed" },
  { title: "Badge 10 Name", id: "880ef89f-6220-4886-b4f4-0337f06929b6" },
  { title: "Badge 11 Name", id: "a7496f20-e211-4209-93d1-ca41ab031d78" },
  { title: "Badge 12 Name", id: "381c9703-5019-444b-a0da-cd7b498466e8" },
  { title: "Badge 13 Name", id: "0f79aa4b-1222-4edb-8080-c52231cd8e95" },
  { title: "Badge 14 Name", id: "23c60c07-3b2c-47fb-9f03-7dbd448c8628" },
];

const skillCategories = [
  {
    title: "Physics",
    description: "Deep understanding of fundamental physical laws, enabling rigorous mathematical analysis from subatomic quantum scales up to macroscopic classical systems.",
    skills: ["Quantum Mechanics", "Electromagnetics", "Classical Mechanics"],
  },
  {
    title: "Engineering",
    description: "Bridging pure theory and practical application. Capable of designing, analyzing, and optimizing hardware architectures, complex signals, and low-level operating systems.",
    skills: ["Microelectronics", "Signals & Systems", "Operating Systems", "Digital Logic"],
  },
  {
    title: "Programming",
    description: "Translating sophisticated logic into robust software. Experienced in high-performance systems programming, blockchain smart contracts, and data-driven algorithmic solving.",
    skills: ["Python", "C/C++", "Move", "Rust", "LaTeX", "Git"],
  },
];

export function EducationSection() {
  return (
    <section id="education" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 space-y-4">
          <span className="section-kicker">Background</span>
          <h2 className="section-heading">Education and interdisciplinary grounding.</h2>
        </div>

        <div className="space-y-5">
          {education.map((edu) => (
            <article
              key={edu.degree}
              className="surface-panel soft-ring flex flex-col gap-5 rounded-[1.75rem] border border-white/8 p-6 md:flex-row"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                <edu.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100">{edu.degree}</h3>
                    <p className="text-sm text-primary">{edu.institution}</p>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                    {edu.period}
                  </span>
                </div>
                <p className="mb-4 text-sm leading-7 text-muted-foreground">
                  {edu.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {edu.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-100"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkillsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 space-y-4">
          <span className="section-kicker">Capabilities</span>
          <h2 className="section-heading">Technical range across theory and implementation.</h2>
        </div>

        {/* Dynamic Expanding Flex Cards (Accordion) */}
        <div className="flex flex-col md:flex-row h-auto md:h-[450px] w-full gap-4 relative">
          {skillCategories.map((category, index) => {
            const isActive = activeIndex === index;

            return (
              <div 
                key={index} 
                onClick={() => setActiveIndex(index)}
                style={{ willChange: "flex, transform, opacity, width" }}
                className={`group relative overflow-hidden flex flex-col cursor-pointer transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] rounded-[2rem] border transform-gpu
                  ${isActive 
                    ? "md:flex-[3] h-[400px] md:h-full bg-slate-900 border-primary/40 shadow-[0_0_40px_rgba(0,120,255,0.15)]" 
                    : "md:flex-1 h-[80px] md:h-full bg-slate-950/50 border-white/5 hover:bg-slate-900/40 hover:border-white/15"
                  }
                `}
              >
                {/* Active Background Glow */}
                <div 
                  style={{ willChange: "opacity" }}
                  className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent transition-opacity duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu
                    ${isActive ? "opacity-100" : "opacity-0"}
                  `} 
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10 w-full h-full">
                  
                  {/* Header / Title */}
                  <div className="flex items-center md:items-start justify-between">
                    <div 
                      style={{ willChange: "transform" }}
                      className={`transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] w-full transform-gpu
                        ${isActive ? "md:rotate-0 translate-y-0" : "md:-translate-x-2 md:rotate-0"}
                      `}
                    >
                      <h3 
                        className={`font-bold text-slate-100 whitespace-nowrap transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu
                          ${isActive ? "text-2xl md:text-3xl tracking-tight" : "text-xl md:text-xl tracking-wider uppercase text-white/50 text-left md:text-left md:rotate-90 md:origin-left md:translate-x-8 md:translate-y-8"}
                        `}
                      >
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  {/* Active Content: Description and Skills - Fades in softly */}
                  <div 
                    className={`flex flex-col gap-6 w-full ${isActive ? "md:min-w-[400px]" : "min-w-0"}`}
                  >
                    <p 
                      style={{ willChange: "opacity, transform" }}
                      className={`text-sm md:text-base leading-relaxed text-muted-foreground transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? "delay-150" : "delay-0"} transform-gpu
                        ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 hidden md:block"}
                      `}
                    >
                      {category.description}
                    </p>
                    
                    <div 
                      style={{ willChange: "opacity, transform" }}
                      className={`flex flex-wrap gap-2 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? "delay-[250ms]" : "delay-0"} transform-gpu
                        ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 hidden"}
                      `}
                    >
                      {category.skills.map((skill) => (
                        <span 
                          key={skill} 
                          className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs md:text-sm font-semibold tracking-wide text-primary shadow-[0_0_15px_rgba(0,150,255,0.15)] backdrop-blur-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16">

          <div className="mb-8 space-y-4">
            <span className="section-kicker">Credentials</span>
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">
              Certifications and badges
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-8 rounded-[2rem] border border-white/8 bg-slate-950/25 px-4 py-8">
            {certificates.map((cert) => (
              <div key={cert.id} className="flex flex-col items-center">
                <CredlyBadge badgeId={cert.id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
