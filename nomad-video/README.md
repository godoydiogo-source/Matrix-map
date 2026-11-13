# NOMAD — vídeo vertical 1080x1920 @ 30 fps (~28 s)

Pipeline 100% local e gratuito: **ffmpeg + faster-whisper + Canvas 2D (Playwright/Chromium) + numpy**.
Nenhuma IA generativa, nenhum serviço pago, nenhuma música de terceiros.

## Entregas
| Arquivo | O que é |
|---|---|
| `video_final.mp4` | vídeo final (H.264 + AAC, 843 frames = 28,1 s) |
| `legenda.srt` | legendas por frase, geradas dos timestamps do whisper |
| `sync/take1..5.json` | transcrição com timestamps por palavra (faster-whisper `medium`, pt) + grafia corrigida (`display_words`) |
| `preview/frame_*.png` | quadros de preview de cada cena (compostos sobre a base) |
| `preview/qa/scene*.png` | conferência final: início/meio/fim de cada cena com as áreas não seguras sombreadas em vermelho |
| `assets/projectnomad_site.png` | captura real de projectnomad.us feita com Playwright (não é IA) |
| `src/` | todo o código-fonte do pipeline |

## Como reproduzir
```bash
pip install faster-whisper            # whisper em CPU (int8)
src/download_clips.sh                 # baixa clips/take1..5.mp4 e mostra as durações (ffprobe)
python3 src/transcribe.py medium      # -> sync/takeN.json (timestamps por palavra)
python3 src/timeline.py               # -> build/timeline.json (cortes, offsets, cues) + legenda.srt
src/build_base.sh                     # corta silêncio, 30 fps, zoom 1.00->1.08, loudnorm -> build/base.mov
node src/render_overlay.js            # motion graphics + legendas (PNG RGBA, 843 frames) -> build/overlay/
python3 src/make_audio.py             # trilha e SFX sintetizados -> build/bed.wav, build/sfx.wav
src/build_final.sh                    # composição + glitch RGB nos cortes + grão + mix -> video_final.mp4
```
Prévia de um quadro qualquer: `node src/render_overlay.js --frames 345 --out build/preview_overlay`.

## Como a sincronia funciona
* `timeline.py` lê os JSONs do whisper, corta o silêncio inicial/final de cada take (medido com `silencedetect`),
  encadeia os takes (corte seco + 6 frames de glitch) e calcula o tempo **global** de cada palavra.
* As cues nomeadas (`s1_parasse`, `s2_google`, `s3_nomad`, …) apontam para palavras do roteiro; todo gráfico
  em `src/overlay.html` entra/sai usando `TL.cues.<nome>.start/end` — nada tem tempo fixo.
* As legendas destacam a palavra falada em `#213cef` (resto em branco) e viram o `.srt`.
* O cartão final azul ocupa os últimos 0,8 s (0,5 s de cauda com o último frame congelado) e termina em fade para preto.

## Estilo
Fundo escuro, Inter bold, azul elétrico `#213cef`, grão leve (`noise`), glitch rápido (`rgbashift` + barras) nos cortes.
Áreas seguras respeitadas: nada de texto/cartão acima de y=150 nem abaixo de y=1670; rosto do apresentador
(y≈380–740) fica livre — gráficos grandes ficam no topo (150–360) ou no centro (800–1400).
