/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Volume2, Award, RotateCcw, CheckCircle, HelpCircle } from 'lucide-react';
import { speakAI } from '../services/speechService';

interface PracticeGameTabProps {
  stars: number;
  onAddStar: () => void;
  slowRate: boolean;
}

interface SpellingQuiz {
  image: string;
  word: string;
  prompt: string;
  onset: string;
  vowelAndTone: string;
  missingPart: 'onset' | 'vowel';
  options: string[];
  correctAnswer: string;
  fullSpelling: string;
}

const SPELLING_QUIZZES: SpellingQuiz[] = [
  {
    image: '🐟',
    word: 'cá',
    prompt: 'Ghép chữ tạo thành từ "con cá"',
    onset: 'c',
    vowelAndTone: 'á',
    missingPart: 'onset',
    options: ['c', 'b', 'd', 'm'],
    correctAnswer: 'c',
    fullSpelling: 'cờ - a - ca - sắc - cá',
  },
  {
    image: '🐂',
    word: 'bò',
    prompt: 'Ghép chữ tạo thành từ "con bò"',
    onset: 'b',
    vowelAndTone: 'ò',
    missingPart: 'vowel',
    options: ['ò', 'à', 'è', 'ù'],
    correctAnswer: 'ò',
    fullSpelling: 'bờ - o - bo - huyền - bò',
  },
  {
    image: '🍈',
    word: 'đu đủ',
    prompt: 'Điền chữ còn thiếu: "đu ..."',
    onset: 'đ',
    vowelAndTone: 'ủ',
    missingPart: 'vowel',
    options: ['ủ', 'ả', 'ỏ', 'ỉ'],
    correctAnswer: 'ủ',
    fullSpelling: 'đờ - u - đu - hỏi - đủ',
  },
  {
    image: '🐶',
    word: 'chó xù',
    prompt: 'Ghép chữ tạo thành: "... xù"',
    onset: 'ch',
    vowelAndTone: 'ó',
    missingPart: 'onset',
    options: ['ch', 'th', 'tr', 'nh'],
    correctAnswer: 'ch',
    fullSpelling: 'chờ - o - cho - sắc - chó',
  },
  {
    image: '✈️',
    word: 'máy bay',
    prompt: 'Ghép chữ tạo thành: "máy ..."',
    onset: 'b',
    vowelAndTone: 'ay',
    missingPart: 'onset',
    options: ['b', 'c', 'l', 'v'],
    correctAnswer: 'b',
    fullSpelling: 'bờ - ay - bay',
  },
  {
    image: '🐱',
    word: 'chú mèo',
    prompt: 'Ghép chữ tạo thành: "chú ..."',
    onset: 'm',
    vowelAndTone: 'èo',
    missingPart: 'vowel',
    options: ['èo', 'ào', 'eo', 'âu'],
    correctAnswer: 'èo',
    fullSpelling: 'mờ - eo - meo - huyền - mèo',
  },
];

interface ListeningQuiz {
  targetWord: string;
  spokenAudio: string;
  options: { text: string; image: string }[];
  correctIndex: number;
}

const LISTENING_QUIZZES: ListeningQuiz[] = [
  {
    targetWord: 'bể cá',
    spokenAudio: 'bể cá',
    options: [
      { text: 'bể cá', image: '🐠' },
      { text: 'bò bê', image: '🐄' },
      { text: 'bé bi', image: '👶' },
      { text: 'bó cỏ', image: '🌾' },
    ],
    correctIndex: 0,
  },
  {
    targetWord: 'quả na',
    spokenAudio: 'quả na',
    options: [
      { text: 'quả nho', image: '🍇' },
      { text: 'quả na', image: '🍈' },
      { text: 'quả khế', image: '⭐' },
      { text: 'quả me', image: '🌿' },
    ],
    correctIndex: 1,
  },
  {
    targetWord: 'sư tử',
    spokenAudio: 'sư tử',
    options: [
      { text: 'hổ dữ', image: '🐯' },
      { text: 'chú thỏ', image: '🐰' },
      { text: 'sư tử', image: '🦁' },
      { text: 'chó xù', image: '🐩' },
    ],
    correctIndex: 2,
  },
  {
    targetWord: 'ngôi sao',
    spokenAudio: 'ngôi sao',
    options: [
      { text: 'mặt trăng', image: '🌙' },
      { text: 'cái phao', image: '🛟' },
      { text: 'bông hoa', image: '🌸' },
      { text: 'ngôi sao', image: '⭐' },
    ],
    correctIndex: 3,
  },
];

