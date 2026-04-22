import { ResearchSection } from "@/components/research-section";
import { EducationSection, SkillsSection } from "@/components/education-section";

export default function ResearchPage() {
  return (
    <div className="pt-14 pb-14">
      <ResearchSection />
      <EducationSection />
      <SkillsSection />
    </div>
  );
}
