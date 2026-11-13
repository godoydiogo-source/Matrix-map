import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, EASE, FONTS, SAFE, W } from "../theme";
import { Body, Card, Credit, Seal } from "../components/Card";
import { CountUp, Enter, fmtInt } from "../components/Motion";
import { COUNTERS, CUTS, SCENES } from "../timing";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

/** Barras finas, mesma cor (uma medida, várias categorias), extremidades arredondadas. */
const Bars: React.FC<{ at: number; rows: Array<[string, number]> }> = ({ at, rows }) => {
  const f = useCurrentFrame();
  const t = f - at;
  if (t < 0) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {rows.map(([label, v], i) => {
        const p = interpolate(t - i * 5, [0, 26], [0, 1], { ...clamp, easing: EASE.outQuart });
        const o = interpolate(t - i * 5, [0, 6], [0, 1], clamp);
        return (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 18, opacity: o }}>
            <div style={{ width: 260, fontFamily: FONTS.title, fontWeight: 600, fontSize: 28, color: C.text }}>{label}</div>
            <div style={{ flex: 1, height: 14, background: C.line, borderRadius: 7, overflow: "hidden" }}>
              <div style={{ width: `${v * p}%`, height: "100%", background: C.accent, borderRadius: 7 }} />
            </div>
            <div style={{ width: 90, textAlign: "right", fontFamily: FONTS.mono, fontWeight: 700, fontSize: 28, color: C.text }}>{Math.round(v * p)}%</div>
          </div>
        );
      })}
    </div>
  );
};

const c1 = COUNTERS.pix.start - SCENES.s3MesmoDia;
const c2 = COUNTERS.outlook.start - SCENES.s3MesmoDia;

/** CENA 3 — O mesmo dia, dois fatos distintos (19,5–32 s). */
export const S3MesmoDia: React.FC = () => (
  <AbsoluteFill>
    <Enter at={2} until={CUTS.s3Card2} dur={10} dy={10} scaleFrom={1} style={{ position: "absolute", top: 215, left: SAFE.side }}>
      <div style={{ fontFamily: FONTS.mono, fontWeight: 600, fontSize: 26, letterSpacing: 2, color: C.accent }}>NO MESMO DIA · FATO 1 DE 2</div>
    </Enter>
    <Card at={2} until={CUTS.s3Card2} title="PIX E APP DA CAIXA" tag="ONTEM · 12/11" top={270}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <CountUp to={1000} start={c1} dur={COUNTERS.pix.dur} format={(v) => `+${fmtInt(v)}`} size={168} />
      </div>
      <Body at={c1 + 14} text="relatos de instabilidade no Downdetector" size={34} color={C.muted} weight={500} />
      <div style={{ marginTop: 8 }}>
        <Credit at={c1 + 20} text="Downdetector · ~13h de ontem · G1" />
      </div>
      <div style={{ marginTop: 30 }}>
        <Bars at={c1 + 48} rows={[["App", 55], ["Transferências", 28], ["Internet banking", 14]]} />
      </div>
      <div style={{ marginTop: 34 }}>
        <Seal at={86} text="Sem relação confirmada com o vazamento." />
      </div>
    </Card>

    <Enter at={CUTS.s3Card2} dur={10} dy={10} scaleFrom={1} style={{ position: "absolute", top: 215, left: SAFE.side }}>
      <div style={{ fontFamily: FONTS.mono, fontWeight: 600, fontSize: 26, letterSpacing: 2, color: C.accent }}>NO MESMO DIA · FATO 2 DE 2</div>
    </Enter>
    <Card at={CUTS.s3Card2} title="MICROSOFT 365 / OUTLOOK" tag="ONTEM · 12/11 · MUNDIAL" top={270}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
        <CountUp to={7803} start={c2} dur={COUNTERS.outlook.dur} format={fmtInt} size={168} />
      </div>
      <Body at={c2 + 14} text="pico de reclamações · mais de 7,8 mil" size={34} color={C.muted} weight={500} hl="mais de 7,8 mil" hlColor={C.text} />
      <div style={{ marginTop: 8 }}>
        <Credit at={c2 + 20} text="Downdetector · pico ~16h25 · Exame / TechTudo" />
      </div>
      <div style={{ marginTop: 30 }}>
        <Body at={c2 + 40} text="Incidente EX1550543: a Microsoft confirmou que a conectividade do Microsoft 365 podia ser afetada em qualquer região." size={30} color={C.text} weight={500} />
      </div>
      <div style={{ marginTop: 30 }}>
        <Seal at={CUTS.s3Card2 + 93} color={C.accent} text="Instabilidade mundial. A Microsoft apontou falha de infraestrutura," strong="não um ataque." />
      </div>
    </Card>
  </AbsoluteFill>
);
