#!/usr/bin/env bash
# Baixa os 5 takes do apresentador para ./clips/
set -euo pipefail
cd "$(dirname "$0")/../clips"
B=https://d8j0ntlcm91z4.cloudfront.net/user_38GDHQeLQtvjD6pegwp64ipP7e4
curl -sSfL -o take1.mp4 "$B/hf_20261110_220640_dfe3eced-13bc-4bea-9687-66e816f32579.mp4" &
curl -sSfL -o take2.mp4 "$B/hf_20261110_220640_c0d002c7-4ebc-4cea-a315-14f00c26417b.mp4" &
curl -sSfL -o take3.mp4 "$B/hf_20261110_220640_883866ad-1d5f-4234-849b-4ad7e331b289.mp4" &
curl -sSfL -o take4.mp4 "$B/hf_20261110_220640_8d1b94d1-637f-41e6-bb0a-270207d1fd00.mp4" &
curl -sSfL -o take5.mp4 "$B/hf_20261110_220640_487a96c9-c5aa-4774-9199-6ad51d48a5ca.mp4" &
wait
for f in take*.mp4; do
  echo "== $f"
  ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,duration,codec_name -of csv=p=0 "$f"
  ffprobe -v error -select_streams a:0 -show_entries stream=codec_name,sample_rate,channels,duration -of csv=p=0 "$f"
done
