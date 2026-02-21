import type { Skill, SkillCategoryName } from "../types";

export const SKILLS: Skill[] = [
  { label: "React", value: 95, category: "Frontend" },
  { label: "TypeScript", value: 90, category: "Frontend" },
  { label: "Electron", value: 88, category: "Desktop" },
  { label: "Node.js", value: 85, category: "Backend" },
  { label: "WebRTC", value: 82, category: "Desktop" },
  { label: "WebCodecs", value: 80, category: "Desktop" },
  { label: "Canvas API", value: 83, category: "Frontend" },
  { label: "Bundlers and build tools", value: 87, category: "Infra" },
  { label: "CI/CD", value: 85, category: "Infra" },
  { label: "AWS", value: 72, category: "Infra" },
  { label: "D3.js", value: 78, category: "Frontend" },
];

export const SKILL_CATEGORIES: Record<SkillCategoryName, string> = {
  Frontend: "#ff5c3a",
  Desktop: "#ffb347",
  Backend: "#52e3c2",
  Infra: "#a78bfa",
};
