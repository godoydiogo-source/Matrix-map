import React from "react";
import { COLORS, FONTS } from "../theme";

/** Check verde-água em círculo (como nas peças jornalísticas). */
export const Check: React.FC<{ size?: number; p?: number }> = ({ size = 44, p = 1 }) => (
  <div style={{ width: size, height: size, flex: "none", borderRadius: "50%", backgroundColor: "rgba(0,230,204,0.12)", border: `2px solid ${COLORS.accent}`, display: "flex", alignItems: "center", justifyContent: "center", scale: String(0.6 + 0.4 * p), opacity: Math.min(1, p * 1.5) }}>
    <div style={{ width: size * 0.42, height: size * 0.22, borderLeft: `4px solid ${COLORS.accent}`, borderBottom: `4px solid ${COLORS.accent}`, rotate: "-45deg", translate: "0px -3px" }} />
  </div>
);

/** X coral em círculo. */
export const Cross: React.FC<{ size?: number; p?: number }> = ({ size = 44, p = 1 }) => (
  <div style={{ width: size, height: size, flex: "none", borderRadius: "50%", backgroundColor: "rgba(255,58,92,0.12)", border: `2px solid ${COLORS.alert}`, position: "relative", scale: String(0.6 + 0.4 * p), opacity: Math.min(1, p * 1.5) }}>
    {[45, -45].map((r) => (
      <div key={r} style={{ position: "absolute", left: "50%", top: "50%", width: size * 0.5, height: 4, backgroundColor: COLORS.alert, translate: "-50% -50%", rotate: `${r}deg` }} />
    ))}
  </div>
);

/** Rótulo mono cinza em caixa alta, canto superior esquerdo (ex.: "NA PRÁTICA"). */
export const Kicker: React.FC<{ children: React.ReactNode; color?: string; opacity?: number; top?: number }> = ({ children, color = COLORS.muted, opacity = 1, top = 190 }) => (
  <div style={{ position: "absolute", top, left: 72, fontFamily: FONTS.mono, fontWeight: 500, fontSize: 22, letterSpacing: 5, color, textTransform: "uppercase", opacity }}>{children}</div>
);
