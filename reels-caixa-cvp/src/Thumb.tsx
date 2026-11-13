import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONTS, SAFE, W } from "./theme";
import { useFonts } from "./components/Fonts";
import { Background } from "./components/Background";

/** Capa/thumbnail 1080×1920: 7,6 MILHÕES + CAIXA VIDA E PREVIDÊNCIA. */
export const Thumb: React.FC = () => {
  useFonts();
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Background />
      <div style={{ position: "absolute", top: SAFE.top + 90, left: SAFE.side, width: W - SAFE.side * 2, fontFamily: FONTS.mono, fontWeight: 600, fontSize: 30, letterSpacing: 3, color: C.accent }}>ONTEM · 12/11/2026</div>
      <div style={{ position: "absolute", top: 520, left: SAFE.side, width: W - SAFE.side * 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 340, lineHeight: 1, letterSpacing: -14, color: C.accent }}>7,6</div>
        <div style={{ fontFamily: FONTS.title, fontWeight: 900, fontSize: 150, lineHeight: 1, letterSpacing: -6, color: C.text, marginTop: 10 }}>MILHÕES</div>
        <div style={{ fontFamily: FONTS.title, fontWeight: 600, fontSize: 46, color: C.muted, marginTop: 26, textAlign: "center" }}>de clientes com dados copiados para fora do ambiente</div>
        <div style={{ marginTop: 56, fontFamily: FONTS.title, fontWeight: 800, fontSize: 56, letterSpacing: -1.5, color: C.accent, border: `3px solid ${C.accent}`, borderRadius: 999, padding: "18px 44px", background: "rgba(0,232,209,0.06)" }}>CAIXA VIDA E PREVIDÊNCIA</div>
      </div>
      <div style={{ position: "absolute", bottom: SAFE.bottom + 60, left: SAFE.side, width: W - SAFE.side * 2, textAlign: "center", fontFamily: FONTS.title, fontWeight: 700, fontSize: 44, color: C.text, lineHeight: 1.2 }}>
        Nomes e CPFs. <span style={{ color: C.accent }}>Sem indício</span> de senha ou dado bancário.
      </div>
    </AbsoluteFill>
  );
};
