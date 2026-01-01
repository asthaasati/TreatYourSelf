import React from 'react';
import { motion } from 'motion/react';
import { Play, ClipboardCheck, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/button';

export const ActionHub: React.FC = () => {
  return (
    <div className="flex gap-4 items-center justify-end">
      <div className="hidden md:flex flex-col items-end mr-4">
         <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Protocol</span>
         <span className="text-xs text-purple-400 flex items-center gap-1">
            Augmentative <ArrowUpRight size={10} />
         </span>
      </div>
      
      <Button 
        variant="outline"
        className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white bg-slate-900/50 backdrop-blur-sm h-12 px-6 rounded-xl"
      >
        <ClipboardCheck className="mr-2 h-4 w-4" />
        Review Lifestyle Plan
      </Button>
      
      <Button 
        className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-900/20 h-12 px-8 rounded-xl"
      >
        <Play className="mr-2 h-4 w-4 fill-current" />
        Start Consultation
      </Button>
    </div>
  );
};
