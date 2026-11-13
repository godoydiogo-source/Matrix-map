import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, W, H } from "../theme";

/** Fundo abstrato: grid fino em deriva lenta, pulsos concêntricos e vinheta. */
export const Background: React.FC<{ pulseOrigin?: [number, number] }> = ({ pulseOrigin = [W * 0.78, H * 0.3] }) => {
  const frame = useCurrentFrame();
  const drift = (frame * 0.25) % 80;
  const rings = [0, 1, 2].map((i) => {
    const period = 110;
    const p = ((frame + i * (period / 3)) % period) / period;
    return { r: 80 + p * 900, o: (1 - p) * 0.18 };
  });
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, overflow: "hidden" }}>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform={`translate(0 ${drift})`}>
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke={C.text} strokeOpacity="0.05" strokeWidth="1" />
          </pattern>
          <radialGradient id="vig" cx="50%" cy="45%" r="75%">
            <stop offset="55%" stopColor={C.bg} stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.75" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#grid)" />
        {rings.map((r, i) => (
          <circle key={i} cx={pulseOrigin[0]} cy={pulseOrigin[1]} r={r.r} fill="none" stroke={C.accent} strokeOpacity={r.o} strokeWidth="1.5" />
        ))}
        <rect width={W} height={H} fill="url(#vig)" />
      </svg>
    </AbsoluteFill>
  );
};
