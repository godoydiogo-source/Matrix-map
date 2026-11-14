import { AbsoluteFill, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";

/** Flash verde-água de 3 frames nas viradas de bloco. `at` em frames absolutos. */
export const Flash: React.FC<{ at: number[] }> = ({ at }) => {
  const frame = useCurrentFrame();
  const hit = at.find((a) => frame >= a && frame < a + 3);
  if (hit === undefined) return null;
  const k = frame - hit;
  const opacity = k === 0 ? 0.7 : k === 1 ? 0.4 : 0.15;
  return <AbsoluteFill style={{ backgroundColor: COLORS.accent, opacity, mixBlendMode: "screen" }} />;
};
