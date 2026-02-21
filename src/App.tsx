import { useState, useEffect, useMemo } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import {
  Cursor,
  Nav,
  HR,
  Particles,
  GrainOverlay,
  NoiseOverlay,
  Hero,
  Work,
  Skills,
  Projects,
  Contact,
  Footer,
} from "./components";

function AppContent() {
  const [isReady, setIsReady] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timeoutId);
  }, []);

  const themeCssVariables = useMemo<React.CSSProperties>(
    () => ({
      ["--theme-bg" as string]: theme.bg,
      ["--theme-sur" as string]: theme.sur,
      ["--theme-acc" as string]: theme.acc,
      ["--theme-am" as string]: theme.am,
      ["--theme-fg" as string]: theme.fg,
      ["--theme-mu" as string]: theme.mu,
      ["--theme-br" as string]: theme.br,
    }),
    [theme]
  );

  return (
    <div
      className="portfolio-root min-h-screen w-screen overflow-x-hidden font-sans bg-[var(--theme-bg)] text-[var(--theme-fg)]"
      style={themeCssVariables}
    >
      <Cursor />
      <Particles />
      <GrainOverlay />
      <NoiseOverlay />

      <Nav ready={isReady} />
      <Hero ready={isReady} />

      <HR />
      <Work />
      <HR />
      <Skills />
      <HR />
      <Projects />
      <HR />
      <Contact />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
