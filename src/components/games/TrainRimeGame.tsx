/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react';
import { TRAIN_CHALLENGES, TrainChallenge } from '../../data/blendingData';
import { speakAI, spellOutSyllable } from '../../services/speechService';

interface TrainRimeGameProps {
  onAddStar: () => void;
  slowRate: boolean;
}

export const TrainRimeGame: React.FC<TrainRimeGameProps> = ({
  onAddStar,
  slowRate,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current: TrainChallenge = TRAIN_CHALLENGES[currentIndex];

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Play word / hint audio
  const handlePlayAudio = async () => {
    await speakAI(`Toa tàu đang chở từ: ${current.fullWord}`, {
      rate: slowRate ? 0.75 : 0.85,
    });
  };

  // Handle select option
  const handleSelectOption = async (option: string) => {
    if (feedback !== 'idle') return;
    setSelectedAnswer(option);

    if (option === current.targetMissing) {
      setFeedback('correct');
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
      });
      onAddStar();

      // Đánh vần đầy đủ
      try {
        await spellOutSyllable(current.fullWord);
      } catch {
        await speakAI(current.fullSpelling, { rate: slowRate ? 0.8 : 0.9 });
      }

      setTimeout(() => {
        setFeedback('idle');
        setSelectedAnswer(null);
        setCurrentIndex((prev) => (prev + 1) % TRAIN_CHALLENGES.length);
      }, 1800);
    } else {
      setFeedback('wrong');
      await speakAI('Chưa chính xác rồi, bé thử lại nhé!');
      setTimeout(() => {
        setFeedback('idle');
        setSelectedAnswer(null);
      }, 1200);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>🚂</span>
            <span>Đoàn Tàu Ghép Vần & Kéo Thẻ Vào Toa</span>
          </h3>
          <p className="text-xs text-slate-500">
            Bé hãy chọn đúng vần còn thiếu để đoàn tàu lăn bánh bon bon nhé!
          </p>
        </div>
        <div className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
          Toa {currentIndex + 1} / {TRAIN_CHALLENGES.length}
        </div>
      </div>

      {/* Main Train Stage */}
      <div className="bg-gradient-to-b from-sky-400/15 via-white to-emerald-400/10 rounded-3xl border-2 border-sky-300 p-6 sm:p-10 shadow-sm text-center space-y-8 relative overflow-hidden">
        {/* Cloud / Sun Decorative background */}
        <div className="flex justify-between items-center text-3xl opacity-75 select-none pointer-events-none px-4">
          <span>☁️</span>
          <span>☀️</span>
          <span>☁️</span>
        </div>

        {/* Word Picture & Target Hint */}
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white border-2 border-amber-200 shadow-md flex items-center justify-center text-5xl sm:text-6xl transform transition-transform hover:scale-105">
            {current.image}
          </div>
          <button
            onClick={handlePlayAudio}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-800 text-xs font-bold transition-colors shadow-xs"
          >
            <Volume2 className="w-4 h-4" />
            <span>Nghe tên hình ảnh</span>
          </button>
        </div>

        {/* The Train Track and Train Cars */}
        <div className="max-w-xl mx-auto space-y-2">
          <div className="flex items-end justify-center gap-2 sm:gap-3">
            {/* Locomotive Head */}
            <div className="bg-rose-500 text-white rounded-t-3xl rounded-b-xl p-3 sm:p-4 shadow-md flex flex-col items-center justify-center w-20 sm:w-24 h-28 sm:h-32 relative">
              <span className="text-2xl sm:text-3xl">🚂</span>
              <span className="text-[10px] font-bold mt-1 text-rose-100">ĐẦU TÀU</span>
              <div className="absolute -bottom-2 flex gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-800 border-2 border-white inline-block"></span>
                <span className="w-4 h-4 rounded-full bg-slate-800 border-2 border-white inline-block"></span>
              </div>
            </div>

            {/* Train Car 1: Prefix letter */}
            <div className="bg-sky-500 text-white rounded-2xl p-3 sm:p-4 shadow-md flex flex-col items-center justify-center w-24 sm:w-28 h-28 sm:h-32 relative">
              <span className="text-[10px] font-bold uppercase text-sky-200">Âm Đầu</span>
              <span className="text-3xl sm:text-4xl font-black font-mono mt-1">
                {current.prefix}
              </span>
              <div className="absolute -bottom-2 flex gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-800 border-2 border-white inline-block"></span>
                <span className="w-4 h-4 rounded-full bg-slate-800 border-2 border-white inline-block"></span>
              </div>
            </div>

            {/* Train Car 2: Missing Rime Slot */}
            <div
              className={`rounded-2xl p-3 sm:p-4 shadow-md flex flex-col items-center justify-center w-28 sm:w-36 h-28 sm:h-32 border-3 border-dashed relative transition-all ${
                feedback === 'correct'
                  ? 'bg-emerald-500 text-white border-emerald-600 scale-105'
                  : feedback === 'wrong'
                  ? 'bg-rose-100 text-rose-800 border-rose-400 animate-shake'
                  : 'bg-white text-slate-400 border-amber-400'
              }`}
            >
              <span className="text-[10px] font-bold uppercase">
                {feedback === 'correct' ? 'ĐÚNG RỒI!' : 'VẦN THIẾU'}
              </span>
              <span className="text-3xl sm:text-4xl font-black font-mono mt-1">
                {feedback === 'correct' ? current.targetMissing : selectedAnswer || '?'}
              </span>
              <div className="absolute -bottom-2 flex gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-800 border-2 border-white inline-block"></span>
                <span className="w-4 h-4 rounded-full bg-slate-800 border-2 border-white inline-block"></span>
              </div>
            </div>
          </div>

          {/* Railroad Track */}
          <div className="w-full h-3 bg-amber-800 rounded-full shadow-inner relative flex justify-around items-center px-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="w-1 h-4 bg-amber-950 inline-block -mt-0.5"></span>
            ))}
          </div>
        </div>

        {/* Result Full Word Highlight */}
        {feedback === 'correct' && (
          <div className="bg-emerald-500 text-white rounded-2xl p-3.5 max-w-sm mx-auto shadow-lg animate-bounce flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-200" />
            <span className="text-sm font-black">
              Tu tu xình xịch! Bé ghép thành công từ: {current.fullWord} (+1 ⭐)
            </span>
          </div>
        )}

        {/* Options to Drag/Click */}
        <div className="space-y-3 pt-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Bé hãy chọn đúng thẻ vần dưới đây để đưa vào toa tàu:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {current.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleSelectOption(opt)}
                disabled={feedback !== 'idle'}
                className="w-20 sm:w-24 py-3.5 sm:py-4 rounded-2xl bg-white hover:bg-amber-50 active:scale-95 text-slate-800 font-black text-2xl sm:text-3xl border-2 border-amber-300 shadow-md hover:border-amber-500 transition-all cursor-pointer disabled:opacity-50"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
