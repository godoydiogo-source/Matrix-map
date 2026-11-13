import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { C, H, W } from "../theme";
import { GLITCH_FRAMES } from "../timing";

const GLITCH_LEN = 5;

/** Glitch curto (5 frames) só entre blocos temáticos: fatias deslocadas + barras finas. */
export const GlitchWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const f = useCurrentFrame();
  const g = GLITCH_FRAMES.find((s) => f >= s && f < s + GLITCH_LEN);
  if (g === undefined) return <AbsoluteFill>{children}</AbsoluteFill>;
  const k = f - g;
  const slices = [0, 1, 2].map((i) => {
    const y1 = random(`g${g}-${k}-${i}-a`) * 0.85;
    const h = 0.04 + random(`g${g}-${k}-${i}-b`) * 0.12;
    const dx = (random(`g${g}-${k}-${i}-c`) - 0.5) * 70;
    return { top: y1 * 100, bottom: Math.max(0, (1 - y1 - h) * 100), dx };
  });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ filter: "contrast(1.05)" }}>{children}</AbsoluteFill>
      {slices.map((s, i) => (
        <AbsoluteFill key={i} style={{ clipPath: `inset(${s.top}% 0 ${s.bottom}% 0)`, transform: `translateX(${s.dx}px)`, filter: i % 2 ? "hue-rotate(140deg)" : "hue-rotate(-40deg)", opacity: 0.9 }}>
          {children}
        </AbsoluteFill>
      ))}
      <svg width={W} height={H} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={0} y={random(`bar${g}-${k}-${i}`) * H} width={W} height={2 + random(`bh${g}-${k}-${i}`) * 4} fill={i % 2 ? C.accent : C.alert} opacity={0.35} />
        ))}
      </svg>
    </AbsoluteFill>
  );
};
