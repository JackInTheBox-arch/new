/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  BarChart3, 
  Aperture, 
  Sun, 
  CloudRain, 
  Swords, 
  ArrowUpCircle, 
  Settings,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type EntityType = 'Black Hole' | 'Supernova' | 'Nebula';
type GameResult = 'WIN' | 'LOSS' | 'DRAW' | null;

const ENTITIES: { id: EntityType; label: string; sublabel: string; beats: EntityType }[] = [
  {
    id: 'Black Hole',
    label: 'Black Hole',
    sublabel: 'GRAVITY WELL',
    beats: 'Nebula', // Rock beats Scissors
  },
  {
    id: 'Supernova',
    label: 'Supernova',
    sublabel: 'SOLAR FLARE',
    beats: 'Black Hole', // Paper beats Rock
  },
  {
    id: 'Nebula',
    label: 'Nebula',
    sublabel: 'ION CLOUD',
    beats: 'Supernova', // Scissors beats Paper
  }
];

export default function App() {
  const [score, setScore] = useState(0);
  const [userChoice, setUserChoice] = useState<EntityType | null>(null);
  const [computerChoice, setComputerChoice] = useState<EntityType | null>(null);
  const [result, setResult] = useState<GameResult>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('Arena');

  const playRound = (choice: EntityType) => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    setUserChoice(choice);
    setComputerChoice(null);
    setResult(null);

    // Dramatic delay for "Awaiting Enemy Signature..."
    setTimeout(() => {
      const computerIdx = Math.floor(Math.random() * ENTITIES.length);
      const computer = ENTITIES[computerIdx].id;
      setComputerChoice(computer);

      if (choice === computer) {
        setResult('DRAW');
      } else if (ENTITIES.find(e => e.id === choice)?.beats === computer) {
        setResult('WIN');
        setScore(prev => prev + 100);
      } else {
        setResult('LOSS');
        setScore(prev => Math.max(0, prev - 50));
      }
      setIsPlaying(false);
    }, 1500);
  };

  const getIcon = (id: EntityType | null, className = "w-10 h-10") => {
    switch (id) {
      case 'Black Hole': return <Aperture className={`${className} text-purple-200`} />;
      case 'Supernova': return <Sun className={`${className} text-orange-200`} />;
      case 'Nebula': return <CloudRain className={`${className} text-cyan-200`} />;
      default: return <Rocket className={`${className} text-on-surface-variant/40`} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden selection:bg-primary/30">
      {/* Header */}
      <header className="h-16 px-6 md:px-10 flex items-center justify-between border-b border-white/5 bg-surface-dim/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center border border-white/10 overflow-hidden">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9HDHUzV6CayMN5TNtp0xl1YNVcHPwZnvv2WDAVG-pI6aJuvNg_xr0XmRZcn8qTO0zOeWxR5rCyMijjHAMwVd-neeZeCe_LQdYhBC79KYp5hc0QDgFkMCrgELrboF-5pn5Kxst3h9T1OlAWWdj2ktnqaVsQbrMI3Dxk03jtX09ZL-oXW_rhMIzl0DXM45mr-fK_3kSmaG9dunBtQ725ImfczgSx6nZIck46KyRUBcRKqmNKrEkpnRqmAF1FD3MiyX3lqYKj-mcC60" 
              alt="Pilot" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <h1 className="font-headline text-lg font-bold tracking-tight text-on-surface">Space Odyssey Arena</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="glass-panel px-4 py-1.5 rounded flex items-center gap-3">
            <span className="font-headline text-[0.6875rem] uppercase tracking-widest text-secondary font-bold">Score</span>
            <span className="font-headline text-xl font-bold text-primary tabular-nums">{score}</span>
          </div>
          <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
            <BarChart3 className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col items-center justify-center px-6 py-8">
        {/* Background Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />

        {/* Hero: Combat Zone */}
        <section className="w-full max-w-4xl aspect-video relative flex flex-col items-center justify-center mb-12">
          <div className="absolute inset-0 combat-zone-gradient rounded-full" />
          
          {/* HUD Elements */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-72 h-72 border-2 border-dashed border-secondary/20 rounded-full" 
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-80 h-80 border border-primary/10 rounded-full" 
          />

          {/* Central Display */}
          <div className="relative z-10 text-center flex flex-col items-center">
            <div className="font-headline text-[0.6875rem] uppercase tracking-[0.2em] text-outline mb-4">Tactical Display</div>
            
            <div className="flex items-center gap-8">
              {/* User Choice */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-outline">You</span>
                <motion.div 
                  key={`user-${userChoice}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`w-32 h-32 rounded-full border border-white/10 flex items-center justify-center bg-surface-container-low/30 backdrop-blur-sm shadow-2xl ${isPlaying ? 'animate-pulse' : ''}`}
                >
                  {getIcon(userChoice, "w-12 h-12")}
                </motion.div>
              </div>

              {/* VS Divider */}
              <div className="font-headline text-2xl font-bold text-outline/30 italic">VS</div>

              {/* Computer Choice */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-outline">Enemy</span>
                <motion.div 
                  key={`comp-${computerChoice}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`w-32 h-32 rounded-full border border-white/10 flex items-center justify-center bg-surface-container-low/30 backdrop-blur-sm shadow-2xl ${isPlaying ? 'animate-pulse' : ''}`}
                >
                  {isPlaying ? (
                    <RefreshCw className="w-12 h-12 text-on-surface-variant/20 animate-spin" />
                  ) : (
                    getIcon(computerChoice, "w-12 h-12")
                  )}
                </motion.div>
              </div>
            </div>

            <div className="mt-8 h-12">
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    key={result}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    className="text-center"
                  >
                    <h2 className={`font-headline text-3xl font-bold ${result === 'WIN' ? 'text-secondary' : result === 'LOSS' ? 'text-error' : 'text-on-surface'}`}>
                      {result === 'WIN' ? 'VICTORY' : result === 'LOSS' ? 'DEFEATED' : 'STALEMATE'}
                    </h2>
                  </motion.div>
                ) : (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-on-surface-variant text-sm"
                  >
                    {isPlaying ? 'Scanning Enemy Signature...' : 'Awaiting Tactical Input...'}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Lateral Stats (Desktop Only) */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 space-y-4 hidden lg:block">
            <div className="glass-panel p-4 rounded-lg">
              <p className="font-headline text-[0.65rem] uppercase text-outline mb-2">Systems Check</p>
              <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: isPlaying ? '100%' : '85%' }}
                  className="h-full bg-secondary shadow-[0_0_8px_#4cd7f6]" 
                />
              </div>
            </div>
            <div className="glass-panel p-4 rounded-lg">
              <p className="font-headline text-[0.65rem] uppercase text-outline mb-2">Energy Level</p>
              <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: isPlaying ? '60%' : '40%' }}
                  className="h-full bg-primary shadow-[0_0_8px_#ddb7ff]" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Interaction Section: Entities */}
        <section className="flex flex-wrap justify-center gap-8 md:gap-12 w-full max-w-5xl mb-16 relative">
          {ENTITIES.map((entity) => (
            <button 
              key={entity.id}
              disabled={isPlaying}
              onClick={() => playRound(entity.id)}
              className={`group flex flex-col items-center gap-4 transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div 
                className={`w-24 h-24 md:w-32 md:h-32 rounded-full bg-surface-container-lowest border border-white/10 flex items-center justify-center relative overflow-hidden transition-all duration-300 ${userChoice === entity.id ? 'ring-2 ring-primary ring-offset-4 ring-offset-background' : ''}`}
                style={{ 
                  boxShadow: userChoice === entity.id ? `0 0 50px rgba(221, 183, 255, 0.2)` : 'none'
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-tr ${
                  entity.id === 'Black Hole' ? 'from-black via-transparent to-purple-900/20' :
                  entity.id === 'Supernova' ? 'from-white/10 to-orange-600/20' :
                  'from-pink-500/10 via-cyan-500/10 to-transparent'
                }`} />
                <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {getIcon(entity.id)}
                </div>
              </div>
              <div className="text-center">
                <span className="font-headline text-sm font-bold block text-on-surface">{entity.label}</span>
                <span className="font-headline text-[0.6rem] uppercase text-outline tracking-widest">{entity.sublabel}</span>
              </div>
            </button>
          ))}
        </section>

        {/* Status Message */}
        <div className="w-full max-w-2xl">
          <motion.div 
            layout
            className="glass-panel p-6 rounded-lg text-center border-t-2 border-t-primary/20"
          >
            <p className="text-on-surface font-medium tracking-wide">
              {isPlaying ? 'Combat in progress...' : result ? `Last Result: ${result}` : 'Choose your entity to begin the battle!'}
            </p>
            <div className="mt-3 flex justify-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-full transition-colors ${userChoice === 'Black Hole' ? 'bg-secondary' : 'bg-surface-container-highest'}`} />
              <div className={`w-1.5 h-1.5 rounded-full transition-colors ${userChoice === 'Supernova' ? 'bg-secondary' : 'bg-surface-container-highest'}`} />
              <div className={`w-1.5 h-1.5 rounded-full transition-colors ${userChoice === 'Nebula' ? 'bg-secondary' : 'bg-surface-container-highest'}`} />
            </div>
          </motion.div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="h-20 bg-surface-container-lowest border-t border-white/5 flex items-center justify-around px-4">
        {[
          { id: 'Arena', icon: <Swords className="w-6 h-6" />, label: 'Arena' },
          { id: 'Fleet', icon: <Rocket className="w-6 h-6" />, label: 'Fleet' },
          { id: 'Upgrades', icon: <ArrowUpCircle className="w-6 h-6" />, label: 'Upgrades' },
          { id: 'Settings', icon: <Settings className="w-6 h-6" />, label: 'Settings' },
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 group transition-colors ${activeTab === tab.id ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            <div className={`p-1 rounded-full ${activeTab === tab.id ? 'bg-primary/10' : ''}`}>
              {tab.icon}
            </div>
            <span className="font-headline text-[0.6875rem] font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
