import React from "react";
import { Composition, Still } from "remotion";
import { MotionKitReel } from "./MotionKitReel";
import { Cover } from "./Cover";
import { DURATION_S, FPS, H, W } from "./theme";

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
      <Still id="MotionKitCover" component={Cover} width={W} height={H} />
    </>
  );
};
