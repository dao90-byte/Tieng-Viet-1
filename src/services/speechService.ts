/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Cache in browser for base64 audio responses
const clientAudioCache = new Map<string, string>();
let currentAudio: HTMLAudioElement | null = null;
let sharedAudio: HTMLAudioElement | null = null;
let isAudioUnlocked = false;
let ttsApiDisabledUntil = 0;
let preferredReadingVoiceUri: string | null = null;
declare global {
  interface Window {
    __activeUtterance?: SpeechSynthesisUtterance | null;
  }
}

/**
 * Mở khóa âm thanh (Audio Context / HTMLAudioElement) cho các dòng iPad cũ chạy iOS Safari
 */
export function unlockAudioForIOS() {
  if (isAudioUnlocked) return;
  try {
    if (!sharedAudio && typeof Audio !== 'undefined') {
      sharedAudio = new Audio();
      sharedAudio.setAttribute('playsinline', 'true');
      sharedAudio.setAttribute('webkit-playsinline', 'true');
    }
    if (sharedAudio) {
      // Phát 1 frame âm thanh im lặng để mở khóa quyền phát media trong iOS Safari
      sharedAudio.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
      const playPromise = sharedAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isAudioUnlocked = true;
          })
          .catch(() => {});
      } else {
        isAudioUnlocked = true;
      }
    }
  } catch {
    // ignore
  }
}

// Tự động mở khóa ngay trong lần tương tác chạm/bấm đầu tiên của người dùng trên iPad
if (typeof window !== 'undefined') {
  const unlockEvents = ['touchstart', 'touchend', 'click', 'pointerdown'];
  const handleFirstInteraction = () => {
    unlockAudioForIOS();
    unlockEvents.forEach((ev) => window.removeEventListener(ev, handleFirstInteraction));
  };
  unlockEvents.forEach((ev) => window.addEventListener(ev, handleFirstInteraction, { passive: true }));
}

// Preload static TTS cache on static environments like GitHub Pages
if (typeof window !== 'undefined') {
  const baseUrl = import.meta.env.BASE_URL || './';
  const cachePath = baseUrl.endsWith('/') ? `${baseUrl}tts-cache.json` : `${baseUrl}/tts-cache.json`;
  fetch(cachePath)
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      if (data && typeof data === 'object') {
        for (const [k, v] of Object.entries(data)) {
          if (typeof v === 'string') {
            clientAudioCache.set(k, v);
          }
        }
      }
    })
    .catch(() => {});
}

export interface SpellingAnalysis {
  word: string;
  onset: string; // Phụ âm đầu (ví dụ: b, ch, ngh)
  nucleus: string; // Vần / nguyên âm (ví dụ: a, an, uyên)
  toneName: string; // Tên dấu thanh (ngang, sắc, huyền, hỏi, ngã, nặng)
  spellingScript: string; // Câu đánh vần (ví dụ: "bờ - a - ba - sắc - bá")
  steps: { text: string; label: string }[];
}

// Bảng giải mã dấu thanh tiếng Việt
const TONE_MAP: Record<string, { baseChar: string; tone: string }> = {
  á: { baseChar: 'a', tone: 'sắc' },
  à: { baseChar: 'a', tone: 'huyền' },
  ả: { baseChar: 'a', tone: 'hỏi' },
  ã: { baseChar: 'a', tone: 'ngã' },
  ạ: { baseChar: 'a', tone: 'nặng' },

  ắ: { baseChar: 'ă', tone: 'sắc' },
  ằ: { baseChar: 'ă', tone: 'huyền' },
  ẳ: { baseChar: 'ă', tone: 'hỏi' },
  ẵ: { baseChar: 'ă', tone: 'ngã' },
  ặ: { baseChar: 'ă', tone: 'nặng' },

  ấ: { baseChar: 'â', tone: 'sắc' },
  ầ: { baseChar: 'â', tone: 'huyền' },
  ẩ: { baseChar: 'â', tone: 'hỏi' },
  ẫ: { baseChar: 'â', tone: 'ngã' },
  ậ: { baseChar: 'â', tone: 'nặng' },

  é: { baseChar: 'e', tone: 'sắc' },
  è: { baseChar: 'e', tone: 'huyền' },
  ẻ: { baseChar: 'e', tone: 'hỏi' },
  ẽ: { baseChar: 'e', tone: 'ngã' },
  ẹ: { baseChar: 'e', tone: 'nặng' },

  ế: { baseChar: 'ê', tone: 'sắc' },
  ề: { baseChar: 'ê', tone: 'huyền' },
  ể: { baseChar: 'ê', tone: 'hỏi' },
  ễ: { baseChar: 'ê', tone: 'ngã' },
  ệ: { baseChar: 'ê', tone: 'nặng' },

  í: { baseChar: 'i', tone: 'sắc' },
  ì: { baseChar: 'i', tone: 'huyền' },
  ỉ: { baseChar: 'i', tone: 'hỏi' },
  ĩ: { baseChar: 'i', tone: 'ngã' },
  ị: { baseChar: 'i', tone: 'nặng' },

  ó: { baseChar: 'o', tone: 'sắc' },
  ò: { baseChar: 'o', tone: 'huyền' },
  ỏ: { baseChar: 'o', tone: 'hỏi' },
  õ: { baseChar: 'o', tone: 'ngã' },
  ọ: { baseChar: 'o', tone: 'nặng' },

  ố: { baseChar: 'ô', tone: 'sắc' },
  ồ: { baseChar: 'ô', tone: 'huyền' },
  ổ: { baseChar: 'ô', tone: 'hỏi' },
  ỗ: { baseChar: 'ô', tone: 'ngã' },
  ộ: { baseChar: 'ô', tone: 'nặng' },

  ớ: { baseChar: 'ơ', tone: 'sắc' },
  ờ: { baseChar: 'ơ', tone: 'huyền' },
  ở: { baseChar: 'ơ', tone: 'hỏi' },
  ỡ: { baseChar: 'ơ', tone: 'ngã' },
  ợ: { baseChar: 'ơ', tone: 'nặng' },

  ú: { baseChar: 'u', tone: 'sắc' },
  ù: { baseChar: 'u', tone: 'huyền' },
  ủ: { baseChar: 'u', tone: 'hỏi' },
  ũ: { baseChar: 'u', tone: 'ngã' },
  ụ: { baseChar: 'u', tone: 'nặng' },

  ứ: { baseChar: 'ư', tone: 'sắc' },
  ừ: { baseChar: 'ư', tone: 'huyền' },
  ử: { baseChar: 'ư', tone: 'hỏi' },
  ữ: { baseChar: 'ư', tone: 'ngã' },
  ự: { baseChar: 'ư', tone: 'nặng' },

  ý: { baseChar: 'y', tone: 'sắc' },
  ỳ: { baseChar: 'y', tone: 'huyền' },
  ỷ: { baseChar: 'y', tone: 'hỏi' },
  ỹ: { baseChar: 'y', tone: 'ngã' },
  ỵ: { baseChar: 'y', tone: 'nặng' },
};

