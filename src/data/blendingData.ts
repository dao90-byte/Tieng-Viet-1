/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PhonicsOnset {
  key: string;
  label: string;      // chữ hiển thị (ví dụ: b, ch, th)
  spokenName: string; // tên gọi ngữ âm (ví dụ: bờ, chờ, thờ)
}

export interface PhonicsRime {
  key: string;
  label: string;      // vần hiển thị (ví dụ: a, an, uyên)
  spokenName: string; // tên phát âm vần (ví dụ: a, an, uyên)
  group: 'single' | 'double' | 'compound';
}

export type ToneType = 'none' | 'sac' | 'huyen' | 'hoi' | 'nga' | 'nang';

export interface PhonicsTone {
  id: ToneType;
  label: string;
  symbol: string;
  name: string;
}

export const ONSETS: PhonicsOnset[] = [
  { key: 'b', label: 'b', spokenName: 'bờ' },
  { key: 'c', label: 'c', spokenName: 'cờ' },
  { key: 'd', label: 'd', spokenName: 'dờ' },
  { key: 'đ', label: 'đ', spokenName: 'đờ' },
  { key: 'g', label: 'g', spokenName: 'gờ' },
  { key: 'h', label: 'h', spokenName: 'hờ' },
  { key: 'k', label: 'k', spokenName: 'ca' },
  { key: 'l', label: 'l', spokenName: 'lờ' },
  { key: 'm', label: 'm', spokenName: 'mờ' },
  { key: 'n', label: 'n', spokenName: 'nờ' },
  { key: 'p', label: 'p', spokenName: 'pờ' },
  { key: 'r', label: 'r', spokenName: 'rờ' },
  { key: 's', label: 's', spokenName: 'sờ' },
  { key: 't', label: 't', spokenName: 'tờ' },
  { key: 'v', label: 'v', spokenName: 'vờ' },
  { key: 'x', label: 'x', spokenName: 'xờ' },
  { key: 'ch', label: 'ch', spokenName: 'chờ' },
  { key: 'gh', label: 'gh', spokenName: 'gờ' },
  { key: 'gi', label: 'gi', spokenName: 'gi' },
  { key: 'kh', label: 'kh', spokenName: 'khờ' },
  { key: 'nh', label: 'nh', spokenName: 'nhờ' },
  { key: 'ng', label: 'ng', spokenName: 'ngờ' },
  { key: 'ngh', label: 'ngh', spokenName: 'ngờ' },
  { key: 'ph', label: 'ph', spokenName: 'phờ' },
  { key: 'qu', label: 'qu', spokenName: 'quờ' },
  { key: 'th', label: 'th', spokenName: 'thờ' },
  { key: 'tr', label: 'tr', spokenName: 'trờ' },
];

export const RIMES: PhonicsRime[] = [
  // Vần đơn
  { key: 'a', label: 'a', spokenName: 'a', group: 'single' },
  { key: 'o', label: 'o', spokenName: 'o', group: 'single' },
  { key: 'ô', label: 'ô', spokenName: 'ô', group: 'single' },
  { key: 'ơ', label: 'ơ', spokenName: 'ơ', group: 'single' },
  { key: 'e', label: 'e', spokenName: 'e', group: 'single' },
  { key: 'ê', label: 'ê', spokenName: 'ê', group: 'single' },
  { key: 'i', label: 'i', spokenName: 'i', group: 'single' },
  { key: 'u', label: 'u', spokenName: 'u', group: 'single' },
  { key: 'ư', label: 'ư', spokenName: 'ư', group: 'single' },
  // Vần đôi thông dụng
  { key: 'ai', label: 'ai', spokenName: 'ai', group: 'double' },
  { key: 'ay', label: 'ay', spokenName: 'ay', group: 'double' },
  { key: 'ao', label: 'ao', spokenName: 'ao', group: 'double' },
  { key: 'au', label: 'au', spokenName: 'au', group: 'double' },
  { key: 'eo', label: 'eo', spokenName: 'eo', group: 'double' },
  { key: 'oi', label: 'oi', spokenName: 'oi', group: 'double' },
  { key: 'ôi', label: 'ôi', spokenName: 'ôi', group: 'double' },
  { key: 'ơi', label: 'ơi', spokenName: 'ơi', group: 'double' },
  { key: 'ui', label: 'ui', spokenName: 'ui', group: 'double' },
  { key: 'an', label: 'an', spokenName: 'an', group: 'double' },
  { key: 'am', label: 'am', spokenName: 'am', group: 'double' },
  { key: 'at', label: 'at', spokenName: 'at', group: 'double' },
  { key: 'ap', label: 'ap', spokenName: 'ap', group: 'double' },
  { key: 'en', label: 'en', spokenName: 'en', group: 'double' },
  { key: 'on', label: 'on', spokenName: 'on', group: 'double' },
  { key: 'ong', label: 'ong', spokenName: 'ong', group: 'double' },
  { key: 'ang', label: 'ang', spokenName: 'ang', group: 'double' },
  { key: 'anh', label: 'anh', spokenName: 'anh', group: 'double' },
  { key: 'oa', label: 'oa', spokenName: 'oa', group: 'double' },
  // Vần phức
  { key: 'uoi', label: 'uôi', spokenName: 'uôi', group: 'compound' },
  { key: 'uyen', label: 'uyên', spokenName: 'uyên', group: 'compound' },
  { key: 'uou', label: 'ươu', spokenName: 'ươu', group: 'compound' },
  { key: 'oan', label: 'oan', spokenName: 'oan', group: 'compound' },
];

