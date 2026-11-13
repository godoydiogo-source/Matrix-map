import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../theme";
import { easeInOut, easeOut, lin, snapIn } from "../components/anim";
import { Card, Mono, Title } from "../components/Card";
import { Rack } from "../components/Rack";

export const SEG = 66; // frames por mini-demo
const DEMOS = ["Remotion", "GSAP", "HyperFrames", "Lottie", "Herk Edit Kit"];
const CAPTION = ["React → vídeo 9:16", "timelines no beat", "HTML → MP4", "JSON → movimento", "corta o silêncio"];

const Code: React.FC<{ lines: string[]; typed: number; size?: number }> = ({ lines, typed, size = 27 }) => (
  <pre style={{ margin: 0, fontFamily: FONTS.mono, fontWeight: 500, fontSize: size, lineHeight: 1.4, color: COLORS.text, whiteSpace: "pre" }}>
    {lines.join("\n").slice(0, typed)}
  </pre>
);

/* 1 — Remotion: componente React vira quadro 9:16 renderizado */
const RemotionDemo: React.FC<{ t: number }> = ({ t }) => {
  const lines = ["<Composition", '  id="Reel"', "  width={1080}", "  height={1920}", "  fps={30}", "/>"];
  const typed = Math.floor(lin(t, 4, 26, [0, 80]));
  const render = lin(t, 26, 30, [0, 100]);
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "80px 40px 30px", gap: 30 }}>
      <Code lines={lines} typed={typed} />
      <Title size={64} color={COLORS.lime} style={{ opacity: lin(t, 24, 6) }}>→</Title>
      <div style={{ position: "relative", width: 230, height: 408, border: `3px solid ${COLORS.lime}`, borderRadius: 14, overflow: "hidden", backgroundColor: COLORS.bg, opacity: lin(t, 24, 8) }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ position: "absolute", left: 26, right: 26, top: 60 + i * 90, height: 56, borderRadius: 6, backgroundColor: i === 1 ? COLORS.lime : COLORS.violet, scale: `${snapIn(t, 30 + i * 6)} 1`, transformOrigin: "left center" }} />
        ))}
        <Mono size={22} color={COLORS.text} style={{ position: "absolute", bottom: 18, left: 0, right: 0, textAlign: "center" }}>
          render {Math.round(render)}%
        </Mono>
        <div style={{ position: "absolute", bottom: 0, left: 0, height: 6, width: `${render}%`, backgroundColor: COLORS.lime }} />
      </div>
    </div>
  );
};

/* 2 — GSAP: timeline com playhead arrasta shapes no beat */
const GsapDemo: React.FC<{ t: number }> = ({ t }) => {
  const head = lin(t, 8, 50, [0, 1]);
  const marks = [0.12, 0.38, 0.64, 0.9];
  const shapes = ["circle", "square", "tri"] as const;
  return (
    <div style={{ position: "absolute", inset: 0, padding: "80px 50px 30px" }}>
      <Mono size={26} color={COLORS.dim}>tl.to(shape, {"{ x: 420, ease: 'power3.out' }"})</Mono>
      <div style={{ position: "relative", height: 230, marginTop: 24 }}>
        {shapes.map((s, i) => {
          const start = 8 + marks[i] * 50;
          const p = snapIn(t, start);
          const common: React.CSSProperties = { position: "absolute", top: 20 + i * 70, left: 0, width: 54, height: 54, translate: `${p * 640}px 0px`, rotate: `${p * 180}deg` };
          if (s === "circle") return <div key={s} style={{ ...common, borderRadius: "50%", backgroundColor: COLORS.lime }} />;
          if (s === "square") return <div key={s} style={{ ...common, backgroundColor: COLORS.violet, borderRadius: 6 }} />;
          return <div key={s} style={{ ...common, width: 0, height: 0, borderLeft: "27px solid transparent", borderRight: "27px solid transparent", borderBottom: `54px solid ${COLORS.text}` }} />;
        })}
      </div>
      {/* trilha */}
      <div style={{ position: "relative", height: 70, marginTop: 10 }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 32, height: 4, backgroundColor: COLORS.line }} />
        {marks.map((m, i) => (
          <div key={i} style={{ position: "absolute", left: `${m * 100}%`, top: 22, width: 24, height: 24, rotate: "45deg", backgroundColor: head >= m ? COLORS.lime : COLORS.violet, translate: "-12px 0px" }} />
        ))}
        <div style={{ position: "absolute", left: `${head * 100}%`, top: 0, width: 4, height: 70, backgroundColor: COLORS.lime, translate: "-2px 0px", boxShadow: "0 0 14px rgba(214,255,63,0.8)" }} />
      </div>
    </div>
  );
};

/* 3 — HyperFrames: documento HTML "imprime" um MP4 */
const HyperframesDemo: React.FC<{ t: number }> = ({ t }) => {
  const lines = ["<html>", "  <div class=\"hero\">", "    window.seek(t)", "  </div>", "</html>"];
  const typed = Math.floor(lin(t, 4, 22, [0, 70]));
  const print = easeInOut(t, 28, 26);
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", padding: "80px 40px 30px", gap: 30 }}>
      <div style={{ width: 440 }}>
        <Code lines={lines} typed={typed} />
      </div>
      <div style={{ position: "relative", width: 360, height: 440 }}>
        {/* slot da "impressora" */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 26, backgroundColor: COLORS.violet, borderRadius: 6 }} />
        <div style={{ position: "absolute", top: 26, left: 20, right: 20, overflow: "hidden", height: 400 }}>
          <div style={{ width: "100%", height: 330, translate: `0px ${(print - 1) * 340}px`, backgroundColor: COLORS.bg, border: `3px solid ${COLORS.lime}`, borderRadius: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <div style={{ width: 0, height: 0, borderTop: "34px solid transparent", borderBottom: "34px solid transparent", borderLeft: `56px solid ${COLORS.lime}`, marginLeft: 12 }} />
            <Mono size={30} color={COLORS.lime} style={{ fontWeight: 700 }}>out.mp4</Mono>
            <Mono size={20} color={COLORS.dim}>60 fps · seekable</Mono>
          </div>
        </div>
      </div>
    </div>
  );
};

