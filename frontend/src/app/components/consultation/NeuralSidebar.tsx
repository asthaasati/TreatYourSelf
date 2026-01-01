import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ShieldAlert, Zap, Info, CheckCircle, Activity } from 'lucide-react';
import { Badge } from '../ui/badge';

export const NeuralSidebar = ({ activeNotes }: { activeNotes: string }) => {
  // Logic to detect keywords in doctor's notes for real-time safety
  const hasLosartan = activeNotes.toLowerCase().includes('losartan');
  const hasHighBP = activeNotes.toLowerCase().includes('bp') || activeNotes.toLowerCase().includes('hypertension');

  return (
    <div className="w-80 border-l border-slate-800 bg-slate-950/50 flex flex-col h-full overflow-hidden">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <Brain size={18} className="text-indigo-400" />
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Neural Co-Pilot</h3>
        </div>
        <p className="text-[10px] text-slate-500 italic">Active Clinical Reasoning Engine</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {/* 1. Real-time Safety Alerts */}
          {hasLosartan && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-4 bg-red-500/5 border border-red-500/20 rounded-2xl space-y-3"
            >
              <div className="flex items-center gap-2 text-red-500">
                <ShieldAlert size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Medication Safety</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <span className="text-red-400 font-bold underline">Losartan</span> detected. 
                Patient has a history of mild renal impairment. Monitor potassium levels.
              </p>
            </motion.div>
          )}

          {/* 2. Neural Highlights from Memory Graph */}
          <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-indigo-400">
              <Zap size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Clinical Context</span>
            </div>
            <div className="space-y-2">
              <ContextItem label="BP Trend" value="Rising (155/95)" color="text-amber-500" />
              <ContextItem label="Yoga Adherence" value="75%" color="text-emerald-500" />
              <ContextItem label="Allergies" value="Penicillin" color="text-slate-400" />
            </div>
          </div>

          {/* 3. Suggested Lifestyle/Yoga */}
          {hasHighBP && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl space-y-3"
            >
              <div className="flex items-center gap-2 text-emerald-500">
                <Activity size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Suggested Protocol</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed italic">
                "Based on hypertension stage, recommend Pranayama (cooling) instead of intense Vinyasa."
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Confidence Score Footer */}
      <div className="p-4 bg-slate-900/50 border-t border-slate-800">
        <div className="flex justify-between items-center text-[9px] font-bold text-slate-500 mb-2 uppercase tracking-tighter">
          <span>AI Confidence</span>
          <span>94.2%</span>
        </div>
        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500" style={{ width: '94.2%' }} />
        </div>
      </div>
    </div>
  );
};

const ContextItem = ({ label, value, color }: any) => (
  <div className="flex justify-between items-center">
    <span className="text-[10px] text-slate-500">{label}</span>
    <span className={`text-[10px] font-bold ${color}`}>{value}</span>
  </div>
);