export const TONES: PhonicsTone[] = [
  { id: 'none', label: 'Thanh Ngang', symbol: '—', name: 'không dấu' },
  { id: 'sac', label: 'Dấu Sắc', symbol: '´', name: 'sắc' },
  { id: 'huyen', label: 'Dấu Huyền', symbol: '`', name: 'huyền' },
  { id: 'hoi', label: 'Dấu Hỏi', symbol: '?', name: 'hỏi' },
  { id: 'nga', label: 'Dấu Ngã', symbol: '~', name: 'ngã' },
  { id: 'nang', label: 'Dấu Nặng', symbol: '.', name: 'nặng' },
];

// Bản đồ từ điển từ ngữ thân thuộc có nghĩa cho học sinh lớp 1
export interface MeaningfulWord {
  onset: string;
  rimeKey: string;
  tone: ToneType;
  word: string;
  meaning: string;
  image: string;
}

export const MEANINGFUL_WORDS: MeaningfulWord[] = [
  { onset: 'c', rimeKey: 'a', tone: 'sac', word: 'cá', meaning: 'con cá bơi lội', image: '🐟' },
  { onset: 'b', rimeKey: 'o', tone: 'huyen', word: 'bò', meaning: 'con bò ăn cỏ', image: '🐂' },
  { onset: 'g', rimeKey: 'a', tone: 'huyen', word: 'gà', meaning: 'chú gà trống gáy', image: '🐔' },
  { onset: 'm', rimeKey: 'eo', tone: 'huyen', word: 'mèo', meaning: 'mèo con kêu meo meo', image: '🐱' },
  { onset: 'ch', rimeKey: 'o', tone: 'sac', word: 'chó', meaning: 'chú chó giữ nhà', image: '🐶' },
  { onset: 'b', rimeKey: 'a', tone: 'none', word: 'ba', meaning: 'người ba thân yêu', image: '👨‍👧' },
  { onset: 'm', rimeKey: 'e', tone: 'nang', word: 'mẹ', meaning: 'người mẹ kính yêu', image: '👩‍👧' },
  { onset: 'x', rimeKey: 'e', tone: 'none', word: 'xe', meaning: 'xe ô tô bon bon', image: '🚗' },
  { onset: 'h', rimeKey: 'oa', tone: 'none', word: 'hoa', meaning: 'bông hoa tươi thắm', image: '🌸' },
  { onset: 'l', rimeKey: 'a', tone: 'sac', word: 'lá', meaning: 'chiếc lá xanh tươi', image: '🍃' },
  { onset: 'nh', rimeKey: 'a', tone: 'huyen', word: 'nhà', meaning: 'ngôi nhà ấm cúng', image: '🏠' },
  { onset: 'ch', rimeKey: 'uoi', tone: 'sac', word: 'chuối', meaning: 'nải chuối chín vàng', image: '🍌' },
  { onset: 'b', rimeKey: 'ong', tone: 'sac', word: 'bóng', meaning: 'quả bóng tròn', image: '⚽' },
  { onset: 'n', rimeKey: 'on', tone: 'sac', word: 'nón', meaning: 'chiếc nón lá che nắng', image: '👒' },
  { onset: 'th', rimeKey: 'uyen', tone: 'huyen', word: 'thuyền', meaning: 'con thuyền trôi xuôi', image: '⛵' },
  { onset: 'đ', rimeKey: 'en', tone: 'huyen', word: 'đèn', meaning: 'chiếc đèn thắp sáng', image: '💡' },
  { onset: 'c', rimeKey: 'am', tone: 'none', word: 'cam', meaning: 'quả cam mọng nước', image: '🍊' },
  { onset: 't', rimeKey: 'ao', tone: 'sac', word: 'táo', meaning: 'quả táo giòn ngọt', image: '🍎' },
  { onset: 'h', rimeKey: 'o', tone: 'huyen', word: 'hồ', meaning: 'hồ nước trong xanh', image: '🏞️' },
  { onset: 'b', rimeKey: 'e', tone: 'sac', word: 'bé', meaning: 'em bé chăm ngoan', image: '👶' },
];

