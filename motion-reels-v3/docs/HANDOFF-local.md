# Handoff para a sessão local (Mac) — gerar a VO no Voice Studio e fechar o Reel

A sessão na nuvem não alcança o Voice Studio. Faça esta parte no seu Mac.

## 1. Trazer o projeto

```bash
git clone --branch claude/motion-reels-v3-kit-zvd6jz https://github.com/godoydiogo-source/Matrix-map.git
cd Matrix-map/motion-reels-v3
npm install
```

(Se já tiver o repositório clonado: `git fetch && git checkout claude/motion-reels-v3-kit-zvd6jz`.)

## 2. Abrir o Claude Code nessa pasta

No terminal, dentro de `Matrix-map/motion-reels-v3`:

```bash
claude
```

E cole o prompt abaixo.

## 3. Prompt para a sessão local

```
Estamos em motion-reels-v3 (Remotion, Reel 1080x1920, 48 s). Falta só a narração.

1. Gere a narração no Voice Studio deste Mac com a voz "Diogo v2", usando exatamente o texto de docs/roteiro-VO.txt (sem cortar nem improvisar palavras). Português brasileiro, ritmo entusiasmado e claro, como quem apresenta uma ferramenta. Alvo: 44–48 s de fala; teto 50 s.
2. Salve a faixa em public/vo/diogo-v2.wav (48 kHz; se o Voice Studio exportar MP3/M4A, converta com ffmpeg).
3. Em src/theme.ts, troque VO_FILE para "vo/diogo-v2.wav".
4. Sincronize as legendas: meça onde cada frase começa e termina na faixa (ffmpeg silencedetect ou transcrição com timestamps) e ajuste os tempos [início, fim] de cada frase em scripts/make-captions.mjs (PHRASES). As cenas estão em SCENES em src/theme.ts; se a VO ficar mais curta ou mais longa que o plano, ajuste os limites das cenas na mesma proporção, mantendo o total entre 44 e 48 s (DURATION_S).
5. Rode: npm run srt && npm run build && npm run thumb.
6. Pós-processo e checagem (do README): ffmpeg para bt709 / yuv420p / faststart em out/motion-kit-reel-final.mp4 e ffprobe confirmando h264 1080x1920, aac 48 kHz.
7. Renderize 8 frames espalhados (npx remotion render MotionKitReel out/frames --frames=...) e confira se a palavra destacada na legenda bate com a fala.
8. Commite (sem o MP4; out/*.mp4 está no .gitignore, mas commite docs/motion-kit-reel.srt atualizado) e faça push para a mesma branch, claude/motion-reels-v3-kit-zvd6jz. O PR #3 atualiza sozinho.

Não use outra voz nem outro TTS no lugar do Voice Studio com a voz Diogo v2. Se o Voice Studio não abrir ou a voz não aparecer, pare e avise.
```

## 4. O que já está pronto (não precisa refazer)

- 7 cenas, rack modular, SFX, legendas por palavra, capa, DM, nota de skills, identidade visual das peças jornalísticas.
- Tempos atuais das frases em `scripts/make-captions.mjs` são o plano de 48 s; eles são o único ponto a re-sincronizar com a VO real.
