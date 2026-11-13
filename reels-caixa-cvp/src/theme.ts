import { Easing } from "remotion";

export const W = 1080;
export const H = 1920;
export const FPS = 30;

// Paleta original da peça
export const C = {
  bg: "#070B12",
  text: "#F4F7FA",
  accent: "#00E8D1",
  alert: "#FF3B5C",
  card: "#121826",
  muted: "#8B95A7",
  line: "#1E2738",
  dim: "#3A4457",
};

export const FONTS = {
  title: "'Inter', system-ui, -apple-system, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, Menlo, monospace",
};

// Zona segura do Reels: 160 px no topo, 250 px na base
export const SAFE = { top: 160, bottom: 250, side: 64 };

// Curvas (tokens de motion): ease-out para entradas, in-out para morphs
export const EASE = {
  outQuart: Easing.bezier(0.165, 0.84, 0.44, 1),
  outExpo: Easing.bezier(0.19, 1, 0.22, 1),
  outCubic: Easing.bezier(0.215, 0.61, 0.355, 1),
  inOutCubic: Easing.bezier(0.645, 0.045, 0.355, 1),
  inQuart: Easing.bezier(0.895, 0.03, 0.685, 0.22),
};
