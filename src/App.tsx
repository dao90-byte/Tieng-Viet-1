/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header, TabType } from './components/Header';
import { AlphabetTab } from './components/AlphabetTab';
import { PhonicsMatrixTab } from './components/PhonicsMatrixTab';
import { PracticeGameTab } from './components/PracticeGameTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('alphabet');
  const [spellMode, setSpellMode] = useState<'spell' | 'smooth'>('spell');
  const [slowRate, setSlowRate] = useState<boolean>(true);
  const [stars, setStars] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('viet_spelling_stars');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('viet_spelling_stars', stars.toString());
    } catch {
      // ignore
    }
  }, [stars]);

  const handleGainStar = () => {
    setStars((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col text-slate-800">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        spellMode={spellMode}
        onToggleSpellMode={() =>
          setSpellMode((prev) => (prev === 'spell' ? 'smooth' : 'spell'))
        }
        slowRate={slowRate}
        onToggleSlowRate={() => setSlowRate((prev) => !prev)}
        stars={stars}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {activeTab === 'alphabet' && (
          <AlphabetTab onGainStar={handleGainStar} slowRate={slowRate} />
        )}

        {activeTab === 'phonics' && (
          <PhonicsMatrixTab
            spellMode={spellMode}
            slowRate={slowRate}
            onGainStar={handleGainStar}
          />
        )}

        {activeTab === 'game' && (
          <PracticeGameTab
            stars={stars}
            onAddStar={handleGainStar}
            slowRate={slowRate}
          />
        )}
      </main>
    </div>
  );
}
