Aqui está o kit que eu organizei: 20 repositórios open source de motion pro Claude Code, separados por categoria. Eu não sou o autor dessas ferramentas — só curadoria e a lista pronta.

**Skills (10)**

1. **claude-motion** — https://github.com/whaleyxbt/claude-motion
   Toolkit de motion design para agentes: gosto e regras com número (easing, spring, tipografia), loop de revisão por contact sheet de frames, motor de som em Python e um segundo pipeline que renderiza simulações web (HTML) frame a frame em vídeo 60 fps.
2. **claude-motion-design** — https://github.com/howseen-ai/claude-motion-design
   Skill para vídeos de motion em código puro (HTML + Playwright + ffmpeg), sem After Effects e sem licença Remotion. Tem um modo remake.
3. **motion-graphics-skills** — https://github.com/charlie947/motion-graphics-skills
   Pack de skills para motion de lançamento em código (brief, launch video, explainer, chart, reel-export etc.). O README atual lista 15 skills.
4. **claude-remotion-skill** — https://github.com/haidrrrry/claude-remotion-skill
   Skill que ensina o Claude a criar e editar motion graphics com Remotion: springs, legendas sincronizadas, som e o loop render → inspecionar frames → corrigir.
5. **klik-anim-skill-creation** — https://github.com/t3knobox/klik-anim-skill-creation
   Três skills para motion com Remotion: `klik-anim` (leis de animação no plano), `klik-cam` (câmera) e `klik-remotion-method` (pipeline de ponta a ponta).
6. **hyperframes-motion-reel-skill** — https://github.com/Sunwood-ai-labs/hyperframes-motion-reel-skill
   Skill de showreel no HyperFrames (HTML + GSAP + SVG/Canvas), cortado no beat (padrão 120 BPM / 60 fps) até o MP4.
7. **Product Launch Motion** — https://github.com/AbubakrChan/product-launch-motion
   Skill de filme de lançamento a partir da URL do site. A v2 (atual) é music-first: HTML, springs, cursor que conduz a ação, SFX no beat, 60 fps com motion blur. A versão com narração (v1: VO + GSAP + HyperFrames) está na pasta `legacy/` e instala à parte: `npx skills add AbubakrChan/product-launch-motion/legacy`.
8. **animate** — https://github.com/cth9191/animate
   Animação procedimental em um único arquivo, com 7 estilos prontos (cut paper, riso, math, pixel etc.) ou um look batido a partir de referências; música no beat; screenshots reais do produto; vários formatos a partir da mesma peça.
9. **motion-design-skills** — https://github.com/iart-ai/motion-design-skills
   Fundamentos e motores como skills instaláveis: timing, tipografia, cor, composição, After Effects, Remotion, logo e backgrounds.
10. **Herk Edit Kit** — https://github.com/nateherkai/herk-edit-kit
    De Nate Herk (antes se chamava HyperFrames Student Kit). Edita vídeos, Reels e Shorts com Codex ou Claude Code: 15 skills, cortes a partir da transcrição (silêncio, erros), storytelling, 406 cards de motion e templates HyperFrames.

**Motores (4)**

11. **HyperFrames** — https://github.com/heygen-com/hyperframes
    Motor open source: escreve HTML (com animação seekable) e renderiza MP4. Feito para agentes; tem skills e CLI próprios.
12. **Remotion** — https://github.com/remotion-dev/remotion
    Motor para fazer vídeos programaticamente com React.
13. **Remotion Skills** — https://github.com/remotion-dev/skills
    Skills oficiais do agente Remotion (best practices, create, markup, render, captions, docs etc.). É o pacote oficial de skills que acompanha o Remotion, não um segundo renderer.
14. **GSAP** — https://github.com/greensock/GSAP
    Biblioteca JavaScript de animação (tweens, timelines) para a web moderna.

**Complementos (6)**

15. **awesome-motion-design-agent-skills** — https://github.com/frankxai/awesome-motion-design-agent-skills
    Catálogo curado + 5 skills instaláveis (entre elas `motion-director`, `remotion-video-agent`, `web-motion-auditor`) para agentes, cobrindo GSAP, Motion, Remotion, Lottie, Rive e QA de motion.
16. **motion-design-skill (LottieFiles)** — https://github.com/LottieFiles/motion-design-skill
    Princípios universais de motion para agentes: timing, easing, coreografia, princípios da Disney adaptados para UI. Não é o player Lottie.
17. **motion-graphics (Barty-Bart)** — https://github.com/Barty-Bart/motion-graphics
    Skills de edição/motion para Claude Code, cada uma com um trabalho: B-roll no tempo da fala, separação de objeto, explainers e SFX no beat.
18. **motion-dev-animations-skill** — https://github.com/199-biotechnologies/motion-dev-animations-skill
    Skill de animações web com Motion.dev (ex-Framer Motion): springs, scroll, gestos, alvo de 120 fps na interface.
19. **Motion** — https://github.com/motiondivision/motion
    Biblioteca de animação para React, JavaScript e Vue (o sucessor do Framer Motion).
20. **Lottie (lottie-web)** — https://github.com/airbnb/lottie-web
    Player que renderiza na web (e em outras plataformas) animações do After Effects exportadas em JSON via Bodymovin.

Pra começar: abre o Claude Code, instala as skills da lista (`npx skills add <autor/repo>`) e descreve o vídeo que você quer. Qualquer dúvida, me chama por aqui.
