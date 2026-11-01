/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Cache in browser for base64 audio responses
const clientAudioCache = new Map<string, string>();
let currentAudio: HTMLAudioElement | null = null;
let ttsApiDisabledUntil = 0;
let preferredReadingVoiceUri: string | null = null;

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
        { text: 'y', label: 'y' },
        { text: 'ay', label: 'ay' },
      ],
      script: 'a - y - ay',
    },
    ây: {
      steps: [
        { text: 'ớ', label: 'â' },
        { text: 'y', label: 'y' },
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
    ưa: {
      steps: [
        { text: 'ư', label: 'ư' },
        { text: 'a', label: 'a' },
        { text: 'ưa', label: 'ưa' },
      ],
      script: 'ư - a - ưa',
    },
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
  } else {
    steps.push({ text: clean, label: clean });
    spellingScript = clean;
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
  y: 'y',
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

  // 3. Nếu là danh sách các vần/chữ cái ghép cách nhau bởi gạch nối, chấm tròn, dấu phẩy (ví dụ: "ay - ây", "an · ăn · ân", "ua - ưa", "oi - ai")
  // Chuyển thành dấu phẩy và khoảng trắng để giọng đọc phát âm từng vần ngắt nghỉ tự nhiên, tuyệt đối không đọc từ "gạch ngang" hay "chấm"
  clean = clean.replace(/\s*[-–—•·/]\s*/g, ', ');

  // 4. Chuẩn hóa các từ ghép có gạch nối để phát âm liền mạch (ví dụ pa-nô -> pa nô, pi-a-ma -> pi a ma)
  clean = clean.replace(/([a-zA-ZÀ-ỹ]+)-([a-zA-ZÀ-ỹ]+)/g, '$1 $2');
  clean = clean.replace(/([a-zA-ZÀ-ỹ]+)-([a-zA-ZÀ-ỹ]+)/g, '$1 $2');

  // 5. Loại bỏ các ký tự thừa làm đứt quãng giọng đọc
  clean = clean.replace(/^[•\-\*]\s*/, '').replace(/["“”«»]/g, '');

  return clean;
}

export function speakWebSpeech(
  text: string,
  rate: number = 0.95,
  voiceURI?: string | null
): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();
    const spokenText = cleanTextForVietnameseSpeech(text);
    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = 'vi-VN';
    utterance.rate = rate;
    utterance.pitch = 1.06;

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

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}

/**
 * Phát âm kết hợp đồng bộ toàn hệ thống bằng giọng nữ chuẩn đã thiết lập ở Bảng Chữ & Dấu
 * Đảm bảo âm thanh phát NGAY LẬP TỨC (<15ms), không bị độ trễ mạng hay đổi giọng
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
  // Phát tức thì bằng giọng nữ chuẩn tiếng Việt đồng nhất toàn ứng dụng
  await speakWebSpeech(
    trimmed,
    options.rate || 0.95,
    options.voiceURI || preferredReadingVoiceUri
  );
  options.onEnd?.();
}

/**
 * Phát âm thanh từ Base64 WAV
 */
function playAudioBase64(base64: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const audio = new Audio(`data:audio/wav;base64,${base64}`);
      currentAudio = audio;
      audio.onended = () => {
        currentAudio = null;
        resolve();
      };
      audio.onerror = (e) => {
        currentAudio = null;
        reject(e);
      };
      audio.play().catch(reject);
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
 * Phát âm đánh vần từng bước tốc độ nhanh, nhịp nhàng (bờ - a - ba - sắc - bá)
 */
export async function spellOutSyllable(
  word: string,
  onStepChange?: (step: { text: string; label: string }, stepIndex: number) => void
): Promise<void> {
  stopAllSpeech();
  const analysis = analyzeSyllable(word);

  for (let i = 0; i < analysis.steps.length; i++) {
    const step = analysis.steps[i];
    onStepChange?.(step, i);
    // Tốc độ đánh vần chuẩn mực sư phạm (rate 0.95), tròn vành rõ chữ, phân biệt sắc nét e và ê
    await speakWebSpeech(step.text, 0.95, preferredReadingVoiceUri);
    // Khoảng dừng nhịp điệu tự nhiên 120ms giúp trẻ nhỏ cảm nhận rõ từng âm tiết
    await new Promise(r => setTimeout(r, 120));
  }
}
