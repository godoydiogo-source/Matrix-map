import React from "react";
import { COLORS, FONTS } from "../theme";
import { byCat, CAT_LABEL, Repo } from "../data/repos";
import { Module } from "./Module";

type Props = {
  litNames?: string[]; // módulos acesos
  litAll?: number; // 0–1 pulso em todos
  /** progresso de encaixe por slug (0–1); ausente = 1 */
  progressOf?: (r: Repo, i: number) => number;
  scale?: number;
  labels?: boolean;
  rowGap?: number;
  dim?: number; // opacidade geral
  slot?: number; // 0–1: aparece o slot "CLAUDE CODE" embaixo
  style?: React.CSSProperties;
};

const ROWS: Repo["cat"][] = ["skills", "motores", "complementos"];

/** Bancada modular: três fileiras (10 / 4 / 6) de módulos. 1080 de largura útil. */
export const Rack: React.FC<Props> = ({ litNames = [], litAll = 0, progressOf, scale = 1, labels = true, rowGap = 26, dim = 1, slot = 0, style }) => {
  let idx = 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: rowGap, scale: String(scale), opacity: dim, transformOrigin: "center top", ...style }}>
      {ROWS.map((cat) => {
        const repos = byCat(cat);
        const perRow = cat === "skills" ? 5 : repos.length;
        const w = Math.floor((960 - (perRow - 1) * 12) / perRow);
        return (
          <div key={cat} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {labels && (
              <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: FONTS.mono, fontSize: 22, color: COLORS.violet, letterSpacing: 3 }}>
                <span>{CAT_LABEL[cat]}</span>
                <span style={{ color: COLORS.dim }}>· {repos.length}</span>
                <div style={{ flex: 1, height: 1, backgroundColor: COLORS.line }} />
              </div>
            )}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, width: 960 }}>
              {repos.map((r) => {
                const i = idx++;
                const lit = litNames.includes(r.name) ? 1 : litAll;
                return (
                  <Module
                    key={r.slug}
                    name={r.name}
                    index={i}
                    lit={lit}
                    width={w}
                    height={64}
                    fontSize={perRow >= 5 ? 20 : perRow === 4 ? 26 : 22}
                    progress={progressOf ? progressOf(r, i) : 1}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      {slot > 0 && (
        <div
          style={{
            marginTop: 8,
            height: 74,
            border: `2px dashed ${COLORS.violet}`,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONTS.mono,
            fontWeight: 700,
            fontSize: 30,
            letterSpacing: 6,
            color: COLORS.text,
            opacity: slot,
            width: 960,
          }}
        >
          [ CLAUDE CODE ]
        </div>
      )}
    </div>
  );
};
