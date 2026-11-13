// Sintetiza SFX originais e uma música de reserva (WAV 48 kHz, 16-bit) sem bibliotecas externas.
// Música: pulso tenso instrumental a 100 BPM. SFX: tick, whoosh, glitch.
import fs from "node:fs";
import path from "node:path";

const SR = 48000;
const out = path.resolve("public/audio");
fs.mkdirSync(out, { recursive: true });

function writeWav(file, chans) {
  const n = chans[0].length, nc = chans.length;
  const buf = Buffer.alloc(44 + n * nc * 2);
  buf.write("RIFF", 0); buf.writeUInt32LE(36 + n * nc * 2, 4); buf.write("WAVE", 8);
  buf.write("fmt ", 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(nc, 22);
  buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * nc * 2, 28); buf.writeUInt16LE(nc * 2, 32); buf.writeUInt16LE(16, 34);
  buf.write("data", 36); buf.writeUInt32LE(n * nc * 2, 40);
  let o = 44;
  for (let i = 0; i < n; i++) for (let c = 0; c < nc; c++) {
    const v = Math.max(-1, Math.min(1, chans[c][i]));
    buf.writeInt16LE(Math.round(v * 32767), o); o += 2;
  }
  fs.writeFileSync(path.join(out, file), buf);
  console.log("wrote", file, (n / SR).toFixed(2) + "s");
}

// PRNG determinístico
let seed = 1337;
const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const noise = () => rnd() * 2 - 1;

// Filtro passa-baixa de 1 polo
function lowpass(buf, cutoffFn) {
  let y = 0; const o = new Float32Array(buf.length);
  for (let i = 0; i < buf.length; i++) {
    const fc = typeof cutoffFn === "function" ? cutoffFn(i / buf.length) : cutoffFn;
    const a = 1 - Math.exp(-2 * Math.PI * fc / SR);
    y += a * (buf[i] - y); o[i] = y;
  }
  return o;
}
function highpass(buf, fc) { const lp = lowpass(buf, fc); const o = new Float32Array(buf.length); for (let i = 0; i < buf.length; i++) o[i] = buf[i] - lp[i]; return o; }
const env = (t, a, d) => (t < a ? t / a : Math.exp(-(t - a) / d));

// ---------- SFX ----------
{ // tick: clique curto e brilhante (para cada passo de contador)
  const n = Math.floor(SR * 0.07); const b = new Float32Array(n);
  for (let i = 0; i < n; i++) { const t = i / SR; b[i] = 0.9 * Math.sin(2 * Math.PI * 2400 * t) * Math.exp(-t * 90) + 0.25 * noise() * Math.exp(-t * 300); }
  writeWav("tick.wav", [b, b]);
}
{ // whoosh: ruído filtrado com varredura
  const n = Math.floor(SR * 0.55); const raw = new Float32Array(n);
  for (let i = 0; i < n; i++) { const t = i / n; raw[i] = noise() * Math.sin(Math.PI * t) ** 1.5; }
  const b = highpass(lowpass(raw, (p) => 300 + 6000 * Math.sin(Math.PI * p)), 150);
  const L = new Float32Array(n), R = new Float32Array(n);
  for (let i = 0; i < n; i++) { const p = i / n; L[i] = b[i] * 0.9 * (1 - p * 0.6); R[i] = b[i] * 0.9 * (0.4 + p * 0.6); }
  writeWav("whoosh.wav", [L, R]);
}
{ // glitch: rajadas de ruído e blips quadrados
  const n = Math.floor(SR * 0.2); const b = new Float32Array(n);
  let gate = 0, hold = 0, f = 900;
  for (let i = 0; i < n; i++) {
    if (hold-- <= 0) { gate = rnd() > 0.45 ? 1 : 0; hold = Math.floor(SR * (0.004 + rnd() * 0.02)); f = 300 + rnd() * 3000; }
    const t = i / SR; const sq = Math.sign(Math.sin(2 * Math.PI * f * t));
    b[i] = gate * (0.5 * sq + 0.5 * noise()) * 0.7 * (1 - i / n);
  }
  const o = lowpass(b, 7000);
  writeWav("glitch.wav", [o, o]);
}

// ---------- MÚSICA: 100 BPM, 66 s ----------
{
  const BPM = 100, beat = 60 / BPM, dur = 66; const n = Math.floor(SR * dur);
  const L = new Float32Array(n), R = new Float32Array(n);
  const bassNotes = [55.0, 55.0, 51.91, 58.27]; // A1 A1 G#1 A#1 — tenso, semitons
  const padHz = [110, 164.81, 220, 329.63]; // A2 E3 A3 E4
  // Pad: dentes de serra desafinados, filtro lento
  const pad = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR; let s = 0;
    for (const h of padHz) { for (const det of [-0.6, 0.6]) { const ph = ((t * (h + det)) % 1); s += (2 * ph - 1) * 0.12; } }
    pad[i] = s;
  }
  const padF = lowpass(pad, (p) => 350 + 500 * (0.5 + 0.5 * Math.sin(2 * Math.PI * p * 4)));
  for (let i = 0; i < n; i++) {
    const t = i / SR; const bIdx = Math.floor(t / beat); const tb = t - bIdx * beat; const bar = Math.floor(bIdx / 4);
    const bassHz = bassNotes[bar % 4];
    // kick a cada batida (um pouco mais forte no 1)
    const kickHz = 150 * Math.exp(-tb * 28) + 44;
    const kick = Math.sin(2 * Math.PI * kickHz * tb) * Math.exp(-tb * 9) * (bIdx % 4 === 0 ? 1 : 0.8);
    // sub bass em colcheias (gate)
    const eighth = (tb % (beat / 2)) / (beat / 2);
    const bassGate = eighth < 0.8 ? 1 : 0;
    const bass = Math.sin(2 * Math.PI * bassHz * t) * 0.35 * bassGate * (0.5 + 0.5 * Math.exp(-eighth * 5));
    // hi-hat em semicolcheias (ruído curto), acentos
    const six = tb % (beat / 4); const hat = noise() * Math.exp(-six * 220) * (Math.floor(tb / (beat / 4)) % 2 === 0 ? 0.08 : 0.045);
    // intro: só pad e hats nos primeiros 2 compassos; fade in geral curto
    const intro = Math.min(1, t / 1.5);
    const mixDrums = bar < 2 ? 0.35 : 1;
    const padLvl = 0.22 + 0.08 * Math.sin(2 * Math.PI * t / 8);
    let s = (kick * 0.8 + bass) * mixDrums + hat + padF[i] * padLvl;
    s *= intro;
    // leve "tensão": pulso de ruído a cada 2 compassos
    const bar2 = (t % (beat * 8)) / (beat * 8);
    if (bar2 > 0.97) s += noise() * 0.03 * (bar2 - 0.97) / 0.03;
    const sat = Math.tanh(s * 1.3) * 0.75;
    L[i] = sat + hat * 0.3; R[i] = sat - hat * 0.3;
  }
  // hats com highpass (aplica no sinal todo seria errado; aplica suavização final)
  writeWav("music.wav", [L, R]);
}
