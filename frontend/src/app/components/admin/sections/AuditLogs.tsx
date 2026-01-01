import React from 'react';
import { Search, Download, Clock, User, Eye, ShieldCheck } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button'; // Added missing import

export const AuditLogs = () => (
  <div className="space-y-6 animate-in fade-in duration-700">
    <div className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Compliance & Data Access Logs</h2>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold flex items-center gap-2">
          <ShieldCheck size={12} className="text-emerald-500" /> Immutable Governance Trail
        </p>
      </div>
      <Button variant="outline" className="border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300">
        <Download size={16} className="mr-2" /> Export CSV (Compliance)
      </Button>
    </div>

    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-md">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-950 border-b border-slate-800 text-slate-500 text-[10px] uppercase font-bold">
          <tr>
            <th className="px-6 py-4">Timestamp</th>
            <th className="px-6 py-4">Actor</th>
            <th className="px-6 py-4">Event Type</th>
            <th className="px-6 py-4">Target Resource</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          <LogRow 
            time="2024-10-24 14:02:11" 
            actor="Dr. Sharma" 
            event="Data Access" 
            target="GraphNode: Rohit Kumar" 
            status="Authorized" 
           
          />
          <LogRow 
            time="2024-10-24 13:45:00" 
            actor="System: NLP" 
            event="Summary Generation" 
            target="Visit #991" 
            status="Success" 
           
          />
          <LogRow 
            time="2024-10-24 13:22:15" 
            actor="Admin: Jane Doe" 
            event="Model Update" 
            target="Engine v2.4.1" 
            status="Pending" 
           
          />
        </tbody>
      </table>
    </div>
  </div>
);

const LogRow = ({ time, actor, event, target, status }: any) => (
  <tr className="hover:bg-slate-900/80 transition-colors group">
    <td className="px-6 py-4 text-[11px] font-mono text-slate-500">{time}</td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-indigo-400">
          <User size={10} />
        </div>
        <span className="font-bold text-slate-300">{actor}</span>
      </div>
    </td>
    <td className="px-6 py-4">
      <span className="text-xs text-indigo-400 font-medium">{event}</span>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2 group-hover:text-indigo-300 transition-colors cursor-pointer">
        <span className="text-xs text-slate-500 underline decoration-slate-800 group-hover:decoration-indigo-500/50">{target}</span>
        <Eye size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </td>
    <td className="px-6 py-4">
      <Badge className={`border-0 text-[9px] uppercase font-black px-2 ${
        status === 'Authorized' || status === 'Success' 
          ? 'bg-emerald-500/10 text-emerald-500' 
          : 'bg-amber-500/10 text-amber-500'
      }`}>
        {status}
      </Badge>
    </td>
  </tr>
);