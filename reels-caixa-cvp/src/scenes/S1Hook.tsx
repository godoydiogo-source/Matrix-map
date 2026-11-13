import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, EASE, FONTS, H, SAFE, W } from "../theme";
import { CountUp, Enter, Words, fmtDec1 } from "../components/Motion";
import { Chip } from "../components/Card";
import { COUNTERS, SCENES } from "../timing";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const cnt = COUNTERS.milhoes.start - SCENES.s1Hook;

/** CENA 1 — Hook (0–9 s). Tela preta, linha de scan, tipografia cinética, 7,6 milhões em count-up. */
export const S1Hook: React.FC = () => {
  const f = useCurrentFrame();
  const scanY = interpolate(f, [0, 18], [H, -10], { ...clamp, easing: EASE.outCubic });
  const scanO = interpolate(f, [0, 4, 16, 20], [0, 1, 1, 0], clamp);
  // o número encolhe e sobe quando a frase "copiados..." entra
  const shift = interpolate(f, [206, 222], [0, 1], { ...clamp, easing: EASE.inOutCubic });
  return (
    <AbsoluteFill>
      {/* linha de scan */}
      <div style={{ position: "absolute", left: 0, width: W, top: scanY, height: 3, background: C.accent, opacity: scanO, boxShadow: `0 0 24px 6px ${C.accent}66` }} />

      {/* 0,4 s – 2,4 s: ONTEM, 12/11 */}
      <div style={{ position: "absolute", top: 640, left: SAFE.side, width: W - SAFE.side * 2 }}>
        <Words text="ONTEM," at={12} until={70} size={150} weight={900} />
        <Words text="12/11" at={22} until={70} size={200} weight={700} mono color={C.accent} style={{ marginTop: 10 }} />
      </div>

      {/* 2,4 s – 4,4 s: cortes rápidos */}
      <div style={{ position: "absolute", top: 700, left: SAFE.side, width: W - SAFE.side * 2 }}>
        <Words text="CAIXA SEGURIDADE" at={72} until={92} size={104} weight={900} stagger={4} />
        <Words text="COMUNICOU" at={92} until={110} size={118} weight={900} />
        <Words text="UM ATAQUE" at={110} until={132} size={130} weight={900} color={C.alert} stagger={5} />
      </div>

      {/* 4,4 s em diante: 7,6 MILHÕES + selo */}
      <div
        style={{
          position: "absolute",
          top: interpolate(shift, [0, 1], [560, 330]),
          left: SAFE.side,
          width: W - SAFE.side * 2,
          transform: `scale(${interpolate(shift, [0, 1], [1, 0.72])})`,
          transformOrigin: "top center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CountUp to={7.6} start={cnt} dur={COUNTERS.milhoes.dur} format={fmtDec1} size={330} />
        <Words text="MILHÕES" at={cnt + 10} size={132} weight={900} letterSpacing={-4} style={{ marginTop: 22 }} />
        <Words text="de clientes com dados copiados" at={cnt + 28} size={44} weight={600} color={C.muted} stagger={2} style={{ marginTop: 18 }} />
        <div style={{ marginTop: 40, display: "flex", justifyContent: "center" }}>
          <Chip at={cnt + 36} label="CAIXA VIDA E PREVIDÊNCIA" big />
        </div>
      </div>

      {/* 7,0 s: copiados para fora do ambiente */}
      <div style={{ position: "absolute", top: 1010, left: SAFE.side, width: W - SAFE.side * 2 }}>
        <Words text="COPIADOS PARA FORA DO AMBIENTE TECNOLÓGICO" at={212} size={88} weight={900} stagger={3} hl={["FORA"]} hlColor={C.alert} lineHeight={1.0} />
        <Enter at={236} dur={10} dy={10} scaleFrom={1}>
          <div style={{ marginTop: 22, textAlign: "center", fontFamily: FONTS.mono, fontSize: 26, color: C.muted }}>fato relevante · Caixa Seguridade · 12/11/2026</div>
        </Enter>
      </div>
    </AbsoluteFill>
  );
};
