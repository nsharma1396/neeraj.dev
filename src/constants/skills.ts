import type { Skill, SkillCategoryName } from "../types";

export const SKILLS: Skill[] = [
  { label: "React", value: 95, cat: "Frontend" },
  { label: "TypeScript", value: 90, cat: "Frontend" },
  { label: "Electron", value: 88, cat: "Desktop" },
  { label: "Node.js", value: 85, cat: "Backend" },
  { label: "WebRTC", value: 82, cat: "Desktop" },
  { label: "WebCodecs", value: 80, cat: "Desktop" },
  { label: "Canvas API", value: 83, cat: "Frontend" },
  { label: "Webpack", value: 87, cat: "Infra" },
  { label: "Rspack", value: 82, cat: "Infra" },
  { label: "CI/CD", value: 85, cat: "Infra" },
  { label: "AWS", value: 72, cat: "Infra" },
  { label: "D3.js", value: 78, cat: "Frontend" },
];

export const SKILL_CATEGORIES: Record<SkillCategoryName, string> = {
  Frontend: "#ff5c3a",
  Desktop: "#ffb347",
  Backend: "#52e3c2",
  Infra: "#a78bfa",
};
