import React from 'react';
import { motion } from 'motion/react';
import { Activity, AlertTriangle, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';

export const DashboardHeader: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-slate-900/40 border border-slate-700/50 backdrop-blur-md p-4 rounded-xl flex items-center justify-between">
        <div>
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">Today's Schedule</h3>
          <p className="text-2xl font-bold text-white mt-1">8 Appointments</p>
        </div>
        <div className="p-3 bg-blue-500/10 rounded-lg">
          <Activity className="text-blue-400" size={24} />
        </div>
      </div>

      <div className="bg-slate-900/40 border border-red-900/30 backdrop-blur-md p-4 rounded-xl flex items-center justify-between relative overflow-hidden group">
        <div className="absolute inset-0 bg-red-500/5 animate-pulse" />
        <div className="relative z-10">
          <h3 className="text-red-300 text-xs font-bold uppercase tracking-widest">Action Required</h3>
          <p className="text-2xl font-bold text-white mt-1">2 High-Risk Alerts</p>
        </div>
        <div className="relative z-10 p-3 bg-red-500/10 rounded-lg shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <AlertTriangle className="text-red-500" size={24} />
        </div>
      </div>

      <div className="bg-slate-900/40 border border-purple-700/50 backdrop-blur-md p-4 rounded-xl flex items-center justify-between">
        <div>
          <h3 className="text-purple-300 text-xs font-bold uppercase tracking-widest">System Intelligence</h3>
          <p className="text-2xl font-bold text-white mt-1">1 AI Insight</p>
        </div>
        <div className="p-3 bg-purple-500/10 rounded-lg">
          <Sparkles className="text-purple-400" size={24} />
        </div>
      </div>
    </div>
  );
};
