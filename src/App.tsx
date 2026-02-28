import React, { useState } from 'react';
import { 
  Zap, 
  Activity, 
  Brain, 
  Flower2, 
  Droplets, 
  Sun, 
  ShieldCheck, 
  Coffee,
  Microscope,
  Stethoscope,
  Leaf,
  Wind,
  Moon,
  Sparkles,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Stats {
  energy: number;
  gut: number;
  mental: number;
}

interface Supplement {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  stats: Stats;
}

interface Category {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  supplements: Supplement[];
}

const categories: Category[] = [
  {
    id: 'energy',
    title: 'Energy',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-amber-400 to-orange-600',
    supplements: [
      { id: 'bee-pollen', name: 'Bee Pollen', icon: <Flower2 className="w-8 h-8" />, color: 'text-amber-400', stats: { energy: 15, gut: 5, mental: 5 } },
      { id: 'royal-jelly', name: 'Royal Jelly', icon: <Sparkles className="w-8 h-8" />, color: 'text-yellow-300', stats: { energy: 20, gut: 2, mental: 10 } },
      { id: 'querzetin', name: 'Querzetin', icon: <Activity className="w-8 h-8" />, color: 'text-orange-400', stats: { energy: 10, gut: 10, mental: 5 } },
      { id: 'd3-coconut', name: 'D3 with Coconut', icon: <Sun className="w-8 h-8" />, color: 'text-yellow-500', stats: { energy: 15, gut: 5, mental: 10 } },
      { id: 'propolis', name: 'Propolis', icon: <ShieldCheck className="w-8 h-8" />, color: 'text-amber-600', stats: { energy: 10, gut: 15, mental: 2 } },
      { id: 'honey', name: 'Honey', icon: <Droplets className="w-8 h-8" />, color: 'text-orange-500', stats: { energy: 15, gut: 10, mental: 2 } },
    ]
  },
  {
    id: 'gut',
    title: 'Gut',
    icon: <Activity className="w-6 h-6" />,
    color: 'from-emerald-400 to-teal-600',
    supplements: [
      { id: 'omni-biotic-6', name: 'Omni Biotic 6', icon: <Microscope className="w-8 h-8" />, color: 'text-emerald-400', stats: { energy: 5, gut: 40, mental: 10 } },
      { id: 'swanson-digestive', name: 'Swanson Digestive', icon: <Stethoscope className="w-8 h-8" />, color: 'text-teal-400', stats: { energy: 5, gut: 35, mental: 5 } },
    ]
  },
  {
    id: 'mental',
    title: 'Mental',
    icon: <Brain className="w-6 h-6" />,
    color: 'from-indigo-400 to-purple-600',
    supplements: [
      { id: 'aswagandha', name: 'Aswagandha', icon: <Leaf className="w-8 h-8" />, color: 'text-indigo-400', stats: { energy: 10, gut: 5, mental: 25 } },
      { id: 'lions-mane', name: 'Lions Mane', icon: <Wind className="w-8 h-8" />, color: 'text-blue-300', stats: { energy: 5, gut: 5, mental: 35 } },
      { id: 'rhodiola', name: 'Rhodiola', icon: <Moon className="w-8 h-8" />, color: 'text-purple-400', stats: { energy: 20, gut: 2, mental: 25 } },
      { id: 'holy-bosil', name: 'Holy Bosil', icon: <Coffee className="w-8 h-8" />, color: 'text-violet-400', stats: { energy: 5, gut: 5, mental: 20 } },
    ]
  }
];

function Hexagon({ supplement, delay, active, onToggle }: { supplement: Supplement; delay: number; active: boolean; onToggle: () => void; key?: string | number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="relative group cursor-pointer"
      onClick={onToggle}
    >
      <div className={`
        hexagon-clip hexagon-border w-32 h-36 flex flex-col items-center justify-center p-4 text-center
        ${active ? 'bg-white/10' : 'bg-white/5'}
      `}>
        <div className={`${supplement.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
          {supplement.icon}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest leading-tight opacity-80 group-hover:opacity-100 transition-opacity">
          {supplement.name}
        </span>
        
        {active && (
          <motion.div 
            layoutId={`active-dot-${supplement.id}`}
            className="absolute bottom-4 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          />
        )}
      </div>
    </motion.div>
  );
}

const ProgressBar = ({ label, value, color, icon }: { label: string, value: number, color: string, icon: React.ReactNode }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-end">
      <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/60">
        {icon}
        <span>{label}</span>
      </div>
      <span className="text-sm font-display font-bold italic">{Math.min(100, Math.round(value))}%</span>
    </div>
    <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, value)}%` }}
        className={`h-full bg-gradient-to-r ${color} shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
      />
    </div>
  </div>
);

const HeartIcon = React.memo(({ fillLevel }: { fillLevel: number; key?: string | number }) => {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]"
    >
      <defs>
        <clipPath id={`clip-${id}`}>
          <rect x="0" y="0" width={fillLevel === 0.5 ? "12" : "24"} height="24" />
        </clipPath>
      </defs>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      {fillLevel > 0 && (
        <path
          d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
          fill="currentColor"
          clipPath={`url(#clip-${id})`}
        />
      )}
    </svg>
  );
});

