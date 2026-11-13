export type Repo = { name: string; slug: string; cat: "skills" | "motores" | "complementos" };

export const REPOS: Repo[] = [
  { name: "claude-motion", slug: "whaleyxbt/claude-motion", cat: "skills" },
  { name: "claude-motion-design", slug: "howseen-ai/claude-motion-design", cat: "skills" },
  { name: "motion-graphics-skills", slug: "charlie947/motion-graphics-skills", cat: "skills" },
  { name: "claude-remotion-skill", slug: "haidrrrry/claude-remotion-skill", cat: "skills" },
  { name: "klik-anim", slug: "t3knobox/klik-anim-skill-creation", cat: "skills" },
  { name: "hyperframes-motion-reel", slug: "Sunwood-ai-labs/hyperframes-motion-reel-skill", cat: "skills" },
  { name: "Product Launch Motion", slug: "AbubakrChan/product-launch-motion", cat: "skills" },
  { name: "animate", slug: "cth9191/animate", cat: "skills" },
  { name: "motion-design-skills", slug: "iart-ai/motion-design-skills", cat: "skills" },
  { name: "Herk Edit Kit", slug: "nateherkai/herk-edit-kit", cat: "skills" },
  { name: "HyperFrames", slug: "heygen-com/hyperframes", cat: "motores" },
  { name: "Remotion", slug: "remotion-dev/remotion", cat: "motores" },
  { name: "remotion skills", slug: "remotion-dev/skills", cat: "motores" },
  { name: "GSAP", slug: "greensock/GSAP", cat: "motores" },
  { name: "awesome-motion-skills", slug: "frankxai/awesome-motion-design-agent-skills", cat: "complementos" },
  { name: "motion-design-skill", slug: "LottieFiles/motion-design-skill", cat: "complementos" },
  { name: "motion-graphics", slug: "Barty-Bart/motion-graphics", cat: "complementos" },
  { name: "motion-dev-animations", slug: "199-biotechnologies/motion-dev-animations-skill", cat: "complementos" },
  { name: "Motion", slug: "motiondivision/motion", cat: "complementos" },
  { name: "Lottie", slug: "airbnb/lottie-web", cat: "complementos" },
];

export const CAT_LABEL = { skills: "SKILLS", motores: "MOTORES", complementos: "COMPLEMENTOS" } as const;
export const byCat = (cat: Repo["cat"]) => REPOS.filter((r) => r.cat === cat);
