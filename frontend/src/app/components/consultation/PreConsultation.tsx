import React from 'react';
import { Brain, Activity, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface PreConsultationProps {
  onStartLive: () => void;
  patient?: any;
}

// IMPORTANT: Ensure the name is exactly 'PreConsultation' to match the import
export const PreConsultation: React.FC<PreConsultationProps> = ({ patient, onStartLive }) => {
  return (
    <div className="h-full p-8 bg-[#020617] flex flex-col gap-6 overflow-y-auto">
      <header className="flex justify-between items-start">
        <div>
          <Badge className="mb-2 bg-indigo-500/10 text-indigo-400 border-indigo-500/20 uppercase text-[10px] font-black tracking-widest">
            Pre-Consultation AI Briefing
          </Badge>
          <h1 className="text-3xl font-bold text-white">Reviewing: {patient?.name || 'Rohit Kumar'}</h1>
          <p className="text-slate-500 mt-1 italic text-sm">Clinical Memory Graph data normalized from 12 separate sources.</p>
        </div>
        <Button 
          onClick={onStartLive} 
          className="bg-indigo-600 hover:bg-indigo-500 h-12 px-8 font-bold text-lg shadow-lg shadow-indigo-900/20 rounded-xl transition-all"
        >
          Begin Consultation <ArrowRight className="ml-2" size={20} />
        </Button>
      </header>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Brain size={16} className="text-indigo-400" /> Neural Risk Profile
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <RiskMetric label="Relapse Probability" value="22%" trend="Stable" />
              <RiskMetric label="No-Show Risk" value="Low" trend="Improving" />
              <RiskMetric label="Adherence Score" value="88%" trend="Declining" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RiskMetric = ({ label, value, trend }: any) => (
  <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
    <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">{label}</div>
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="text-[10px] text-slate-600 mt-1 tracking-tighter uppercase">{trend}</div>
  </div>
);