import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, FONTS } from "./theme";
import { Background } from "./components/Background";
import { Rack } from "./components/Rack";
import { Mono, Title } from "./components/Card";

/** Capa / thumbnail 1080×1920 — mesma paleta da peça. */
export const Cover: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background />
      <Mono size={26} color={COLORS.violet} style={{ position: "absolute", top: 230, left: 0, right: 0, textAlign: "center", letterSpacing: 5 }}>
        // KIT OPEN SOURCE · OUTROS AUTORES
      </Mono>
      <div style={{ position: "absolute", top: 290, left: 70, right: 70, display: "flex", flexDirection: "column", gap: 6 }}>
        <Title size={280} color={COLORS.lime} style={{ lineHeight: 0.85 }}>20</Title>
        <Title size={74} color={COLORS.text} style={{ whiteSpace: "nowrap" }}>REPOSITÓRIOS</Title>
        <Title size={84} color={COLORS.text} style={{ marginTop: 28, whiteSpace: "nowrap" }}>MOTION NO</Title>
        <Title size={84} color={COLORS.lime} style={{ whiteSpace: "nowrap" }}>CLAUDE CODE</Title>
      </div>
      <div style={{ position: "absolute", top: 1010, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 16 }}>
        {["10 SKILLS", "4 MOTORES", "6 COMPLEMENTOS"].map((t) => (
          <div key={t} style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 28, letterSpacing: 2, color: COLORS.bg, backgroundColor: COLORS.lime, padding: "14px 20px", borderRadius: 6, borderTopLeftRadius: 0 }}>{t}</div>
        ))}
      </div>
      <div style={{ position: "absolute", top: 1150, left: 60 }}>
        <Rack labels litAll={0.35} slot={1} rowGap={18} />
      </div>
    </AbsoluteFill>
  );
};
