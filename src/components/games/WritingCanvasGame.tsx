/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  RotateCcw,
  Eraser,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Info,
  CheckCircle2,
  Pencil,
} from 'lucide-react';
import { WRITING_ITEMS, WritingItem } from '../../data/writingData';
import { speakAI } from '../../services/speechService';

interface WritingCanvasGameProps {
  onAddStar: () => void;
  slowRate: boolean;
}

export const WritingCanvasGame: React.FC<WritingCanvasGameProps> = ({
  onAddStar,
  slowRate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'letter' | 'tone' | 'word'>('letter');
  const filteredItems = WRITING_ITEMS.filter((item) => item.category === selectedCategory);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem: WritingItem = filteredItems[currentIndex] || filteredItems[0];

  // Pen tool state
  const [penColor, setPenColor] = useState<string>('#7c3aed'); // Mực tím học trò
  const [penSize, setPenSize] = useState<number>(6); // Cỡ nét bút
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const [hasDrawn, setHasDrawn] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(true);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // Switch category
  const handleSelectCategory = (cat: 'letter' | 'tone' | 'word') => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  // Switch item
  const handleNextItem = () => {
    if (currentIndex < filteredItems.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
    setIsCompleted(false);
  };

  const handlePrevItem = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(filteredItems.length - 1);
    }
    setIsCompleted(false);
  };

  // Draw Primary School Grid (Lưới ô ly chuẩn tiểu học)
  const drawSchoolGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.save();
    ctx.clearRect(0, 0, width, height);

    // Nền giấy trắng ngà dịu mắt
    ctx.fillStyle = '#fffdfa';
    ctx.fillRect(0, 0, width, height);

    const step = 32; // Mỗi ô vuông ô ly 32px
    ctx.lineWidth = 0.8;

    // Đường kẻ dọc ô ly
    for (let x = 0; x <= width; x += step) {
      ctx.beginPath();
      ctx.strokeStyle = x % (step * 4) === 0 ? '#bbf7d0' : '#e2e8f0'; // Cột phân ô chính
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Đường kẻ ngang ô ly
    // Baseline (Đường kẻ đậm đáy chữ) tại giữa canvas
    const baselineY = Math.floor(height * 0.65);

    for (let y = baselineY % step; y <= height; y += step) {
      ctx.beginPath();
      if (Math.abs(y - baselineY) < 2) {
        // Đường kẻ đậm số 1 (Dòng kẻ đáy con chữ)
        ctx.strokeStyle = '#059669';
        ctx.lineWidth = 2.2;
      } else if (Math.abs(y - (baselineY - step * 2)) < 2) {
        // Đường kẻ số 3 (Độ cao chữ thường 2 ly: a, c, e, o...)
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 1.2;
      } else if (Math.abs(y - (baselineY - step * 5)) < 2) {
        // Đường kẻ số 6 (Độ cao nét khuyết trên 5 ly: b, h, k, l)
        ctx.strokeStyle = '#6ee7b7';
        ctx.lineWidth = 1.2;
      } else {
        // Đường kẻ phụ
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 0.8;
      }
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.restore();
  };

  // Clear & redraw canvas
  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawSchoolGrid(ctx, canvas.width, canvas.height);
    setHasDrawn(false);
    setIsCompleted(false);
  };

  // Redraw grid whenever item or window dimensions change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions according to container
    const rect = canvas.getBoundingClientRect();
    if (canvas.width !== rect.width || canvas.height !== rect.height) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    drawSchoolGrid(ctx, canvas.width, canvas.height);
    setHasDrawn(false);
    setIsCompleted(false);

    // Tự động đọc tên chữ khi chuyển bài
    speakAI(currentItem.spellingAudio, { rate: slowRate ? 0.75 : 0.85 });
  }, [currentItem, slowRate]);

  // Pointer position helper
  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  // Start Drawing
  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const coords = getCoordinates(e);
    if (!coords) return;
    isDrawingRef.current = true;
    lastPosRef.current = coords;
    setHasDrawn(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dot on single tap
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (isEraser) {
      ctx.strokeStyle = '#fffdfa';
      ctx.lineWidth = penSize * 3;
    } else {
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penSize;
    }
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, ctx.lineWidth / 2, 0, Math.PI * 2);
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fill();
    ctx.restore();
  };

  // Continue Drawing
  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawingRef.current || !lastPosRef.current) return;
    const coords = getCoordinates(e);
    if (!coords) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (isEraser) {
      ctx.strokeStyle = '#fffdfa';
      ctx.lineWidth = penSize * 3;
    } else {
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penSize;
    }

    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    ctx.restore();

    lastPosRef.current = coords;
  };

  // Stop Drawing
  const stopDrawing = () => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  };

  // Pronounce audio
  const handlePlaySpelling = async () => {
    await speakAI(currentItem.spellingAudio, {
      rate: slowRate ? 0.75 : 0.85,
    });
  };

  // Check completion & celebrate
  const handleEvaluate = async () => {
    if (!hasDrawn) {
      await speakAI('Bé hãy dùng ngón tay hoặc chuột để tập tô chữ trước nhé!');
      return;
    }

    setIsCompleted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    onAddStar();

    await speakAI(`Bé giỏi lắm! Chữ ${currentItem.char} viết rất đẹp!`, {
      rate: slowRate ? 0.8 : 0.9,
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Category Switcher */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => handleSelectCategory('letter')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              selectedCategory === 'letter'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            29 Chữ Cái Đơn
          </button>
          <button
            onClick={() => handleSelectCategory('tone')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              selectedCategory === 'tone'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            5 Dấu Thanh
          </button>
          <button
            onClick={() => handleSelectCategory('word')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              selectedCategory === 'word'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Từ Ứng Dụng Mẫu
          </button>
        </div>

        {/* Quick Item Carousel Navigator */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevItem}
            aria-label="Chữ trước"
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-semibold text-slate-700 min-w-16 text-center">
            {currentIndex + 1} / {filteredItems.length}
          </span>
          <button
            onClick={handleNextItem}
            aria-label="Chữ sau"
            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. Main Writing Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Canvas Board (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Canvas Wrapper */}
          <div className="relative w-full h-[380px] sm:h-[440px] rounded-3xl border-4 border-emerald-600/30 bg-[#fffdfa] shadow-inner overflow-hidden touch-none select-none">
            {/* Guide Text Overlay (Nét chấm mờ chuẩn tiểu học) */}
            {showGuide && (
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
              >
                <div
                  className="font-serif text-slate-400/45 font-normal tracking-wide transition-opacity duration-300"
                  style={{
                    fontSize:
                      currentItem.category === 'word'
                        ? 'clamp(6rem, 16vw, 11rem)'
                        : 'clamp(9rem, 24vw, 15rem)',
                    transform: 'translateY(-12px)',
                    fontFamily: '"Times New Roman", Times, serif',
                    textShadow: '0 0 2px rgba(148, 163, 184, 0.4)',
                  }}
                >
                  {currentItem.char}
                </div>
              </div>
            )}

            {/* Drawing Canvas */}
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="absolute inset-0 w-full h-full cursor-crosshair"
            />

            {/* Canvas Badge Indicator */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs border border-emerald-200 rounded-xl px-3 py-1 text-xs font-semibold text-emerald-800 flex items-center gap-1.5 shadow-xs pointer-events-none">
              <span className="text-base">{currentItem.sampleImage || '✏️'}</span>
              <span>{currentItem.name}</span>
            </div>

            {/* Success Celebration Banner */}
            {isCompleted && (
              <div className="absolute inset-x-4 bottom-4 bg-emerald-500 text-white rounded-2xl p-3 flex items-center justify-between shadow-lg animate-bounce">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-xs sm:text-sm font-bold">
                    Xuất sắc! Bé đã hoàn thành bài tập tô!
                  </span>
                </div>
                <button
                  onClick={handleNextItem}
                  className="px-3 py-1 bg-white text-emerald-700 rounded-xl text-xs font-bold hover:bg-emerald-50 transition-colors shadow-xs"
                >
                  Tô tiếp chữ sau →
                </button>
              </div>
            )}
          </div>

          {/* Canvas Toolbar Controls */}
          <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            {/* Color Palette */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500 hidden sm:inline">
                Màu mực:
              </span>
              <div className="flex items-center gap-1.5">
                {[
                  { color: '#7c3aed', name: 'Mực tím' },
                  { color: '#2563eb', name: 'Mực xanh' },
                  { color: '#dc2626', name: 'Mực đỏ' },
                  { color: '#1e293b', name: 'Bút chì' },
                ].map((item) => (
                  <button
                    key={item.color}
                    onClick={() => {
                      setPenColor(item.color);
                      setIsEraser(false);
                    }}
                    title={item.name}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      !isEraser && penColor === item.color
                        ? 'scale-115 border-emerald-500 shadow-xs'
                        : 'border-white hover:scale-105'
                    }`}
                    style={{ backgroundColor: item.color }}
                  />
                ))}
              </div>
            </div>

            {/* Brush Size */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
              {[
                { size: 4, label: 'Mảnh' },
                { size: 7, label: 'Vừa' },
                { size: 12, label: 'Đậm' },
              ].map((b) => (
                <button
                  key={b.size}
                  onClick={() => setPenSize(b.size)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    penSize === b.size
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>

            {/* Action Tools */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEraser((prev) => !prev)}
                className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isEraser
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
                title="Tẩy nét"
              >
                <Eraser className="w-4 h-4" />
                <span className="hidden sm:inline">Tẩy nét</span>
              </button>

              <button
                onClick={handleClearCanvas}
                className="p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Viết lại từ đầu"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Viết lại</span>
              </button>

              <button
                onClick={() => setShowGuide((prev) => !prev)}
                className={`p-2 rounded-xl border text-xs font-semibold transition-colors ${
                  showGuide
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-50 text-slate-500 border-slate-200'
                }`}
                title="Ẩn/Hiện nét chấm mờ"
              >
                Mẫu mờ: {showGuide ? 'Bật' : 'Tắt'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Teacher Guide & Evaluation (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card: Thông tin con chữ & Quy trình nét */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {currentItem.name}
                </h3>
                <p className="text-xs text-slate-500">{currentItem.description}</p>
              </div>
              <button
                onClick={handlePlaySpelling}
                className="p-2.5 rounded-2xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition-colors flex items-center justify-center shadow-xs"
                title="Nghe cô giáo phát âm"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Quy trình các bước viết nét */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                <Info className="w-4 h-4" />
                <span>Quy trình viết {currentItem.strokeCount} nét:</span>
              </div>
              <div className="space-y-1.5">
                {currentItem.guideSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nút Hoàn thành & Nhận sao */}
            <button
              onClick={handleEvaluate}
              className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Chấm Điểm & Nhận Sao ⭐</span>
            </button>
          </div>

          {/* Quick Item Grid Chooser */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-2">
            <div className="text-xs font-bold text-slate-600">Chọn nhanh để tập tô:</div>
            <div className="grid grid-cols-6 gap-1.5 max-h-48 overflow-y-auto p-1">
              {filteredItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setIsCompleted(false);
                  }}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                    currentIndex === idx
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {item.char}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
