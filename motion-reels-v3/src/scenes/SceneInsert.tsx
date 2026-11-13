import React from "react";
import { Audio, Video } from "@remotion/media";
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS, INSERT } from "../theme";
import { Captions } from "../components/Captions";
import { Kicker } from "../components/Marks";
import insertCaptions from "../data/insert-captions.json";

/**
 * Cena ao vivo: Diogo em câmera, no cenário escuro do estúdio, falando a linha nova.
 * O clipe é gerado no Higgsfield (Seedance 2.5) com lip-sync da fala gerada no Voice Studio (Diogo v2).
 * A faixa de áudio usada aqui é a VO limpa (o áudio do clipe fica mudo).
 */
export const SceneInsert: React.FC = () => {
  const f = useCurrentFrame();
  const fadeIn = interpolate(f, [0, 6], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <Video src={staticFile(INSERT.video)} muted style={{ width: "100%", height: "100%", objectFit: "cover", opacity: fadeIn }} />
      {/* leve vinheta na base para a legenda, no padrão das peças */}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(4,10,16,0.35) 0%, rgba(4,10,16,0) 22%, rgba(4,10,16,0) 62%, rgba(4,10,16,0.55) 100%)", pointerEvents: "none" }} />
      <Kicker color={COLORS.accent} opacity={interpolate(f, [4, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>{INSERT.kicker}</Kicker>
      <Captions data={insertCaptions as never} />
      <Audio src={staticFile(INSERT.audio)} volume={0.9} />
    </AbsoluteFill>
  );
};