/* 4 — Lottie: JSON vira movimento leve */
const LottieDemo: React.FC<{ t: number }> = ({ t }) => {
  const lines = ["{", '  "v": "5.7.4",', '  "fr": 30,', '  "layers": [ … ]', "}"];
  const typed = Math.floor(lin(t, 4, 20, [0, 60]));
  const spin = (t / 66) * 360 * 1.5;
  const bounce = Math.abs(Math.sin((t / 66) * Math.PI * 4));
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", padding: "80px 40px 30px", gap: 20, alignItems: "center" }}>
      <div style={{ width: 400 }}>
        <Code lines={lines} typed={typed} />
      </div>
      <div style={{ position: "relative", width: 400, height: 400, opacity: easeOut(t, 18, 10) }}>
        <div style={{ position: "absolute", inset: 60, borderRadius: "50%", border: `4px solid ${COLORS.violet}` }} />
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ position: "absolute", left: 200 - 14, top: 200 - 14, width: 28, height: 28, borderRadius: "50%", backgroundColor: COLORS.lime, translate: `${Math.cos(((spin + i * 120) * Math.PI) / 180) * 140}px ${Math.sin(((spin + i * 120) * Math.PI) / 180) * 140}px` }} />
        ))}
        <div style={{ position: "absolute", left: 200 - 36, top: 200 - 36, width: 72, height: 72, borderRadius: 12, backgroundColor: COLORS.text, scale: String(0.7 + 0.5 * bounce), rotate: `${spin / 2}deg` }} />
      </div>
    </div>
  );
};

/* 5 — Herk Edit Kit: silêncios recortados, Reel se aperta */
const HerkDemo: React.FC<{ t: number }> = ({ t }) => {
  const blocks = [120, 40, 90, 70, 60, 110, 50, 80]; // fala
  const gaps = [0, 48, 36, 60, 30, 44, 52, 0]; // silêncio antes de cada bloco
  const cut = easeInOut(t, 28, 22); // 0 → 1 fecha os silêncios
  const totalLen = blocks.reduce((a, b) => a + b, 0) + gaps.reduce((a, b) => a + b, 0) * (1 - cut);
  const secs = Math.round(58 - cut * 17);
  return (
    <div style={{ position: "absolute", inset: 0, padding: "84px 50px 30px" }}>
      <Mono size={24} color={COLORS.dim}>trilha de fala · {cut < 0.5 ? "detectando silêncio…" : "silêncio removido"}</Mono>
      <div style={{ display: "flex", alignItems: "center", height: 150, marginTop: 28, width: 800 }}>
        {blocks.map((w, i) => (
          <React.Fragment key={i}>
            <div style={{ width: gaps[i] * (1 - cut), height: 90, flex: "none", backgroundImage: `repeating-linear-gradient(90deg, ${COLORS.violet} 0 4px, transparent 4px 10px)`, opacity: 0.8 * (1 - cut), overflow: "hidden" }} />
            <div style={{ width: w, height: 40 + ((i * 37) % 70), flex: "none", backgroundColor: i % 2 ? COLORS.text : COLORS.lime, borderRadius: 4 }} />
          </React.Fragment>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 36 }}>
        <div style={{ height: 14, width: totalLen, backgroundColor: COLORS.lime, borderRadius: 7, flex: "none" }} />
        <Mono size={34} color={COLORS.text} style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>0:{secs}</Mono>
      </div>
      <Mono size={22} color={COLORS.dim} style={{ marginTop: 18 }}>cortes a partir da transcrição · Reel montado</Mono>
    </div>
  );
};

const demos = [RemotionDemo, GsapDemo, HyperframesDemo, LottieDemo, HerkDemo];

export const Scene3Demo: React.FC = () => {
  const f = useCurrentFrame();
  const k = Math.min(demos.length - 1, Math.floor(f / SEG));
  const t = f - k * SEG;
  const Demo = demos[k];
  const enter = snapIn(t, 0);

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 200, left: 90, right: 90, display: "flex", alignItems: "baseline", justifyContent: "space-between", opacity: Math.min(1, enter * 1.5) }}>
        <Title size={68} color={COLORS.lime}>{DEMOS[k]}</Title>
        <Mono size={24} color={COLORS.dim} style={{ flex: "none", marginLeft: 20 }}>{k + 1} / 5</Mono>
      </div>
      <div style={{ position: "absolute", top: 310, left: 90, opacity: Math.min(1, enter * 1.5), scale: String(0.94 + 0.06 * enter), translate: `0px ${(1 - enter) * 50}px` }}>
        <Card label={CAPTION[k].toUpperCase()} width={900} height={560}>
          <Demo t={t} />
        </Card>
      </div>
      {/* rack ao fundo: módulo citado acende */}
      <div style={{ position: "absolute", top: 1010, left: 60 }}>
        <Rack scale={0.78} labels={false} rowGap={14} dim={0.9} litNames={[DEMOS[k] === "Lottie" ? "Lottie" : DEMOS[k]]} />
      </div>
      {/* vinheta leve para não brigar com o cartão */}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, transparent 55%, rgba(8,6,14,0.55) 100%)", pointerEvents: "none", opacity: interpolate(f, [0, 10], [0, 1], { extrapolateRight: "clamp" }) }} />
    </AbsoluteFill>
  );
};
