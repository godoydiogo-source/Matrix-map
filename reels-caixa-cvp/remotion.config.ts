import { Config } from "@remotion/cli/config";
import fs from "node:fs";

Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(92);
Config.setOverwriteOutput(true);
Config.setPixelFormat("yuv420p");
Config.setConcurrency(4);

// Ambiente de CI/cloud: usa o Chromium pré-instalado se existir.
const chromium = "/opt/pw-browsers/chromium";
if (fs.existsSync(chromium)) {
  Config.setBrowserExecutable(chromium);
  Config.setChromiumOpenGlRenderer("swangle");
}
