import { useCurrentFrame } from "remotion";
import { C, SAFE, W } from "../theme";
import { TOTAL_FRAMES } from "../timing";

/** Barra de progresso linear no topo da zona segura (tempo real = linear). */
export const Progress: React.FC = () => {
  const frame = useCurrentFrame();
  const p = Math.min(1, frame / TOTAL_FRAMES);
  return (
    <div style={{ position: "absolute", top: SAFE.top + 8, left: SAFE.side, width: W - SAFE.side * 2, height: 3, background: C.line, borderRadius: 2 }}>
      <div style={{ width: `${p * 100}%`, height: "100%", background: C.accent, borderRadius: 2 }} />
    </div>
  );
};
