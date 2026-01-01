import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ShieldCheck, Activity, Video, 
  ClipboardCheck, ChevronRight 
} from 'lucide-react';
import { Button } from '../ui/button';

// Clinical Module Imports
import { PreConsultation } from './PreConsultation';

import { LiveConsultationMode } from './LiveConsultationMode';
import { PostConsultationReview } from './PostConsultationReview';

interface ConsultationWorkspaceProps {
  onBack: () => void;
  selectedPatient?: any;
}

export const ConsultationWorkspace: React.FC<ConsultationWorkspaceProps> = ({ 
  onBack, 
  selectedPatient 
}) => {
  // Navigation State: 'prep' | 'live' | 'review'
  const [stage, setStage] = useState<'prep' | 'live' | 'review'>('prep');

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col overflow-hidden font-sans">
      
      {/* 1. Global Clinical Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-8 z-30 sticky top-0">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl px-3 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" /> Exit Workspace
          </Button>
          <div className="h-6 w-px bg-slate-800 mx-2" />
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold tracking-tight">
              Patient: <span className="text-indigo-400">{selectedPatient?.name || 'Rohit Kumar'}</span>
            </h2>
            <div className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded text-[9px] font-black uppercase tracking-widest">
              ID: #9921-A
            </div>
          </div>
        </div>

        {/* Workflow Progress Tracker */}
        <div className="hidden lg:flex items-center gap-6">
          <StageIndicator 
            active={stage === 'prep'} 
            done={stage === 'live' || stage === 'review'} 
            label="1. Prep" 
            icon={<Activity size={14}/>} 
          />
          <ChevronRight size={14} className="text-slate-700" />
          <StageIndicator 
            active={stage === 'live'} 
            done={stage === 'review'} 
            label="2. Live" 
            icon={<Video size={14}/>} 
          />
          <ChevronRight size={14} className="text-slate-700" />
          <StageIndicator 
            active={stage === 'review'} 
            done={false} 
            label="3. Review" 
            icon={<ClipboardCheck size={14}/>} 
          />
        </div>

        <div className="flex items-center gap-3 text-emerald-500 text-[10px] font-bold uppercase tracking-widest bg-emerald-500/5 px-3 py-1.5 rounded-full border border-emerald-500/20">
          <ShieldCheck size={14} /> Encrypted Stream
        </div>
      </header>

      {/* 2. Main Workspace Content */}
      <main className="flex-1 relative overflow-hidden bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-95">
        <AnimatePresence mode="wait">
          {stage === 'prep' && (
            <motion.div 
              key="prep"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full overflow-y-auto custom-scrollbar"
            >
              <PreConsultation 
                patient={selectedPatient} 
                onStartLive={() => setStage('live')} 
              />
            </motion.div>
          )}

          {stage === 'live' && (
            <motion.div 
              key="live"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <LiveConsultationMode 
                onEndConsult={() => setStage('review')} 
              />
            </motion.div>
          )}

          {stage === 'review' && (
            <motion.div 
              key="review"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full overflow-y-auto custom-scrollbar"
            >
              <PostConsultationReview 
                onFinalize={onBack} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

// Sub-components for Workflow UI
const StageIndicator = ({ active, done, label, icon }: any) => (
  <div className={`flex items-center gap-3 transition-all duration-300 ${
    active ? 'text-indigo-400' : done ? 'text-emerald-500' : 'text-slate-600'
  }`}>
    <div className={`p-2 rounded-xl border transition-all ${
      active 
        ? 'bg-indigo-500/10 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
        : done 
        ? 'bg-emerald-500/10 border-emerald-500/30' 
        : 'bg-slate-900 border-slate-800'
    }`}>
      {icon}
    </div>
    <span className="text-[11px] font-black uppercase tracking-[0.15em]">{label}</span>
  </div>
);