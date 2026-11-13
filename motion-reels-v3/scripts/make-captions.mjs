// Fonte única de verdade do roteiro: frases com janela de tempo (s) → palavras com timing (peso por caracteres).
// Gera src/data/captions.json (legendas queimadas, palavra ativa) e out/motion-kit-reel.srt.
// Quando a VO real (Voice Studio, voz Diogo v2) chegar, ajuste só os tempos de início/fim de cada frase aqui e rode `npm run srt`.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// [início, fim, frase] — tempos planejados por cena (30 fps, 48 s).
export const PHRASES = [
  // CENA 1 — Hook
  [0.30, 1.90, "O Claude já escreve código."],
  [2.00, 3.60, "Falta ele dirigir o motion."],
  [3.70, 5.60, "Eu juntei 20 repositórios pra isso:"],
  [5.70, 7.00, "skills, motores e complementos,"],
  [7.05, 8.20, "prontos pro Claude Code."],
  // CENA 2 — Dor
  [8.40, 9.40, "Você pede um Reel"],
  [9.45, 10.60, "e o motion sai genérico."],
  [10.75, 12.05, "Ou um modelo inventa o quadro"],
  [12.10, 12.95, "e erra o texto."],
  [13.10, 14.25, "Aqui cada frame é código"],
  [14.30, 15.45, "e o Claude aprende o ofício."],
  // CENA 3 — Demo rápida
  [15.60, 17.40, "Remotion faz o vídeo em React."],
  [17.70, 19.40, "GSAP cuida das timelines."],
  [19.70, 21.70, "HyperFrames transforma HTML em MP4."],
  [21.90, 23.90, "Lottie leva a animação leve pra tela."],
  [24.05, 25.35, "E o Herk Edit Kit corta o silêncio"],
  [25.40, 26.30, "e monta o seu Reel."],
  // CENA 4 — Pulo do gato
  [26.55, 27.75, "Aí vem o pulo do gato:"],
  [27.85, 29.25, "o Product Launch Motion."],
  [29.65, 30.95, "Você cola o link do site"],
  [31.05, 32.50, "e sai um filme de lançamento,"],
  [32.55, 34.25, "com spring, cursor e som no beat."],
  // CENA 5 — Consolidação
  [34.45, 36.85, "São 10 skills, 4 motores e 6 complementos."],
  [37.05, 38.65, "Tudo open source, de outros autores."],
  [38.75, 39.95, "Eu só organizei o kit."],
  // CENA 6 — Facilidade
  [40.20, 41.70, "Pra começar: abre o Claude Code,"],
  [41.80, 42.95, "instala as skills da lista,"],
  [43.00, 44.30, "e descreve o vídeo que você quer."],
  // CENA 7 — CTA
  [44.50, 45.85, "Quer os 20 links, organizados?"],
  [45.95, 47.30, "Comenta CODE que eu te mando."],
];

const captions = [];
for (const [start, end, text] of PHRASES) {
  const words = text.split(" ");
  const weights = words.map((w) => w.replace(/[^\p{L}\p{N}]/gu, "").length + 1.2);
  const total = weights.reduce((a, b) => a + b, 0);
  let t = start;
  const items = words.map((w, i) => {
    const dur = ((end - start) * weights[i]) / total;
    const item = { text: w, startMs: Math.round(t * 1000), endMs: Math.round((t + dur) * 1000), timestampMs: null, confidence: null };
    t += dur;
    return item;
  });
  items[items.length - 1].pageBreakAfter = true;
  captions.push(...items);
}
mkdirSync(join(ROOT, "src", "data"), { recursive: true });
writeFileSync(join(ROOT, "src", "data", "captions.json"), JSON.stringify(captions, null, 2));

const ts = (s) => {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60), ms = Math.round((s - Math.floor(s)) * 1000);
  const p = (n, l = 2) => String(n).padStart(l, "0");
  return `${p(h)}:${p(m)}:${p(sec)},${p(ms, 3)}`;
};
const srt = PHRASES.map(([a, b, text], i) => `${i + 1}\n${ts(a)} --> ${ts(b)}\n${text}\n`).join("\n");
mkdirSync(join(ROOT, "out"), { recursive: true });
writeFileSync(join(ROOT, "out", "motion-kit-reel.srt"), srt);
console.log(`captions.json: ${captions.length} palavras · SRT: ${PHRASES.length} blocos · fim ${PHRASES.at(-1)[1]}s`);
