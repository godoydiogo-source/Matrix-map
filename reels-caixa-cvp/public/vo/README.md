# Narração (VO)

Esta pasta recebe a narração oficial gerada no **Voice Studio** com a voz **Diogo v2**.

Estado atual: `vo-placeholder-silencio.mp3` é um **placeholder silencioso** (63 s). Nenhuma outra voz
foi usada no lugar da Diogo v2.

## Como substituir
1. Gere a VO no Voice Studio (voz Diogo v2) com o texto e o guia de pronúncia de `ROTEIRO-VO.md`; exporte como `diogo-v2.mp3` ou `diogo-v2.wav` e salve aqui.
2. Em `src/timing.ts`, troque `VO_FILE` para `"vo/diogo-v2.mp3"`.
3. Ajuste, se necessário, os tempos (`start`/`end`, em segundos) de cada legenda em `src/captions.json`
   e os inícios de cena em `SCENES` (`src/timing.ts`) para casar com a faixa real.
4. Rode `npm run srt` para regenerar `out/legendas.srt` a partir dos mesmos tempos.
5. Rode `npm run build`.
