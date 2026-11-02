#!/usr/bin/env python3
import os
import json
import base64
import urllib.request
import urllib.parse
import subprocess

TEMP_DIR = "/tmp/clean_phonics"
os.makedirs(TEMP_DIR, exist_ok=True)
CACHE_FILE = "/.tts-cache.json"

SILENCE_FILE = os.path.join(TEMP_DIR, "silence_012.mp3")
# Generate a clean 120ms silence file
subprocess.run([
    "ffmpeg", "-y", "-f", "lavfi",
    "-i", "anullsrc=r=24000:cl=mono",
    "-t", "0.12", "-q:a", "9", SILENCE_FILE
], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def fetch_tts(text, out_path):
    url = "https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=" + urllib.parse.quote(text)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
    with urllib.request.urlopen(req) as resp:
        with open(out_path, "wb") as f:
            f.write(resp.read())

def slice_audio(in_path, start_s, end_s, out_path, fade_dur=0.01):
    duration = end_s - start_s
    fade_out_st = max(0.0, duration - 0.03)
    cmd = [
        "ffmpeg", "-y", "-i", in_path,
        "-ss", str(start_s), "-to", str(end_s),
        "-af", f"afade=t=in:ss=0:d={fade_dur},afade=t=out:st={fade_out_st}:d=0.02",
        out_path
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def extract_second_word(phrase_text, out_path):
    """
    Given 'vần. {rime}.', extracts the second word by detecting silences.
    """
    tmp_in = os.path.join(TEMP_DIR, f"phrase_{abs(hash(phrase_text))}.mp3")
    fetch_tts(phrase_text, tmp_in)
    cmd = ["ffmpeg", "-i", tmp_in, "-af", "silencedetect=noise=-30dB:d=0.04", "-f", "null", "-"]
    p = subprocess.Popen(cmd, stderr=subprocess.PIPE, stdout=subprocess.DEVNULL)
    _, err = p.communicate()
    
    silence_ends = []
    silence_starts = []
    for line in err.decode().splitlines():
        if "silence_end:" in line:
            val = float(line.split("silence_end:")[1].split("|")[0].strip())
            silence_ends.append(val)
        elif "silence_start:" in line:
            val = float(line.split("silence_start:")[1].strip())
            silence_starts.append(val)
            
    # Silence between word 1 and word 2:
    # Usually silence_ends[1] is start of word 2, silence_starts[-1] is end of word 2
    if len(silence_ends) >= 2:
        start_w2 = silence_ends[1]
        end_w2 = silence_starts[-1] if len(silence_starts) >= len(silence_ends) else start_w2 + 0.5
        slice_audio(tmp_in, start_w2, end_w2, out_path)
    else:
        # fallback slice
        slice_audio(tmp_in, 0.85, 1.45, out_path)

def concat_audio_files(file_list, out_path):
    concat_txt = os.path.join(TEMP_DIR, f"concat_{abs(hash(out_path))}.txt")
    with open(concat_txt, "w") as f:
        for i, fp in enumerate(file_list):
            f.write(f"file '{fp}'\n")
            if i < len(file_list) - 1:
                f.write(f"file '{SILENCE_FILE}'\n")
    cmd = [
        "ffmpeg", "-y", "-f", "concat", "-safe", "0",
        "-i", concat_txt, "-c", "copy", out_path
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def get_base64(file_path):
    with open(file_path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

print("1. Extracting pure Vietnamese syllables and rimes...")

isolated_words = {}

# Sliced syllables
# 1. 'the': slice from 'the thé' (word 1: 0.14 to 0.46)
the_full = os.path.join(TEMP_DIR, "the_the_full.mp3")
fetch_tts("the thé", the_full)
the_clean = os.path.join(TEMP_DIR, "the_clean.mp3")
slice_audio(the_full, 0.14, 0.46, the_clean)
isolated_words["the"] = the_clean

# 2. 'po': slice from 'tiếng po' (word 2: 0.55 to 0.93)
po_full = os.path.join(TEMP_DIR, "tieng_po_full.mp3")
fetch_tts("tiếng po", po_full)
po_clean = os.path.join(TEMP_DIR, "po_clean.mp3")
slice_audio(po_full, 0.55, 0.93, po_clean)
isolated_words["po"] = po_clean

# 3. Rimes using 'vần. {r}.'
rimes_to_extract = [
    ("ưu", "ưu"),
    ("ươu", "ươu"),
    ("uya", "uya"),
    ("oeo", "oeo"),
    ("ia", "ia"),
    ("et", "ét"),
    ("ut", "út"),
    ("ưt", "ứt"),
    ("ac", "ác"),
    ("uc", "úc"),
    ("ưc", "ức"),
    ("oac", "oác"),
    ("oăc", "oắc"),
    ("ap", "áp"),
    ("up", "úp"),
    ("ach", "ách"),
    ("oan", "oan"),
    ("oăn", "oăn"),
    ("oat", "oát"),
    ("oăt", "oắt"),
    ("at", "át"),
    ("êt", "ết"),
    ("ôc", "ốc"),
    ("ơc", "ớc"),
    ("uyên", "uyên"),
    ("uyêt", "uyết"),
    ("oăng", "oăng"),
    ("ua", "ua"),
    ("ưa", "ưa"),
    ("uô", "uô"),
    ("ươ", "ươ"),
]

for key, ph_target in rimes_to_extract:
    fp = os.path.join(TEMP_DIR, f"rime_{key}.mp3")
    extract_second_word(f"vần. {ph_target}.", fp)
    isolated_words[key] = fp
    if ph_target != key:
        isolated_words[ph_target] = fp

# Basic single phonemes / letters
single_sounds = [
    ("thờ", "thờ"),
    ("pờ", "pờ"),
    ("chờ", "chờ"),
    ("cờ", "cờ"),
    ("tờ", "tờ"),
    ("hờ", "hờ"),
    ("i dài", "i dài"),
    ("a", "a"),
    ("á", "á"),
    ("ớ", "ớ"),
    ("e", "e"),
    ("ê", "ê"),
    ("i", "i"),
    ("o", "o"),
    ("ô", "ô"),
    ("ơ", "ơ"),
    ("u", "u"),
    ("ư", "ư"),
    ("eo", "eo"),
    ("an", "an"),
    ("ăn", "ăn"),
    ("yên", "yên"),
    ("yết", "yết"),
    ("ăng", "ăng"),
    ("ngờ", "ngờ"),
    ("nghi", "nghi"),
    ("nghỉ", "nghỉ"),
    ("sắc", "sắc"),
    ("huyền", "huyền"),
    ("hỏi", "hỏi"),
    ("ngã", "ngã"),
    ("nặng", "nặng"),
    # p tones
    ("pó", "pó"),
    ("pò", "pò"),
    ("pỏ", "pỏ"),
    ("põ", "põ"),
    ("pọ", "pọ"),
    # th tones
    ("thé", "thé"),
    ("thè", "thè"),
    ("thẻ", "thẻ"),
    ("thẽ", "thẽ"),
    ("thẹ", "thẹ"),
]

for key, ph_text in single_sounds:
    fp = os.path.join(TEMP_DIR, f"sound_{abs(hash(key))}.mp3")
    fetch_tts(ph_text, fp)
    isolated_words[key] = fp

print("2. Generating full spelling sequences...")

spellings = {}

# The family
spellings["thờ - e - the"] = ["thờ", "e", "the"]
spellings["thờ - e - the - sắc - thé"] = ["thờ", "e", "the", "sắc", "thé"]
spellings["thờ - e - the - huyền - thè"] = ["thờ", "e", "the", "huyền", "thè"]
spellings["thờ - e - the - hỏi - thẻ"] = ["thờ", "e", "the", "hỏi", "thẻ"]
spellings["thờ - e - the - ngã - thẽ"] = ["thờ", "e", "the", "ngã", "thẽ"]
spellings["thờ - e - the - nặng - thẹ"] = ["thờ", "e", "the", "nặng", "thẹ"]

# Po family
spellings["pờ - o - po"] = ["pờ", "o", "po"]
spellings["pờ - o - po - sắc - pó"] = ["pờ", "o", "po", "sắc", "pó"]
spellings["pờ - o - po - huyền - pò"] = ["pờ", "o", "po", "huyền", "pò"]
spellings["pờ - o - po - hỏi - pỏ"] = ["pờ", "o", "po", "hỏi", "pỏ"]
spellings["pờ - o - po - ngã - põ"] = ["pờ", "o", "po", "ngã", "põ"]
spellings["pờ - o - po - nặng - pọ"] = ["pờ", "o", "po", "nặng", "pọ"]

# Chờ
spellings["cờ - hờ - chờ"] = ["cờ", "hờ", "chờ"]

# nghỉ
spellings["ngờ - i - nghi - hỏi - nghỉ"] = ["ngờ kép" if "ngờ kép" in isolated_words else "ngờ", "i", "nghi", "hỏi", "nghỉ"]

# Rimes
spellings["ư - u - ưu"] = ["ư", "u", "ưu"]
spellings["ươ - u - ươu"] = ["ươ", "u", "ươu"]
spellings["u - y - a - uya"] = ["u", "i dài", "a", "uya"]
spellings["u - i dài - a - uya"] = ["u", "i dài", "a", "uya"]
spellings["o - eo - oeo"] = ["o", "eo", "oeo"]
spellings["i - a - ia"] = ["i", "a", "ia"]
spellings["u - a - ua"] = ["u", "a", "ua"]
spellings["ư - a - ưa"] = ["ư", "a", "ưa"]
spellings["u - ô - uô"] = ["u", "ô", "uô"]
spellings["ư - ơ - ươ"] = ["ư", "ơ", "ươ"]

# -t and -c rimes
spellings["a - tờ - at"] = ["a", "tờ", "at"]
spellings["a - tờ - át"] = ["a", "tờ", "at"]
spellings["e - tờ - et"] = ["e", "tờ", "et"]
spellings["e - tờ - ét"] = ["e", "tờ", "et"]
spellings["ê - tờ - êt"] = ["ê", "tờ", "êt"]
spellings["ê - tờ - ết"] = ["ê", "tờ", "êt"]
spellings["u - tờ - ut"] = ["u", "tờ", "ut"]
spellings["u - tờ - út"] = ["u", "tờ", "ut"]
spellings["ư - tờ - ưt"] = ["ư", "tờ", "ưt"]
spellings["ư - tờ - ứt"] = ["ư", "tờ", "ưt"]

spellings["a - cờ - ac"] = ["a", "cờ", "ac"]
spellings["a - cờ - ác"] = ["a", "cờ", "ac"]
spellings["ô - cờ - ôc"] = ["ô", "cờ", "ôc"]
spellings["ô - cờ - ốc"] = ["ô", "cờ", "ôc"]
spellings["u - cờ - uc"] = ["u", "cờ", "uc"]
spellings["u - cờ - úc"] = ["u", "cờ", "uc"]
spellings["ơ - cờ - ơc"] = ["ơ", "cờ", "ơc"]
spellings["ơ - cờ - ớc"] = ["ơ", "cờ", "ơc"]
spellings["ư - cờ - ưc"] = ["ư", "cờ", "ưc"]
spellings["ư - cờ - ức"] = ["ư", "cờ", "ưc"]

spellings["o - ac - oac"] = ["o", "ac", "oac"]
spellings["o - ác - oác"] = ["o", "ac", "oac"]
spellings["o - ăc - oăc"] = ["o", "oăc", "oăc"]
spellings["o - ắc - oắc"] = ["o", "oăc", "oăc"]

spellings["a - pờ - ap"] = ["a", "pờ", "ap"]
spellings["a - pờ - áp"] = ["a", "pờ", "ap"]
spellings["u - pờ - up"] = ["u", "pờ", "up"]
spellings["u - pờ - úp"] = ["u", "pờ", "up"]

spellings["a - chờ - ach"] = ["a", "chờ", "ach"]
spellings["a - chờ - ách"] = ["a", "chờ", "ach"]

spellings["o - an - oan"] = ["o", "an", "oan"]
spellings["o - ăn - oăn"] = ["o", "ăn", "oăn"]
spellings["o - at - oat"] = ["o", "at", "oat"]
spellings["o - át - oát"] = ["o", "at", "oat"]
spellings["o - ăt - oăt"] = ["o", "oăt", "oăt"]
spellings["o - ắt - oắt"] = ["o", "oăt", "oăt"]
spellings["o - ăng - oăng"] = ["o", "ăng", "oăng"]

spellings["u - yên - uyên"] = ["u", "yên", "uyên"]
spellings["u - yết - uyêt"] = ["u", "yết", "uyêt"]
spellings["u - yết - uyết"] = ["u", "yết", "uyêt"]

# Load existing cache if any
cache = {}
if os.path.exists(CACHE_FILE):
    try:
        with open(CACHE_FILE, "r", encoding="utf-8") as f:
            cache = json.load(f)
    except Exception as e:
        print("Warning loading cache:", e)

# 1. Save all isolated words/rimes
for key, fp in isolated_words.items():
    b64 = get_base64(fp)
    cache[key] = b64
    cache[f"{key}_default"] = b64

# 2. Build and save all concatenated spellings
for script_key, parts in spellings.items():
    file_parts = []
    missing = False
    for p in parts:
        if p in isolated_words:
            file_parts.append(isolated_words[p])
        else:
            print(f"Missing sound for {p} in {script_key}")
            missing = True
            break
    if not missing:
        out_fp = os.path.join(TEMP_DIR, f"spell_{abs(hash(script_key))}.mp3")
        concat_audio_files(file_parts, out_fp)
        b64 = get_base64(out_fp)
        cache[script_key] = b64
        cache[f"{script_key}_default"] = b64
        # Also clean versions
        cleaned_key = script_key.replace(" - ", " - ")
        cache[cleaned_key] = b64
        cache[f"{cleaned_key}_default"] = b64

# Write back to disk
with open(CACHE_FILE, "w", encoding="utf-8") as f:
    json.dump(cache, f, ensure_ascii=False)

print(f"DONE! Saved {len(cache)} total audio items into {CACHE_FILE}.")
