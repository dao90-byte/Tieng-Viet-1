/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Sparkles,
  RefreshCw,
  Trophy,
  CheckCircle2,
  HelpCircle,
  Play,
} from 'lucide-react';
import {
  ONSETS,
  RIMES,
  TONES,
  ToneType,
  combinePhonics,
  MEANINGFUL_WORDS,
  MeaningfulWord,
} from '../../data/blendingData';
import { speakAI, spellOutSyllable } from '../../services/speechService';

interface PhonicsBuilderGameProps {
  onAddStar: () => void;
  slowRate: boolean;
}

export const PhonicsBuilderGame: React.FC<PhonicsBuilderGameProps> = ({
  onAddStar,
  slowRate,
}) => {
  // Selected parts in the lab
  const [selectedOnset, setSelectedOnset] = useState<string>('c');
  const [selectedRime, setSelectedRime] = useState<string>('a');
  const [selectedTone, setSelectedTone] = useState<ToneType>('sac');

  // Spelling animation state
  const [isSpelling, setIsSpelling] = useState<boolean>(false);
  const [activeStepText, setActiveStepText] = useState<string>('');

  // Challenge Mode State
  const [isChallengeMode, setIsChallengeMode] = useState<boolean>(false);
  const [challengeIndex, setChallengeIndex] = useState<number>(0);
  const [challengeFeedback, setChallengeFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const currentChallenge: MeaningfulWord = MEANINGFUL_WORDS[challengeIndex % MEANINGFUL_WORDS.length];

  // Combine result
  const combined = combinePhonics(selectedOnset, selectedRime, selectedTone);

  // Play spelling audio
  const handleSpellAndPronounce = async () => {
    if (isSpelling) return;
    setIsSpelling(true);
    setActiveStepText('');

    try {
      // Gọi hàm đánh vần chuẩn từng bước
      await spellOutSyllable(combined.syllable, (step) => {
        setActiveStepText(step.text);
      });
    } catch {
      // Fallback
      await speakAI(combined.spellingScript, {
        rate: slowRate ? 0.75 : 0.85,
      });
    } finally {
      setIsSpelling(false);
      setActiveStepText('');
    }
  };

  // Check Challenge Answer
  const handleCheckChallenge = async () => {
    const isCorrect =
      selectedOnset === currentChallenge.onset &&
      selectedRime === currentChallenge.rimeKey &&
      selectedTone === currentChallenge.tone;

    if (isCorrect) {
      setChallengeFeedback('correct');
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
      onAddStar();

      await spellOutSyllable(currentChallenge.word);
      await speakAI(`Đúng rồi! Bé đã chế tạo thành công tiếng ${currentChallenge.word}!`, {
        rate: slowRate ? 0.8 : 0.9,
      });

      setTimeout(() => {
        setChallengeFeedback('idle');
        setChallengeIndex((prev) => (prev + 1) % MEANINGFUL_WORDS.length);
      }, 1600);
    } else {
      setChallengeFeedback('wrong');
      await speakAI('Chưa chính xác rồi, bé hãy thử chọn lại phụ âm hoặc vần nhé!');
      setTimeout(() => setChallengeFeedback('idle'), 1500);
    }
  };

  // Ask Teacher Prompt in Challenge Mode
  const handlePlayChallengePrompt = async () => {
    await speakAI(`Thử thách: Bé hãy chế tạo tiếng ${currentChallenge.word}! ${currentChallenge.meaning}`, {
      rate: slowRate ? 0.75 : 0.85,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header bar with Mode Switcher */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsChallengeMode(false);
              setChallengeFeedback('idle');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              !isChallengeMode
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            🧪 Tự Do Chế Tạo Tiếng
          </button>
          <button
            onClick={() => {
              setIsChallengeMode(true);
              handlePlayChallengePrompt();
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              isChallengeMode
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            🎯 Đố Bé Ghép Tiếng Đúng
          </button>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-2">
          <span>Chuẩn ngữ âm 100% Bộ GD&ĐT</span>
        </div>
      </div>

      {/* Challenge Banner if active */}
      {isChallengeMode && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-5 text-center space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl">{currentChallenge.image}</span>
            <div className="text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                Thử Thách Ghép Tiếng #{challengeIndex + 1}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-amber-900">
                Bé hãy ghép tiếng: <span className="underline decoration-amber-500 underline-offset-4">{currentChallenge.word}</span>
              </h3>
              <p className="text-xs text-amber-700">{currentChallenge.meaning}</p>
            </div>
            <button
              onClick={handlePlayChallengePrompt}
              className="p-3 bg-white text-amber-800 rounded-2xl border border-amber-200 shadow-xs hover:bg-amber-100 transition-colors ml-2"
              title="Nghe câu hỏi"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {challengeFeedback === 'correct' && (
            <div className="p-2.5 bg-emerald-500 text-white rounded-xl text-xs font-bold animate-bounce flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Chính xác! Bé được cộng thêm 1 sao ⭐</span>
            </div>
          )}

          {challengeFeedback === 'wrong' && (
            <div className="p-2.5 bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2">
              <span>Chưa đúng rồi! Bé thử kiểm tra lại các khối nhé!</span>
            </div>
          )}
        </div>
      )}

      {/* Main Phonics Machine Display */}
      <div className="bg-gradient-to-b from-amber-500/10 via-white to-amber-500/5 rounded-3xl border-2 border-amber-200 p-6 sm:p-8 shadow-sm text-center space-y-6">
        <div className="text-xs font-bold uppercase tracking-widest text-amber-800">
          Cỗ Máy Ghép Tiếng 3 Thành Phần
        </div>

        {/* 3 Blocks Assembly Visualization */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          {/* Block 1: Onset */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 border-2 border-sky-400 shadow-md min-w-24 sm:min-w-28 text-center">
            <span className="block text-[11px] font-semibold text-sky-600 uppercase">
              1. Âm Đầu
            </span>
            <span className="text-3xl sm:text-4xl font-black text-sky-700 font-mono">
              {selectedOnset}
            </span>
            <span className="block text-[10px] text-slate-400 mt-1">
              (đọc: {ONSETS.find((o) => o.key === selectedOnset)?.spokenName})
            </span>
          </div>

          <span className="text-2xl font-bold text-amber-500">+</span>

          {/* Block 2: Rime */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 border-2 border-emerald-400 shadow-md min-w-24 sm:min-w-28 text-center">
            <span className="block text-[11px] font-semibold text-emerald-600 uppercase">
              2. Vần
            </span>
            <span className="text-3xl sm:text-4xl font-black text-emerald-700 font-mono">
              {RIMES.find((r) => r.key === selectedRime)?.label}
            </span>
            <span className="block text-[10px] text-slate-400 mt-1">
              (vần: {RIMES.find((r) => r.key === selectedRime)?.spokenName})
            </span>
          </div>

          <span className="text-2xl font-bold text-amber-500">+</span>

          {/* Block 3: Tone */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 border-2 border-rose-400 shadow-md min-w-24 sm:min-w-28 text-center">
            <span className="block text-[11px] font-semibold text-rose-600 uppercase">
              3. Thanh
            </span>
            <span className="text-3xl sm:text-4xl font-black text-rose-700">
              {TONES.find((t) => t.id === selectedTone)?.symbol}
            </span>
            <span className="block text-[10px] text-slate-400 mt-1">
              ({TONES.find((t) => t.id === selectedTone)?.name})
            </span>
          </div>

          <span className="text-2xl font-bold text-amber-500">=</span>

          {/* Result Block: Combined Syllable */}
          <div className="bg-amber-500 text-white rounded-2xl p-4 sm:p-5 shadow-lg min-w-32 sm:min-w-40 text-center transform transition-transform hover:scale-105">
            <span className="block text-[11px] font-bold text-amber-100 uppercase tracking-wider">
              Tiếng Ghép Được
            </span>
            <span className="text-4xl sm:text-5xl font-black tracking-wide drop-shadow-sm">
              {combined.syllable}
            </span>
            {combined.foundMeaning && (
              <span className="block text-xs font-semibold text-amber-100 mt-1 flex items-center justify-center gap-1">
                <span>{combined.foundMeaning.image}</span>
                <span>{combined.foundMeaning.word}</span>
              </span>
            )}
          </div>
        </div>

        {/* Live Spelling Step Indicator */}
        {activeStepText && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs sm:text-sm font-bold border border-amber-300 animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Đang đánh vần: {activeStepText}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleSpellAndPronounce}
            disabled={isSpelling}
            className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm sm:text-base shadow-md transition-all active:scale-98 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Volume2 className="w-5 h-5" />
            <span>{isSpelling ? 'Đang Đánh Vần...' : 'Đánh Vần Từng Bước 📢'}</span>
          </button>

          {isChallengeMode ? (
            <button
              onClick={handleCheckChallenge}
              className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-md transition-all active:scale-98 flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Kiểm Tra Thử Thách 🎯</span>
            </button>
          ) : (
            <button
              onClick={() => {
                // Random combination
                const randomOnset = ONSETS[Math.floor(Math.random() * ONSETS.length)].key;
                const randomRime = RIMES[Math.floor(Math.random() * RIMES.length)].key;
                const randomTone = TONES[Math.floor(Math.random() * TONES.length)].id;
                setSelectedOnset(randomOnset);
                setSelectedRime(randomRime);
                setSelectedTone(randomTone);
              }}
              className="px-4 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Thử Tiếng Khác</span>
            </button>
          )}
        </div>
      </div>

      {/* Part Selection Trays */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tray 1: Phụ Âm Đầu */}
        <div className="bg-white rounded-3xl p-4 border border-sky-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-sky-100">
            <h4 className="text-xs font-bold text-sky-800 uppercase">
              1. Chọn Phụ Âm Đầu ({ONSETS.length})
            </h4>
            <span className="text-[11px] font-semibold text-sky-600">
              Đang chọn: {selectedOnset}
            </span>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-4 gap-1.5 max-h-56 overflow-y-auto p-1">
            {ONSETS.map((o) => (
              <button
                key={o.key}
                onClick={() => {
                  setSelectedOnset(o.key);
                  speakAI(o.spokenName, { rate: slowRate ? 0.75 : 0.85 });
                }}
                className={`p-2 rounded-xl text-xs sm:text-sm font-black border transition-all ${
                  selectedOnset === o.key
                    ? 'bg-sky-500 text-white border-sky-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-sky-50'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tray 2: Vần */}
        <div className="bg-white rounded-3xl p-4 border border-emerald-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
            <h4 className="text-xs font-bold text-emerald-800 uppercase">
              2. Chọn Vần ({RIMES.length})
            </h4>
            <span className="text-[11px] font-semibold text-emerald-600">
              Đang chọn: {selectedRime}
            </span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-4 gap-1.5 max-h-56 overflow-y-auto p-1">
            {RIMES.map((r) => (
              <button
                key={r.key}
                onClick={() => {
                  setSelectedRime(r.key);
                  speakAI(r.spokenName, { rate: slowRate ? 0.75 : 0.85 });
                }}
                className={`p-2 rounded-xl text-xs sm:text-sm font-black border transition-all ${
                  selectedRime === r.key
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tray 3: Dấu Thanh */}
        <div className="bg-white rounded-3xl p-4 border border-rose-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-rose-100">
            <h4 className="text-xs font-bold text-rose-800 uppercase">
              3. Chọn Dấu Thanh (6)
            </h4>
            <span className="text-[11px] font-semibold text-rose-600">
              {TONES.find((t) => t.id === selectedTone)?.label}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 p-1">
            {TONES.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setSelectedTone(t.id);
                  speakAI(t.name, { rate: slowRate ? 0.75 : 0.85 });
                }}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  selectedTone === t.id
                    ? 'bg-rose-500 text-white border-rose-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-rose-50'
                }`}
              >
                <div className="text-2xl font-black">{t.symbol}</div>
                <div className="text-xs font-bold mt-0.5">{t.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
