#!/usr/bin/env bash
# Composição final: base + overlay PNG (RGBA) + glitch RGB nos cortes + grão leve; áudio = vozes + trilha (-22 dB) + SFX (-16 dB).
set -euo pipefail
cd "$(dirname "$0")/.."
TOTAL=$(python3 -c "import json;print(json.load(open('build/timeline.json'))['total'])")
# janelas de glitch (6 frames) em cada corte e na entrada do cartão final
ENABLE=$(python3 - <<'PY'
import json; tl=json.load(open('build/timeline.json'))
pts = tl['cuts'] + [tl['total'] - 0.8]
print('+'.join(f"between(t,{c:.4f},{c+0.2:.4f})" for c in pts))
PY
)
ffmpeg -v warning -stats -y \
  -i build/base.mov \
  -framerate 30 -i build/overlay/f%05d.png \
  -i build/bed.wav -i build/sfx.wav \
  -filter_complex "
    [0:v]rgbashift=rh=-14:bh=14:gv=5:enable='${ENABLE}'[vb];
    [vb][1:v]overlay=0:0:format=auto:eof_action=pass[vo];
    [vo]noise=alls=9:allf=t+u,format=yuv420p[v];
    [2:a]volume=-22dB[bed];
    [3:a]volume=-16dB[sfx];
    [0:a][bed][sfx]amix=inputs=3:duration=first:normalize=0,alimiter=limit=0.95:level=false[a]
  " \
  -map "[v]" -map "[a]" -t "$TOTAL" -r 30 \
  -c:v libx264 -preset slow -crf 18 -profile:v high -pix_fmt yuv420p -g 60 \
  -c:a aac -b:a 192k -ar 48000 -movflags +faststart \
  video_final.mp4
echo "video_final.mp4:"
ffprobe -v error -count_frames -show_entries stream=codec_type,width,height,r_frame_rate,nb_read_frames,duration -of csv=p=0 video_final.mp4
