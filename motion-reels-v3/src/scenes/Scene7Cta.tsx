import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../theme";
import { easeOut, lin, snapIn } from "../components/anim";
import { Mono, Title } from "../components/Card";
import { byCat } from "../data/repos";
import { Kicker } from "../components/Marks";

export const Scene7Cta: React.FC = () => {
  const f = useCurrentFrame();
  const typed = Math.floor(lin(f, 4, 20, [0, 4]));
  const boxIn = snapIn(f, 0);
  const dmIn = snapIn(f, 34);
  const toCard = easeOut(f, 78, 8); // tudo some, card final entra
  const cardIn = snapIn(f, 80);
  const groups = [
    { label: "Skills · 10", items: byCat("skills").slice(0, 4).map((r) => r.name) },
    { label: "Motores · 4", items: byCat("motores").map((r) => r.name) },
    { label: "Complementos · 6", items: byCat("complementos").slice(0, 4).map((r) => r.name) },
  ];
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, opacity: 1 - toCard }}>
        <Kicker color={COLORS.alert} opacity={boxIn}>Comenta CODE</Kicker>
        {/* caixa de comentário genérica */}
        <div style={{ position: "absolute", top: 420, left: 90, right: 90, height: 120, borderRadius: 60, backgroundColor: COLORS.surface, border: `1px solid #243039`, display: "flex", alignItems: "center", padding: "0 26px 0 20px", gap: 22, opacity: Math.min(1, boxIn * 1.5), translate: `0px ${(1 - boxIn) * 40}px` }}>
          <div style={{ width: 78, height: 78, borderRadius: "50%", backgroundColor: "#243039", flex: "none" }} />
          <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 56, color: COLORS.alert, letterSpacing: 2 }}>
            {"CODE".slice(0, typed)}
            <span style={{ opacity: f % 8 < 4 ? 1 : 0 }}>▍</span>
          </div>
          <div style={{ marginLeft: "auto", fontFamily: FONTS.mono, fontWeight: 700, fontSize: 26, color: typed >= 4 ? COLORS.alert : COLORS.dim, letterSpacing: 2 }}>
            {typed >= 4 ? "ENVIADO" : "Comentar"}
          </div>
        </div>

        {/* DM escura com a lista chegando, já separada */}
        <div style={{ position: "absolute", top: 600, left: 90, right: 90, backgroundColor: COLORS.surface, border: `1px solid #243039`, borderRadius: 20, padding: "30px 36px 34px", opacity: Math.min(1, dmIn * 1.5), translate: `0px ${(1 - dmIn) * 120}px` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: COLORS.accent, boxShadow: "0 0 10px rgba(0,230,204,0.8)" }} />
            <Mono size={24} color={COLORS.dim} style={{ letterSpacing: 3 }}>DIRECT · 20 LINKS</Mono>
          </div>
          {groups.map((g, gi) => {
            const p = snapIn(f, 40 + gi * 9);
            return (
              <div key={g.label} style={{ marginBottom: 18, opacity: Math.min(1, p * 1.5), translate: `${(1 - p) * -40}px 0px` }}>
                <Mono size={26} color={COLORS.accent} style={{ fontWeight: 700, marginBottom: 10 }}>{g.label}</Mono>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {g.items.map((n) => (
                    <div key={n} style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.text, border: `1px solid ${COLORS.line}`, padding: "8px 14px", borderRadius: 6 }}>{n}</div>
                  ))}
                  {g.items.length < byCat(gi === 0 ? "skills" : gi === 1 ? "motores" : "complementos").length && (
                    <div style={{ fontFamily: FONTS.mono, fontSize: 22, color: COLORS.dim, padding: "8px 6px" }}>…</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* card final — permanece ~1 s e faz fade (o fade final fica na composição) */}
      {f >= 80 && (
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28, opacity: Math.min(1, cardIn * 1.5), scale: String(0.92 + 0.08 * cardIn) }}>
          <Title size={124} color={COLORS.text} style={{ textAlign: "center", lineHeight: 0.98, whiteSpace: "nowrap" }}>
            COMENTA
          </Title>
          <div style={{ fontFamily: FONTS.mono, fontWeight: 700, fontSize: 150, lineHeight: 1, letterSpacing: 6, color: COLORS.alert, textShadow: "0 0 40px rgba(255,58,92,0.45)" }}>CODE</div>
          <Title size={44} color={COLORS.text} style={{ textAlign: "center", opacity: lin(f, 88, 8), whiteSpace: "nowrap", marginTop: 10 }}>
            que eu te mando os 20 links
          </Title>
          <div style={{ width: 160, height: 4, backgroundColor: COLORS.alert, borderRadius: 2, marginTop: 10, scale: `${lin(f, 92, 14)} 1` }} />
        </div>
      )}
      <AbsoluteFill style={{ opacity: interpolate(f, [0, 1], [0, 0]) }} />
    </AbsoluteFill>
  );
};
