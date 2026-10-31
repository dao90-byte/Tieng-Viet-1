/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AlphabetItem {
  id: string;
  char: string;
  upper: string;
  soundName: string; // Tên âm khi đánh vần (ví dụ: b -> "bờ", c -> "cờ")
  exampleWord: string;
  exampleImage: string; // emoji icon or visual keyword
  type: 'vowel' | 'consonant' | 'digraph';
  spellingGuide: string;
}

export interface ToneItem {
  name: string;
  symbol: string;
  description: string;
  clownFeature: string; // Vị trí trên mặt chú hề
  exampleBase: string; // ma
  exampleTone: string; // má
  colorClass: string;
  badgeBg: string;
}

export interface PhonicsRow {
  vowel: string;
  toneNone: string; // không dấu
  toneSac: string; // sắc
  toneHuyen: string; // huyền
  toneHoi: string; // hỏi
  toneNga: string; // ngã
  toneNang: string; // nặng
}

export interface ConsonantReadingPractice {
  illustratedWords: { word: string; image: string; spellingSteps?: string[] }[];
  practiceWords: string[];
  sceneCaption?: string;
  sentences: string[];
}

export interface RimeReadingLesson {
  id: string;
  rimes: string[];
  title: string;
  bookPage: number;
  illustratedWords: { word: string; image: string }[];
  practiceWords: string[];
  sentences: string[];
  passage?: {
    title?: string;
    text: string;
  };
}

export interface ConsonantPhonicsLesson {
  consonant: string;
  soundName: string;
  keyword: string;
  keywordImage: string;
  spellingRuleNotice?: string;
  rows: PhonicsRow[];
  readingData: ConsonantReadingPractice;
}

export interface RimeGroup {
  id: string;
  title: string;
  description: string;
  rimes: {
    rime: string;
    sampleWords: string[];
    spelling: string; // e.g., "a - n - an"
  }[];
}

export interface ReadingItem {
  id: string;
  category: 'word' | 'phrase' | 'sentence' | 'story';
  title?: string;
  text: string;
  illustration?: string;
  spellingSteps?: string[]; // Các bước đánh vần
  tags?: string[];
}

// 29 Chữ Cái & 11 Chữ Ghép
export const ALPHABET_DATA: AlphabetItem[] = [
  { id: 'a', char: 'a', upper: 'A', soundName: 'a', exampleWord: 'con gà', exampleImage: '🐔', type: 'vowel', spellingGuide: 'a' },
  { id: 'aw', char: 'ă', upper: 'Ă', soundName: 'á', exampleWord: 'mặt trăng', exampleImage: '🌙', type: 'vowel', spellingGuide: 'á' },
  { id: 'aa', char: 'â', upper: 'Â', soundName: 'ớ', exampleWord: 'cái ấm', exampleImage: '🫖', type: 'vowel', spellingGuide: 'ớ' },
  { id: 'b', char: 'b', upper: 'B', soundName: 'bờ', exampleWord: 'con bò', exampleImage: '🐂', type: 'consonant', spellingGuide: 'bờ' },
  { id: 'c', char: 'c', upper: 'C', soundName: 'cờ', exampleWord: 'con cá', exampleImage: '🐟', type: 'consonant', spellingGuide: 'cờ' },
  { id: 'd', char: 'd', upper: 'D', soundName: 'dờ', exampleWord: 'con dê', exampleImage: '🐐', type: 'consonant', spellingGuide: 'dờ' },
  { id: 'dd', char: 'đ', upper: 'Đ', soundName: 'đờ', exampleWord: 'đu đủ', exampleImage: '🍈', type: 'consonant', spellingGuide: 'đờ' },
  { id: 'e', char: 'e', upper: 'E', soundName: 'e', exampleWord: 'con ve', exampleImage: '🦗', type: 'vowel', spellingGuide: 'e' },
  { id: 'ee', char: 'ê', upper: 'Ê', soundName: 'ê', exampleWord: 'quả khế', exampleImage: '⭐', type: 'vowel', spellingGuide: 'ê' },
  { id: 'g', char: 'g', upper: 'G', soundName: 'gờ', exampleWord: 'gà gô', exampleImage: '🦃', type: 'consonant', spellingGuide: 'gờ đơn' },
  { id: 'h', char: 'h', upper: 'H', soundName: 'hờ', exampleWord: 'con hổ', exampleImage: '🐯', type: 'consonant', spellingGuide: 'hờ' },
  { id: 'i', char: 'i', upper: 'I', soundName: 'i', exampleWord: 'viên bi', exampleImage: '⚪', type: 'vowel', spellingGuide: 'i ngắn' },
  { id: 'k', char: 'k', upper: 'K', soundName: 'ca', exampleWord: 'thước kẻ', exampleImage: '📐', type: 'consonant', spellingGuide: 'ca' },
  { id: 'l', char: 'l', upper: 'L', soundName: 'lờ', exampleWord: 'quả lê', exampleImage: '🍐', type: 'consonant', spellingGuide: 'lờ' },
  { id: 'm', char: 'm', upper: 'M', soundName: 'mờ', exampleWord: 'quả me', exampleImage: '🌱', type: 'consonant', spellingGuide: 'mờ' },
  { id: 'n', char: 'n', upper: 'N', soundName: 'nờ', exampleWord: 'quả na', exampleImage: '🍈', type: 'consonant', spellingGuide: 'nờ' },
  { id: 'o', char: 'o', upper: 'O', soundName: 'o', exampleWord: 'con ong', exampleImage: '🐝', type: 'vowel', spellingGuide: 'o' },
  { id: 'oo', char: 'ô', upper: 'Ô', soundName: 'ô', exampleWord: 'cái ô', exampleImage: '☂️', type: 'vowel', spellingGuide: 'ô' },
  { id: 'ow', char: 'ơ', upper: 'Ơ', soundName: 'ơ', exampleWord: 'quả bơ', exampleImage: '🥑', type: 'vowel', spellingGuide: 'ơ' },
  { id: 'p', char: 'p', upper: 'P', soundName: 'pờ', exampleWord: 'cục pin', exampleImage: '🔋', type: 'consonant', spellingGuide: 'pờ' },
  { id: 'q', char: 'q', upper: 'Q', soundName: 'qui', exampleWord: 'quả khế', exampleImage: '⭐', type: 'consonant', spellingGuide: 'qui' },
  { id: 'r', char: 'r', upper: 'R', soundName: 'rờ', exampleWord: 'cái rổ', exampleImage: '🧺', type: 'consonant', spellingGuide: 'rờ' },
  { id: 's', char: 's', upper: 'S', soundName: 'sờ', exampleWord: 'sư tử', exampleImage: '🦁', type: 'consonant', spellingGuide: 'sờ (nặng)' },
  { id: 't', char: 't', upper: 'T', soundName: 'tờ', exampleWord: 'cái tủ', exampleImage: '🚪', type: 'consonant', spellingGuide: 'tờ' },
  { id: 'u', char: 'u', upper: 'U', soundName: 'u', exampleWord: 'con cua', exampleImage: '🦀', type: 'vowel', spellingGuide: 'u' },
  { id: 'uw', char: 'ư', upper: 'Ư', soundName: 'ư', exampleWord: 'lá thư', exampleImage: '✉️', type: 'vowel', spellingGuide: 'ư' },
  { id: 'v', char: 'v', upper: 'V', soundName: 'vờ', exampleWord: 'con vịt', exampleImage: '🦆', type: 'consonant', spellingGuide: 'vờ' },
  { id: 'x', char: 'x', upper: 'X', soundName: 'xờ', exampleWord: 'xe bò', exampleImage: '🚜', type: 'consonant', spellingGuide: 'xờ (nhẹ)' },
  { id: 'y', char: 'y', upper: 'Y', soundName: 'i dài', exampleWord: 'y tá', exampleImage: '👩‍⚕️', type: 'vowel', spellingGuide: 'i dài' },
  // 11 Chữ Ghép
  { id: 'ch', char: 'ch', upper: 'CH', soundName: 'chờ', exampleWord: 'chó xù', exampleImage: '🐶', type: 'digraph', spellingGuide: 'cờ - hờ - chờ' },
  { id: 'gh', char: 'gh', upper: 'GH', soundName: 'gờ', exampleWord: 'ghế gỗ', exampleImage: '🪑', type: 'digraph', spellingGuide: 'gờ kép' },
  { id: 'gi', char: 'gi', upper: 'GI', soundName: 'gi', exampleWord: 'giỏ cá', exampleImage: '🧺', type: 'digraph', spellingGuide: 'gi' },
  { id: 'kh', char: 'kh', upper: 'KH', soundName: 'khờ', exampleWord: 'chú khỉ', exampleImage: '🐒', type: 'digraph', spellingGuide: 'ca - hờ - khờ' },
  { id: 'nh', char: 'nh', upper: 'NH', soundName: 'nhờ', exampleWord: 'chùm nho', exampleImage: '🍇', type: 'digraph', spellingGuide: 'nờ - hờ - nhờ' },
  { id: 'ng', char: 'ng', upper: 'NG', soundName: 'ngờ', exampleWord: 'bắp ngô', exampleImage: '🌽', type: 'digraph', spellingGuide: 'ngờ đơn' },
  { id: 'ngh', char: 'ngh', upper: 'NGH', soundName: 'ngờ', exampleWord: 'củ nghệ', exampleImage: '🫚', type: 'digraph', spellingGuide: 'ngờ kép' },
  { id: 'ph', char: 'ph', upper: 'PH', soundName: 'phờ', exampleWord: 'bát phở', exampleImage: '🍜', type: 'digraph', spellingGuide: 'pờ - hờ - phờ' },
  { id: 'qu', char: 'qu', upper: 'QU', soundName: 'quờ', exampleWord: 'hộp quà', exampleImage: '🎁', type: 'digraph', spellingGuide: 'quy - u - quờ' },
  { id: 'th', char: 'th', upper: 'TH', soundName: 'thờ', exampleWord: 'chú thỏ', exampleImage: '🐰', type: 'digraph', spellingGuide: 'tờ - hờ - thờ' },
  { id: 'tr', char: 'tr', upper: 'TR', soundName: 'trờ', exampleWord: 'cây tre', exampleImage: '🎋', type: 'digraph', spellingGuide: 'tờ - rờ - trờ' },
];

// 5 Dấu Thanh & Sơ đồ mặt chú hề
export const TONES_DATA: ToneItem[] = [
  {
    name: 'Không dấu (Thanh ngang)',
    symbol: '—',
    description: 'Giọng đọc ngang, êm ái, miệng mở tự nhiên.',
    clownFeature: 'Miệng cười tươi',
    exampleBase: 'ba',
    exampleTone: 'ba',
    colorClass: 'text-purple-600 border-purple-300 bg-purple-50',
    badgeBg: 'bg-purple-100 text-purple-800',
  },
  {
    name: 'Dấu Sắc',
    symbol: '´',
    description: 'Nét xiên dốc từ trái lên phải, giọng lên cao.',
    clownFeature: 'Lông mày bên phải vểnh lên',
    exampleBase: 'ba',
    exampleTone: 'bá',
    colorClass: 'text-amber-600 border-amber-300 bg-amber-50',
    badgeBg: 'bg-amber-100 text-amber-800',
  },
  {
    name: 'Dấu Huyền',
    symbol: '`',
    description: 'Nét xiên dốc từ trái xuống phải, giọng hạ trầm.',
    clownFeature: 'Lông mày bên trái dốc xuống',
    exampleBase: 'ba',
    exampleTone: 'bà',
    colorClass: 'text-sky-600 border-sky-300 bg-sky-50',
    badgeBg: 'bg-sky-100 text-sky-800',
  },
  {
    name: 'Dấu Hỏi',
    symbol: '?',
    description: 'Nét móc câu, giọng chúc xuống rồi vút nhẹ lên.',
    clownFeature: 'Vành tai giống hình móc câu',
    exampleBase: 'ba',
    exampleTone: 'bả',
    colorClass: 'text-emerald-600 border-emerald-300 bg-emerald-50',
    badgeBg: 'bg-emerald-100 text-emerald-800',
  },
  {
    name: 'Dấu Ngã',
    symbol: '~',
    description: 'Nét lượn sóng như ngọn cỏ bay, giọng rung lên rồi ngân.',
    clownFeature: 'Mắt nhắm lượn sóng tít mắt',
    exampleBase: 'ba',
    exampleTone: 'bã',
    colorClass: 'text-yellow-600 border-yellow-300 bg-yellow-50',
    badgeBg: 'bg-yellow-100 text-yellow-800',
  },
  {
    name: 'Dấu Nặng',
    symbol: '.',
    description: 'Dấu chấm tròn nhỏ, giọng ngắt thật nhanh và gọn.',
    clownFeature: 'Nốt ruồi duyên tròn xoe dưới cằm',
    exampleBase: 'ba',
    exampleTone: 'bạ',
    colorClass: 'text-blue-600 border-blue-300 bg-blue-50',
    badgeBg: 'bg-blue-100 text-blue-800',
  },
];

// 10 Nguyên Âm có Dấu Thanh (Trang 4 của sách)
export const VOWELS_WITH_TONES: { vowel: string; tones: string[] }[] = [
  { vowel: 'i', tones: ['i', 'í', 'ì', 'ỉ', 'ĩ', 'ị'] },
  { vowel: 'u', tones: ['u', 'ú', 'ù', 'ủ', 'ũ', 'ụ'] },
  { vowel: 'ư', tones: ['ư', 'ứ', 'ừ', 'ử', 'ữ', 'ự'] },
  { vowel: 'y', tones: ['y', 'ý', 'ỳ', 'ỷ', 'ỹ', 'ỵ'] },
  { vowel: 'o', tones: ['o', 'ó', 'ò', 'ỏ', 'õ', 'ọ'] },
  { vowel: 'ô', tones: ['ô', 'ố', 'ồ', 'ổ', 'ỗ', 'ộ'] },
  { vowel: 'ơ', tones: ['ơ', 'ớ', 'ờ', 'ở', 'ỡ', 'ợ'] },
  { vowel: 'a', tones: ['a', 'á', 'à', 'ả', 'ã', 'ạ'] },
  { vowel: 'e', tones: ['e', 'é', 'è', 'ẻ', 'ẽ', 'ẹ'] },
  { vowel: 'ê', tones: ['ê', 'ế', 'ề', 'ể', 'ễ', 'ệ'] },
];

