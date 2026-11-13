import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, SCENES, VO_FILE } from "./theme";
import { Background } from "./components/Background";
import { Captions } from "./components/Captions";
import { Flash } from "./components/Flash";
import { Cue, Sfx } from "./components/Sfx";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Pain } from "./scenes/Scene2Pain";
import { Scene3Demo } from "./scenes/Scene3Demo";
import { Scene4Climax } from "./scenes/Scene4Climax";
import { Scene5Consolidate } from "./scenes/Scene5Consolidate";
import { Scene6Steps } from "./scenes/Scene6Steps";
import { Scene7Cta } from "./scenes/Scene7Cta";

const range = (from: number, to: number, step: number) => {
  const out: number[] = [];
  for (let x = from; x < to; x += step) out.push(x);
  return out;
};

/** Cues de SFX em frames absolutos, no ritmo dos cortes. */
const buildCues = (fps: number): Cue[] => {
  const s = (sec: number) => Math.round(sec * fps);
  const S1 = s(SCENES.hook[0]), S2 = s(SCENES.pain[0]), S3 = s(SCENES.demo[0]), S4 = s(SCENES.climax[0]), S5 = s(SCENES.consolidate[0]), S6 = s(SCENES.steps[0]), S7 = s(SCENES.cta[0]);
  const cues: Cue[] = [];
  const add = (at: number, name: string, vol?: number) => cues.push({ at, name, vol });

  // flash lima nas viradas de bloco
  for (const b of [S2, S3, S4, S5, S6, S7]) add(b, "flash", 0.45);

  // CENA 1 — letras encaixam, desencaixam, reencaixam; contador; etiquetas
  for (let i = 0; i < 6; i++) add(S1 + i * 5, "snap", 0.7);
  add(S1 + 60, "whoosh", 0.6);
  for (let i = 0; i < 6; i++) add(S1 + 80 + i * 5, "snap", 0.7);
  for (const t of range(125, 176, 5)) add(S1 + t, "tick", 0.35);
  for (let i = 0; i < 3; i++) add(S1 + 185 + i * 10, "pop", 0.6);

  // CENA 2 — cartões ruins, empurrão, código digitando, palavras saltam
  add(S2 + 0, "pop", 0.5);
  add(S2 + 25, "pop", 0.5);
  add(S2 + 70, "cut", 0.5);
  add(S2 + 105, "whoosh", 0.8);
  for (const t of range(126, 174, 4)) add(S2 + t, "type", 0.28);
  for (let i = 0; i < 3; i++) add(S2 + 160 + i * 12, "snap", 0.7);

  // CENA 3 — cinco módulos encaixam; mini-demos
  for (let i = 0; i < 5; i++) add(S3 + i * 66, "snap", 0.85);
  for (const t of range(4, 30, 4)) add(S3 + t, "type", 0.22); // Remotion
  add(S3 + 26, "click", 0.6);
  for (const m of [0.12, 0.38, 0.64, 0.9]) add(S3 + 66 + Math.round(8 + m * 50), "pulse", 0.6); // GSAP
  for (const t of range(4, 26, 4)) add(S3 + 132 + t, "type", 0.22); // HyperFrames
  add(S3 + 132 + 30, "whoosh", 0.5);
  add(S3 + 132 + 52, "pop", 0.6);
  for (const t of range(4, 24, 4)) add(S3 + 198 + t, "type", 0.22); // Lottie
  add(S3 + 264 + 28, "cut", 0.7); // Herk
  add(S3 + 264 + 40, "whoosh", 0.4);

  // CENA 4 — módulo avança, URL digitada, enter, cursor clica, filme pousa, beats
  add(S4 + 0, "whoosh", 0.6);
  add(S4 + 12, "snap", 0.8);
  for (const t of range(36, 78, 3)) add(S4 + t, "type", 0.3);
  add(S4 + 80, "pulse", 0.6);
  add(S4 + 82, "snap", 0.6);
  add(S4 + 128, "click", 0.9);
  add(S4 + 134, "whoosh", 0.7);
  add(S4 + 142, "dock", 0.6);
  for (let i = 0; i < 5; i++) add(S4 + 150 + i * 15, "pulse", 0.75);
  for (let i = 0; i < 3; i++) add(S4 + 158 + i * 18, "pop", 0.5);

  // CENA 5 — 20 módulos encaixam, count-up, dock, pulso, selos
  for (let i = 0; i < 20; i += 2) add(S5 + 4 + Math.round(i * 2.5), "snap", 0.45);
  for (const t of range(10, 46, 5)) add(S5 + t, "tick", 0.3);
  add(S5 + 86, "dock", 0.9);
  add(S5 + 94, "pulse", 0.7);
  add(S5 + 100, "pop", 0.6);
  add(S5 + 138, "snap", 0.8);

  // CENA 6 — três passos
  for (let i = 0; i < 3; i++) add(S6 + 6 + i * 34, "snap", 0.8);

  // CENA 7 — digita CODE, DM chega, card final + send
  for (let i = 0; i < 4; i++) add(S7 + 4 + i * 5, "type", 0.5);
  add(S7 + 24, "pop", 0.6);
  add(S7 + 34, "whoosh", 0.5);
  for (let i = 0; i < 3; i++) add(S7 + 40 + i * 9, "tick", 0.4);
  add(S7 + 80, "snap", 0.8);
  add(S7 + 104, "send", 0.9);
  return cues;
};

const EndFade: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return <AbsoluteFill style={{ backgroundColor: "#000", opacity: interpolate(frame, [durationInFrames - 12, durationInFrames - 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), pointerEvents: "none" }} />;
};

export const MotionKitReel: React.FC = () => {
  const { fps } = useVideoConfig();
  const s = (sec: number) => Math.round(sec * fps);
  const seq = (k: keyof typeof SCENES) => ({ from: s(SCENES[k][0]), durationInFrames: s(SCENES[k][1] - SCENES[k][0]) });
  const flashes = [SCENES.pain, SCENES.demo, SCENES.climax, SCENES.consolidate, SCENES.steps, SCENES.cta].map((r) => s(r[0]));

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <Background />

      <Sequence name="1 Hook" {...seq("hook")}><Scene1Hook /></Sequence>
      <Sequence name="2 Dor" {...seq("pain")}><Scene2Pain /></Sequence>
      <Sequence name="3 Demo rápida" {...seq("demo")}><Scene3Demo /></Sequence>
      <Sequence name="4 Pulo do gato" {...seq("climax")}><Scene4Climax /></Sequence>
      <Sequence name="5 Consolidação" {...seq("consolidate")}><Scene5Consolidate /></Sequence>
      <Sequence name="6 Facilidade" {...seq("steps")}><Scene6Steps /></Sequence>
      <Sequence name="7 CTA" {...seq("cta")}><Scene7Cta /></Sequence>

      {/* legendas queimadas (palavra ativa em lima) — somem junto com o card final */}
      <Captions hideAfterFrame={s(SCENES.cta[0]) + 80} />

      <Flash at={flashes} />

      {/* Narração oficial: Voice Studio · voz Diogo v2 → substituir VO_FILE em src/theme.ts */}
      <Sequence name="VO (Diogo v2 — placeholder)" from={0}>
        <Audio src={staticFile(VO_FILE)} volume={1} />
      </Sequence>

      <Sfx cues={buildCues(fps)} />
      <EndFade />
    </AbsoluteFill>
  );
};
