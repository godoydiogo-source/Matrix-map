import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../theme";
import { easeOut, lin, snapIn } from "../components/anim";
import { Card, Mono, Title } from "../components/Card";

const CODE_LINES = [
  "<Sequence from={30}>",
  "  <Word spring>CADA</Word>",
  "  <Word spring>FRAME</Word>",
  "  <Word lit>É CÓDIGO</Word>",
  "</Sequence>",
];

export const Scene2Pain: React.FC = () => {
  const f = useCurrentFrame();

  // cartões ruins entram (0 / 25) e são empurrados para fora (105–128)
  const inA = snapIn(f, 0);
  const inB = snapIn(f, 25);
  const push = interpolate(f, [105, 128], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.55, 0.055, 0.675, 0.19) });

  // "fade chapado": opacidade linear sem easing, tipo parado
  const flat = Math.abs(((f / 40) % 2) - 1); // triângulo 0→1→0
  // modelo que erra o texto
  const wrong = f >= 70;

  // código que se desenha (125–175): caracteres digitados
  const typed = Math.floor(lin(f, 125, 50, [0, CODE_LINES.join("\n").length]));
  const codeDim = lin(f, 165, 20, [1, 0.35]);

  const words = ["CADA", "FRAME", "É CÓDIGO"];

  return (
    <AbsoluteFill>
      {/* Cartão A — Reel genérico */}
      <div style={{ position: "absolute", top: 300, left: 70, opacity: Math.min(1, inA * 1.5), scale: String(0.9 + 0.1 * inA), translate: `${-push * 1300}px ${(1 - inA) * 40}px`, rotate: `${-push * 8}deg` }}>
        <Card label="REEL GENÉRICO" width={450} height={560} accent={COLORS.violet}>
          <div style={{ position: "absolute", inset: 0, background: "#1b1a22" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Arial, Helvetica, sans-serif", fontSize: 54, color: "#9a98a3", opacity: 0.25 + 0.75 * flat }}>
            NOVIDADE
          </div>
          <Mono size={20} color={COLORS.dim} style={{ position: "absolute", bottom: 18, left: 0, right: 0, textAlign: "center" }}>
            fade · tipo parado
          </Mono>
        </Card>
      </div>

      {/* Cartão B — modelo de vídeo que erra o texto */}
      <div style={{ position: "absolute", top: 380, left: 560, opacity: Math.min(1, inB * 1.5), scale: String(0.9 + 0.1 * inB), translate: `${push * 1300}px ${(1 - inB) * 40}px`, rotate: `${push * 8}deg` }}>
        <Card label="MODELO DE VÍDEO" width={450} height={560} accent={COLORS.violet}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg,#2a2438,#171522)" }} />
          <div style={{ position: "absolute", top: 190, left: 0, right: 0, textAlign: "center", fontFamily: FONTS.title, fontWeight: 700, fontSize: 52, color: COLORS.text, letterSpacing: -1 }}>
            <span style={{ position: "relative", display: "inline-block", translate: wrong ? `${(f % 2) * 3}px 0px` : "0px 0px" }}>
              {wrong ? "LANÇAMNETO" : "LANÇAMENTO"}
              {wrong && <span style={{ position: "absolute", left: -6, right: -6, top: "50%", height: 5, backgroundColor: COLORS.violet, rotate: "-6deg" }} />}
            </span>
          </div>
          <Mono size={20} color={COLORS.dim} style={{ position: "absolute", bottom: 18, left: 0, right: 0, textAlign: "center" }}>
            {wrong ? "inventou o quadro · errou o texto" : "gerando quadro…"}
          </Mono>
        </Card>
      </div>

      {/* Frame que se desenha em código */}
      {f >= 125 && (
        <div style={{ position: "absolute", top: 380, left: 90, right: 90 }}>
          <Card label="FRAME" width={900} height={330} accent={COLORS.lime} style={{ opacity: easeOut(f, 125, 8) }}>
            <pre style={{ margin: 0, padding: "70px 34px 0", fontFamily: FONTS.mono, fontWeight: 500, fontSize: 32, lineHeight: 1.35, color: COLORS.text, opacity: codeDim, whiteSpace: "pre" }}>
              {CODE_LINES.join("\n").slice(0, typed)}
              <span style={{ color: COLORS.lime, opacity: f % 10 < 5 ? 1 : 0 }}>▍</span>
            </pre>
          </Card>
          {/* as palavras saltam das linhas para a tipografia cinética */}
          <div style={{ position: "absolute", top: 400, left: 0, right: 0, display: "flex", flexDirection: "column", gap: 2 }}>
            {words.map((w, i) => {
              const p = snapIn(f, 160 + i * 12);
              const isLast = i === words.length - 1;
              return (
                <Title key={w} size={isLast ? 128 : 112} color={isLast ? COLORS.lime : COLORS.text} style={{ opacity: Math.min(1, p * 1.6), translate: `${(1 - p) * -120}px ${(1 - p) * -200}px`, scale: String(0.6 + 0.4 * p), transformOrigin: "left center" }}>
                  {w}
                </Title>
              );
            })}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
