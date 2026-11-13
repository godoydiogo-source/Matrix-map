import captionsJson from "./captions.json";
import { FPS } from "./theme";

// ---------------------------------------------------------------------------
// PONTO ÚNICO DE SINCRONIA
// Todos os tempos abaixo estão em segundos (legendas) ou frames (cenas/SFX).
// Quando a VO oficial (Voice Studio, voz Diogo v2) chegar, ajuste aqui.
// ---------------------------------------------------------------------------

/** Arquivo da narração dentro de /public. Placeholder silencioso até a VO oficial chegar. */
export const VO_FILE: string | null = "vo/vo-placeholder-silencio.mp3";
/** Volume da música sob a narração (0–1). */
export const MUSIC_VOLUME = 0.32;

export const sec = (s: number) => Math.round(s * FPS);

export type Caption = { start: number; end: number; text: string; hl: string[] };
export const CAPTIONS: Caption[] = captionsJson as Caption[];

/** Início de cada cena, em frames (30 fps). */
export const SCENES = {
  s1Hook: sec(0),
  s2Vazou: sec(9.0),
  s3MesmoDia: sec(19.5),
  s4Outros: sec(32.0),
  s5Precedente: sec(45.0),
  s6Pratica: sec(53.5),
  end: sec(63.0),
};
export const TOTAL_FRAMES = SCENES.end;

const dur = (a: keyof typeof SCENES, b: keyof typeof SCENES) => SCENES[b] - SCENES[a];
export const SCENE_DUR = {
  s1Hook: dur("s1Hook", "s2Vazou"),
  s2Vazou: dur("s2Vazou", "s3MesmoDia"),
  s3MesmoDia: dur("s3MesmoDia", "s4Outros"),
  s4Outros: dur("s4Outros", "s5Precedente"),
  s5Precedente: dur("s5Precedente", "s6Pratica"),
  s6Pratica: dur("s6Pratica", "end"),
};

/** Trocas internas de card (frames relativos ao início da cena). */
export const CUTS = {
  s3Card2: 156, // Microsoft 365 / Outlook
  s4Card1: 80, // Porto de Santos
  s4Card2: 256, // Cuiabá
  s6Card2: 110,
  s6Card3: 174,
};

/** Contadores: frame absoluto de início, duração e nº de ticks (SFX). */
export const COUNTERS = {
  milhoes: { start: SCENES.s1Hook + 132, dur: 48, ticks: 10 },
  pix: { start: SCENES.s3MesmoDia + 10, dur: 60, ticks: 12 },
  outlook: { start: SCENES.s3MesmoDia + CUTS.s3Card2 + 10, dur: 60, ticks: 14 },
  santos: { start: SCENES.s4Outros + CUTS.s4Card1 + 40, dur: 50, ticks: 8 },
  cm: { start: SCENES.s5Precedente + 10, dur: 70, ticks: 14 },
};

/** Fade final: tipografia e música. */
export const FADE_OUT_START = sec(62.2);

// --- SFX -------------------------------------------------------------------
export type Sfx = { frame: number; kind: "tick" | "whoosh" | "glitch" };

// inversa do ease-out quart: p = 1-(1-x)^4  =>  x = 1-(1-p)^(1/4)
const invOutQuart = (p: number) => 1 - Math.pow(1 - p, 0.25);

export const SFX: Sfx[] = (() => {
  const list: Sfx[] = [];
  // glitch curto (4–6 frames) só entre blocos temáticos
  for (const f of [SCENES.s2Vazou, SCENES.s3MesmoDia, SCENES.s4Outros, SCENES.s5Precedente, SCENES.s6Pratica]) {
    list.push({ frame: f - 2, kind: "glitch" });
  }
  // whoosh nas entradas de card
  for (const f of [
    SCENES.s1Hook + 12,
    SCENES.s2Vazou + 4,
    SCENES.s3MesmoDia + 2,
    SCENES.s3MesmoDia + CUTS.s3Card2,
    SCENES.s4Outros + CUTS.s4Card1,
    SCENES.s4Outros + CUTS.s4Card2,
    SCENES.s5Precedente + 4,
    SCENES.s6Pratica + 6,
    SCENES.s6Pratica + CUTS.s6Card2,
    SCENES.s6Pratica + CUTS.s6Card3,
  ]) {
    list.push({ frame: f, kind: "whoosh" });
  }
  // ticks nos contadores (espaçados em valor, sob a curva ease-out)
  for (const c of Object.values(COUNTERS)) {
    for (let k = 1; k <= c.ticks; k++) {
      list.push({ frame: Math.round(c.start + c.dur * invOutQuart(k / c.ticks)), kind: "tick" });
    }
  }
  return list.sort((a, b) => a.frame - b.frame);
})();

/** Frames de glitch (para o wrapper visual). */
export const GLITCH_FRAMES = SFX.filter((s) => s.kind === "glitch").map((s) => s.frame);
