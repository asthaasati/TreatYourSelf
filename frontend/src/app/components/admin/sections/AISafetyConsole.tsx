import React from 'react';
import { 
  ShieldCheck, RefreshCcw, Sliders, ToggleLeft, 
  AlertTriangle, Activity, Zap, Power, BarChart 
} from 'lucide-react';
import { Button } from '../../ui/button';

export const AISafetyConsole = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Critical Engine Status & Kill Switch */}
      <div className="bg-indigo-600 rounded-[2rem] p-8 flex flex-col md:flex-row justify-between items-center text-white shadow-xl shadow-indigo-900/20">
        <div className="flex gap-4 items-center">
          <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
            <Zap size={32} className="text-amber-300" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Clinical NLP Engine: v2.4.1</h2>
            <p className="text-indigo-100 text-sm mt-1 italic">Active guardrails enforcing medical grounding.</p>
          </div>
        </div>
        <div className="flex gap-4 mt-6 md:mt-0">
          <Button className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm">
            <RefreshCcw size={16} className="mr-2" /> Rollback to v2.4.0
          </Button>
          <Button className="bg-red-500 hover:bg-red-400 text-white font-bold border-none shadow-lg">
            <Power size={16} className="mr-2" /> Global Kill Switch
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Model Confidence & Hallucination Gates */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-sm font-bold mb-8 uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Sliders size={16} className="text-indigo-400" /> Confidence Thresholds
          </h3>
          <ThresholdSlider label="Diagnosis Hallucination Gate" value="95%" />
          <ThresholdSlider label="Yoga Pose Safety Validation" value="99%" />
          <ThresholdSlider label="Medication Interaction Filter" value="100%" />
        </div>

        {/* Human-in-the-loop (HITL) Enforcement */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-sm font-bold mb-6 uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-400" /> HITL Enforcement Status
          </h3>
          <div className="space-y-4">
            <FeatureToggle label="Manual Doctor Approval for Summaries" enabled={true} />
            <FeatureToggle label="Admin Review for flagged Video Calls" enabled={true} />
            <FeatureToggle label="Auto-generation of Yoga Plans" enabled={false} />
            <FeatureToggle label="Live Transcription Guardrails" enabled={true} />
          </div>
        </div>

        {/* Drift & Anomaly Monitoring */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <BarChart size={16} className="text-indigo-400" /> Feature & Output Drift (24h)
            </h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-bold">
                KL Divergence: 0.04
              </div>
            </div>
          </div>
          <div className="h-48 flex items-end gap-2 px-2">
            {[40, 42, 38, 45, 90, 42, 40, 35, 38, 40, 45].map((h, i) => (
              <div 
                key={i} 
                className={`flex-1 rounded-t-lg transition-all ${h > 80 ? 'bg-red-500/40 hover:bg-red-500' : 'bg-indigo-500/20 hover:bg-indigo-500'}`} 
                style={{ height: `${h}%` }}
              >
                {h > 80 && <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-bold text-red-400">SPIKE</div>}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-500 mt-4 italic text-center">
            Drift detected in "Yoga Recommendation" feature at 13:00 UTC. Anomaly mitigated by safety gate.
          </p>
        </div>
      </div>
    </div>
  );
};

const ThresholdSlider = ({ label, value }: any) => (
  <div className="mb-6 group">
    <div className="flex justify-between text-xs font-bold mb-2 transition-colors group-hover:text-slate-300">
      <span className="text-slate-500">{label}</span>
      <span className="text-indigo-400">{value}</span>
    </div>
    <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
      <div className="h-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.4)]" style={{ width: value }} />
    </div>
  </div>
);

const FeatureToggle = ({ label, enabled }: any) => (
  <div className="flex justify-between items-center p-4 bg-slate-950/50 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
    <span className="text-xs font-medium text-slate-300">{label}</span>
    <div className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest border ${
      enabled 
        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
        : 'bg-slate-900 text-slate-600 border-slate-800'
    }`}>
      {enabled ? 'ENFORCED' : 'OFF'}
    </div>
  </div>
);