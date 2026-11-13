import React from "react";
import { COLORS, FONTS } from "../theme";

/** Ícone geométrico genérico por índice (sem logos oficiais). */
export const Glyph: React.FC<{ i: number; size?: number; color?: string }> = ({ i, size = 22, color = COLORS.violet }) => {
  const k = i % 6;
  const common: React.CSSProperties = { width: size, height: size, flex: "none" };
  if (k === 0) return <div style={{ ...common, borderRadius: "50%", border: `3px solid ${color}` }} />;
  if (k === 1) return <div style={{ ...common, backgroundColor: color, borderRadius: 3 }} />;
  if (k === 2) return <div style={{ ...common, width: 0, height: 0, borderLeft: `${size / 2}px solid transparent`, borderRight: `${size / 2}px solid transparent`, borderBottom: `${size}px solid ${color}` }} />;
  if (k === 3) return <div style={{ ...common, backgroundColor: color, rotate: "45deg", scale: "0.75" }} />;
  if (k === 4) return <div style={{ ...common, border: `3px solid ${color}`, borderRadius: 3 }} />;
  return <div style={{ ...common, height: size * 0.36, backgroundColor: color, borderRadius: 2 }} />;
};

type Props = {
  name: string;
  index: number;
  lit?: boolean | number; // true/false ou 0–1
  width?: number;
  height?: number;
  fontSize?: number;
  progress?: number; // 0–1 encaixe (scale/translate)
  style?: React.CSSProperties;
};

/** Módulo do rack: superfície escura, canto vivo, nome em mono. Acende em lima quando citado. */
export const Module: React.FC<Props> = ({ name, index, lit = false, width = 300, height = 86, fontSize = 26, progress = 1, style }) => {
  const l = typeof lit === "number" ? lit : lit ? 1 : 0;
  const border = l > 0.01 ? COLORS.lime : COLORS.line;
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: COLORS.surface,
        border: `2px solid ${border}`,
        borderRadius: 6,
        borderTopLeftRadius: 0, // canto vivo
        boxShadow: l > 0.01 ? `0 0 ${28 * l}px rgba(214,255,63,${0.45 * l}), inset 0 0 0 1px rgba(214,255,63,${0.3 * l})` : "0 10px 30px rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        gap: Math.round(fontSize * 0.45),
        padding: `0 ${Math.round(fontSize * 0.55)}px`,
        opacity: Math.min(1, progress * 1.4),
        scale: String(0.86 + 0.14 * progress),
        translate: `0px ${(1 - progress) * 40}px`,
        ...style,
      }}
    >
      <Glyph i={index} color={l > 0.01 ? COLORS.lime : COLORS.violet} size={Math.round(fontSize * 0.7)} />
      <div
        style={{
          fontFamily: FONTS.mono,
          fontWeight: 700,
          fontSize,
          color: l > 0.01 ? COLORS.lime : COLORS.text,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          letterSpacing: -0.5,
        }}
      >
        {name}
      </div>
    </div>
  );
};
