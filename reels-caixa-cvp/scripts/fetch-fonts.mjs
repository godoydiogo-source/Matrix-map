// Baixa Inter (400–900) e JetBrains Mono (400–700), subset latin, para public/fonts.
import fs from "node:fs";
import path from "node:path";
const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36";
const fams = [
  { name: "Inter", css: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" },
  { name: "JetBrainsMono", css: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap" },
];
const outDir = path.resolve("public/fonts");
fs.mkdirSync(outDir, { recursive: true });
let faces = "";
for (const f of fams) {
  const css = await (await fetch(f.css, { headers: { "User-Agent": UA } })).text();
  const blocks = css.split("@font-face").slice(1);
  for (const b of blocks) {
    if (!/\/\* latin \*\//.test(b)) continue;
    const w = /font-weight:\s*(\d+)/.exec(b)[1];
    const url = /url\((https:[^)]+)\)/.exec(b)[1];
    const file = `${f.name}-${w}.woff2`;
    const buf = Buffer.from(await (await fetch(url, { headers: { "User-Agent": UA } })).arrayBuffer());
    fs.writeFileSync(path.join(outDir, file), buf);
    faces += `@font-face{font-family:'${f.name === "Inter" ? "Inter" : "JetBrains Mono"}';font-style:normal;font-weight:${w};font-display:block;src:url('fonts/${file}') format('woff2');}\n`;
    console.log("ok", file, buf.length);
  }
}
fs.writeFileSync(path.join(outDir, "fonts.css"), faces);