// Bài Học Ghép Âm Tiết & Luyện Đọc Theo Từng Phụ Âm (Trang 5-30 & Trang 103-116 của sách NXB Hà Nội)
export const CONSONANT_LESSONS: ConsonantPhonicsLesson[] = [
  {
    consonant: 'b',
    soundName: 'bờ',
    keyword: 'con bò',
    keywordImage: '🐂',
    rows: [
      { vowel: 'a', toneNone: 'ba', toneSac: 'bá', toneHuyen: 'bà', toneHoi: 'bả', toneNga: 'bã', toneNang: 'bạ' },
      { vowel: 'o', toneNone: 'bo', toneSac: 'bó', toneHuyen: 'bò', toneHoi: 'bỏ', toneNga: 'bõ', toneNang: 'bọ' },
      { vowel: 'ô', toneNone: 'bô', toneSac: 'bố', toneHuyen: 'bồ', toneHoi: 'bổ', toneNga: 'bỗ', toneNang: 'bộ' },
      { vowel: 'ơ', toneNone: 'bơ', toneSac: 'bớ', toneHuyen: 'bờ', toneHoi: 'bở', toneNga: 'bỡ', toneNang: 'bợ' },
      { vowel: 'e', toneNone: 'be', toneSac: 'bé', toneHuyen: 'bè', toneHoi: 'bẻ', toneNga: 'bẽ', toneNang: 'bẹ' },
      { vowel: 'ê', toneNone: 'bê', toneSac: 'bế', toneHuyen: 'bề', toneHoi: 'bể', toneNga: 'bễ', toneNang: 'bệ' },
      { vowel: 'i', toneNone: 'bi', toneSac: 'bí', toneHuyen: 'bì', toneHoi: 'bỉ', toneNga: 'bĩ', toneNang: 'bị' },
      { vowel: 'u', toneNone: 'bu', toneSac: 'bú', toneHuyen: 'bù', toneHoi: 'bủ', toneNga: 'bũ', toneNang: 'bụ' },
      { vowel: 'ư', toneNone: 'bư', toneSac: 'bứ', toneHuyen: 'bừ', toneHoi: 'bử', toneNga: 'bữ', toneNang: 'bự' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "bé bi",
                "image": "👶",
                "spellingSteps": [
                        "bờ - e - be - sắc - bé",
                        "bờ - i - bi",
                        "bé bi"
                ]
        },
        {
                "word": "bò bê",
                "image": "🐄",
                "spellingSteps": [
                        "bờ - o - bo - huyền - bò",
                        "bờ - ê - bê",
                        "bò bê"
                ]
        }
],
      practiceWords: ["bà ba","be bé","bề bề"],
      sceneCaption: 'Bà bế bé',
      sentences: [
        "Bà bế bé Bi.",
        "Bố bế bé Bo."
],
    },

  },
  {
    consonant: 'c',
    soundName: 'cờ',
    keyword: 'con cá',
    keywordImage: '🐟',
    spellingRuleNotice: 'Phụ âm "c" không ghép được với e, ê, i, y (khi gặp e, ê, i, y phải dùng "k").',
    rows: [
      { vowel: 'a', toneNone: 'ca', toneSac: 'cá', toneHuyen: 'cà', toneHoi: 'cả', toneNga: 'cã', toneNang: 'cạ' },
      { vowel: 'o', toneNone: 'co', toneSac: 'có', toneHuyen: 'cò', toneHoi: 'cỏ', toneNga: 'cõ', toneNang: 'cọ' },
      { vowel: 'ô', toneNone: 'cô', toneSac: 'cố', toneHuyen: 'cồ', toneHoi: 'cổ', toneNga: 'cỗ', toneNang: 'cộ' },
      { vowel: 'ơ', toneNone: 'cơ', toneSac: 'cớ', toneHuyen: 'cờ', toneHoi: 'cở', toneNga: 'cỡ', toneNang: 'cợ' },
      { vowel: 'u', toneNone: 'cu', toneSac: 'cú', toneHuyen: 'cù', toneHoi: 'củ', toneNga: 'cũ', toneNang: 'cụ' },
      { vowel: 'ư', toneNone: 'cư', toneSac: 'cứ', toneHuyen: 'cừ', toneHoi: 'cử', toneNga: 'cữ', toneNang: 'cự' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "cá cờ",
                "image": "🐟",
                "spellingSteps": [
                        "cờ - a - ca - sắc - cá",
                        "cờ - ơ - cơ - huyền - cờ",
                        "cá cờ"
                ]
        },
        {
                "word": "cổ cò",
                "image": "🦩",
                "spellingSteps": [
                        "cờ - ô - cô - hỏi - cổ",
                        "cờ - o - co - huyền - cò",
                        "cổ cò"
                ]
        }
],
      practiceWords: ["cụ cố","bể cá","bó cỏ"],
      sceneCaption: 'Bò bê có bó cỏ',
      sentences: [
        "Cô có cờ, bé có bi.",
        "Bố bế cả Bi và Bo."
],
    },

  },
  {
    consonant: 'd',
    soundName: 'dờ',
    keyword: 'con dê',
    keywordImage: '🐐',
    rows: [
      { vowel: 'a', toneNone: 'da', toneSac: 'dá', toneHuyen: 'dà', toneHoi: 'dả', toneNga: 'dã', toneNang: 'dạ' },
      { vowel: 'o', toneNone: 'do', toneSac: 'dó', toneHuyen: 'dò', toneHoi: 'dỏ', toneNga: 'dõ', toneNang: 'dọ' },
      { vowel: 'ô', toneNone: 'dô', toneSac: 'dố', toneHuyen: 'dồ', toneHoi: 'dổ', toneNga: 'dỗ', toneNang: 'dộ' },
      { vowel: 'ơ', toneNone: 'dơ', toneSac: 'dớ', toneHuyen: 'dờ', toneHoi: 'dở', toneNga: 'dỡ', toneNang: 'dợ' },
      { vowel: 'e', toneNone: 'de', toneSac: 'dé', toneHuyen: 'dè', toneHoi: 'dẻ', toneNga: 'dẽ', toneNang: 'dẹ' },
      { vowel: 'ê', toneNone: 'dê', toneSac: 'dế', toneHuyen: 'dề', toneHoi: 'dể', toneNga: 'dễ', toneNang: 'dệ' },
      { vowel: 'i', toneNone: 'di', toneSac: 'dí', toneHuyen: 'dì', toneHoi: 'dỉ', toneNga: 'dĩ', toneNang: 'dị' },
      { vowel: 'u', toneNone: 'du', toneSac: 'dú', toneHuyen: 'dù', toneHoi: 'dủ', toneNga: 'dũ', toneNang: 'dụ' },
      { vowel: 'ư', toneNone: 'dư', toneSac: 'dứ', toneHuyen: 'dừ', toneHoi: 'dử', toneNga: 'dữ', toneNang: 'dự' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "da dê",
                "image": "🐐",
                "spellingSteps": [
                        "dờ - a - da",
                        "dờ - ê - dê",
                        "da dê"
                ]
        },
        {
                "word": "ô dù",
                "image": "☂️",
                "spellingSteps": [
                        "ô",
                        "dờ - u - du - huyền - dù",
                        "ô dù"
                ]
        }
],
      practiceWords: ["da bò","dê dễ","e dè"],
      sceneCaption: 'Dì Ba bế bé',
      sentences: [
        "Bà dỗ bé.",
        "Bò, dê có ba bó cỏ."
],
    },

  },
  {
    consonant: 'đ',
    soundName: 'đờ',
    keyword: 'đu đủ',
    keywordImage: '🍈',
    rows: [
      { vowel: 'a', toneNone: 'đa', toneSac: 'đá', toneHuyen: 'đà', toneHoi: 'đả', toneNga: 'đã', toneNang: 'đạ' },
      { vowel: 'o', toneNone: 'đo', toneSac: 'đó', toneHuyen: 'đò', toneHoi: 'đỏ', toneNga: 'đõ', toneNang: 'đọ' },
      { vowel: 'ô', toneNone: 'đô', toneSac: 'đố', toneHuyen: 'đồ', toneHoi: 'đổ', toneNga: 'đỗ', toneNang: 'độ' },
      { vowel: 'ơ', toneNone: 'đơ', toneSac: 'đớ', toneHuyen: 'đờ', toneHoi: 'đở', toneNga: 'đỡ', toneNang: 'đợ' },
      { vowel: 'e', toneNone: 'đe', toneSac: 'đé', toneHuyen: 'đè', toneHoi: 'đẻ', toneNga: 'đẽ', toneNang: 'đẹ' },
      { vowel: 'ê', toneNone: 'đê', toneSac: 'đế', toneHuyen: 'đề', toneHoi: 'để', toneNga: 'đễ', toneNang: 'đệ' },
      { vowel: 'i', toneNone: 'đi', toneSac: 'đí', toneHuyen: 'đì', toneHoi: 'đỉ', toneNga: 'đĩ', toneNang: 'đị' },
      { vowel: 'u', toneNone: 'đu', toneSac: 'đú', toneHuyen: 'đù', toneHoi: 'đủ', toneNga: 'đũ', toneNang: 'đụ' },
      { vowel: 'ư', toneNone: 'đư', toneSac: 'đứ', toneHuyen: 'đừ', toneHoi: 'đử', toneNga: 'đữ', toneNang: 'đự' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "đu đủ",
                "image": "🍈",
                "spellingSteps": [
                        "đờ - u - đu",
                        "đờ - u - đu - hỏi - đủ",
                        "đu đủ"
                ]
        },
        {
                "word": "bí đỏ",
                "image": "🎃",
                "spellingSteps": [
                        "bờ - i - bi - sắc - bí",
                        "đờ - o - đo - hỏi - đỏ",
                        "bí đỏ"
                ]
        }
],
      practiceWords: ["đo đỏ","đi đò","bờ đê","đi bộ"],
      sceneCaption: 'Bé đi bộ',
      sentences: [
        "Dì ba đi đò.",
        "Ở bờ đê có dế."
],
    },

  },
  {
    consonant: 'g',
    soundName: 'gờ',
    keyword: 'con gà',
    keywordImage: '🐓',
    spellingRuleNotice: 'Phụ âm "g" không ghép được với e, ê, i (khi gặp e, ê, i phải dùng "gh").',
    rows: [
      { vowel: 'a', toneNone: 'ga', toneSac: 'gá', toneHuyen: 'gà', toneHoi: 'gả', toneNga: 'gã', toneNang: 'gạ' },
      { vowel: 'o', toneNone: 'go', toneSac: 'gó', toneHuyen: 'gò', toneHoi: 'gỏ', toneNga: 'gõ', toneNang: 'gọ' },
      { vowel: 'ô', toneNone: 'gô', toneSac: 'gố', toneHuyen: 'gồ', toneHoi: 'gổ', toneNga: 'gỗ', toneNang: 'gộ' },
      { vowel: 'ơ', toneNone: 'gơ', toneSac: 'gớ', toneHuyen: 'gờ', toneHoi: 'gở', toneNga: 'gỡ', toneNang: 'gợ' },
      { vowel: 'u', toneNone: 'gu', toneSac: 'gú', toneHuyen: 'gù', toneHoi: 'gủ', toneNga: 'gũ', toneNang: 'gụ' },
      { vowel: 'ư', toneNone: 'gư', toneSac: 'gứ', toneHuyen: 'gừ', toneHoi: 'gử', toneNga: 'gữ', toneNang: 'gự' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "gà gô",
                "image": "🦃",
                "spellingSteps": [
                        "gờ - a - ga - huyền - gà",
                        "gờ - ô - gô",
                        "gà gô"
                ]
        },
        {
                "word": "ổ gà",
                "image": "🚗",
                "spellingSteps": [
                        "ô - hỏi - ổ",
                        "gờ - a - ga - huyền - gà",
                        "ổ gà"
                ]
        }
],
      practiceWords: ["gỗ gụ","gà đẻ"],
      sceneCaption: 'Gà gô đi bộ ở bờ đê',
      sentences: [
        "Dì Ba có ổ gà đẻ."
],
    },

  },
  {
    consonant: 'gh',
    soundName: 'gờ kép',
    keyword: 'ghế gỗ',
    keywordImage: '🪑',
    spellingRuleNotice: 'Phụ âm ghép "gh" chỉ ghép được với 3 nguyên âm: e, ê, i.',
    rows: [
      { vowel: 'e', toneNone: 'ghe', toneSac: 'ghé', toneHuyen: 'ghè', toneHoi: 'ghẻ', toneNga: 'ghẽ', toneNang: 'ghẹ' },
      { vowel: 'ê', toneNone: 'ghê', toneSac: 'ghế', toneHuyen: 'ghề', toneHoi: 'ghể', toneNga: 'ghễ', toneNang: 'ghệ' },
      { vowel: 'i', toneNone: 'ghi', toneSac: 'ghí', toneHuyen: 'ghì', toneHoi: 'ghỉ', toneNga: 'ghĩ', toneNang: 'ghị' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "ghế gỗ",
                "image": "🪑",
                "spellingSteps": [
                        "gờ - ê - ghê - sắc - ghế",
                        "gờ - ô - gô - ngã - gỗ",
                        "ghế gỗ"
                ]
        },
        {
                "word": "ghi ta",
                "image": "🎸",
                "spellingSteps": [
                        "gờ - i - ghi",
                        "tờ - a - ta",
                        "ghi ta"
                ]
        }
],
      practiceWords: ["gồ ghề","ghế đá"],
      sceneCaption: 'Ở bờ hồ có ghế đá',
      sentences: [
        "Bà có ghế gỗ đã cũ kĩ.",
        "Bé kê ghế cho bà."
],
    },

  },
  {
    consonant: 'gi',
    soundName: 'gi',
    keyword: 'giỏ cá',
    keywordImage: '🧺',
    rows: [
      { vowel: 'a', toneNone: 'gia', toneSac: 'giá', toneHuyen: 'già', toneHoi: 'giả', toneNga: 'giã', toneNang: 'giạ' },
      { vowel: 'o', toneNone: 'gio', toneSac: 'gió', toneHuyen: 'giò', toneHoi: 'giỏ', toneNga: 'giõ', toneNang: 'giọ' },
      { vowel: 'ô', toneNone: 'giô', toneSac: 'giố', toneHuyen: 'giồ', toneHoi: 'giổ', toneNga: 'giỗ', toneNang: 'giộ' },
      { vowel: 'ơ', toneNone: 'giơ', toneSac: 'giớ', toneHuyen: 'giờ', toneHoi: 'giở', toneNga: 'giỡ', toneNang: 'giợ' },
      { vowel: 'e', toneNone: 'gie', toneSac: 'gié', toneHuyen: 'giè', toneHoi: 'giẻ', toneNga: 'giẽ', toneNang: 'giẹ' },
      { vowel: 'ê', toneNone: 'giê', toneSac: 'giế', toneHuyen: 'giề', toneHoi: 'giể', toneNga: 'giễ', toneNang: 'giệ' },
      { vowel: 'u', toneNone: 'giu', toneSac: 'giú', toneHuyen: 'giù', toneHoi: 'giủ', toneNga: 'giũ', toneNang: 'giụ' },
      { vowel: 'ư', toneNone: 'giư', toneSac: 'giứ', toneHuyen: 'giừ', toneHoi: 'giử', toneNga: 'giữ', toneNang: 'giự' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "giỏ cá",
                "image": "🧺",
                "spellingSteps": [
                        "gi - o - gio - hỏi - giỏ",
                        "cờ - a - ca - sắc - cá",
                        "giỏ cá"
                ]
        },
        {
                "word": "cụ già",
                "image": "👴",
                "spellingSteps": [
                        "cờ - u - cu - nặng - cụ",
                        "gi - a - gia - huyền - già",
                        "cụ già"
                ]
        }
],
      practiceWords: ["giã giò","giả da","giá đỗ"],
      sceneCaption: 'Bà đi chợ về có giỏ cá rô',
      sentences: [
        "Mẹ có rổ giá đỗ.",
        "Bố và mẹ đi giỗ cụ."
],
    },

  },
  {
    consonant: 'h',
    soundName: 'hờ',
    keyword: 'con hổ',
    keywordImage: '🐯',
    rows: [
      { vowel: 'a', toneNone: 'ha', toneSac: 'há', toneHuyen: 'hà', toneHoi: 'hả', toneNga: 'hã', toneNang: 'hạ' },
      { vowel: 'o', toneNone: 'ho', toneSac: 'hó', toneHuyen: 'hò', toneHoi: 'hỏ', toneNga: 'hõ', toneNang: 'họ' },
      { vowel: 'ô', toneNone: 'hô', toneSac: 'hố', toneHuyen: 'hồ', toneHoi: 'hổ', toneNga: 'hỗ', toneNang: 'hộ' },
      { vowel: 'ơ', toneNone: 'hơ', toneSac: 'hớ', toneHuyen: 'hờ', toneHoi: 'hở', toneNga: 'hỡ', toneNang: 'hợ' },
      { vowel: 'e', toneNone: 'he', toneSac: 'hé', toneHuyen: 'hè', toneHoi: 'hẻ', toneNga: 'hẽ', toneNang: 'hẹ' },
      { vowel: 'ê', toneNone: 'hê', toneSac: 'hế', toneHuyen: 'hề', toneHoi: 'hể', toneNga: 'hễ', toneNang: 'hệ' },
      { vowel: 'i', toneNone: 'hi', toneSac: 'hí', toneHuyen: 'hì', toneHoi: 'hỉ', toneNga: 'hĩ', toneNang: 'hị' },
      { vowel: 'u', toneNone: 'hu', toneSac: 'hú', toneHuyen: 'hù', toneHoi: 'hủ', toneNga: 'hũ', toneNang: 'hụ' },
      { vowel: 'ư', toneNone: 'hư', toneSac: 'hứ', toneHuyen: 'hừ', toneHoi: 'hử', toneNga: 'hữ', toneNang: 'hự' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "hồ cá",
                "image": "🐠",
                "spellingSteps": [
                        "hờ - ô - hô - huyền - hồ",
                        "cờ - a - ca - sắc - cá",
                        "hồ cá"
                ]
        },
        {
                "word": "hổ dữ",
                "image": "🐯",
                "spellingSteps": [
                        "hờ - ô - hô - hỏi - hổ",
                        "dờ - ư - dư - ngã - dữ",
                        "hổ dữ"
                ]
        }
],
      practiceWords: ["ha ha","hi hi","he hé","hả hê"],
      sceneCaption: 'Bé bị ho',
      sentences: [
        "Ở bờ đê có hồ cá."
],
    },

  },
  {
    consonant: 'k',
    soundName: 'ca',
    keyword: 'thước kẻ',
    keywordImage: '📐',
    spellingRuleNotice: 'Phụ âm "k" chỉ ghép được với các nguyên âm: e, ê, i, y.',
    rows: [
      { vowel: 'e', toneNone: 'ke', toneSac: 'ké', toneHuyen: 'kè', toneHoi: 'kẻ', toneNga: 'kẽ', toneNang: 'kẹ' },
      { vowel: 'ê', toneNone: 'kê', toneSac: 'kế', toneHuyen: 'kề', toneHoi: 'kể', toneNga: 'kễ', toneNang: 'kệ' },
      { vowel: 'i', toneNone: 'ki', toneSac: 'kí', toneHuyen: 'kì', toneHoi: 'kỉ', toneNga: 'kĩ', toneNang: 'kị' },
      { vowel: 'y', toneNone: 'ky', toneSac: 'ký', toneHuyen: 'kỳ', toneHoi: 'kỷ', toneNga: 'kỹ', toneNang: 'kỵ' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "ê ke",
                "image": "📐",
                "spellingSteps": [
                        "ê",
                        "ca - e - ke",
                        "ê ke"
                ]
        },
        {
                "word": "kệ gỗ",
                "image": "🗄️",
                "spellingSteps": [
                        "ca - ê - kê - nặng - kệ",
                        "gờ - ô - gô - ngã - gỗ",
                        "kệ gỗ"
                ]
        }
],
      practiceWords: ["cũ kĩ","cù kì","kì đà"],
      sceneCaption: 'Ở hồ có cá đỏ kì lạ',
      sentences: [
        "Bố có kệ gỗ đã cũ kĩ."
],
    },

  },
  {
    consonant: 'kh',
    soundName: 'khờ',
    keyword: 'chú khỉ',
    keywordImage: '🐒',
    rows: [
      { vowel: 'a', toneNone: 'kha', toneSac: 'khá', toneHuyen: 'khà', toneHoi: 'khả', toneNga: 'khã', toneNang: 'khạ' },
      { vowel: 'o', toneNone: 'kho', toneSac: 'khó', toneHuyen: 'khò', toneHoi: 'khỏ', toneNga: 'khõ', toneNang: 'khọ' },
      { vowel: 'ô', toneNone: 'khô', toneSac: 'khố', toneHuyen: 'khồ', toneHoi: 'khổ', toneNga: 'khỗ', toneNang: 'khộ' },
      { vowel: 'ơ', toneNone: 'khơ', toneSac: 'khớ', toneHuyen: 'khờ', toneHoi: 'khở', toneNga: 'khỡ', toneNang: 'khợ' },
      { vowel: 'e', toneNone: 'khe', toneSac: 'khé', toneHuyen: 'khè', toneHoi: 'khẻ', toneNga: 'khẽ', toneNang: 'khẹ' },
      { vowel: 'ê', toneNone: 'khê', toneSac: 'khế', toneHuyen: 'khề', toneHoi: 'khể', toneNga: 'khễ', toneNang: 'khệ' },
      { vowel: 'i', toneNone: 'khi', toneSac: 'khí', toneHuyen: 'khì', toneHoi: 'khỉ', toneNga: 'khĩ', toneNang: 'khị' },
      { vowel: 'u', toneNone: 'khu', toneSac: 'khú', toneHuyen: 'khù', toneHoi: 'khủ', toneNga: 'khũ', toneNang: 'khụ' },
      { vowel: 'ư', toneNone: 'khư', toneSac: 'khứ', toneHuyen: 'khừ', toneHoi: 'khử', toneNga: 'khữ', toneNang: 'khự' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "lá khô",
                "image": "🍂",
                "spellingSteps": [
                        "lờ - a - la - sắc - lá",
                        "khờ - ô - khô",
                        "lá khô"
                ]
        },
        {
                "word": "chú khỉ",
                "image": "🐒",
                "spellingSteps": [
                        "chờ - u - chu - sắc - chú",
                        "khờ - i - khi - hỏi - khỉ",
                        "chú khỉ"
                ]
        }
],
      practiceWords: ["khe khẽ","khổ sở","cá kho"],
      sceneCaption: 'Bé vẽ chú khỉ',
      sentences: [
        "Bé khệ nệ bê bó cỏ về cho bò.",
        "Chị Nga kể cho bé nghe về kì nghỉ hè ở Sa Pa."
],
    },

  },
  {
    consonant: 'l',
    soundName: 'lờ',
    keyword: 'quả lê',
    keywordImage: '🍐',
    rows: [
      { vowel: 'a', toneNone: 'la', toneSac: 'lá', toneHuyen: 'là', toneHoi: 'lả', toneNga: 'lã', toneNang: 'lạ' },
      { vowel: 'o', toneNone: 'lo', toneSac: 'ló', toneHuyen: 'lò', toneHoi: 'lỏ', toneNga: 'lõ', toneNang: 'lọ' },
      { vowel: 'ô', toneNone: 'lô', toneSac: 'lố', toneHuyen: 'lồ', toneHoi: 'lổ', toneNga: 'lỗ', toneNang: 'lộ' },
      { vowel: 'ơ', toneNone: 'lơ', toneSac: 'lớ', toneHuyen: 'lờ', toneHoi: 'lở', toneNga: 'lỡ', toneNang: 'lợ' },
      { vowel: 'e', toneNone: 'le', toneSac: 'lé', toneHuyen: 'lè', toneHoi: 'lẻ', toneNga: 'lẽ', toneNang: 'lẹ' },
      { vowel: 'ê', toneNone: 'lê', toneSac: 'lế', toneHuyen: 'lề', toneHoi: 'lể', toneNga: 'lễ', toneNang: 'lệ' },
      { vowel: 'i', toneNone: 'li', toneSac: 'lí', toneHuyen: 'lì', toneHoi: 'lỉ', toneNga: 'lĩ', toneNang: 'lị' },
      { vowel: 'u', toneNone: 'lu', toneSac: 'lú', toneHuyen: 'lù', toneHoi: 'lủ', toneNga: 'lũ', toneNang: 'lụ' },
      { vowel: 'ư', toneNone: 'lư', toneSac: 'lứ', toneHuyen: 'lừ', toneHoi: 'lử', toneNga: 'lữ', toneNang: 'lự' },
      { vowel: 'y', toneNone: 'ly', toneSac: 'lý', toneHuyen: 'lỳ', toneHoi: 'lỷ', toneNga: 'lỹ', toneNang: 'lỵ' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "lá cờ",
                "image": "🇻🇳",
                "spellingSteps": [
                        "lờ - a - la - sắc - lá",
                        "cờ - ơ - cơ - huyền - cờ",
                        "lá cờ"
                ]
        },
        {
                "word": "lọ cà",
                "image": "🫙",
                "spellingSteps": [
                        "lờ - o - lo - nặng - lọ",
                        "cờ - a - ca - huyền - cà",
                        "lọ cà"
                ]
        }
],
      practiceWords: ["lá đa","lơ là","lá hẹ","lề hè"],
      sceneCaption: 'Bé có lá cờ',
      sentences: [
        "Bé la cà ở bờ đê.",
        "Bà có lọ cà."
],
    },

  },
  {
    consonant: 'm',
    soundName: 'mờ',
    keyword: 'mẹ',
    keywordImage: '👩‍👧',
    rows: [
      { vowel: 'a', toneNone: 'ma', toneSac: 'má', toneHuyen: 'mà', toneHoi: 'mả', toneNga: 'mã', toneNang: 'mạ' },
      { vowel: 'o', toneNone: 'mo', toneSac: 'mó', toneHuyen: 'mò', toneHoi: 'mỏ', toneNga: 'mõ', toneNang: 'mọ' },
      { vowel: 'ô', toneNone: 'mô', toneSac: 'mố', toneHuyen: 'mồ', toneHoi: 'mổ', toneNga: 'mỗ', toneNang: 'mộ' },
      { vowel: 'ơ', toneNone: 'mơ', toneSac: 'mớ', toneHuyen: 'mờ', toneHoi: 'mở', toneNga: 'mỡ', toneNang: 'mợ' },
      { vowel: 'e', toneNone: 'me', toneSac: 'mé', toneHuyen: 'mè', toneHoi: 'mẻ', toneNga: 'mẽ', toneNang: 'mẹ' },
      { vowel: 'ê', toneNone: 'mê', toneSac: 'mế', toneHuyen: 'mề', toneHoi: 'mể', toneNga: 'mễ', toneNang: 'mệ' },
      { vowel: 'i', toneNone: 'mi', toneSac: 'mí', toneHuyen: 'mì', toneHoi: 'mỉ', toneNga: 'mĩ', toneNang: 'mị' },
      { vowel: 'u', toneNone: 'mu', toneSac: 'mú', toneHuyen: 'mù', toneHoi: 'mủ', toneNga: 'mũ', toneNang: 'mụ' },
      { vowel: 'y', toneNone: 'my', toneSac: 'mý', toneHuyen: 'mỳ', toneHoi: 'mỷ', toneNga: 'mỹ', toneNang: 'mỵ' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "bố mẹ",
                "image": "👨‍👩‍👧",
                "spellingSteps": [
                        "bờ - ô - bô - sắc - bố",
                        "mờ - e - me - nặng - mẹ",
                        "bố mẹ"
                ]
        },
        {
                "word": "lá me",
                "image": "🌿",
                "spellingSteps": [
                        "lờ - a - la - sắc - lá",
                        "mờ - e - me",
                        "lá me"
                ]
        }
],
      practiceWords: ["ba má","bó mạ","cá mè"],
      sceneCaption: 'Mẹ bế bé',
      sentences: [
        "Mẹ có cá mè, bé có cá cờ."
],
    },

  },
  {
    consonant: 'n',
    soundName: 'nờ',
    keyword: 'quả na',
    keywordImage: '🍈',
    rows: [
      { vowel: 'a', toneNone: 'na', toneSac: 'ná', toneHuyen: 'nà', toneHoi: 'nả', toneNga: 'nã', toneNang: 'nạ' },
      { vowel: 'o', toneNone: 'no', toneSac: 'nó', toneHuyen: 'nò', toneHoi: 'nỏ', toneNga: 'nõ', toneNang: 'nọ' },
      { vowel: 'ô', toneNone: 'nô', toneSac: 'nố', toneHuyen: 'nồ', toneHoi: 'nổ', toneNga: 'nỗ', toneNang: 'nộ' },
      { vowel: 'ơ', toneNone: 'nơ', toneSac: 'nớ', toneHuyen: 'nờ', toneHoi: 'nở', toneNga: 'nỡ', toneNang: 'nợ' },
      { vowel: 'e', toneNone: 'ne', toneSac: 'né', toneHuyen: 'nè', toneHoi: 'nẻ', toneNga: 'nẽ', toneNang: 'nẹ' },
      { vowel: 'ê', toneNone: 'nê', toneSac: 'nế', toneHuyen: 'nề', toneHoi: 'nể', toneNga: 'nễ', toneNang: 'nệ' },
      { vowel: 'i', toneNone: 'ni', toneSac: 'ní', toneHuyen: 'nì', toneHoi: 'nỉ', toneNga: 'nĩ', toneNang: 'nị' },
      { vowel: 'u', toneNone: 'nu', toneSac: 'nú', toneHuyen: 'nù', toneHoi: 'nủ', toneNga: 'nũ', toneNang: 'nụ' },
      { vowel: 'ư', toneNone: 'nư', toneSac: 'nứ', toneHuyen: 'nừ', toneHoi: 'nử', toneNga: 'nữ', toneNang: 'nự' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "nơ đỏ",
                "image": "🎀",
                "spellingSteps": [
                        "nờ - ơ - nơ",
                        "đờ - o - đo - hỏi - đỏ",
                        "nơ đỏ"
                ]
        },
        {
                "word": "ca nô",
                "image": "🚤",
                "spellingSteps": [
                        "cờ - a - ca",
                        "nờ - ô - nô",
                        "ca nô"
                ]
        }
],
      practiceWords: ["no nê","na ná","mũ nỉ"],
      sceneCaption: 'Bé có nơ đỏ',
      sentences: [
        "Bố đi ca nô, mẹ bế bé đi bộ.",
        "Mẹ có mũ nỉ."
],
    },

  },
  {
    consonant: 'ng',
    soundName: 'ngờ đơn',
    keyword: 'bắp ngô',
    keywordImage: '🌽',
    spellingRuleNotice: 'Phụ âm "ng" không ghép được với e, ê, i (khi gặp e, ê, i phải dùng "ngh").',
    rows: [
      { vowel: 'a', toneNone: 'nga', toneSac: 'ngá', toneHuyen: 'ngà', toneHoi: 'ngả', toneNga: 'ngã', toneNang: 'ngạ' },
      { vowel: 'o', toneNone: 'ngo', toneSac: 'ngó', toneHuyen: 'ngò', toneHoi: 'ngỏ', toneNga: 'ngõ', toneNang: 'ngọ' },
      { vowel: 'ô', toneNone: 'ngô', toneSac: 'ngố', toneHuyen: 'ngồ', toneHoi: 'ngổ', toneNga: 'ngỗ', toneNang: 'ngộ' },
      { vowel: 'ơ', toneNone: 'ngơ', toneSac: 'ngớ', toneHuyen: 'ngờ', toneHoi: 'ngở', toneNga: 'ngỡ', toneNang: 'ngợ' },
      { vowel: 'u', toneNone: 'ngu', toneSac: 'ngú', toneHuyen: 'ngù', toneHoi: 'ngủ', toneNga: 'ngũ', toneNang: 'ngụ' },
      { vowel: 'ư', toneNone: 'ngư', toneSac: 'ngứ', toneHuyen: 'ngừ', toneHoi: 'ngử', toneNga: 'ngữ', toneNang: 'ngự' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "cá ngừ",
                "image": "🐟",
                "spellingSteps": [
                        "cờ - a - ca - sắc - cá",
                        "ngờ - ư - ngư - huyền - ngừ",
                        "cá ngừ"
                ]
        },
        {
                "word": "bí ngô",
                "image": "🎃",
                "spellingSteps": [
                        "bờ - i - bi - sắc - bí",
                        "ngờ - ô - ngô",
                        "bí ngô"
                ]
        }
],
      practiceWords: ["ngã ba","lá ngổ","ngu ngơ","bỡ ngỡ"],
      sceneCaption: 'Mẹ ru bé ngủ',
      sentences: [
        "Mẹ chở bé và chị Nga đi ra chợ."
],
    },

  },
  {
    consonant: 'ngh',
    soundName: 'ngờ kép',
    keyword: 'củ nghệ',
    keywordImage: '🫚',
    spellingRuleNotice: 'Phụ âm ghép "ngh" chỉ ghép được với 3 nguyên âm: e, ê, i.',
    rows: [
      { vowel: 'e', toneNone: 'nghe', toneSac: 'nghé', toneHuyen: 'nghè', toneHoi: 'nghẻ', toneNga: 'nghẽ', toneNang: 'nghẹ' },
      { vowel: 'ê', toneNone: 'nghê', toneSac: 'nghế', toneHuyen: 'nghề', toneHoi: 'nghể', toneNga: 'nghễ', toneNang: 'nghệ' },
      { vowel: 'i', toneNone: 'nghi', toneSac: 'nghí', toneHuyen: 'nghì', toneHoi: 'nghỉ', toneNga: 'nghĩ', toneNang: 'nghị' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "củ nghệ",
                "image": "🫚",
                "spellingSteps": [
                        "cờ - u - cu - hỏi - củ",
                        "ngờ - ê - nghê - nặng - nghệ",
                        "củ nghệ"
                ]
        },
        {
                "word": "nghệ sĩ",
                "image": "👩‍🎤",
                "spellingSteps": [
                        "ngờ - ê - nghê - nặng - nghệ",
                        "sờ - i - si - ngã - sĩ",
                        "nghệ sĩ"
                ]
        }
],
      practiceWords: ["nghỉ hè","nghi ngờ","nghé tơ"],
      sceneCaption: 'Ở bờ đê có chú nghé tơ',
      sentences: [
        "Bố mẹ cho bé và chị Nga đi nghỉ hè ở Sa Pa.",
        "Bà đi chợ về có giỏ cá, lá ngổ, củ sả, củ nghệ và có cả giò chả."
],
    },

  },
  {
    consonant: 'nh',
    soundName: 'nhờ',
    keyword: 'quả nho',
    keywordImage: '🍇',
    rows: [
      { vowel: 'a', toneNone: 'nha', toneSac: 'nhá', toneHuyen: 'nhà', toneHoi: 'nhả', toneNga: 'nhã', toneNang: 'nhạ' },
      { vowel: 'o', toneNone: 'nho', toneSac: 'nhó', toneHuyen: 'nhò', toneHoi: 'nhỏ', toneNga: 'nhõ', toneNang: 'nhọ' },
      { vowel: 'ô', toneNone: 'nhô', toneSac: 'nhố', toneHuyen: 'nhồ', toneHoi: 'nhổ', toneNga: 'nhỗ', toneNang: 'nhộ' },
      { vowel: 'ơ', toneNone: 'nhơ', toneSac: 'nhớ', toneHuyen: 'nhờ', toneHoi: 'nhở', toneNga: 'nhỡ', toneNang: 'nhợ' },
      { vowel: 'e', toneNone: 'nhe', toneSac: 'nhé', toneHuyen: 'nhè', toneHoi: 'nhẻ', toneNga: 'nhẽ', toneNang: 'nhẹ' },
      { vowel: 'ê', toneNone: 'nhê', toneSac: 'nhế', toneHuyen: 'nhề', toneHoi: 'nhể', toneNga: 'nhễ', toneNang: 'nhệ' },
      { vowel: 'i', toneNone: 'nhi', toneSac: 'nhí', toneHuyen: 'nhì', toneHoi: 'nhỉ', toneNga: 'nhĩ', toneNang: 'nhị' },
      { vowel: 'u', toneNone: 'nhu', toneSac: 'nhú', toneHuyen: 'nhù', toneHoi: 'nhủ', toneNga: 'nhũ', toneNang: 'nhụ' },
      { vowel: 'ư', toneNone: 'như', toneSac: 'nhứ', toneHuyen: 'nhừ', toneHoi: 'nhử', toneNga: 'nhữ', toneNang: 'nhự' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "nha sĩ",
                "image": "🦷",
                "spellingSteps": [
                        "nhờ - a - nha",
                        "sờ - i - si - ngã - sĩ",
                        "nha sĩ"
                ]
        },
        {
                "word": "nho đỏ",
                "image": "🍇",
                "spellingSteps": [
                        "nhờ - o - nho",
                        "đờ - o - đo - hỏi - đỏ",
                        "nho đỏ"
                ]
        }
],
      practiceWords: ["nho nhỏ","nhè nhẹ","nhớ nhà"],
      sceneCaption: 'Bé đi nhè nhẹ',
      sentences: [
        "Nhà bé ở ngõ nhỏ.",
        "Bố đi xa, bố nhớ nhà, bố nhớ mẹ và bé."
],
    },

  },
  {
    consonant: 'p',
    soundName: 'pờ',
    keyword: 'cục pin',
    keywordImage: '🔋',
    rows: [
      { vowel: 'a', toneNone: 'pa', toneSac: 'pá', toneHuyen: 'pà', toneHoi: 'pả', toneNga: 'pã', toneNang: 'pạ' },
      { vowel: 'o', toneNone: 'po', toneSac: 'pó', toneHuyen: 'pò', toneHoi: 'pỏ', toneNga: 'põ', toneNang: 'pọ' },
      { vowel: 'ô', toneNone: 'pô', toneSac: 'pố', toneHuyen: 'pồ', toneHoi: 'pổ', toneNga: 'pỗ', toneNang: 'pộ' },
      { vowel: 'ơ', toneNone: 'pơ', toneSac: 'pớ', toneHuyen: 'pờ', toneHoi: 'pở', toneNga: 'pỡ', toneNang: 'pợ' },
      { vowel: 'e', toneNone: 'pe', toneSac: 'pé', toneHuyen: 'pè', toneHoi: 'pẻ', toneNga: 'pẽ', toneNang: 'pẹ' },
      { vowel: 'ê', toneNone: 'pê', toneSac: 'pế', toneHuyen: 'pề', toneHoi: 'pể', toneNga: 'pễ', toneNang: 'pệ' },
      { vowel: 'i', toneNone: 'pi', toneSac: 'pí', toneHuyen: 'pì', toneHoi: 'pỉ', toneNga: 'pĩ', toneNang: 'pị' },
      { vowel: 'u', toneNone: 'pu', toneSac: 'pú', toneHuyen: 'pù', toneHoi: 'pủ', toneNga: 'pũ', toneNang: 'pụ' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "pin",
                "image": "🔋",
                "spellingSteps": [
                        "pờ - in - pin",
                        "pin"
                ]
        },
        {
                "word": "pa tê",
                "image": "🥪",
                "spellingSteps": [
                        "pờ - a - pa",
                        "tờ - ê - tê",
                        "pa tê"
                ]
        }
],
      practiceWords: ["pi a nô","pa-nô","pô xe","pi-a-ma"],
      sceneCaption: 'Pí pa pí pô, bé đi ô tô',
      sentences: [
        "Pí pa pí pô, bé đi ô tô.",
        "Sa Pa."
],
    },

  },
  {
    consonant: 'ph',
    soundName: 'phờ',
    keyword: 'bát phở',
    keywordImage: '🍜',
    rows: [
      { vowel: 'a', toneNone: 'pha', toneSac: 'phá', toneHuyen: 'phà', toneHoi: 'phả', toneNga: 'phã', toneNang: 'phạ' },
      { vowel: 'o', toneNone: 'pho', toneSac: 'phó', toneHuyen: 'phò', toneHoi: 'phỏ', toneNga: 'phõ', toneNang: 'phọ' },
      { vowel: 'ô', toneNone: 'phô', toneSac: 'phố', toneHuyen: 'phồ', toneHoi: 'phổ', toneNga: 'phỗ', toneNang: 'phộ' },
      { vowel: 'ơ', toneNone: 'phơ', toneSac: 'phớ', toneHuyen: 'phờ', toneHoi: 'phở', toneNga: 'phỡ', toneNang: 'phợ' },
      { vowel: 'e', toneNone: 'phe', toneSac: 'phé', toneHuyen: 'phè', toneHoi: 'phẻ', toneNga: 'phẽ', toneNang: 'phẹ' },
      { vowel: 'ê', toneNone: 'phê', toneSac: 'phế', toneHuyen: 'phề', toneHoi: 'phể', toneNga: 'phễ', toneNang: 'phệ' },
      { vowel: 'i', toneNone: 'phi', toneSac: 'phí', toneHuyen: 'phì', toneHoi: 'phỉ', toneNga: 'phĩ', toneNang: 'phị' },
      { vowel: 'u', toneNone: 'phu', toneSac: 'phú', toneHuyen: 'phù', toneHoi: 'phủ', toneNga: 'phũ', toneNang: 'phụ' },
      { vowel: 'ư', toneNone: 'phư', toneSac: 'phứ', toneHuyen: 'phừ', toneHoi: 'phử', toneNga: 'phữ', toneNang: 'phự' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "phở bò",
                "image": "🍜",
                "spellingSteps": [
                        "phờ - ơ - phơ - hỏi - phở",
                        "bờ - o - bo - huyền - bò",
                        "phở bò"
                ]
        },
        {
                "word": "cà phê",
                "image": "☕",
                "spellingSteps": [
                        "cờ - a - ca - huyền - cà",
                        "phờ - ê - phê",
                        "cà phê"
                ]
        }
],
      practiceWords: ["phố xá","phố cổ","pha lê","phi cơ"],
      sceneCaption: 'Mẹ pha cà phê cho bố',
      sentences: [
        "Mẹ và bé đi chợ ở phố cổ.",
        "Ở phố cổ có nhà to kề nhà nhỏ."
],
    },

  },
  {
    consonant: 'qu',
    soundName: 'quờ',
    keyword: 'quả khế',
    keywordImage: '⭐',
    rows: [
      { vowel: 'a', toneNone: 'qua', toneSac: 'quá', toneHuyen: 'quà', toneHoi: 'quả', toneNga: 'quã', toneNang: 'quạ' },
      { vowel: 'e', toneNone: 'que', toneSac: 'qué', toneHuyen: 'què', toneHoi: 'quẻ', toneNga: 'quẽ', toneNang: 'quẹ' },
      { vowel: 'ê', toneNone: 'quê', toneSac: 'quế', toneHuyen: 'quề', toneHoi: 'quể', toneNga: 'quễ', toneNang: 'quệ' },
      { vowel: 'i', toneNone: 'qui', toneSac: 'quí', toneHuyen: 'quì', toneHoi: 'quỉ', toneNga: 'quĩ', toneNang: 'quị' },
      { vowel: 'y', toneNone: 'quy', toneSac: 'quý', toneHuyen: 'quỳ', toneHoi: 'quỷ', toneNga: 'quỹ', toneNang: 'quỵ' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "quả khế",
                "image": "⭐",
                "spellingSteps": [
                        "quờ - a - qua - hỏi - quả",
                        "khờ - ê - khê - sắc - khế",
                        "quả khế"
                ]
        },
        {
                "word": "tổ quạ",
                "image": "🪺",
                "spellingSteps": [
                        "tờ - ô - tô - hỏi - tổ",
                        "quờ - a - qua - nặng - quạ",
                        "tổ quạ"
                ]
        }
],
      practiceWords: ["quà quê","cá quả","chả quế"],
      sceneCaption: 'Mẹ và bé đi chợ quê',
      sentences: [
        "Mẹ đi chợ về có quà cho bé, có quả na, quả lê, quả đu đủ và có cả chả quế.",
        "Bố mẹ cho bé đi qua đò để về quê.",
        "Ở quê có bà, có dì ba và có cả bé Bo."
],
    },

  },
  {
    consonant: 'r',
    soundName: 'rờ',
    keyword: 'cái rổ',
    keywordImage: '🧺',
    rows: [
      { vowel: 'a', toneNone: 'ra', toneSac: 'rá', toneHuyen: 'rà', toneHoi: 'rả', toneNga: 'rã', toneNang: 'rạ' },
      { vowel: 'o', toneNone: 'ro', toneSac: 'ró', toneHuyen: 'rò', toneHoi: 'rỏ', toneNga: 'rõ', toneNang: 'rọ' },
      { vowel: 'ô', toneNone: 'rô', toneSac: 'rố', toneHuyen: 'rồ', toneHoi: 'rổ', toneNga: 'rỗ', toneNang: 'rộ' },
      { vowel: 'ơ', toneNone: 'rơ', toneSac: 'rớ', toneHuyen: 'rờ', toneHoi: 'rở', toneNga: 'rỡ', toneNang: 'rợ' },
      { vowel: 'e', toneNone: 're', toneSac: 'ré', toneHuyen: 'rè', toneHoi: 'rẻ', toneNga: 'rẽ', toneNang: 'rẹ' },
      { vowel: 'ê', toneNone: 'rê', toneSac: 'rế', toneHuyen: 'rề', toneHoi: 'rể', toneNga: 'rễ', toneNang: 'rệ' },
      { vowel: 'i', toneNone: 'ri', toneSac: 'rí', toneHuyen: 'rì', toneHoi: 'rỉ', toneNga: 'rĩ', toneNang: 'rị' },
      { vowel: 'u', toneNone: 'ru', toneSac: 'rú', toneHuyen: 'rù', toneHoi: 'rủ', toneNga: 'rũ', toneNang: 'rụ' },
      { vowel: 'ư', toneNone: 'rư', toneSac: 'rứ', toneHuyen: 'rừ', toneHoi: 'rử', toneNga: 'rữ', toneNang: 'rự' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "cá rô",
                "image": "🐟",
                "spellingSteps": [
                        "cờ - a - ca - sắc - cá",
                        "rờ - ô - rô",
                        "cá rô"
                ]
        },
        {
                "word": "rổ rá",
                "image": "🧺",
                "spellingSteps": [
                        "rờ - ô - rô - hỏi - rổ",
                        "rờ - a - ra - sắc - rá",
                        "rổ rá"
                ]
        }
],
      practiceWords: ["bó rạ","bộ rễ"],
      sceneCaption: 'Mẹ có cá rô',
      sentences: [
        "Bố bế bé ra bờ đê.",
        "Ở hồ có cá rô, có cả cá cờ."
],
    },

  },
  {
    consonant: 's',
    soundName: 'sờ',
    keyword: 'sư tử',
    keywordImage: '🦁',
    rows: [
      { vowel: 'a', toneNone: 'sa', toneSac: 'sá', toneHuyen: 'sà', toneHoi: 'sả', toneNga: 'sã', toneNang: 'sạ' },
      { vowel: 'o', toneNone: 'so', toneSac: 'só', toneHuyen: 'sò', toneHoi: 'sỏ', toneNga: 'sõ', toneNang: 'sọ' },
      { vowel: 'ô', toneNone: 'sô', toneSac: 'số', toneHuyen: 'sồ', toneHoi: 'sổ', toneNga: 'sỗ', toneNang: 'sộ' },
      { vowel: 'ơ', toneNone: 'sơ', toneSac: 'sớ', toneHuyen: 'sờ', toneHoi: 'ở', toneNga: 'sỡ', toneNang: 'sợ' },
      { vowel: 'e', toneNone: 'se', toneSac: 'sé', toneHuyen: 'sè', toneHoi: 'sẻ', toneNga: 'sẽ', toneNang: 'sẹ' },
      { vowel: 'ê', toneNone: 'sê', toneSac: 'sế', toneHuyen: 'sề', toneHoi: 'sể', toneNga: 'sễ', toneNang: 'sệ' },
      { vowel: 'i', toneNone: 'si', toneSac: 'sí', toneHuyen: 'sì', toneHoi: 'sỉ', toneNga: 'sĩ', toneNang: 'sị' },
      { vowel: 'u', toneNone: 'su', toneSac: 'sú', toneHuyen: 'sù', toneHoi: 'sủ', toneNga: 'sũ', toneNang: 'sụ' },
      { vowel: 'ư', toneNone: 'sư', toneSac: 'sứ', toneHuyen: 'sừ', toneHoi: 'sử', toneNga: 'sữ', toneNang: 'sự' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "su su",
                "image": "🍈",
                "spellingSteps": [
                        "sờ - u - su",
                        "sờ - u - su",
                        "su su"
                ]
        },
        {
                "word": "củ sả",
                "image": "🌾",
                "spellingSteps": [
                        "cờ - u - cu - hỏi - củ",
                        "sờ - a - sa - hỏi - sả",
                        "củ sả"
                ]
        }
],
      practiceWords: ["se sẻ","sĩ số","sổ đỏ","lo sợ"],
      sceneCaption: 'Mẹ có rổ su su',
      sentences: [
        "Bé có sô cô la."
],
    },

  },
  {
    consonant: 't',
    soundName: 'tờ',
    keyword: 'cái tủ',
    keywordImage: '🚪',
    rows: [
      { vowel: 'a', toneNone: 'ta', toneSac: 'tá', toneHuyen: 'tà', toneHoi: 'tả', toneNga: 'tã', toneNang: 'tạ' },
      { vowel: 'o', toneNone: 'to', toneSac: 'tó', toneHuyen: 'tò', toneHoi: 'tỏ', toneNga: 'tõ', toneNang: 'tọ' },
      { vowel: 'ô', toneNone: 'tô', toneSac: 'tố', toneHuyen: 'tồ', toneHoi: 'tổ', toneNga: 'tỗ', toneNang: 'tộ' },
      { vowel: 'ơ', toneNone: 'tơ', toneSac: 'tớ', toneHuyen: 'tờ', toneHoi: 'tở', toneNga: 'tỡ', toneNang: 'tợ' },
      { vowel: 'e', toneNone: 'te', toneSac: 'té', toneHuyen: 'tè', toneHoi: 'tẻ', toneNga: 'tẽ', toneNang: 'tẹ' },
      { vowel: 'ê', toneNone: 'tê', toneSac: 'tế', toneHuyen: 'tề', toneHoi: 'tể', toneNga: 'tễ', toneNang: 'tệ' },
      { vowel: 'i', toneNone: 'ti', toneSac: 'tí', toneHuyen: 'tì', toneHoi: 'tỉ', toneNga: 'tĩ', toneNang: 'tị' },
      { vowel: 'u', toneNone: 'tu', toneSac: 'tú', toneHuyen: 'tù', toneHoi: 'tủ', toneNga: 'tũ', toneNang: 'tụ' },
      { vowel: 'ư', toneNone: 'tư', toneSac: 'tứ', toneHuyen: 'từ', toneHoi: 'tử', toneNga: 'tữ', toneNang: 'tự' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "củ từ",
                "image": "🥔",
                "spellingSteps": [
                        "cờ - u - cu - hỏi - củ",
                        "tờ - ư - tư - huyền - từ",
                        "củ từ"
                ]
        },
        {
                "word": "sư tử",
                "image": "🦁",
                "spellingSteps": [
                        "sờ - ư - sư",
                        "tờ - ư - tư - hỏi - tử",
                        "sư tử"
                ]
        }
],
      practiceWords: ["ti hí","tỉ tê","tu hú","tủ gỗ"],
      sceneCaption: 'Bé có bể cá bé tí',
      sentences: [
        "Mẹ có tủ gỗ to.",
        "Bố có tủ gỗ bé."
],
    },

  },
  {
    consonant: 'th',
    soundName: 'thờ',
    keyword: 'chú thỏ',
    keywordImage: '🐰',
    rows: [
      { vowel: 'a', toneNone: 'tha', toneSac: 'thá', toneHuyen: 'thà', toneHoi: 'thả', toneNga: 'thã', toneNang: 'thạ' },
      { vowel: 'o', toneNone: 'tho', toneSac: 'thó', toneHuyen: 'thò', toneHoi: 'thỏ', toneNga: 'thõ', toneNang: 'thọ' },
      { vowel: 'ô', toneNone: 'thô', toneSac: 'thố', toneHuyen: 'thồ', toneHoi: 'thổ', toneNga: 'thỗ', toneNang: 'thộ' },
      { vowel: 'ơ', toneNone: 'thơ', toneSac: 'thớ', toneHuyen: 'thờ', toneHoi: 'thở', toneNga: 'thỡ', toneNang: 'thợ' },
      { vowel: 'e', toneNone: 'the', toneSac: 'thé', toneHuyen: 'thè', toneHoi: 'thẻ', toneNga: 'thẽ', toneNang: 'thẹ' },
      { vowel: 'ê', toneNone: 'thê', toneSac: 'thế', toneHuyen: 'thề', toneHoi: 'thể', toneNga: 'thễ', toneNang: 'thệ' },
      { vowel: 'i', toneNone: 'thi', toneSac: 'thí', toneHuyen: 'thì', toneHoi: 'thỉ', toneNga: 'thĩ', toneNang: 'thị' },
      { vowel: 'u', toneNone: 'thu', toneSac: 'thú', toneHuyen: 'thù', toneHoi: 'thủ', toneNga: 'thũ', toneNang: 'thụ' },
      { vowel: 'ư', toneNone: 'thư', toneSac: 'thứ', toneHuyen: 'thừ', toneHoi: 'thử', toneNga: 'thữ', toneNang: 'thự' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "thợ nề",
                "image": "👷",
                "spellingSteps": [
                        "thờ - ơ - thơ - nặng - thợ",
                        "nờ - ê - nê - huyền - nề",
                        "thợ nề"
                ]
        },
        {
                "word": "chú thỏ",
                "image": "🐰",
                "spellingSteps": [
                        "chờ - u - chu - sắc - chú",
                        "thờ - o - tho - hỏi - thỏ",
                        "chú thỏ"
                ]
        }
],
      practiceWords: ["thơ ca","thủ thỉ","lá thư","sở thú"],
      sceneCaption: 'Bé đi thi vẽ',
      sentences: [
        "Nghỉ hè, mẹ cho bé đi sở thú ở thủ đô.",
        "Ở sở thú có sư tử, có hổ và có cả khỉ.",
        "Mẹ đi xa về, bé thủ thỉ: Mẹ à, bé nhớ mẹ!"
],
    },

  },
  {
    consonant: 'tr',
    soundName: 'trờ',
    keyword: 'cây tre',
    keywordImage: '🎋',
    rows: [
      { vowel: 'a', toneNone: 'tra', toneSac: 'trá', toneHuyen: 'trà', toneHoi: 'trả', toneNga: 'trã', toneNang: 'trạ' },
      { vowel: 'o', toneNone: 'tro', toneSac: 'tró', toneHuyen: 'trò', toneHoi: 'trỏ', toneNga: 'trõ', toneNang: 'trọ' },
      { vowel: 'ô', toneNone: 'trô', toneSac: 'trố', toneHuyen: 'trồ', toneHoi: 'trổ', toneNga: 'trỗ', toneNang: 'trộ' },
      { vowel: 'ơ', toneNone: 'trơ', toneSac: 'trớ', toneHuyen: 'trờ', toneHoi: 'trở', toneNga: 'trỡ', toneNang: 'trợ' },
      { vowel: 'e', toneNone: 'tre', toneSac: 'tré', toneHuyen: 'trè', toneHoi: 'trẻ', toneNga: 'trẽ', toneNang: 'trẹ' },
      { vowel: 'ê', toneNone: 'trê', toneSac: 'trế', toneHuyen: 'trề', toneHoi: 'trể', toneNga: 'trễ', toneNang: 'trệ' },
      { vowel: 'i', toneNone: 'tri', toneSac: 'trí', toneHuyen: 'trì', toneHoi: 'trỉ', toneNga: 'trĩ', toneNang: 'trị' },
      { vowel: 'u', toneNone: 'tru', toneSac: 'trú', toneHuyen: 'trù', toneHoi: 'trủ', toneNga: 'trũ', toneNang: 'trụ' },
      { vowel: 'ư', toneNone: 'trư', toneSac: 'trứ', toneHuyen: 'trừ', toneHoi: 'trử', toneNga: 'trữ', toneNang: 'trự' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "lá tre",
                "image": "🎋",
                "spellingSteps": [
                        "lờ - a - la - sắc - lá",
                        "trờ - e - tre",
                        "lá tre"
                ]
        },
        {
                "word": "cá trê",
                "image": "🐟",
                "spellingSteps": [
                        "cờ - a - ca - sắc - cá",
                        "trờ - ê - trê",
                        "cá trê"
                ]
        }
],
      practiceWords: ["nhà trẻ","nhà trọ","vũ trụ","pha trà"],
      sceneCaption: 'Bố chở bé đi nhà trẻ',
      sentences: [
        "Bố chở bé đi nhà trẻ, bố chớ đi trễ giờ."
],
    },

  },
  {
    consonant: 'v',
    soundName: 'vờ',
    keyword: 'con vịt',
    keywordImage: '🦆',
    rows: [
      { vowel: 'a', toneNone: 'va', toneSac: 'vá', toneHuyen: 'và', toneHoi: 'vả', toneNga: 'vã', toneNang: 'vạ' },
      { vowel: 'o', toneNone: 'vo', toneSac: 'vó', toneHuyen: 'vò', toneHoi: 'vỏ', toneNga: 'võ', toneNang: 'vọ' },
      { vowel: 'ô', toneNone: 'vô', toneSac: 'vố', toneHuyen: 'vồ', toneHoi: 'vổ', toneNga: 'vỗ', toneNang: 'vộ' },
      { vowel: 'ơ', toneNone: 'vơ', toneSac: 'vớ', toneHuyen: 'vờ', toneHoi: 'vở', toneNga: 'vỡ', toneNang: 'vợ' },
      { vowel: 'e', toneNone: 've', toneSac: 'vé', toneHuyen: 'vè', toneHoi: 'vẻ', toneNga: 'vẽ', toneNang: 'vẹ' },
      { vowel: 'ê', toneNone: 'vê', toneSac: 'vế', toneHuyen: 'về', toneHoi: 'vể', toneNga: 'vễ', toneNang: 'vệ' },
      { vowel: 'i', toneNone: 'vi', toneSac: 'ví', toneHuyen: 'vì', toneHoi: 'vỉ', toneNga: 'vĩ', toneNang: 'vị' },
      { vowel: 'u', toneNone: 'vu', toneSac: 'vú', toneHuyen: 'vù', toneHoi: 'vủ', toneNga: 'vũ', toneNang: 'vụ' },
      { vowel: 'ư', toneNone: 'vư', toneSac: 'vứ', toneHuyen: 'vừ', toneHoi: 'vử', toneNga: 'vữ', toneNang: 'vự' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "vỏ sò",
                "image": "🐚",
                "spellingSteps": [
                        "vờ - o - vo - hỏi - vỏ",
                        "sờ - o - so - huyền - sò",
                        "vỏ sò"
                ]
        },
        {
                "word": "tò vò",
                "image": "🐝",
                "spellingSteps": [
                        "tờ - o - to - huyền - tò",
                        "vờ - o - vo - huyền - vò",
                        "tò vò"
                ]
        }
],
      practiceWords: ["ve ve","hè về","vù vù","vé số"],
      sceneCaption: 'Bé vẽ sư tử',
      sentences: [
        "Ve ve ve, hè về.",
        "Bố có tờ vé số."
],
    },

  },
  {
    consonant: 'x',
    soundName: 'xờ',
    keyword: 'xe bò',
    keywordImage: '🚜',
    rows: [
      { vowel: 'a', toneNone: 'xa', toneSac: 'xá', toneHuyen: 'xà', toneHoi: 'xả', toneNga: 'xã', toneNang: 'xạ' },
      { vowel: 'o', toneNone: 'xo', toneSac: 'xó', toneHuyen: 'xò', toneHoi: 'xỏ', toneNga: 'xõ', toneNang: 'xọ' },
      { vowel: 'ô', toneNone: 'xô', toneSac: 'xố', toneHuyen: 'xồ', toneHoi: 'xổ', toneNga: 'xỗ', toneNang: 'xộ' },
      { vowel: 'ơ', toneNone: 'xơ', toneSac: 'xớ', toneHuyen: 'xờ', toneHoi: 'xở', toneNga: 'xỡ', toneNang: 'xợ' },
      { vowel: 'e', toneNone: 'xe', toneSac: 'xé', toneHuyen: 'xè', toneHoi: 'xẻ', toneNga: 'xẽ', toneNang: 'xẹ' },
      { vowel: 'ê', toneNone: 'xê', toneSac: 'xế', toneHuyen: 'xề', toneHoi: 'xể', toneNga: 'xễ', toneNang: 'xệ' },
      { vowel: 'i', toneNone: 'xi', toneSac: 'xí', toneHuyen: 'xì', toneHoi: 'xỉ', toneNga: 'xĩ', toneNang: 'xị' },
      { vowel: 'u', toneNone: 'xu', toneSac: 'xú', toneHuyen: 'xù', toneHoi: 'xủ', toneNga: 'xũ', toneNang: 'xụ' },
      { vowel: 'ư', toneNone: 'xư', toneSac: 'xứ', toneHuyen: 'xừ', toneHoi: 'xử', toneNga: 'xữ', toneNang: 'xự' },
    ],
    readingData: {
      illustratedWords: [
        {
                "word": "lì xì",
                "image": "🧧",
                "spellingSteps": [
                        "lờ - i - li - huyền - lì",
                        "xờ - i - xi - huyền - xì",
                        "lì xì"
                ]
        },
        {
                "word": "xe bò",
                "image": "🚜",
                "spellingSteps": [
                        "xờ - e - xe",
                        "bờ - o - bo - huyền - bò",
                        "xe bò"
                ]
        }
],
      practiceWords: ["xa xa","xe cộ","lò xo","xa lạ"],
      sceneCaption: 'Bố có xe đã cũ',
      sentences: [
        "Xa xa có tổ tò vò."
],
    },

  },
  {
    consonant: 'ch',
    soundName: 'chờ',
    keyword: 'chó xù',
    keywordImage: '🐩',
    rows: [
      { vowel: 'a', toneNone: 'cha', toneSac: 'chá', toneHuyen: 'chà', toneHoi: 'chả', toneNga: 'chã', toneNang: 'chạ' },
      { vowel: 'o', toneNone: 'cho', toneSac: 'chó', toneHuyen: 'chò', toneHoi: 'chỏ', toneNga: 'chõ', toneNang: 'chọ' },
      { vowel: 'ô', toneNone: 'chô', toneSac: 'chố', toneHuyen: 'chồ', toneHoi: 'chổ', toneNga: 'chỗ', toneNang: 'chộ' },
      { vowel: 'ơ', toneNone: 'chơ', toneSac: 'chớ', toneHuyen: 'chờ', toneHoi: 'chở', toneNga: 'chỡ', toneNang: 'chợ' },
      { vowel: 'e', toneNone: 'che', toneSac: 'ché', toneHuyen: 'chè', toneHoi: 'chẻ', toneNga: 'chẽ', toneNang: 'chẹ' },
      { vowel: 'ê', toneNone: 'chê', toneSac: 'chế', toneHuyen: 'chề', toneHoi: 'chể', toneNga: 'chễ', toneNang: 'chệ' },
      { vowel: 'i', toneNone: 'chi', toneSac: 'chí', toneHuyen: 'chì', toneHoi: 'chỉ', toneNga: 'chĩ', toneNang: 'chị' },
      { vowel: 'u', toneNone: 'chu', toneSac: 'chú', toneHuyen: 'chù', toneHoi: 'chủ', toneNga: 'chũ', toneNang: 'chụ' },
      { vowel: 'ư', toneNone: 'chư', toneSac: 'chứ', toneHuyen: 'chừ', toneHoi: 'chử', toneNga: 'chữ', toneNang: 'chự' },
    ],
    readingData: {
      illustratedWords: [
        { word: 'chó xù', image: '🐩', spellingSteps: ['chờ - o - cho - sắc - chó', 'xờ - u - xu - huyền - xù', 'chó xù'] },
        { word: 'xe chỉ', image: '🧵', spellingSteps: ['xờ - e - xe', 'chờ - i - chi - hỏi - chỉ', 'xe chỉ'] },
      ],
      practiceWords: ['chú chó', 'che chở', 'chỗ ở', 'cha xứ'],
      sceneCaption: 'Bé có chú chó xù',
      sentences: ['Bố chở mẹ và bé đi chợ.', 'Bà đi chợ về có rổ cá to.'],
    },
  },
];

