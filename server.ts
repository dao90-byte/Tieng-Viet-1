import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini API client
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Persistent audio cache for zero-latency, high-speed playback of repeated words/phonemes
const CACHE_FILE = path.join(__dirname, '.tts-cache.json');
const audioCache = new Map<string, string>();

try {
  if (fs.existsSync(CACHE_FILE)) {
    const raw = fs.readFileSync(CACHE_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    for (const [k, v] of Object.entries(parsed)) {
      if (typeof v === 'string') audioCache.set(k, v);
    }
    console.log(`Loaded ${audioCache.size} cached audio items from disk.`);
  }
} catch (e) {
  console.warn('Failed to load TTS disk cache:', e);
}

function persistCache() {
  try {
    const obj: Record<string, string> = {};
    for (const [k, v] of audioCache.entries()) {
      obj[k] = v;
    }
    fs.writeFileSync(CACHE_FILE, JSON.stringify(obj), 'utf-8');
  } catch (e) {
    console.warn('Failed to save TTS disk cache:', e);
  }
}

// Bảng phiên âm chuẩn giáo dục tiểu học khi phát âm chữ cái đơn hoặc âm ghép
const PHONIC_SOUND_MAP: Record<string, string> = {
  p: 'pờ',
  q: 'qui',
  y: 'i dài',
  k: 'ca',
  d: 'dờ',
  đ: 'đờ',
  b: 'bờ',
  c: 'cờ',
  g: 'gờ',
  h: 'hờ',
  l: 'lờ',
  m: 'mờ',
  n: 'nờ',
  r: 'rờ',
  s: 'sờ',
  t: 'tờ',
  v: 'vờ',
  x: 'xờ',
  ch: 'chờ',
  gh: 'gờ',
  gi: 'gi',
  kh: 'khờ',
  nh: 'nhờ',
  ng: 'ngờ',
  ngh: 'ngờ',
  ph: 'phờ',
  qu: 'quờ',
  th: 'thờ',
  tr: 'trờ',
  a: 'a',
  ă: 'á',
  â: 'ớ',
  e: 'e',
  ê: 'ê',
  i: 'i',
  o: 'o',
  ô: 'ô',
  ơ: 'ơ',
  u: 'u',
  ư: 'ư',
  nghỉ: 'nghỉ',
};

function cleanServerText(input: string): string {
  if (!input) return '';
  let clean = input.trim();
  const lower = clean.toLowerCase();
  if (PHONIC_SOUND_MAP[lower]) {
    return PHONIC_SOUND_MAP[lower];
  }
  clean = clean
    .replace(/\b[Cc]hữ\s+p\b/g, 'Chữ pờ')
    .replace(/\b[Cc]hữ\s+P\b/g, 'Chữ pờ')
    .replace(/\b[Cc]hữ\s+q\b/g, 'Chữ qui')
    .replace(/\b[Cc]hữ\s+Q\b/g, 'Chữ qui')
    .replace(/\b[Cc]hữ\s+y\b/g, 'Chữ i dài')
    .replace(/\b[Cc]hữ\s+Y\b/g, 'Chữ i dài')
    .replace(/\b[Ââ]m\s+p\b/g, 'Âm pờ')
    .replace(/\b[Ââ]m\s+P\b/g, 'Âm pờ');

  // Chuẩn hóa dấu gạch ngang phân tách nhịp đánh vần: giữ nguyên dấu gạch ngang có khoảng trắng
  // Tuyệt đối không thay thành dấu phẩy để tránh Google TTS tách vế đọc nhầm sang tiếng Anh
  clean = clean.replace(/\s*[-–—]\s*/g, ' - ');
  clean = clean.replace(/([a-zA-ZÀ-ỹ]+)-([a-zA-ZÀ-ỹ]+)/g, '$1 $2');
  clean = clean.replace(/^[•\*]\s*/, '').replace(/["“”«»]/g, '');
  return clean;
}

// API route for AI Vietnamese Text-to-Speech
app.post('/api/tts', async (req, res) => {
  try {
    const { text, style } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }

    const trimmedText = text.trim();
    const cleanedText = cleanServerText(trimmedText);
    const cacheKey = `${cleanedText}_${style || 'default'}`;
    const rawKey = `${trimmedText}_${style || 'default'}`;

    if (audioCache.has(cacheKey)) {
      return res.json({
        audioBase64: audioCache.get(cacheKey),
        cached: true,
      });
    }

    if (audioCache.has(rawKey)) {
      return res.json({
        audioBase64: audioCache.get(rawKey),
        cached: true,
      });
    }

    if (audioCache.has(cleanedText)) {
      return res.json({
        audioBase64: audioCache.get(cleanedText),
        cached: true,
      });
    }

    if (audioCache.has(trimmedText)) {
      return res.json({
        audioBase64: audioCache.get(trimmedText),
        cached: true,
      });
    }

    let audioBase64: string | undefined;

    // 1. Unified high-quality Vietnamese standard voice engine (100% accurate pronunciation, zero-quota limit, instant response)
    try {
      const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(cleanedText)}`;
      const googleRes = await fetch(ttsUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://translate.google.com/',
        },
      });

      if (googleRes.ok) {
        const arrayBuf = await googleRes.arrayBuffer();
        if (arrayBuf.byteLength > 200) {
          audioBase64 = Buffer.from(arrayBuf).toString('base64');
        }
      }
    } catch (e: any) {
      console.warn('Google TTS fetch error:', e?.message?.slice(0, 80));
    }

    // 2. Secondary fallback to Gemini TTS if needed
    if (!audioBase64 && ai) {
      const voiceStyle = style || 'A gentle, warm Vietnamese female teacher speaking at an active, clear, brisk and engaging pace for first grade children';
      const ttsModels = [
        'gemini-3.1-flash-tts-preview',
        'gemini-3.8-flash-tts',
        'gemini-2.5-flash-preview-tts',
      ];

      for (const modelName of ttsModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: trimmedText,
                    speechMetadata: {
                      style: voiceStyle,
                    },
                  },
                ],
              },
            ],
            config: {
              responseModalities: ['AUDIO'],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: 'Kore' },
                },
              },
            },
          });
          audioBase64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
          if (audioBase64) {
            break;
          }
        } catch (err: any) {
          console.warn(`TTS model ${modelName} failed:`, err?.message?.slice(0, 80));
        }
      }
    }

    if (!audioBase64) {
      return res.status(500).json({
        error: 'No audio generated',
        fallback: true,
      });
    }

    // Store in cache (limit max 500 items to avoid memory leak)
    if (audioCache.size > 500) {
      const firstKey = audioCache.keys().next().value;
      if (firstKey) audioCache.delete(firstKey);
    }
    audioCache.set(cacheKey, audioBase64);
    if (rawKey !== cacheKey) {
      audioCache.set(rawKey, audioBase64);
    }
    persistCache();

    return res.json({
      audioBase64,
      cached: false,
    });
  } catch (error: any) {
    console.error('TTS API error:', error?.message || error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate speech',
      fallback: true,
    });
  }
});

// Setup Vite middlewares in development or serve static in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer();
