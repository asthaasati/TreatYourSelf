import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Brain, Flower2, ChevronRight, User } from 'lucide-react';
import { clsx } from 'clsx';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';

// Define the Patient interface for type safety
interface Patient {
  id: string;
  name: string;
  time: string;
  status: 'critical' | 'watch' | 'stable';
  trends: {
    bp: 'up' | 'down' | 'stable';
    mood: 'up' | 'down' | 'stable';
  };
  aiInsight: boolean;
  yogaAdherence: boolean;
}

// Added Props interface to handle redirection logic
interface PatientListProps {
  onSelectPatient?: (patient: Patient) => void;
}

const patients: Patient[] = [
  {
    id: '1',
    name: 'Rohit Kumar',
    time: '09:00 AM',
    status: 'critical',
    trends: { bp: 'up', mood: 'stable' },
    aiInsight: true,
    yogaAdherence: true,
  },
  {
    id: '2',
    name: 'Sarah Chen',
    time: '10:30 AM',
    status: 'stable',
    trends: { bp: 'stable', mood: 'up' },
    aiInsight: false,
    yogaAdherence: true,
  },
  {
    id: '3',
    name: 'Marcus Johnson',
    time: '11:15 AM',
    status: 'watch',
    trends: { bp: 'down', mood: 'down' },
    aiInsight: true,
    yogaAdherence: false,
  },
  {
    id: '4',
    name: 'Elena Rodriguez',
    time: '01:00 PM',
    status: 'stable',
    trends: { bp: 'stable', mood: 'stable' },
    aiInsight: false,
    yogaAdherence: true,
  },
];

export const PatientList: React.FC<PatientListProps> = ({ onSelectPatient }) => {
  return (
    <div className="bg-slate-900/40 border border-slate-700/50 backdrop-blur-md rounded-2xl p-6 h-full flex flex-col shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
           Patient Triage
        </h2>
        <Badge variant="outline" className="border-slate-700 text-slate-400 text-[10px] uppercase tracking-widest">
          AI Risk Priority
        </Badge>
      </div>

      <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
        {patients.map((patient, index) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelectPatient?.(patient)} // Trigger redirection flow
            className={clsx(
              "group relative p-4 rounded-xl border transition-all duration-300 hover:shadow-lg cursor-pointer",
              "flex items-center gap-4 bg-slate-800/40 hover:translate-x-1",
              patient.status === 'critical' ? "border-red-500/20 hover:border-red-500/60 bg-red-900/5" : 
              patient.status === 'watch' ? "border-amber-500/20 hover:border-amber-500/60 bg-amber-900/5" :
              "border-slate-700/50 hover:border-indigo-500/50 hover:bg-slate-800/60"
            )}
          >
            {/* Status Indicator Bar */}
            <div className={clsx(
              "absolute left-0 top-3 bottom-3 w-1 rounded-r-full",
              patient.status === 'critical' ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" :
              patient.status === 'watch' ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" :
              "bg-emerald-500"
            )} />

            {/* Appointment Time & Profile */}
            <div className="flex flex-col items-center gap-2 pl-3 min-w-[70px]">
              <span className="text-[10px] font-mono font-bold text-slate-500 tracking-tighter">
                {patient.time}
              </span>
              <Avatar className="h-10 w-10 border border-slate-700 group-hover:border-indigo-500 transition-colors">
                <AvatarFallback className="bg-slate-900 text-slate-400 font-bold uppercase text-xs">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Patient Context & AI Flags */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {patient.name}
                </h3>
                {patient.status === 'critical' && (
                  <Badge className="bg-red-500/10 text-red-400 border border-red-500/20 h-4 px-1.5 text-[8px] uppercase font-black">
                    Urgent Review
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {patient.trends.bp === 'up' && (
                  <div className="flex items-center gap-1 text-red-400 bg-red-950/40 border border-red-500/20 px-2 py-0.5 rounded text-[9px] font-bold" title="Elevated BP Trend">
                    <TrendingUp size={10} /> BP INSTABILITY
                  </div>
                )}
                {patient.aiInsight && (
                  <div className="flex items-center gap-1 text-purple-400 bg-purple-950/40 border border-purple-500/20 px-2 py-0.5 rounded text-[9px] font-bold" title="AI Memory Graph Insight Available">
                    <Brain size={10} /> NEURAL INSIGHT
                  </div>
                )}
                {patient.yogaAdherence && (
                  <div className="flex items-center gap-1 text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded text-[9px] font-bold" title="Active Yoga Plan">
                    <Flower2 size={10} /> ADHERENT
                  </div>
                )}
              </div>
            </div>

            {/* Redirection Trigger */}
            <div className="opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
               <div className="p-2 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                 <ChevronRight size={14} />
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};