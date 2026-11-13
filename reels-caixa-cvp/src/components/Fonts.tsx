import { useEffect, useState } from "react";
import { continueRender, delayRender, staticFile } from "remotion";

const FACES: Array<[string, string, string]> = [
  ["Inter", "fonts/Inter-700.woff2", "100 900"],
  ["JetBrains Mono", "fonts/JetBrainsMono-700.woff2", "100 900"],
];

/** Carrega Inter e JetBrains Mono locais (sem rede) antes de renderizar. */
export const useFonts = () => {
  const [handle] = useState(() => delayRender("Carregando fontes"));
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await Promise.all(
          FACES.map(async ([family, file, weight]) => {
            const face = new FontFace(family, `url(${staticFile(file)})`, { weight });
            await face.load();
            (document.fonts as unknown as { add: (f: FontFace) => void }).add(face);
          })
        );
      } catch (e) {
        console.warn("Fontes locais falharam; usando fallback do sistema", e);
      }
      if (!cancelled) continueRender(handle);
    })();
    return () => {
      cancelled = true;
    };
  }, [handle]);
};