// Nhóm Vần Kết Hợp Âm Cuối & Vần Đôi
export const RIME_GROUPS: RimeGroup[] = [
  {
    id: 'rime_n',
    title: 'Vần có âm cuối N',
    description: 'Âm "n" ở cuối khép nhẹ đầu lưỡi chạm lợi trên.',
    rimes: [
      { rime: 'an', sampleWords: ['cái bàn', 'bạn bè', 'dán giấy', 'hạt sắn'], spelling: 'a - nờ - an' },
      { rime: 'ăn', sampleWords: ['con rắn', 'khăn tay', 'mặt trăng', 'lặn lội'], spelling: 'á - nờ - ăn' },
      { rime: 'ân', sampleWords: ['quạt trần', 'sân chơi', 'chân gà', 'nhẫn vàng'], spelling: 'ớ - nờ - ân' },
      { rime: 'en', sampleWords: ['áo len', 'ngọn đèn', 'cái chén', 'khen ngợi'], spelling: 'e - nờ - en' },
      { rime: 'ên', sampleWords: ['cây nến', 'mũi tên', 'mền gối', 'nhện chăng'], spelling: 'ê - nờ - ên' },
      { rime: 'in', sampleWords: ['chuối chín', 'con chim', 'máy in', 'tín hiệu'], spelling: 'i - nờ - in' },
      { rime: 'on', sampleWords: ['thỏi son', 'con non', 'tròn xoe', 'hòn sỏi'], spelling: 'o - nờ - on' },
      { rime: 'ôn', sampleWords: ['ôn bài', 'con chồn', 'thôn xóm', 'trốn tìm'], spelling: 'ô - nờ - ôn' },
      { rime: 'ơn', sampleWords: ['con lợn', 'sơn ca', 'cơn mưa', 'chớp mắt'], spelling: 'ơ - nờ - ơn' },
      { rime: 'un', sampleWords: ['con giun', 'bún chả', 'cún con', 'chũn chĩn'], spelling: 'u - nờ - un' },
    ],
  },
  {
    id: 'rime_m',
    title: 'Vần có âm cuối M',
    description: 'Âm "m" ở cuối hai môi khép kín lại.',
    rimes: [
      { rime: 'am', sampleWords: ['quả cam', 'con tằm', 'hát nhảm', 'tạm biệt'], spelling: 'a - mờ - am' },
      { rime: 'ăm', sampleWords: ['con tằm', 'năm tháng', 'chăm chỉ', 'tắm mát'], spelling: 'á - mờ - ăm' },
      { rime: 'âm', sampleWords: ['cây nấm', 'hạt mầm', 'tấm lòng', 'sấm chớp'], spelling: 'ớ - mờ - âm' },
      { rime: 'em', sampleWords: ['que kem', 'xem phim', 'chị em', 'rèm cửa'], spelling: 'e - mờ - em' },
      { rime: 'êm', sampleWords: ['sao đêm', 'trăng rằm', 'thêm vào', 'đệm ấm'], spelling: 'ê - mờ - êm' },
      { rime: 'im', sampleWords: ['con chim', 'trái tim', 'cái kìm', 'phim hay'], spelling: 'i - mờ - im' },
      { rime: 'om', sampleWords: ['ống nhòm', 'con tôm', 'chòm sao', 'đom đóm'], spelling: 'o - mờ - om' },
      { rime: 'ôm', sampleWords: ['chôm chôm', 'hôm nay', 'ôm ấp', 'bộ môn'], spelling: 'ô - mờ - ôm' },
      { rime: 'ơm', sampleWords: ['bát cơm', 'mùi thơm', 'rơm rạ', 'bơm xe'], spelling: 'ơ - mờ - ơm' },
      { rime: 'um', sampleWords: ['tôm hùm', 'chùm quả', 'tùm lum', 'xum xuê'], spelling: 'u - mờ - um' },
    ],
  },
  {
    id: 'rime_dipthongs_1',
    title: 'Các Vần Đôi: AI - OI - ÔI - ƠI - UI - ƯI',
    description: 'Kết hợp hai nguyên âm liền nhau mượt mà.',
    rimes: [
      { rime: 'ai', sampleWords: ['học bài', 'hoa mai', 'tay lái', 'gà mái'], spelling: 'a - i - ai' },
      { rime: 'oi', sampleWords: ['cá voi', 'củ tỏi', 'quả roi', 'gọi đò'], spelling: 'o - i - oi' },
      { rime: 'ôi', sampleWords: ['xe nôi', 'quả ổi', 'cái chổi', 'đồi núi'], spelling: 'ô - i - ôi' },
      { rime: 'ơi', sampleWords: ['con dơi', 'đồ chơi', 'phao bơi', 'thời sự'], spelling: 'ơ - i - ơi' },
      { rime: 'ui', sampleWords: ['cái túi', 'bó củi', 'vui vẻ', 'chúi đầu'], spelling: 'u - i - ui' },
      { rime: 'ửi', sampleWords: ['khung cửi', 'gửi thư', 'ngửi mùi', 'chửi rủa'], spelling: 'ư - i - ưi' },
    ],
  },
  {
    id: 'rime_dipthongs_2',
    title: 'Các Vần Đôi: AY - ÂY - UY - AO - EO',
    description: 'Nguyên âm đôi luyến láy.',
    rimes: [
      { rime: 'ay', sampleWords: ['máy bay', 'bàn tay', 'chạy nhảy', 'ngày mai'], spelling: 'a - i dài - ay' },
      { rime: 'ây', sampleWords: ['thợ xây', 'cây cối', 'đám mây', 'bầy nai'], spelling: 'ớ - i dài - ây' },
      { rime: 'uy', sampleWords: ['tàu thủy', 'chim khuyên', 'lũy tre', 'nguy hiểm'], spelling: 'u - i dài - uy' },
      { rime: 'ao', sampleWords: ['cái phao', 'ngôi sao', 'quả táo', 'cây cao'], spelling: 'a - o - ao' },
      { rime: 'eo', sampleWords: ['con mèo', 'cái kẹo', 'khéo tay', 'chèo thuyền'], spelling: 'e - o - eo' },
    ],
  },
  {
    id: 'rime_ia_ua_ua',
    title: 'Các Vần Đôi: IA - UA - ƯA',
    description: 'Các nguyên âm mở rộng vòm miệng.',
    rimes: [
      { rime: 'ia', sampleWords: ['cốc bia', 'lá mía', 'đĩa sứ', 'chia sẻ'], spelling: 'i - a - ia' },
      { rime: 'ua', sampleWords: ['con cua', 'cà chua', 'mùa vụ', 'búa tạ'], spelling: 'u - a - ua' },
      { rime: 'ưa', sampleWords: ['quả dưa', 'cơn mưa', 'ngựa gỗ', 'bừa ruộng'], spelling: 'ư - a - ưa' },
    ],
  },
];

