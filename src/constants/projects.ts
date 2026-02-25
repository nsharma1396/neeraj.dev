import type { Project } from "../types";

export const PROJECTS: Project[] = [
  {
    num: "01",
    title: "CoreAudio Driver Manager",
    desc: "macOS virtual audio driver mgmt via Node.js native C++ add-on.",
    href: "https://github.com/nsharma1396/mac-coreaudio-driver-manager",
    delay: 0,
  },
  {
    num: "02",
    title: "Panorama",
    desc: "Immersive 360° image gallery with React & A-Frame (WebXR).",
    href: "https://nsharma1396.github.io/panorama",
    delay: 70,
  },
  {
    num: "03",
    title: "Screentap",
    desc: "Global input capture — mouse, keyboard, windows — native bindings.",
    href: "https://github.com/nsharma1396/screentap",
    delay: 140,
  },
  {
    num: "04",
    title: "nsharma.netlify.app",
    desc: "Legacy personal portfolio — React SPA using Gatsby, still live.",
    href: "https://nsharma.netlify.app",
    badge: "LEGACY",
    delay: 210,
  },
];
