import React, { useState, useEffect } from 'react';
import { Sparkles, BookOpen, Grid, Award, Volume2 } from 'lucide-react';
import {
  getAvailableVoices,
  getPreferredReadingVoice,
  setPreferredReadingVoice,
} from '../services/speechService';

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
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceUri, setSelectedVoiceUri] = useState<string | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const vi = getAvailableVoices();
      setVoices(vi);
      const pref = getPreferredReadingVoice();
      if (pref) {
        setSelectedVoiceUri(pref);
      } else if (vi.length > 0) {
        setSelectedVoiceUri(vi[0].voiceURI);
      }
    };

    loadVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const uri = e.target.value;
    setSelectedVoiceUri(uri);
    setPreferredReadingVoice(uri);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 space-y-2.5">
        {/* Hàng 1: Brand Logo + Chế độ đọc + Điểm Sao */}
        <div className="flex items-center justify-between gap-3">
          {/* Logo Brand */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 flex items-center justify-center text-white shadow-md font-black text-xl sm:text-2xl">
              A
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-800 leading-none">
                Bé Tập Đánh Vần
              </h1>
              <p className="text-[11px] font-bold text-amber-600 leading-tight hidden sm:block mt-0.5">
                Tiếng Việt 4-6 tuổi theo chuẩn sách gốc
              </p>
            </div>
          </div>

          {/* Công cụ hỗ trợ & Điểm sao */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Lựa chọn giọng đọc (nếu có trên thiết bị) */}
            {voices.length > 0 && (
              <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700">
                <Volume2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span className="text-slate-500 text-[11px]">Giọng:</span>
                <select
                  value={selectedVoiceUri || ''}
                  onChange={handleVoiceChange}
                  className="bg-transparent font-extrabold text-xs text-sky-800 focus:outline-hidden cursor-pointer max-w-[130px] truncate"
                >
                  {voices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name.replace('Microsoft ', '').replace('Google ', '')}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Chế độ: Đánh vần / Đọc trơn */}
            <button
              onClick={onToggleSpellMode}
              title={spellMode === 'spell' ? 'Chế độ đánh vần từng âm' : 'Chế độ đọc trơn'}
              className="px-2.5 sm:px-3 py-1.5 text-xs font-black rounded-xl border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-700 whitespace-nowrap cursor-pointer transition-all shadow-2xs active:scale-95 flex items-center gap-1"
            >
              <span className="text-amber-500 font-bold hidden sm:inline">Chế độ:</span>
              <span className="text-slate-900">{spellMode === 'spell' ? '🔤 Đánh vần' : '🗣️ Đọc trơn'}</span>
            </button>

            {/* Tốc độ đọc */}
            <button
              onClick={onToggleSlowRate}
              title="Tốc độ đọc"
              className="px-2.5 sm:px-3 py-1.5 text-xs font-black rounded-xl border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-700 whitespace-nowrap cursor-pointer transition-all shadow-2xs active:scale-95"
            >
              <span>{slowRate ? '🐢 Chậm' : '🐰 Vừa'}</span>
            </button>

            {/* Điểm Sao Thưởng */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border-2 border-amber-300 text-amber-900 rounded-xl font-black text-xs sm:text-sm shadow-2xs">
              <Award className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
              <span className="tabular-nums">{stars}</span>
              <span className="text-xs font-bold hidden sm:inline">sao</span>
            </div>
          </div>
        </div>

        {/* Hàng 2: THANH TAB CHÍNH - RÕ RÀNG, ĐẦY ĐỦ, RIÊNG BIỆT (TAB QUAN TRỌNG NHẤT) */}
        <nav className="grid grid-cols-3 gap-1.5 sm:gap-2.5 p-1.5 bg-slate-100 rounded-2xl border-2 border-slate-200/90 shadow-inner">
          {/* TAB 1: BẢNG CHỮ & DẤU */}
          <button
            onClick={() => onTabChange('alphabet')}
            className={`py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl font-black text-xs sm:text-base transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer text-center ${
              activeTab === 'alphabet'
                ? 'bg-amber-500 text-white shadow-md ring-4 ring-amber-200 scale-[1.02] border border-amber-600'
                : 'bg-white/80 hover:bg-white text-slate-700 hover:text-slate-950 border border-slate-200/60'
            }`}
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span className="truncate">Bảng Chữ & Dấu</span>
          </button>

          {/* TAB 2: ĐÁNH VẦN & LUYỆN ĐỌC */}
          <button
            onClick={() => onTabChange('phonics')}
            className={`py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl font-black text-xs sm:text-base transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer text-center ${
              activeTab === 'phonics'
                ? 'bg-sky-500 text-white shadow-md ring-4 ring-sky-200 scale-[1.02] border border-sky-600'
                : 'bg-white/80 hover:bg-white text-slate-700 hover:text-slate-950 border border-slate-200/60'
            }`}
          >
            <Grid className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span className="truncate">Đánh Vần & Luyện Đọc</span>
          </button>

          {/* TAB 3: TRÒ CHƠI SAO */}
          <button
            onClick={() => onTabChange('game')}
            className={`py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl font-black text-xs sm:text-base transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer text-center ${
              activeTab === 'game'
                ? 'bg-rose-500 text-white shadow-md ring-4 ring-rose-200 scale-[1.02] border border-rose-600'
                : 'bg-white/80 hover:bg-white text-slate-700 hover:text-slate-950 border border-slate-200/60'
            }`}
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span className="truncate">Trò Chơi Sao</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
