import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, EASE, FONTS } from "../theme";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

/** Entrada ease-out (translate + opacity + leve scale). `at` em frames relativos à cena. */
export const Enter: React.FC<{
  at: number;
  dur?: number;
  dy?: number;
  scaleFrom?: number;
  until?: number; // frame de saída (opcional)
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ at, dur = 14, dy = 36, scaleFrom = 0.96, until, style, children }) => {
  const f = useCurrentFrame();
  const t = f - at;
  if (t < 0) return null;
  const o = interpolate(t, [0, dur * 0.6], [0, 1], { ...clamp, easing: EASE.outQuart });
  const y = interpolate(t, [0, dur], [dy, 0], { ...clamp, easing: EASE.outQuart });
  const s = interpolate(t, [0, dur], [scaleFrom, 1], { ...clamp, easing: EASE.outQuart });
  let exit = 1, ey = 0;
  if (until !== undefined) {
    const e = f - (until - 8);
    exit = interpolate(e, [0, 8], [1, 0], { ...clamp, easing: EASE.inQuart });
    ey = interpolate(e, [0, 8], [0, -24], { ...clamp, easing: EASE.inQuart });
    if (f >= until) return null;
  }
  return (
    <div style={{ opacity: o * exit, transform: `translateY(${y + ey}px) scale(${s})`, transformOrigin: "center top", ...style }}>
      {children}
    </div>
  );
};

/** Tipografia cinética: palavras entram em cascata. */
export const Words: React.FC<{
  text: string;
  at: number;
  size: number;
  weight?: number;
  color?: string;
  mono?: boolean;
  stagger?: number;
  align?: "left" | "center";
  lineHeight?: number;
  letterSpacing?: number;
  hl?: string[];
  hlColor?: string;
  until?: number;
  style?: React.CSSProperties;
}> = ({ text, at, size, weight = 800, color = C.text, mono, stagger = 3, align = "center", lineHeight = 1.02, letterSpacing, hl = [], hlColor = C.accent, until, style }) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  if (until !== undefined && f >= until) return null;
  const words = text.split(" ");
  const exit = until !== undefined ? interpolate(f, [until - 6, until], [1, 0], clamp) : 1;
  return (
    <div
      style={{
        fontFamily: mono ? FONTS.mono : FONTS.title,
        fontWeight: weight,
        fontSize: size,
        lineHeight,
        color,
        textAlign: align,
        letterSpacing: letterSpacing ?? (size > 80 ? -size * 0.03 : -0.5),
        opacity: exit,
        ...style,
      }}
    >
      {words.map((w, i) => {
        const t = f - at - i * stagger;
        const o = interpolate(t, [0, 6], [0, 1], { ...clamp, easing: EASE.outQuart });
        const y = interpolate(t, [0, 10], [size * 0.35, 0], { ...clamp, easing: EASE.outExpo });
        const isHl = hl.some((h) => h.split(" ").includes(w.replace(/[.,;:]/g, "")) || h === w);
        return (
          <span key={i} style={{ display: "inline-block", opacity: o, transform: `translateY(${y}px)`, color: isHl ? hlColor : undefined, marginRight: size * 0.22 }}>
            {w}
          </span>
        );
      })}
    </div>
  );
};

/** Contador animado (sempre count-up, nunca estático). */
export const CountUp: React.FC<{
  from?: number;
  to: number;
  start: number; // frame relativo à cena
  dur: number;
  format: (v: number) => string;
  size: number;
  color?: string;
  weight?: number;
  style?: React.CSSProperties;
}> = ({ from = 0, to, start, dur, format, size, color = C.accent, weight = 700, style }) => {
  const f = useCurrentFrame();
  const t = f - start;
  if (t < 0) return null;
  const p = interpolate(t, [0, dur], [0, 1], { ...clamp, easing: EASE.outQuart });
  const v = from + (to - from) * p;
  // pequeno "pouso" ao terminar
  const pop = interpolate(t, [dur - 2, dur + 4, dur + 12], [1, 1.035, 1], clamp);
  const o = interpolate(t, [0, 6], [0, 1], clamp);
  return (
    <div
      style={{
        fontFamily: FONTS.mono,
        fontWeight: weight,
        fontSize: size,
        color,
        lineHeight: 1,
        letterSpacing: -size * 0.04,
        fontVariantNumeric: "tabular-nums",
        transform: `scale(${pop})`,
        transformOrigin: "left center",
        opacity: o,
        ...style,
      }}
    >
      {format(v)}
    </div>
  );
};

export const fmtInt = (v: number) => Math.round(v).toLocaleString("pt-BR");
export const fmtDec1 = (v: number) => (Math.round(v * 10) / 10).toFixed(1).replace(".", ",");
