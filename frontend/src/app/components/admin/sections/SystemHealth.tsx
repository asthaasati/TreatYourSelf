import React from 'react';
import { Activity, Server, Database, Globe, Zap, AlertCircle } from 'lucide-react';
import { Badge } from '../../ui/badge';

export const SystemHealth = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <HealthWidget icon={<Globe className="text-cyan-400" />} label="Edge Gateway" status="99.99%" sub="Stable" />
      <HealthWidget icon={<Database className="text-indigo-400" />} label="Memory Graph" status="841 Nodes" sub="Synced" />
      <HealthWidget icon={<Server className="text-emerald-400" />} label="NLP Workers" status="24.1ms" sub="Latency" />
      <HealthWidget icon={<Zap className="text-amber-400" />} label="API Throughput" status="1,320 r/s" sub="Normal" />
    </div>

    <div className="grid grid-cols-12 gap-8">
      {/* Policy & Configuration Control */}
      <div className="col-span-12 lg:col-span-7 bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Global Safety Policy Configuration</h3>
        <div className="space-y-4">
          <ConfigToggle label="Enforce Multi-Factor for Doctor Access" active={true} />
          <ConfigToggle label="AI Hallucination Auto-Flagging" active={true} />
          <ConfigToggle label="Patient Data De-identification in Logs" active={true} />
          <ConfigToggle label="Autonomous Prescription Approvals" active={false} />
        </div>
      </div>

      {/* Incident Timeline */}
      <div className="col-span-12 lg:col-span-5 bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Security & AI Incidents</h3>
        <div className="relative border-l border-slate-800 pl-6 space-y-6">
          <TimelineItem time="12:04" event="Inference Drift Detected" type="warning" />
          <TimelineItem time="09:15" event="Emergency Kill Switch Test" type="info" />
          <TimelineItem time="04:22" event="Unauthorized Access Blocked" type="critical" />
        </div>
      </div>
    </div>
  </div>
);

const HealthWidget = ({ icon, label, status, sub }: any) => (
  <div className="p-6 bg-slate-950/50 border border-slate-800 rounded-3xl backdrop-blur-sm">
    <div className="flex items-center gap-4 mb-3">
      <div className="p-2 bg-slate-900 rounded-lg">{icon}</div>
      <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{label}</div>
    </div>
    <div className="text-2xl font-bold text-white">{status}</div>
    <div className="text-[10px] text-slate-400 mt-1 font-medium">{sub}</div>
  </div>
);

const ConfigToggle = ({ label, active }: any) => (
  <div className="flex justify-between items-center p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
    <span className="text-xs font-bold text-slate-300">{label}</span>
    <Badge className={active ? "bg-indigo-600/20 text-indigo-400" : "bg-slate-800 text-slate-500"}>
      {active ? "ACTIVE" : "DISABLED"}
    </Badge>
  </div>
);

const TimelineItem = ({ time, event, type }: any) => (
  <div className="relative">
    <div className={`absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full border-2 border-slate-950 ${
      type === 'critical' ? 'bg-red-500' : type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
    }`} />
    <div className="text-[10px] font-mono text-slate-500">{time}</div>
    <div className="text-xs font-bold text-slate-300">{event}</div>
  </div>
);