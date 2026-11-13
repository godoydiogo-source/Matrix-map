// Gera out/legendas.srt a partir de src/captions.json (mesmos tempos das legendas queimadas).
import fs from "node:fs";
const cues = JSON.parse(fs.readFileSync(new URL("../src/captions.json", import.meta.url), "utf8"));
const ts = (s) => {
  const ms = Math.round(s * 1000);
  const h = Math.floor(ms / 3600000), m = Math.floor((ms % 3600000) / 60000), sec = Math.floor((ms % 60000) / 1000), mil = ms % 1000;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")},${String(mil).padStart(3, "0")}`;
};
const srt = cues.map((c, i) => `${i + 1}\n${ts(c.start)} --> ${ts(c.end)}\n${c.text}\n`).join("\n");
fs.mkdirSync("out", { recursive: true });
fs.writeFileSync("out/legendas.srt", srt + "\n");
console.log("out/legendas.srt:", cues.length, "cues");
