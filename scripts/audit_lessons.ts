/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ALPHABET_DATA,
  TONES_DATA,
  VOWELS_WITH_TONES,
  CONSONANT_LESSONS,
  RIME_READING_LESSONS,
  PRACTICE_STORIES,
} from '../src/data/vietnameseData';
import {
  BALLOON_PHONICS_LESSONS,
} from '../src/data/balloonPhonicsData';

interface AuditIssue {
  round: number;
  category: string;
  itemId: string;
  issue: string;
  severity: 'error' | 'warning';
}

function stripTonesOnly(str: string): string {
  return str
    .toLowerCase()
    .replace(/[áàảãạ]/g, 'a')
    .replace(/[ắằẳẵặ]/g, 'ă')
    .replace(/[ấầẩẫậ]/g, 'â')
    .replace(/[éèẻẽẹ]/g, 'e')
    .replace(/[ếềểễệ]/g, 'ê')
    .replace(/[íìỉĩị]/g, 'i')
    .replace(/[óòỏõọ]/g, 'o')
    .replace(/[ốồổỗộ]/g, 'ô')
    .replace(/[ớờởỡợ]/g, 'ơ')
    .replace(/[úùủũụ]/g, 'u')
    .replace(/[ứừửữự]/g, 'ư')
    .replace(/[ýỳỷỹỵ]/g, 'y');
}

function runAuditRound(roundNum: number): AuditIssue[] {
  const issues: AuditIssue[] = [];

  // ==========================================
  // 1. KIỂM TRA BẢNG CHỮ CÁI (ALPHABET_DATA)
  // ==========================================
  ALPHABET_DATA.forEach((item) => {
    if (!item.char || !item.soundName || !item.exampleWord) {
      issues.push({
        round: roundNum,
        category: 'ALPHABET',
        itemId: item.id,
        issue: `Thiếu trường dữ liệu cơ bản (char/soundName/exampleWord)`,
        severity: 'error',
      });
    }
  });

  // ==========================================
  // 2. KIỂM TRA NGUYÊN ÂM VÀ DẤU THANH
  // ==========================================
  VOWELS_WITH_TONES.forEach((vt) => {
    if (!vt.vowel || !Array.isArray(vt.tones) || vt.tones.length !== 6) {
      issues.push({
        round: roundNum,
        category: 'VOWELS_WITH_TONES',
        itemId: vt.vowel,
        issue: `Nguyên âm "${vt.vowel}" không có đủ 6 dấu thanh`,
        severity: 'error',
      });
    }
  });

  // ==========================================
  // 3. KIỂM TRA PHỤ ÂM VÀ QUY TẮC CHÍNH TẢ
  // ==========================================
  CONSONANT_LESSONS.forEach((lesson) => {
    lesson.rows.forEach((row) => {
      const v = row.vowel;
      // c / k
      if (lesson.consonant === 'c' && ['e', 'ê', 'i'].includes(v)) {
        issues.push({
          round: roundNum,
          category: 'SPELLING_RULE',
          itemId: `consonant_${lesson.consonant}_vowel_${v}`,
          issue: `Quy tắc chính tả: "c" không đi với "${v}"`,
          severity: 'error',
        });
      }
      if (lesson.consonant === 'k' && !['e', 'ê', 'i', 'y'].includes(v)) {
        issues.push({
          round: roundNum,
          category: 'SPELLING_RULE',
          itemId: `consonant_${lesson.consonant}_vowel_${v}`,
          issue: `Quy tắc chính tả: "k" chỉ đi với e, ê, i, y`,
          severity: 'error',
        });
      }
      // g / gh
      if (lesson.consonant === 'g' && ['e', 'ê', 'i'].includes(v)) {
        issues.push({
          round: roundNum,
          category: 'SPELLING_RULE',
          itemId: `consonant_${lesson.consonant}_vowel_${v}`,
          issue: `Quy tắc chính tả: "g" không đi với "${v}" (phải dùng "gh")`,
          severity: 'error',
        });
      }
      if (lesson.consonant === 'gh' && !['e', 'ê', 'i'].includes(v)) {
        issues.push({
          round: roundNum,
          category: 'SPELLING_RULE',
          itemId: `consonant_${lesson.consonant}_vowel_${v}`,
          issue: `Quy tắc chính tả: "gh" chỉ đi với e, ê, i`,
          severity: 'error',
        });
      }
      // ng / ngh
      if (lesson.consonant === 'ng' && ['e', 'ê', 'i'].includes(v)) {
        issues.push({
          round: roundNum,
          category: 'SPELLING_RULE',
          itemId: `consonant_${lesson.consonant}_vowel_${v}`,
          issue: `Quy tắc chính tả: "ng" không đi với "${v}" (phải dùng "ngh")`,
          severity: 'error',
        });
      }
      if (lesson.consonant === 'ngh' && !['e', 'ê', 'i'].includes(v)) {
        issues.push({
          round: roundNum,
          category: 'SPELLING_RULE',
          itemId: `consonant_${lesson.consonant}_vowel_${v}`,
          issue: `Quy tắc chính tả: "ngh" chỉ đi với e, ê, i`,
          severity: 'error',
        });
      }
    });
  });

  // ==========================================
  // 4. KIỂM TRA BÀI HỌC VẦN (RIME_READING_LESSONS)
  // ==========================================
  RIME_READING_LESSONS.forEach((lesson) => {
    const normalizedLessonRimes = lesson.rimes.map((r) => stripTonesOnly(r));

    lesson.illustratedWords.forEach((iw) => {
      const strippedWord = stripTonesOnly(iw.word);
      const syllables = strippedWord.split(/\s+/);
      const matched = syllables.some((syl) =>
        normalizedLessonRimes.some((nr) => syl.endsWith(nr) || syl.includes(nr))
      );
      if (!matched) {
        issues.push({
          round: roundNum,
          category: 'RIME_ILLUSTRATION_MISMATCH',
          itemId: `${lesson.id}_${iw.word}`,
          issue: `Từ minh họa "${iw.word}" không khớp bất kỳ vần nào [${normalizedLessonRimes.join(', ')}]`,
          severity: 'warning',
        });
      }
    });

    lesson.practiceWords.forEach((pw) => {
      const strippedWord = stripTonesOnly(pw);
      const syllables = strippedWord.split(/\s+/);
      const matched = syllables.some((syl) =>
        normalizedLessonRimes.some((nr) => syl.endsWith(nr) || syl.includes(nr))
      );
      if (!matched) {
        issues.push({
          round: roundNum,
          category: 'RIME_PRACTICE_MISMATCH',
          itemId: `${lesson.id}_${pw}`,
          issue: `Từ luyện đọc "${pw}" không khớp bất kỳ vần nào [${normalizedLessonRimes.join(', ')}]`,
          severity: 'warning',
        });
      }
    });
  });

  // ==========================================
  // 5. KIỂM TRA BỘ TRÒ CHƠI BONG BÓNG (Ghép vần & Luyện tai tinh)
  // ==========================================
  BALLOON_PHONICS_LESSONS.forEach((item) => {
    // a. Kiểm tra options
    if (!item.options || item.options.length !== 4) {
      issues.push({
        round: roundNum,
        category: 'BALLOON_OPTIONS',
        itemId: item.id,
        issue: `Số lượng lựa chọn bóng bay phải là 4 (hiện tại: ${item.options?.length})`,
        severity: 'error',
      });
    }

    // b. Kiểm tra targetMissing có nằm trong options
    if (!item.options.includes(item.targetMissing)) {
      issues.push({
        round: roundNum,
        category: 'BALLOON_ANSWER_MISSING',
        itemId: item.id,
        issue: `Đáp án đúng "${item.targetMissing}" không nằm trong danh sách lựa chọn: [${item.options.join(', ')}]`,
        severity: 'error',
      });
    }

    // c. Kiểm tra câu hỏi theo loại bài:
    if (item.challengeType === 'blend') {
      if (`${item.prefix}${item.targetMissing}` !== item.fullWord) {
        issues.push({
          round: roundNum,
          category: 'BALLOON_SPELLING_MISMATCH',
          itemId: item.id,
          issue: `prefix "${item.prefix}" + targetMissing "${item.targetMissing}" !== fullWord "${item.fullWord}"`,
          severity: 'error',
        });
      }
    } else if (item.challengeType === 'listen') {
      if (item.targetMissing !== item.fullWord) {
        issues.push({
          round: roundNum,
          category: 'BALLOON_LISTEN_MISMATCH',
          itemId: item.id,
          issue: `targetMissing "${item.targetMissing}" !== fullWord "${item.fullWord}" trong bài luyện tai tinh`,
          severity: 'error',
        });
      }
    }

    // d. Kiểm tra số trang sách hợp lệ
    if (!item.pageNumber || item.pageNumber <= 0) {
      issues.push({
        round: roundNum,
        category: 'BALLOON_PAGE_INVALID',
        itemId: item.id,
        issue: `Số trang sách không hợp lệ: ${item.pageNumber}`,
        severity: 'error',
      });
    }

    // e. Kiểm tra phân loại Chặng (1..5)
    if (![1, 2, 3, 4, 5].includes(item.stage)) {
      issues.push({
        round: roundNum,
        category: 'BALLOON_STAGE_INVALID',
        itemId: item.id,
        issue: `Chặng học không hợp lệ: ${item.stage}`,
        severity: 'error',
      });
    }
  });

  return issues;
}

