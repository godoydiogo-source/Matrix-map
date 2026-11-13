import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { COLORS, DURATION_S, INSERT } from "./theme";
import { Flash } from "./components/Flash";
import { MotionKitReel } from "./MotionKitReel";
import { SceneInsert } from "./scenes/SceneInsert";

/**
 * Versão de 57 s: o Reel original cortado em INSERT.atS, a cena ao vivo de 9 s no meio,
 * e o resto do Reel (narração, legendas, SFX e cenas) deslocado em bloco.
 * Nada do original é reeditado: o corte é feito por Sequence com `from` negativo.
 */
export const MotionKitReelInsert: React.FC = () => {
  const { fps } = useVideoConfig();
  const cut = Math.round(INSERT.atS * fps);
  const len = Math.round(INSERT.durationS * fps);
  const total = DURATION_S * fps;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <Sequence name="Reel · parte A (gancho)" from={0} durationInFrames={cut}>
        <MotionKitReel />
      </Sequence>
      <Sequence name="Cena ao vivo · Diogo" from={cut} durationInFrames={len}>
        <SceneInsert />
      </Sequence>
      <Sequence name="Reel · parte B (deslocada)" from={cut + len} durationInFrames={total - cut}>
        <Sequence from={-cut} durationInFrames={total}>
          <MotionKitReel />
        </Sequence>
      </Sequence>
      {/* flash e snap nas duas viradas da cena ao vivo */}
      <Flash at={[cut, cut + len]} />
      <Sequence from={cut} durationInFrames={30}><Audio src={staticFile("sfx/whoosh.wav")} volume={0.35} /></Sequence>
      <Sequence from={cut + len} durationInFrames={30}><Audio src={staticFile("sfx/snap.wav")} volume={0.4} /></Sequence>
    </AbsoluteFill>
  );
};
