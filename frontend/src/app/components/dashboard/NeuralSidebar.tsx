import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, ThumbsUp, ThumbsDown, Info } from 'lucide-react';
import { Progress } from '../ui/progress';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { value: 40 },
  { value: 35 },
  { value: 50 },
  { value: 45 },
  { value: 60 },
  { value: 55 },
  { value: 70 },
];

export const NeuralSidebar: React.FC = () => {
  return (
    <div className="bg-slate-900/40 border border-slate-700/50 backdrop-blur-md rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6 text-purple-400">
        <BrainCircuit size={20} />
        <h2 className="text-xl font-bold text-white tracking-tight">Neural Insights</h2>
      </div>

      <div className="space-y-6 overflow-y-auto custom-scrollbar">
        {/* Confidence Card */}
        <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm text-slate-400">Model Confidence</span>
            <span className="text-xl font-bold text-emerald-400">94%</span>
          </div>
          <Progress value={94} className="h-1.5 bg-slate-700" />
          <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-500">
             <Info size={10} />
             <span>Based on 12k similar patient vectors</span>
          </div>
        </div>

        {/* Clinical Trends */}
        <div className="space-y-2">
           <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Clinical Trends</h3>
           <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700 h-32 relative">
             <div className="absolute top-4 left-4 text-xs text-slate-400">Heart Rate Variability</div>
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={data}>
                 <Tooltip 
                   contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', fontSize: '12px' }}
                   itemStyle={{ color: '#fff' }}
                 />
                 <Line 
                   type="monotone" 
                   dataKey="value" 
                   stroke="#8b5cf6" 
                   strokeWidth={2} 
                   dot={false}
                 />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Similar Trajectories */}
        <div className="space-y-2">
           <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Similar Trajectories</h3>
           <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700">
              <div className="flex items-center justify-between mb-3">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-sm text-slate-300">Cohort A (85%)</span>
                 </div>
                 <span className="text-xs text-emerald-400">+12% Recovery</span>
              </div>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-600" />
                    <span className="text-sm text-slate-300">Cohort B (15%)</span>
                 </div>
                 <span className="text-xs text-slate-500">Standard</span>
              </div>
           </div>
        </div>

        {/* Feedback */}
        <div className="pt-4 border-t border-slate-700/50">
           <p className="text-xs text-slate-400 mb-3 text-center">Was this insight helpful?</p>
           <div className="flex justify-center gap-4">
              <button className="p-2 rounded-full bg-slate-800 text-slate-400 hover:bg-emerald-900/30 hover:text-emerald-400 transition-colors">
                 <ThumbsUp size={16} />
              </button>
              <button className="p-2 rounded-full bg-slate-800 text-slate-400 hover:bg-red-900/30 hover:text-red-400 transition-colors">
                 <ThumbsDown size={16} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
