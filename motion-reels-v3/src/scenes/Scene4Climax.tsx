import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../theme";
import { easeInOut, easeOut, lin, snapIn } from "../components/anim";
import { Card, Mono, Title } from "../components/Card";
import { Module } from "../components/Module";
import { Kicker } from "../components/Marks";

const URL_TEXT = "https://demo-produto.app";

/** Cursor genérico (seta) desenhado em CSS. */
const Cursor: React.FC<{ x: number; y: number; down: boolean }> = ({ x, y, down }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 0, height: 0, borderLeft: "16px solid transparent", borderRight: "16px solid transparent", borderBottom: `44px solid ${COLORS.text}`, rotate: "-32deg", scale: down ? "0.85" : "1", filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.6))" }} />
);

export const Scene4Climax: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 0–30 módulo avança ao primeiro plano
  const fwd = snapIn(f, 0);
  // 30–80 barra de endereço + digitação
  const barIn = easeOut(f, 28, 12);
  const typed = Math.floor(lin(f, 36, 42, [0, URL_TEXT.length]));
  // 80 enter → cartão "site"
  const siteIn = snapIn(f, 82);
  // cursor 95–128, clique em 128
  const cx = easeInOut(f, 96, 30, [820, 540]);
  const cy = easeInOut(f, 96, 30, [1160, 870]);
  const down = f >= 127 && f < 134;
  const pressed = spring({ frame: f - 128, fps, config: { damping: 12, stiffness: 300 }, durationInFrames: 14 });
  // 132+ morph para filme de lançamento
  const film = easeInOut(f, 132, 22);
  const titleSpring = spring({ frame: f - 140, fps, config: { damping: 10, stiffness: 120, mass: 0.9 } });
  const count = Math.round(lin(f, 150, 40, [0, 60]));
  const beatStart = 150;
  const beats = [0, 1, 2, 3, 4].map((i) => beatStart + i * 15); // 120 BPM
  const chips = ["spring", "cursor", "SFX no beat"];

  return (
    <AbsoluteFill>
      <Kicker color={COLORS.accent} opacity={fwd}>O pulo do gato</Kicker>
      <div style={{ position: "absolute", top: 260, left: 0, right: 0, display: "flex", justifyContent: "center", scale: String(0.4 + 0.6 * fwd), opacity: Math.min(1, fwd * 1.4), translate: `0px ${(1 - fwd) * 500}px` }}>
        <Module name="Product Launch Motion" index={6} lit width={760} height={110} fontSize={40} />
      </div>

      {/* barra de endereço genérica */}
      <div style={{ position: "absolute", top: 420, left: 90, right: 90, height: 96, borderRadius: 48, backgroundColor: COLORS.surface, border: `1px solid #243039`, display: "flex", alignItems: "center", padding: "0 34px", gap: 20, opacity: barIn, translate: `0px ${(1 - barIn) * 30}px` }}>
        <div style={{ width: 22, height: 22, borderRadius: "50%", border: `3px solid ${COLORS.accentDim}` }} />
        <Mono size={34} color={COLORS.text} style={{ letterSpacing: -0.5 }}>
          {URL_TEXT.slice(0, typed)}
          <span style={{ color: COLORS.accent, opacity: f < 82 && f % 8 < 4 ? 1 : 0 }}>▍</span>
        </Mono>
        <div style={{ marginLeft: "auto", fontFamily: FONTS.mono, fontSize: 22, color: f >= 80 ? COLORS.accent : COLORS.dim, fontWeight: 700 }}>{f >= 80 ? "↵ lido" : "↵"}</div>
      </div>

      {/* cartão que morfa: site → filme */}
      {f >= 82 && (
        <div style={{ position: "absolute", top: 560, left: 90, opacity: Math.min(1, siteIn * 1.5), scale: String(0.94 + 0.06 * siteIn), translate: `0px ${(1 - siteIn) * 60}px` }}>
          <Card label={film > 0.5 ? "Filme de lançamento" : "Site"} width={900} height={700} accent={film > 0.5 ? COLORS.accent : COLORS.muted}>
            {/* estado site */}
            <div style={{ position: "absolute", inset: 0, opacity: 1 - film, padding: "110px 60px" }}>
              <div style={{ width: 160, height: 18, borderRadius: 9, backgroundColor: COLORS.line }} />
              <Title size={64} style={{ marginTop: 40 }}>Demo Produto</Title>
              <Mono size={26} color={COLORS.dim} style={{ marginTop: 16 }}>produto fictício de demonstração</Mono>
              <div style={{ marginTop: 70, display: "inline-flex", padding: "22px 44px", borderRadius: 12, border: `2px solid ${COLORS.accent}`, fontFamily: FONTS.mono, fontWeight: 700, fontSize: 36, color: COLORS.accent, scale: String(1 - 0.08 * pressed * (1 - film)) }}>
                Começar
              </div>
            </div>
            {/* estado filme */}
            <div style={{ position: "absolute", inset: 0, opacity: film, background: "radial-gradient(circle at 50% 42%, rgba(0,230,204,0.14), rgba(11,19,25,0) 60%)" }}>
              {beats.map((b) => {
                const p = lin(f, b, 28);
                if (f < b) return null;
                return <div key={b} style={{ position: "absolute", left: 450 - 90, top: 300 - 90, width: 180, height: 180, borderRadius: "50%", border: `4px solid ${COLORS.accent}`, scale: String(1 + p * 2.6), opacity: (1 - p) * 0.9 }} />;
              })}
              <div style={{ position: "absolute", top: 180, left: 0, right: 0, textAlign: "center", scale: String(0.5 + 0.5 * titleSpring), opacity: Math.min(1, titleSpring * 1.4) }}>
                <Title size={150} color={COLORS.text}>DEMO</Title>
                <Mono size={24} color={COLORS.dim} style={{ marginTop: 6 }}>produto fictício · demonstração</Mono>
              </div>
              <div style={{ position: "absolute", top: 440, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "baseline", gap: 16, opacity: lin(f, 150, 8) }}>
                <Title size={110} color={COLORS.accent} style={{ fontVariantNumeric: "tabular-nums" }}>{count}</Title>
                <Mono size={30} color={COLORS.text}>fps · motion blur</Mono>
              </div>
              <div style={{ position: "absolute", bottom: 40, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 16 }}>
                {chips.map((c, i) => {
                  const p = snapIn(f, 158 + i * 18);
                  return (
                    <div key={c} style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 26, color: COLORS.accent, border: `1px solid ${COLORS.accentDim}`, backgroundColor: "rgba(0,230,204,0.08)", padding: "12px 20px", borderRadius: 999, opacity: Math.min(1, p * 1.5), scale: String(0.7 + 0.3 * p) }}>
                      {c}
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      )}

      {f >= 96 && film < 0.9 && <Cursor x={cx} y={cy} down={down} />}
      <AbsoluteFill style={{ pointerEvents: "none", opacity: interpolate(f, [0, 1], [0, 0]) }} />
    </AbsoluteFill>
  );
};
