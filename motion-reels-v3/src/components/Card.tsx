import React from "react";
import { COLORS, FONTS } from "../theme";

/** Cartão escuro de mini-demo com canto vivo e etiqueta mono. */
export const Card: React.FC<{
  label?: string;
  width?: number;
  height?: number;
  accent?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({ label, width = 900, height = 620, accent = COLORS.lime, style, children }) => {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: COLORS.surface,
        border: `2px solid ${COLORS.line}`,
        borderRadius: 18,
        borderTopLeftRadius: 0,
        boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {label && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            padding: "10px 18px",
            fontFamily: FONTS.mono,
            fontWeight: 700,
            fontSize: 24,
            letterSpacing: 2,
            color: COLORS.bg,
            backgroundColor: accent,
            borderBottomRightRadius: 12,
          }}
        >
          {label}
        </div>
      )}
      {children}
    </div>
  );
};

/** Texto grande em Syne. */
export const Title: React.FC<{ size?: number; color?: string; style?: React.CSSProperties; children?: React.ReactNode }> = ({ size = 96, color = COLORS.text, style, children }) => (
  <div style={{ fontFamily: FONTS.title, fontWeight: 800, fontSize: size, lineHeight: 0.98, letterSpacing: -size * 0.03, color, ...style }}>{children}</div>
);

/** Texto mono. */
export const Mono: React.FC<{ size?: number; color?: string; style?: React.CSSProperties; children?: React.ReactNode }> = ({ size = 28, color = COLORS.text, style, children }) => (
  <div style={{ fontFamily: FONTS.mono, fontWeight: 500, fontSize: size, lineHeight: 1.25, color, ...style }}>{children}</div>
);