// Bài Luyện Đọc: Thẻ Từ Ngữ Có Minh Họa (Trang 101 - 124)
export const PRACTICE_WORDS_DATA: ReadingItem[] = [
  { id: 'w1', category: 'word', text: 'bé bi', illustration: '👶', spellingSteps: ['bờ - e - be - sắc - bé', 'bờ - i - bi', 'bé bi'] },
  { id: 'w2', category: 'word', text: 'bò bê', illustration: '🐄', spellingSteps: ['bờ - o - bo - huyền - bò', 'bờ - ê - bê', 'bò bê'] },
  { id: 'w3', category: 'word', text: 'cá cờ', illustration: '🐟', spellingSteps: ['cờ - a - ca - sắc - cá', 'cờ - ơ - cơ - huyền - cờ', 'cá cờ'] },
  { id: 'w4', category: 'word', text: 'cổ cò', illustration: '🦩', spellingSteps: ['cờ - ô - cô - hỏi - cổ', 'cờ - o - co - huyền - cò', 'cổ cò'] },
  { id: 'w5', category: 'word', text: 'da dê', illustration: '🐐', spellingSteps: ['dờ - a - da', 'dờ - ê - dê', 'da dê'] },
  { id: 'w6', category: 'word', text: 'ô dù', illustration: '☂️', spellingSteps: ['ô', 'dờ - u - du - huyền - dù', 'ô dù'] },
  { id: 'w7', category: 'word', text: 'đu đủ', illustration: '🍈', spellingSteps: ['đờ - u - đu', 'đờ - u - đu - hỏi - đủ', 'đu đủ'] },
  { id: 'w8', category: 'word', text: 'bí đỏ', illustration: '🎃', spellingSteps: ['bờ - i - bi - sắc - bí', 'đờ - o - đo - hỏi - đỏ', 'bí đỏ'] },
  { id: 'w9', category: 'word', text: 'gà gô', illustration: '🦃', spellingSteps: ['gờ - a - ga - huyền - gà', 'gờ - ô - gô', 'gà gô'] },
  { id: 'w10', category: 'word', text: 'hổ dữ', illustration: '🐯', spellingSteps: ['hờ - ô - hô - hỏi - hổ', 'dờ - ư - dư - ngã - dữ', 'hổ dữ'] },
  { id: 'w11', category: 'word', text: 'kệ gỗ', illustration: '🪑', spellingSteps: ['ca - ê - kê - nặng - kệ', 'gờ - ô - gô - ngã - gỗ', 'kệ gỗ'] },
  { id: 'w12', category: 'word', text: 'lá cờ', illustration: '🇻🇳', spellingSteps: ['lờ - a - la - sắc - lá', 'cờ - ơ - cơ - huyền - cờ', 'lá cờ'] },
  { id: 'w13', category: 'word', text: 'lá me', illustration: '🌿', spellingSteps: ['lờ - a - la - sắc - lá', 'mờ - e - me', 'lá me'] },
  { id: 'w14', category: 'word', text: 'bố mẹ', illustration: '👨‍👩‍👧', spellingSteps: ['bờ - ô - bô - sắc - bố', 'mờ - e - me - nặng - mẹ', 'bố mẹ'] },
  { id: 'w15', category: 'word', text: 'ca nô', illustration: '🚤', spellingSteps: ['cờ - a - ca', 'nờ - ô - nô', 'ca nô'] },
  { id: 'w16', category: 'word', text: 'nơ đỏ', illustration: '🎀', spellingSteps: ['nờ - ơ - nơ', 'đờ - o - đo - hỏi - đỏ', 'nơ đỏ'] },
  { id: 'w17', category: 'word', text: 'cá rô', illustration: '🐟', spellingSteps: ['cờ - a - ca - sắc - cá', 'rờ - ô - rô', 'cá rô'] },
  { id: 'w18', category: 'word', text: 'su su', illustration: '🍈', spellingSteps: ['sờ - u - su', 'sờ - u - su', 'su su'] },
  { id: 'w19', category: 'word', text: 'sư tử', illustration: '🦁', spellingSteps: ['sờ - ư - sư', 'tờ - ư - tư - hỏi - tử', 'sư tử'] },
  { id: 'w20', category: 'word', text: 'vỏ sò', illustration: '🐚', spellingSteps: ['vờ - o - vo - hỏi - vỏ', 'sờ - o - so - huyền - sò', 'vỏ sò'] },
  { id: 'w21', category: 'word', text: 'chó xù', illustration: '🐩', spellingSteps: ['chờ - o - cho - sắc - chó', 'xờ - u - xu - huyền - xù', 'chó xù'] },
  { id: 'w22', category: 'word', text: 'chú thỏ', illustration: '🐰', spellingSteps: ['chờ - u - chu - sắc - chú', 'thờ - o - tho - hỏi - thỏ', 'chú thỏ'] },
  { id: 'w23', category: 'word', text: 'máy bay', illustration: '✈️', spellingSteps: ['mờ - ay - may - sắc - máy', 'bờ - ay - bay', 'máy bay'] },
  { id: 'w24', category: 'word', text: 'cái kẹo', illustration: '🍬', spellingSteps: ['cờ - ai - cai - sắc - cái', 'ca - eo - keo - nặng - kẹo', 'cái kẹo'] },
  { id: 'w25', category: 'word', text: 'chú mèo', illustration: '🐱', spellingSteps: ['chờ - u - chu - sắc - chú', 'mờ - eo - meo - huyền - mèo', 'chú mèo'] },
  { id: 'w26', category: 'word', text: 'ngôi sao', illustration: '⭐', spellingSteps: ['ngờ - ôi - ngôi', 'sờ - ao - sao', 'ngôi sao'] },
];

