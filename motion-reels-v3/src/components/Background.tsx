import { AbsoluteFill } from "remotion";
import { COLORS } from "../theme";

/** Ink quase preto com grid violeta muito sutil e vinheta leve. */
export const Background: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            `linear-gradient(${COLORS.line} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.line} 1px, transparent 1px)`,
          backgroundSize: "120px 120px",
          backgroundPosition: "60px 40px",
          opacity: 0.32,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(0,0,0,0) 40%, rgba(8,6,14,0.75) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