// Tên phát âm âm đầu khi đánh vần
const CONSONANT_SOUNDS: Record<string, string> = {
  b: 'bờ',
  c: 'cờ',
  ch: 'chờ',
  d: 'dờ',
  đ: 'đờ',
  g: 'gờ',
  gh: 'gờ',
  gi: 'gi',
  h: 'hờ',
  k: 'ca',
  kh: 'khờ',
  l: 'lờ',
  m: 'mờ',
  n: 'nờ',
  ng: 'ngờ',
  ngh: 'ngờ',
  nh: 'nhờ',
  p: 'pờ',
  ph: 'phờ',
  q: 'qui',
  qu: 'quờ',
  r: 'rờ',
  s: 'sờ',
  t: 'tờ',
  th: 'thờ',
  tr: 'trờ',
  v: 'vờ',
  x: 'xờ',
};

const ONSET_LIST = [
  'ngh', 'ng', 'nh', 'ch', 'gh', 'gi', 'kh', 'ph', 'qu', 'th', 'tr',
  'b', 'c', 'd', 'đ', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'x'
];

/**
 * Phân tích âm tiết tiếng Việt thành các thành phần đánh vần logic
 */
export function analyzeSyllable(rawWord: string): SpellingAnalysis {
  const clean = rawWord.trim().toLowerCase();
  
  // Xác định thanh điệu và tìm từ gốc không dấu
  let toneName = 'ngang';
  let unaccented = '';
  
  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i];
    if (TONE_MAP[ch]) {
      toneName = TONE_MAP[ch].tone;
      unaccented += TONE_MAP[ch].baseChar;
    } else {
      unaccented += ch;
    }
  }

  // Tách phụ âm đầu
  let onset = '';
  let rime = unaccented;

  for (const o of ONSET_LIST) {
    if (unaccented.startsWith(o)) {
      onset = o;
      rime = unaccented.slice(o.length);
      break;
    }
  }

  const onsetSound = CONSONANT_SOUNDS[onset] || onset;
  const baseSyllable = onset + rime;

  const steps: { text: string; label: string }[] = [];

  // Bảng phân rã đánh vần các vần đôi / vần ghép khi không có âm đầu (ví dụ ay, áy, ây, eo, ao...)
  const RIME_SPELLING_MAP: Record<string, { steps: { text: string; label: string }[]; script: string }> = {
    ay: {
      steps: [
        { text: 'a', label: 'a' },
        { text: 'i dài', label: 'y' },
        { text: 'ay', label: 'ay' },
      ],
      script: 'a - y - ay',
    },
    ây: {
      steps: [
        { text: 'ớ', label: 'â' },
        { text: 'i dài', label: 'y' },
        { text: 'ây', label: 'ây' },
      ],
      script: 'â - y - ây',
    },
    eo: {
      steps: [
        { text: 'e', label: 'e' },
        { text: 'o', label: 'o' },
        { text: 'eo', label: 'eo' },
      ],
      script: 'e - o - eo',
    },
    ao: {
      steps: [
        { text: 'a', label: 'a' },
        { text: 'o', label: 'o' },
        { text: 'ao', label: 'ao' },
      ],
      script: 'a - o - ao',
    },
    au: {
      steps: [
        { text: 'a', label: 'a' },
        { text: 'u', label: 'u' },
        { text: 'au', label: 'au' },
      ],
      script: 'a - u - au',
    },
    âu: {
      steps: [
        { text: 'ớ', label: 'â' },
        { text: 'u', label: 'u' },
        { text: 'âu', label: 'âu' },
      ],
      script: 'â - u - âu',
    },
    iu: {
      steps: [
        { text: 'i', label: 'i' },
        { text: 'u', label: 'u' },
        { text: 'iu', label: 'iu' },
      ],
      script: 'i - u - iu',
    },
    êu: {
      steps: [
        { text: 'ê', label: 'ê' },
        { text: 'u', label: 'u' },
        { text: 'êu', label: 'êu' },
      ],
      script: 'ê - u - êu',
    },
    oi: {
      steps: [
        { text: 'o', label: 'o' },
        { text: 'i', label: 'i' },
        { text: 'oi', label: 'oi' },
      ],
      script: 'o - i - oi',
    },
    ai: {
      steps: [
        { text: 'a', label: 'a' },
        { text: 'i', label: 'i' },
        { text: 'ai', label: 'ai' },
      ],
      script: 'a - i - ai',
    },
    ôi: {
      steps: [
        { text: 'ô', label: 'ô' },
        { text: 'i', label: 'i' },
        { text: 'ôi', label: 'ôi' },
      ],
      script: 'ô - i - ôi',
    },
    ơi: {
      steps: [
        { text: 'ơ', label: 'ơ' },
        { text: 'i', label: 'i' },
        { text: 'ơi', label: 'ơi' },
      ],
      script: 'ơ - i - ơi',
    },
    ui: {
      steps: [
        { text: 'u', label: 'u' },
        { text: 'i', label: 'i' },
        { text: 'ui', label: 'ui' },
      ],
      script: 'u - i - ui',
    },
    ưi: {
      steps: [
        { text: 'ư', label: 'ư' },
        { text: 'i', label: 'i' },
        { text: 'ưi', label: 'ưi' },
      ],
      script: 'ư - i - ưi',
    },
    ia: {
      steps: [
        { text: 'i', label: 'i' },
        { text: 'a', label: 'a' },
        { text: 'ia', label: 'ia' },
      ],
      script: 'i - a - ia',
    },
    ua: {
      steps: [
        { text: 'u', label: 'u' },
        { text: 'a', label: 'a' },
        { text: 'ua', label: 'ua' },
      ],
      script: 'u - a - ua',
    },
    // 27 Vần chính theo yêu cầu & các vần chuẩn sách giáo khoa
    ưu: {
      steps: [
        { text: 'ư', label: 'ư' },
        { text: 'u', label: 'u' },
        { text: 'ưu', label: 'ưu' },
      ],
      script: 'ư - u - ưu',
    },
    uya: {
      steps: [
        { text: 'u', label: 'u' },
        { text: 'i dài', label: 'y' },
        { text: 'a', label: 'a' },
        { text: 'uya', label: 'uya' },
      ],
      script: 'u - y - a - uya',
    },
    ưa: {
      steps: [
        { text: 'ư', label: 'ư' },
        { text: 'a', label: 'a' },
        { text: 'ưa', label: 'ưa' },
      ],
      script: 'ư - a - ưa',
    },
    oăng: {
      steps: [
        { text: 'o', label: 'o' },
        { text: 'á', label: 'ă' },
        { text: 'ngờ', label: 'ng' },
        { text: 'oăng', label: 'oăng' },
      ],
      script: 'o - ăng - oăng',
    },
    at: {
      steps: [
        { text: 'a', label: 'a' },
        { text: 'tờ', label: 't' },
        { text: 'at', label: 'at' },
      ],
      script: 'a - tờ - at',
    },
    et: {
      steps: [
        { text: 'e', label: 'e' },
        { text: 'tờ', label: 't' },
        { text: 'et', label: 'et' },
      ],
      script: 'e - tờ - et',
    },
    êt: {
      steps: [
        { text: 'ê', label: 'ê' },
        { text: 'tờ', label: 't' },
        { text: 'êt', label: 'êt' },
      ],
      script: 'ê - tờ - êt',
    },
    ut: {
      steps: [
        { text: 'u', label: 'u' },
        { text: 'tờ', label: 't' },
        { text: 'ut', label: 'ut' },
      ],
      script: 'u - tờ - ut',
    },
    ưt: {
      steps: [
        { text: 'ư', label: 'ư' },
        { text: 'tờ', label: 't' },
        { text: 'ưt', label: 'ưt' },
      ],
      script: 'ư - tờ - ưt',
    },
    ac: {
      steps: [
        { text: 'a', label: 'a' },
        { text: 'cờ', label: 'c' },
        { text: 'ac', label: 'ac' },
      ],
      script: 'a - cờ - ac',
    },
    ôc: {
      steps: [
        { text: 'ô', label: 'ô' },
        { text: 'cờ', label: 'c' },
        { text: 'ôc', label: 'ôc' },
      ],
      script: 'ô - cờ - ôc',
    },
    uc: {
      steps: [
        { text: 'u', label: 'u' },
        { text: 'cờ', label: 'c' },
        { text: 'uc', label: 'uc' },
      ],
      script: 'u - cờ - uc',
    },
    ơc: {
      steps: [
        { text: 'ơ', label: 'ơ' },
        { text: 'cờ', label: 'c' },
        { text: 'ơc', label: 'ơc' },
      ],
      script: 'ơ - cờ - ơc',
    },
    ưc: {
      steps: [
        { text: 'ư', label: 'ư' },
        { text: 'cờ', label: 'c' },
        { text: 'ưc', label: 'ưc' },
      ],
      script: 'ư - cờ - ưc',
    },
    oac: {
      steps: [
        { text: 'o', label: 'o' },
        { text: 'ac', label: 'ac' },
        { text: 'oac', label: 'oac' },
      ],
      script: 'o - ac - oac',
    },
    oăc: {
      steps: [
        { text: 'o', label: 'o' },
        { text: 'ăc', label: 'ăc' },
        { text: 'oăc', label: 'oăc' },
      ],
      script: 'o - ăc - oăc',
    },
    ap: {
      steps: [
        { text: 'a', label: 'a' },
        { text: 'pờ', label: 'p' },
        { text: 'ap', label: 'ap' },
      ],
      script: 'a - pờ - ap',
    },
    up: {
      steps: [
        { text: 'u', label: 'u' },
        { text: 'pờ', label: 'p' },
        { text: 'up', label: 'up' },
      ],
      script: 'u - pờ - up',
    },
    ach: {
      steps: [
        { text: 'a', label: 'a' },
        { text: 'chờ', label: 'ch' },
        { text: 'ach', label: 'ach' },
      ],
      script: 'a - chờ - ach',
    },
    oan: {
      steps: [
        { text: 'o', label: 'o' },
        { text: 'an', label: 'an' },
        { text: 'oan', label: 'oan' },
      ],
      script: 'o - an - oan',
    },
    oăn: {
      steps: [
        { text: 'o', label: 'o' },
        { text: 'ăn', label: 'ăn' },
        { text: 'oăn', label: 'oăn' },
      ],
      script: 'o - ăn - oăn',
    },
    oat: {
      steps: [
        { text: 'o', label: 'o' },
        { text: 'at', label: 'at' },
        { text: 'oat', label: 'oat' },
      ],
      script: 'o - at - oat',
    },
    oăt: {
      steps: [
        { text: 'o', label: 'o' },
        { text: 'ăt', label: 'ăt' },
        { text: 'oăt', label: 'oăt' },
      ],
      script: 'o - ăt - oăt',
    },
    uyên: {
      steps: [
        { text: 'u', label: 'u' },
        { text: 'i dài', label: 'y' },
        { text: 'ê', label: 'ê' },
        { text: 'nờ', label: 'n' },
        { text: 'uyên', label: 'uyên' },
      ],
      script: 'u - yên - uyên',
    },
    uyêt: {
      steps: [
        { text: 'u', label: 'u' },
        { text: 'i dài', label: 'y' },
        { text: 'ê', label: 'ê' },
        { text: 'tờ', label: 't' },
        { text: 'uyêt', label: 'uyêt' },
      ],
      script: 'u - yết - uyêt',
    },
    uyet: {
      steps: [
        { text: 'u', label: 'u' },
        { text: 'i dài', label: 'y' },
        { text: 'ê', label: 'ê' },
        { text: 'tờ', label: 't' },
        { text: 'uyết', label: 'uyết' },
      ],
      script: 'u - yết - uyêt',
    },
    // Các vần bổ sung trong sách giáo khoa
    ươu: {
      steps: [{ text: 'ươ', label: 'ươ' }, { text: 'u', label: 'u' }, { text: 'ươu', label: 'ươu' }],
      script: 'ươ - u - ươu',
    },
    ăt: { steps: [{ text: 'á', label: 'ă' }, { text: 'tờ', label: 't' }, { text: 'ăt', label: 'ăt' }], script: 'ă - tờ - ăt' },
    ât: { steps: [{ text: 'ớ', label: 'â' }, { text: 'tờ', label: 't' }, { text: 'ât', label: 'ât' }], script: 'â - tờ - ât' },
    it: { steps: [{ text: 'i', label: 'i' }, { text: 'tờ', label: 't' }, { text: 'it', label: 'it' }], script: 'i - tờ - it' },
    ot: { steps: [{ text: 'o', label: 'o' }, { text: 'tờ', label: 't' }, { text: 'ot', label: 'ot' }], script: 'o - tờ - ot' },
    ôt: { steps: [{ text: 'ô', label: 'ô' }, { text: 'tờ', label: 't' }, { text: 'ôt', label: 'ôt' }], script: 'ô - tờ - ôt' },
    ơt: { steps: [{ text: 'ơ', label: 'ơ' }, { text: 'tờ', label: 't' }, { text: 'ơt', label: 'ơt' }], script: 'ơ - tờ - ơt' },
    ăc: { steps: [{ text: 'á', label: 'ă' }, { text: 'cờ', label: 'c' }, { text: 'ăc', label: 'ăc' }], script: 'ă - cờ - ăc' },
    âc: { steps: [{ text: 'ớ', label: 'â' }, { text: 'cờ', label: 'c' }, { text: 'âc', label: 'âc' }], script: 'â - cờ - âc' },
    oc: { steps: [{ text: 'o', label: 'o' }, { text: 'cờ', label: 'c' }, { text: 'oc', label: 'oc' }], script: 'o - cờ - oc' },
    ăp: { steps: [{ text: 'á', label: 'ă' }, { text: 'pờ', label: 'p' }, { text: 'ăp', label: 'ăp' }], script: 'ă - pờ - ăp' },
    âp: { steps: [{ text: 'ớ', label: 'â' }, { text: 'pờ', label: 'p' }, { text: 'âp', label: 'âp' }], script: 'â - pờ - âp' },
    ep: { steps: [{ text: 'e', label: 'e' }, { text: 'pờ', label: 'p' }, { text: 'ep', label: 'ep' }], script: 'e - pờ - ep' },
    êp: { steps: [{ text: 'ê', label: 'ê' }, { text: 'pờ', label: 'p' }, { text: 'êp', label: 'êp' }], script: 'ê - pờ - êp' },
    ip: { steps: [{ text: 'i', label: 'i' }, { text: 'pờ', label: 'p' }, { text: 'ip', label: 'ip' }], script: 'i - pờ - ip' },
    op: { steps: [{ text: 'o', label: 'o' }, { text: 'pờ', label: 'p' }, { text: 'op', label: 'op' }], script: 'o - pờ - op' },
    ôp: { steps: [{ text: 'ô', label: 'ô' }, { text: 'pờ', label: 'p' }, { text: 'ôp', label: 'ôp' }], script: 'ô - pờ - ôp' },
    ơp: { steps: [{ text: 'ơ', label: 'ơ' }, { text: 'pờ', label: 'p' }, { text: 'ơp', label: 'ơp' }], script: 'ơ - pờ - ơp' },
    êch: { steps: [{ text: 'ê', label: 'ê' }, { text: 'chờ', label: 'ch' }, { text: 'êch', label: 'êch' }], script: 'ê - chờ - êch' },
    ich: { steps: [{ text: 'i', label: 'i' }, { text: 'chờ', label: 'ch' }, { text: 'ich', label: 'ich' }], script: 'i - chờ - ich' },
    an: { steps: [{ text: 'a', label: 'a' }, { text: 'nờ', label: 'n' }, { text: 'an', label: 'an' }], script: 'a - nờ - an' },
    ăn: { steps: [{ text: 'á', label: 'ă' }, { text: 'nờ', label: 'n' }, { text: 'ăn', label: 'ăn' }], script: 'ă - nờ - ăn' },
    ân: { steps: [{ text: 'ớ', label: 'â' }, { text: 'nờ', label: 'n' }, { text: 'ân', label: 'ân' }], script: 'â - nờ - ân' },
    en: { steps: [{ text: 'e', label: 'e' }, { text: 'nờ', label: 'n' }, { text: 'en', label: 'en' }], script: 'e - nờ - en' },
    ên: { steps: [{ text: 'ê', label: 'ê' }, { text: 'nờ', label: 'n' }, { text: 'ên', label: 'ên' }], script: 'ê - nờ - ên' },
    in: { steps: [{ text: 'i', label: 'i' }, { text: 'nờ', label: 'n' }, { text: 'in', label: 'in' }], script: 'i - nờ - in' },
    on: { steps: [{ text: 'o', label: 'o' }, { text: 'nờ', label: 'n' }, { text: 'on', label: 'on' }], script: 'o - nờ - on' },
    ôn: { steps: [{ text: 'ô', label: 'ô' }, { text: 'nờ', label: 'n' }, { text: 'ôn', label: 'ôn' }], script: 'ô - nờ - ôn' },
    ơn: { steps: [{ text: 'ơ', label: 'ơ' }, { text: 'nờ', label: 'n' }, { text: 'ơn', label: 'ơn' }], script: 'ơ - nờ - ơn' },
    un: { steps: [{ text: 'u', label: 'u' }, { text: 'nờ', label: 'n' }, { text: 'un', label: 'un' }], script: 'u - nờ - un' },
    am: { steps: [{ text: 'a', label: 'a' }, { text: 'mờ', label: 'm' }, { text: 'am', label: 'am' }], script: 'a - mờ - am' },
    ăm: { steps: [{ text: 'á', label: 'ă' }, { text: 'mờ', label: 'm' }, { text: 'ăm', label: 'ăm' }], script: 'ă - mờ - ăm' },
    âm: { steps: [{ text: 'ớ', label: 'â' }, { text: 'mờ', label: 'm' }, { text: 'âm', label: 'âm' }], script: 'â - mờ - âm' },
    em: { steps: [{ text: 'e', label: 'e' }, { text: 'mờ', label: 'm' }, { text: 'em', label: 'em' }], script: 'e - mờ - em' },
    êm: { steps: [{ text: 'ê', label: 'ê' }, { text: 'mờ', label: 'm' }, { text: 'êm', label: 'êm' }], script: 'ê - mờ - êm' },
    im: { steps: [{ text: 'i', label: 'i' }, { text: 'mờ', label: 'm' }, { text: 'im', label: 'im' }], script: 'i - mờ - im' },
    om: { steps: [{ text: 'o', label: 'o' }, { text: 'mờ', label: 'm' }, { text: 'om', label: 'om' }], script: 'o - mờ - om' },
    ôm: { steps: [{ text: 'ô', label: 'ô' }, { text: 'mờ', label: 'm' }, { text: 'ôm', label: 'ôm' }], script: 'ô - mờ - ôm' },
    ơm: { steps: [{ text: 'ơ', label: 'ơ' }, { text: 'mờ', label: 'm' }, { text: 'ơm', label: 'ơm' }], script: 'ơ - mờ - ơm' },
    um: { steps: [{ text: 'u', label: 'u' }, { text: 'mờ', label: 'm' }, { text: 'um', label: 'um' }], script: 'u - mờ - um' },
    ang: { steps: [{ text: 'a', label: 'a' }, { text: 'ngờ', label: 'ng' }, { text: 'ang', label: 'ang' }], script: 'a - ngờ - ang' },
    ăng: { steps: [{ text: 'á', label: 'ă' }, { text: 'ngờ', label: 'ng' }, { text: 'ăng', label: 'ăng' }], script: 'ă - ngờ - ăng' },
    âng: { steps: [{ text: 'ớ', label: 'â' }, { text: 'ngờ', label: 'ng' }, { text: 'âng', label: 'âng' }], script: 'â - ngờ - âng' },
    eng: { steps: [{ text: 'e', label: 'e' }, { text: 'ngờ', label: 'ng' }, { text: 'eng', label: 'eng' }], script: 'e - ngờ - eng' },
    iêng: { steps: [{ text: 'i', label: 'i' }, { text: 'ê', label: 'ê' }, { text: 'ngờ', label: 'ng' }, { text: 'iêng', label: 'iêng' }], script: 'i - ê - ngờ - iêng' },
    ong: { steps: [{ text: 'o', label: 'o' }, { text: 'ngờ', label: 'ng' }, { text: 'ong', label: 'ong' }], script: 'o - ngờ - ong' },
    ông: { steps: [{ text: 'ô', label: 'ô' }, { text: 'ngờ', label: 'ng' }, { text: 'ông', label: 'ông' }], script: 'ô - ngờ - ông' },
    ung: { steps: [{ text: 'u', label: 'u' }, { text: 'ngờ', label: 'ng' }, { text: 'ung', label: 'ung' }], script: 'u - ngờ - ung' },
    ưng: { steps: [{ text: 'ư', label: 'ư' }, { text: 'ngờ', label: 'ng' }, { text: 'ưng', label: 'ưng' }], script: 'ư - ngờ - ưng' },
    anh: { steps: [{ text: 'a', label: 'a' }, { text: 'nhờ', label: 'nh' }, { text: 'anh', label: 'anh' }], script: 'a - nhờ - anh' },
    ênh: { steps: [{ text: 'ê', label: 'ê' }, { text: 'nhờ', label: 'nh' }, { text: 'ênh', label: 'ênh' }], script: 'ê - nhờ - ênh' },
    inh: { steps: [{ text: 'i', label: 'i' }, { text: 'nhờ', label: 'nh' }, { text: 'inh', label: 'inh' }], script: 'i - nhờ - inh' },
    oang: { steps: [{ text: 'o', label: 'o' }, { text: 'a', label: 'a' }, { text: 'ngờ', label: 'ng' }, { text: 'oang', label: 'oang' }], script: 'o - ang - oang' },
    uông: { steps: [{ text: 'u', label: 'u' }, { text: 'ô', label: 'ô' }, { text: 'ngờ', label: 'ng' }, { text: 'uông', label: 'uông' }], script: 'u - ô - ngờ - uông' },
    ương: { steps: [{ text: 'ư', label: 'ư' }, { text: 'ơ', label: 'ơ' }, { text: 'ngờ', label: 'ng' }, { text: 'ương', label: 'ương' }], script: 'ư - ơ - ngờ - ương' },
    oai: { steps: [{ text: 'o', label: 'o' }, { text: 'a', label: 'a' }, { text: 'i', label: 'i' }, { text: 'oai', label: 'oai' }], script: 'o - ai - oai' },
    oay: { steps: [{ text: 'o', label: 'o' }, { text: 'a', label: 'a' }, { text: 'i dài', label: 'y' }, { text: 'oay', label: 'oay' }], script: 'o - ay - oay' },
    uôi: { steps: [{ text: 'u', label: 'u' }, { text: 'ô', label: 'ô' }, { text: 'i', label: 'i' }, { text: 'uôi', label: 'uôi' }], script: 'u - ô - i - uôi' },
    ươi: { steps: [{ text: 'ư', label: 'ư' }, { text: 'ơ', label: 'ơ' }, { text: 'i', label: 'i' }, { text: 'ươi', label: 'ươi' }], script: 'ư - ơ - i - ươi' },
    uây: { steps: [{ text: 'u', label: 'u' }, { text: 'ớ', label: 'â' }, { text: 'i dài', label: 'y' }, { text: 'uây', label: 'uây' }], script: 'u - ây - uây' },
    iêu: { steps: [{ text: 'i', label: 'i' }, { text: 'ê', label: 'ê' }, { text: 'u', label: 'u' }, { text: 'iêu', label: 'iêu' }], script: 'i - ê - u - iêu' },
    yêu: { steps: [{ text: 'i dài', label: 'y' }, { text: 'ê', label: 'ê' }, { text: 'u', label: 'u' }, { text: 'yêu', label: 'yêu' }], script: 'y - ê - u - yêu' },
    oa: { steps: [{ text: 'o', label: 'o' }, { text: 'a', label: 'a' }, { text: 'oa', label: 'oa' }], script: 'o - a - oa' },
    oe: { steps: [{ text: 'o', label: 'o' }, { text: 'e', label: 'e' }, { text: 'oe', label: 'oe' }], script: 'o - e - oe' },
    uê: { steps: [{ text: 'u', label: 'u' }, { text: 'ê', label: 'ê' }, { text: 'uê', label: 'uê' }], script: 'u - ê - uê' },
    uơ: { steps: [{ text: 'u', label: 'u' }, { text: 'ơ', label: 'ơ' }, { text: 'uơ', label: 'uơ' }], script: 'u - ơ - uơ' },
    uy: { steps: [{ text: 'u', label: 'u' }, { text: 'i dài', label: 'y' }, { text: 'uy', label: 'uy' }], script: 'u - y - uy' },
    uô: { steps: [{ text: 'u', label: 'u' }, { text: 'ô', label: 'ô' }, { text: 'uô', label: 'uô' }], script: 'u - ô - uô' },
    ươ: { steps: [{ text: 'ư', label: 'ư' }, { text: 'ơ', label: 'ơ' }, { text: 'ươ', label: 'ươ' }], script: 'ư - ơ - ươ' },
    oeo: { steps: [{ text: 'o', label: 'o' }, { text: 'eo', label: 'eo' }, { text: 'oeo', label: 'oeo' }], script: 'o - eo - oeo' },
  };

  let spellingScript = '';

  if (onset && rime) {
    steps.push({ text: onsetSound, label: onset });
    steps.push({ text: rime, label: rime });
    steps.push({ text: baseSyllable, label: baseSyllable });
    if (toneName !== 'ngang') {
      steps.push({ text: toneName, label: `dấu ${toneName}` });
      steps.push({ text: clean, label: clean });
    }

    if (toneName === 'ngang') {
      spellingScript = `${onsetSound} - ${rime} - ${baseSyllable}`;
    } else {
      spellingScript = `${onsetSound} - ${rime} - ${baseSyllable} - ${toneName} - ${clean}`;
    }
  } else if (!onset && rime) {
    if (RIME_SPELLING_MAP[rime]) {
      steps.push(...RIME_SPELLING_MAP[rime].steps);
      if (toneName !== 'ngang') {
        steps.push({ text: toneName, label: `dấu ${toneName}` });
        steps.push({ text: clean, label: clean });
        spellingScript = `${RIME_SPELLING_MAP[rime].script} - ${toneName} - ${clean}`;
      } else {
        spellingScript = RIME_SPELLING_MAP[rime].script;
      }
    } else {
      steps.push({ text: rime, label: rime });
      if (toneName !== 'ngang') {
        steps.push({ text: toneName, label: `dấu ${toneName}` });
        steps.push({ text: clean, label: clean });
        spellingScript = `${unaccented} - ${toneName} - ${clean}`;
      } else {
        spellingScript = clean;
      }
    }
  } else if (onset && !rime) {
    // Trường hợp âm đầu đứng một mình (ch, th, p, nh, kh, ph, tr, qu, gi, gh, ng, ngh...)
    steps.push({ text: onsetSound, label: onset });
    spellingScript = onsetSound;
  } else {
    const sound = STANDALONE_LETTER_SOUNDS[clean] || clean;
    steps.push({ text: sound, label: clean });
    spellingScript = sound;
  }

  return {
    word: clean,
    onset,
    nucleus: rime,
    toneName,
    spellingScript,
    steps,
  };
}

