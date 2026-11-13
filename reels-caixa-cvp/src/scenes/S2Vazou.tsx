import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, EASE, FONTS, SAFE, W } from "../theme";
import { Enter, Words } from "../components/Motion";
import { Chip } from "../components/Card";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

const Label: React.FC<{ at: number; text: string; color?: string }> = ({ at, text, color = C.accent }) => (
  <Enter at={at} dur={10} dy={10} scaleFrom={1}>
    <div style={{ fontFamily: FONTS.mono, fontWeight: 600, fontSize: 26, letterSpacing: 2, color, textTransform: "uppercase" }}>{text}</div>
  </Enter>
);

const Timeline: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame();
  const t = f - at;
  if (t < 0) return null;
  const p = interpolate(t, [0, 40], [0, 1], { ...clamp, easing: EASE.inOutCubic });
  const w = W - SAFE.side * 2;
  const nodes = [
    { x: 0.06, d: "6/11 · sex", l: "identificado" },
    { x: 0.44, d: "11/11", l: "ANPD e autoridades" },
    { x: 0.94, d: "12/11", l: "comunicado ao mercado" },
  ];
  return (
    <svg width={w} height={150}>
      <line x1={0} y1={40} x2={w} y2={40} stroke={C.line} strokeWidth={3} />
      <line x1={0} y1={40} x2={w * p} y2={40} stroke={C.accent} strokeWidth={3} />
      {nodes.map((n, i) => {
        const on = p >= n.x - 0.02;
        const o = interpolate(t, [i * 13, i * 13 + 8], [0, 1], clamp);
        return (
          <g key={i} opacity={on ? o : 0}>
            <circle cx={w * n.x} cy={40} r={11} fill={C.bg} stroke={i === 2 ? C.alert : C.accent} strokeWidth={3} />
            <text x={w * n.x} y={90} textAnchor={i === 0 ? "start" : i === 2 ? "end" : "middle"} fontFamily={FONTS.mono} fontWeight={700} fontSize={28} fill={C.text}>{n.d}</text>
            <text x={w * n.x} y={126} textAnchor={i === 0 ? "start" : i === 2 ? "end" : "middle"} fontFamily={FONTS.title} fontWeight={500} fontSize={24} fill={C.muted}>{n.l}</text>
          </g>
        );
      })}
    </svg>
  );
};

const Struck: React.FC<{ at: number; text: string }> = ({ at, text }) => {
  const f = useCurrentFrame();
  const t = f - at;
  if (t < 0) return null;
  const o = interpolate(t, [0, 6], [0, 1], clamp);
  const line = interpolate(t, [6, 16], [0, 100], { ...clamp, easing: EASE.outQuart });
  return (
    <div style={{ position: "relative", display: "inline-block", opacity: o, fontFamily: FONTS.title, fontWeight: 700, fontSize: 40, color: C.text, marginRight: 36, marginBottom: 14 }}>
      {text}
      <div style={{ position: "absolute", left: 0, top: "52%", height: 4, width: `${line}%`, background: C.alert, borderRadius: 2 }} />
    </div>
  );
};

/** CENA 2 — O que vazou, linha do tempo e o que não vazou (9–19,5 s). */
export const S2Vazou: React.FC = () => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 215, left: SAFE.side, width: W - SAFE.side * 2 }}>
      <Label at={4} text="O que vazou" />
      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <Chip at={6} label="NOME" big />
        <Chip at={16} label="CPF" big />
      </div>
      <div style={{ marginTop: 34 }}>
        <Label at={54} text="em parte dos registros" color={C.muted} />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 14 }}>
        <Chip at={60} label="ENDEREÇO" muted />
        <Chip at={68} label="TELEFONE" muted />
        <Chip at={76} label="E-MAIL" muted />
        <Chip at={84} label="NASCIMENTO" muted />
      </div>
    </div>

    <div style={{ position: "absolute", top: 700, left: SAFE.side, width: W - SAFE.side * 2 }}>
      <Label at={136} text="linha do tempo" />
      <div style={{ marginTop: 10 }}>
        <Timeline at={138} />
      </div>
    </div>

    <div style={{ position: "absolute", top: 930, left: SAFE.side, width: W - SAFE.side * 2 }}>
      <Enter at={216} dy={30}>
        <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 28, padding: "34px 40px" }}>
          <Words text="ATÉ AGORA, SEM INDÍCIO" at={218} size={52} weight={900} align="left" color={C.accent} stagger={2} />
          <div style={{ marginTop: 22, display: "flex", flexWrap: "wrap" }}>
            <Struck at={226} text="senha" />
            <Struck at={234} text="saldo de previdência" />
            <Struck at={242} text="dado bancário" />
            <Struck at={250} text="valor de apólice" />
          </div>
          <Enter at={262} dur={10} dy={8} scaleFrom={1}>
            <div style={{ marginTop: 14, fontFamily: FONTS.title, fontWeight: 500, fontSize: 27, color: C.muted, lineHeight: 1.25 }}>
              Apuração preliminar da empresa. Sem evidência, até agora, de divulgação pública ou uso indevido. A empresa monitora a internet para identificar eventual exposição.
            </div>
          </Enter>
        </div>
      </Enter>
    </div>
  </AbsoluteFill>
);
