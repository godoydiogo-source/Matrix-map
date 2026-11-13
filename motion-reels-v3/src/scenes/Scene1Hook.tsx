import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../theme";
import { easeOut, lin, snapIn } from "../components/anim";
import { Title } from "../components/Card";
import { Kicker } from "../components/Marks";

const TILE_W = 150;
const TILE_H = 190;

/** Uma letra como módulo: tile escuro com canto vivo, letra mono. */
const LetterTile: React.FC<{ ch: string; progress: number; out: number; i: number; lit?: boolean }> = ({ ch, progress, out, i, lit }) => {
  const dir = i % 2 === 0 ? -1 : 1;
  return (
    <div
      style={{
        width: TILE_W,
        height: TILE_H,
        backgroundColor: COLORS.surface,
        border: `1px solid ${lit ? COLORS.accent : "#243039"}`,
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONTS.mono,
        fontWeight: 700,
        fontSize: 128,
        color: lit ? COLORS.accent : COLORS.text,
        boxShadow: lit ? "0 0 36px rgba(0,230,204,0.35)" : "0 14px 40px rgba(0,0,0,0.45)",
        opacity: Math.min(1, progress * 1.5) * (1 - out),
        scale: String(0.8 + 0.2 * progress),
        translate: `0px ${(1 - progress) * 60 + out * dir * 260}px`,
        rotate: `${out * dir * 14}deg`,
      }}
    >
      {ch}
    </div>
  );
};

export const Scene1Hook: React.FC = () => {
  const f = useCurrentFrame();
  const word1 = "CÓDIGO".split("");
  const word2 = "MOTION".split("");

  const showWord2 = f >= 78;
  const count = Math.round(lin(f, 125, 50, [0, 20]));
  const countIn = easeOut(f, 122, 10);
  const tags = ["SKILLS", "MOTORES", "COMPLEMENTOS"];

  return (
    <AbsoluteFill>
      {/* etiqueta discreta no topo da zona segura */}
      <Kicker opacity={easeOut(f, 6, 14)}>Kit · motion no Claude Code</Kicker>

      {/* palavra que se monta em módulos */}
      <div style={{ position: "absolute", top: 560, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 14 }}>
        {!showWord2 &&
          word1.map((ch, i) => (
            <LetterTile key={`a${i}`} ch={ch} i={i} progress={snapIn(f, i * 5)} out={easeOut(f, 58 + i * 3, 16)} />
          ))}
        {showWord2 &&
          word2.map((ch, i) => (
            <LetterTile key={`b${i}`} ch={ch} i={i} progress={snapIn(f, 80 + i * 5)} out={0} lit={f >= 112} />
          ))}
      </div>

      {/* contador até 20 */}
      <div style={{ position: "absolute", top: 800, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, opacity: countIn, translate: `0px ${(1 - countIn) * 40}px` }}>
        <Title size={320} color={COLORS.text} style={{ fontVariantNumeric: "tabular-nums", lineHeight: 0.9 }}>
          {count}
        </Title>
        <Title size={64} color={COLORS.accent} style={{ opacity: lin(f, 150, 10) }}>
          REPOSITÓRIOS
        </Title>
      </div>

      {/* três etiquetas */}
      <div style={{ position: "absolute", top: 1240, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 18 }}>
        {tags.map((t, i) => {
          const p = snapIn(f, 185 + i * 10);
          return (
            <div
              key={t}
              style={{
                fontFamily: FONTS.mono,
                fontWeight: 700,
                fontSize: 26,
                letterSpacing: 4,
                color: COLORS.accent,
                border: `1px solid ${COLORS.accentDim}`,
                backgroundColor: "rgba(0,230,204,0.08)",
                padding: "14px 22px",
                borderRadius: 999,
                opacity: Math.min(1, p * 1.5),
                scale: String(0.7 + 0.3 * p),
                translate: `0px ${(1 - p) * 30}px`,
              }}
            >
              {t}
            </div>
          );
        })}
      </div>

      {/* fade-in global de 6 frames no início */}
      <AbsoluteFill style={{ backgroundColor: COLORS.bg, opacity: interpolate(f, [0, 6], [1, 0], { extrapolateRight: "clamp" }), pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};
