/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import {
  ALPHABET_DATA,
  TONES_DATA,
  VOWELS_WITH_TONES,
  AlphabetItem,
  ToneItem,
} from '../data/vietnameseData';
import { speakAI } from '../services/speechService';

interface AlphabetTabProps {
  onGainStar: () => void;
  slowRate: boolean;
}

export const AlphabetTab: React.FC<AlphabetTabProps> = ({ onGainStar, slowRate }) => {
  const [filter, setFilter] = useState<'all' | 'vowel' | 'consonant' | 'digraph'>('all');
  const [activeLetterId, setActiveLetterId] = useState<string | null>(null);
  const [activeTone, setActiveTone] = useState<string | null>(null);

  const filteredLetters = ALPHABET_DATA.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  // Chỉ phát âm DUY NHẤT âm của chữ cái cần học, không thêm từ ngữ nào khác, phát tức thì <10ms
  const handlePlayLetter = async (item: AlphabetItem) => {
    setActiveLetterId(item.id);
    await speakAI(item.soundName, {
      rate: slowRate ? 0.9 : 1.0,
      instant: true,
      onEnd: () => setActiveLetterId(null),
    });
    onGainStar();
  };

  // Chỉ phát âm DUY NHẤT tên dấu thanh (sắc, huyền, hỏi, ngã, nặng, ngang) tức thì
  const handlePlayToneOnly = async (toneKey: string, spokenSound: string) => {
    setActiveTone(toneKey);
    await speakAI(spokenSound, {
      rate: slowRate ? 0.9 : 1.0,
      instant: true,
      onEnd: () => setActiveTone(null),
    });
    onGainStar();
  };

  // Chỉ phát âm DUY NHẤT âm tiết có dấu tức thì
  const handlePlayVowelTone = async (syllable: string) => {
    if (!syllable) return;
    await speakAI(syllable, {
      rate: slowRate ? 0.9 : 1.0,
      instant: true,
    });
    onGainStar();
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Visual Filter Bar for Kids (To, Rõ, Ít Chữ, Dễ Chạm) */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-5 py-3 rounded-2xl font-black text-sm sm:text-base transition-all shrink-0 cursor-pointer shadow-xs ${
            filter === 'all'
              ? 'bg-amber-500 text-white scale-105 shadow-md'
              : 'bg-white hover:bg-amber-50 text-slate-700 border border-slate-200'
          }`}
        >
          🅰️ Tất cả chữ
        </button>
        <button
          onClick={() => setFilter('vowel')}
          className={`px-5 py-3 rounded-2xl font-black text-sm sm:text-base transition-all shrink-0 cursor-pointer shadow-xs ${
            filter === 'vowel'
              ? 'bg-amber-500 text-white scale-105 shadow-md'
              : 'bg-white hover:bg-amber-50 text-slate-700 border border-slate-200'
          }`}
        >
          🍎 a, e, i, o, u
        </button>
        <button
          onClick={() => setFilter('consonant')}
          className={`px-5 py-3 rounded-2xl font-black text-sm sm:text-base transition-all shrink-0 cursor-pointer shadow-xs ${
            filter === 'consonant'
              ? 'bg-amber-500 text-white scale-105 shadow-md'
              : 'bg-white hover:bg-amber-50 text-slate-700 border border-slate-200'
          }`}
        >
          🐻 b, c, d, đ
        </button>
        <button
          onClick={() => setFilter('digraph')}
          className={`px-5 py-3 rounded-2xl font-black text-sm sm:text-base transition-all shrink-0 cursor-pointer shadow-xs ${
            filter === 'digraph'
              ? 'bg-amber-500 text-white scale-105 shadow-md'
              : 'bg-white hover:bg-amber-50 text-slate-700 border border-slate-200'
          }`}
        >
          🐶 ch, kh, nh, th
        </button>
      </div>

      {/* Grid Chữ Cái To Bản - Thiết Kế Cho Trẻ Chưa Biết Đọc */}
      <section>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {filteredLetters.map((item) => {
            const isActive = activeLetterId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handlePlayLetter(item)}
                className={`relative flex flex-col items-center justify-center bg-white rounded-3xl p-5 border-2 transition-all duration-150 cursor-pointer shadow-xs active:scale-95 ${
                  isActive
                    ? 'border-amber-500 ring-4 ring-amber-200 scale-105 bg-amber-50'
                    : 'border-slate-200 hover:border-amber-400 hover:shadow-md'
                }`}
              >
                {/* Tranh minh họa to trực quan */}
                <span className="text-4xl sm:text-5xl mb-2 select-none filter drop-shadow-xs">
                  {item.exampleImage}
                </span>

                {/* Chữ cái cực đại, sắc nét */}
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                    {item.char}
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-slate-400">
                    {item.upper}
                  </span>
                </div>

                {/* Icon Loa Phát Âm */}
                <div className="mt-3 flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-700">
                  <Volume2 className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 5 Dấu Thanh: Chú Hề Tương Tác Trực Quan */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <h3 className="text-xl sm:text-2xl font-black text-slate-800 text-center mb-6">
          5 Dấu Thanh Tiếng Việt
        </h3>

        <div className="max-w-xl mx-auto flex flex-col items-center">
          {/* Mặt Chú Hề Tương Tác - Bé Chạm Trực Tiếp Vào Mặt Để Nghe Dấu */}
          <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-b from-amber-50 to-orange-50 border-4 border-amber-300 relative flex flex-col items-center justify-center shadow-inner my-2">
            {/* Mũ chú hề */}
            <div className="absolute -top-8 text-4xl select-none">🎩</div>

            {/* Lông mày: Chạm vào để nghe Sắc hoặc Huyền */}
            <div className="flex justify-between w-44 px-3 mb-2">
              {/* Dấu Huyền (trái) */}
              <button
                onClick={() => handlePlayToneOnly('huyen', 'huyền')}
                className={`flex flex-col items-center p-2 rounded-2xl transition-all cursor-pointer ${
                  activeTone === 'huyen' ? 'scale-125 bg-sky-200' : 'hover:scale-110'
                }`}
                title="Dấu huyền"
              >
                <span className="text-4xl font-black text-sky-600 font-mono select-none">`</span>
                <span className="text-xs font-black text-sky-800 mt-1">Huyền</span>
              </button>

              {/* Dấu Sắc (phải) */}
              <button
                onClick={() => handlePlayToneOnly('sac', 'sắc')}
                className={`flex flex-col items-center p-2 rounded-2xl transition-all cursor-pointer ${
                  activeTone === 'sac' ? 'scale-125 bg-amber-200' : 'hover:scale-110'
                }`}
                title="Dấu sắc"
              >
                <span className="text-4xl font-black text-amber-600 font-mono select-none">´</span>
                <span className="text-xs font-black text-amber-800 mt-1">Sắc</span>
              </button>
            </div>

            {/* Mắt: Chạm vào để nghe Dấu Ngã */}
            <button
              onClick={() => handlePlayToneOnly('nga', 'ngã')}
              className={`flex items-center gap-6 p-2 rounded-2xl transition-all cursor-pointer ${
                activeTone === 'nga' ? 'scale-125 bg-yellow-200' : 'hover:scale-110'
              }`}
              title="Dấu ngã"
            >
              <span className="text-3xl font-black text-yellow-600 select-none">~</span>
              <span className="text-3xl font-black text-yellow-600 select-none">~</span>
            </button>
            <span className="text-[11px] font-black text-yellow-800 -mt-1">Dấu Ngã</span>

            {/* Mũi đỏ chú hề */}
            <div className="w-9 h-9 rounded-full bg-rose-500 border-2 border-white shadow-sm flex items-center justify-center text-white my-1">
              🤡
            </div>

            {/* Miệng cười: Chạm vào để nghe Không Dấu (Ngang) */}
            <button
              onClick={() => handlePlayToneOnly('ngang', 'ngang')}
              className={`flex flex-col items-center p-1 rounded-xl transition-all cursor-pointer ${
                activeTone === 'ngang' ? 'scale-125 bg-purple-200' : 'hover:scale-110'
              }`}
              title="Không dấu (Ngang)"
            >
              <div className="w-18 h-3.5 border-b-4 border-purple-500 rounded-full"></div>
              <span className="text-[11px] font-black text-purple-800 mt-0.5">Ngang</span>
            </button>

            {/* Hai tai: Chạm vào để nghe Dấu Hỏi */}
            <button
              onClick={() => handlePlayToneOnly('hoi', 'hỏi')}
              className={`absolute -left-5 top-24 p-2 rounded-2xl transition-all cursor-pointer ${
                activeTone === 'hoi' ? 'scale-125 bg-emerald-200' : 'hover:scale-110'
              }`}
              title="Dấu hỏi"
            >
              <span className="text-4xl font-black text-emerald-600 select-none">?</span>
            </button>

            <button
              onClick={() => handlePlayToneOnly('hoi', 'hỏi')}
              className={`absolute -right-5 top-24 p-2 rounded-2xl transition-all cursor-pointer ${
                activeTone === 'hoi' ? 'scale-125 bg-emerald-200' : 'hover:scale-110'
              }`}
              title="Dấu hỏi"
            >
              <span className="text-4xl font-black text-emerald-600 select-none">?</span>
            </button>

            {/* Nốt ruồi cằm: Chạm vào để nghe Dấu Nặng */}
            <button
              onClick={() => handlePlayToneOnly('nang', 'nặng')}
              className={`absolute bottom-2 flex flex-col items-center p-1 rounded-xl transition-all cursor-pointer ${
                activeTone === 'nang' ? 'scale-125 bg-blue-200' : 'hover:scale-110'
              }`}
              title="Dấu nặng"
            >
              <div className="w-4 h-4 rounded-full bg-blue-600 mb-0.5"></div>
              <span className="text-[11px] font-black text-blue-800">Nặng</span>
            </button>
          </div>

          {/* 6 Phím Bấm Dấu Thanh To Bản Cho Bé Dễ Chọn */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mt-6">
            <button
              onClick={() => handlePlayToneOnly('sac', 'sắc')}
              className="py-3.5 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 text-amber-900 font-black text-lg flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
            >
              <span className="text-2xl font-mono">´</span>
              <span>Sắc</span>
            </button>

            <button
              onClick={() => handlePlayToneOnly('huyen', 'huyền')}
              className="py-3.5 px-4 rounded-2xl bg-sky-50 hover:bg-sky-100 border-2 border-sky-300 text-sky-900 font-black text-lg flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
            >
              <span className="text-2xl font-mono">`</span>
              <span>Huyền</span>
            </button>

            <button
              onClick={() => handlePlayToneOnly('hoi', 'hỏi')}
              className="py-3.5 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-300 text-emerald-900 font-black text-lg flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
            >
              <span className="text-2xl font-mono">?</span>
              <span>Hỏi</span>
            </button>

            <button
              onClick={() => handlePlayToneOnly('nga', 'ngã')}
              className="py-3.5 px-4 rounded-2xl bg-yellow-50 hover:bg-yellow-100 border-2 border-yellow-300 text-yellow-900 font-black text-lg flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
            >
              <span className="text-2xl font-mono">~</span>
              <span>Ngã</span>
            </button>

            <button
              onClick={() => handlePlayToneOnly('nang', 'nặng')}
              className="py-3.5 px-4 rounded-2xl bg-blue-50 hover:bg-blue-100 border-2 border-blue-300 text-blue-900 font-black text-lg flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
            >
              <span className="text-2xl font-mono">.</span>
              <span>Nặng</span>
            </button>

            <button
              onClick={() => handlePlayToneOnly('ngang', 'ngang')}
              className="py-3.5 px-4 rounded-2xl bg-purple-50 hover:bg-purple-100 border-2 border-purple-300 text-purple-900 font-black text-lg flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
            >
              <span className="text-2xl font-mono">—</span>
              <span>Ngang</span>
            </button>
          </div>
        </div>
      </section>

      {/* Bảng 10 Nguyên Âm Kèm Dấu - Nút To Trực Quan */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <h3 className="text-xl sm:text-2xl font-black text-slate-800 text-center mb-6">
          10 Nguyên Âm Có Dấu Thanh
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="text-sm sm:text-base font-black">
                <th className="p-2 text-purple-700 bg-purple-50/70 rounded-l-xl">— Ngang</th>
                <th className="p-2 text-amber-700 bg-amber-50/70">´ Sắc</th>
                <th className="p-2 text-sky-700 bg-sky-50/70">` Huyền</th>
                <th className="p-2 text-emerald-700 bg-emerald-50/70">? Hỏi</th>
                <th className="p-2 text-yellow-700 bg-yellow-50/70">~ Ngã</th>
                <th className="p-2 text-blue-700 bg-blue-50/70 rounded-r-xl">. Nặng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {VOWELS_WITH_TONES.map((row) => (
                <tr key={row.vowel} className="hover:bg-slate-50/50">
                  {row.tones.map((syllable, idx) => (
                    <td key={idx} className="p-1 sm:p-2">
                      <button
                        onClick={() => handlePlayVowelTone(syllable)}
                        className="w-full py-3 rounded-2xl font-black text-xl sm:text-2xl text-slate-800 hover:bg-amber-100 hover:text-amber-900 transition-all border border-transparent hover:border-amber-300 cursor-pointer active:scale-95"
                      >
                        {syllable}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
