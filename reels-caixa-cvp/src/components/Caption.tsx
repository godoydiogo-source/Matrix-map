import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, EASE, FONTS, H, SAFE, W } from "../theme";
import { CAPTIONS, FADE_OUT_START, sec } from "../timing";

type Tok = { word: string; hl: boolean };

const tokenize = (text: string, hl: string[]): Tok[] => {
  const ranges: Array<[number, number]> = [];
  for (const h of hl) {
    let idx = text.indexOf(h);
    while (idx >= 0) {
      ranges.push([idx, idx + h.length]);
      idx = text.indexOf(h, idx + 1);
    }
  }
  const toks: Tok[] = [];
  const re = /\S+/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const a = m.index, b = a + m[0].length;
    toks.push({ word: m[0], hl: ranges.some(([x, y]) => a < y && b > x) });
  }
  return toks;
};

/** Legendas queimadas: uma frase por vez, entrada palavra a palavra, palavra-chave em ciano. */
export const Caption: React.FC = () => {
  const frame = useCurrentFrame();
  const cue = CAPTIONS.find((c) => frame >= sec(c.start) && frame < sec(c.end));
  if (!cue) return null;
  const start = sec(cue.start);
  const toks = tokenize(cue.text, cue.hl);
  const stagger = Math.min(2, 10 / toks.length);
  const globalFade = interpolate(frame, [FADE_OUT_START, FADE_OUT_START + 20], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        left: SAFE.side,
        width: W - SAFE.side * 2,
        bottom: SAFE.bottom + 40,
        minHeight: 200,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        opacity: globalFade,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.title,
          fontWeight: 700,
          fontSize: 54,
          lineHeight: 1.18,
          textAlign: "center",
          color: C.text,
          letterSpacing: -0.5,
          textShadow: "0 2px 18px rgba(0,0,0,0.85), 0 0 2px rgba(0,0,0,0.9)",
          padding: "0 8px",
        }}
      >
        {toks.map((t, i) => {
          const local = frame - start - i * stagger;
          const o = interpolate(local, [0, 7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.outQuart });
          const y = interpolate(local, [0, 9], [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE.outQuart });
          return (
            <span key={i} style={{ display: "inline-block", opacity: o, transform: `translateY(${y}px)`, color: t.hl ? C.accent : C.text, marginRight: 14 }}>
              {t.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export const CaptionHeight = 220 + SAFE.bottom;
export const CONTENT_BOTTOM = H - CaptionHeight - 40;
