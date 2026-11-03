/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, CheckCircle2, RotateCcw, Trophy } from 'lucide-react';
import { MATCHING_ROUNDS, MatchingRound } from '../../data/blendingData';
import { speakAI, spellOutSyllable } from '../../services/speechService';

interface MatchingPhonicsGameProps {
  onAddStar: () => void;
  slowRate: boolean;
}

export const MatchingPhonicsGame: React.FC<MatchingPhonicsGameProps> = ({
  onAddStar,
  slowRate,
}) => {
  const [roundIndex, setRoundIndex] = useState(0);
  const currentRound: MatchingRound = MATCHING_ROUNDS[roundIndex % MATCHING_ROUNDS.length];

  const [selectedOnset, setSelectedOnset] = useState<string | null>(null);
  const [selectedRime, setSelectedRime] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongPair, setWrongPair] = useState<boolean>(false);

  // Handle click on onset
  const handleSelectOnset = (onset: string) => {
    setSelectedOnset(onset);
    speakAI(onset, { rate: slowRate ? 0.75 : 0.85 });
    if (selectedRime) {
      checkMatch(onset, selectedRime);
    }
  };

  // Handle click on rime
  const handleSelectRime = (rime: string) => {
    setSelectedRime(rime);
    speakAI(rime, { rate: slowRate ? 0.75 : 0.85 });
    if (selectedOnset) {
      checkMatch(selectedOnset, rime);
    }
  };

  // Check matching pair
  const checkMatch = async (onset: string, rime: string) => {
    const matchedItem = currentRound.items.find(
      (item) => item.onset === onset && item.rimeAndTone === rime
    );

    if (matchedItem && !matchedIds.includes(matchedItem.id)) {
      const nextMatched = [...matchedIds, matchedItem.id];
      setMatchedIds(nextMatched);
      setSelectedOnset(null);
      setSelectedRime(null);

      // Play spelling audio
      try {
        await spellOutSyllable(matchedItem.word);
      } catch {
        await speakAI(matchedItem.spelling, { rate: slowRate ? 0.8 : 0.9 });
      }

      // Check if finished entire round
      if (nextMatched.length === currentRound.items.length) {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
        });
        onAddStar();
        await speakAI(`Hoan hô! Bé đã nối đúng tất cả các từ trong ${currentRound.title}!`, {
          rate: slowRate ? 0.8 : 0.9,
        });
      }
    } else {
      setWrongPair(true);
      await speakAI('Hai thẻ này chưa ghép thành từ đúng với tranh, bé thử lại nhé!');
      setTimeout(() => {
        setWrongPair(false);
        setSelectedOnset(null);
        setSelectedRime(null);
      }, 1200);
    }
  };

  // Reset round
  const handleResetRound = () => {
    setMatchedIds([]);
    setSelectedOnset(null);
    setSelectedRime(null);
    setWrongPair(false);
  };

  // Switch round
  const handleNextRound = () => {
    handleResetRound();
    setRoundIndex((prev) => (prev + 1) % MATCHING_ROUNDS.length);
  };

  const isRoundComplete = matchedIds.length === currentRound.items.length;

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>🧩</span>
            <span>{currentRound.title}</span>
          </h3>
          <p className="text-xs text-slate-500">
            Chọn 1 thẻ Âm đầu ở bên trái và 1 thẻ Vần ở bên phải để tạo thành từ đúng tranh.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetRound}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Nối lại</span>
          </button>
          <button
            onClick={handleNextRound}
            className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold transition-colors"
          >
            Đổi màn chơi →
          </button>
        </div>
      </div>

      {/* Main Matching Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Pictures Row at Top or Center */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {currentRound.items.map((item) => {
            const isDone = matchedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`p-3 rounded-2xl border-2 text-center transition-all ${
                  isDone
                    ? 'bg-emerald-50 border-emerald-400 shadow-xs scale-102'
                    : 'bg-slate-50 border-slate-200 opacity-75'
                }`}
              >
                <div className="text-4xl sm:text-5xl">{item.image}</div>
                <div className="text-sm font-black text-slate-800 mt-2">
                  {isDone ? item.word : '... ? ...'}
                </div>
                {isDone && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md inline-block mt-1">
                    ✓ Đã ghép đúng
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Matching Columns: Left = Onsets, Right = Rimes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
          {/* Left Column: Âm Đầu */}
          <div className="space-y-3">
            <span className="block text-xs font-bold uppercase tracking-wider text-sky-700 text-center">
              Cột Âm Đầu (Phụ Âm)
            </span>
            <div className="grid grid-cols-2 gap-3">
              {currentRound.items.map((item) => {
                const isMatched = matchedIds.includes(item.id);
                const isSelected = selectedOnset === item.onset;
                return (
                  <button
                    key={`onset_${item.id}`}
                    onClick={() => handleSelectOnset(item.onset)}
                    disabled={isMatched}
                    className={`py-4 px-6 rounded-2xl border-2 text-3xl font-black transition-all ${
                      isMatched
                        ? 'bg-emerald-100 border-emerald-400 text-emerald-800 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'bg-sky-500 border-sky-600 text-white shadow-md scale-105'
                        : 'bg-white border-sky-200 text-sky-900 hover:border-sky-400 hover:bg-sky-50 cursor-pointer shadow-xs'
                    }`}
                  >
                    {item.onset}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Vần & Dấu */}
          <div className="space-y-3">
            <span className="block text-xs font-bold uppercase tracking-wider text-rose-700 text-center">
              Cột Vần & Dấu Thanh
            </span>
            <div className="grid grid-cols-2 gap-3">
              {/* Shuffle slightly for puzzle feel */}
              {[...currentRound.items].reverse().map((item) => {
                const isMatched = matchedIds.includes(item.id);
                const isSelected = selectedRime === item.rimeAndTone;
                return (
                  <button
                    key={`rime_${item.id}`}
                    onClick={() => handleSelectRime(item.rimeAndTone)}
                    disabled={isMatched}
                    className={`py-4 px-6 rounded-2xl border-2 text-3xl font-black transition-all ${
                      isMatched
                        ? 'bg-emerald-100 border-emerald-400 text-emerald-800 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'bg-rose-500 border-rose-600 text-white shadow-md scale-105'
                        : 'bg-white border-rose-200 text-rose-900 hover:border-rose-400 hover:bg-rose-50 cursor-pointer shadow-xs'
                    }`}
                  >
                    {item.rimeAndTone}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Complete Celebration */}
        {isRoundComplete && (
          <div className="bg-emerald-600 text-white rounded-3xl p-6 text-center space-y-4 shadow-lg animate-bounce">
            <div className="text-4xl">🎉 ⭐ 🏆</div>
            <h4 className="text-lg font-black">
              Chúc mừng bé đã hoàn thành xuất sắc {currentRound.title}!
            </h4>
            <p className="text-xs text-emerald-100">
              Bé đã nhận thêm 1 Ngôi sao chăm chỉ vào bộ sưu tập!
            </p>
            <button
              onClick={handleNextRound}
              className="px-6 py-3 rounded-2xl bg-white text-emerald-800 font-bold text-sm shadow-md hover:bg-emerald-50 transition-colors"
            >
              Chơi tiếp màn sau →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