// Hàm tổ hợp tiếng Việt chuẩn xác
export function combinePhonics(onsetStr: string, rimeKey: string, tone: ToneType): {
  syllable: string;
  spellingScript: string;
  foundMeaning?: MeaningfulWord;
} {
  // Tìm từ có nghĩa khớp
  const found = MEANINGFUL_WORDS.find(
    (w) => w.onset === onsetStr && w.rimeKey === rimeKey && w.tone === tone
  );

  if (found) {
    const onsetObj = ONSETS.find((o) => o.key === onsetStr);
    const rimeObj = RIMES.find((r) => r.key === rimeKey);
    const toneObj = TONES.find((t) => t.id === tone);

    const onsetSpoken = onsetObj ? onsetObj.spokenName : onsetStr;
    const rimeSpoken = rimeObj ? rimeObj.spokenName : rimeKey;
    const toneSpoken = toneObj && toneObj.id !== 'none' ? ` - ${toneObj.name}` : '';

    // Tiếng không dấu
    const baseSyllable = combineBaseSyllable(onsetStr, rimeKey);
    const script = tone === 'none'
      ? `${onsetSpoken} - ${rimeSpoken} - ${found.word}`
      : `${onsetSpoken} - ${rimeSpoken} - ${baseSyllable}${toneSpoken} - ${found.word}`;

    return {
      syllable: found.word,
      spellingScript: script,
      foundMeaning: found,
    };
  }

  // Nếu không có trong danh sách chuẩn có nghĩa, tạo ghép vần tự nhiên theo quy tắc
  const baseSyllable = combineBaseSyllable(onsetStr, rimeKey);
  const accentedSyllable = applyTone(baseSyllable, tone);

  const onsetObj = ONSETS.find((o) => o.key === onsetStr);
  const rimeObj = RIMES.find((r) => r.key === rimeKey);
  const toneObj = TONES.find((t) => t.id === tone);

  const onsetSpoken = onsetObj ? onsetObj.spokenName : onsetStr;
  const rimeSpoken = rimeObj ? rimeObj.spokenName : rimeKey;
  const toneSpoken = toneObj && toneObj.id !== 'none' ? ` - ${toneObj.name}` : '';

  const script = tone === 'none'
    ? `${onsetSpoken} - ${rimeSpoken} - ${accentedSyllable}`
    : `${onsetSpoken} - ${rimeSpoken} - ${baseSyllable}${toneSpoken} - ${accentedSyllable}`;

  return {
    syllable: accentedSyllable,
    spellingScript: script,
  };
}