export const PracticeGameTab: React.FC<PracticeGameTabProps> = ({
  stars,
  onAddStar,
  slowRate,
}) => {
  const [activeGame, setActiveGame] = useState<'spell_quiz' | 'listen_quiz'>('spell_quiz');

  // Spelling Quiz State
  const [spellIndex, setSpellIndex] = useState(0);
  const [spellFeedback, setSpellFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Listening Quiz State
  const [listenIndex, setListenIndex] = useState(0);
  const [listenFeedback, setListenFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const currentSpellQuiz = SPELLING_QUIZZES[spellIndex];
  const currentListenQuiz = LISTENING_QUIZZES[listenIndex];

  // Fireworks celebration
  const triggerConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // Handle Answer in Game 1
  const handleSelectSpellOption = async (option: string) => {
    if (spellFeedback !== 'idle') return;

    if (option === currentSpellQuiz.correctAnswer) {
      setSpellFeedback('correct');
      triggerConfetti();
      onAddStar();
      // Chỉ phát âm DUY NHẤT từ vựng vừa ghép đúng
      await speakAI(currentSpellQuiz.word, {
        rate: slowRate ? 0.75 : 0.85,
      });
      setTimeout(() => {
        setSpellFeedback('idle');
        setSpellIndex((prev) => (prev + 1) % SPELLING_QUIZZES.length);
      }, 1500);
    } else {
      setSpellFeedback('wrong');
      setTimeout(() => setSpellFeedback('idle'), 1000);
    }
  };

  // Handle Answer in Game 2
  const handlePlayListeningAudio = async () => {
    // Chỉ phát âm DUY NHẤT từ vựng cần nghe
    await speakAI(currentListenQuiz.spokenAudio, {
      rate: slowRate ? 0.75 : 0.85,
    });
  };

  const handleSelectListenOption = async (index: number) => {
    if (listenFeedback !== 'idle') return;

    if (index === currentListenQuiz.correctIndex) {
      setListenFeedback('correct');
      triggerConfetti();
      onAddStar();
      // Chỉ phát âm DUY NHẤT từ vựng đúng
      await speakAI(currentListenQuiz.targetWord, {
        rate: slowRate ? 0.75 : 0.85,
      });
      setTimeout(() => {
        setListenFeedback('idle');
        setListenIndex((prev) => (prev + 1) % LISTENING_QUIZZES.length);
      }, 1500);
    } else {
      setListenFeedback('wrong');
      setTimeout(() => setListenFeedback('idle'), 1000);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Game Selector Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveGame('spell_quiz')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeGame === 'spell_quiz'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Trò Chơi 1: Bé Ghép Chữ Đúng Tranh
          </button>
          <button
            onClick={() => setActiveGame('listen_quiz')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeGame === 'listen_quiz'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Trò Chơi 2: Ai Tai Tinh Hơn?
          </button>
        </div>

        {/* Badges Earned */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Huy hiệu:</span>
          {stars >= 5 ? (
            <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300 flex items-center gap-1">
              ⭐ Bé Chăm Chỉ
            </span>
          ) : (
            <span className="text-xs text-slate-400">
              Cần {5 - stars} sao nữa để nhận huy hiệu đầu tiên
            </span>
          )}
          {stars >= 15 && (
            <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 flex items-center gap-1">
              🏆 Vua Đánh Vần
            </span>
          )}
        </div>
      </div>

      {/* GAME 1: BÉ GHÉP CHỮ */}
      {activeGame === 'spell_quiz' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
              Câu hỏi {spellIndex + 1} / {SPELLING_QUIZZES.length}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-1">
              {currentSpellQuiz.prompt}
            </h3>
          </div>

          {/* Picture Box */}
          <div className="w-36 h-36 mx-auto rounded-3xl bg-rose-50 border-2 border-rose-200 flex items-center justify-center text-6xl shadow-inner">
            {currentSpellQuiz.image}
          </div>

          {/* Letter Slot Container */}
          <div className="flex items-center justify-center gap-3 py-2">
            {currentSpellQuiz.missingPart === 'onset' ? (
              <>
                <div className="w-16 h-16 rounded-2xl border-3 border-dashed border-rose-400 bg-rose-50/50 flex items-center justify-center text-3xl font-black text-rose-600 animate-pulse">
                  ?
                </div>
                <div className="text-2xl font-bold text-slate-300">+</div>
                <div className="w-16 h-16 rounded-2xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-3xl font-black text-slate-700">
                  {currentSpellQuiz.vowelAndTone}
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-2xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-3xl font-black text-slate-700">
                  {currentSpellQuiz.onset}
                </div>
                <div className="text-2xl font-bold text-slate-300">+</div>
                <div className="w-16 h-16 rounded-2xl border-3 border-dashed border-rose-400 bg-rose-50/50 flex items-center justify-center text-3xl font-black text-rose-600 animate-pulse">
                  ?
                </div>
              </>
            )}
          </div>

          {/* Feedback Banner */}
          {spellFeedback === 'correct' && (
            <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-2xl font-bold text-sm animate-bounce">
              🎉 Bé giỏi quá! Hoan hô bé đã được +1 Sao Vàng!
            </div>
          )}
          {spellFeedback === 'wrong' && (
            <div className="p-3 bg-amber-100 border border-amber-300 text-amber-800 rounded-2xl font-bold text-sm">
              🤔 Chưa đúng rồi! Bé nhìn kỹ tranh và chọn lại nhé!
            </div>
          )}

          {/* Multiple Choice Letter Options */}
          <div>
            <p className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
              Chạm vào chữ cái đúng để ghép vào ô trống
            </p>
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {currentSpellQuiz.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelectSpellOption(opt)}
                  disabled={spellFeedback !== 'idle'}
                  className="py-4 rounded-2xl font-black text-3xl bg-slate-50 hover:bg-rose-500 hover:text-white text-slate-800 border-2 border-slate-200 hover:border-rose-600 transition-all cursor-pointer shadow-xs active:scale-95 disabled:opacity-50"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* GAME 2: AI TAI TINH HƠN */}
      {activeGame === 'listen_quiz' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm text-center space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-500">
              Câu hỏi {listenIndex + 1} / {LISTENING_QUIZZES.length}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-1">
              Bé Hãy Bấm Loa Nghe Cô Đọc Và Chọn Từ Đúng!
            </h3>
          </div>

          {/* Big Audio Play Button */}
          <div className="py-4">
            <button
              onClick={handlePlayListeningAudio}
              className="px-8 py-5 rounded-3xl bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white font-black text-lg sm:text-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 mx-auto cursor-pointer active:scale-95"
            >
              <Volume2 className="w-8 h-8" />
              <span>Bấm Để Nghe Cô Đọc</span>
            </button>
            <p className="text-xs text-slate-400 mt-2">
              (Bé có thể bấm nhiều lần nếu chưa nghe rõ)
            </p>
          </div>

          {/* Feedback Banner */}
          {listenFeedback === 'correct' && (
            <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-2xl font-bold text-sm animate-bounce">
              🎉 Bé có đôi tai thật tinh! Thưởng cho bé 1 Ngôi Sao Vàng!
            </div>
          )}
          {listenFeedback === 'wrong' && (
            <div className="p-3 bg-amber-100 border border-amber-300 text-amber-800 rounded-2xl font-bold text-sm">
              🤔 Chưa đúng rồi! Bé bấm loa nghe lại lần nữa nhé!
            </div>
          )}

          {/* 4 Choices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {currentListenQuiz.options.map((option, idx) => (
              <button
                key={option.text}
                onClick={() => handleSelectListenOption(idx)}
                disabled={listenFeedback !== 'idle'}
                className="p-5 rounded-2xl border-2 border-slate-200 hover:border-sky-500 bg-slate-50 hover:bg-sky-50/50 transition-all flex items-center gap-4 text-left cursor-pointer shadow-xs active:scale-98 disabled:opacity-50"
              >
                <span className="text-4xl">{option.image}</span>
                <div>
                  <span className="text-xl font-black text-slate-800 block">
                    {option.text}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Chạm để chọn</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
