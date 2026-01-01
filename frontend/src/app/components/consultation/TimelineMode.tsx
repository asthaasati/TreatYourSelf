import React from 'react';
import { motion } from 'motion/react';
import { FileText, Activity, AlertTriangle, Syringe, Brain, ListChecks } from 'lucide-react';
import { RiskRadar } from './RiskRadar';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

interface TimelineEventProps {
  type: 'visit' | 'lab' | 'ai';
  date: string;
  title: string;
  desc: string;
  highlight?: boolean;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ type, date, title, desc, highlight }) => {
  const icons = {
    visit: FileText,
    lab: Syringe,
    ai: Brain
  };
  const Icon = icons[type];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative pl-8 pb-8 border-l border-slate-700 last:border-0"
    >
      <div className={`absolute left-[-12px] top-0 p-1.5 rounded-full border-2 border-slate-900 ${
        type === 'ai' ? 'bg-purple-900/50 text-purple-400' : 
        type === 'lab' ? 'bg-blue-900/50 text-blue-400' : 'bg-slate-800 text-slate-400'
      }`}>
        <Icon size={14} />
      </div>
      
      <div className={`p-4 rounded-xl border backdrop-blur-sm ${
        highlight 
          ? 'bg-amber-900/10 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]' 
          : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60 transition-colors'
      }`}>
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-mono text-slate-500">{date}</span>
          {highlight && (
             <Badge variant="outline" className="border-amber-500/50 text-amber-400 bg-amber-500/10 text-[10px] gap-1 px-2 py-0">
               <AlertTriangle size={10} /> Abnormal
             </Badge>
          )}
        </div>
        <h4 className={`font-medium mb-1 ${highlight ? 'text-amber-100' : 'text-slate-200'}`}>{title}</h4>
        <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
};

export const TimelineMode: React.FC = () => {
  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 overflow-hidden">
      
      {/* Left Column: Feed */}
      <div className="lg:col-span-2 flex flex-col h-full overflow-hidden">
        {/* Neural Highlight Summary */}
        <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/30 border border-indigo-500/30 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Brain size={120} />
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Brain className="text-purple-400" size={20} />
            </div>
            <h3 className="text-lg font-bold text-white">Neural Highlight <span className="text-slate-500 font-normal text-sm ml-2">Since Last Visit</span></h3>
          </div>

          <ul className="space-y-3 relative z-10">
            {[
              "Lipid panel shows 15% improvement in LDL levels.",
              "Patient reported 3 episodes of mild dizziness (correlated with BP dips).",
              "Medication adherence score improved to 92%.",
              "New interaction warning: Grapefruit usage with Statins.",
              "Yoga module 'Morning Flow' completion rate: 4/7 days."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                <ListChecks className="shrink-0 text-emerald-500 mt-0.5" size={16} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Timeline Feed */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 sticky top-0 bg-[#020617] py-2 z-10">Historical Feed</h3>
          
          <div className="pl-3">
             <TimelineEvent 
               type="lab" 
               date="Oct 24, 2024" 
               title="Quarterly Blood Panel" 
               desc="Elevated cortisol levels detected. Recommended stress management protocols." 
               highlight 
             />
             <TimelineEvent 
               type="ai" 
               date="Oct 20, 2024" 
               title="Wearable Data Sync" 
               desc="Sleep efficiency dropped to 65%. Correlated with reported work stress." 
             />
             <TimelineEvent 
               type="visit" 
               date="Sep 15, 2024" 
               title="Routine Check-up" 
               desc="Patient reported feeling 'sluggish'. Weight stable. BP 125/82." 
             />
             <TimelineEvent 
               type="lab" 
               date="Aug 30, 2024" 
               title="Lipid Profile" 
               desc="All values within normal range." 
             />
          </div>
        </div>
      </div>

      {/* Right Column: Risk Radar & Stats */}
      <div className="flex flex-col gap-6">
        <div className="bg-slate-900/40 border border-slate-700/50 backdrop-blur-md rounded-2xl p-4 h-64 shadow-xl">
          <RiskRadar />
        </div>

        <div className="bg-slate-900/40 border border-slate-700/50 backdrop-blur-md rounded-2xl p-6 flex-1">
           <h3 className="text-sm font-bold text-slate-300 mb-4">Quick Vitals</h3>
           <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                 <span className="text-slate-400 text-sm">Blood Pressure</span>
                 <span className="text-white font-mono font-medium">120/80 <span className="text-xs text-emerald-500">▼</span></span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                 <span className="text-slate-400 text-sm">Heart Rate</span>
                 <span className="text-white font-mono font-medium">72 <span className="text-xs text-slate-500">-</span></span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                 <span className="text-slate-400 text-sm">Weight</span>
                 <span className="text-white font-mono font-medium">78kg <span className="text-xs text-red-400">▲</span></span>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
};
