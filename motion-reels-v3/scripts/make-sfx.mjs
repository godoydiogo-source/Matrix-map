// Gera SFX curtos de UI (sintetizados, sem dependências) em public/sfx/*.wav — 48 kHz, mono, 16-bit.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SR = 48000;
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "sfx");
mkdirSync(OUT, { recursive: true });

const wav = (samples) => {
  const n = samples.length;
  const buf = Buffer.alloc(44 + n * 2);
  buf.write("RIFF", 0); buf.writeUInt32LE(36 + n * 2, 4); buf.write("WAVE", 8);
  buf.write("fmt ", 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34);
  buf.write("data", 36); buf.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) buf.writeInt16LE(Math.max(-1, Math.min(1, samples[i])) * 32767, 44 + i * 2);
  return buf;
};
let seed = 7;
const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296 * 2 - 1; };
const env = (t, a, d) => (t < a ? t / a : Math.exp(-(t - a) / d));
const make = (dur, fn) => { const n = Math.floor(SR * dur); const s = new Float32Array(n); for (let i = 0; i < n; i++) s[i] = fn(i / SR, i); return s; };
const normalize = (s, peak = 0.8) => { let m = 0; for (const v of s) m = Math.max(m, Math.abs(v)); const g = m ? peak / m : 1; return s.map((v) => v * g); };
const lowpass = (s, cutoffFn) => { let y = 0; return s.map((v, i) => { const c = cutoffFn(i / SR); const a = 1 - Math.exp(-2 * Math.PI * c / SR); y += a * (v - y); return y; }); };
const highpass = (s, cut) => { const lp = lowpass(s, () => cut); return s.map((v, i) => v - lp[i]); };

const sfx = {
  // módulo encaixa no rack: thud grave + click
  snap: () => normalize(make(0.22, (t) => {
    const f = 190 * Math.exp(-t * 18) + 55;
    const body = Math.sin(2 * Math.PI * f * t) * env(t, 0.002, 0.045);
    const click = (t < 0.006 ? rnd() * (1 - t / 0.006) : 0) * 0.6;
    return body * 0.9 + click;
  })),
  // tick de contador
  tick: () => normalize(make(0.06, (t) => Math.sin(2 * Math.PI * 1800 * t) * env(t, 0.001, 0.012) + (t < 0.002 ? rnd() * 0.4 : 0)), 0.5),
  // whoosh: ruído com filtro varrendo
  whoosh: () => normalize(highpass(lowpass(make(0.42, (t) => rnd() * Math.sin(Math.PI * Math.min(1, t / 0.42)) ** 1.5), (t) => 400 + 6000 * Math.sin(Math.PI * t / 0.42)), 180), 0.55),
  // clique de cursor
  click: () => normalize(make(0.05, (t) => Math.sin(2 * Math.PI * 2600 * t) * env(t, 0.0008, 0.006) + (t < 0.0025 ? rnd() * 0.8 : 0)), 0.6),
  // tecla digitando
  type: () => normalize(make(0.045, (t) => Math.sin(2 * Math.PI * 1200 * t) * env(t, 0.001, 0.008) + (t < 0.0015 ? rnd() * 0.7 : 0)), 0.45),
  // flash lima: estalo brilhante curtíssimo
  flash: () => normalize(highpass(make(0.09, (t) => rnd() * env(t, 0.001, 0.02)), 2500), 0.35),
  // "send": chime de dois tons
  send: () => normalize(make(0.5, (t) => (Math.sin(2 * Math.PI * 660 * t) * env(t, 0.004, 0.09) + (t > 0.09 ? Math.sin(2 * Math.PI * 990 * (t - 0.09)) * env(t - 0.09, 0.004, 0.16) : 0))), 0.6),
  // pulso no beat (kick macio)
  pulse: () => normalize(make(0.18, (t) => Math.sin(2 * Math.PI * (70 * Math.exp(-t * 14) + 40) * t) * env(t, 0.003, 0.06)), 0.7),
  // dock: rack acopla no slot (grave + metálico)
  dock: () => normalize(make(0.35, (t) => Math.sin(2 * Math.PI * (120 * Math.exp(-t * 10) + 48) * t) * env(t, 0.004, 0.09) + Math.sin(2 * Math.PI * 2200 * t) * env(t, 0.001, 0.02) * 0.4 + (t < 0.004 ? rnd() * 0.5 : 0))),
  // corte seco de áudio (Herk)
  cut: () => normalize(make(0.08, (t) => (t < 0.003 ? rnd() : 0) + Math.sin(2 * Math.PI * 900 * t) * env(t, 0.0005, 0.01)), 0.5),
  // "pop" para texto que entra
  pop: () => normalize(make(0.12, (t) => Math.sin(2 * Math.PI * (520 * Math.exp(-t * 20) + 240) * t) * env(t, 0.002, 0.03)), 0.5),
};
for (const [name, fn] of Object.entries(sfx)) writeFileSync(join(OUT, `${name}.wav`), wav(fn()));
// Placeholder silencioso de narração (48 s). Substituir por vo/diogo-v2.wav gerado no Voice Studio.
const VO = join(OUT, "..", "vo");
mkdirSync(VO, { recursive: true });
writeFileSync(join(VO, "vo-placeholder.wav"), wav(new Float32Array(SR * 48)));
console.log("SFX gerados:", Object.keys(sfx).join(", "), "+ vo/vo-placeholder.wav");
