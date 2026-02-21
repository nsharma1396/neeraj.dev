import type { ReactNode } from "react";
import { createContext, useContext, useState, useMemo } from "react";
import { getColors } from "../constants";
import type { ThemeContextValue } from "../types";

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [paletteIndex, setPaletteIndex] = useState(0);
  const theme = useMemo(() => getColors(paletteIndex), [paletteIndex]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, paletteIndex, setPaletteIndex }),
    [theme, paletteIndex]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
