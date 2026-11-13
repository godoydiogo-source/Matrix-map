import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONTS, SAFE, W } from "../theme";
import { Body, Card, Credit } from "../components/Card";
import { CountUp, Enter, Words } from "../components/Motion";
import { COUNTERS, CUTS, SCENES } from "../timing";

const c = COUNTERS.santos.start - SCENES.s4Outros;

/** CENA 4 — Outros incidentes do período, sem evidência de coordenação (32–45 s). */
export const S4Outros: React.FC = () => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 215, left: SAFE.side, width: W - SAFE.side * 2 }}>
      <Words text="OUTROS INCIDENTES." at={4} size={64} weight={900} align="left" stagger={4} />
      <Words text="SEM EVIDÊNCIA DE COORDENAÇÃO." at={16} size={64} weight={900} align="left" color={C.accent} stagger={3} />
    </div>

    <Card at={CUTS.s4Card1} until={CUTS.s4Card2} title="PORTO DE SANTOS" tag="SEX · 6/11" top={480}>
      <Body at={CUTS.s4Card1 + 10} text="Queda de energia + ataque cibernético confirmado pela Autoridade Portuária." size={34} />
      <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginTop: 24 }}>
        <CountUp to={96} start={c} dur={COUNTERS.santos.dur} format={(v) => `+${Math.round(v)} h`} size={150} />
      </div>
      <Body at={c + 12} text="de sistemas administrativos fora do ar" size={32} color={C.muted} weight={500} />
      <div style={{ marginTop: 26 }}>
        <Body at={c + 36} text="Navios e acessos terrestres seguiram operando." size={34} hl="seguiram operando" />
      </div>
      <div style={{ marginTop: 18 }}>
        <Credit at={c + 48} text="12/11: APS confirmou pedido de resgate · ~70% dos backups recuperados" />
      </div>
    </Card>

    <Card at={CUTS.s4Card2} title="CUIABÁ" tag="TER · 3/11" top={480}>
      <Body at={CUTS.s4Card2 + 10} text="Tentativa de ataque cibernético à prefeitura afetou sistemas da Secretaria Municipal de Saúde." size={34} />
      <div style={{ marginTop: 28 }}>
        <Enter at={CUTS.s4Card2 + 34} dy={24}>
          <div style={{ display: "flex", alignItems: "center", gap: 22, border: `2px solid ${C.accent}`, borderRadius: 18, padding: "20px 24px" }}>
            <div style={{ fontFamily: FONTS.title, fontWeight: 900, fontSize: 56, color: C.accent, letterSpacing: -1 }}>UPAs</div>
            <div style={{ fontFamily: FONTS.title, fontWeight: 700, fontSize: 34, color: C.text, lineHeight: 1.15 }}>continuaram atendendo, com fichas manuais.</div>
          </div>
        </Enter>
      </div>
      <div style={{ marginTop: 20 }}>
        <Credit at={CUTS.s4Card2 + 60} text="Prefeitura não detalhou vazamento de dados · Olhar Direto, 03/11" />
      </div>
    </Card>
  </AbsoluteFill>
);