function combineBaseSyllable(onset: string, rimeKey: string): string {
  const rimeObj = RIMES.find((r) => r.key === rimeKey);
  const rimeText = rimeObj ? rimeObj.label : rimeKey;

  // Xử lý chính tả: c/k/q, g/gh, ng/ngh
  let normalizedOnset = onset;
  if (['e', 'ê', 'i', 'en', 'ên', 'in', 'em', 'êm', 'im', 'êch', 'inh'].includes(rimeKey)) {
    if (onset === 'c') normalizedOnset = 'k';
    if (onset === 'g') normalizedOnset = 'gh';
    if (onset === 'ng') normalizedOnset = 'ngh';
  } else {
    if (onset === 'k') normalizedOnset = 'c';
    if (onset === 'gh') normalizedOnset = 'g';
    if (onset === 'ngh') normalizedOnset = 'ng';
  }

  // q luôn đi với u (qu)
  if (normalizedOnset === 'qu' && rimeText.startsWith('u')) {
    return `qu${rimeText.slice(1)}`;
  }
  // gi với i
  if (normalizedOnset === 'gi' && rimeText.startsWith('i')) {
    return `gi${rimeText.slice(1)}`;
  }

  return `${normalizedOnset}${rimeText}`;
}

function applyTone(word: string, tone: ToneType): string {
  if (tone === 'none') return word;

  const toneMap: Record<string, Record<ToneType, string>> = {
    a: { none: 'a', sac: 'á', huyen: 'à', hoi: 'ả', nga: 'ã', nang: 'ạ' },
    ă: { none: 'ă', sac: 'ắ', huyen: 'ằ', hoi: 'ẳ', nga: 'ẵ', nang: 'ặ' },
    â: { none: 'â', sac: 'ấ', huyen: 'ầ', hoi: 'ẩ', nga: 'ẫ', nang: 'ậ' },
    e: { none: 'e', sac: 'é', huyen: 'è', hoi: 'ẻ', nga: 'ẽ', nang: 'ẹ' },
    ê: { none: 'ê', sac: 'ế', huyen: 'ề', hoi: 'ể', nga: 'ễ', nang: 'ệ' },
    i: { none: 'i', sac: 'í', huyen: 'ì', hoi: 'ỉ', nga: 'ĩ', nang: 'ị' },
    o: { none: 'o', sac: 'ó', huyen: 'ò', hoi: 'ỏ', nga: 'õ', nang: 'ọ' },
    ô: { none: 'ô', sac: 'ố', huyen: 'ồ', hoi: 'ổ', nga: 'ỗ', nang: 'ộ' },
    ơ: { none: 'ơ', sac: 'ớ', huyen: 'ờ', hoi: 'ở', nga: 'ỡ', nang: 'ợ' },
    u: { none: 'u', sac: 'ú', huyen: 'ù', hoi: 'ủ', nga: 'ũ', nang: 'ụ' },
    ư: { none: 'ư', sac: 'ứ', huyen: 'ừ', hoi: 'ử', nga: 'ữ', nang: 'ự' },
    y: { none: 'y', sac: 'ý', huyen: 'ỳ', hoi: 'ỷ', nga: 'ỹ', nang: 'ỵ' },
  };

  // Tìm nguyên âm chính đặt dấu theo quy tắc tiểu học
  // Ưu tiên ơ, ê, ô, â, ă trước
  const priorityVowels = ['ơ', 'ê', 'ô', 'â', 'ă'];
  for (const pv of priorityVowels) {
    if (word.includes(pv)) {
      const accented = toneMap[pv]?.[tone] || pv;
      return word.replace(pv, accented);
    }
  }

  // Nếu có oa, oe, uy mà có phụ âm cuối thì đặt ở âm sau, không có phụ âm cuối thì đặt ở âm trước hoặc theo chuẩn
  // Cách đơn giản và hiệu quả nhất cho lớp 1:
  for (let i = word.length - 1; i >= 0; i--) {
    const char = word[i];
    if (toneMap[char]) {
      const accented = toneMap[char][tone] || char;
      return word.slice(0, i) + accented + word.slice(i + 1);
    }
  }

  return word;
}

// 3. THỬ THÁCH ĐOÀN TÀU GHÉP VẦN
export interface TrainChallenge {
  id: string;
  image: string;
  fullWord: string;
  prefix: string;          // phần chữ đã có sẵn trên tàu (ví dụ: "ch")
  targetMissing: string;   // phần cần kéo vào toa tàu (ví dụ: "uối")
  options: string[];       // 4 lựa chọn cho bé
  fullSpelling: string;    // câu đánh vần mẫu
}

