#!/usr/bin/env python3
"""Trilha e efeitos 100% sintetizados em numpy (sem samples, sem música de terceiros).
Lê build/timeline.json para posicionar os efeitos nas cues do whisper.
Saída: build/bed.wav (trilha, pico -1 dBFS) e build/sfx.wav (efeitos). A mixagem final aplica -22 dB / -16 dB."""
import json, pathlib, wave
import numpy as np

ROOT = pathlib.Path(__file__).resolve().parent.parent
TL = json.load(open(ROOT / "build" / "timeline.json"))
SR = 48000
TOTAL = TL["total"]
N = int(round(TOTAL * SR))
t = np.arange(N) / SR
rng = np.random.default_rng(7)
C = TL["cues"]; cuts = TL["cuts"]
scene_t = [tk["offset"] for tk in TL["takes"]]


def env_ad(n, a, d, curve=3.0):
    """ataque linear + decaimento exponencial"""
    x = np.arange(n) / SR
    e = np.minimum(x / max(a, 1e-4), 1.0) * np.exp(-curve * np.maximum(x - a, 0) / max(d, 1e-4))
    return e


def place(buf, sig, at, gain=1.0):
    i = int(round(at * SR)); j = min(N, i + len(sig))
    if i < 0 or i >= N: return
    buf[i:j] += sig[: j - i] * gain


def bandnoise(dur, lo, hi, seed=None):
    r = np.random.default_rng(seed)
    n = int(dur * SR); x = r.standard_normal(n)
    X = np.fft.rfft(x); f = np.fft.rfftfreq(n, 1 / SR)
    mask = np.exp(-0.5 * ((np.log(np.maximum(f, 1)) - np.log(np.sqrt(lo * hi))) / (0.5 * np.log(hi / lo))) ** 2)
    return np.fft.irfft(X * mask, n) / 3.0


def pad_tone(freq, dur, cutoff_fn, detune=1.004, harmonics=14):
    """saw suave filtrada: harmônicos com amplitude dependente do cutoff variável (sem loop de filtro)."""
    n = int(dur * SR); x = np.arange(n) / SR
    out = np.zeros(n)
    cut = cutoff_fn(x)
    for k in range(1, harmonics + 1):
        a = (1.0 / k) / (1 + (k * freq / cut) ** 4)
        ph = rng.uniform(0, 2 * np.pi)
        out += a * (np.sin(2 * np.pi * k * freq * x + ph) + np.sin(2 * np.pi * k * freq * detune * x))
    return out


# ------------------------------------------------------------------ TRILHA
bed = np.zeros(N)
BPM = 96; beat = 60 / BPM

# progressão por cena (Hz) – lá menor sombrio -> fá maior (esperança) -> volta
chords = [(55.0, 82.41, 130.81), (55.0, 82.41, 130.81), (43.65, 65.41, 130.81), (43.65, 65.41, 130.81), (55.0, 82.41, 110.0)]
bounds = scene_t + [TOTAL]
for i, (lo, mid, hi) in enumerate(chords):
    s, e = bounds[i], bounds[i + 1]
    dur = e - s + 0.4
    lfo = lambda x, s=s: 180 + 140 * (0.5 + 0.5 * np.sin(2 * np.pi * 0.11 * (x + s))) + (120 if i >= 2 else 0)
    tone = 0.55 * pad_tone(lo, dur, lfo) + 0.35 * pad_tone(mid, dur, lfo) + (0.18 * pad_tone(hi, dur, lambda x: 500 + 0 * x) if i >= 2 else 0)
    n = len(tone); env = np.ones(n)
    fade = int(0.35 * SR); env[:fade] = np.linspace(0, 1, fade); env[-fade:] *= np.linspace(1, 0, fade)
    place(bed, tone * env, s, 0.16)

# pulso grave em cada tempo (kick sintético curto) e tic de chimbal nos contratempos
k = 0.0
while k < TOTAL:
    n = int(0.28 * SR); x = np.arange(n) / SR
    kick = np.sin(2 * np.pi * (48 * x + 90 * np.exp(-x * 30))) * env_ad(n, 0.002, 0.18, 4)
    place(bed, kick, k, 0.42 if k >= scene_t[1] else 0.3)
    hat = bandnoise(0.05, 5000, 12000, int(k * 100)) * env_ad(int(0.05 * SR), 0.001, 0.03, 6)
    place(bed, hat, k + beat / 2, 0.10)
    k += beat