// Khởi tạo danh sách giọng đọc của trình duyệt và lưu trữ giọng ưu tiên
const VOICE_STORAGE_KEY = 'be_tap_danh_van_voice_uri';

function getStoredVoiceUri(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(VOICE_STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveStoredVoiceUri(uri: string) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(VOICE_STORAGE_KEY, uri);
  } catch {
    // ignore
  }
}

let cachedVoices: SpeechSynthesisVoice[] = [];

function updateVoicesList(): SpeechSynthesisVoice[] {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const list = window.speechSynthesis.getVoices();
    if (list && list.length > 0) {
      cachedVoices = list;
    }
  }
  return cachedVoices;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  updateVoicesList();
  window.speechSynthesis.onvoiceschanged = () => {
    updateVoicesList();
  };
}

export function getAvailableVoices(): SpeechSynthesisVoice[] {
  const voices = updateVoicesList();
  return voices.filter(v => v.lang.startsWith('vi') || v.lang.includes('VN'));
}

export function setPreferredReadingVoice(uri: string | null) {
  preferredReadingVoiceUri = uri;
  if (uri) {
    saveStoredVoiceUri(uri);
  }
}

export function getPreferredReadingVoice(): string | null {
  return preferredReadingVoiceUri || getStoredVoiceUri();
}

