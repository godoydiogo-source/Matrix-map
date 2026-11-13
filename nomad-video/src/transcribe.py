#!/usr/bin/env python3
"""Transcreve cada take com faster-whisper (pt) e salva timestamps por palavra em sync/takeN.json."""
import json, sys, pathlib, subprocess
import numpy as np
from faster_whisper import WhisperModel

ROOT = pathlib.Path(__file__).resolve().parent.parent
CLIPS, SYNC = ROOT / "clips", ROOT / "sync"
SYNC.mkdir(exist_ok=True)
MODEL = sys.argv[1] if len(sys.argv) > 1 else "medium"

model = WhisperModel(MODEL, device="cpu", compute_type="int8")
for n in range(1, 6):
    src = CLIPS / f"take{n}.mp4"
    # decodifica com ffmpeg (16 kHz mono float32) para não depender do PyAV
    pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", str(src), "-f", "f32le", "-ac", "1",
                          "-ar", "16000", "-"], capture_output=True, check=True).stdout
    audio = np.frombuffer(pcm, dtype=np.float32)
    segments, info = model.transcribe(
        audio, language="pt", word_timestamps=True, beam_size=5,
        vad_filter=False, condition_on_previous_text=False,
    )
    words, text = [], []
    for seg in segments:
        text.append(seg.text.strip())
        for w in seg.words or []:
            words.append({"word": w.word.strip(), "start": round(w.start, 3),
                          "end": round(w.end, 3), "prob": round(w.probability, 3)})
    out = {"take": n, "file": src.name, "model": MODEL, "language": info.language,
           "duration": round(info.duration, 3), "text": " ".join(text), "words": words}
    (SYNC / f"take{n}.json").write_text(json.dumps(out, ensure_ascii=False, indent=2))
    print(f"take{n}: {out['text']}")
    for w in words:
        print(f"   {w['start']:6.2f}-{w['end']:6.2f}  {w['word']}  ({w['prob']})")
