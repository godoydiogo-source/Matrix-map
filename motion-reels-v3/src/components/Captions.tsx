import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, W } from "../theme";
import captions from "../data/captions.json";

type Cap = { text: string; startMs: number; endMs: number; pageBreakAfter?: boolean };

const pages: Cap[][] = [];
{
  let cur: Cap[] = [];
  for (const c of captions as Cap[]) {
    cur.push(c);
    if (c.pageBreakAfter) {
      pages.push(cur);
      cur = [];
    }
  }
  if (cur.length) pages.push(cur);
}

/**
 * Legendas queimadas com destaque na palavra falada:
 * frase inteira em creme, palavra ativa em lima com uma barra fina lima por baixo.
 * Fica dentro da zona segura (acima dos 250 px da base).
 */
export const Captions: React.FC<{ bottom?: number; hideAfterFrame?: number }> = ({ bottom = 330, hideAfterFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;
  if (hideAfterFrame !== undefined && frame >= hideAfterFrame) return null;
  const page = pages.find((p) => ms >= p[0].startMs - 120 && ms < p[p.length - 1].endMs + 180);
  if (!page) return null;

  const isCode = (t: string) => t.replace(/[^\p{L}]/gu, "") === "CODE";

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom,
        display: "flex",
        justifyContent: "center",
        padding: `0 ${(W - 940) / 2}px`,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "6px 18px",
          maxWidth: 940,
          fontFamily: FONTS.title,
          fontWeight: 800,
          fontSize: 54,
          lineHeight: 1.15,
          letterSpacing: -0.5,
          textTransform: "none",
        }}
      >
        {page.map((c, i) => {
          const active = ms >= c.startMs && ms < c.endMs;
          const past = ms >= c.endMs;
          const color = isCode(c.text) ? COLORS.magenta : active ? COLORS.lime : past ? COLORS.text : "rgba(244,240,230,0.5)";
          return (
            <span
              key={i}
              style={{
                position: "relative",
                color,
                textShadow: "0 2px 18px rgba(8,6,14,0.9), 0 0 2px rgba(8,6,14,1)",
                scale: active ? "1.04" : "1",
                display: "inline-block",
              }}
            >
              {c.text}
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: -6,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: isCode(c.text) ? COLORS.magenta : COLORS.lime,
                  opacity: active ? 1 : 0,
                }}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
};