// Từ điển phát âm chính xác các chữ cái đơn, nguyên âm & chữ ghép khi đứng riêng lẻ
const STANDALONE_LETTER_SOUNDS: Record<string, string> = {
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
  // Nguyên âm đơn
  a: 'a',
  ă: 'á',
  â: 'ớ',
  e: 'e',
  ê: 'ê',
  i: 'i ngắn',
  o: 'o',
  ô: 'ô',
  ơ: 'ơ',
  u: 'u',
  ư: 'ư',
  nghỉ: 'nghỉ',
};

export function cleanTextForVietnameseSpeech(input: string): string {
  if (!input) return '';
  let clean = input.trim();

  // 1. Kiểm tra nếu là chữ cái đơn hoặc chữ ghép đứng riêng lẻ
  const lower = clean.toLowerCase();
  if (STANDALONE_LETTER_SOUNDS[lower]) {
    return STANDALONE_LETTER_SOUNDS[lower];
  }

  // 2. Chuyển đổi các cụm "Chữ P", "Chữ Q", "Âm P", "Âm Q", "Chữ Y"
  clean = clean
    .replace(/\b[Cc]hữ\s+p\b/g, 'Chữ pờ')
    .replace(/\b[Cc]hữ\s+P\b/g, 'Chữ pờ')
    .replace(/\b[Cc]hữ\s+q\b/g, 'Chữ qui')
    .replace(/\b[Cc]hữ\s+Q\b/g, 'Chữ qui')
    .replace(/\b[Cc]hữ\s+y\b/g, 'Chữ i dài')
    .replace(/\b[Cc]hữ\s+Y\b/g, 'Chữ i dài')
    .replace(/\b[Ââ]m\s+p\b/g, 'Âm pờ')
    .replace(/\b[Ââ]m\s+P\b/g, 'Âm pờ')
    .replace(/\b[Ââ]m\s+q\b/g, 'Âm qui')
    .replace(/\b[Ââ]m\s+Q\b/g, 'Âm qui')
    .replace(/\b[Ââ]m\s+y\b/g, 'Âm i dài')
    .replace(/\b[Ââ]m\s+Y\b/g, 'Âm i dài');

  // 3. Chuẩn hóa dấu gạch ngang phân tách nhịp đánh vần, không chuyển thành dấu phẩy
  clean = clean.replace(/\s*[-–—]\s*/g, ' - ');
  clean = clean.replace(/\s*[•·/]\s*/g, ' ');

  // 4. Chuẩn hóa các từ ghép có gạch nối để phát âm liền mạch (ví dụ pa-nô -> pa nô, pi-a-ma -> pi a ma)
  clean = clean.replace(/([a-zA-ZÀ-ỹ]+)-([a-zA-ZÀ-ỹ]+)/g, '$1 $2');
  clean = clean.replace(/([a-zA-ZÀ-ỹ]+)-([a-zA-ZÀ-ỹ]+)/g, '$1 $2');

  // 5. Loại bỏ các ký tự thừa làm đứt quãng giọng đọc
  clean = clean.replace(/^[•\*]\s*/, '').replace(/["“”«»]/g, '');

  return clean;
}

export function speakWebSpeech(
  text: string,
  rate: number = 1.08,
  voiceURI?: string | null
): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve();
      return;
    }

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }

    const spokenText = cleanTextForVietnameseSpeech(text);
    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = 'vi-VN';
    utterance.rate = rate;
    utterance.pitch = 1.0;

    let voices = updateVoicesList();

    // 1. Nếu chỉ định cụ thể voiceURI hoặc có preferredReadingVoiceUri / lưu trong localStorage
    const targetUri = voiceURI || preferredReadingVoiceUri || getStoredVoiceUri();
    if (targetUri && voices.length > 0) {
      const matched = voices.find((v) => v.voiceURI === targetUri);
      if (matched) utterance.voice = matched;
    }

    // 2. Nếu chưa có, tự động chọn giọng nữ tiếng Việt truyền cảm, dịu dàng
    if (!utterance.voice && voices.length > 0) {
      const viVoices = voices.filter(
        (v) => v.lang.startsWith('vi') || v.lang.includes('VN')
      );
      const naturalFemaleVoice = viVoices.find(
        (v) =>
          v.name.includes('HoaiMy') ||
          v.name.includes('Linh') ||
          v.name.includes('Mai') ||
          v.name.includes('Google') ||
          v.name.toLowerCase().includes('female') ||
          !v.name.includes('NamMinh')
      );
      utterance.voice = naturalFemaleVoice || viVoices[0] || null;
      if (utterance.voice && !preferredReadingVoiceUri) {
        preferredReadingVoiceUri = utterance.voice.voiceURI;
        saveStoredVoiceUri(utterance.voice.voiceURI);
      }
    }

    // iOS Safari bugfix: gán vào biến window để ngăn GC thu hồi sớm utterance
    window.__activeUtterance = utterance;
    let finished = false;
    const cleanUpAndResolve = () => {
      if (finished) return;
      finished = true;
      window.__activeUtterance = null;
      resolve();
    };

    utterance.onend = cleanUpAndResolve;
    utterance.onerror = cleanUpAndResolve;
    setTimeout(cleanUpAndResolve, 8000); // Guard timeout nếu iOS bị treo

    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      cleanUpAndResolve();
    }
  });
}

