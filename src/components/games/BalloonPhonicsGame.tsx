/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, CheckCircle2, ChevronLeft, ChevronRight, BookOpen, Headphones } from 'lucide-react';
import {
  BALLOON_PHONICS_LESSONS,
  BalloonLessonItem,
  BALLOON_COLOR_MAP,
} from '../../data/balloonPhonicsData';
import { speakAI, spellOutSyllable } from '../../services/speechService';

interface BalloonPhonicsGameProps {
  onAddStar: () => void;
  slowRate: boolean;
}

const BALLOON_COLOR_KEYS: ('pink' | 'blue' | 'yellow' | 'emerald')[] = [
  'pink',
  'blue',
  'yellow',
  'emerald',
];

export const BalloonPhonicsGame: React.FC<BalloonPhonicsGameProps> = ({
  onAddStar,
  slowRate,
}) => {
  const [selectedStage, setSelectedStage] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Filter lessons by stage
  const stageLessons = BALLOON_PHONICS_LESSONS.filter(
    (item) => item.stage === selectedStage
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const current: BalloonLessonItem = stageLessons[currentIndex] || stageLessons[0];

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Handle stage change
  const handleSelectStage = (stage: 1 | 2 | 3 | 4 | 5) => {
    setSelectedStage(stage);
    setCurrentIndex(0);
    setFeedback('idle');
    setSelectedAnswer(null);
  };

  // Navigate lessons
  const handleNext = () => {
    if (currentIndex < stageLessons.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
    setFeedback('idle');
    setSelectedAnswer(null);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(stageLessons.length - 1);
    }
    setFeedback('idle');
    setSelectedAnswer(null);
  };

  // Listen to prompt audio
  const handlePlayWordAudio = async () => {
    if (current.challengeType === 'listen') {
      await speakAI(current.fullWord, {
        rate: slowRate ? 0.75 : 0.85,
      });
    } else {
      await speakAI(`Bé hãy chọn bóng bay ghép từ: ${current.fullWord}`, {
        rate: slowRate ? 0.75 : 0.85,
      });
    }
  };

  // Handle select balloon
  const handleSelectBalloon = async (option: string) => {
    if (feedback !== 'idle') return;
    setSelectedAnswer(option);

    if (option === current.targetMissing) {
      setFeedback('correct');
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
      });
      onAddStar();

      try {
        if (current.challengeType === 'listen') {
          await speakAI(current.fullWord, { rate: slowRate ? 0.8 : 0.9 });
        } else {
          await spellOutSyllable(current.fullWord);
        }
      } catch {
        await speakAI(current.spellingScript, {
          rate: slowRate ? 0.8 : 0.9,
        });
      }

      setTimeout(() => {
        setFeedback('idle');
        setSelectedAnswer(null);
        handleNext();
      }, 1900);
    } else {
      setFeedback('wrong');
      await speakAI('Chưa đúng rồi, bé lắng nghe kỹ và chọn lại quả bóng khác nhé!');
      setTimeout(() => {
        setFeedback('idle');
        setSelectedAnswer(null);
      }, 1200);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Stage Selector (5 Chặng chuẩn sách giáo khoa, font chữ lớn hơn) */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🎈</span>
            <span className="text-base sm:text-lg font-black text-slate-900">
              Chọn Chặng Học Theo Thứ Tự Sách Giáo Khoa:
            </span>
          </div>
          <div className="text-sm font-bold text-slate-600 bg-slate-100 px-3.5 py-1.5 rounded-xl flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-rose-500" />
            <span>{current.unitLabel} · Trang {current.pageNumber}</span>
          </div>
        </div>

        {/* 5 Stage Buttons with Large Clear Text */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {[
            { stage: 1 as const, name: 'Chặng 1', desc: '16 Phụ âm (Trang 5-20)' },
            { stage: 2 as const, name: 'Chặng 2', desc: 'Phụ âm ghép (Trang 21-30)' },
            { stage: 3 as const, name: 'Chặng 3', desc: 'Vần mở đôi (Trang 106-123)' },
            { stage: 4 as const, name: 'Chặng 4', desc: 'Vần -n, -m, -ng (Trang 33-66)' },
            { stage: 5 as const, name: 'Chặng 5', desc: 'Vần -t, -c, -p (Trang 44-98)' },
          ].map((item) => (
            <button
              key={item.stage}
              onClick={() => handleSelectStage(item.stage)}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                selectedStage === item.stage
                  ? 'bg-rose-500 text-white border-rose-600 shadow-md scale-102 font-bold ring-2 ring-rose-200'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-rose-50'
              }`}
            >
              <div className="text-sm sm:text-base font-black">{item.name}</div>
              <div className="text-xs opacity-90 mt-0.5 truncate">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main Game Sky Canvas (Lớn, Rõ Ràng, Màu Sắc Tươi Sáng) */}
      <div className="relative rounded-3xl border-3 border-sky-300 bg-gradient-to-b from-sky-400 via-sky-200 to-amber-50 p-6 sm:p-10 shadow-lg text-center space-y-8 overflow-hidden select-none">
        {/* Floating Clouds & Birds in Sky Background */}
        <div className="absolute top-4 left-6 text-4xl opacity-80 pointer-events-none animate-pulse">
          ☁️
        </div>
        <div className="absolute top-8 right-8 text-5xl opacity-85 pointer-events-none">
          ☀️
        </div>
        <div className="absolute top-16 left-1/3 text-3xl opacity-75 pointer-events-none">
          ☁️
        </div>

        {/* Lesson Progress & Book Page Indicator */}
        <div className="flex items-center justify-between relative z-10 max-w-xl mx-auto">
          <button
            onClick={handlePrev}
            className="p-3 rounded-2xl bg-white/95 hover:bg-white text-slate-800 shadow-sm border border-sky-200 transition-colors cursor-pointer"
            title="Bài trước"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="px-5 py-2 rounded-full bg-white/95 backdrop-blur-xs border border-sky-200 shadow-sm text-sm sm:text-base font-black text-sky-950 flex items-center gap-2">
            {current.challengeType === 'listen' ? (
              <Headphones className="w-5 h-5 text-amber-500 animate-bounce" />
            ) : (
              <BookOpen className="w-5 h-5 text-rose-500" />
            )}
            <span>
              {current.challengeType === 'listen' ? 'Thử Thách Luyện Tai Tinh' : 'Thử Thách Ghép Vần'} · Bài {currentIndex + 1} / {stageLessons.length}
            </span>
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-2xl bg-white/95 hover:bg-white text-slate-800 shadow-sm border border-sky-200 transition-colors cursor-pointer"
            title="Bài tiếp"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Center Target Stage: Tùy biến theo dạng bài Ghép vần hoặc Luyện tai tinh */}
        {current.challengeType === 'listen' ? (
          /* DẠNG BÀI: AI TAI TINH HƠN (Nghe âm tìm quả bóng bay đúng) */
          <div className="relative z-10 flex flex-col items-center justify-center gap-4">
            <button
              onClick={handlePlayWordAudio}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 border-4 border-white shadow-xl flex flex-col items-center justify-center text-white transform transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Bấm để nghe âm thanh"
            >
              <Volume2 className="w-14 h-14 sm:w-16 sm:h-16 animate-pulse" />
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider mt-1 text-amber-100">
                Bấm Nghe Lại
              </span>
            </button>
            <div className="bg-white/90 backdrop-blur-xs px-5 py-2 rounded-2xl text-sm sm:text-base font-bold text-slate-800 border border-amber-200 shadow-sm">
              🎧 Bé hãy bấm loa nghe cô đọc rồi chọn quả bóng bay đúng nhé!
            </div>
          </div>
        ) : (
          /* DẠNG BÀI: GHÉP VẦN THEO TRANH */
          <div className="relative z-10 flex flex-col items-center justify-center gap-4">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-white/95 border-4 border-amber-300 shadow-xl flex items-center justify-center text-7xl sm:text-8xl transform transition-transform hover:scale-105">
              {current.image}
            </div>
            <button
              onClick={handlePlayWordAudio}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-white/95 hover:bg-white text-rose-600 text-sm sm:text-base font-black shadow-sm transition-all active:scale-95 border border-rose-200 cursor-pointer"
            >
              <Volume2 className="w-5 h-5" />
              <span>Bấm nghe cô đọc từ mẫu</span>
            </button>
          </div>
        )}

        {/* Cloud-shaped Syllable Assembly Display (Font chữ to vượt trội) */}
        {current.challengeType === 'blend' && (
          <div className="relative z-10 max-w-lg mx-auto">
            <div className="bg-white/95 backdrop-blur-xs rounded-3xl p-5 sm:p-7 border-3 border-sky-200 shadow-md flex items-center justify-center gap-3 sm:gap-4">
              {/* Prefix Block */}
              {current.prefix && (
                <div className="bg-sky-500 text-white rounded-2xl px-5 py-3.5 min-w-20 shadow-inner text-4xl sm:text-5xl font-black font-mono">
                  {current.prefix}
                </div>
              )}

              <span className="text-3xl font-black text-slate-400">+</span>

              {/* Target Missing Balloon Slot */}
              <div
                className={`rounded-2xl px-6 py-3.5 min-w-28 border-3 border-dashed shadow-inner flex flex-col items-center justify-center transition-all ${
                  feedback === 'correct'
                    ? 'bg-emerald-500 text-white border-emerald-600 scale-105'
                    : feedback === 'wrong'
                    ? 'bg-rose-100 text-rose-800 border-rose-400 animate-shake'
                    : 'bg-amber-50 text-amber-600 border-amber-400'
                }`}
              >
                <span className="text-4xl sm:text-5xl font-black font-mono">
                  {feedback === 'correct' ? current.targetMissing : selectedAnswer || '?'}
                </span>
              </div>

              <span className="text-3xl font-black text-slate-400">=</span>

              {/* Target Full Word Result */}
              <div className="bg-rose-500 text-white rounded-2xl px-6 py-3.5 shadow-md text-3xl sm:text-4xl font-black">
                {feedback === 'correct' ? current.fullWord : '...'}
              </div>
            </div>
          </div>
        )}

        {/* Celebration Banner */}
        {feedback === 'correct' && (
          <div className="relative z-10 bg-emerald-500 text-white rounded-2xl p-4 max-w-md mx-auto shadow-xl animate-bounce flex items-center justify-center gap-2.5">
            <CheckCircle2 className="w-6 h-6 text-amber-200" />
            <span className="text-base sm:text-lg font-black">
              Búp! Bé đã trả lời rất chính xác! (+1 ⭐)
            </span>
          </div>
        )}

        {/* 4 Floating Colorful Balloons (To rõ, Chữ lớn, Nổi bật) */}
        <div className="relative z-10 space-y-4 pt-2">
          <div className="text-sm sm:text-base font-black uppercase tracking-wider text-sky-950/90 drop-shadow-xs">
            {current.challengeType === 'listen'
              ? 'Bé hãy chạm vào quả bóng bay chứa âm vừa nghe:'
              : 'Bé hãy chạm vào quả bóng bay chứa vần còn thiếu:'}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-7 pt-2">
            {current.options.map((option, idx) => {
              const colorKey = BALLOON_COLOR_KEYS[idx % BALLOON_COLOR_KEYS.length];
              const colorClass = BALLOON_COLOR_MAP[colorKey];
              const isLongText = option.length > 4;

              return (
                <div key={`${option}_${idx}`} className="flex flex-col items-center group">
                  {/* Balloon Body */}
                  <button
                    onClick={() => handleSelectBalloon(option)}
                    disabled={feedback !== 'idle'}
                    className={`w-24 h-30 sm:w-30 sm:h-36 rounded-[50%/60%_60%_40%_40%] bg-gradient-to-b border-3 shadow-xl flex items-center justify-center font-black cursor-pointer transform transition-all duration-300 hover:-translate-y-3 hover:scale-110 active:scale-95 disabled:opacity-50 relative ${colorClass} ${
                      isLongText ? 'text-lg sm:text-2xl px-2' : 'text-3xl sm:text-5xl'
                    }`}
                  >
                    {/* Balloon Highlight Shine */}
                    <div className="absolute top-2.5 left-3.5 w-5 h-7 rounded-full bg-white/45 transform -rotate-30 pointer-events-none" />
                    <span>{option}</span>
                  </button>

                  {/* Balloon Knot and String */}
                  <div className="w-3 h-2.5 rounded-sm bg-slate-700 -mt-1 pointer-events-none" />
                  <div className="w-0.5 h-8 bg-slate-500 pointer-events-none" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
