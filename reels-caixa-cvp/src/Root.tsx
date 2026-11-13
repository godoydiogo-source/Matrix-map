import React from "react";
import { Composition, Still } from "remotion";
import { Reel } from "./Reel";
import { Thumb } from "./Thumb";
import { FPS, H, W } from "./theme";
import { TOTAL_FRAMES } from "./timing";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Reel" component={Reel} durationInFrames={TOTAL_FRAMES} fps={FPS} width={W} height={H} />
    <Still id="Thumb" component={Thumb} width={W} height={H} />
  </>
);