/**
 * Gọi API Gemini TTS để lấy audio WAV base64 với giọng cô giáo tiểu học chuẩn mực, truyền cảm
 */
export async function fetchTTSAudio(
  text: string,
  style?: string
): Promise<string | null> {
  const trimmed = text.trim();
  if (!trimmed) return null;
  const cleaned = cleanTextForVietnameseSpeech(trimmed);
  const cacheKey = `${cleaned}_${style || 'default'}`;
  if (clientAudioCache.has(cacheKey)) {
    return clientAudioCache.get(cacheKey)!;
  }

  if (Date.now() < ttsApiDisabledUntil) {
    return null;
  }

  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: cleaned,
        style:
          style ||
          'A lively, clear, warm Vietnamese primary school teacher pronouncing Vietnamese letters and phonics at an active, brisk and encouraging pace for first grade children. Ensure bé has an open e sound, bê has a close ê sound, and ay has an ay sound distinct from ai.',
      }),
    });

    if (!res.ok) {
      if (res.status === 429 || res.status === 503) {
        ttsApiDisabledUntil = Date.now() + 15000;
      }
      return null;
    }

    const data = await res.json();
    if (data.audioBase64) {
      clientAudioCache.set(cacheKey, data.audioBase64);
      return data.audioBase64;
    }
  } catch {
    ttsApiDisabledUntil = Date.now() + 15000;
  }
  return null;
}

