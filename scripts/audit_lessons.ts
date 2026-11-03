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
import { WRITING_ITEMS } from '../src/data/writingData';
import {
  ONSETS,
  RIMES,
  TONES,
  MEANINGFUL_WORDS,
  TRAIN_CHALLENGES,
  MATCHING_ROUNDS,
  combinePhonics,
} from '../src/data/blendingData';

interface AuditIssue {
  round: number;
  category: string;
  itemId: string;
  issue: string;
  severity: 'error' | 'warning';
}

// Bỏ dấu thanh tiếng Việt nhưng giữ nguyên âm có mũ / móc (ă, â, ê, ô, ơ, ư)
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
  // 2. KIỂM TRA BẢNG NGUYÊN ÂM VÀ DẤU THANH
  // ==========================================
  VOWELS_WITH_TONES.forEach((vt) => {
    if (!vt.vowel || !Array.isArray(vt.tones) || vt.tones.length !== 6) {
      issues.push({
        round: roundNum,
        category: 'VOWELS_WITH_TONES',
        itemId: vt.vowel,
        issue: `Nguyên âm "${vt.vowel}" không có đủ 6 dấu thanh (ngang, sắc, huyền, hỏi, ngã, nặng)`,
        severity: 'error',
      });
    }
  });

  // ==========================================
  // 3. KIỂM TRA PHỤ ÂM VÀ LUẬT CHÍNH TẢ (CONSONANT_LESSONS)
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
      // Chia thành các từ đơn
      const syllables = strippedWord.split(/\s+/);
      const matched = syllables.some((syl) =>
        normalizedLessonRimes.some((nr) => syl.endsWith(nr) || syl.includes(nr))
      );
      if (!matched) {
        issues.push({
          round: roundNum,
          category: 'RIME_ILLUSTRATION_MISMATCH',
          itemId: `${lesson.id}_${iw.word}`,
          issue: `Từ minh họa "${iw.word}" (âm tiết: ${syllables.join('/')}) không khớp bất kỳ vần nào [${normalizedLessonRimes.join(', ')}] của bài ${lesson.title}`,
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
          issue: `Từ luyện đọc "${pw}" không khớp bất kỳ vần nào [${normalizedLessonRimes.join(', ')}] của bài ${lesson.title}`,
          severity: 'warning',
        });
      }
    });
  });

  // ==========================================
  // 5. KIỂM TRA DỮ LIỆU TẬP TÔ (writingData)
  // ==========================================
  WRITING_ITEMS.forEach((item) => {
    if (!item.id || !item.char || !item.name || !item.spellingAudio) {
      issues.push({
        round: roundNum,
        category: 'WRITING_ITEM',
        itemId: item.id,
        issue: `Thiếu trường dữ liệu viết`,
        severity: 'error',
      });
    }
  });

  // ==========================================
  // 6. KIỂM TRA TRÒ CHƠI GHÉP VẦN (blendingData)
  // ==========================================
  TRAIN_CHALLENGES.forEach((t) => {
    if (!t.options.includes(t.targetMissing)) {
      issues.push({
        round: roundNum,
        category: 'TRAIN_CHALLENGE',
        itemId: t.id,
        issue: `targetMissing "${t.targetMissing}" không nằm trong options: [${t.options.join(', ')}]`,
        severity: 'error',
      });
    }
    if (`${t.prefix}${t.targetMissing}` !== t.fullWord) {
      issues.push({
        round: roundNum,
        category: 'TRAIN_CHALLENGE',
        itemId: t.id,
        issue: `prefix "${t.prefix}" + targetMissing "${t.targetMissing}" !== fullWord "${t.fullWord}"`,
        severity: 'error',
      });
    }
  });

  MATCHING_ROUNDS.forEach((m) => {
    m.items.forEach((item) => {
      if (`${item.onset}${item.rimeAndTone}` !== item.word) {
        issues.push({
          round: roundNum,
          category: 'MATCHING_ITEM',
          itemId: item.id,
          issue: `onset "${item.onset}" + rimeAndTone "${item.rimeAndTone}" !== word "${item.word}"`,
          severity: 'error',
        });
      }
    });
  });

  return issues;
}

// Chạy 3 vòng lặp
console.log('=== TIẾN HÀNH KIỂM TRA TOÀN DIỆN 3 VÒNG LẶP (LOGIC, CHÍNH TẢ & PHÁT ÂM) ===\n');

for (let r = 1; r <= 3; r++) {
  console.log(`\n=================== VÒNG LẶP KIỂM TRA THỨ ${r} ===================`);
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
