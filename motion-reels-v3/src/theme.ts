import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import manifest from "../public/fonts/manifest.json";

export const COLORS = {
  bg: "#040A10",        // azul-preto das peças jornalísticas
  text: "#F2F5F7",
  accent: "#00E6CC",    // verde-água (destaque, palavra ativa, check)
  accentDim: "#00B4A0",
  alert: "#FF3A5C",     // coral (alerta; aqui só no CODE e no card final)
  muted: "#8A96A0",     // labels mono em cinza
  surface: "#0B1319",   // cards
  line: "#1B262E",      // bordas finas
  dim: "rgba(242,245,247,0.6)",
  capBox: "rgba(5,10,15,0.88)",
} as const;

// Fontes livres servidas localmente (public/fonts) — Inter Tight (títulos, caixa alta) e JetBrains Mono (repos, contagens, CODE).
// manifest.json: [família, peso, subset, arquivo, unicode-range]
for (const [family, weight, , file, unicodeRange] of manifest as [string, string, string, string, string][]) {
  loadFont({ family, url: staticFile(`fonts/${file}`), weight, unicodeRange, format: "woff2" });
}

export const FONTS = {
  title: "'Inter Tight', 'Inter', sans-serif",
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
  hook: [0, 8.5],
  pain: [8.5, 15.6],
  demo: [15.6, 25.6],
  climax: [25.6, 32.6],
  consolidate: [32.6, 38.75],
  steps: [38.75, 43.55],
  cta: [43.55, 48],
} as const;

// Cena ao vivo inserida (Diogo em câmera, gerada no Higgsfield Seedance 2.5 com lip-sync da VO nova).
// Entra logo depois do gancho "CÓDIGO → MOTION" e desloca tudo que vem depois em INSERT.durationS.
export const INSERT = {
  atS: 3.5,
  durationS: 9,
  video: "insert/diogo-9s.mp4", // clipe gerado no Higgsfield (1080×1920)
  audio: "insert/diogo-9s-vo.wav", // fala nova gerada no Voice Studio (voz Diogo v2)
  kicker: "Quem organizou o kit · @diogodoy",
} as const;

// Narração oficial: Voice Studio, voz Diogo v2. As fronteiras de SCENES acima seguem esta faixa.
export const VO_FILE = "vo/diogo-v2.wav";
