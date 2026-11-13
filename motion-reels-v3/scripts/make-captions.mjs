// Fonte única de verdade do roteiro: frases com janela de tempo (s) → palavras com timing (peso por caracteres).
// Gera src/data/captions.json (legendas queimadas, palavra ativa) e out/motion-kit-reel.srt.
// Quando a VO real (Voice Studio, voz Diogo v2) chegar, ajuste só os tempos de início/fim de cada frase aqui e rode `npm run srt`.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// [início, fim, frase] — tempos medidos na VO oficial (public/vo/diogo-v2.wav, Voice Studio · Diogo v2).
export const PHRASES = [
  // CENA 1 — Hook
  [0.30, 1.80, "O Claude já escreve código."],
  [1.93, 3.44, "Falta ele dirigir o motion."],
  [3.57, 5.20, "Eu juntei 20 repositórios pra isso:"],
  [5.30, 7.14, "skills, motores e complementos,"],
  [7.16, 8.38, "prontos pro Claude Code."],
  // CENA 2 — Dor
  [8.63, 9.40, "Você pede um Reel"],
  [9.42, 10.55, "e o motion sai genérico."],
  [10.68, 11.95, "Ou um modelo inventa o quadro"],
  [11.97, 12.78, "e erra o texto."],
  [12.91, 13.95, "Aqui cada frame é código"],
  [14.05, 15.47, "e o Claude aprende o ofício."],
  // CENA 3 — Demo rápida
  [15.73, 17.32, "Remotion faz o vídeo em React."],
  [17.45, 18.93, "GSAP cuida das timelines."],
  [19.06, 20.93, "HyperFrames transforma HTML em MP4."],
  [21.06, 22.89, "Lottie leva a animação leve pra tela."],
  [23.02, 24.60, "E o Herk Edit Kit corta o silêncio"],
  [24.62, 25.54, "e monta o seu Reel."],
  // CENA 4 — Pulo do gato
  [25.80, 26.80, "Aí vem o pulo do gato:"],
  [26.85, 28.04, "o Product Launch Motion."],
  [28.17, 29.30, "Você cola o link do site"],
  [29.32, 30.62, "e sai um filme de lançamento,"],
  [30.64, 32.40, "com spring, cursor e som no beat."],
  // CENA 5 — Consolidação
  [32.65, 35.19, "São 10 skills, 4 motores e 6 complementos."],
  [35.32, 37.07, "Tudo open source, de outros autores."],
  [37.20, 38.57, "Eu só organizei o kit."],
  // CENA 6 — Facilidade
  [38.83, 40.25, "Pra começar: abre o Claude Code,"],
  [40.50, 41.75, "instala as skills da lista,"],
  [41.80, 43.38, "e descreve o vídeo que você quer."],
  // CENA 7 — CTA
  [43.64, 45.27, "Quer os 20 links, organizados?"],
  [45.40, 46.89, "Comenta CODE que eu te mando."],
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
