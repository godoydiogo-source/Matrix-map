import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { C } from "./theme";
import { useFonts } from "./components/Fonts";
import { Background } from "./components/Background";
import { Progress } from "./components/Progress";
import { Caption } from "./components/Caption";
import { GlitchWrap } from "./components/Glitch";
import { S1Hook } from "./scenes/S1Hook";
import { S2Vazou } from "./scenes/S2Vazou";
import { S3MesmoDia } from "./scenes/S3MesmoDia";
import { S4Outros } from "./scenes/S4Outros";
import { S5Precedente } from "./scenes/S5Precedente";
import { S6Pratica } from "./scenes/S6Pratica";
import { FADE_OUT_START, MUSIC_VOLUME, SCENES, SCENE_DUR, SFX, TOTAL_FRAMES, VO_FILE } from "./timing";

const SFX_FILES = { tick: "audio/tick.wav", whoosh: "audio/whoosh.wav", glitch: "audio/glitch.wav" } as const;
const SFX_GAIN = { tick: 0.55, whoosh: 0.5, glitch: 0.45 } as const;

export const Reel: React.FC = () => {
  useFonts();
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [FADE_OUT_START, TOTAL_FRAMES - 2], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {/* --- ÁUDIO --- */}
      <Audio
        src={staticFile("audio/music.m4a")}
        volume={(f) => MUSIC_VOLUME * interpolate(f, [0, 20, FADE_OUT_START - 50, TOTAL_FRAMES - 2], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
      {VO_FILE ? <Audio src={staticFile(VO_FILE)} volume={1} /> : null}
      {SFX.map((s, i) => (
        <Sequence key={i} from={s.frame} durationInFrames={30} layout="none">
          <Audio src={staticFile(SFX_FILES[s.kind])} volume={SFX_GAIN[s.kind]} />
        </Sequence>
      ))}

      {/* --- VÍDEO --- */}
      <AbsoluteFill style={{ opacity: fadeOut }}>
        <Background />
        <GlitchWrap>
          <Sequence from={SCENES.s1Hook} durationInFrames={SCENE_DUR.s1Hook} layout="none"><S1Hook /></Sequence>
          <Sequence from={SCENES.s2Vazou} durationInFrames={SCENE_DUR.s2Vazou} layout="none"><S2Vazou /></Sequence>
          <Sequence from={SCENES.s3MesmoDia} durationInFrames={SCENE_DUR.s3MesmoDia} layout="none"><S3MesmoDia /></Sequence>
          <Sequence from={SCENES.s4Outros} durationInFrames={SCENE_DUR.s4Outros} layout="none"><S4Outros /></Sequence>
          <Sequence from={SCENES.s5Precedente} durationInFrames={SCENE_DUR.s5Precedente} layout="none"><S5Precedente /></Sequence>
          <Sequence from={SCENES.s6Pratica} durationInFrames={SCENE_DUR.s6Pratica} layout="none"><S6Pratica /></Sequence>
        </GlitchWrap>
        <Progress />
        <Caption />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