/**
 * Phát âm kết hợp đồng bộ toàn hệ thống: Ưu tiên AI Studio Gemini TTS, tự động fallback Web Speech
 */
export async function speakAI(
  text: string,
  options: {
    rate?: number;
    style?: string;
    onStart?: () => void;
    onEnd?: () => void;
    instant?: boolean;
    voiceURI?: string | null;
  } = {}
): Promise<void> {
  stopAllSpeech();
  options.onStart?.();

  const trimmed = text.trim();
  if (!trimmed) {
    options.onEnd?.();
    return;
  }

  // 1. Ưu tiên âm thanh AI chân thực từ Gemini TTS (giọng nữ cô giáo chuẩn mực, phát âm chính xác tuyệt đối bé, bê, ay)
  const audioBase64 = await fetchTTSAudio(trimmed, options.style);
  if (audioBase64) {
    try {
      await playAudioBase64(audioBase64);
      options.onEnd?.();
      return;
    } catch {
      // Fallback nếu trình duyệt chặn autoplay Audio
    }
  }

  // 2. Dự phòng âm thanh trực tiếp cho môi trường tĩnh (GitHub Pages)
  try {
    const cleaned = cleanTextForVietnameseSpeech(trimmed);
    const directUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(cleaned)}`;
    await playAudioUrl(directUrl, options.rate ? options.rate * 1.05 : 1.08);
    options.onEnd?.();
    return;
  } catch {
    // Fallback nếu offline hoặc không có mạng
  }

  // 3. Fallback cuối cùng: Trình duyệt Web Speech API
  await speakWebSpeech(
    trimmed,
    options.rate || 0.95,
    options.voiceURI || preferredReadingVoiceUri
  );
  options.onEnd?.();
}

/**
 * Phát âm thanh trực tiếp từ URL Audio
 */
function playAudioUrl(url: string, rate: number = 1.08): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      unlockAudioForIOS();
      let audio = sharedAudio;
      if (!audio) {
        audio = new Audio();
        audio.setAttribute('playsinline', 'true');
        audio.setAttribute('webkit-playsinline', 'true');
        sharedAudio = audio;
      }
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch {
        // ignore
      }

      audio.src = url;
      audio.playbackRate = rate;
      currentAudio = audio;

      let settled = false;
      const done = (isErr = false, err?: unknown) => {
        if (settled) return;
        settled = true;
        currentAudio = null;
        if (isErr) reject(err);
        else resolve();
      };

      audio.onended = () => done(false);
      audio.onerror = (e) => done(true, e);
      setTimeout(() => done(false), 5000); // 5s timeout guard cho iPad cũ

      const p = audio.play();
      if (p !== undefined) {
        p.catch((err) => done(true, err));
      }
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Phát âm thanh từ Base64 WAV
 */
function playAudioBase64(base64: string, rate: number = 1.14): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      unlockAudioForIOS();
      const mime = base64.startsWith('UklGR') ? 'audio/wav' : 'audio/mpeg';
      const dataSrc = `data:${mime};base64,${base64}`;

      let audio = sharedAudio;
      if (!audio) {
        audio = new Audio();
        audio.setAttribute('playsinline', 'true');
        audio.setAttribute('webkit-playsinline', 'true');
        sharedAudio = audio;
      }
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch {
        // ignore
      }

      audio.src = dataSrc;
      audio.playbackRate = rate;
      currentAudio = audio;

      let settled = false;
      const done = (isErr = false, err?: unknown) => {
        if (settled) return;
        settled = true;
        currentAudio = null;
        if (isErr) reject(err);
        else resolve();
      };

      audio.onended = () => done(false);
      audio.onerror = (e) => done(true, e);
      setTimeout(() => done(false), 5000); // 5s timeout guard

      const p = audio.play();
      if (p !== undefined) {
        p.catch((err) => done(true, err));
      }
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Dừng mọi âm thanh đang phát
 */
export function stopAllSpeech() {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch {
      // ignore
    }
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Phát âm đánh vần: Đọc trọn vẹn câu đánh vần nhịp nhàng của cô giáo
 * (ví dụ: "bờ - e - be - sắc - bé", "bờ - ê - bê", "a - y - ay")
 */
export async function spellOutSyllable(
  word: string,
  onStepChange?: (step: { text: string; label: string }, stepIndex: number) => void
): Promise<void> {
  stopAllSpeech();
  const analysis = analyzeSyllable(word);

  // 1. Ưu tiên âm thanh AI Gemini TTS đọc trọn vẹn câu đánh vần nhịp nhàng của cô giáo
  const spellingText = analysis.spellingScript;
  const audioBase64 = await fetchTTSAudio(
    spellingText,
    `A lively Vietnamese primary school teacher spelling out letters at an active, brisk, clear rhythm for a first grader: ${spellingText}. Ensure bé has an open e sound, bê has a close ê sound, and ay has an ay sound distinct from ai.`
  );

  if (audioBase64) {
    onStepChange?.({ text: spellingText, label: spellingText }, 0);
    const stepCount = analysis.steps.length;
    let stepIdx = 0;
    // Nhịp bước đánh vần nhanh, dứt khoát và hoạt bát hơn (180ms - 380ms)
    const intervalTime = Math.max(180, Math.min(380, 1400 / (stepCount || 1)));
    const interval = setInterval(() => {
      if (stepIdx < stepCount) {
        onStepChange?.(analysis.steps[stepIdx], stepIdx);
        stepIdx++;
      }
    }, intervalTime);
    try {
      await playAudioBase64(audioBase64, 1.14);
    } finally {
      clearInterval(interval);
      onStepChange?.(analysis.steps[stepCount - 1], stepCount - 1);
    }
    return;
  }

  // 1.5 Dự phòng phát trực tiếp câu đánh vần từ URL âm thanh Google TTS cho môi trường tĩnh (GitHub Pages)
  try {
    const directUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(spellingText)}`;
    onStepChange?.({ text: spellingText, label: spellingText }, 0);
    const stepCount = analysis.steps.length;
    let stepIdx = 0;
    const intervalTime = Math.max(180, Math.min(380, 1400 / (stepCount || 1)));
    const interval = setInterval(() => {
      if (stepIdx < stepCount) {
        onStepChange?.(analysis.steps[stepIdx], stepIdx);
        stepIdx++;
      }
    }, intervalTime);
    try {
      await playAudioUrl(directUrl, 1.1);
      return;
    } finally {
      clearInterval(interval);
      onStepChange?.(analysis.steps[stepCount - 1], stepCount - 1);
    }
  } catch {
    // Fallback sang Web Speech API từng bước
  }

  // 2. Web Speech fallback
  for (let i = 0; i < analysis.steps.length; i++) {
    const step = analysis.steps[i];
    onStepChange?.(step, i);
    await speakWebSpeech(step.text, 1.08, preferredReadingVoiceUri);
    await new Promise((r) => setTimeout(r, 90));
  }
}
