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
        "Bố bế cả Bi, cả Bo."
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
        "Chị Nga cho bé rổ khế to."
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
        "Bố mẹ cho bé và chị Nga đi nghỉ hè ở hồ Ba Bể.",
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
          "word": "pa-nô",
          "image": "🪧",
          "spellingSteps": [
            "pờ - a - pa",
            "nờ - ô - nô",
            "pa-nô"
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
      practiceWords: ["pi a nô", "pa-nô", "pô xe", "Sa Pa"],
      sceneCaption: 'Pí pa pí pô, bé đi ô tô',
      sentences: [
        "Pí pa pí pô, bé đi ô tô.",
        "Bé và mẹ đi Sa Pa."
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
        "Mẹ cho bé đi sở thú ở thủ đô.",
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
      "text": "Ngày xưa, Hổ nhờ Mèo dạy võ. Mèo thấy Hổ dữ, Mèo chỉ dạy cho Hổ vài thế võ nhỏ để tự vệ. Hổ nghĩ là tài đã cao. Trời tối, Hổ chờ mèo đi qua, nó nhảy ra vồ lấy Mèo. Mèo leo trèo giỏi, leo vèo cái tới cây cao. Rồi Mèo bảo Hổ: \"Meo meo meo meo, ta có võ trèo, ta chưa dạy Hổ\"."
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
      "địu bé",
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
      { "word": "cái bàn", "image": "🪵" },
      { "word": "cái khăn", "image": "🧣" },
      { "word": "cái cân", "image": "⚖️" },
      { "word": "bàn chân", "image": "🦶" }
    ],
    "practiceWords": [
      "nhà sàn", "bàn cờ", "thợ lặn", "bắn bi", "ngăn tủ",
      "sân cỏ", "cần cù", "quả mận", "dặn dò", "cái nhẫn"
    ],
    "sentences": [
      "Bé cẩn thận kê lại cái bàn.",
      "Bố và bé đi dạo ở sân cỏ.",
      "Mẹ đan cho bé cái khăn mới."
    ],
    "passage": {
      "title": "Bé ra sân chơi",
      "text": "Ngày mới, bé ra sân cỏ chơi với bố. Bé đi cẩn thận kẻo ngã. Ở nhà, mẹ đan khăn mới cho bé. Bé vui vẻ, cười tươi với mẹ."
    }
  },
  {
    "id": "en_en_in",
    "rimes": ["en", "ên", "in"],
    "title": "en - ên - in",
    "bookPage": 35,
    "illustratedWords": [
      { "word": "cây nến", "image": "🕯️" },
      { "word": "chú sên", "image": "🐌" },
      { "word": "máy in", "image": "🖨️" },
      { "word": "áo len", "image": "🧶" }
    ],
    "practiceWords": [
      "áo len", "cây nến", "bền bỉ", "tự tin", "mũi tên",
      "chú sên", "thân mến", "tin cậy", "dế mèn", "bàn chân"
    ],
    "sentences": [
      "Bé tự tin chào cô giáo và bè bạn.",
      "Mẹ mua cho bé cái áo len mới.",
      "Tối đến, bố để cây nến ở trên bàn."
    ],
    "passage": {
      "title": "Về quê nội",
      "text": "Mùa hè đến, bé theo mẹ về quê nội. Quê nội có nhà sàn be bé, có cây cầu mới xây. Tối đến, bé quây quần bên bà và mẹ. Bé tự tin nói lời yêu mến bà."
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
      "cái nón", "con thỏ", "cá bơn", "lớn khôn", "sơn màu",
      "hòn sỏi", "bồn hoa", "tròn xoe", "con chồn", "ơn nghĩa"
    ],
    "sentences": [
      "Bé đội cái nón lá mới.",
      "Chú mèo con có đuôi dài, tròn xoe.",
      "Bé lớn khôn nhờ có bố mẹ lo cho."
    ],
    "passage": {
      "title": "Chú cún con",
      "text": "Bé có chú cún con be bé. Chú cún con theo bé ra bồn hoa. Bé lớn khôn, luôn lo cho cún con. Cún con vui vẻ đi theo bé."
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
      { "word": "sợi bún", "image": "🍜" },
      { "word": "vun xới", "image": "🌱" }
    ],
    "practiceWords": [
      "con giun", "áo thun", "dây thun", "sợi bún",
      "mưa phùn", "vun xới", "run run", "bún riêu"
    ],
    "sentences": [
      "Mẹ mua cho bé cái áo thun mới.",
      "Chú giun bò ở sau nhà.",
      "Mẹ mua bún riêu cho cả nhà."
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
      "quả cam", "chăm chỉ", "ấm trà", "cây nấm", "màu xám",
      "tơ tằm", "mầm cây", "can đảm", "chầm chậm", "củ sắn"
    ],
    "sentences": [
      "Bé chăm chỉ rèn chữ mỗi ngày.",
      "Bố pha ấm trà thơm mời bà.",
      "Cây nấm nhỏ nở sau cơn mưa."
    ],
    "passage": {
      "title": "Bé chăm ngoan",
      "text": "Mỗi ban mai, bé ra sân chơi cùng bà và mẹ. Bé chăm chỉ tưới mầm cây nhỏ sau nhà. Mẹ khen bé chăm ngoan, luôn nghe lời bố mẹ. Cả nhà vui vẻ, yêu thương bé nhiều."
    }
  },
  {
    "id": "em_em_im",
    "rimes": ["em", "êm", "im"],
    "title": "em - êm - im",
    "bookPage": 40,
    "illustratedWords": [
      { "word": "que kem", "image": "🍦" },
      { "word": "trời đêm", "image": "🌙" },
      { "word": "con chim", "image": "🐦" },
      { "word": "nệm êm", "image": "🧸" }
    ],
    "practiceWords": [
      "êm ái", "que kem", "tìm tòi", "im re", "mỉm cười",
      "thân mến", "tấm nệm", "trái tim", "chú chim", "chị em"
    ],
    "sentences": [
      "Đàn chim líu lo reo vui trên cây cao.",
      "Mẹ ru bé ngủ trên tấm nệm êm ái.",
      "Bé mỉm cười vui vẻ khi nghe mẹ khen."
    ],
    "passage": {
      "title": "Đàn chim nhỏ",
      "text": "Ban mai, đàn chim nhỏ líu lo reo vui trên cây bưởi. Gió hiu hiu thổi qua khe cửa. Bé ngồi dậy, mỉm cười chào bà và mẹ. Mẹ khen bé chăm chỉ. Bé nằm trên tấm nệm êm ái. Bé yêu mẹ nhiều."
    }
  },
  {
    "id": "om_om_om",
    "rimes": ["om", "ôm", "ơm"],
    "title": "om - ôm - ơm",
    "bookPage": 41,
    "illustratedWords": [
      { "word": "đom đóm", "image": "💡" },
      { "word": "ôm mẹ", "image": "🤗" },
      { "word": "nồi cơm", "image": "🍚" },
      { "word": "bó rơm", "image": "🌾" }
    ],
    "practiceWords": [
      "bữa cơm", "đom đóm", "chó đốm", "mùi thơm", "chòm xóm",
      "tôm khô", "vòm lá", "cơm dẻo", "rơm khô", "sớm mai"
    ],
    "sentences": [
      "Đêm tối, đàn đom đóm bay đi tìm bạn bè.",
      "Bé ôm mẹ, thơm lên má mẹ.",
      "Nồi cơm mới mẹ nấu dẻo và thơm ngon."
    ],
    "passage": {
      "title": "Bữa cơm tối",
      "text": "Chiều về, mẹ nấu nồi cơm mới thơm dẻo. Bé lon ton kê lại cái bàn ăn. Cả nhà quây quần bên mâm cơm vui vẻ. Bé ăn no nê, mỉm cười khen mẹ nấu khéo. Tối đến, đàn đom đóm bay rộn rã ngoài sân."
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
      { "word": "chum to", "image": "🏺" },
      { "word": "túm tụm", "image": "👧" }
    ],
    "practiceWords": [
      "tùm lum", "chùm nho", "chum to", "um tùm",
      "mũm mĩm", "túm tụm", "trùm khăn", "xum xuê"
    ],
    "sentences": [
      "Cây sau nhà có chùm nho to và thơm.",
      "Cây bưởi sau nhà lá um tùm che cả sân cỏ.",
      "Em bé có đôi má mũm mĩm, mẹ yêu bé nhiều."
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
      { "word": "hạt dưa", "image": "🍉" },
      { "word": "đôi tất", "image": "🧦" }
    ],
    "practiceWords": [
      "bắt tay", "hát ca", "mặt trời", "thật thà", "đất cát",
      "chật chội", "lật đật", "gặt lúa", "mát mẻ", "thân mật"
    ],
    "sentences": [
      "Mặt trời nhô lên trên bãi cát.",
      "Bé thật thà và chăm chỉ, bà và mẹ yêu mến bé.",
      "Bé chơi với chú lật đật thật vui."
    ],
    "passage": {
      "title": "Bé đi dạo trên bãi cát",
      "text": "Sớm mai, mặt trời từ từ nhô lên trên bãi cát. Gió thổi mát mẻ. Bé đi dạo với bố mẹ. Bé cúi nhặt hòn sỏi be bé. Bé tươi cười, mỉm cười thật vui."
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
      { "word": "bậc thềm", "image": "🪜" },
      { "word": "quả gấc", "image": "🍈" }
    ],
    "practiceWords": [
      "màu sắc", "bác sĩ", "lắc rắc", "bậc thềm", "nhấc chân",
      "ngơ ngác", "giấc ngủ", "xôi gấc", "lạc đà", "đặc sắc"
    ],
    "sentences": [
      "Bác sĩ xem cho bé rất ân cần.",
      "Bé đi lên mỗi bậc thềm thật cẩn thận.",
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
      { "word": "cây bàng", "image": "🌳" }
    ],
    "practiceWords": [
      "sáng sớm", "vầng trăng", "tầng lầu", "răng trắng", "làng quê",
      "măng non", "dâng trào", "bến cảng", "nhẹ nhàng", "cây bàng"
    ],
    "sentences": [
      "Đêm rằm, vầng trăng tròn soi sáng trên xóm làng.",
      "Mẹ ru bé ngủ, ngoài sân vầng trăng sáng ngời.",
      "Cây bàng to ở đầu làng che râm cả sân nhà."
    ]
  },
  {
    "id": "anh_enh_inh",
    "rimes": ["anh", "ênh", "inh"],
    "title": "anh - ênh - inh",
    "bookPage": 56,
    "illustratedWords": [
      { "word": "tranh vẽ", "image": "🖼️" },
      { "word": "dòng kênh", "image": "🚣" },
      { "word": "máy tính", "image": "💻" },
      { "word": "bánh mì", "image": "🥖" }
    ],
    "practiceWords": [
      "tranh vẽ", "thông minh", "chênh vênh", "bánh chưng", "xanh tươi",
      "chân thành", "bình minh", "yên bình", "nghênh đón", "nhà tranh"
    ],
    "sentences": [
      "Bé vẽ tranh phong cảnh đồng quê xanh tươi.",
      "Bé cùng bạn vui chơi ở sân nhà.",
      "Ánh bình minh rọi sáng trên xóm làng."
    ],
    "passage": {
      "title": "Bé vẽ tranh quê nhà",
      "text": "Chiều hè, bé chăm chỉ vẽ tranh quê nhà. Tranh có dòng kênh xanh soi bóng lũy tre làng. Xa xa là cánh đồng lúa chín vàng. Bố mẹ nhìn tranh, mỉm cười khen bé vẽ khéo."
    }
  },
  {
    "id": "uu_uou",
    "rimes": ["ưu", "ươu"],
    "title": "ưu - ươu",
    "bookPage": 110,
    "illustratedWords": [
      { "word": "chú hươu", "image": "🦌" },
      { "word": "quả lựu", "image": "🍎" },
      { "word": "chú khướu", "image": "🐦" },
      { "word": "bươu đầu", "image": "🩹" }
    ],
    "practiceWords": ["chú hươu", "chú khướu", "mưu trí", "mưu mẹo", "bươu đầu", "lựu đỏ"],
    "sentences": [
      "Chú hươu sao đi theo mẹ.",
      "Bé chia quả lựu cho chị Nga.",
      "Chú khướu kêu líu lo ở cây cao."
    ],
    "passage": {
      "title": "Chú hươu sao",
      "text": "Ở bãi cỏ xa, có chú hươu sao đi theo mẹ. Chú hươu sao có bộ da màu nâu be bé. Chú khướu ở cây cao kêu líu lo chào chú hươu sao. Chú hươu sao vui vẻ đi dạo với mẹ."
    }
  },
  {
    "id": "oai_oay",
    "rimes": ["oai", "oay"],
    "title": "oai - oay",
    "bookPage": 111,
    "illustratedWords": [
      { "word": "củ khoai", "image": "🍠" },
      { "word": "quả xoài", "image": "🥭" },
      { "word": "loay hoay", "image": "⚙️" },
      { "word": "khoai sọ", "image": "🥔" }
    ],
    "practiceWords": ["củ khoai", "quả xoài", "khoai sọ", "khoái chí", "loay hoay", "xoay đều"],
    "sentences": [
      "Mẹ đi chợ mua quả xoài, củ khoai cho bé.",
      "Bé loay hoay lau đôi giày mới.",
      "Gió thổi, lá cây chao đảo qua lại."
    ]
  },
  {
    "id": "uoi_uoi",
    "rimes": ["uôi", "ươi"],
    "title": "uôi - ươi",
    "bookPage": 112,
    "illustratedWords": [
      { "word": "nải chuối", "image": "🍌" },
      { "word": "bờ suối", "image": "🏞️" },
      { "word": "quả bưởi", "image": "🍈" },
      { "word": "nụ cười", "image": "😊" }
    ],
    "practiceWords": ["nải chuối", "bờ suối", "quả bưởi", "tươi cười", "người nhà", "buổi trưa", "tưới rau"],
    "sentences": [
      "Mẹ mua nải chuối to cho cả nhà.",
      "Bé tưới rau sau nhà với bà nội.",
      "Bé tươi cười, vui vẻ chào cô giáo."
    ],
    "passage": {
      "title": "Buổi trưa ở quê",
      "text": "Buổi trưa hè, bé theo mẹ ra bờ suối. Bờ suối có bãi cỏ tươi, có cây bưởi có quả to. Bé ngồi dưới cây cao, chia chuối cho mẹ. Mẹ và bé tươi cười vui vẻ."
    }
  },
  {
    "id": "uay_uya",
    "rimes": ["uây", "uya"],
    "title": "uây - uya",
    "bookPage": 113,
    "illustratedWords": [
      { "word": "khuấy đều", "image": "🥄" },
      { "word": "trời khuya", "image": "🌙" },
      { "word": "quây tụ", "image": "👨‍👩‍👦" },
      { "word": "múa gậy", "image": "🥋" }
    ],
    "practiceWords": ["khuấy đều", "trời khuya", "quây tụ", "khuya lơ", "múa may"],
    "sentences": [
      "Trời khuya, bà và mẹ chưa ngủ.",
      "Mẹ khuấy đều cháo cho bé.",
      "Cả nhà quây lại thổi xôi."
    ]
  },
  {
    "id": "ieu_yeu",
    "rimes": ["iêu", "yêu"],
    "title": "iêu - yêu",
    "bookPage": 114,
    "illustratedWords": [
      { "word": "thả diều", "image": "🪁" },
      { "word": "yêu quý", "image": "❤️" },
      { "word": "cái niêu", "image": "🍲" },
      { "word": "buổi chiều", "image": "🌅" }
    ],
    "practiceWords": ["thả diều", "buổi chiều", "yêu quý", "yêu mẹ", "cá kho niêu", "nhiều quả"],
    "sentences": [
      "Buổi chiều, bé ra bãi cỏ thả diều.",
      "Bé yêu quý bố mẹ và bà nội.",
      "Cây bưởi sau nhà có nhiều quả to."
    ],
    "passage": {
      "title": "Cánh diều buổi chiều",
      "text": "Buổi chiều hè, bé theo chị ra bãi cỏ. Chị cho bé thả diều. Gió thổi, diều bay cao ở bầu trời. Bé vui quá, bé yêu quý chị nhiều."
    }
  },
  {
    "id": "oa_oe",
    "rimes": ["oa", "oe"],
    "title": "oa - oe",
    "bookPage": 115,
    "illustratedWords": [
      { "word": "nụ hoa", "image": "🌸" },
      { "word": "hoa đào", "image": "🌺" },
      { "word": "hoa mai", "image": "🌼" },
      { "word": "bé khỏe", "image": "💪" }
    ],
    "practiceWords": ["nụ hoa", "hoa mai", "hoa đào", "đỏ hoe", "bé khỏe", "khoa cử"],
    "sentences": [
      "Nhà bà có cây hoa đào, hoa mai nở rộ.",
      "Bé đi bộ nhiều cho khỏe.",
      "Mẹ mua cho bé cái áo hoa mới."
    ]
  },
  {
    "id": "ue_uo",
    "rimes": ["uê", "uơ"],
    "title": "uê - uơ",
    "bookPage": 116,
    "illustratedWords": [
      { "word": "hoa huệ", "image": "🌺" },
      { "word": "thuở xưa", "image": "📜" },
      { "word": "khua tay", "image": "👋" },
      { "word": "huệ đỏ", "image": "🌹" }
    ],
    "practiceWords": ["hoa huệ", "thuở nhỏ", "khua tay", "chú hề", "huệ đỏ"],
    "sentences": [
      "Nhà bà có cây hoa huệ nở hoa.",
      "Thuở nhỏ, bà ru bé ngủ trưa.",
      "Bé khua tay chào bố mẹ."
    ]
  },
  {
    "id": "uy_uy",
    "rimes": ["uy", "uya"],
    "title": "uy - uya",
    "bookPage": 117,
    "illustratedWords": [
      { "word": "tàu thủy", "image": "🚢" },
      { "word": "lũy tre", "image": "🎋" },
      { "word": "khuy áo", "image": "🔘" },
      { "word": "trời khuya", "image": "🌃" }
    ],
    "practiceWords": ["tàu thủy", "lũy tre", "khuy áo", "nguy cơ", "chỉ huy", "trời khuya"],
    "sentences": [
      "Lũy tre rì rào ở bờ đê.",
      "Bố cho bé đi tàu thủy.",
      "Bé tự cài khuy áo mới."
    ]
  },
  {
    "id": "uo_uo2",
    "rimes": ["uô", "ươ"],
    "title": "uô - ươ",
    "bookPage": 118,
    "illustratedWords": [
      { "word": "ngọn đuốc", "image": "🔥" },
      { "word": "chú hươu", "image": "🦌" },
      { "word": "bờ suối", "image": "🏞️" },
      { "word": "thước kẻ", "image": "📏" }
    ],
    "practiceWords": ["ngọn đuốc", "bó đuốc", "chú hươu", "thước kẻ", "bờ suối", "quả bưởi", "nải chuối", "vườn hoa"],
    "sentences": [
      "Mẹ mua nải chuối và quả bưởi to.",
      "Bé cầm thước kẻ vẽ hình ngôi nhà.",
      "Bên bờ suối mát, chú hươu sao thong thả đi dạo."
    ],
    "passage": {
      "title": "Buổi trưa ở quê",
      "text": "Buổi trưa hè ở quê thật êm đềm. Gió mát thổi qua vườn hoa ngát hương. Bên bờ suối, chú hươu sao tung tăng vui đùa. Bé ngồi dưới gốc cây bưởi, tươi cười ăn chuối cùng mẹ."
    }
  },
  {
    "id": "oeo",
    "rimes": ["oeo", "oay"],
    "title": "oeo - oay",
    "bookPage": 119,
    "illustratedWords": [
      { "word": "loay hoay", "image": "⚙️" },
      { "word": "xoay đều", "image": "🔄" },
      { "word": "chú mèo", "image": "🐱" },
      { "word": "mèo leo", "image": "🐾" }
    ],
    "practiceWords": ["loay hoay", "xoay đều", "khoái chí", "chú mèo", "mèo leo"],
    "sentences": [
      "Bé loay hoay lau đôi giày mới.",
      "Chú mèo leo trèo ở cây cau.",
      "Gió thổi làm lá cây xoay đều."
    ]
  },
  {
    "id": "on_tieu_hoc",
    "rimes": ["ia", "ua", "ưa"],
    "title": "ia - ua - ưa",
    "bookPage": 120,
    "illustratedWords": [
      { "word": "lá mía", "image": "🎋" },
      { "word": "cà chua", "image": "🍅" },
      { "word": "quả dừa", "image": "🥥" },
      { "word": "chia quà", "image": "🎁" }
    ],
    "practiceWords": ["lá mía", "cà chua", "quả dừa", "chia quà", "ngựa gỗ", "mưa rào"],
    "sentences": [
      "Mẹ đi chợ mua mía, mua quả dừa to.",
      "Bé chia cà chua cho chị Nga.",
      "Bố và mẹ cho bé cưỡi ngựa gỗ."
    ]
  },
  {
    "id": "on_nguyen_am",
    "rimes": ["ai", "ay", "ây"],
    "title": "ai - ay - ây",
    "bookPage": 121,
    "illustratedWords": [
      { "word": "hoa mai", "image": "🌼" },
      { "word": "máy bay", "image": "✈️" },
      { "word": "cây cối", "image": "🌳" },
      { "word": "đôi tay", "image": "✋" }
    ],
    "practiceWords": ["hoa mai", "máy bay", "thầy cô", "đôi tay", "ngày mai", "xây nhà"],
    "sentences": [
      "Bé có đôi tay khéo léo.",
      "Hoa mai nở rộ đón ngày vui.",
      "Ngày mai, bố cho bé đi máy bay."
    ]
  },
  {
    "id": "eng_ieng",
    "rimes": ["eng", "iêng"],
    "title": "eng - iêng",
    "bookPage": 60,
    "illustratedWords": [
      { "word": "cái kẻng", "image": "🔔" },
      { "word": "sầu riêng", "image": "🍈" },
      { "word": "xà beng", "image": "⛏️" },
      { "word": "cái chiêng", "image": "🥁" }
    ],
    "practiceWords": ["cái kẻng", "sầu riêng", "tiếng chiêng", "xà beng", "láng giềng", "êng ễnh"],
    "sentences": [
      "Tiếng kẻng vang lên rộn rã ở xóm làng.",
      "Quả sầu riêng chín thơm lan tỏa cả gian nhà.",
      "Bà con láng giềng luôn thân mến bên nhau."
    ]
  },
  {
    "id": "ong_ong",
    "rimes": ["ong", "ông"],
    "title": "ong - ông",
    "bookPage": 61,
    "illustratedWords": [
      { "word": "con ong", "image": "🐝" },
      { "word": "bông hồng", "image": "🌹" },
      { "word": "cái võng", "image": "🪢" },
      { "word": "dòng sông", "image": "🌊" }
    ],
    "practiceWords": ["con ong", "bông hoa", "dòng sông", "cái võng", "trồng cây", "cầu vồng"],
    "sentences": [
      "Đàn ong chăm chỉ bay qua bay lại bên bông hoa.",
      "Dòng sông êm đềm trôi nhẹ qua xóm làng.",
      "Bé nằm trên cái võng nghe bà ru êm ái."
    ],
    "passage": {
      "title": "Chú ong chăm chỉ",
      "text": "Sớm mai, nắng vàng rọi sáng cả xóm làng. Đàn ong chăm chỉ bay đi tìm bông hoa tươi. Ong bay từ bông hoa này sang bông hoa kia. Bé ngồi bên cái võng, nhìn đàn ong bay và khen chú ong chăm chỉ."
    }
  },
  {
    "id": "ung_ung",
    "rimes": ["ung", "ưng"],
    "title": "ung - ưng",
    "bookPage": 62,
    "illustratedWords": [
      { "word": "khủng long", "image": "🦖" },
      { "word": "cây sung", "image": "🌳" },
      { "word": "chim ưng", "image": "🦅" },
      { "word": "bừng sáng", "image": "☀️" }
    ],
    "practiceWords": ["khủng long", "cây sung", "chim ưng", "tưng bừng", "vui mừng", "rừng cây"],
    "sentences": [
      "Ngày hội ở quê em tưng bừng, rộn rã trên xóm làng.",
      "Chú chim ưng to lớn bay cao trên bầu trời.",
      "Cả nhà vui mừng chào đón tin vui."
    ]
  },
  {
    "id": "oang_oang",
    "rimes": ["oang", "oăng"],
    "title": "oang - oăng",
    "bookPage": 64,
    "illustratedWords": [
      { "word": "khoang tàu", "image": "🚢" },
      { "word": "vỡ toang", "image": "💥" },
      { "word": "dài ngoẵng", "image": "📏" },
      { "word": "áo choàng", "image": "🧥" }
    ],
    "practiceWords": ["khoang tàu", "oang oang", "dài ngoẵng", "áo choàng", "sáng loáng"],
    "sentences": [
      "Bé ngồi trong khoang tàu nhìn ra dòng sông bao la.",
      "Tiếng cười nói rộn rã oang oang ở sân nhà.",
      "Cái bàn của bé lau chùi sáng loáng."
    ]
  },
  {
    "id": "uong_uong",
    "rimes": ["uông", "ương"],
    "title": "uông - ương",
    "bookPage": 65,
    "illustratedWords": [
      { "word": "chuông gió", "image": "🎐" },
      { "word": "con mương", "image": "🏞️" },
      { "word": "ruộng lúa", "image": "🌾" },
      { "word": "con vượn", "image": "🐒" }
    ],
    "practiceWords": ["tiếng chuông", "con đường", "bờ tường", "dòng mương", "quê hương", "yêu thương"],
    "sentences": [
      "Tiếng chuông ngân nga êm đềm khi chiều về.",
      "Con đường về làng quanh co bên dòng mương.",
      "Bé mãi yêu thương quê hương làng xóm."
    ],
    "passage": {
      "title": "Quê hương yêu dấu",
      "text": "Quê hương em có dòng sông xanh trong, có con đường quanh co bên lũy tre. Chiều chiều, tiếng chuông chùa ngân vang êm đềm. Khói lam chiều bay lên trên mái nhà. Em yêu quê hương em nhiều."
    }
  },
  {
    "id": "ieng_yeng",
    "rimes": ["iêng", "yểng"],
    "title": "iêng - yểng",
    "bookPage": 66,
    "illustratedWords": [
      { "word": "chim yểng", "image": "🦜" },
      { "word": "tiếng chiêng", "image": "🥁" },
      { "word": "sầu riêng", "image": "🍈" },
      { "word": "giếng khơi", "image": "🪣" }
    ],
    "practiceWords": ["chim yểng", "tiếng chiêng", "giếng làng", "riêng tư", "nghiêng nghiêng"],
    "sentences": [
      "Chú chim yểng líu lo reo ca vang xa.",
      "Bên bờ giếng khơi, bà và mẹ quây quần chia quà cho bé.",
      "Cành hoa nghiêng nghiêng soi bóng bên dòng sông xanh."
    ]
  },
  {
    "id": "et_et_it",
    "rimes": ["et", "êt", "it"],
    "title": "et - êt - it",
    "bookPage": 46,
    "illustratedWords": [
      { "word": "con vẹt", "image": "🦜" },
      { "word": "bánh tét", "image": "🫔" },
      { "word": "trái mít", "image": "🍈" },
      { "word": "dệt vải", "image": "🧵" }
    ],
    "practiceWords": ["con vẹt", "dệt vải", "trái mít", "bánh tét", "bền chặt", "vui tết"],
    "sentences": [
      "Chú vẹt có mỏ đỏ, biết nhại tiếng người thật vui.",
      "Mẹ bổ quả mít mật thơm ngon cho bé.",
      "Cả nhà quây quần gói bánh tét đón Tết."
    ]
  },
  {
    "id": "ot_ot_ot",
    "rimes": ["ot", "ôt", "ơt"],
    "title": "ot - ôt - ơt",
    "bookPage": 47,
    "illustratedWords": [
      { "word": "quả nhót", "image": "🍒" },
      { "word": "cột cờ", "image": "🚩" },
      { "word": "trái ớt", "image": "🌶️" },
      { "word": "cái chốt", "image": "🔒" }
    ],
    "practiceWords": ["quả nhót", "cột cờ", "quả ớt", "chốt cửa", "thơm ngọt", "tốt bụng"],
    "sentences": [
      "Quả nhót chín đỏ, chua chua ngọt ngọt.",
      "Lá cờ đỏ sao vàng bay trên đỉnh cột cờ.",
      "Bé chăm chỉ, tốt bụng, cô giáo yêu mến bé."
    ]
  },
  {
    "id": "ut_ut",
    "rimes": ["ut", "ưt"],
    "title": "ut - ưt",
    "bookPage": 48,
    "illustratedWords": [
      { "word": "cây bút", "image": "✏️" },
      { "word": "mứt tết", "image": "🍬" },
      { "word": "hút sữa", "image": "🥤" },
      { "word": "sút bóng", "image": "⚽" }
    ],
    "practiceWords": ["cây bút", "hút sữa", "mứt dừa", "mứt gừng", "sút bóng", "bứt rứt"],
    "sentences": [
      "Bé cầm cây bút nắn nót viết từng chữ ngay ngắn.",
      "Bà làm khay mứt dừa ngọt lịm thơm ngon cho ngày Tết.",
      "Bé sút bóng vào khung thành trên sân cỏ."
    ]
  },
  {
    "id": "oc_oc_uc",
    "rimes": ["oc", "ôc", "uc"],
    "title": "oc - ôc - uc",
    "bookPage": 53,
    "illustratedWords": [
      { "word": "con cóc", "image": "🐸" },
      { "word": "con ốc", "image": "🐚" },
      { "word": "bụi trúc", "image": "🎋" },
      { "word": "học bài", "image": "📖" }
    ],
    "practiceWords": ["con cóc", "con ốc", "học chăm", "bụi trúc", "gốc cây", "lộc non"],
    "sentences": [
      "Bé chăm chỉ ngồi vào bàn học bài mỗi tối.",
      "Gốc cây to tỏa bóng mát che cho cả sân nhà.",
      "Bụi trúc xanh tươi reo vui trong gió sớm."
    ]
  },
  {
    "id": "oc_uc2",
    "rimes": ["ơc", "ưc"],
    "title": "ơc - ưc",
    "bookPage": 54,
    "illustratedWords": [
      { "word": "mực nang", "image": "🦑" },
      { "word": "lọ mực", "image": "🖋️" },
      { "word": "thước kẻ", "image": "📏" },
      { "word": "ngực áo", "image": "👕" }
    ],
    "practiceWords": ["mực nang", "lọ mực", "sức khỏe", "ngực áo", "thực phẩm", "mức độ"],
    "sentences": [
      "Bé giữ gìn lọ mực cẩn thận không để vương ra vở.",
      "Tập thể dục mỗi ngày giúp bé có sức khỏe dẻo dai.",
      "Mẹ nấu món canh mực nang thanh mát, bổ dưỡng."
    ]
  },
  {
    "id": "oac_oac",
    "rimes": ["oac", "oăc"],
    "title": "oac - oăc",
    "bookPage": 55,
    "illustratedWords": [
      { "word": "áo khoác", "image": "🧥" },
      { "word": "ngoặc tay", "image": "🤙" },
      { "word": "dấu ngoặc", "image": "괄" },
      { "word": "xoạc chân", "image": "🤸" }
    ],
    "practiceWords": ["áo khoác", "dấu ngoặc", "ngoắc tay", "xoạc chân", "khoác áo"],
    "sentences": [
      "Trời trở gió lạnh, mẹ khoác chiếc áo ấm cho bé.",
      "Hai bạn ngoắc tay hứa cùng nhau chăm ngoan học giỏi.",
      "Bé khoác chiếc ba lô xinh xắn vui vẻ bước tới trường."
    ]
  },
  {
    "id": "ap_ap_ap",
    "rimes": ["ap", "ăp", "âp"],
    "title": "ap - ăp - âp",
    "bookPage": 68,
    "illustratedWords": [
      { "word": "xe đạp", "image": "🚲" },
      { "word": "cái cặp", "image": "🎒" },
      { "word": "bậc cấp", "image": "🪜" },
      { "word": "tháp rùa", "image": "🏛️" }
    ],
    "practiceWords": ["xe đạp", "chiếc cặp", "ấm áp", "ngăn nắp", "tháp rùa", "tập tành"],
    "sentences": [
      "Bố dạy bé tập đi xe đạp ở sân nhà.",
      "Chiếc cặp sách của bé luôn được sắp xếp ngăn nắp.",
      "Ánh nắng ban mai tỏa hơi ấm áp xuống khắp đất trời."
    ]
  },
  {
    "id": "ep_ep_ip",
    "rimes": ["ep", "êp", "ip"],
    "title": "ep - êp - ip",
    "bookPage": 70,
    "illustratedWords": [
      { "word": "đôi dép", "image": "🩴" },
      { "word": "bếp lửa", "image": "🔥" },
      { "word": "kịp giờ", "image": "⏰" },
      { "word": "xôi nếp", "image": "🍚" }
    ],
    "practiceWords": ["đôi dép", "bếp lửa", "xôi nếp", "kịp giờ", "ngăn nắp", "bắt kịp"],
    "sentences": [
      "Bé xếp đôi dép ngay ngắn trước bậc thềm nhà.",
      "Mùi xôi nếp thơm nồng bốc lên từ gian bếp ấm cúng.",
      "Bé dậy sớm ăn sáng để kịp giờ tới trường."
    ]
  },
  {
    "id": "op_op_op",
    "rimes": ["op", "ôp", "ơp"],
    "title": "op - ôp - ơp",
    "bookPage": 71,
    "illustratedWords": [
      { "word": "hộp quà", "image": "🎁" },
      { "word": "chớp mắt", "image": "👁️" },
      { "word": "lớp học", "image": "🏫" },
      { "word": "tốp ca", "image": "🎤" }
    ],
    "practiceWords": ["hộp quà", "lớp học", "chớp mắt", "hợp tác", "lợp nhà", "tốp ca"],
    "sentences": [
      "Bé nhận được hộp quà sinh nhật thật xinh xắn.",
      "Lớp học của bé khang trang, sạch đẹp và rộn rã tiếng cười.",
      "Đội thiếu nhi cùng nhau hát vang bài ca tốp ca mừng ngày hội."
    ]
  },
  {
    "id": "up",
    "rimes": ["up"],
    "title": "up",
    "bookPage": 72,
    "illustratedWords": [
      { "word": "búp sen", "image": "🪷" },
      { "word": "úp bát", "image": "🥣" },
      { "word": "chụp ảnh", "image": "📷" },
      { "word": "búp bê", "image": "🪆" }
    ],
    "practiceWords": ["búp sen", "úp bát", "chụp ảnh", "búp măng", "giúp đỡ"],
    "sentences": [
      "Những búp sen hồng chúm chím vươn mình đón nắng sớm.",
      "Bố chụp cho cả nhà một bức ảnh kỷ niệm thật đẹp.",
      "Bé ngoan ngoãn luôn biết giúp đỡ bạn bè cùng tiến bộ."
    ]
  },
  {
    "id": "ach_ech_ich",
    "rimes": ["ach", "êch", "ich"],
    "title": "ach - êch - ich",
    "bookPage": 74,
    "illustratedWords": [
      { "word": "cuốn sách", "image": "📕" },
      { "word": "con ếch", "image": "🐸" },
      { "word": "chim chích", "image": "🐦" },
      { "word": "bức vách", "image": "🧱" }
    ],
    "practiceWords": ["cuốn sách", "chú ếch", "chim chích", "sạch sẽ", "du lịch", "túi xách"],
    "sentences": [
      "Bé nâng niu từng trang sách mới thơm mùi mực in.",
      "Chú ếch xanh ngồi trên lá sen cất tiếng ộp oạp.",
      "Giữ gìn vệ sinh sạch sẽ giúp thân thể luôn khỏe mạnh."
    ]
  },
  {
    "id": "oan_oan_oan",
    "rimes": ["oan", "oăn"],
    "title": "oan - oăn",
    "bookPage": 80,
    "illustratedWords": [
      { "word": "bé ngoan", "image": "👧" },
      { "word": "tóc xoăn", "image": "💇" },
      { "word": "đoàn kết", "image": "🤝" },
      { "word": "hoan hô", "image": "👏" }
    ],
    "practiceWords": ["bé ngoan", "tóc xoăn", "hoan hô", "đoàn tàu", "thoăn thoắt", "ngoan ngoãn"],
    "sentences": [
      "Bé luôn vâng lời cha mẹ, xứng đáng là cháu ngoan Bác Hồ.",
      "Bé có mái tóc xoăn bồng bềnh trông rất đáng yêu.",
      "Cả lớp hoan hô nhiệt liệt chúc mừng các bạn đạt điểm mười."
    ]
  },
  {
    "id": "oat_oat",
    "rimes": ["oat", "oăt"],
    "title": "oat - oăt",
    "bookPage": 82,
    "illustratedWords": [
      { "word": "thoăn thoắt", "image": "⚡" },
      { "word": "hoạt hình", "image": "📺" },
      { "word": "nhọn hoắt", "image": "📍" },
      { "word": "lưu loát", "image": "🗣️" }
    ],
    "practiceWords": ["hoạt hình", "thoăn thoắt", "nhọn hoắt", "sinh hoạt", "lưu loát"],
    "sentences": [
      "Đôi tay thoăn thoắt của bà đan từng mũi len êm ái.",
      "Bé chăm chú theo dõi bộ phim hoạt hình vui nhộn.",
      "Bé luyện tập đọc bài thật to, rõ ràng và lưu loát."
    ]
  },
  {
    "id": "uyen_uyet",
    "rimes": ["uyên", "uyêt"],
    "title": "uyên - uyết",
    "bookPage": 86,
    "illustratedWords": [
      { "word": "chim khuyên", "image": "🐦" },
      { "word": "ánh trăng khuyết", "image": "🌙" },
      { "word": "câu chuyện", "image": "📚" },
      { "word": "tuyết trắng", "image": "❄️" }
    ],
    "practiceWords": ["chim khuyên", "vành khuyên", "trăng khuyết", "kể chuyện", "tuyết trắng", "tập duyệt"],
    "sentences": [
      "Chú chim vành khuyên líu lo ca hát đón ánh mặt trời.",
      "Đêm rằm chưa tới, vầng trăng khuyết treo lơ lửng trên bầu trời.",
      "Cô giáo kể câu chuyện cổ tích thật ý nghĩa cho cả lớp nghe."
    ],
    "passage": {
      "title": "Chú chim vành khuyên",
      "text": "Trên cành cây cao, chú chim vành khuyên nhỏ nhắn nhảy nhót chuyền cành. Tiếng hót trong trẻo của chim như lời chào bình minh tươi sáng, đánh thức vạn vật sau giấc ngủ đêm dài."
    }
  }
];

