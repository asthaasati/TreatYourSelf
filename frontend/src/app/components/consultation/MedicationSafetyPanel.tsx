import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle } from 'lucide-react';

export const MedicationSafetyPanel = () => {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-4">
      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
        <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
          <ShieldAlert size={14} /> Safety Engine
        </h3>
        <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/30">
          AI Guardrails Active
        </span>
      </div>

      <div className="space-y-3">
        {/* Interaction Warning */}
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="flex items-center gap-2 text-red-400 text-xs font-bold mb-1">
            <AlertTriangle size={14} /> Interaction Detected
          </div>
          <p className="text-[11px] text-slate-400">
            Losartan + NSAIDs (Aspirin) may decrease antihypertensive effect and increase risk of renal impairment.
          </p>
        </div>

        {/* Dosage Check */}
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
            <CheckCircle size={14} /> Dosage Sanity Check
          </div>
          <p className="text-[11px] text-slate-400">
            50mg Daily is within the standard therapeutic range for Stage 2 HTN.
          </p>
        </div>
      </div>
    </div>
  );
};