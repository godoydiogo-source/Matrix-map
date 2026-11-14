import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../theme";
import { easeInOut, easeOut, lin, snapIn } from "../components/anim";
import { Mono, Title } from "../components/Card";
import { Rack } from "../components/Rack";
import { Kicker } from "../components/Marks";

export const Scene5Consolidate: React.FC = () => {
  const f = useCurrentFrame();
  const nums = [
    { n: 10, label: "SKILLS" },
    { n: 4, label: "MOTORES" },
    { n: 6, label: "COMPLEMENTOS" },
  ];
  // pulso único em todos os módulos (92–118)
  const pulse = f >= 92 && f < 118 ? Math.sin(((f - 92) / 26) * Math.PI) : 0;
  const slot = easeOut(f, 62, 14);
  const dock = easeInOut(f, 84, 10, [0, 1]); // rack acopla no slot
  const seal1 = snapIn(f, 100);
  const seal2 = snapIn(f, 138);

  return (
    <AbsoluteFill>
      <Kicker opacity={easeOut(f, 0, 8)}>O kit · 20 repositórios</Kicker>
      {/* 10 / 4 / 6 em count-up */}
      <div style={{ position: "absolute", top: 240, left: 60, right: 60, display: "flex", justifyContent: "space-between" }}>
        {nums.map((x, i) => {
          const start = 10 + i * 8;
          const p = easeOut(f, start, 10);
          const v = Math.round(lin(f, start, 30, [0, x.n]));
          return (
            <div key={x.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: p, translate: `0px ${(1 - p) * 30}px`, width: 320 }}>
              <Title size={150} color={COLORS.text} style={{ fontVariantNumeric: "tabular-nums" }}>{v}</Title>
              <Mono size={22} color={COLORS.accent} style={{ letterSpacing: 5, marginTop: 6 }}>{x.label}</Mono>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", top: 500, left: 60, translate: `0px ${dock * 18}px` }}>
        <Rack
          labels
          litAll={pulse}
          slot={slot}
          progressOf={(_r, i) => snapIn(f, 4 + i * 2.5)}
        />
      </div>

      {/* selos tipográficos */}
      <div style={{ position: "absolute", top: 1090, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 26, letterSpacing: 5, color: COLORS.accent, border: `1px solid ${COLORS.accentDim}`, backgroundColor: "rgba(0,230,204,0.08)", padding: "16px 28px", borderRadius: 999, opacity: Math.min(1, seal1 * 1.5), scale: String(0.9 + 0.1 * seal1) }}>
          OPEN SOURCE · OUTROS AUTORES
        </div>
        <Title size={60} color={COLORS.text} style={{ whiteSpace: "nowrap", opacity: Math.min(1, seal2 * 1.5), scale: String(0.9 + 0.1 * seal2), translate: `0px ${(1 - seal2) * 30}px`, textAlign: "center" }}>
          EU ORGANIZEI O KIT
        </Title>
      </div>
    </AbsoluteFill>
  );
};
