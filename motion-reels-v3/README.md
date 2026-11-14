# Motion Reels v3 — kit de 20 repositórios de motion pro Claude Code

Reel 1080×1920 · 30 fps · 48 s · Remotion (React). Peça original de divulgação: bancada modular escura, 20 módulos em três fileiras (Skills / Motores / Complementos), CTA único "COMENTA CODE". Identidade visual igual às peças jornalísticas do canal: azul-preto `#040A10`, verde-água `#00E6CC`, coral `#FF3A5C`, Inter Tight (títulos) + JetBrains Mono (labels, repos, CODE).

## Rodar

```bash
npm install
npm start          # Remotion Studio (preview interativo)
npm run build      # out/motion-kit-reel.mp4 (H.264, CRF 18, AAC)
npm run thumb      # out/cover.png (capa 1080×1920)
npm run sfx        # regenera public/sfx/*.wav e public/vo/vo-placeholder.wav
npm run srt        # regenera src/data/captions.json e out/motion-kit-reel.srt
```

Pós-processo recomendado antes de subir (tags bt709 / range limitado / faststart):

```bash
ffmpeg -y -i out/motion-kit-reel.mp4 -c:v libx264 -crf 18 -pix_fmt yuv420p \
  -vf "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p,setparams=color_primaries=bt709:color_trc=bt709:colorspace=bt709:range=tv" \
  -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11" \
  -c:a aac -b:a 160k -ar 48000 -movflags +faststart out/motion-kit-reel-final.mp4
```

## Narração (Voice Studio · voz Diogo v2) — já encaixada

1. Gere a VO no Voice Studio com a voz **Diogo v2** usando o texto de `docs/roteiro-VO.txt`.
2. Salve como `public/vo/diogo-v2.wav` (ou .mp3/.m4a).
3. Em `src/theme.ts`, troque `VO_FILE` para `"vo/diogo-v2.wav"`.
4. Ajuste os tempos de início/fim de cada frase em `scripts/make-captions.mjs` para bater com a faixa, rode `npm run srt` e `npm run build`.

A narração oficial já está em `public/vo/diogo-v2.wav`; `vo-placeholder.wav` fica só como referência de silêncio para testes.

## Estrutura

- `src/MotionKitReel.tsx` — composição principal (cenas em `<Sequence>`, legendas, flashes, SFX, VO)
- `src/scenes/Scene1Hook … Scene7Cta.tsx` — uma cena por arquivo
- `src/components/` — `Rack`, `Module`, `Card`, `Captions` (palavra ativa em lima), `Flash`, `Sfx`, `Background`
- `src/data/repos.ts` — os 20 repositórios por categoria · `src/data/captions.json` — legendas por palavra
- `scripts/make-sfx.mjs` — SFX sintetizados (snap, tick, whoosh, click, type, flash, send, pulse, dock, cut, pop)
- `scripts/make-captions.mjs` — fonte única do roteiro com tempos → captions + SRT
- `public/fonts/` — Inter Tight e JetBrains Mono (OFL) servidas localmente
- `src/components/Marks.tsx` — check verde-água, X coral e kicker mono (padrão das peças jornalísticas)
- `docs/DM-lista-CODE.md` — texto da DM com os 20 links · `docs/NOTA-skills-usadas.md` — skills carregadas