// Luyện Đọc Câu Văn Ngắn
export const PRACTICE_SENTENCES: ReadingItem[] = [
  {
    id: 's1',
    category: 'sentence',
    text: 'Bà bế bé Bi. Bố bế bé Bo.',
    spellingSteps: ['Bà bế bé Bi.', 'Bố bế bé Bo.'],
    illustration: '👵',
  },
  {
    id: 's2',
    category: 'sentence',
    text: 'Cô có cờ, bé có bi. Bố bế cả Bi và Bo.',
    spellingSteps: ['Cô có cờ, bé có bi.', 'Bố bế cả Bi và Bo.'],
    illustration: '👧',
  },
  {
    id: 's3',
    category: 'sentence',
    text: 'Dì Ba bế bé. Bò, dê có ba bó cỏ.',
    spellingSteps: ['Dì Ba bế bé.', 'Bò, dê có ba bó cỏ.'],
    illustration: '👩',
  },
  {
    id: 's4',
    category: 'sentence',
    text: 'Bố đi ca nô, mẹ bế bé đi bộ.',
    spellingSteps: ['Bố đi ca nô,', 'mẹ bế bé đi bộ.'],
    illustration: '🚤',
  },
  {
    id: 's5',
    category: 'sentence',
    text: 'Bố chở mẹ và bé đi chợ. Bà đi chợ về có rổ cá to.',
    spellingSteps: ['Bố chở mẹ và bé đi chợ.', 'Bà đi chợ về có rổ cá to.'],
    illustration: '🚲',
  },
  {
    id: 's6',
    category: 'sentence',
    text: 'Nghỉ hè, mẹ cho bé đi sở thú ở thủ đô. Ở sở thú có sư tử, có hổ và có cả khỉ.',
    spellingSteps: ['Nghỉ hè, mẹ cho bé đi sở thú ở thủ đô.', 'Ở sở thú có sư tử, có hổ và có cả khỉ.'],
    illustration: '🦁',
  },
];

