import React from 'react';
import { ShieldCheck, Activity, Cpu, AlertTriangle, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const driftData = [
  { time: '10:00', drift: 0.02 }, { time: '11:00', drift: 0.04 },
  { time: '12:00', drift: 0.03 }, { time: '13:00', drift: 0.08 },
  { time: '14:00', drift: 0.05 },
];

export const AISafetyDashboard = () => (
  <div className="flex flex-col gap-6 p-6 h-full overflow-y-auto">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <SafetyStat label="NLP Accuracy" value="98.2%" color="text-emerald-400" />
      <SafetyStat label="Inference" value="45ms" color="text-blue-400" />
      <SafetyStat label="Neural Drift" value="0.04" color="text-indigo-400" />
      <SafetyStat label="Guardrails" value="Active" color="text-amber-400" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
      <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
        <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
          <Activity size={16} className="text-indigo-500" /> Neural Drift (24h)
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={driftData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
              <YAxis stroke="#64748b" fontSize={10} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none' }} />
              <Area type="monotone" dataKey="drift" stroke="#6366f1" fill="#6366f133" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl overflow-hidden">
        <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
          <AlertTriangle size={16} className="text-amber-500" /> Guardrail Logs
        </h3>
        <div className="space-y-3 overflow-y-auto max-h-48 pr-2">
          <LogItem engine="Rx Engine" msg="Blocked Aspirin/Lisinopril interaction" severity="High" />
          <LogItem engine="Yoga Engine" msg="Filtered Inversion pose for HTN" severity="Med" />
        </div>
      </div>
    </div>
  </div>
);

const SafetyStat = ({ label, value, color }: any) => (
  <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
    <div className="text-[10px] text-slate-500 uppercase font-bold">{label}</div>
    <div className={`text-xl font-bold ${color}`}>{value}</div>
  </div>
);

const LogItem = ({ engine, msg, severity }: any) => (
  <div className="p-3 bg-slate-950/50 rounded-lg border-l-2 border-slate-700 text-[11px]">
    <div className="font-bold text-slate-300">{engine}</div>
    <div className="text-slate-500">{msg}</div>
  </div>
);