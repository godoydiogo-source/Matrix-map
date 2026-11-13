import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../theme";
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
 * Legenda no padrão das peças jornalísticas: caixa escura arredondada na base,
 * frase em branco bold; a palavra falada fica em verde-água, "CODE" em coral.
 * Fica dentro da zona segura (acima dos 250 px da base).
 */
export const Captions: React.FC<{ bottom?: number; hideAfterFrame?: number }> = ({ bottom = 300, hideAfterFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;
  if (hideAfterFrame !== undefined && frame >= hideAfterFrame) return null;
  const page = pages.find((p) => ms >= p[0].startMs - 120 && ms < p[p.length - 1].endMs + 180);
  if (!page) return null;

  const isCode = (t: string) => t.replace(/[^\p{L}]/gu, "") === "CODE";

  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
      <div
        style={{
          maxWidth: 960,
          backgroundColor: COLORS.capBox,
          border: `1px solid ${COLORS.line}`,
          borderRadius: 16,
          padding: "22px 34px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "4px 14px",
          fontFamily: FONTS.title,
          fontWeight: 700,
          fontSize: 46,
          lineHeight: 1.18,
          letterSpacing: -0.6,
          textAlign: "center",
        }}
      >
        {page.map((c, i) => {
          const active = ms >= c.startMs && ms < c.endMs;
          const color = isCode(c.text) ? COLORS.alert : active ? COLORS.accent : COLORS.text;
          return (
            <span key={i} style={{ color, display: "inline-block" }}>
              {c.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};
