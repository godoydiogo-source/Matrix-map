import { Easing, interpolate, spring } from "remotion";

export const FPS = 30;

/** Encaixe de módulo: spring com overshoot mínimo. 0 → 1. */
export const snapIn = (frame: number, from: number, fps = FPS) =>
  spring({ frame: frame - from, fps, config: { damping: 14, stiffness: 190, mass: 0.7 }, durationInFrames: 22 });

/** Entrada firme sem bounce (ease-out quart). */
export const easeOut = (frame: number, from: number, dur: number, out: [number, number] = [0, 1]) =>
  interpolate(frame, [from, from + dur], out, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.165, 0.84, 0.44, 1),
  });

/** Movimento de reposição (ease-in-out cubic). */
export const easeInOut = (frame: number, from: number, dur: number, out: [number, number] = [0, 1]) =>
  interpolate(frame, [from, from + dur], out, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.645, 0.045, 0.355, 1),
  });

/** Linear com clamp — progresso, contadores. */
export const lin = (frame: number, from: number, dur: number, out: [number, number] = [0, 1]) =>
  interpolate(frame, [from, from + dur], out, { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

/** 1 enquanto estiver dentro do intervalo [a, b). */
export const within = (frame: number, a: number, b: number) => (frame >= a && frame < b ? 1 : 0);

export const sec = (s: number) => Math.round(s * FPS);
