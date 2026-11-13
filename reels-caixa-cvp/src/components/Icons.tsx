import React from "react";
import { C } from "../theme";

const base = { fill: "none", stroke: C.accent, strokeWidth: 4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const IconShield: React.FC<{ size?: number }> = ({ size = 88 }) => (
  <svg width={size} height={size} viewBox="0 0 88 88">
    <path d="M44 8 L74 20 V44 C74 62 60 74 44 80 C28 74 14 62 14 44 V20 Z" {...base} />
    <rect x="32" y="40" width="24" height="18" rx="3" {...base} />
    <path d="M37 40 V34 a7 7 0 0 1 14 0 V40" {...base} />
  </svg>
);

export const IconBubble: React.FC<{ size?: number }> = ({ size = 88 }) => (
  <svg width={size} height={size} viewBox="0 0 88 88">
    <path d="M14 20 h60 a6 6 0 0 1 6 6 v34 a6 6 0 0 1 -6 6 H40 L24 78 V66 H14 a6 6 0 0 1 -6 -6 V26 a6 6 0 0 1 6 -6 Z" {...base} stroke={C.alert} />
    <line x1="44" y1="32" x2="44" y2="46" {...base} stroke={C.alert} strokeWidth={5} />
    <circle cx="44" cy="55" r="2.5" fill={C.alert} />
  </svg>
);

export const IconMail: React.FC<{ size?: number }> = ({ size = 88 }) => (
  <svg width={size} height={size} viewBox="0 0 88 88">
    <rect x="10" y="22" width="68" height="46" rx="6" {...base} />
    <path d="M12 26 L44 50 L76 26" {...base} />
    <path d="M58 60 l6 6 l12 -12" {...base} />
  </svg>
);
