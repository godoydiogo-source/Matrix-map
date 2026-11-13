import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";

/** Flash lima de 3 frames nas viradas de bloco. `at` em frames absolutos. */
export const Flash: React.FC<{ at: number[] }> = ({ at }) => {
  const frame = useCurrentFrame();
  const hit = at.find((a) => frame >= a && frame < a + 3);
  if (hit === undefined) return null;
  const k = frame - hit; // 0,1,2
  const opacity = k === 0 ? 0.95 : k === 1 ? 0.6 : 0.25;
  return <AbsoluteFill style={{ backgroundColor: COLORS.lime, opacity, mixBlendMode: "screen" }} />;
};
