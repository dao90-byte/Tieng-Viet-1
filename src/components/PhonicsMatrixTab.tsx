/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Volume2,
  AlertCircle,
  Play,
  Pause,
  BookOpen,
} from 'lucide-react';
import {
  CONSONANT_LESSONS,
  RIME_READING_LESSONS,
  LESSON_PARTS,
  LessonPart,
  LessonUnitItem,
  ConsonantPhonicsLesson,
  RimeReadingLesson,
} from '../data/vietnameseData';
import {
  speakAI,
  stopAllSpeech,
  spellOutSyllable,
} from '../services/speechService';

interface PhonicsMatrixTabProps {
  spellMode: 'spell' | 'smooth';
  slowRate: boolean;
  onGainStar: () => void;
}

export const PhonicsMatrixTab: React.FC<PhonicsMatrixTabProps> = ({
  spellMode,
  slowRate,
  onGainStar,
}) => {
  const [selectedPartId, setSelectedPartId] = useState<string>('part1');
  const [selectedUnitId, setSelectedUnitId] = useState<string>('b');
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [currentSpellStep, setCurrentSpellStep] = useState<string | null>(null);
  const [playingSentence, setPlayingSentence] = useState<string | null>(null);

  const effectiveRate = slowRate ? 0.88 : 0.98;

  // Lấy Phần học hiện tại
  const currentPart: LessonPart =
    LESSON_PARTS.find((p) => p.id === selectedPartId) || LESSON_PARTS[0];

  // Tìm đơn vị học tập đang chọn
  const allCurrentUnits: LessonUnitItem[] = [...currentPart.row1, ...currentPart.row2];
  const activeUnitItem: LessonUnitItem =
    allCurrentUnits.find((u) => u.id === selectedUnitId) ||
    currentPart.row1[0] ||
    LESSON_PARTS[0].row1[0];

  // Xác định dòng mà đơn vị đang chọn thuộc về (Hàng trên hay Hàng dưới)
  const isRow1 = currentPart.row1.some((u) => u.id === activeUnitItem.id);

  // Lấy dữ liệu bài học tương ứng (Phụ âm hoặc Vần ghép)
  const isConsonant = activeUnitItem.type === 'consonant';

  const consonantLesson: ConsonantPhonicsLesson =
    CONSONANT_LESSONS.find((l) => l.consonant === activeUnitItem.id) ||
    CONSONANT_LESSONS[0];

  const rimeLesson: RimeReadingLesson =
    RIME_READING_LESSONS.find((r) => r.id === activeUnitItem.id) ||
    RIME_READING_LESSONS[0];

  // Khi đổi Phần học: tự động chọn đơn vị đầu tiên của Hàng Trên
  const handleSelectPart = (part: LessonPart) => {
    setSelectedPartId(part.id);
    setSelectedUnitId(part.row1[0].id);
    stopAllSpeech();
  };

  // Khi chọn một đơn vị trong hàng
  const handleSelectUnit = (unit: LessonUnitItem) => {
    setSelectedUnitId(unit.id);
    stopAllSpeech();
    // Phát âm nhẹ tên đơn vị để bé nhận biết
    if (unit.type === 'consonant') {
      speakAI(unit.subLabel || unit.label, { rate: effectiveRate });
    } else {
      speakAI(unit.label, { rate: effectiveRate });
    }
  };

  // Phát âm ở bảng ma trận ghép vần: theo thiết lập (đánh vần hoặc đọc trơn)
  const handleMatrixWordClick = async (syllable: string) => {
    if (!syllable) return;
    setActiveWord(syllable);

    if (spellMode === 'spell') {
      await spellOutSyllable(syllable, (step) => {
        setCurrentSpellStep(step.text);
      });
      setCurrentSpellStep(null);
    } else {
      await speakAI(syllable, { rate: effectiveRate });
    }

    setActiveWord(null);
    onGainStar();
  };

  // PHẦN LUYỆN ĐỌC: CHỈ PHÁT ÂM CẢ CHỮ / TỪ, KHÔNG CẦN ĐÁNH VẦN (theo yêu cầu bắt buộc)
  const handleReadingWordClick = async (word: string) => {
    if (!word) return;
    setActiveWord(word);
    await speakAI(word, { rate: effectiveRate });
    setActiveWord(null);
    onGainStar();
  };

  const handlePlaySentence = async (sentence: string) => {
    if (playingSentence === sentence) {
      stopAllSpeech();
      setPlayingSentence(null);
      return;
    }

    setPlayingSentence(sentence);
    await speakAI(sentence, {
      rate: effectiveRate * 0.94,
      onEnd: () => setPlayingSentence(null),
    });
    onGainStar();
  };

  const handlePlayPassage = async (text: string) => {
    if (playingSentence === text) {
      stopAllSpeech();
      setPlayingSentence(null);
      return;
    }

    setPlayingSentence(text);
    await speakAI(text, {
      rate: effectiveRate * 0.92,
      onEnd: () => setPlayingSentence(null),
    });
    onGainStar();
  };

  const renderUnitLabel = (unit: LessonUnitItem) => {
    const { label, subLabel, pageNumber } = unit;
    return (
      <div className="flex flex-col items-center justify-center w-full px-1 py-1">
        <span
          className={`font-black tracking-tight leading-tight text-center ${
            label.length <= 2
              ? 'text-lg sm:text-2xl'
              : label.length <= 7
              ? 'text-xs sm:text-base font-black'
              : 'text-[11px] sm:text-xs md:text-sm font-extrabold line-clamp-1'
          }`}
        >
          {label}
        </span>
        <span className="text-[10px] sm:text-[11px] font-medium opacity-75 leading-tight truncate max-w-full mt-0.5">
          {pageNumber ? `Tr.${pageNumber}` : subLabel}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-16">
      {/* THANH CHỌN PHẦN VÀ 2 HÀNG ĐƠN VỊ TỐI GIẢN */}
      <div className="bg-white rounded-3xl p-3 sm:p-5 border border-slate-200 shadow-sm space-y-4">
        {/* Thanh chọn 5 Phần học trực quan, chuẩn thứ tự trang sách gốc */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-slate-100/90 p-2 rounded-2xl border border-slate-200">
          {LESSON_PARTS.map((part) => {
            const isSelected = part.id === currentPart.id;
            return (
              <button
                key={part.id}
                onClick={() => handleSelectPart(part)}
                className={`py-2.5 px-2 rounded-xl transition-all cursor-pointer text-center flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-sky-500 text-white shadow-md scale-[1.02] ring-2 ring-sky-300'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-white/90 bg-white/60'
                }`}
              >
                <span className="font-black text-sm sm:text-base tracking-tight">{part.title}</span>
                <span className={`text-[10px] sm:text-[11px] font-medium truncate max-w-full ${
                  isSelected ? 'text-sky-100' : 'text-slate-500'
                }`}>
                  {part.stageLabel.replace('Giai đoạn ', 'GĐ ')}
                </span>
              </button>
            );
          })}
        </div>

        {/* Thông tin phần học đang chọn */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="font-black text-slate-800 text-base">{currentPart.name}</span>
            <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-bold text-xs">
              {currentPart.stageLabel}
            </span>
          </div>
          <span className="text-slate-500 italic text-xs">{currentPart.description}</span>
        </div>

        {/* 2 HÀNG ĐƠN VỊ XẾP NGAY NGẮN (8 ĐƠN VỊ / HÀNG) PHÂN BIỆT BẰNG MÀU SẮC */}
        <div className="space-y-3 pt-1">
          {/* HÀNG TRÊN: ĐÚNG 8 ĐƠN VỊ MÀU XANH DƯƠNG */}
          <div className="bg-sky-50/70 rounded-2xl p-2 sm:p-3 border-2 border-sky-200">
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {currentPart.row1.map((unit) => {
                const isSelected = unit.id === activeUnitItem.id;
                return (
                  <button
                    key={unit.id}
                    onClick={() => handleSelectUnit(unit)}
                    className={`min-h-[4rem] sm:min-h-[4.4rem] rounded-xl sm:rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-center text-center p-1 shadow-2xs ${
                      isSelected
                        ? 'bg-sky-500 text-white border-sky-600 shadow-md ring-4 ring-sky-200 scale-105 z-10'
                        : 'bg-white hover:bg-sky-100/90 text-sky-950 border-sky-200 hover:border-sky-400'
                    }`}
                  >
                    {renderUnitLabel(unit)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* HÀNG DƯỚI: ĐÚNG 8 ĐƠN VỊ MÀU XANH LÁ */}
          <div className="bg-emerald-50/70 rounded-2xl p-2 sm:p-3 border-2 border-emerald-200">
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {currentPart.row2.map((unit) => {
                const isSelected = unit.id === activeUnitItem.id;
                return (
                  <button
                    key={unit.id}
                    onClick={() => handleSelectUnit(unit)}
                    className={`min-h-[4rem] sm:min-h-[4.4rem] rounded-xl sm:rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-center text-center p-1 shadow-2xs ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-4 ring-emerald-200 scale-105 z-10'
                        : 'bg-white hover:bg-emerald-100/90 text-emerald-950 border-emerald-200 hover:border-emerald-400'
                    }`}
                  >
                    {renderUnitLabel(unit)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Hiển thị bước đánh vần hiện tại khi đánh vần ở ma trận */}
      {currentSpellStep && (
        <div className="flex items-center gap-2 px-3.5 py-1.5 bg-amber-50 border border-amber-300 text-amber-900 rounded-2xl text-xs font-bold animate-pulse">
          <Volume2 className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            Đang đánh vần:{' '}
            <span className="text-sm font-black text-amber-700">{currentSpellStep}</span>
          </span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. NỘI DUNG KHI CHỌN PHỤ ÂM: MA TRẬN GHÉP VẦN + PHẦN LUYỆN ĐỌC            */}
      {/* ========================================================================= */}
      {isConsonant && (
        <>
          {/* Quy Tắc Chính Tả (nếu có trong sách) */}
          {consonantLesson.spellingRuleNotice && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm font-medium text-amber-900">
                {consonantLesson.spellingRuleNotice}
              </p>
            </div>
          )}

          {/* BẢNG MA TRẬN 6 THANH ĐIỆU VỚI MÀU SẮC PASTEL CŨ NGUYÊN BẢN */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 font-black text-2xl flex items-center justify-center border border-sky-200 shadow-2xs">
                {consonantLesson.consonant}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                {consonantLesson.consonant.toUpperCase()} {consonantLesson.consonant}{' '}
                <span className="text-lg sm:text-xl font-bold text-sky-600 font-sans">
                  ({consonantLesson.soundName})
                </span>
              </h3>
            </div>

            {/* 6 Cột Thanh Điệu Với Màu Sắc Pastel Cũ */}
            <div className="overflow-x-auto">
              <table className="w-full text-center border-separate border-spacing-y-2 text-sm sm:text-base">
                <thead>
                  <tr className="text-xs font-bold text-slate-600">
                    <th className="p-2 w-16 text-slate-400">Nguyên âm</th>
                    <th className="p-2 w-14 text-slate-400">Ghép</th>
                    <th className="p-2 text-purple-700 bg-purple-50/50 rounded-l-xl">Không dấu</th>
                    <th className="p-2 text-amber-700 bg-amber-50/50">Dấu Sắc (´)</th>
                    <th className="p-2 text-sky-700 bg-sky-50/50">Dấu Huyền (`)</th>
                    <th className="p-2 text-emerald-700 bg-emerald-50/50">Dấu Hỏi (?)</th>
                    <th className="p-2 text-yellow-700 bg-yellow-50/50">Dấu Ngã (~)</th>
                    <th className="p-2 text-blue-700 bg-blue-50/50 rounded-r-xl">Dấu Nặng (.)</th>
                  </tr>
                </thead>
                <tbody>
                  {consonantLesson.rows.map((row) => (
                    <tr key={row.vowel} className="group">
                      {/* Nguyên âm: Bấm vào nghe phát âm nguyên âm chuẩn xác */}
                      <td className="p-2">
                        <button
                          onClick={() => {
                            speakAI(row.vowel, { rate: effectiveRate });
                            onGainStar();
                          }}
                          title={`Bấm để nghe nguyên âm ${row.vowel}`}
                          className="inline-block w-9 h-9 leading-9 rounded-xl bg-slate-100 hover:bg-sky-100 active:scale-95 font-black text-sky-600 hover:text-sky-800 text-lg border border-slate-200 hover:border-sky-300 transition-all cursor-pointer shadow-2xs hover:scale-105"
                        >
                          {row.vowel}
                        </button>
                      </td>

                      {/* Mũi tên ghép */}
                      <td className="p-2 text-slate-400 font-bold">
                        →
                      </td>

                      {/* Không dấu (#e0b8e6) */}
                      <td className="p-1.5">
                        {row.toneNone && (
                          <button
                            onClick={() => handleMatrixWordClick(row.toneNone)}
                            className={`w-full py-2.5 px-2 rounded-xl font-black text-base transition-all cursor-pointer shadow-2xs border ${
                              activeWord === row.toneNone
                                ? 'ring-4 ring-purple-300 scale-105 bg-purple-600 text-white'
                                : 'bg-[#e0b8e6] hover:bg-[#d4a0dd] text-purple-950 border-purple-200'
                            }`}
                          >
                            {row.toneNone}
                          </button>
                        )}
                      </td>

                      {/* Dấu Sắc (#f8b276) */}
                      <td className="p-1.5">
                        {row.toneSac && (
                          <button
                            onClick={() => handleMatrixWordClick(row.toneSac)}
                            className={`w-full py-2.5 px-2 rounded-xl font-black text-base transition-all cursor-pointer shadow-2xs border ${
                              activeWord === row.toneSac
                                ? 'ring-4 ring-amber-300 scale-105 bg-amber-600 text-white'
                                : 'bg-[#f8b276] hover:bg-[#f69d53] text-amber-950 border-amber-200'
                            }`}
                          >
                            {row.toneSac}
                          </button>
                        )}
                      </td>

                      {/* Dấu Huyền (#98d2ed) */}
                      <td className="p-1.5">
                        {row.toneHuyen && (
                          <button
                            onClick={() => handleMatrixWordClick(row.toneHuyen)}
                            className={`w-full py-2.5 px-2 rounded-xl font-black text-base transition-all cursor-pointer shadow-2xs border ${
                              activeWord === row.toneHuyen
                                ? 'ring-4 ring-sky-300 scale-105 bg-sky-600 text-white'
                                : 'bg-[#98d2ed] hover:bg-[#7dc7ea] text-sky-950 border-sky-200'
                            }`}
                          >
                            {row.toneHuyen}
                          </button>
                        )}
                      </td>

                      {/* Dấu Hỏi (#a3dc96) */}
                      <td className="p-1.5">
                        {row.toneHoi && (
                          <button
                            onClick={() => handleMatrixWordClick(row.toneHoi)}
                            className={`w-full py-2.5 px-2 rounded-xl font-black text-base transition-all cursor-pointer shadow-2xs border ${
                              activeWord === row.toneHoi
                                ? 'ring-4 ring-emerald-300 scale-105 bg-emerald-600 text-white'
                                : 'bg-[#a3dc96] hover:bg-[#8ece80] text-emerald-950 border-emerald-200'
                            }`}
                          >
                            {row.toneHoi}
                          </button>
                        )}
                      </td>

                      {/* Dấu Ngã (#f8e176) */}
                      <td className="p-1.5">
                        {row.toneNga && (
                          <button
                            onClick={() => handleMatrixWordClick(row.toneNga)}
                            className={`w-full py-2.5 px-2 rounded-xl font-black text-base transition-all cursor-pointer shadow-2xs border ${
                              activeWord === row.toneNga
                                ? 'ring-4 ring-yellow-300 scale-105 bg-yellow-500 text-slate-900'
                                : 'bg-[#f8e176] hover:bg-[#f6d750] text-yellow-950 border-yellow-200'
                            }`}
                          >
                            {row.toneNga}
                          </button>
                        )}
                      </td>

                      {/* Dấu Nặng (#9bc2e6) */}
                      <td className="p-1.5">
                        {row.toneNang && (
                          <button
                            onClick={() => handleMatrixWordClick(row.toneNang)}
                            className={`w-full py-2.5 px-2 rounded-xl font-black text-base transition-all cursor-pointer shadow-2xs border ${
                              activeWord === row.toneNang
                                ? 'ring-4 ring-blue-300 scale-105 bg-blue-600 text-white'
                                : 'bg-[#9bc2e6] hover:bg-[#83b2df] text-blue-950 border-blue-200'
                            }`}
                          >
                            {row.toneNang}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================== */}
          {/* PHẦN LUYỆN ĐỌC TỐI GIẢN (ĐÃ LOẠI BỎ TOÀN BỘ CHỮ RƯỜM RÀ)        */}
          {/* QUY TẮC: CHỈ PHÁT ÂM CẢ CHỮ, TUYỆT ĐỐI KHÔNG CẦN ĐÁNH VẦN    */}
          {/* ============================================================== */}
          <div className="bg-gradient-to-br from-emerald-50/50 via-sky-50/40 to-amber-50/50 rounded-3xl p-5 sm:p-7 border-2 border-emerald-200/90 shadow-sm space-y-5">
            {/* 1. THẺ TỪ MINH HỌA (Bấm vào phát âm cả từ ngay lập tức) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {consonantLesson.readingData.illustratedWords.map((item, idx) => {
                const isActive = activeWord === item.word;
                return (
                  <button
                    key={idx}
                    onClick={() => handleReadingWordClick(item.word)}
                    className={`flex items-center justify-between p-4 sm:p-5 rounded-3xl border-2 transition-all cursor-pointer text-left shadow-xs ${
                      isActive
                        ? 'bg-emerald-500 text-white border-emerald-600 scale-[1.02] shadow-md ring-4 ring-emerald-200'
                        : 'bg-white hover:bg-emerald-50/60 border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-4xl sm:text-5xl shrink-0 p-2 rounded-2xl bg-slate-50 border border-slate-100">
                        {item.image}
                      </span>
                      <span
                        className={`text-2xl sm:text-3xl font-black block tracking-wide ${
                          isActive ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {item.word}
                      </span>
                    </div>

                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0 ${
                        isActive ? 'bg-white text-emerald-600' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 2. KHUNG TỪ LUYỆN ĐỌC (Hộp từ ứng dụng trong sách) */}
            <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-slate-200 shadow-2xs flex flex-wrap gap-2.5 items-center">
              {consonantLesson.readingData.practiceWords.map((word, i) => {
                const isActive = activeWord === word;
                return (
                  <button
                    key={i}
                    onClick={() => handleReadingWordClick(word)}
                    className={`px-4 sm:px-5 py-2.5 rounded-2xl font-black text-lg sm:text-xl transition-all cursor-pointer border-2 ${
                      isActive
                        ? 'bg-amber-500 text-white border-amber-600 ring-4 ring-amber-200 scale-105 shadow-xs'
                        : 'bg-amber-50/70 hover:bg-amber-100/90 text-amber-950 border-amber-200'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>

            {/* 3. CÂU VĂN ỨNG DỤNG THEO SÁCH GỐC (Chạm là đọc cả từ / đọc cả câu) */}
            <div className="space-y-3">
              {consonantLesson.readingData.sentences.map((sent, i) => {
                const isPlaying = playingSentence === sent;
                const words = sent.split(' ');
                return (
                  <div
                    key={i}
                    className={`p-4 sm:p-5 rounded-3xl border-2 transition-all shadow-xs ${
                      isPlaying
                        ? 'bg-sky-50 border-sky-400 ring-4 ring-sky-200'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      {/* Từng chữ trong câu */}
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        {words.map((w, wIdx) => {
                          const isWActive = activeWord === w;
                          return (
                            <button
                              key={wIdx}
                              onClick={() => handleReadingWordClick(w)}
                              className={`px-2.5 py-1 rounded-xl font-black text-lg sm:text-xl transition-all cursor-pointer ${
                                isWActive
                                  ? 'bg-sky-500 text-white scale-110 shadow-xs'
                                  : 'hover:bg-sky-100 text-slate-800'
                              }`}
                            >
                              {w}
                            </button>
                          );
                        })}
                      </div>

                      {/* Nút Đọc Cả Câu Liền Mạch */}
                      <button
                        onClick={() => handlePlaySentence(sent)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer shadow-xs ${
                          isPlaying
                            ? 'bg-rose-500 text-white ring-4 ring-rose-200'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-4 h-4" />
                            <span>Dừng</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 fill-current" />
                            <span>Đọc Cả Câu</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 2. NỘI DUNG KHI CHỌN VẦN GHÉP KÈM ĐOẠN VĂN & MẨU CHUYỆN GỐC              */}
      {/* ========================================================================= */}
      {!isConsonant && (
        <div className="bg-gradient-to-br from-sky-50/70 via-white to-amber-50/50 rounded-3xl p-5 sm:p-7 border-2 border-sky-300 shadow-sm space-y-5">
          {/* Tiêu đề bài vần & Nút phát âm/đánh vần từng vần tương tác */}
          <div className="pb-3 border-b border-sky-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-500 hidden sm:inline">Tập đánh vần:</span>
              <div className="flex items-center gap-2">
                {rimeLesson.rimes.map((r) => {
                  const isActive = activeWord === r;
                  return (
                    <button
                      key={r}
                      onClick={() => handleMatrixWordClick(r)}
                      title={`Bấm để đánh vần vần ${r}`}
                      className={`px-4 py-2 rounded-2xl font-black text-xl sm:text-2xl border-2 transition-all cursor-pointer shadow-xs flex items-center gap-2 ${
                        isActive
                          ? 'bg-sky-500 text-white border-sky-600 scale-105 shadow-md ring-4 ring-sky-200'
                          : 'bg-white hover:bg-sky-50 text-sky-950 border-sky-200 hover:border-sky-400'
                      }`}
                    >
                      <span>{r}</span>
                      <Volume2 className="w-4 h-4 text-sky-600 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
            <span className="text-xs font-bold text-slate-400">
              Chạm vào vần để nghe đánh vần
            </span>
          </div>

          {/* 1. Thẻ từ minh họa vần (Bấm vào phát âm cả từ ngay lập tức) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {rimeLesson.illustratedWords.map((item, idx) => {
              const isActive = activeWord === item.word;
              return (
                <button
                  key={idx}
                  onClick={() => handleReadingWordClick(item.word)}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center shadow-xs ${
                    isActive
                      ? 'bg-sky-500 text-white border-sky-600 scale-105 shadow-md ring-4 ring-sky-200'
                      : 'bg-white hover:bg-sky-50 border-slate-200 hover:border-sky-300'
                  }`}
                >
                  <span className="text-4xl mb-1">{item.image}</span>
                  <span className={`text-xl font-black ${isActive ? 'text-white' : 'text-slate-900'}`}>
                    {item.word}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 2. Khung từ luyện đọc */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-slate-200 shadow-2xs flex flex-wrap gap-2.5">
            {rimeLesson.practiceWords.map((word, i) => {
              const isActive = activeWord === word;
              return (
                <button
                  key={i}
                  onClick={() => handleReadingWordClick(word)}
                  className={`px-4 py-2.5 rounded-2xl font-black text-base sm:text-lg transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-amber-500 text-white border-amber-600 ring-4 ring-amber-200 scale-105'
                      : 'bg-amber-50/70 hover:bg-amber-100 text-amber-950 border-amber-200'
                  }`}
                >
                  {word}
                </button>
              );
            })}
          </div>

          {/* 3. Câu ứng dụng */}
          <div className="space-y-2.5">
            {rimeLesson.sentences.map((sent, i) => {
              const isPlaying = playingSentence === sent;
              return (
                <div
                  key={i}
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 flex items-center justify-between gap-3 ${
                    isPlaying ? 'bg-emerald-50 border-emerald-400 ring-4 ring-emerald-200' : 'bg-white border-emerald-200'
                  }`}
                >
                  <p className="text-lg sm:text-xl font-bold text-slate-800">{sent}</p>
                  <button
                    onClick={() => handlePlaySentence(sent)}
                    className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs ${
                      isPlaying ? 'bg-rose-500 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span>{isPlaying ? 'Dừng' : 'Đọc'}</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* 4. MẨU CHUYỆN KINH ĐIỂN / ĐOẠN VĂN GỐC (Gà gáy, Mèo dạy Hổ, Xào rau, Chạy thi...) */}
          {rimeLesson.passage && (
            <div className="p-5 sm:p-6 rounded-3xl bg-amber-50 border-2 border-amber-300 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-black text-amber-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  <span>{rimeLesson.passage.title || 'Mẩu Chuyện Luyện Đọc'}</span>
                </h4>
                <button
                  onClick={() => handlePlayPassage(rimeLesson.passage!.text)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black shadow-xs cursor-pointer"
                >
                  {playingSentence === rimeLesson.passage.text ? (
                    <>
                      <Pause className="w-3.5 h-3.5" /> Dừng
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" /> Đọc Cả Bài
                    </>
                  )}
                </button>
              </div>
              <p className="text-slate-800 text-lg sm:text-xl leading-relaxed font-bold">
                {rimeLesson.passage.text}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
