import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../theme";
import { lin, snapIn } from "../components/anim";
import { Title } from "../components/Card";
import { Check, Kicker } from "../components/Marks";

const STEPS = ["Abre o Claude Code", "Instala as skills da lista", "Descreve o vídeo que você quer"];

export const Scene6Steps: React.FC = () => {
  const f = useCurrentFrame();
  const rail = lin(f, 4, 80);
  return (
    <AbsoluteFill>
      <Kicker opacity={lin(f, 0, 8)}>Na prática</Kicker>
      {/* trilho vertical */}
      <div style={{ position: "absolute", top: 330, left: 132, width: 2, height: 760 * rail, backgroundColor: COLORS.accentDim, opacity: 0.5 }} />
      {STEPS.map((s, i) => {
        const p = snapIn(f, 6 + i * 46);
        return (
          <div key={s} style={{ position: "absolute", top: 300 + i * 290, left: 90, right: 90, display: "flex", alignItems: "center", gap: 28, opacity: Math.min(1, p * 1.5), scale: String(0.9 + 0.1 * p), translate: `${(1 - p) * 80}px 0px`, transformOrigin: "left center" }}>
            <div style={{ width: 124, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, flex: "none" }}>
              <Check size={76} p={p} />
              <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 24, letterSpacing: 3, color: COLORS.accent }}>0{i + 1}</div>
            </div>
            <div style={{ flex: 1, backgroundColor: COLORS.surface, border: `1px solid #243039`, borderRadius: 16, padding: "34px 36px", minHeight: 180, display: "flex", alignItems: "center" }}>
              <Title size={60} color={COLORS.text} style={{ lineHeight: 1.05 }}>{s}</Title>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
