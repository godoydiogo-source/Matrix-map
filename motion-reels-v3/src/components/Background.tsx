import { AbsoluteFill } from "remotion";
import { COLORS } from "../theme";

/** Azul-preto das peças jornalísticas: fundo liso, vinheta suave e um grid de pontos quase invisível. */
export const Background: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(rgba(0,230,204,0.10) 1px, transparent 1.5px)`,
          backgroundSize: "48px 48px",
          backgroundPosition: "24px 24px",
          opacity: 0.5,
        }}
      />
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,0,0,0) 35%, rgba(2,6,10,0.8) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
