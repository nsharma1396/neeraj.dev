import type { Palette, ThemeColors } from "../types";

export const PALETTES: Palette[] = [
  {
    name: "Coral",
    acc: "#ff5c3a",
    am: "#ffb347",
    bg: "#07070f",
    sur: "#0e0e1c",
    fg: "#f0eee8",
  },
  {
    name: "Cyan",
    acc: "#00d4ff",
    am: "#00ffa3",
    bg: "#060c0f",
    sur: "#0b1417",
    fg: "#e8f6fa",
  },
  {
    name: "Violet",
    acc: "#a78bfa",
    am: "#f472b6",
    bg: "#07070f",
    sur: "#0f0e1c",
    fg: "#f0eef8",
  },
  {
    name: "Lime",
    acc: "#b8ff47",
    am: "#47ffd4",
    bg: "#07090a",
    sur: "#0d1209",
    fg: "#eef4e8",
  },
  {
    name: "Gold",
    acc: "#f5c842",
    am: "#ff8c42",
    bg: "#090807",
    sur: "#141109",
    fg: "#f8f4e8",
  },
];

export function getColors(paletteIndex: number = 0): ThemeColors {
  const palette = PALETTES[paletteIndex] ?? PALETTES[0];
  return {
    bg: palette.bg,
    sur: palette.sur,
    acc: palette.acc,
    am: palette.am,
    fg: palette.fg,
    mu: "rgba(255,255,255,0.72)",
    br: `${palette.fg}12`,
  };
}