// Chạy 3 vòng lặp
console.log('=== TIẾN HÀNH KIỂM TRA TOÀN DIỆN 3 VÒNG LẶP (LOGIC, CHÍNH TẢ & PHÁT ÂM) ===\n');

for (let r = 1; r <= 3; r++) {
  console.log(`=================== VÒNG LẶP KIỂM TRA THỨ ${r} ===================`);
  const issues = runAuditRound(r);
  const errors = issues.filter((i) => i.severity === 'error');
  const warnings = issues.filter((i) => i.severity === 'warning');

  console.log(`Kết quả Vòng ${r}:`);
  console.log(`- Lỗi nghiêm trọng (Error): ${errors.length}`);
  console.log(`- Cảnh báo (Warning): ${warnings.length}`);

  if (errors.length > 0) {
    console.log('\nDANH SÁCH LỖI NGHIÊM TRỌNG CẦN SỬA:');
    errors.forEach((e) => console.log(`  ❌ [${e.category}] (${e.itemId}): ${e.issue}`));
  }

  if (warnings.length > 0) {
    console.log('\nDANH SÁCH CẢNH BÁO TỪ NGỮ:');
    warnings.forEach((w) => console.log(`  ⚠️ [${w.category}] (${w.itemId}): ${w.issue}`));
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log('  🎉 TẤT CẢ CÁC BÀI HỌC VÀ DỮ LIỆU ĐẠT CHUẨN 100% TIẾNG VIỆT!');
  }
}
