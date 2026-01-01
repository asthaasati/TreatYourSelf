import React from 'react';
import { Users, Activity, ShieldAlert, Zap } from 'lucide-react';

export const GovernanceOverview = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard label="Doctor Trust Score" value="98.2%" trend="✅ Stable" icon={<Users className="text-blue-400" />} />
      <StatCard label="AI Safety Flags" value="2" trend="🔴 Reviewed" icon={<ShieldAlert className="text-red-400" />} />
      <StatCard label="Active Consultations" value="18" trend="Steady" icon={<Activity className="text-emerald-400" />} />
      <StatCard label="AI Accept Rate" value="89%" trend="⬆️ +2%" icon={<Zap className="text-amber-400" />} />
    </div>

    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Real-time Platform Throughput</h3>
      <div className="h-48 flex items-end gap-2 px-4">
        {[40, 65, 30, 85, 45, 60, 50, 45, 90, 40].map((h, i) => (
          <div key={i} className="flex-1 bg-indigo-500/20 rounded-t-md hover:bg-indigo-500 transition-all" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  </div>
);

const StatCard = ({ label, value, trend, icon }: any) => (
  <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">{icon}</div>
      <span className="text-[10px] font-bold text-slate-500 uppercase">{trend}</span>
    </div>
    <div className="text-3xl font-bold text-white">{value}</div>
    <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{label}</div>
  </div>
);