// 4 Mẩu Chuyện Đọc Kinh Điển (Trang 120 - 125)
export const PRACTICE_STORIES: ReadingItem[] = [
  {
    id: 'story_ga_gay',
    category: 'story',
    title: 'Gà Gáy',
    text: 'Gà vừa mới gáy, mẹ đã dậy để thổi xôi rồi đi chợ, bố dậy để đi cày. Bé và chị vừa ngủ dậy, bố và mẹ đã về. Bé vui quá, bé chạy lại và gọi mẹ: Mẹ! Mẹ ơi! Mẹ lấy xôi cho bé, bé đói rồi ạ!',
    illustration: '🐓',
  },
  {
    id: 'story_meo_day_ho',
    category: 'story',
    title: 'Mèo Dạy Hổ',
    text: 'Ngày xưa, Hổ nhờ Mèo dạy võ. Mèo thấy Hổ dữ, Mèo chỉ dạy cho Hổ vài thế võ nhỏ để tự vệ. Hổ nghĩ là tài đã cao. Trời tối, Hổ chờ Mèo đi qua, nó nhảy ra vồ lấy Mèo. Mèo leo trèo giỏi, leo vèo cái lên cây cao. Rồi Mèo bảo Hổ: "Meo meo meo meo, ta có võ trèo, ta chưa dạy Hổ".',
    illustration: '🐯',
  },
  {
    id: 'story_xao_rau',
    category: 'story',
    title: 'Xào Rau',
    text: 'Mẹ dạy bé xào rau. Để xào rau, bé nhớ: rửa rau, sau đó cho dầu mỡ vào chảo, rồi cho rau vào xào, rồi đảo rau, cho gia vị vào, đổ ra đĩa. Thế là bé đã có đĩa rau xào thật ngon.',
    illustration: '🥬',
  },
  {
    id: 'story_chay_thi',
    category: 'story',
    title: 'Chạy Thi',
    text: 'Bé và chị Nga thi chạy, bé thì nhỏ xíu, chị Nga thì to cao. Thấy bé chạy mãi ở sau, chị Nga tự cao: Rùa mà đòi chạy thi với Thỏ à? Thế rồi chị Nga mải mê vui chơi, rồi lại chui vào lều ngủ. Bé thì chịu khó chạy mãi, chạy mãi và đã về tới nơi. Thế là mải chơi, tự cao tự đại, chị Nga đã thua bé.',
    illustration: '🏃‍♀️',
  },
];

