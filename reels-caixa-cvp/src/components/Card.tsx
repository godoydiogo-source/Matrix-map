import React from "react";
import { C, FONTS, SAFE, W } from "../theme";
import { Enter } from "./Motion";

/** Card de notícia: superfície #121826, borda fina, cabeçalho em mono. */
export const Card: React.FC<{
  at: number;
  until?: number;
  title: string;
  tag?: string;
  tagColor?: string;
  top: number;
  children: React.ReactNode;
  width?: number;
  left?: number;
  padding?: number;
}> = ({ at, until, title, tag, tagColor = C.accent, top, children, width = W - SAFE.side * 2, left = SAFE.side, padding = 44 }) => (
  <div style={{ position: "absolute", top, left, width }}>
    <Enter at={at} until={until} dy={44} scaleFrom={0.95}>
      <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 28, padding, boxShadow: "0 30px 80px rgba(0,0,0,0.45)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 26 }}>
          <div style={{ fontFamily: FONTS.title, fontWeight: 800, fontSize: 40, letterSpacing: -1, color: C.text, lineHeight: 1.05 }}>{title}</div>
          {tag ? (
            <div style={{ fontFamily: FONTS.mono, fontWeight: 600, fontSize: 24, color: tagColor, border: `1.5px solid ${tagColor}`, borderRadius: 999, padding: "8px 16px", whiteSpace: "nowrap" }}>{tag}</div>
          ) : null}
        </div>
        {children}
      </div>
    </Enter>
  </div>
);

/** Chip/pill tipográfico. */
export const Chip: React.FC<{ at: number; label: string; big?: boolean; color?: string; muted?: boolean; style?: React.CSSProperties }> = ({ at, label, big, color = C.accent, muted, style }) => (
  <Enter at={at} dur={12} dy={20} scaleFrom={0.94} style={{ display: "inline-block", ...style }}>
    <div
      style={{
        fontFamily: FONTS.title,
        fontWeight: 800,
        fontSize: big ? 56 : 36,
        letterSpacing: big ? -1.5 : -0.5,
        color: muted ? C.text : color,
        border: `${big ? 3 : 2}px solid ${muted ? C.dim : color}`,
        borderRadius: 999,
        padding: big ? "16px 40px" : "10px 26px",
        background: muted ? "rgba(18,24,38,0.9)" : "rgba(0,232,209,0.06)",
      }}
    >
      {label}
    </div>
  </Enter>
);

/** Selo de ressalva (alerta ou neutro) com ícone geométrico. */
export const Seal: React.FC<{ at: number; text: string; color?: string; strong?: string }> = ({ at, text, color = C.alert, strong }) => (
  <Enter at={at} dur={12} dy={18}>
    <div style={{ display: "flex", alignItems: "flex-start", gap: 18, border: `2px solid ${color}`, borderRadius: 18, padding: "18px 22px", background: `${color}14` }}>
      <svg width="40" height="40" viewBox="0 0 40 40" style={{ flexShrink: 0, marginTop: 2 }}>
        <polygon points="20,4 37,35 3,35" fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round" />
        <line x1="20" y1="15" x2="20" y2="25" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="20" cy="30" r="2" fill={color} />
      </svg>
      <div style={{ fontFamily: FONTS.title, fontWeight: 700, fontSize: 32, lineHeight: 1.2, color: C.text }}>
        {text}
        {strong ? <span style={{ color }}> {strong}</span> : null}
      </div>
    </div>
  </Enter>
);

/** Linha de crédito/fonte em mono. */
export const Credit: React.FC<{ at: number; text: string }> = ({ at, text }) => (
  <Enter at={at} dur={10} dy={10} scaleFrom={1}>
    <div style={{ fontFamily: FONTS.mono, fontWeight: 400, fontSize: 24, color: C.muted, letterSpacing: 0 }}>{text}</div>
  </Enter>
);

export const Body: React.FC<{ at: number; text: string; size?: number; color?: string; weight?: number; hl?: string; hlColor?: string }> = ({ at, text, size = 34, color = C.text, weight = 600, hl, hlColor = C.accent }) => {
  const parts = hl ? text.split(hl) : [text];
  return (
    <Enter at={at} dur={12} dy={16} scaleFrom={1}>
      <div style={{ fontFamily: FONTS.title, fontWeight: weight, fontSize: size, lineHeight: 1.22, color, letterSpacing: -0.3 }}>
        {hl ? (
          <>
            {parts[0]}
            <span style={{ color: hlColor }}>{hl}</span>
            {parts.slice(1).join(hl)}
          </>
        ) : (
          text
        )}
      </div>
    </Enter>
  );
};
