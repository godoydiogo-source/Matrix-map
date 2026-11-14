import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, FONTS } from "./theme";
import { Background } from "./components/Background";
import { Rack } from "./components/Rack";
import { Title } from "./components/Card";
import { Kicker } from "./components/Marks";

/** Capa / thumbnail 1080×1920 — mesma paleta da peça. */
export const Cover: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background />
      <Kicker top={210}>Kit open source · outros autores</Kicker>
      <div style={{ position: "absolute", top: 290, left: 70, right: 70, display: "flex", flexDirection: "column", gap: 6 }}>
        <Title size={280} color={COLORS.text} style={{ lineHeight: 0.85 }}>20</Title>
        <Title size={74} color={COLORS.accent} style={{ whiteSpace: "nowrap" }}>REPOSITÓRIOS</Title>
        <Title size={84} color={COLORS.text} style={{ marginTop: 28, whiteSpace: "nowrap" }}>MOTION NO</Title>
        <Title size={84} color={COLORS.text} style={{ whiteSpace: "nowrap" }}>CLAUDE CODE</Title>
      </div>
      <div style={{ position: "absolute", top: 1010, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 16 }}>
        {["10 SKILLS", "4 MOTORES", "6 COMPLEMENTOS"].map((t) => (
          <div key={t} style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 26, letterSpacing: 3, color: COLORS.accent, border: `1px solid ${COLORS.accentDim}`, backgroundColor: "rgba(0,230,204,0.08)", padding: "14px 20px", borderRadius: 999 }}>{t}</div>
        ))}
      </div>
      <div style={{ position: "absolute", top: 1150, left: 60 }}>
        <Rack labels litAll={0.35} slot={1} rowGap={18} />
      </div>
    </AbsoluteFill>
  );
};