// Bài Luyện Đọc Theo Nhóm Vần Chuẩn Sách Giáo Khoa (Trang 115 - 123)
export const RIME_READING_LESSONS: RimeReadingLesson[] = [
  {
    "id": "ia",
    "rimes": [
      "ia"
    ],
    "title": "ia",
    "bookPage": 115,
    "illustratedWords": [
      {
        "word": "lá mía",
        "image": "🎋"
      },
      {
        "word": "đĩa sứ",
        "image": "🍽️"
      },
      {
        "word": "bìa vở",
        "image": "📕"
      }
    ],
    "practiceWords": [
      "lá tía tô",
      "vỉa hè",
      "bia đá",
      "chia quà",
      "tỉa lá",
      "địa lí",
      "chia sẻ",
      "bộ ria",
      "nghĩa vụ"
    ],
    "sentences": [
      "Bé có vở bìa đỏ.",
      "Bà có lá tía tô.",
      "Mẹ có nia đỗ đỏ."
    ],
    "passage": {
      "title": "Mẹ đi chợ về",
      "text": "Mẹ đi chợ về, mẹ có quà chia cho bé và chị Nga. Mẹ để ở đĩa sứ đủ thứ quả: quả na, quả mơ, quả khế, quả thị. Bé chia cho chị Nga quả to."
    }
  },
  {
    "id": "ua_ua",
    "rimes": [
      "ua",
      "ưa"
    ],
    "title": "ua - ưa",
    "bookPage": 116,
    "illustratedWords": [
      {
        "word": "cà chua",
        "image": "🍅"
      },
      {
        "word": "cua bể",
        "image": "🦀"
      },
      {
        "word": "ngựa gỗ",
        "image": "🎠"
      },
      {
        "word": "quả dừa",
        "image": "🥥"
      }
    ],
    "practiceWords": [
      "búa tạ",
      "mùa vụ",
      "nô đùa",
      "rùa nhỏ",
      "cua đá",
      "mùa thu",
      "lễ chùa",
      "múa võ",
      "giò lụa",
      "tơ lụa",
      "dưa lê",
      "xô nhựa",
      "cá ngựa",
      "quả dứa",
      "rửa xe",
      "mưa gió",
      "cựa gà",
      "lửa đỏ",
      "tre nứa",
      "sửa chữa"
    ],
    "sentences": [
      "Bố và mẹ đi lễ chùa.",
      "Bé và chị nô đùa.",
      "Bé phi ngựa gỗ.",
      "Mẹ ru bé ngủ trưa."
    ],
    "passage": {
      "title": "Mẹ mua đồ",
      "text": "Mẹ đi chợ về, mẹ mua đồ cho cả nhà, mẹ mua cho bé quả dừa to, mẹ mua cho chị Nga mía đá, mẹ mua cho bố quả dưa lê, bố bổ dưa lê chia cho cả nhà."
    }
  },
  {
    "id": "oi_ai",
    "rimes": [
      "oi",
      "ai"
    ],
    "title": "oi - ai",
    "bookPage": 117,
    "illustratedWords": [
      {
        "word": "chú voi",
        "image": "🐘"
      },
      {
        "word": "củ tỏi",
        "image": "🧄"
      },
      {
        "word": "gà mái",
        "image": "🐔"
      },
      {
        "word": "quả vải",
        "image": "🍒"
      }
    ],
    "practiceWords": [
      "gói quà",
      "quả roi",
      "mũ cói",
      "gọi đò",
      "cá mòi",
      "lái xe",
      "củ cải",
      "mái nhà",
      "chai lọ",
      "cái tai",
      "vại cà",
      "bài vở",
      "cái còi",
      "tài giỏi",
      "tai voi"
    ],
    "sentences": [
      "Chú voi có cái vòi dài.",
      "Đi hỏi già, về nhà hỏi trẻ.",
      "Thứ tư, bé và chị Mai đi dự trại hè ở thủ đô.",
      "Nhà gà tía ở kề nhà gà mái."
    ],
    "passage": {
      "title": "Nghỉ hè về quê",
      "text": "Nghỉ hè, bố lái xe đưa cả nhà về quê, quê bé ở Sa Pa. Về quê, bé và chị Nga mải mê nô đùa ở bãi cỏ, mãi mà chưa về, mẹ gọi cả hai bé về nhà ngủ trưa, bé và chị mãi chưa ngủ, lại nô đùa, bé và chị bị mẹ la."
    }
  },
  {
    "id": "oi_oi2",
    "rimes": [
      "ôi",
      "ơi"
    ],
    "title": "ôi - ơi",
    "bookPage": 118,
    "illustratedWords": [
      {
        "word": "quả ổi",
        "image": "🍈"
      },
      {
        "word": "cái chổi",
        "image": "🧹"
      },
      {
        "word": "đồ chơi",
        "image": "🧸"
      },
      {
        "word": "phao bơi",
        "image": "🛟"
      }
    ],
    "practiceWords": [
      "cối đá",
      "cái nồi",
      "lối đi",
      "bà nội",
      "hội chợ",
      "từ chối",
      "cái gối",
      "xe nôi",
      "bộ đội",
      "múa rối",
      "sợi chỉ",
      "thời sự",
      "ca ngợi",
      "chờ đợi",
      "lời nói",
      "nơi ở",
      "lời mời",
      "cơi nới",
      "áo mới",
      "trời tối"
    ],
    "sentences": [
      "Trời mưa xối xả.",
      "Mẹ đi chợ mua lúa mới về thổi xôi.",
      "Bố cho bé và chị Nga đi hội chợ.",
      "Bà nội mua đồ chơi cho bé và chị Nga."
    ],
    "passage": {
      "title": "Bố đưa bé ra thủ đô",
      "text": "Thứ tư, bố cho bé và chị Nga ra thủ đô chơi. Mỗi khi ra thủ đô chơi, bố lại nhớ về thời xa xưa, khi bố là bộ đội. Ở thủ đô có Bờ Hồ, có sở thú, có đủ thứ đồ chơi, bé và chị Nga chơi mãi tới tối mới về nhà."
    }
  },
  {
    "id": "ui_ui",
    "rimes": [
      "ui",
      "ưi"
    ],
    "title": "ui - ưi",
    "bookPage": 119,
    "illustratedWords": [
      {
        "word": "bó củi",
        "image": "🪵"
      },
      {
        "word": "đồi núi",
        "image": "⛰️"
      },
      {
        "word": "gửi thư",
        "image": "✉️"
      },
      {
        "word": "gửi quà",
        "image": "🎁"
      }
    ],
    "practiceWords": [
      "bụi cỏ",
      "túi vải",
      "đùi gà",
      "chia vui",
      "mùi vị",
      "khe núi",
      "múi khế",
      "vui vẻ",
      "tủi hổ",
      "bùi ngùi",
      "thưa gửi",
      "ngửi mùi"
    ],
    "sentences": [
      "Bé gửi thư cho chú bộ đội.",
      "Bé thưa gửi lễ độ.",
      "Quê nội bé có đồi núi, có cả hồ cá.",
      "Cả nhà vui khi bố đi xa về."
    ],
    "passage": {
      "title": "Bà thổi xôi",
      "text": "Ở quê, bé đi chơi vui, mãi trời tối mới về nhà, ở nhà chỉ có bà nội, bà thổi xôi cho bé, bà hỏi bé: bé đói rồi à? Bé trả lời bà: Bà ơi, bé đói rồi ạ! Bà cho bé đĩa xôi đi bà."
    }
  },
  {
    "id": "ay_ay",
    "rimes": [
      "ay",
      "ây"
    ],
    "title": "ay - ây",
    "bookPage": 120,
    "illustratedWords": [
      {
        "word": "máy bay",
        "image": "✈️"
      },
      {
        "word": "gà gáy",
        "image": "🐓"
      },
      {
        "word": "cây lúa",
        "image": "🌾"
      },
      {
        "word": "đôi giầy",
        "image": "👟"
      }
    ],
    "practiceWords": [
      "cỏ may",
      "nhà máy",
      "may vá",
      "dạy dỗ",
      "máy cày",
      "chạy nhảy",
      "khay nhựa",
      "ngày mai",
      "váy mới",
      "say xe",
      "cây cối",
      "thầy cô",
      "trái cây",
      "giỏ mây",
      "bầy nai",
      "giây phơi",
      "xây nhà",
      "trời mây",
      "cấy lúa",
      "nhảy dây"
    ],
    "sentences": [
      "Mẹ mua váy mới cho bé.",
      "Bé và chị chơi nhảy dây.",
      "Bé vừa ngủ dậy, má đỏ hây hây.",
      "Ngày mai, bố cho bé đi máy bay."
    ],
    "passage": {
      "title": "Gà gáy",
      "text": "Gà vừa mới gáy, mẹ đã dậy để thổi xôi rồi đi chợ, bố dậy để đi cày. Bé và chị vừa ngủ dậy, bố và mẹ đã về. Bé vui quá, bé chạy lại và gọi mẹ: Mẹ! Mẹ ơi! Mẹ lấy xôi cho bé, bé đói rồi ạ!"
    }
  },
  {
    "id": "eo_ao",
    "rimes": [
      "eo",
      "ao"
    ],
    "title": "eo - ao",
    "bookPage": 121,
    "illustratedWords": [
      {
        "word": "cái kẹo",
        "image": "🍬"
      },
      {
        "word": "chú mèo",
        "image": "🐱"
      },
      {
        "word": "ngôi sao",
        "image": "⭐"
      },
      {
        "word": "quả táo",
        "image": "🍎"
      }
    ],
    "practiceWords": [
      "kẹo kéo",
      "cái kéo",
      "khéo tay",
      "kèo nhà",
      "bé tẹo",
      "cây gạo",
      "tờ báo",
      "cô giáo",
      "lời chào",
      "mưa rào",
      "thể thao",
      "chào cờ",
      "trái đào",
      "cây cao",
      "bờ rào"
    ],
    "sentences": [
      "Chị Nga cho bé cái kẹo bé tẹo teo.",
      "Chú bộ đội có mũ tai bèo.",
      "Nhà bà nội có cây táo đỏ.",
      "Lá cờ đỏ có ngôi sao."
    ],
    "passage": {
      "title": "Mèo dạy Hổ",
      "text": "Ngày xưa, Hổ nhờ Mèo dạy võ. Mèo thấy Hổ dữ, Mèo chỉ dạy cho Hổ vài thế võ nhỏ để tự vệ. Hổ nghĩ là tài đã cao. Trời tối, Hổ chờ mèo đi qua, nó nhảy ra vồ lấy Mèo. Mèo leo trèo giỏi, leo vèo cái lên cây cao. Rồi Mèo bảo Hổ: \"Meo meo meo meo, ta có võ trèo, ta chưa dạy Hổ\"."
    }
  },
  {
    "id": "au_au",
    "rimes": [
      "au",
      "âu"
    ],
    "title": "au - âu",
    "bookPage": 122,
    "illustratedWords": [
      {
        "word": "cây cau",
        "image": "🌴"
      },
      {
        "word": "rau cải",
        "image": "🥬"
      },
      {
        "word": "dưa hấu",
        "image": "🍉"
      },
      {
        "word": "dâu tây",
        "image": "🍓"
      }
    ],
    "practiceWords": [
      "rau má",
      "cháu gái",
      "quý báu",
      "lau nhà",
      "cau có",
      "cậu mợ",
      "bầu trời",
      "quả sấu",
      "lá trầu",
      "quả bầu",
      "câu hỏi",
      "dầu gió",
      "râu ngô",
      "dấu ngã",
      "màu nâu"
    ],
    "sentences": [
      "Bé và chị lau nhà.",
      "Mẹ đi chợ mua rau cải về xào.",
      "Bố lái xe qua cây cầu mới xây.",
      "Bà nội ngồi khâu áo sau cửa sổ.",
      "Chú mèo mà trèo cây cau."
    ],
    "passage": {
      "title": "Xào rau",
      "text": "Mẹ dạy bé xào rau. Để xào rau, bé nhớ: rửa rau, sau đó cho dầu mỡ vào chảo, rồi cho rau vào xào, rồi đảo rau, cho gia vị vào, đổ ra đĩa. Thế là bé đã có đĩa rau xào."
    }
  },
  {
    "id": "iu_eu",
    "rimes": [
      "iu",
      "êu"
    ],
    "title": "iu - êu",
    "bookPage": 123,
    "illustratedWords": [
      {
        "word": "cái rìu",
        "image": "🪓"
      },
      {
        "word": "trĩu quả",
        "image": "🍎"
      },
      {
        "word": "cây nêu",
        "image": "🎋"
      },
      {
        "word": "cái phễu",
        "image": "🌪️"
      }
    ],
    "practiceWords": [
      "líu lo",
      "địu con",
      "nhỏ xíu",
      "níu kéo",
      "chịu khó",
      "lều vải",
      "cao kều",
      "gối thêu",
      "kêu gọi",
      "trêu đùa"
    ],
    "sentences": [
      "Mẹ địu bé đi nhà trẻ.",
      "Đôi giầy của bé nhỏ xíu.",
      "Mẹ mua cho bé lều vải."
    ],
    "passage": {
      "title": "Chạy thi",
      "text": "Bé và chị Nga thi chạy, bé thì nhỏ xíu, chị Nga thì to cao. Thấy bé chạy mãi ở sau, chị Nga tự cao: Rùa mà đòi chạy thi với Thỏ à? Thế rồi chị Nga mải mê vui chơi, rồi lại chui vào lều ngủ. Bé thì chịu khó chạy mãi, chạy mãi và đã về tới nơi. Thế là mải chơi, tự cao tự đại, chị Nga đã thua bé."
    }
  },
  {
    "id": "an_an_an",
    "rimes": ["an", "ăn", "ân"],
    "title": "an - ăn - ân",
    "bookPage": 34,
    "illustratedWords": [
      { "word": "con gián", "image": "🪳" },
      { "word": "cái khăn", "image": "🧣" },
      { "word": "cái cân", "image": "⚖️" },
      { "word": "bàn chân", "image": "🦶" }
    ],
    "practiceWords": [
      "nhà sàn", "bàn cờ", "thợ lặn", "bắn bi", "ngăn nắp",
      "sân cỏ", "cần cù", "hạt mận", "dặn dò", "cái nhẫn"
    ],
    "sentences": [
      "Bé ngăn nắp dọn dẹp đồ chơi.",
      "Bố rủ bé ra sân cỏ đá bóng.",
      "Mẹ đan cho bé chiếc khăn len ấm áp."
    ],
    "passage": {
      "title": "Bé ra sân tập thể dục",
      "text": "Mỗi sớm mai, khi ánh nắng chan hòa rọi xuống sân cỏ, bé và chị lại cùng nhau chạy bộ và tập thể dục. Gió sớm mát lành làm đôi má bé đỏ hồng. Bé cảm thấy tinh thần sảng khoái và tràn đầy năng lượng."
    }
  },
  {
    "id": "en_en_in",
    "rimes": ["en", "ên", "in"],
    "title": "en - ên - in",
    "bookPage": 35,
    "illustratedWords": [
      { "word": "ngọn đèn", "image": "🏮" },
      { "word": "con sên", "image": "🐌" },
      { "word": "máy in", "image": "🖨️" },
      { "word": "búp sen", "image": "🪷" }
    ],
    "practiceWords": [
      "khen ngợi", "bền bỉ", "tự tin", "mũi tên", "búp sen",
      "con vẹt", "tin nhắn", "bập bênh", "thân mến", "len lỏi"
    ],
    "sentences": [
      "Búp sen hồng chúm chím nở bên hồ.",
      "Bé ngoan ngoãn được cô giáo khen ngợi.",
      "Bố mẹ luôn tin tưởng và yêu thương bé."
    ],
    "passage": {
      "title": "Bông sen bên hồ",
      "text": "Mùa hè đến, hoa sen trong đầm nở rộ tỏa hương thơm ngát. Chị chèo thuyền đưa bé đi ngắm hoa sen. Bé thích thú nhìn búp sen hồng vươn cao đón ánh nắng rực rỡ."
    }
  },
  {
    "id": "on_on_on",
    "rimes": ["on", "ôn", "ơn"],
    "title": "on - ôn - ơn",
    "bookPage": 36,
    "illustratedWords": [
      { "word": "cái nón", "image": "👒" },
      { "word": "chú khỉ con", "image": "🐒" },
      { "word": "sơn ca", "image": "🐦" },
      { "word": "con chồn", "image": "🦝" }
    ],
    "practiceWords": [
      "ngon lành", "tròn xoe", "ơn nghĩa", "cảm ơn", "bồn hoa",
      "cá bơn", "lớn khôn", "tôn trọng", "sơn màu", "hòn sỏi"
    ],
    "sentences": [
      "Bé lễ phép nói lời cảm ơn khi nhận quà.",
      "Mắt chú cún con tròn xoe thật đáng yêu.",
      "Chim sơn ca cất tiếng hót véo von đón ngày mới."
    ],
    "passage": {
      "title": "Bé biết nói lời cảm ơn",
      "text": "Khi được người lớn tặng quà, bé luôn khoanh tay trước ngực và nói: Cháu cảm ơn ông bà ạ! Ông bà mỉm cười xoa đầu khen bé ngoan ngoãn và lễ phép."
    }
  },
  {
    "id": "un",
    "rimes": ["un"],
    "title": "un",
    "bookPage": 37,
    "illustratedWords": [
      { "word": "con giun", "image": "🪱" },
      { "word": "áo thun", "image": "👕" },
      { "word": "bụi măng", "image": "🎋" },
      { "word": "vun xới", "image": "🌱" }
    ],
    "practiceWords": [
      "giun đất", "dây thun", "nước đun", "bùn lầy",
      "phun mưa", "vun xới", "run run", "thun thắt"
    ],
    "sentences": [
      "Chú giun đất cần mẫn làm cho đất thêm tơi xốp.",
      "Mẹ mua cho bé chiếc áo thun mới thật mát mẻ.",
      "Bố tưới cây hoa hồng bằng bình phun sương."
    ]
  },
  {
    "id": "am_am_am",
    "rimes": ["am", "ăm", "âm"],
    "title": "am - ăm - âm",
    "bookPage": 39,
    "illustratedWords": [
      { "word": "quả cam", "image": "🍊" },
      { "word": "chăm chỉ", "image": "📚" },
      { "word": "ấm trà", "image": "🫖" },
      { "word": "cây nấm", "image": "🍄" }
    ],
    "practiceWords": [
      "chăm ngoan", "màu xám", "tấm lòng", "thì thầm", "viếng thăm",
      "mầm cây", "chầm chậm", "ngắm nhìn", "can đảm", "củ sắn"
    ],
    "sentences": [
      "Bé chăm chỉ đọc sách và học chữ mỗi ngày.",
      "Bố pha ấm trà nóng thơm phức mời ông.",
      "Cây nấm nhỏ xinh vươn mình sau cơn mưa rào."
    ],
    "passage": {
      "title": "Bé chăm chỉ",
      "text": "Mỗi buổi tối sau bữa cơm, bé lại ngồi vào bàn học tập. Bé nắn nót viết từng nét chữ và đọc bài thật to, rõ ràng. Mẹ khen bé chăm ngoan, xứng đáng là cháu ngoan Bác Hồ."
    }
  },
  {
    "id": "em_em_im",
    "rimes": ["em", "êm", "im"],
    "title": "em - êm - im",
    "bookPage": 40,
    "illustratedWords": [
      { "word": "que kem", "image": "🍦" },
      { "word": "đêm trăng", "image": "🌙" },
      { "word": "con chim", "image": "🐦" },
      { "word": "nệm êm", "image": "🧸" }
    ],
    "practiceWords": [
      "êm ái", "que kem", "tìm kiếm", "im lặng", "mỉm cười",
      "kỷ niệm", "chiếc nệm", "trái tim", "tiếng chim", "chị em"
    ],
    "sentences": [
      "Tiếng chim hót ríu rít trên cành cây cao.",
      "Mẹ ru bé ngủ trên chiếc nệm êm ái.",
      "Bé mỉm cười vui vẻ khi được mẹ khen."
    ],
    "passage": {
      "title": "Tiếng chim ca",
      "text": "Buổi sớm mai, từng đàn chim líu lo cất tiếng hót đầu hiên nhà. Gió hiu hiu thổi đem không khí trong lành vào căn phòng nhỏ. Bé thức giấc mỉm cười chào một ngày mới thật vui."
    }
  },
  {
    "id": "om_om_om",
    "rimes": ["om", "ôm", "ơm"],
    "title": "om - ôm - ơm",
    "bookPage": 41,
    "illustratedWords": [
      { "word": "đom đóm", "image": "💡" },
      { "word": "ôm ấp", "image": "🤗" },
      { "word": "hạt cơm", "image": "🍚" },
      { "word": "bó rơm", "image": "🌾" }
    ],
    "practiceWords": [
      "bữa cơm", "đom đóm", "ôm chặt", "mùi thơm", "chòm xóm",
      "khom lưng", "vòm lá", "cơm dẻo", "rơm vàng", "sớm mai"
    ],
    "sentences": [
      "Đêm tối, những chú đom đóm thắp sáng lập lòe.",
      "Bé ôm chặt lấy mẹ sau chuyến đi xa về.",
      "Bát cơm gạo mới thơm ngào ngạt hạt dẻo ngon."
    ],
    "passage": {
      "title": "Mùa gặt ở quê",
      "text": "Cánh đồng quê trải rộng một màu rơm vàng óng ả. Các bác nông dân gánh từng bó lúa trĩu bông về làng. Chiều chiều, khói lam chiều bay lên từ mái bếp thơm nồng mùi cơm mới."
    }
  },
  {
    "id": "um",
    "rimes": ["um"],
    "title": "um",
    "bookPage": 42,
    "illustratedWords": [
      { "word": "chùm nho", "image": "🍇" },
      { "word": "cây um tùm", "image": "🌳" },
      { "word": "chum nước", "image": "🏺" },
      { "word": "túm tóc", "image": "👧" }
    ],
    "practiceWords": [
      "tùm lum", "chùm bóng", "chum sành", "um tùm",
      "mũm mĩm", "túm tụm", "trùm khăn", "xum xuê"
    ],
    "sentences": [
      "Chùm nho tím mọng nước trên giàn cây.",
      "Vườn cây ăn trái tốt tươi um tùm che mát sân nhà.",
      "Bé có khuôn mặt tròn trĩnh và đôi má phúng phính."
    ]
  },
  {
    "id": "at_at_at",
    "rimes": ["at", "ăt", "ât"],
    "title": "at - ăt - ât",
    "bookPage": 44,
    "illustratedWords": [
      { "word": "bãi cát", "image": "🏖️" },
      { "word": "mặt trời", "image": "☀️" },
      { "word": "mật ong", "image": "🍯" },
      { "word": "đôi tất", "image": "🧦" }
    ],
    "practiceWords": [
      "bắt tay", "hát ca", "mặt trăng", "thật thà", "đất cát",
      "chật chội", "lật đật", "gặt lúa", "mát mẻ", "thân mật"
    ],
    "sentences": [
      "Ánh mặt trời rực rỡ chiếu sáng bãi cát vàng.",
      "Bé thật thà và chăm chỉ nên ai cũng quý mến.",
      "Chú lật đật lắc lư trông thật ngộ nghĩnh."
    ],
    "passage": {
      "title": "Bình minh trên biển",
      "text": "Từ phía chân trời xa, mặt trời đỏ ửng từ từ nhô lên. Sóng biển vỗ rì rào vào bãi cát trắng mịn màng. Bé cùng bố mẹ đi dạo hít thở bầu không khí mát lành của biển cả."
    }
  },
  {
    "id": "ac_ac_ac",
    "rimes": ["ac", "ăc", "âc"],
    "title": "ac - ăc - âc",
    "bookPage": 51,
    "illustratedWords": [
      { "word": "con hạc", "image": "🦢" },
      { "word": "mắc áo", "image": "🧥" },
      { "word": "bậc thang", "image": "🪜" },
      { "word": "quả gấc", "image": "🍈" }
    ],
    "practiceWords": [
      "màu sắc", "bác sĩ", "lắc rắc", "bậc thềm", "nhấc chân",
      "ngơ ngác", "giấc ngủ", "xôi gấc", "róc rách", "đặc sắc"
    ],
    "sentences": [
      "Bác sĩ khám bệnh nhẹ nhàng và tận tình cho bé.",
      "Bé bước từng bậc thang cẩn thận không vội vã.",
      "Mẹ nấu đĩa xôi gấc có màu đỏ tươi rất bắt mắt."
    ]
  },
  {
    "id": "ang_ang_ang",
    "rimes": ["ang", "ăng", "âng"],
    "title": "ang - ăng - âng",
    "bookPage": 58,
    "illustratedWords": [
      { "word": "cái thang", "image": "🪜" },
      { "word": "măng non", "image": "🎍" },
      { "word": "vầng trăng", "image": "🌙" },
      { "word": "ánh sáng", "image": "💡" }
    ],
    "practiceWords": [
      "sáng sớm", "vầng trăng", "tầng lầu", "răng trắng", "làng quê",
      "măng non", "dâng trào", "đàng hoàng", "nhẹ nhàng", "cây bàng"
    ],
    "sentences": [
      "Đêm rằm, vầng trăng tròn vành vạnh chiếu sáng khắp ngõ xóm.",
      "Bé đánh răng sạch sẽ mỗi ngày để có hàm răng trắng bóng.",
      "Cây bàng trước cổng trường tỏa bóng râm mát rượi."
    ]
  },
  {
    "id": "anh_enh_inh",
    "rimes": ["anh", "ênh", "inh"],
    "title": "anh - ênh - inh",
    "bookPage": 56,
    "illustratedWords": [
      { "word": "bức tranh", "image": "🖼️" },
      { "word": "dòng kênh", "image": "🚣" },
      { "word": "máy tính", "image": "💻" },
      { "word": "bánh mì", "image": "🥖" }
    ],
    "practiceWords": [
      "bức tranh", "bập bênh", "thông minh", "bánh chưng", "xanh biếc",
      "chênh vênh", "bình minh", "chân thành", "yên bình", "nghênh đón"
    ],
    "sentences": [
      "Bé vẽ bức tranh phong cảnh đồng quê xanh ngát.",
      "Bé cùng bạn vui chơi bập bênh ở sân trường.",
      "Ánh bình minh rọi sáng rực rỡ muôn nơi."
    ],
    "passage": {
      "title": "Bé vẽ tranh quê hương",
      "text": "Chủ nhật, bé ngồi nắn nót vẽ một bức tranh làng quê thật đẹp. Giữa bức tranh là dòng kênh xanh biếc uốn lượn quanh lũy tre làng. Bố mẹ khen bé vẽ khéo và rất có năng khiếu nghệ thuật."
    }
  }
];

