#!/usr/bin/env bash
# Normaliza cada take (corte de silêncio, 30 fps, zoom digital 1.00->1.08, loudnorm, contagem exata de frames)
# e concatena em build/base.mp4 (vídeo base sem gráficos).
set -euo pipefail
cd "$(dirname "$0")/.."
python3 - build/timeline.json <<'PY' > build/base_cmds.sh
import json, sys
tl = json.load(open(sys.argv[1])); tail = tl["tail"]
for t in tl["takes"]:
    n, s, d, fr = t["n"], t["trimStart"], t["dur"], t["frames"]
    extra = tail if n == 5 else 0.0
    frames = fr + round(extra * 30); dur = round(d + extra, 4)
    # zoom digital 1.00 -> 1.08 ao longo do take (zoompan sobre upscale 2x para suavizar o passo)
    vf = (f"trim=start={s}:duration={d},setpts=PTS-STARTPTS,fps=30,scale=2160:3840:flags=lanczos,"
          f"zoompan=z='1+0.08*min(on/{fr},1)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1080x1920:fps=30,"
          f"tpad=stop_mode=clone:stop_duration=2,trim=end_frame={frames},setpts=N/30/TB,setsar=1,format=yuv420p")
    af = (f"atrim=start={s}:duration={d},asetpts=PTS-STARTPTS,loudnorm=I=-16:TP=-1.5:LRA=11,"
          f"aresample=48000,asetpts=N/SR/TB,apad=whole_dur={dur},atrim=end={dur}")
    print(f'ffmpeg -v error -y -i clips/take{n}.mp4 -vf "{vf}" -af "{af}" -r 30 '
          f'-c:v libx264 -preset fast -crf 14 -c:a pcm_s16le -ac 2 build/base_{n}.mov &')
print("wait")
PY
bash build/base_cmds.sh
ffmpeg -v error -y -i build/base_1.mov -i build/base_2.mov -i build/base_3.mov -i build/base_4.mov -i build/base_5.mov \
  -filter_complex "[0:v][0:a][1:v][1:a][2:v][2:a][3:v][3:a][4:v][4:a]concat=n=5:v=1:a=1[v][a]" \
  -map "[v]" -map "[a]" -r 30 -c:v libx264 -preset fast -crf 14 -c:a pcm_s16le build/base.mov
echo "base:"; ffprobe -v error -count_frames -show_entries stream=codec_type,nb_read_frames,duration -of csv=p=0 build/base.mov
