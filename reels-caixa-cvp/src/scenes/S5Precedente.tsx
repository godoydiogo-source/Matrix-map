import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONTS, SAFE, W } from "../theme";
import { Body, Card, Credit } from "../components/Card";
import { CountUp, Enter, fmtInt } from "../components/Motion";
import { COUNTERS, SCENES } from "../timing";

const c = COUNTERS.cm.start - SCENES.s5Precedente;

/** CENA 5 — Precedente de 2025, com os números corretos (45–53,5 s). */
export const S5Precedente: React.FC = () => (
  <AbsoluteFill>
    <Enter at={2} dur={10} dy={10} scaleFrom={1} style={{ position: "absolute", top: 215, left: SAFE.side }}>
      <div style={{ fontFamily: FONTS.mono, fontWeight: 600, fontSize: 26, letterSpacing: 2, color: C.accent }}>PRECEDENTE · CASO SEPARADO</div>
    </Enter>
    <Card at={4} title="JUNHO DE 2025 · C&M SOFTWARE" tag="30/06/2025" top={270}>
      <Body at={c} text="desviados de contas-reserva no Banco Central" size={30} color={C.muted} weight={500} />
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 6 }}>
        <div style={{ fontFamily: FONTS.title, fontWeight: 700, fontSize: 40, color: C.text }}>mais de</div>
        <CountUp to={800} start={c} dur={COUNTERS.cm.dur} format={(v) => `R$ ${fmtInt(v)} mi`} size={132} />
      </div>
      <Credit at={c + 16} text="InfoMoney · apuração Estadão/Broadcast" />
      <div style={{ marginTop: 24 }}>
        <Body at={c + 60} text="A polícia estimou mais de R$ 1 bilhão no total." size={34} hl="mais de R$ 1 bilhão" />
        <Credit at={c + 68} text="Folha · BMP: R$ 541 mi · BIB: R$ 104 mi · CorpX: R$ 49 mi" />
      </div>
      <div style={{ marginTop: 30 }}>
        <Enter at={168} dy={24}>
          <div style={{ border: `2px solid ${C.alert}`, borderRadius: 18, padding: "20px 24px" }}>
            <div style={{ fontFamily: FONTS.title, fontWeight: 900, fontSize: 44, color: C.alert, letterSpacing: -1 }}>R$ 15 MIL, PAGOS POR MOTOBOY</div>
            <div style={{ marginTop: 8, fontFamily: FONTS.title, fontWeight: 500, fontSize: 28, color: C.text, lineHeight: 1.25 }}>
              Pela senha de um funcionário da C&M: R$ 5 mil pelas credenciais + R$ 10 mil para executar comandos.
            </div>
          </div>
        </Enter>
      </div>
      <div style={{ marginTop: 26 }}>
        <Body at={205} text="BC sem prejuízo. Contas de clientes finais não afetadas." size={30} color={C.muted} weight={600} />
      </div>
    </Card>
  </AbsoluteFill>
);
