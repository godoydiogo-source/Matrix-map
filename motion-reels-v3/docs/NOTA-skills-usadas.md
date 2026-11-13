# Nota — skills de design / motion / voz carregadas e usadas

Ambiente: Claude Code (sessão cloud). Nenhum nome de skill foi inventado; a lista abaixo é o que existia instalado ou foi instalado no projeto.

## Carregadas e usadas

| Skill | Origem | Como entrou na peça |
|---|---|---|
| `anthropic-skills:motion-design` | sincronizada na conta (richtabor/agent-skills) | tokens de easing e duração: `ease-out-quart` nas entradas, `ease-in-out-cubic` nas reposições, linear nos contadores/playhead, spring só nos encaixes (overshoot mínimo) e no clímax |
| `anthropic-skills:launch-video` | sincronizada (charlie947/motion-graphics-skills) | esqueleto de beats, regra "nenhum número inventado", cursor que conduz a ação no cartão do Product Launch Motion |
| `anthropic-skills:reel-export` | sincronizada (charlie947/motion-graphics-skills) | zona segura 9:16, checagem ffprobe (h264 · 1080×1920 · yuv420p · bt709 · tv range · aac), `+faststart` |
| `anthropic-skills:frontend-design` | sincronizada na conta | hierarquia visual, escala 4 px, neutros quebrados (`#08060E` / `#14121C`), no máximo 2 famílias de fonte |
| `remotion-best-practices` (router) | `npx skills add remotion-dev/skills` → `.agents/skills/` | regras gerais: `useCurrentFrame`/`interpolate`, nada de CSS transition |
| `remotion-create` (+ `video-layout.md`) | idem | estrutura do projeto, tamanhos mínimos de texto (headline ≥ 84 px, apoio ≥ 44 px) |
| `remotion-markup` (+ `sequencing`, `audio`, `sfx`, `google-fonts`, `multi-scene-video`, `compositions`, `transitions`) | idem | `<Sequence>` por cena, `<Audio>` de `@remotion/media`, `staticFile`, estrutura de composição e still |
| `remotion-captions` (`display-captions.md`) | idem | formato `Caption` (startMs/endMs/pageBreakAfter) usado em `src/data/captions.json` e no `.srt` |
| `remotion-render` | idem | `npx remotion render … --frames` para contact sheets de revisão; `remotion still` para a capa |
| `remotion-multimedia` | idem | consultada (sem uso direto no render) |

## Disponíveis, não usadas (e por quê)

- `anthropic-skills:brand-intake` — a peça já tinha paleta, fontes e direção de arte definidas no brief; não havia `brand.md` a criar.
- `remotion-maps`, `remotion-saas`, `remotion-interactivity`, `remotion-upgrade`, `remotion-license`, `remotion-docs`, `remotion-studio` — fora do escopo (sem mapas, sem Player/Lambda, sem upgrade).
- `heygen-com/hyperframes` — não instalado: o projeto e o render final são Remotion, como pedido; HyperFrames aparece só como nome tipográfico na demo.

## Voz

- Servidor de voz disponível na sessão: Higgsfield (MCP). Vozes do usuário encontradas: `Diogo-Godoy-`, `Frank-clone-3`, `Frank-Koji`. **Não existe voz chamada "Diogo v2"** e não há servidor "Voice Studio" conectado.
- Seguindo o brief ("não troque pela voz de outro serviço, nem apresente outra voz como se fosse a Diogo v2"), a narração **não foi gerada**. O vídeo foi renderizado com placeholder silencioso (`public/vo/vo-placeholder.wav`), SFX completos e legendas no tempo planejado.
- Ponto de substituição: `src/theme.ts` → `VO_FILE`. Tempos das frases: `scripts/make-captions.mjs` (gera `captions.json` + `.srt`).
