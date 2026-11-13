#!/usr/bin/env bash
# Normaliza o render do Remotion para o padrão que Reels/TikTok aceitam sem lavar cores:
# H.264 high, yuv420p, limited range (tv), BT.709, AAC 48 kHz, faststart.
set -euo pipefail
IN="${1:-out/reel-caixa-cvp.mp4}"
TMP="${IN%.mp4}.tmp.mp4"
ffmpeg -v error -y -i "$IN" \
  -vf "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p" \
  -c:v libx264 -preset slow -crf 18 -profile:v high -pix_fmt yuv420p \
  -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
  -c:a aac -b:a 192k -ar 48000 -movflags +faststart "$TMP"
mv "$TMP" "$IN"
ffprobe -v error -show_entries stream=codec_name,width,height,pix_fmt,color_range,color_space,sample_rate -of compact "$IN"
