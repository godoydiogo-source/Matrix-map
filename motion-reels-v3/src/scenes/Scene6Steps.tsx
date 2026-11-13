import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../theme";
import { lin, snapIn } from "../components/anim";
import { Mono, Title } from "../components/Card";

const STEPS = ["Abre o Claude Code", "Instala as skills da lista", "Descreve o vídeo que você quer"];

export const Scene6Steps: React.FC = () => {
  const f = useCurrentFrame();
  const rail = lin(f, 4, 80);
  return (
    <AbsoluteFill>
      <Mono size={24} color={COLORS.violet} style={{ position: "absolute", top: 200, left: 0, right: 0, textAlign: "center", letterSpacing: 4, opacity: lin(f, 0, 8) }}>
        PRA COMEÇAR
      </Mono>
      {/* trilho vertical */}
      <div style={{ position: "absolute", top: 330, left: 150, width: 4, height: 760 * rail, backgroundColor: COLORS.violet, opacity: 0.6 }} />
      {STEPS.map((s, i) => {
        const p = snapIn(f, 6 + i * 34);
        return (
          <div key={s} style={{ position: "absolute", top: 300 + i * 290, left: 90, right: 90, display: "flex", alignItems: "center", gap: 28, opacity: Math.min(1, p * 1.5), scale: String(0.9 + 0.1 * p), translate: `${(1 - p) * 80}px 0px`, transformOrigin: "left center" }}>
            <div style={{ width: 124, height: 124, flex: "none", backgroundColor: COLORS.lime, borderRadius: 10, borderTopLeftRadius: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONTS.mono, fontWeight: 700, fontSize: 56, color: COLORS.bg }}>
              0{i + 1}
            </div>
            <div style={{ flex: 1, backgroundColor: COLORS.surface, border: `2px solid ${COLORS.line}`, borderRadius: 10, borderTopLeftRadius: 0, padding: "34px 36px", minHeight: 180, display: "flex", alignItems: "center" }}>
              <Title size={60} color={COLORS.text} style={{ lineHeight: 1.05 }}>{s}</Title>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
