# Reels — Vazamento Caixa Vida e Previdência (13/11/2026)

Motion graphics original, puramente informativo, para Instagram Reels / TikTok.
1080×1920 · 30 fps · H.264 + AAC 48 kHz · ~63 s. Stack: **Remotion 4 (React + TypeScript)**.

## Rodar

```bash
npm install
npm start          # Remotion Studio (preview)
npm run build      # renderiza out/reel-caixa-cvp.mp4
npm run build:thumb# renderiza out/thumb-caixa-cvp.png (capa)
npm run srt        # regenera out/legendas.srt a partir de src/captions.json
npm run audio      # (re)sintetiza SFX e a música de reserva em public/audio
npm run fonts      # baixa Inter e JetBrains Mono para public/fonts
```

Em ambiente sem Chrome, `remotion.config.ts` usa `/opt/pw-browsers/chromium` se existir; em máquina local
o Remotion baixa o Chrome Headless Shell sozinho.

## Estrutura

```
src/
  Root.tsx            composições: Reel (vídeo) e Thumb (capa)
  Reel.tsx            montagem: fundo, cenas, legendas, progresso, áudio (música, VO, SFX)
  Thumb.tsx           capa 1080×1920 ("7,6 MILHÕES" + "CAIXA VIDA E PREVIDÊNCIA")
  timing.ts           PONTO ÚNICO DE SINCRONIA: inícios de cena, cortes, contadores, SFX, arquivo de VO
  captions.json       legendas queimadas (start/end em segundos, texto, palavras-chave em ciano) = fonte do .srt
  theme.ts            paleta, fontes, zona segura, curvas de easing
  components/         Background, Caption, Motion (Enter/Words/CountUp), Card/Chip/Seal, Glitch, Icons, Progress
  scenes/             S1Hook, S2Vazou, S3MesmoDia, S4Outros, S5Precedente, S6Pratica
public/
  fonts/              Inter + JetBrains Mono (woff2, SIL OFL)
  audio/              music.m4a (trilha), music-synth-reserva.m4a (reserva), tick/whoosh/glitch.wav (SFX sintetizados)
  vo/                 narração — ver public/vo/README.md (placeholder silencioso até a VO oficial)
scripts/              gen-audio.mjs, make-srt.mjs, fetch-fonts.mjs
out/                  legendas.srt, thumb-caixa-cvp.png, reel-caixa-cvp.mp4 (gerado; não versionado)
```

## Narração (VO)

A VO oficial deve ser gerada no **Voice Studio** com a voz **Diogo v2**. Neste ambiente essa voz não estava
disponível, então o vídeo foi montado com um **placeholder silencioso** (`public/vo/vo-placeholder-silencio.mp3`).
Nenhuma outra voz foi usada no lugar. Para trocar: `public/vo/README.md`.

Tempos de legenda/cena foram planejados para o roteiro lido em ritmo de âncora (~190 palavras em ~62 s).
Ao receber a faixa real, ajuste `src/captions.json` e `SCENES` em `src/timing.ts` e rode `npm run srt && npm run build`.

## Zona segura e legibilidade

160 px livres no topo e 250 px na base. Legendas (Inter 700, 54 px) ficam acima da base segura; números em
JetBrains Mono. Paleta: fundo `#070B12`, texto `#F4F7FA`, destaque `#00E8D1`, alerta `#FF3B5C`, card `#121826`.