// CẤU TRÚC 5 PHẦN HỌC CHUẨN THỨ TỰ SÁCH GỐC (Trang 5-30, Trang 101-123, Trang 33-98)
// Mỗi Phần gồm đúng 2 HÀNG (Hàng trên & Hàng dưới), mỗi hàng đúng 8 ĐƠN VỊ = 16 đơn vị / Phần
export interface LessonUnitItem {
  id: string; // e.g. 'b', 'c', 'ia', 'ay_ay'
  type: 'consonant' | 'rime';
  label: string; // Tên hiển thị to (ví dụ: b, c, ia, ay - ây, an · ăn · ân)
  subLabel: string; // Tên phụ phát âm/gợi nhớ (ví dụ: "bờ", "Gà gáy", "Bãi cát")
  pageNumber?: number;
}

export interface LessonPart {
  id: string; // 'part1', 'part2', 'part3', 'part4', 'part5'
  title: string; // 'Phần 1', 'Phần 2', ...
  name: string; // Tên đầy đủ
  stageLabel: string; // 'Giai đoạn 1 (Trang 5-30)', 'Giai đoạn 2 (Trang 101-123)', 'Giai đoạn 3 (Trang 33-98)'
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
    stageLabel: 'Giai đoạn 1 (Trang 5 - 20)',
    description: '16 phụ âm đơn cơ bản ghép với 11 nguyên âm và 5 dấu thanh (Trang 5 - 20 sách gốc)',
    badgeColor: 'sky',
    // Hàng Trên: Đúng 8 đơn vị (Trang 5 - 12)
    row1: [
      { id: 'b', type: 'consonant', label: 'b', subLabel: 'bờ', pageNumber: 5 },
      { id: 'c', type: 'consonant', label: 'c', subLabel: 'cờ', pageNumber: 6 },
      { id: 'd', type: 'consonant', label: 'd', subLabel: 'dờ', pageNumber: 7 },
      { id: 'đ', type: 'consonant', label: 'đ', subLabel: 'đờ', pageNumber: 8 },
      { id: 'g', type: 'consonant', label: 'g', subLabel: 'gờ đơn', pageNumber: 9 },
      { id: 'h', type: 'consonant', label: 'h', subLabel: 'hờ', pageNumber: 10 },
      { id: 'k', type: 'consonant', label: 'k', subLabel: 'ca', pageNumber: 11 },
      { id: 'l', type: 'consonant', label: 'l', subLabel: 'lờ', pageNumber: 12 },
    ],
    // Hàng Dưới: Đúng 8 đơn vị (Trang 13 - 20)
    row2: [
      { id: 'm', type: 'consonant', label: 'm', subLabel: 'mờ', pageNumber: 13 },
      { id: 'n', type: 'consonant', label: 'n', subLabel: 'nờ', pageNumber: 14 },
      { id: 'r', type: 'consonant', label: 'r', subLabel: 'rờ', pageNumber: 15 },
      { id: 's', type: 'consonant', label: 's', subLabel: 'sờ', pageNumber: 16 },
      { id: 't', type: 'consonant', label: 't', subLabel: 'tờ', pageNumber: 17 },
      { id: 'v', type: 'consonant', label: 'v', subLabel: 'vờ', pageNumber: 18 },
      { id: 'x', type: 'consonant', label: 'x', subLabel: 'xờ', pageNumber: 19 },
      { id: 'ch', type: 'consonant', label: 'ch', subLabel: 'chờ', pageNumber: 20 },
    ],
  },
  {
    id: 'part2',
    title: 'Phần 2',
    name: 'Phần 2: 11 Phụ Âm Ghép & 5 Vần Đôi Mở Đầu',
    stageLabel: 'Giai đoạn 1 & 2 (Trang 21-30, 47 & 101-105)',
    description: '11 phụ âm ghép (Trang 21-30, 47) và 5 vần đôi mở đầu tiên (Trang 101-105 / 115-119)',
    badgeColor: 'emerald',
    // Hàng Trên: Đúng 8 đơn vị (8 Phụ âm ghép, Trang 21 - 28)
    row1: [
      { id: 'gh', type: 'consonant', label: 'gh', subLabel: 'gờ kép', pageNumber: 21 },
      { id: 'gi', type: 'consonant', label: 'gi', subLabel: 'gi', pageNumber: 22 },
      { id: 'ng', type: 'consonant', label: 'ng', subLabel: 'ngờ đơn', pageNumber: 23 },
      { id: 'nh', type: 'consonant', label: 'nh', subLabel: 'nhờ', pageNumber: 24 },
      { id: 'kh', type: 'consonant', label: 'kh', subLabel: 'khờ', pageNumber: 25 },
      { id: 'ph', type: 'consonant', label: 'ph', subLabel: 'phờ', pageNumber: 26 },
      { id: 'qu', type: 'consonant', label: 'qu', subLabel: 'quờ', pageNumber: 27 },
      { id: 'th', type: 'consonant', label: 'th', subLabel: 'thờ', pageNumber: 28 },
    ],
    // Hàng Dưới: Đúng 8 đơn vị (3 Phụ âm ghép & 5 Vần đôi mở đầu tiên)
    row2: [
      { id: 'tr', type: 'consonant', label: 'tr', subLabel: 'trờ', pageNumber: 29 },
      { id: 'ngh', type: 'consonant', label: 'ngh', subLabel: 'ngờ kép', pageNumber: 30 },
      { id: 'p', type: 'consonant', label: 'p', subLabel: 'pờ', pageNumber: 47 },
      { id: 'ia', type: 'rime', label: 'ia', subLabel: 'ia', pageNumber: 101 },
      { id: 'ua_ua', type: 'rime', label: 'ua - ưa', subLabel: 'ua, ưa', pageNumber: 102 },
      { id: 'oi_ai', type: 'rime', label: 'oi - ai', subLabel: 'oi, ai', pageNumber: 103 },
      { id: 'oi_oi2', type: 'rime', label: 'ôi - ơi', subLabel: 'ôi, ơi', pageNumber: 104 },
      { id: 'ui_ui', type: 'rime', label: 'ui - ưi', subLabel: 'ui, ưi', pageNumber: 105 },
    ],
  },
  {
    id: 'part3',
    title: 'Phần 3',
    name: 'Phần 3: Vần Mở Đôi & Truyện Kinh Điển Gốc',
    stageLabel: 'Giai đoạn 2 (Trang 106 - 123)',
    description: 'Tích hợp vần đôi và truyện kinh điển gốc: Gà Gáy, Mèo Dạy Hổ, Xào Rau, Chạy Thi...',
    badgeColor: 'amber',
    // Hàng Trên: Đúng 8 đơn vị (Trang 106 - 113)
    row1: [
      { id: 'ay_ay', type: 'rime', label: 'ay - ây', subLabel: 'Gà gáy', pageNumber: 106 },
      { id: 'eo_ao', type: 'rime', label: 'eo - ao', subLabel: 'Mèo dạy hổ', pageNumber: 107 },
      { id: 'au_au', type: 'rime', label: 'au - âu', subLabel: 'Xào rau', pageNumber: 108 },
      { id: 'iu_eu', type: 'rime', label: 'iu - êu', subLabel: 'Chạy thi', pageNumber: 109 },
      { id: 'uu_uou', type: 'rime', label: 'ưu - ươu', subLabel: 'Hươu sao', pageNumber: 110 },
      { id: 'oai_oay', type: 'rime', label: 'oai - oay', subLabel: 'Khoai lang', pageNumber: 111 },
      { id: 'uoi_uoi', type: 'rime', label: 'uôi - ươi', subLabel: 'Nải chuối', pageNumber: 112 },
      { id: 'uay_uya', type: 'rime', label: 'uây - uya', subLabel: 'Đêm khuya', pageNumber: 113 },
    ],
    // Hàng Dưới: Đúng 8 đơn vị (Trang 114 - 121)
    row2: [
      { id: 'ieu_yeu', type: 'rime', label: 'iêu - yêu', subLabel: 'Thả diều', pageNumber: 114 },
      { id: 'oa_oe', type: 'rime', label: 'oa - oe', subLabel: 'Bông hoa', pageNumber: 115 },
      { id: 'ue_uo', type: 'rime', label: 'uê - uơ', subLabel: 'Hoa huệ', pageNumber: 116 },
      { id: 'uy_uy', type: 'rime', label: 'uy - uya', subLabel: 'Tàu thủy', pageNumber: 117 },
      { id: 'uo_uo2', type: 'rime', label: 'uô - ươ', subLabel: 'Bó đuốc, chú hươu', pageNumber: 118 },
      { id: 'oeo', type: 'rime', label: 'oeo - oay', subLabel: 'Ngoằn ngoèo', pageNumber: 119 },
      { id: 'on_tieu_hoc', type: 'rime', label: 'ia · ua · ưa', subLabel: 'Ôn tập 1', pageNumber: 120 },
      { id: 'on_nguyen_am', type: 'rime', label: 'ai · ay · ây', subLabel: 'Ôn tập 2', pageNumber: 121 },
    ],
  },
  {
    id: 'part4',
    title: 'Phần 4',
    name: 'Phần 4: Vần Âm Cuối -n, -m, -ng, -nh',
    stageLabel: 'Giai đoạn 3 (Trang 33 - 66)',
    description: 'Các vần khép âm cuối n, m, ng, nh rèn đọc trơn mượt mà (Trang 33 - 66 sách gốc)',
    badgeColor: 'violet',
    // Hàng Trên: Đúng 8 đơn vị (Vần kết thúc bằng n và m)
    row1: [
      { id: 'an_an_an', type: 'rime', label: 'an · ăn · ân', subLabel: 'an, ăn, ân', pageNumber: 34 },
      { id: 'en_en_in', type: 'rime', label: 'en · ên · in', subLabel: 'en, ên, in', pageNumber: 35 },
      { id: 'on_on_on', type: 'rime', label: 'on · ôn · ơn', subLabel: 'on, ôn, ơn', pageNumber: 36 },
      { id: 'un', type: 'rime', label: 'un', subLabel: 'con giun', pageNumber: 37 },
      { id: 'am_am_am', type: 'rime', label: 'am · ăm · âm', subLabel: 'am, ăm, âm', pageNumber: 39 },
      { id: 'em_em_im', type: 'rime', label: 'em · êm · im', subLabel: 'em, êm, im', pageNumber: 40 },
      { id: 'om_om_om', type: 'rime', label: 'om · ôm · ơm', subLabel: 'om, ôm, ơm', pageNumber: 41 },
      { id: 'um', type: 'rime', label: 'um', subLabel: 'chùm nho', pageNumber: 42 },
    ],
    // Hàng Dưới: Đúng 8 đơn vị (Vần kết thúc bằng ng và nh)
    row2: [
      { id: 'ang_ang_ang', type: 'rime', label: 'ang · ăng · âng', subLabel: 'ang, ăng, âng', pageNumber: 58 },
      { id: 'eng_ieng', type: 'rime', label: 'eng · iêng', subLabel: 'kẻng, riêng', pageNumber: 60 },
      { id: 'ong_ong', type: 'rime', label: 'ong · ông', subLabel: 'ong, hồng', pageNumber: 61 },
      { id: 'ung_ung', type: 'rime', label: 'ung · ưng', subLabel: 'sung, ưng', pageNumber: 62 },
      { id: 'anh_enh_inh', type: 'rime', label: 'anh · ênh · inh', subLabel: 'bức tranh', pageNumber: 56 },
      { id: 'oang_oang', type: 'rime', label: 'oang · oăng', subLabel: 'khoang tàu', pageNumber: 64 },
      { id: 'uong_uong', type: 'rime', label: 'uông · ương', subLabel: 'chuông gió', pageNumber: 65 },
      { id: 'ieng_yeng', type: 'rime', label: 'iêng · yểng', subLabel: 'chim yểng', pageNumber: 66 },
    ],
  },
  {
    id: 'part5',
    title: 'Phần 5',
    name: 'Phần 5: Vần Âm Cuối -t, -c, -p, -ch & Vần Phức',
    stageLabel: 'Giai đoạn 3 (Trang 44 - 98)',
    description: 'Các vần khép âm cuối t, c, p, ch và vần phức hợp ba âm tiết (Trang 44 - 98 sách gốc)',
    badgeColor: 'rose',
    // Hàng Trên: Đúng 8 đơn vị (Vần kết thúc bằng t và c)
    row1: [
      { id: 'at_at_at', type: 'rime', label: 'at · ăt · ât', subLabel: 'bãi cát', pageNumber: 44 },
      { id: 'et_et_it', type: 'rime', label: 'et · êt · it', subLabel: 'con vẹt', pageNumber: 46 },
      { id: 'ot_ot_ot', type: 'rime', label: 'ot · ôt · ơt', subLabel: 'quả nhót', pageNumber: 47 },
      { id: 'ut_ut', type: 'rime', label: 'ut · ưt', subLabel: 'cây bút', pageNumber: 48 },
      { id: 'ac_ac_ac', type: 'rime', label: 'ac · ăc · âc', subLabel: 'con hạc', pageNumber: 51 },
      { id: 'oc_oc_uc', type: 'rime', label: 'oc · ôc · uc', subLabel: 'con cóc', pageNumber: 53 },
      { id: 'oc_uc2', type: 'rime', label: 'ơc · ưc', subLabel: 'mực nang', pageNumber: 54 },
      { id: 'oac_oac', type: 'rime', label: 'oac · oăc', subLabel: 'áo khoác', pageNumber: 55 },
    ],
    // Hàng Dưới: Đúng 8 đơn vị (Vần kết thúc bằng p, ch và vần phức)
    row2: [
      { id: 'ap_ap_ap', type: 'rime', label: 'ap · ăp · âp', subLabel: 'xe đạp', pageNumber: 68 },
      { id: 'ep_ep_ip', type: 'rime', label: 'ep · êp · ip', subLabel: 'đôi dép', pageNumber: 70 },
      { id: 'op_op_op', type: 'rime', label: 'op · ôp · ơp', subLabel: 'hộp quà', pageNumber: 71 },
      { id: 'up', type: 'rime', label: 'up', subLabel: 'búp sen', pageNumber: 72 },
      { id: 'ach_ech_ich', type: 'rime', label: 'ach · êch · ich', subLabel: 'cuốn sách', pageNumber: 74 },
      { id: 'oan_oan_oan', type: 'rime', label: 'oan · oăn', subLabel: 'bé ngoan', pageNumber: 80 },
      { id: 'oat_oat', type: 'rime', label: 'oat · oăt', subLabel: 'thoăn thoắt', pageNumber: 82 },
      { id: 'uyen_uyet', type: 'rime', label: 'uyên · uyết', subLabel: 'chim khuyên', pageNumber: 86 },
    ],
  },
];


