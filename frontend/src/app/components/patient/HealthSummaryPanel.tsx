import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export const HealthSummaryPanel = () => {
  return (
    <div className="w-full bg-slate-900/40 border border-slate-800 rounded-3xl p-6 overflow-hidden relative">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-tighter">My Health Snapshot</h3>
        <span className="text-[10px] text-slate-500">Last updated: 2h ago</span>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <MetricTile label="BP" value="155/95" status="Elevated" color="text-amber-400" />
        <MetricTile label="BMI" value="24.2" status="Normal" color="text-emerald-400" />
        <MetricTile label="Sugar" value="105" status="Stable" color="text-emerald-400" />
        <MetricTile label="Heart" value="82" status="Normal" color="text-emerald-400" />
      </div>

      {/* AI Patient Summary */}
      <div className="bg-indigo-500/5 border border-indigo-500/20 p-4 rounded-2xl flex gap-4 items-start">
        <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-400">
          <Sparkles size={18} />
        </div>
        <div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Your recent vitals are mostly stable. Your Blood Pressure is slightly higher than your baseline; consider completing today's <span className="text-indigo-400 font-bold">Pranayama session</span> to help lower stress.
          </p>
        </div>
      </div>
    </div>
  );
};

const MetricTile = ({ label, value, status, color }: any) => (
  <div className="text-center p-3 bg-slate-950/50 rounded-2xl border border-slate-800">
    <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">{label}</div>
    <div className="text-lg font-bold text-white">{value}</div>
    <div className={`text-[9px] font-black uppercase ${color} mt-1`}>{status}</div>
  </div>
);