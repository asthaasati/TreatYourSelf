import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Pill, AlertTriangle, Flower2, 
  CheckCircle2, ChevronRight, Info, ShieldCheck,
  Stethoscope, Brain
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export const LiveConsultationMode: React.FC = () => {
  const [note, setNote] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [showInteraction, setShowInteraction] = useState(false);

  // Simulated Clinical NLP & Safety Engine Logic
  useEffect(() => {
    // 1. Autocomplete Logic
    if (note.endsWith('Patient complains of ')) {
      setSuggestion('persistent headaches specifically in the frontal region...');
    } else if (note.endsWith('Prescribing ')) {
      setSuggestion('Metformin 500mg bid for glucose control...');
    } else {
      setSuggestion('');
    }

    // 2. Real-time Safety Trigger
    // If doctor mentions Aspirin, trigger the interaction warning with Lisinopril
    if (note.toLowerCase().includes('aspirin')) {
      setShowInteraction(true);
    } else {
      setShowInteraction(false);
    }
  }, [note]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && suggestion) {
      e.preventDefault();
      setNote(note + suggestion);
      setSuggestion('');
    }
  };

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
      
      {/* Left 7 Columns: SOAP Note Editor */}
      <div className="lg:col-span-7 flex flex-col h-full bg-slate-900/40 border border-slate-700/50 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-700/50 flex justify-between items-center bg-slate-900/80">
           <h3 className="font-bold text-white flex items-center gap-2 text-sm tracking-wide">
             <Stethoscope size={16} className="text-indigo-400" />
             LIVE ENCOUNTER NOTES (SOAP)
           </h3>
           <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 gap-1 text-[10px]">
             <Brain size={10} /> NLP ENGINE ACTIVE
           </Badge>
        </div>
        
        <div className="flex-1 relative p-8">
          <textarea
            className="w-full h-full bg-transparent border-0 resize-none outline-none text-slate-200 leading-relaxed font-mono text-lg z-10 relative placeholder:text-slate-700"
            placeholder="Start typing clinical notes... (e.g. 'Patient complains of ')"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
          />
          {/* Ghost Text Overlay for AI Autocomplete */}
          <div className="absolute top-8 left-8 pointer-events-none whitespace-pre-wrap font-mono text-lg text-transparent leading-relaxed">
            {note}
            <span className="text-indigo-500/40">{suggestion}</span>
          </div>
          
          {suggestion && (
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               className="absolute bottom-6 right-6 text-[10px] text-indigo-400 font-bold tracking-widest bg-indigo-900/30 px-3 py-1.5 rounded-full border border-indigo-500/30 uppercase"
             >
               Press TAB to accept
             </motion.div>
          )}
        </div>

        <div className="p-3 border-t border-slate-700/50 bg-slate-950/50 flex gap-2">
           <Button variant="ghost" size="sm" className="text-[10px] uppercase font-bold text-slate-500 hover:text-white">Subjective</Button>
           <Button variant="ghost" size="sm" className="text-[10px] uppercase font-bold text-slate-500 hover:text-white">Objective</Button>
           <Button variant="ghost" size="sm" className="text-[10px] uppercase font-bold text-slate-500 hover:text-white">Assessment</Button>
           <Button variant="ghost" size="sm" className="text-[10px] uppercase font-bold text-slate-500 hover:text-white">Plan</Button>
        </div>
      </div>

      {/* Right 5 Columns: AI Safety Co-Pilot */}
      <div className="lg:col-span-5 flex flex-col gap-4 h-full overflow-y-auto pr-2 custom-scrollbar">
        
        {/* Real-time Interaction Guard */}
        <AnimatePresence>
          {showInteraction && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="bg-red-950/20 border border-red-500/40 backdrop-blur-md rounded-2xl p-5 relative overflow-hidden ring-1 ring-red-500/20"
            >
               <div className="flex items-start gap-4">
                  <div className="p-2 bg-red-500/20 rounded-lg shrink-0">
                     <AlertTriangle className="text-red-500" size={20} />
                  </div>
                  <div>
                     <h4 className="font-bold text-red-100 text-sm mb-1 uppercase tracking-tight">Critical Interaction Alert</h4>
                     <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        <span className="text-white font-bold">Lisinopril</span> + <span className="text-white font-bold">Aspirin</span> detected. May lead to renal impairment and reduced HTN control.
                     </p>
                     <Button variant="outline" className="text-red-400 border-red-500/30 h-7 text-[10px] hover:bg-red-500 hover:text-white transition-all uppercase font-bold">
                        Modify Prescription
                     </Button>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Yoga Selector (Complementary Care) */}
        <div className="bg-slate-900/40 border border-emerald-900/30 backdrop-blur-md rounded-2xl p-6 relative overflow-hidden">
           <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                 <Flower2 className="text-emerald-400" size={18} />
                 <h4 className="font-bold text-emerald-100 text-sm tracking-wide uppercase">Yoga Safety Engine</h4>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9px] uppercase font-black">
                 Validated
              </Badge>
           </div>
           
           <div className="space-y-4">
              <YogaItem 
                name="Pranayama (Deep Breathing)" 
                meta="99% Safety Score" 
                desc="Indicated for Stage 2 HTN Stress reduction."
                isSafe 
              />
              <YogaItem 
                name="Adho Mukha (Downward Dog)" 
                meta="Caution: Inversion" 
                desc="Not recommended for current BP: 155/95."
                isSafe={false} 
              />
           </div>
        </div>

        {/* AI Confidence & System Logs */}
        <div className="bg-slate-900/40 border border-slate-700/50 backdrop-blur-md rounded-2xl p-5">
           <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-white text-xs uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={14} className="text-indigo-400" /> AI Confidence
              </h4>
              <span className="text-[10px] text-slate-500 font-mono">94.2%</span>
           </div>
           <div className="w-full bg-slate-800 rounded-full h-1.5 mb-4">
              <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '94%' }} />
           </div>
           <p className="text-[10px] text-slate-500 italic leading-relaxed">
             Insights based on Clinical Knowledge Graph reasoning and similar patient trajectories.
           </p>
        </div>

      </div>
    </div>
  );
};

// Internal Sub-component for Yoga List
const YogaItem = ({ name, meta, desc, isSafe }: { name: string, meta: string, desc: string, isSafe: boolean }) => (
  <div className={`p-4 rounded-xl border ${isSafe ? 'border-emerald-500/10 bg-emerald-900/5' : 'border-amber-500/20 bg-amber-900/5'} group transition-all`}>
    <div className="flex justify-between items-start mb-1">
      <span className="text-sm font-bold text-slate-200">{name}</span>
      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${isSafe ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
        {meta}
      </span>
    </div>
    <p className="text-[11px] text-slate-500 leading-normal">{desc}</p>
  </div>
);