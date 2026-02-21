export interface Palette {
  name: string;
  acc: string;
  am: string;
  bg: string;
  sur: string;
  fg: string;
}

export interface ThemeColors {
  bg: string;
  sur: string;
  acc: string;
  am: string;
  fg: string;
  mu: string;
  br: string;
}

export type SkillCategoryName = "Frontend" | "Desktop" | "Backend" | "Infra";

export interface Skill {
  label: string;
  value: number;
  cat: SkillCategoryName;
}

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface Role {
  title: string;
  company: string;
  years: string;
  tags: string[];
  delay: number;
}

export interface Project {
  num: string;
  title: string;
  desc: string;
  href: string;
  badge?: string;
  delay: number;
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface ThemeContextValue {
  theme: ThemeColors;
  paletteIndex: number;
  setPaletteIndex: (index: number) => void;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  ph: number;
}
