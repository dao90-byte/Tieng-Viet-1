/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, Sparkles } from 'lucide-react';
import { BalloonPhonicsGame } from './games/BalloonPhonicsGame';

interface PracticeGameTabProps {
  stars: number;
  onAddStar: () => void;
  slowRate: boolean;
}

export const PracticeGameTab: React.FC<PracticeGameTabProps> = ({
  stars,
  onAddStar,
  slowRate,
}) => {
  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header Bar: Trophy & Star Progress (Font chữ lớn hơn 1-2 đơn vị, Zero-pill) */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 border border-rose-200 flex items-center justify-center text-2xl shadow-xs">
            🎈
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <span>Vùng Đất Bong Bóng Ghép Vần & Luyện Tai Tinh</span>
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              5 Chặng học chuẩn 100% ngữ âm & bài đọc theo sách giáo khoa lớp 1
            </p>
          </div>
        </div>

        {/* Stars and Badges Info */}
        <div className="flex items-center gap-4 text-sm font-bold text-slate-700 shrink-0">
          <div className="flex items-center gap-1.5 text-amber-600 font-black text-base sm:text-lg bg-amber-50 px-3.5 py-1.5 rounded-2xl border border-amber-200 shadow-xs">
            <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
            <span>{stars} Ngôi Sao</span>
          </div>

          <span aria-hidden="true" className="text-slate-300">·</span>

          {stars >= 5 ? (
            <span className="text-amber-700 flex items-center gap-1.5 font-black">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>⭐ Bé Chăm Chỉ</span>
            </span>
          ) : (
            <span className="text-slate-400 text-xs sm:text-sm font-normal">
              Cần {5 - stars} sao nữa nhận huy hiệu
            </span>
          )}

          {stars >= 15 && (
            <>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-emerald-700 flex items-center gap-1.5 font-black">
                🏆 Vua Đánh Vần
              </span>
            </>
          )}
        </div>
      </div>

      {/* 2. Flagship Unified Game Viewport */}
      <BalloonPhonicsGame onAddStar={onAddStar} slowRate={slowRate} />
    </div>
  );
};