# arpejo (plucks em lá menor pentatônico) a partir da cena 3 para dar movimento
notes = [220.0, 261.63, 293.66, 329.63, 392.0, 440.0]
k = scene_t[2]
step = beat / 2; idx = 0
pattern = [0, 2, 4, 3, 1, 4, 5, 2]
while k < TOTAL - 0.8:
    f = notes[pattern[idx % len(pattern)]] * (1 if idx % 16 < 8 else 0.5)
    n = int(0.35 * SR); x = np.arange(n) / SR
    pluck = (np.sin(2 * np.pi * f * x) + 0.3 * np.sin(2 * np.pi * 2 * f * x)) * env_ad(n, 0.003, 0.22, 5)
    place(bed, pluck, k, 0.12)
    k += step; idx += 1

# riser de ruído antes do cartão final
rise_dur = 1.6; n = int(rise_dur * SR); x = np.arange(n) / SR
riser = bandnoise(rise_dur, 300, 6000, 99) * (x / rise_dur) ** 2
place(bed, riser, TOTAL - 0.8 - rise_dur, 0.35)
# acorde final no cartão azul
n = int(0.9 * SR); x = np.arange(n) / SR
hit = sum(np.sin(2 * np.pi * f * x) for f in (110, 220, 329.63, 440)) * env_ad(n, 0.005, 0.6, 3)
place(bed, hit, TOTAL - 0.8, 0.25)

bed /= np.max(np.abs(bed)) / 0.89  # pico -1 dBFS

# ------------------------------------------------------------------ EFEITOS
sfx = np.zeros(N)


def glitch(at, seed):
    dur = 0.2; n = int(dur * SR); x = np.arange(n) / SR
    r = np.random.default_rng(seed)
    noise = bandnoise(dur, 800, 9000, seed)
    buzz = np.sign(np.sin(2 * np.pi * (70 + 40 * r.random()) * x)) * 0.5
    chop = (np.floor(x * (90 + 60 * r.random())) % 2)  # recorta em blocos
    sig = (noise + buzz) * chop * env_ad(n, 0.001, 0.12, 6)
    place(sfx, sig, at, 0.9)


for i, c in enumerate(cuts):
    glitch(c, 100 + i)
glitch(TOTAL - 0.8, 200)

# apagão (cena 1, "parasse"): boom grave + queda de tom (power down)
at = C["s1_parasse"]["start"]
n = int(1.2 * SR); x = np.arange(n) / SR
boom = np.sin(2 * np.pi * (44 * x)) * env_ad(n, 0.004, 0.7, 3)
pdown = np.sin(2 * np.pi * (900 * np.exp(-x * 4) * x)) * env_ad(n, 0.002, 0.35, 5) * 0.4
place(sfx, boom + pdown, at, 1.0)
# faíscas elétricas na queda
for j in range(6):
    place(sfx, bandnoise(0.03, 2000, 10000, 300 + j) * env_ad(int(0.03 * SR), 0.001, 0.02, 8), at + 0.35 + j * 0.05, 0.35)

# X vermelho em cada ícone (cena 2): clique + impacto curto
for key in ("s2_google", "s2_wiki", "s2_ia", "s2_mapa", "s2_voce"):
    at = C[key]["start"]
    n = int(0.18 * SR); x = np.arange(n) / SR
    thud = np.sin(2 * np.pi * (80 * x + 60 * np.exp(-x * 40))) * env_ad(n, 0.001, 0.1, 5)
    click = bandnoise(0.03, 1500, 8000, int(at * 1000)) * env_ad(int(0.03 * SR), 0.0005, 0.015, 8)
    place(sfx, thud, at, 0.8); place(sfx, click, at, 0.7)

# whoosh suave na entrada dos cartões/gráficos
for key in ("s3_project", "s3_nomad", "s3_roda", "s3_sem", "s3_wiki", "s3_ref", "s3_guias",
            "s4_mapas", "s4_ia", "s4_internet", "s5_quer", "s5_comenta", "s1_tres"):
    at = C[key]["start"]
    n = int(0.22 * SR); x = np.arange(n) / SR
    wh = bandnoise(0.22, 400, 4000, int(at * 777)) * np.sin(np.pi * x / 0.22) ** 2
    place(sfx, wh, at - 0.05, 0.35)

# ticks de digitação de "NOMAD" (cena 5)
a, b = C["s5_nomad"]["start"], C["s5_nomad"]["end"]
for j in range(5):
    place(sfx, bandnoise(0.02, 2500, 9000, 500 + j) * env_ad(int(0.02 * SR), 0.0005, 0.01, 8), a + (b - a) * j / 5, 0.5)

sfx /= max(np.max(np.abs(sfx)), 1e-6) / 0.89


def write(path, mono):
    stereo = np.stack([mono, mono], axis=1)
    pcm = np.clip(stereo * 32767, -32768, 32767).astype(np.int16)
    with wave.open(str(path), "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())


write(ROOT / "build" / "bed.wav", bed)
write(ROOT / "build" / "sfx.wav", sfx)
print(f"bed/sfx: {TOTAL}s, {N} samples")
