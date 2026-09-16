"use client";

import { Section } from "../Section";
import SkillGraph from "../SkillGraph";
import { skillGraph } from "@/content/site";

export default function FeatureEngineering() {
  const skills = skillGraph.nodes.filter((n) => n.kind === "skill");

  return (
    <Section
      id="features"
      stage="stage 03 · feature engineering"
      title="Feature engineering"
      subtitle="No progress bars — skills are engineered features, and what matters is how they connect. Every feature here is reused across multiple training runs."
    >
      <SkillGraph />
      <ul className="sr-only">
        {skills.map((s) => (
          <li key={s.id}>{s.label}</li>
        ))}
      </ul>
      <p className="mt-4 font-mono text-xs text-faint">
        ▸ {skills.length} features engineered · reuse verified across{" "}
        {skillGraph.nodes.filter((n) => n.kind === "project").length} artifacts
      </p>
    </Section>
  );
}
