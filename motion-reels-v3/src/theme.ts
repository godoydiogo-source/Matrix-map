import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import manifest from "../public/fonts/manifest.json";

export const COLORS = {
  bg: "#08060E",
  text: "#F4F0E6",
  lime: "#D6FF3F",
  violet: "#8B6CFF",
  surface: "#14121C",
  magenta: "#FF3D8F",
  dim: "rgba(244,240,230,0.55)",
  line: "rgba(139,108,255,0.28)",
} as const;

// Fontes livres servidas localmente (public/fonts) — Syne (títulos) e JetBrains Mono (repos, contagens, CODE).
// manifest.json: [família, peso, subset, arquivo, unicode-range]
for (const [family, weight, , file, unicodeRange] of manifest as [string, string, string, string, string][]) {
  loadFont({ family, url: staticFile(`fonts/${file}`), weight, unicodeRange, format: "woff2" });
}

export const FONTS = {
  title: "'Syne', 'Instrument Sans', sans-serif",
  mono: "'JetBrains Mono', 'IBM Plex Mono', monospace",
} as const;

// Zona segura do Reels: 160 px no topo, 250 px na base.
export const SAFE = { top: 160, bottom: 250, side: 72 } as const;
export const W = 1080;
export const H = 1920;
export const FPS = 30;
export const DURATION_S = 48;

// Fronteiras de bloco (em segundos) — flash lima entre blocos.
export const SCENES = {
  hook: [0, 8],
  pain: [8, 15],
  demo: [15, 26],
  climax: [26, 34],
  consolidate: [34, 40],
  steps: [40, 44],
  cta: [44, 48],
} as const;

// Ponto de substituição da narração: gere a VO no Voice Studio (voz Diogo v2),
// salve em public/vo/diogo-v2.wav e troque o nome abaixo.
export const VO_FILE = "vo/vo-placeholder.wav";