// CẤU TRÚC PHÂN CHIA PHẦN HỌC THEO YÊU CẦU:
// Mỗi Phần gồm đúng 2 HÀNG (Hàng trên & Hàng dưới), mỗi hàng đúng 8 ĐƠN VỊ = 16 đơn vị / Phần
export interface LessonUnitItem {
  id: string; // e.g. 'b', 'c', 'ia', 'ay_ay'
  type: 'consonant' | 'rime';
  label: string; // Tên hiển thị to (ví dụ: b, c, ia, ay - ây)
  subLabel: string; // Tên phụ phát âm/trang sách (ví dụ: "bờ", "Trang 120")
  pageNumber?: number;
  highlightTag?: string; // Ví dụ: "Có truyện", "Vần n", "Vần m"
}

export interface LessonPart {
  id: string; // 'part1', 'part2', 'part3'
  title: string; // 'Phần 1', 'Phần 2', 'Phần 3'
  name: string; // Tên đầy đủ
  description: string;
  badgeColor: string;
  row1: LessonUnitItem[]; // Đúng 8 đơn vị
  row2: LessonUnitItem[]; // Đúng 8 đơn vị
}

export const LESSON_PARTS: LessonPart[] = [
  {
    id: 'part1',
    title: 'Phần 1',
    name: 'Phần 1: 16 Phụ Âm Đầu Tiên',
    description: 'Tập đánh vần và luyện đọc 16 phụ âm đầu (Trang 5 - 20 sách Hà Nội)',
    badgeColor: 'sky',
    // Hàng Trên: Đúng 8 đơn vị (1 - 8)
    row1: [
      { id: 'b', type: 'consonant', label: 'b', subLabel: 'bờ', pageNumber: 5 },
      { id: 'c', type: 'consonant', label: 'c', subLabel: 'cờ', pageNumber: 6 },
      { id: 'd', type: 'consonant', label: 'd', subLabel: 'dờ', pageNumber: 7 },
      { id: 'đ', type: 'consonant', label: 'đ', subLabel: 'đờ', pageNumber: 8 },
      { id: 'g', type: 'consonant', label: 'g', subLabel: 'gờ đơn', pageNumber: 9 },
      { id: 'gh', type: 'consonant', label: 'gh', subLabel: 'gờ kép', pageNumber: 10 },
      { id: 'gi', type: 'consonant', label: 'gi', subLabel: 'gi', pageNumber: 11 },
      { id: 'h', type: 'consonant', label: 'h', subLabel: 'hờ', pageNumber: 12 },
    ],
    // Hàng Dưới: Đúng 8 đơn vị (9 - 16)
    row2: [
      { id: 'k', type: 'consonant', label: 'k', subLabel: 'ca', pageNumber: 13 },
      { id: 'kh', type: 'consonant', label: 'kh', subLabel: 'khờ', pageNumber: 14 },
      { id: 'l', type: 'consonant', label: 'l', subLabel: 'lờ', pageNumber: 15 },
      { id: 'm', type: 'consonant', label: 'm', subLabel: 'mờ', pageNumber: 16 },
      { id: 'n', type: 'consonant', label: 'n', subLabel: 'nờ', pageNumber: 17 },
      { id: 'ng', type: 'consonant', label: 'ng', subLabel: 'ngờ đơn', pageNumber: 18 },
      { id: 'ngh', type: 'consonant', label: 'ngh', subLabel: 'ngờ kép', pageNumber: 19 },
      { id: 'nh', type: 'consonant', label: 'nh', subLabel: 'nhờ', pageNumber: 20 },
    ],
  },
  {
    id: 'part2',
    title: 'Phần 2',
    name: 'Phần 2: 11 Phụ Âm Tiếp Theo & 5 Vần Đôi Cơ Bản',
    description: '11 phụ âm tiếp theo (Trang 21-31) và 5 nhóm vần đôi cơ bản (Trang 115-119)',
    badgeColor: 'emerald',
    // Hàng Trên: Đúng 8 đơn vị (1 - 8)
    row1: [
      { id: 'p', type: 'consonant', label: 'p', subLabel: 'pờ', pageNumber: 21 },
      { id: 'ph', type: 'consonant', label: 'ph', subLabel: 'phờ', pageNumber: 22 },
      { id: 'qu', type: 'consonant', label: 'qu', subLabel: 'quờ', pageNumber: 23 },
      { id: 'r', type: 'consonant', label: 'r', subLabel: 'rờ', pageNumber: 24 },
      { id: 's', type: 'consonant', label: 's', subLabel: 'sờ', pageNumber: 25 },
      { id: 't', type: 'consonant', label: 't', subLabel: 'tờ', pageNumber: 26 },
      { id: 'th', type: 'consonant', label: 'th', subLabel: 'thờ', pageNumber: 27 },
      { id: 'tr', type: 'consonant', label: 'tr', subLabel: 'trờ', pageNumber: 28 },
    ],
    // Hàng Dưới: Đúng 8 đơn vị (9 - 16)
    row2: [
      { id: 'v', type: 'consonant', label: 'v', subLabel: 'vờ', pageNumber: 29 },
      { id: 'x', type: 'consonant', label: 'x', subLabel: 'xờ', pageNumber: 30 },
      { id: 'ch', type: 'consonant', label: 'ch', subLabel: 'chờ', pageNumber: 31 },
      { id: 'ia', type: 'rime', label: 'ia', subLabel: 'ia' },
      { id: 'ua_ua', type: 'rime', label: 'ua - ưa', subLabel: 'ua, ưa' },
      { id: 'oi_ai', type: 'rime', label: 'oi - ai', subLabel: 'oi, ai' },
      { id: 'oi_oi2', type: 'rime', label: 'ôi - ơi', subLabel: 'ôi, ơi' },
      { id: 'ui_ui', type: 'rime', label: 'ui - ưi', subLabel: 'ui, ưi' },
    ],
  },
  {
    id: 'part3',
    title: 'Phần 3',
    name: 'Phần 3',
    description: 'Truyện kinh điển & các bài ghép âm vần',
    badgeColor: 'amber',
    // Hàng Trên: Đúng 8 đơn vị (1 - 8)
    row1: [
      { id: 'ay_ay', type: 'rime', label: 'ay - ây', subLabel: 'ay, ây' },
      { id: 'eo_ao', type: 'rime', label: 'eo - ao', subLabel: 'eo, ao' },
      { id: 'au_au', type: 'rime', label: 'au - âu', subLabel: 'au, âu' },
      { id: 'iu_eu', type: 'rime', label: 'iu - êu', subLabel: 'iu, êu' },
      { id: 'an_an_an', type: 'rime', label: 'an · ăn · ân', subLabel: 'an, ăn, ân' },
      { id: 'en_en_in', type: 'rime', label: 'en · ên · in', subLabel: 'en, ên, in' },
      { id: 'on_on_on', type: 'rime', label: 'on · ôn · ơn', subLabel: 'on, ôn, ơn' },
      { id: 'un', type: 'rime', label: 'un', subLabel: 'un' },
    ],
    // Hàng Dưới: Đúng 8 đơn vị (9 - 16)
    row2: [
      { id: 'am_am_am', type: 'rime', label: 'am · ăm · âm', subLabel: 'am, ăm, âm' },
      { id: 'em_em_im', type: 'rime', label: 'em · êm · im', subLabel: 'em, êm, im' },
      { id: 'om_om_om', type: 'rime', label: 'om · ôm · ơm', subLabel: 'om, ôm, ơm' },
      { id: 'um', type: 'rime', label: 'um', subLabel: 'um' },
      { id: 'at_at_at', type: 'rime', label: 'at · ăt · ât', subLabel: 'at, ăt, ât' },
      { id: 'ac_ac_ac', type: 'rime', label: 'ac · ăc · âc', subLabel: 'ac, ăc, âc' },
      { id: 'ang_ang_ang', type: 'rime', label: 'ang · ăng · âng', subLabel: 'ang, ăng, âng' },
      { id: 'anh_enh_inh', type: 'rime', label: 'anh · ênh · inh', subLabel: 'anh, ênh, inh' },
    ],
  },
];

