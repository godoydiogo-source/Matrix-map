# Nota — skills e ferramentas usadas

Skills carregadas antes da implementação (todas as instaladas no ambiente relacionadas a design, motion,
vídeo, frontend/UI, tipografia e dados):

| Skill | Como foi usada |
|---|---|
| `anthropic-skills:motion-design` | Tokens de easing/duração: entradas com ease-out quart (`cubic-bezier(.165,.84,.44,1)`), morphs com ease-in-out cubic, barra de progresso linear, nada escalando a partir de 0, só `transform`/`opacity`. |
| `anthropic-skills:frontend-design` | Hierarquia (um elemento principal por tela), escala de espaçamento, line-height 1.2 em títulos, letter-spacing negativo em títulos grandes, no máximo 2 famílias (Inter + JetBrains Mono), contraste AA. |
| `anthropic-skills:launch-video` | Estrutura em beats (hook → prova → dado → orientação), "nenhum número que não esteja no brief", captura de frames do meio de cada beat para checar corte/sobreposição. |
| `anthropic-skills:reel-export` | Zona segura vertical, checagem com `ffprobe` (h264, 1080×1920, yuv420p, bt709, AAC), `faststart`, teste de legibilidade em tamanho de celular. |
| `dataviz` | Barras finas de uma única cor para uma medida em várias categorias (App / Transferências / Internet banking), extremidades arredondadas, rótulos em cor de texto (não na cor da série), nº hero em count-up com fonte citada. |

Skills de voz/áudio: **não existe skill nem servidor "Voice Studio" neste ambiente**. O único serviço de voz
conectado é o Higgsfield (MCP), cujas vozes listadas não incluem "Diogo v2" (existe apenas um clone chamado
"Diogo-Godoy-"). Por isso a narração ficou como placeholder silencioso e **nenhuma outra voz foi usada**.

Ferramentas: Remotion 4.0.543, ffmpeg 6.1 (verificação/encoding), Node 22 (síntese procedural de SFX e música
de reserva), Higgsfield MCP (`elevenlabs_music_v2_5`, 9,6 créditos) para a trilha instrumental principal.
