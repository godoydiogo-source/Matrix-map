import React from "react";
import { Composition, Still } from "remotion";
import { MotionKitReel } from "./MotionKitReel";
import { Cover } from "./Cover";
import { MotionKitReelInsert } from "./MotionKitReelInsert";
import { DURATION_S, FPS, H, INSERT, W } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MotionKitReel"
        component={MotionKitReel}
        durationInFrames={DURATION_S * FPS}
        fps={FPS}
        width={W}
        height={H}
      />
      <Composition
        id="MotionKitReelInsert"
        component={MotionKitReelInsert}
        durationInFrames={Math.round((DURATION_S + INSERT.durationS) * FPS)}
        fps={FPS}
        width={W}
        height={H}
      />
      <Still id="MotionKitCover" component={Cover} width={W} height={H} />
    </>
  );
};
