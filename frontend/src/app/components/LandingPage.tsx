import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Heart, ShieldCheck } from 'lucide-react';
import { RoleCard } from './RoleCard';
import { SystemPulse } from './SystemPulse';

export const LandingPage: React.FC<{ onNavigate?: (role: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden bg-slate-950 text-white font-sans">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 animate-gradient-xy bg-[length:400%_400%]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 md:p-12">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-slate-400">
            TreatYourSelf
          </h1>
          <p className="mt-4 text-lg text-slate-400 font-light tracking-widest uppercase">
            Unified Clinical Intelligence Ecosystem
          </p>
        </motion.div>

        {/* Unified 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
          <RoleCard 
            title="Doctor" 
            icon={Stethoscope} 
            theme="blue" 
            onClick={() => onNavigate?.('doctor')}
          />
          <RoleCard 
            title="Patient" 
            icon={Heart} 
            theme="green" 
            onClick={() => onNavigate?.('patient')}
          />
          <RoleCard 
            title="Platform Governance & AI Safety" 
            icon={ShieldCheck} 
            theme="purple" 
            onClick={() => onNavigate?.('governance')}
          />
        </div>
      </div>

      <div className="relative z-10 mt-auto w-full">
        <SystemPulse />
      </div>

      <style>{`
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-xy {
          animation: gradient-xy 15s ease infinite;
        }
      `}</style>
    </div>
  );
};