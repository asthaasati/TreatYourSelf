import React from 'react';
import { Brain, ArrowRight, TrendingUp, Activity } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export const PreConsultationIntelligence = ({ patient, onStartCall }: any) => (
  <div className="h-full p-8 bg-[#020617] space-y-8 overflow-y-auto">
    <div className="flex justify-between items-start">
      <div>
        <Badge className="bg-indigo-500/10 text-indigo-400 mb-2 uppercase text-[9px]">AI Briefing</Badge>
        <h1 className="text-3xl font-bold text-white">Reviewing: {patient?.name}</h1>
      </div>
      <Button onClick={onStartCall} className="bg-indigo-600 h-12 px-8 font-bold">
        Begin Call <ArrowRight className="ml-2" />
      </Button>
    </div>

    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8 bg-slate-900/50 border border-slate-800 p-6 rounded-3xl">
        <h3 className="text-xs font-bold text-slate-500 uppercase mb-6 flex items-center gap-2">
          <Brain size={16} className="text-indigo-400" /> Neural Risk Profile
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <Metric label="Relapse Risk" value="22%" />
          <Metric label="No-Show Risk" value="Low" />
          <Metric label="Adherence" value="88%" />
        </div>
      </div>
      <div className="col-span-4 bg-indigo-950/20 border border-indigo-500/20 p-6 rounded-3xl">
        <h3 className="text-xs font-bold text-indigo-400 uppercase mb-4 tracking-widest">Decision Support</h3>
        <p className="text-xs text-slate-400 leading-relaxed italic">
          "Patients with similar BP profiles responded 40% better to integrated Pranayama than medication alone."
        </p>
      </div>
    </div>
  </div>
);

const Metric = ({ label, value }: any) => (
  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
    <div className="text-[10px] text-slate-500 uppercase mb-1">{label}</div>
    <div className="text-xl font-bold text-white">{value}</div>
  </div>
);