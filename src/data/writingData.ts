/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WritingItem {
  id: string;
  char: string;
  name: string;
  category: 'letter' | 'tone' | 'word';
  description: string;
  strokeCount: number;
  guideSteps: string[];
  sampleImage?: string;
  spellingAudio: string;
}

export const WRITING_ITEMS: WritingItem[] = [
  // 1. 29 CHỮ CÁI TIẾNG VIỆT
  {
    id: 'a',
    char: 'a',
    name: 'Chữ a',
    category: 'letter',
    description: 'Cao 2 ô ly, gồm nét cong kín và nét móc ngược phải',
    strokeCount: 2,
    guideSteps: [
      'Nét 1: Đặt bút dưới đường kẻ 3 một chút, viết nét cong kín từ phải sang trái',
      'Nét 2: Lia bút lên đường kẻ 3, viết nét móc ngược phải sát nét cong kín, dừng bút ở đường kẻ 2'
    ],
    sampleImage: '🅰️',
    spellingAudio: 'chữ a'
  },
  {
    id: 'aw',
    char: 'ă',
    name: 'Chữ ă',
    category: 'letter',
    description: 'Gồm chữ a và nét cong dưới nhỏ ở trên đầu',
    strokeCount: 3,
    guideSteps: [
      'Nét 1 & 2: Viết chữ a như bình thường',
      'Nét 3: Viết nét cong dưới nhỏ (dấu á) nằm cân đối trên đầu con chữ a'
    ],
    sampleImage: '🦆',
    spellingAudio: 'chữ á'
  },
  {
    id: 'aa',
    char: 'â',
    name: 'Chữ â',
    category: 'letter',
    description: 'Gồm chữ a và dấu nón úp ở trên đầu',
    strokeCount: 4,
    guideSteps: [
      'Nét 1 & 2: Viết con chữ a',
      'Nét 3 & 4: Viết nét xiên trái và nét xiên phải tạo thành dấu mũ úp trên đầu'
    ],
    sampleImage: '🦢',
    spellingAudio: 'chữ ớ'
  },
  {
    id: 'b',
    char: 'b',
    name: 'Chữ b',
    category: 'letter',
    description: 'Cao 5 ô ly, gồm nét khuyết trên nối liền nét thắt',
    strokeCount: 1,
    guideSteps: [
      'Đặt bút ở đường kẻ 2, viết nét khuyết trên cao 5 ô ly',
      'Đến gần đường kẻ 3 thì uốn lượn sang trái tạo nét thắt nhỏ, dừng bút gần đường kẻ 3'
    ],
    sampleImage: '🐂',
    spellingAudio: 'chữ bờ'
  },
  {
    id: 'c',
    char: 'c',
    name: 'Chữ c',
    category: 'letter',
    description: 'Cao 2 ô ly, là một nét cong hở phải',
    strokeCount: 1,
    guideSteps: [
      'Đặt bút dưới đường kẻ 3, lượn cong sang trái xuống đường kẻ 1 rồi lượn lên dừng bút ở đường kẻ 2'
    ],
    sampleImage: '🐟',
    spellingAudio: 'chữ cờ'
  },
  {
    id: 'd',
    char: 'd',
    name: 'Chữ d',
    category: 'letter',
    description: 'Cao 4 ô ly, gồm nét cong kín và nét móc ngược phải dài',
    strokeCount: 2,
    guideSteps: [
      'Nét 1: Viết nét cong kín cao 2 ô ly',
      'Nét 2: Lia bút lên đường kẻ 5, viết nét móc ngược phải cao 4 ô ly sát nét cong kín, dừng bút ở đường kẻ 2'
    ],
    sampleImage: '🍈',
    spellingAudio: 'chữ dờ'
  },
  {
    id: 'dd',
    char: 'đ',
    name: 'Chữ đ',
    category: 'letter',
    description: 'Giống chữ d, có thêm nét gạch ngang ngắn ở đường kẻ 4',
    strokeCount: 3,
    guideSteps: [
      'Nét 1 & 2: Viết con chữ d',
      'Nét 3: Lia bút lên đường kẻ 4, viết nét thẳng ngang ngắn cắt ngang thân chữ'
    ],
    sampleImage: '💡',
    spellingAudio: 'chữ đờ'
  },
  {
    id: 'e',
    char: 'e',
    name: 'Chữ e',
    category: 'letter',
    description: 'Cao 2 ô ly, gồm nét thắt kết hợp nét cong hở phải',
    strokeCount: 1,
    guideSteps: [
      'Đặt bút trên đường kẻ 1, viết nét xiên lượn cong sang trái tạo vòng thắt ở giữa đường kẻ 2 và 3, vòng xuống đường kẻ 1 dừng ở đường kẻ 2'
    ],
    sampleImage: '👶',
    spellingAudio: 'chữ e'
  },
  {
    id: 'ee',
    char: 'ê',
    name: 'Chữ ê',
    category: 'letter',
    description: 'Chữ e thêm dấu mũ úp phía trên',
    strokeCount: 3,
    guideSteps: [
      'Nét 1: Viết con chữ e',
      'Nét 2 & 3: Viết dấu nón úp cân đối ngay trên đầu con chữ e'
    ],
    sampleImage: '🍐',
    spellingAudio: 'chữ ê'
  },
  {
    id: 'g',
    char: 'g',
    name: 'Chữ g',
    category: 'letter',
    description: 'Cao 5 ô ly (2 ô trên dòng kẻ đậm, 3 ô dưới dòng kẻ đậm)',
    strokeCount: 2,
    guideSteps: [
      'Nét 1: Viết nét cong kín cao 2 ô ly',
      'Nét 2: Lia bút lên đường kẻ 3, kéo thẳng xuống dưới dòng kẻ đậm 3 ly rồi lượn nét khuyết dưới sang trái'
    ],
    sampleImage: '🐔',
    spellingAudio: 'chữ gờ'
  },
  {
    id: 'h',
    char: 'h',
    name: 'Chữ h',
    category: 'letter',
    description: 'Cao 5 ô ly, gồm nét khuyết trên và nét móc hai đầu',
    strokeCount: 2,
    guideSteps: [
      'Nét 1: Viết nét khuyết trên cao 5 ô ly',
      'Nét 2: Rê bút lên gần đường kẻ 2, viết nét móc hai đầu dừng bút ở đường kẻ 2'
    ],
    sampleImage: '🐯',
    spellingAudio: 'chữ hờ'
  },
  {
    id: 'i',
    char: 'i',
    name: 'Chữ i',
    category: 'letter',
    description: 'Cao 2 ô ly, gồm nét hất, nét móc ngược phải và dấu chấm nhỏ',
    strokeCount: 3,
    guideSteps: [
      'Nét 1: Đặt bút trên đường kẻ 2, viết nét hất lên đường kẻ 3',
      'Nét 2: Kéo thẳng xuống viết nét móc ngược phải, dừng bút ở đường kẻ 2',
      'Nét 3: Chấm một dấu nhỏ trên đầu'
    ],
    sampleImage: '🪡',
    spellingAudio: 'chữ i'
  },
  {
    id: 'k',
    char: 'k',
    name: 'Chữ k',
    category: 'letter',
    description: 'Cao 5 ô ly, gồm nét khuyết trên và nét thắt giữa',
    strokeCount: 2,
    guideSteps: [
      'Nét 1: Viết nét khuyết trên cao 5 ô ly',
      'Nét 2: Rê bút lên đường kẻ 2 viết nét móc thắt ở giữa rồi lượn xuống dừng bút ở đường kẻ 2'
    ],
    sampleImage: '🍦',
    spellingAudio: 'chữ ca'
  },
  {
    id: 'l',
    char: 'l',
    name: 'Chữ l',
    category: 'letter',
    description: 'Cao 5 ô ly, gồm nét khuyết trên kết hợp móc ngược',
    strokeCount: 1,
    guideSteps: [
      'Đặt bút đường kẻ 2, viết nét khuyết trên cao 5 ô ly nối liền nét móc ngược phải rộng 1 ô ly'
    ],
    sampleImage: '🍃',
    spellingAudio: 'chữ lờ'
  },
  {
    id: 'm',
    char: 'm',
    name: 'Chữ m',
    category: 'letter',
    description: 'Cao 2 ô ly, gồm 1 nét móc xuôi và 2 nét móc hai đầu',
    strokeCount: 3,
    guideSteps: [
      'Nét 1: Đặt bút giữa dòng kẻ 2 và 3, viết nét móc xuôi',
      'Nét 2: Rê bút lên đường kẻ 2 viết nét móc xuôi thứ hai',
      'Nét 3: Viết tiếp nét móc hai đầu dừng ở đường kẻ 2'
    ],
    sampleImage: '🐱',
    spellingAudio: 'chữ mờ'
  },
  {
    id: 'n',
    char: 'n',
    name: 'Chữ n',
    category: 'letter',
    description: 'Cao 2 ô ly, gồm 1 nét móc xuôi và 1 nét móc hai đầu',
    strokeCount: 2,
    guideSteps: [
      'Nét 1: Viết nét móc xuôi rộng 1 ô ly',
      'Nét 2: Rê bút lên đường kẻ 2 viết nét móc hai đầu rộng 1.5 ô ly'
    ],
    sampleImage: '🎀',
    spellingAudio: 'chữ nờ'
  },
  {
    id: 'o',
    char: 'o',
    name: 'Chữ o',
    category: 'letter',
    description: 'Cao 2 ô ly, rộng 1.5 ô ly, là nét cong kín tròn đều',
    strokeCount: 1,
    guideSteps: [
      'Đặt bút dưới đường kẻ 3 một chút, lượn cong sang trái, xuống đường kẻ 1 rồi vòng lên nối kín điểm xuất phát'
    ],
    sampleImage: '🐝',
    spellingAudio: 'chữ o'
  },
  {
    id: 'oo',
    char: 'ô',
    name: 'Chữ ô',
    category: 'letter',
    description: 'Chữ o có thêm dấu mũ úp trên đầu',
    strokeCount: 3,
    guideSteps: [
      'Nét 1: Viết chữ o tròn đều',
      'Nét 2 & 3: Đặt dấu nón úp ngay ngắn trên đầu chữ o'
    ],
    sampleImage: '☂️',
    spellingAudio: 'chữ ô'
  },
  {
    id: 'ow',
    char: 'ơ',
    name: 'Chữ ơ',
    category: 'letter',
    description: 'Chữ o có thêm nét râu nhỏ ở góc trên bên phải',
    strokeCount: 2,
    guideSteps: [
      'Nét 1: Viết chữ o tròn đều',
      'Nét 2: Đặt bút trên đường kẻ 3 viết nét râu cong nhỏ nhắn bên phải đỉnh chữ o'
    ],
    sampleImage: '🚩',
    spellingAudio: 'chữ ơ'
  },
  {
    id: 'p',
    char: 'p',
    name: 'Chữ p',
    category: 'letter',
    description: 'Cao 4 ô ly (2 ô trên và 2 ô dưới đường kẻ đậm)',
    strokeCount: 3,
    guideSteps: [
      'Nét 1: Nét hất từ đường kẻ 2 lên đường kẻ 3',
      'Nét 2: Kéo thẳng xuống dưới 2 ô ly',
      'Nét 3: Rê bút lên viết nét móc hai đầu dừng ở đường kẻ 2'
    ],
    sampleImage: '🪓',
    spellingAudio: 'chữ pờ'
  },
  {
    id: 'q',
    char: 'q',
    name: 'Chữ q',
    category: 'letter',
    description: 'Cao 4 ô ly, gồm nét cong kín và nét thẳng kéo dài xuống dưới',
    strokeCount: 2,
    guideSteps: [
      'Nét 1: Viết nét cong kín cao 2 ô ly',
      'Nét 2: Kéo nét thẳng từ đường kẻ 3 xuống dưới dòng kẻ đậm 2 ô ly'
    ],
    sampleImage: '🎁',
    spellingAudio: 'chữ cu'
  },
  {
    id: 'r',
    char: 'r',
    name: 'Chữ r',
    category: 'letter',
    description: 'Cao hơn 2 ô ly một chút, có nét thắt nhỏ trên đỉnh',
    strokeCount: 1,
    guideSteps: [
      'Đặt bút trên đường kẻ 1, viết nét xiên lên vượt đường kẻ 3, tạo vòng xoắn thắt nhỏ rồi kéo ngang lượn cong xuống'
    ],
    sampleImage: '🐢',
    spellingAudio: 'chữ rờ'
  },
  {
    id: 's',
    char: 's',
    name: 'Chữ s',
    category: 'letter',
    description: 'Cao hơn 2 ô ly một chút, có nét xoắn đỉnh lượn cong',
    strokeCount: 1,
    guideSteps: [
      'Đặt bút đường kẻ 1, viết nét xiên lên trên đường kẻ 3 lượn thắt nhỏ rồi uốn nét cong sang phải về đường kẻ 1'
    ],
    sampleImage: '🦁',
    spellingAudio: 'chữ sờ'
  },
  {
    id: 't',
    char: 't',
    name: 'Chữ t',
    category: 'letter',
    description: 'Cao 3 ô ly, gồm nét hất, nét móc ngược và nét gạch ngang',
    strokeCount: 3,
    guideSteps: [
      'Nét 1: Nét hất từ đường kẻ 2 lên đường kẻ 3',
      'Nét 2: Kéo thẳng từ đường kẻ 4 xuống viết nét móc ngược dừng ở đường kẻ 2',
      'Nét 3: Gạch ngang ngắn ở đường kẻ 3'
    ],
    sampleImage: ' tàu',
    spellingAudio: 'chữ tờ'
  },
  {
    id: 'u',
    char: 'u',
    name: 'Chữ u',
    category: 'letter',
    description: 'Cao 2 ô ly, gồm nét hất, nét móc ngược rộng và nét móc ngược hẹp',
    strokeCount: 3,
    guideSteps: [
      'Nét 1: Nét hất lên đường kẻ 3',
      'Nét 2: Kéo xuống viết nét móc ngược rộng 1.5 ô ly',
      'Nét 3: Viết tiếp nét móc ngược hẹp dừng ở đường kẻ 2'
    ],
    sampleImage: '🧲',
    spellingAudio: 'chữ u'
  },
  {
    id: 'uw',
    char: 'ư',
    name: 'Chữ ư',
    category: 'letter',
    description: 'Chữ u có thêm nét râu nhỏ ở phía trên bên phải',
    strokeCount: 4,
    guideSteps: [
      'Nét 1, 2 & 3: Viết con chữ u',
      'Nét 4: Viết nét râu cong nhỏ ở góc trên bên phải'
    ],
    sampleImage: '🦁',
    spellingAudio: 'chữ ư'
  },
  {
    id: 'v',
    char: 'v',
    name: 'Chữ v',
    category: 'letter',
    description: 'Cao 2 ô ly, gồm nét móc hai đầu lượn đáy tròn thắt nhỏ',
    strokeCount: 1,
    guideSteps: [
      'Đặt bút giữa dòng 2 và 3, viết nét móc xuôi lượn vòng cung đáy rồi đưa lên đường kẻ 3 tạo vòng xoắn thắt nhỏ dừng bút'
    ],
    sampleImage: '🎻',
    spellingAudio: 'chữ vờ'
  },
  {
    id: 'x',
    char: 'x',
    name: 'Chữ x',
    category: 'letter',
    description: 'Cao 2 ô ly, gồm một nét cong hở phải và một nét cong hở trái tựa lưng nhau',
    strokeCount: 2,
    guideSteps: [
      'Nét 1: Viết nét cong hở phải',
      'Nét 2: Đặt bút dưới dòng kẻ 3 viết nét cong hở trái lưng chạm khít nét thứ nhất'
    ],
    sampleImage: '🚲',
    spellingAudio: 'chữ xờ'
  },
  {
    id: 'y',
    char: 'y',
    name: 'Chữ y',
    category: 'letter',
    description: 'Cao 5 ô ly (2 ô trên và 3 ô dưới dòng kẻ đậm)',
    strokeCount: 3,
    guideSteps: [
      'Nét 1: Nét hất lên dòng kẻ 3',
      'Nét 2: Nét móc ngược rộng 1.5 ly',
      'Nét 3: Kéo thẳng xuống dòng dưới 3 ly rồi uốn nét khuyết dưới sang trái'
    ],
    sampleImage: '🩺',
    spellingAudio: 'chữ i dài'
  },

  // 2. 5 DẤU THANH
  {
    id: 'sac',
    char: '´',
    name: 'Dấu sắc',
    category: 'tone',
    description: 'Nét xiên ngắn chếch từ trên phải xuống dưới trái',
    strokeCount: 1,
    guideSteps: ['Đặt bút trên đầu con chữ, kéo một nét xiên phải ngắn nghiêng nhẹ'],
    sampleImage: '↗️',
    spellingAudio: 'dấu sắc'
  },
  {
    id: 'huyen',
    char: '`',
    name: 'Dấu huyền',
    category: 'tone',
    description: 'Nét xiên ngắn chếch từ trên trái xuống dưới phải',
    strokeCount: 1,
    guideSteps: ['Đặt bút trên đầu con chữ, kéo một nét xiên trái ngắn nghiêng nhẹ'],
    sampleImage: '↘️',
    spellingAudio: 'dấu huyền'
  },
  {
    id: 'hoi',
    char: '?',
    name: 'Dấu hỏi',
    category: 'tone',
    description: 'Nét móc cong nhỏ xinh xắn trên đầu con chữ',
    strokeCount: 1,
    guideSteps: ['Viết nét cong nhỏ lượn sang phải rồi móc nhẹ xuống'],
    sampleImage: '❓',
    spellingAudio: 'dấu hỏi'
  },
  {
    id: 'nga',
    char: '~',
    name: 'Dấu ngã',
    category: 'tone',
    description: 'Nét lượn sóng ngang nhỏ trên đầu con chữ',
    strokeCount: 1,
    guideSteps: ['Viết nét lượn sóng mềm mại nằm ngang phía trên con chữ'],
    sampleImage: '〰️',
    spellingAudio: 'dấu ngã'
  },
  {
    id: 'nang',
    char: '.',
    name: 'Dấu nặng',
    category: 'tone',
    description: 'Một dấu chấm tròn đậm nằm dưới con chữ',
    strokeCount: 1,
    guideSteps: ['Chấm một dấu chấm tròn gọn gàng ngay dưới chân con chữ'],
    sampleImage: '⏺️',
    spellingAudio: 'dấu nặng'
  },

  // 3. TỪ ỨNG DỤNG MẪU LỚP 1
  {
    id: 'word_ca',
    char: 'cá',
    name: 'Từ "cá"',
    category: 'word',
    description: 'Nối chữ c với chữ a, đặt dấu sắc trên đầu chữ a',
    strokeCount: 4,
    guideSteps: [
      'Viết chữ c',
      'Đưa nét nối liền sang chữ a',
      'Thêm dấu sắc trên đỉnh chữ a'
    ],
    sampleImage: '🐟',
    spellingAudio: 'cờ - a - ca - sắc - cá'
  },
  {
    id: 'word_bo',
    char: 'bò',
    name: 'Từ "bò"',
    category: 'word',
    description: 'Nối nét thắt chữ b sang chữ o, đặt dấu huyền trên đầu chữ o',
    strokeCount: 3,
    guideSteps: [
      'Viết chữ b cao 5 ô ly',
      'Từ nét thắt đưa sang viết chữ o tròn đều',
      'Thêm dấu huyền trên đầu chữ o'
    ],
    sampleImage: '🐂',
    spellingAudio: 'bờ - o - bo - huyền - bò'
  },
  {
    id: 'word_ga',
    char: 'gà',
    name: 'Từ "gà"',
    category: 'word',
    description: 'Nối nét khuyết dưới của chữ g sang chữ a, đặt dấu huyền trên chữ a',
    strokeCount: 4,
    guideSteps: [
      'Viết chữ g cao 5 ô ly',
      'Nối liền nét sang chữ a',
      'Thêm dấu huyền trên chữ a'
    ],
    sampleImage: '🐔',
    spellingAudio: 'gờ - a - ga - huyền - gà'
  },
  {
    id: 'word_me',
    char: 'mẹ',
    name: 'Từ "mẹ"',
    category: 'word',
    description: 'Nối chữ m sang chữ e, đặt dấu nặng dưới chân chữ e',
    strokeCount: 5,
    guideSteps: [
      'Viết chữ m rộng 5 ô ly',
      'Đưa nét nối sang con chữ e',
      'Chấm dấu nặng dưới chân con chữ e'
    ],
    sampleImage: '👩‍👧',
    spellingAudio: 'mờ - e - me - nặng - mẹ'
  },
  {
    id: 'word_ba',
    char: 'ba',
    name: 'Từ "ba"',
    category: 'word',
    description: 'Nối nét thắt chữ b sang chữ a',
    strokeCount: 3,
    guideSteps: [
      'Viết chữ b cao 5 ô ly',
      'Từ nét thắt lượn vòng sang viết chữ a tròn đều'
    ],
    sampleImage: '👨‍👦',
    spellingAudio: 'bờ - a - ba'
  },
  {
    id: 'word_xe',
    char: 'xe',
    name: 'Từ "xe"',
    category: 'word',
    description: 'Nối con chữ x sang chữ e',
    strokeCount: 3,
    guideSteps: [
      'Viết con chữ x',
      'Nối nét khéo léo sang con chữ e cao 2 ô ly'
    ],
    sampleImage: '🚗',
    spellingAudio: 'xờ - e - xe'
  },
  {
    id: 'word_no',
    char: 'nơ',
    name: 'Từ "nơ"',
    category: 'word',
    description: 'Nối chữ n sang chữ ơ',
    strokeCount: 4,
    guideSteps: [
      'Viết chữ n',
      'Nối sang chữ o và thêm nét râu nhỏ thành ơ'
    ],
    sampleImage: '🎀',
    spellingAudio: 'nờ - ơ - nơ'
  },
  {
    id: 'word_be',
    char: 'bé',
    name: 'Từ "bé"',
    category: 'word',
    description: 'Nối chữ b sang chữ e, thêm dấu sắc trên đầu chữ e',
    strokeCount: 3,
    guideSteps: [
      'Viết chữ b cao 5 ô ly',
      'Nối nét thắt sang chữ e',
      'Đặt dấu sắc trên đầu chữ e'
    ],
    sampleImage: '👶',
    spellingAudio: 'bờ - e - be - sắc - bé'
  }
];
