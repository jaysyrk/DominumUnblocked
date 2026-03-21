import { Theme } from './types';

export const ZONES_URL = "https://cdn.jsdelivr.net/gh/gn-math/assets@main/zones.json";
export const COVER_BASE_URL = "https://cdn.jsdelivr.net/gh/gn-math/covers@main";
export const HTML_BASE_URL = "https://cdn.jsdelivr.net/gh/gn-math/html@main";

export const THEMES: Record<string, Theme> = {
  default: {
    name: "Default",
    bg: "#0b0a16",
    accent: "#7a5cff",
    blue: "#00bfff",
    text: "#e6e6ff",
    surface: "rgba(255,255,255,0.05)",
    border: "rgba(255,255,255,0.1)",
    cardBg: "rgba(255,255,255,0.03)",
    primary: "#7a5cff",
  },
  cyber: {
    name: "Cyber",
    bg: "#050c1b",
    accent: "#39ff14",
    blue: "#00ffff",
    text: "#e0ffe0",
    surface: "rgba(0,255,0,0.05)",
    border: "rgba(0,255,0,0.1)",
    cardBg: "rgba(0,255,0,0.03)",
    primary: "#39ff14",
  },
  sunset: {
    name: "Sunset",
    bg: "#1a0b0b",
    accent: "#ff6f61",
    blue: "#ffa500",
    text: "#fff0e6",
    surface: "rgba(255,110,100,0.05)",
    border: "rgba(255,110,100,0.1)",
    cardBg: "rgba(255,110,100,0.03)",
    primary: "#ff6f61",
  },
  neon: {
    name: "Neon",
    bg: "#0f0020",
    accent: "#ff00ff",
    blue: "#00ffff",
    text: "#ffffff",
    surface: "rgba(255,0,255,0.05)",
    border: "rgba(255,0,255,0.1)",
    cardBg: "rgba(255,0,255,0.03)",
    primary: "#ff00ff",
  },
  darkred: {
    name: "Darkred",
    bg: "#1b0000",
    accent: "#ff0000",
    blue: "#cc0000",
    text: "#ffe6e6",
    surface: "rgba(255,0,0,0.05)",
    border: "rgba(255,0,0,0.1)",
    cardBg: "rgba(255,0,0,0.03)",
    primary: "#ff0000",
  },
  matrix: {
    name: "Matrix",
    bg: "#001100",
    accent: "#00ff00",
    blue: "#33ff33",
    text: "#99ff99",
    surface: "rgba(0, 255, 0, 0.05)",
    border: "rgba(0, 255, 0, 0.15)",
    cardBg: "rgba(0, 50, 0, 0.7)",
    primary: "#00ff00",
  }
};
