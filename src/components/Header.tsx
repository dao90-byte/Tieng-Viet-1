/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Volume2, Sparkles, BookOpen, Grid, Award, HelpCircle } from 'lucide-react';

export type TabType = 'alphabet' | 'phonics' | 'game';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  spellMode: 'spell' | 'smooth';
  onToggleSpellMode: () => void;
  slowRate: boolean;
  onToggleSlowRate: () => void;
  stars: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  spellMode,
  onToggleSpellMode,
  slowRate,
  onToggleSlowRate,
  stars,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-400 flex items-center justify-center text-white shadow-sm font-black text-xl">
            A
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-800 leading-tight">
              Bé Tập Đánh Vần
            </h1>
          </div>
        </div>

        {/* Navigation Tabs (3 distinct top-level tabs) */}
        <nav className="flex items-center gap-1 sm:gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 shadow-2xs overflow-x-auto scrollbar-none">
          <button
            onClick={() => onTabChange('alphabet')}
            className={`px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-extrabold rounded-xl whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'alphabet'
                ? 'bg-amber-500 text-white shadow-sm scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Bảng Chữ & Dấu</span>
          </button>

          <button
            onClick={() => onTabChange('phonics')}
            className={`px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-extrabold rounded-xl whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'phonics'
                ? 'bg-sky-500 text-white shadow-sm scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Đánh Vần & Luyện Đọc</span>
          </button>

          <button
            onClick={() => onTabChange('game')}
            className={`px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-extrabold rounded-xl whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'game'
                ? 'bg-rose-500 text-white shadow-sm scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Trò Chơi Sao</span>
          </button>
        </nav>

        {/* Action Controls & Star Reward */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick toggle spelling mode */}
          <button
            onClick={onToggleSpellMode}
            title={spellMode === 'spell' ? 'Chế độ đánh vần từng âm' : 'Chế độ đọc trơn'}
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 whitespace-nowrap"
          >
            <span className="text-amber-500">Mode:</span>
            <span>{spellMode === 'spell' ? 'Đánh vần' : 'Đọc trơn'}</span>
          </button>

          {/* Quick speed toggle */}
          <button
            onClick={onToggleSlowRate}
            title="Tốc độ đọc"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 whitespace-nowrap"
          >
            <span>{slowRate ? '🐢 Chậm rãi' : '🐰 Tự nhiên'}</span>
          </button>

          {/* Star Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl font-bold text-xs sm:text-sm shadow-xs">
            <Award className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span className="tabular-nums font-black">{stars}</span>
            <span className="text-xs font-normal hidden lg:inline">sao</span>
          </div>
        </div>
      </div>
    </header>
  );
};