const LifeQualityIndex = React.memo(({ score, onClick }: { score: number; onClick?: () => void }) => {
  const filledValue = (score / 100) * 5;
  
  return (
    <div 
      className={`flex items-center gap-1.5 ${onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
      onClick={onClick}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        let fill: number = 0;
        if (filledValue >= i + 1) fill = 1;
        else if (filledValue >= i + 0.5) fill = 0.5;
        return <HeartIcon key={i} fillLevel={fill} />;
      })}
    </div>
  );
});

const QUALITY_LEVELS = [
  { hearts: 1, label: "Critical", desc: "Severe energy depletion, chronic digestive discomfort, and significant mental fog. Daily functioning is highly compromised." },
  { hearts: 2, label: "Sub-Optimal", desc: "Frequent fatigue, irregular gut health, and difficulty maintaining focus. Health requires immediate attention." },
  { hearts: 3, label: "Functional", desc: "Moderate energy levels with occasional dips. Gut health is stable but sensitive. Mental clarity is sufficient for routine tasks." },
  { hearts: 4, label: "Optimized", desc: "High vitality, robust digestive system, and sharp cognitive performance. Feeling resilient and productive." },
  { hearts: 5, label: "Peak Performance", desc: "Boundless energy, perfect nutrient absorption, and exceptional mental flow. Life is lived at maximum potential." }
];

const QualityModal = React.memo(({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-[#121212] border border-white/10 rounded-3xl overflow-hidden shadow-2xl will-change-transform will-change-opacity"
          >
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <div>
                <h3 className="font-display text-2xl font-bold uppercase italic tracking-tight">Quality Index <span className="text-white/40">Protocol</span></h3>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mt-1">Biometric performance benchmarks</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X className="w-6 h-6 text-white/40" />
              </button>
            </div>
            <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto no-scrollbar">
              {QUALITY_LEVELS.map((level) => (
                <div key={level.hearts} className="flex flex-col md:flex-row gap-6 items-start md:items-center p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex flex-col items-center gap-2 min-w-[120px]">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <HeartIcon key={i} fillLevel={i < level.hearts ? 1 : 0} />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-500/80">{level.label}</span>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed font-sans">
                    {level.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="p-8 bg-white/5 text-center">
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-white text-black font-display font-bold uppercase text-xs tracking-widest rounded-full hover:bg-white/90 transition-colors"
              >
                Acknowledge
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

export default function App() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSupplement = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const totals: Stats = { energy: 0, gut: 0, mental: 0 };
  selectedIds.forEach(id => {
    const supplement = categories.flatMap(c => c.supplements).find(s => s.id === id);
    if (supplement) {
      totals.energy += supplement.stats.energy;
      totals.gut += supplement.stats.gut;
      totals.mental += supplement.stats.mental;
    }
  });

  const averageScore = (Math.min(100, totals.energy) + Math.min(100, totals.gut) + Math.min(100, totals.mental)) / 3;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      <header className="relative z-10 pt-12 pb-8 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter uppercase italic">
              Hexa<span className="text-white/40">Tracker</span>
            </h1>
            <p className="text-white/40 font-mono text-xs uppercase tracking-[0.3em] mt-2">
              Optimize your daily supplementation
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-4 text-xs font-mono text-white/60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>SYSTEM ACTIVE</span>
              </div>
              <span className="opacity-20">|</span>
              <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div 
              className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2 cursor-pointer hover:bg-white/10 transition-colors group"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors">Life Quality</span>
              <LifeQualityIndex score={averageScore} />
            </div>
          </div>
        </motion.div>
      </header>

      <QualityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Stats Panel */}
      <div className="sticky top-0 z-20 bg-[#0a0a0a]/80 backdrop-blur-xl border-y border-white/5 py-6 px-6 mb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProgressBar 
            label="Energy Levels" 
            value={totals.energy} 
            color="from-amber-400 to-orange-500" 
            icon={<Zap className="w-3 h-3" />}
          />
          <ProgressBar 
            label="Gut Health" 
            value={totals.gut} 
            color="from-emerald-400 to-teal-500" 
            icon={<Activity className="w-3 h-3" />}
          />
          <ProgressBar 
            label="Mental Clarity" 
            value={totals.mental} 
            color="from-indigo-400 to-purple-500" 
            icon={<Brain className="w-3 h-3" />}
          />
        </div>
      </div>

      <main className="relative z-10 px-6 pb-24 max-w-7xl mx-auto space-y-20">
        {categories.map((category, catIdx) => (
          <section key={category.id} className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${category.color} shadow-lg shadow-black/20`}>
                {category.icon}
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-wider italic">
                  {category.title}
                </h2>
                <div className="h-0.5 w-12 bg-white/20 mt-1" />
              </div>
            </motion.div>

            <div className="overflow-x-auto no-scrollbar pb-6 -mx-6 px-6">
              <div className="flex gap-x-4 justify-center min-w-max">
                {category.supplements.map((supplement, supIdx) => (
                  <Hexagon 
                    key={supplement.id} 
                    supplement={supplement} 
                    delay={catIdx * 0.2 + supIdx * 0.1}
                    active={selectedIds.has(supplement.id)}
                    onToggle={() => toggleSupplement(supplement.id)}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>

      <footer className="relative z-10 border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 text-[10px] font-mono uppercase tracking-[0.2em]">
          <div className="flex gap-8">
            <span>Privacy Protocol</span>
            <span>Terms of Service</span>
          </div>
          <div className="text-center">
            © 2026 HEXATRACKER BIOMETRICS DIVISION
          </div>
          <div className="flex gap-4 items-center">
            <span>LAT: 51.5074° N</span>
            <span>LNG: 0.1278° W</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
