import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(95);
Config.setOverwriteOutput(true);
// 9:16 · 30 fps · H.264 · AAC — ver package.json "build"
