import React from 'react';
import { Badge } from '../../ui/badge';

export const AuditComplianceLogs = () => (
  <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden">
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
        <LogRow time="2025-12-30 14:02" actor="Dr. Sharma" event="Data Access" target="Patient: Rohit Kumar" status="Authorized" />
        <LogRow time="2025-12-30 13:45" actor="System: NLP" event="Summary Export" target="Visit #991" status="Success" />
        <LogRow time="2025-12-30 13:22" actor="Admin: Root" event="Model Update" target="Engine v2.4.1" status="Success" />
      </tbody>
    </table>
  </div>
);

const LogRow = ({ time, actor, event, target, status }: any) => (
  <tr className="hover:bg-slate-900/50 transition-colors">
    <td className="px-6 py-4 text-[10px] font-mono text-slate-500">{time}</td>
    <td className="px-6 py-4 font-bold text-slate-300">{actor}</td>
    <td className="px-6 py-4 text-xs text-indigo-400">{event}</td>
    <td className="px-6 py-4 text-[11px] text-slate-500">{target}</td>
    <td className="px-6 py-4">
      <Badge className="bg-emerald-500/10 text-emerald-500 border-0 text-[9px] uppercase">{status}</Badge>
    </td>
  </tr>
);