export const TRAIN_CHALLENGES: TrainChallenge[] = [
  {
    id: 't1',
    image: '🍌',
    fullWord: 'chuối',
    prefix: 'ch',
    targetMissing: 'uối',
    options: ['uối', 'uôi', 'ơi', 'ao'],
    fullSpelling: 'chờ - uôi - chuôi - sắc - chuối',
  },
  {
    id: 't2',
    image: '🐱',
    fullWord: 'mèo',
    prefix: 'm',
    targetMissing: 'èo',
    options: ['èo', 'ào', 'eo', 'âu'],
    fullSpelling: 'mờ - eo - meo - huyền - mèo',
  },
  {
    id: 't3',
    image: '⛵',
    fullWord: 'thuyền',
    prefix: 'th',
    targetMissing: 'uyền',
    options: ['uyền', 'uyên', 'uông', 'ươn'],
    fullSpelling: 'thờ - uyên - thuyên - huyền - thuyền',
  },
  {
    id: 't4',
    image: '💡',
    fullWord: 'đèn',
    prefix: 'đ',
    targetMissing: 'èn',
    options: ['èn', 'en', 'an', 'òn'],
    fullSpelling: 'đờ - en - đen - huyền - đèn',
  },
  {
    id: 't5',
    image: '🐟',
    fullWord: 'cá',
    prefix: 'c',
    targetMissing: 'á',
    options: ['á', 'à', 'ả', 'ó'],
    fullSpelling: 'cờ - a - ca - sắc - cá',
  },
  {
    id: 't6',
    image: '🌸',
    fullWord: 'hoa',
    prefix: 'h',
    targetMissing: 'oa',
    options: ['oa', 'oe', 'ua', 'ưa'],
    fullSpelling: 'hờ - oa - hoa',
  },
  {
    id: 't7',
    image: '⚽',
    fullWord: 'bóng',
    prefix: 'b',
    targetMissing: 'óng',
    options: ['óng', 'ong', 'ông', 'ang'],
    fullSpelling: 'bờ - ong - bong - sắc - bóng',
  },
  {
    id: 't8',
    image: '👒',
    fullWord: 'nón',
    prefix: 'n',
    targetMissing: 'ón',
    options: ['ón', 'on', 'án', 'ơn'],
    fullSpelling: 'nờ - on - non - sắc - nón',
  },
];

// 4. THỬ THÁCH NỐI ÂM ĐẦU VÀ VẦN TẠO TỪ THEO TRANH
export interface MatchingRound {
  id: string;
  title: string;
  items: {
    id: string;
    onset: string;
    rimeAndTone: string;
    word: string;
    image: string;
    spelling: string;
  }[];
}

export const MATCHING_ROUNDS: MatchingRound[] = [
  {
    id: 'round_1',
    title: 'Màn 1: Động vật đáng yêu quanh bé',
    items: [
      { id: 'm1_1', onset: 'c', rimeAndTone: 'á', word: 'cá', image: '🐟', spelling: 'cờ - a - ca - sắc - cá' },
      { id: 'm1_2', onset: 'm', rimeAndTone: 'èo', word: 'mèo', image: '🐱', spelling: 'mờ - eo - meo - huyền - mèo' },
      { id: 'm1_3', onset: 'b', rimeAndTone: 'ò', word: 'bò', image: '🐂', spelling: 'bờ - o - bo - huyền - bò' },
      { id: 'm1_4', onset: 'g', rimeAndTone: 'à', word: 'gà', image: '🐔', spelling: 'gờ - a - ga - huyền - gà' },
    ],
  },
  {
    id: 'round_2',
    title: 'Màn 2: Hoa quả & Đồ vật thân quen',
    items: [
      { id: 'm2_1', onset: 'h', rimeAndTone: 'oa', word: 'hoa', image: '🌸', spelling: 'hờ - oa - hoa' },
      { id: 'm2_2', onset: 'x', rimeAndTone: 'e', word: 'xe', image: '🚗', spelling: 'xờ - e - xe' },
      { id: 'm2_3', onset: 'nh', rimeAndTone: 'à', word: 'nhà', image: '🏠', spelling: 'nhờ - a - nha - huyền - nhà' },
      { id: 'm2_4', onset: 'đ', rimeAndTone: 'èn', word: 'đèn', image: '💡', spelling: 'đờ - en - đen - huyền - đèn' },
    ],
  },
];
