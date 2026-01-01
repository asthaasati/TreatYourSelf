import React from 'react';
import { Users, Stethoscope, Video, AlertTriangle, Zap, Server } from 'lucide-react';

export const AdminOverview = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard label="Active Doctors" value="124" detail="+12 pending" icon={<Stethoscope className="text-blue-400" />} />
      <StatCard label="Total Patients" value="8,432" detail="Active accounts" icon={<Users className="text-emerald-400" />} />
      <StatCard label="In-Progress Calls" value="18" detail="3 flagged review" icon={<Video className="text-purple-400" />} />
      <StatCard label="AI Drift Level" value="0.02" detail="Safe zone" icon={<Zap className="text-amber-400" />} />
    </div>

    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8 bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
        <h3 className="text-sm font-bold mb-6 uppercase tracking-widest text-slate-500">System Uptime & Latency</h3>
        <div className="h-64 flex items-end gap-2 px-4">
          {[40, 45, 30, 80, 35, 40, 50, 45, 40, 95, 40].map((h, i) => (
            <div key={i} className="flex-1 bg-indigo-500/20 rounded-t-md relative group hover:bg-indigo-500 transition-all" style={{ height: `${h}%` }}>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100">{h}ms</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="col-span-4 bg-red-500/5 border border-red-500/20 rounded-3xl p-6">
        <h3 className="text-sm font-bold mb-6 uppercase tracking-widest text-red-500 flex items-center gap-2">
          <AlertTriangle size={16} /> Critical AI Alerts
        </h3>
        <div className="space-y-4">
          <AlertItem msg="Model v2.1 showing bias in Yoga recommendations for elderly." />
          <AlertItem msg="Unusual token usage spike in API endpoint /v1/clinical." />
        </div>
      </div>
    </div>
  </div>
);

const StatCard = ({ label, value, detail, icon }: any) => (
  <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">{icon}</div>
      <span className="text-[10px] font-bold text-slate-500">{detail}</span>
    </div>
    <div className="text-3xl font-bold text-white">{value}</div>
    <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{label}</div>
  </div>
);

const AlertItem = ({ msg }: any) => (
  <div className="p-4 bg-slate-950/50 border border-red-500/10 rounded-2xl text-[11px] text-slate-400 leading-relaxed border-l-2 border-l-red-500">
    {msg}
  </div>
);