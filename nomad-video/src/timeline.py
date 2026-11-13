#!/usr/bin/env python3
"""Gera build/timeline.json (cortes, offsets globais, palavras, cues) e legenda.srt a partir de sync/takeN.json.
Os tempos vêm 100% do whisper; o roteiro só corrige a grafia exibida (whisper escreveu 'Nomed', 'rikipíria')."""
import json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
FPS = 30
SCRIPT = {
    1: "E se a internet do mundo parasse por três meses?",
    2: "Sem Google. Sem Wikipédia. Sem IA. Sem mapa. Você saberia o que fazer?",
    3: "Existe um projeto chamado Project NOMAD. É um servidor que roda no seu próprio computador, "
       "sem internet, com Wikipédia, referências médicas e guias de sobrevivência.",
    4: "Mapas offline e até uma IA local. Tudo funcionando com a internet desligada.",
    5: "Quer o passo a passo para montar o seu? Comenta NOMAD que eu te envio.",
}
# silêncio inicial medido com silencedetect (-35 dB); whisper fixa a 1ª palavra em 0.00
LEAD_SILENCE = {1: 0.24, 2: 0.0, 3: 0.0, 4: 0.0, 5: 0.565}
PRE, POST = 0.08, 0.16          # folga antes da 1ª palavra e depois da última
TAIL = 0.5                      # cauda extra (frame congelado) sob o cartão final azul
# cues nomeadas: (take, índice da palavra no roteiro)
CUES = {
    "s1_start": (1, 0), "s1_internet": (1, 3), "s1_parasse": (1, 6), "s1_tres": (1, 8), "s1_meses": (1, 9),
    "s2_google": (2, 1), "s2_wiki": (2, 3), "s2_ia": (2, 5), "s2_mapa": (2, 7), "s2_voce": (2, 8), "s2_fazer": (2, 12),
    "s3_project": (3, 4), "s3_nomad": (3, 5), "s3_e": (3, 6), "s3_roda": (3, 9), "s3_computador": (3, 14),
    "s3_sem": (3, 15), "s3_internet": (3, 16), "s3_wiki": (3, 18), "s3_ref": (3, 19), "s3_medicas": (3, 20),
    "s3_guias": (3, 22), "s3_sobrev": (3, 24),
    "s4_mapas": (4, 0), "s4_offline": (4, 1), "s4_ia": (4, 5), "s4_local": (4, 6), "s4_tudo": (4, 7),
    "s4_internet": (4, 11), "s4_desligada": (4, 12),
    "s5_quer": (5, 0), "s5_seu": (5, 8), "s5_comenta": (5, 9), "s5_nomad": (5, 10), "s5_envio": (5, 14),
}

def q(t):  # quantiza para frame
    return round(round(t * FPS) / FPS, 4)

takes, words, offset = [], [], 0.0
for n in range(1, 6):
    data = json.loads((ROOT / "sync" / f"take{n}.json").read_text())
    ws = data["words"]
    script_words = SCRIPT[n].split()
    assert len(ws) == len(script_words), (n, len(ws), len(script_words))
    first = max(ws[0]["start"], LEAD_SILENCE[n])
    start = q(max(0.0, first - PRE))
    end = q(min(data["duration"], ws[-1]["end"] + POST))
    dur = q(end - start)
    frames = round(dur * FPS)
    take = {"n": n, "src": f"clips/take{n}.mp4", "trimStart": start, "trimEnd": end,
            "dur": dur, "frames": frames, "offset": q(offset), "text": SCRIPT[n]}
    takes.append(take)
    for i, (w, sw) in enumerate(zip(ws, script_words)):
        ws_ = max(w["start"], start)
        words.append({"take": n, "i": i, "word": sw, "raw": w["word"],
                      "clean": re.sub(r"[^\wÀ-ÿ%/]", "", sw),
                      "start": q(offset + ws_ - start), "end": q(offset + max(w["end"], ws_ + 0.05) - start)})
    offset += dur
    # grava a grafia corrigida de volta no JSON de sincronia
    data["display_words"] = script_words
    (ROOT / "sync" / f"take{n}.json").write_text(json.dumps(data, ensure_ascii=False, indent=2))

total = q(offset + TAIL)
cues = {}
for name, (n, i) in CUES.items():
    w = next(x for x in words if x["take"] == n and x["i"] == i)
    cues[name] = {"start": w["start"], "end": w["end"]}

# frases para legenda: quebra em pontuação ou a cada 4 palavras
phrases = []
for t in takes:
    tw = [w for w in words if w["take"] == t["n"]]
    cur = []
    for w in tw:
        cur.append(w)
        if re.search(r"[.?!,]$", w["word"]) or len(cur) >= 4:
            phrases.append(cur); cur = []
    if cur: phrases.append(cur)
captions = []
for k, ph in enumerate(phrases):
    start, end = ph[0]["start"], ph[-1]["end"]
    nxt = phrases[k + 1][0]["start"] if k + 1 < len(phrases) else total
    end = min(nxt, end + 0.35)  # segura a frase até a próxima entrar
    captions.append({"start": start, "end": end, "words": [{"w": w["word"], "start": w["start"], "end": w["end"]} for w in ph]})

tl = {"fps": FPS, "width": 1080, "height": 1920, "total": total, "frames": round(total * FPS),
      "tail": TAIL, "speechEnd": q(offset), "takes": takes, "words": words, "cues": cues, "captions": captions,
      "cuts": [t["offset"] for t in takes[1:]]}
(ROOT / "build").mkdir(exist_ok=True)
(ROOT / "build" / "timeline.json").write_text(json.dumps(tl, ensure_ascii=False, indent=1))

def srt_time(t):
    ms = round(t * 1000); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"
lines = []
for k, c in enumerate(captions, 1):
    lines += [str(k), f"{srt_time(c['start'])} --> {srt_time(c['end'])}", " ".join(w["w"] for w in c["words"]), ""]
(ROOT / "legenda.srt").write_text("\n".join(lines))

print(f"total {total}s = {tl['frames']} frames")
for t in takes: print(f"  take{t['n']}: {t['trimStart']:.2f}-{t['trimEnd']:.2f} dur {t['dur']:.3f} ({t['frames']}f) offset {t['offset']:.3f}")
for k, v in cues.items(): print(f"  {k:14s} {v['start']:6.2f}-{v['end']:6.2f}")
