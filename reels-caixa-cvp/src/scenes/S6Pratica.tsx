import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONTS, SAFE, W } from "../theme";
import { Enter } from "../components/Motion";
import { IconBubble, IconMail, IconShield } from "../components/Icons";
import { CUTS } from "../timing";

const Info: React.FC<{ at: number; top: number; icon: React.ReactNode; text: string; hl: string; hlColor?: string }> = ({ at, top, icon, text, hl, hlColor = C.accent }) => {
  const parts = text.split(hl);
  return (
    <div style={{ position: "absolute", top, left: SAFE.side, width: W - SAFE.side * 2 }}>
      <Enter at={at} dy={40} scaleFrom={0.95}>
        <div style={{ display: "flex", alignItems: "center", gap: 30, background: C.card, border: `1px solid ${C.line}`, borderRadius: 28, padding: "36px 40px", boxShadow: "0 30px 80px rgba(0,0,0,0.45)" }}>
          <div style={{ flexShrink: 0 }}>{icon}</div>
          <div style={{ fontFamily: FONTS.title, fontWeight: 700, fontSize: 44, lineHeight: 1.18, color: C.text, letterSpacing: -0.9 }}>
            {parts[0]}
            <span style={{ color: hlColor }}>{hl}</span>
            {parts.slice(1).join(hl)}
          </div>
        </div>
      </Enter>
    </div>
  );
};

/** CENA 6 — O que isso significa na prática (53,5 s – fim). Orientação, sem CTA. */
export const S6Pratica: React.FC = () => (
  <AbsoluteFill>
    <Enter at={2} dur={10} dy={10} scaleFrom={1} style={{ position: "absolute", top: 215, left: SAFE.side }}>
      <div style={{ fontFamily: FONTS.mono, fontWeight: 600, fontSize: 26, letterSpacing: 2, color: C.accent }}>NA PRÁTICA</div>
    </Enter>
    <Info at={6} top={290} icon={<IconShield />} text="A Caixa não pede senha, código ou Pix por WhatsApp ou ligação." hl="não pede senha, código ou Pix" />
    <Info at={CUTS.s6Card2} top={600} icon={<IconBubble />} text="Golpistas devem usar esta notícia em mensagens urgentes." hl="Golpistas" hlColor={C.alert} />
    <Info at={CUTS.s6Card3} top={910} icon={<IconMail />} text="Clientes com telefone ou e-mail na base devem receber aviso oficial da empresa." hl="aviso oficial" />
  </AbsoluteFill>
);
