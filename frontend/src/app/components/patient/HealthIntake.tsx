import React, { useState } from 'react';
import { Activity, ShieldAlert, Heart, Scale, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

export const HealthIntake = ({ onComplete }: { onComplete: () => void }) => {
  const [bp, setBp] = useState('');
  
  // Real-time AI Validation logic
  const isBPHigh = bp.includes('/') && parseInt(bp.split('/')[0]) > 140;

  return (
    <div className="min-h-screen bg-[#020617] p-8 flex flex-col items-center">
      <div className="max-w-2xl w-full space-y-8">
        <header className="text-center">
          <div className="inline-block p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 mb-4">
            <Activity size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Personalize Your AI Profile</h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto">This information helps our clinical engines provide safer, personalized recommendations.</p>
        </header>

        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] space-y-8 backdrop-blur-md">
          {/* Section 1: Physicals */}
          <div className="grid grid-cols-2 gap-6">
            <IntakeField label="Age" icon={<User size={14}/>} placeholder="24" />
            <IntakeField label="Weight (kg)" icon={<Scale size={14}/>} placeholder="70" />
          </div>
          
          {/* Section 2: Vitals */}
          <div className="space-y-4 pt-6 border-t border-slate-800">
            <Label className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Current Vitals</Label>
            <div className="relative">
              <div className="absolute left-3 top-3.5 text-slate-500"><Heart size={18}/></div>
              <input 
                onChange={(e) => setBp(e.target.value)}
                placeholder="Blood Pressure (e.g. 120/80)" 
                className={`w-full bg-slate-950 border rounded-xl p-3 pl-10 text-white outline-none transition-all ${isBPHigh ? 'border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'border-slate-800 focus:border-indigo-500'}`} 
              />
              {isBPHigh && (
                <span className="absolute right-4 top-3.5 text-amber-500 text-xs font-bold flex items-center gap-1">
                  <ShieldAlert size={14}/> Elevated
                </span>
              )}
            </div>
          </div>
        </div>

        <Button onClick={onComplete} className="w-full h-16 bg-indigo-600 hover:bg-indigo-500 text-lg font-bold rounded-2xl shadow-2xl">
          Enter My Dashboard
        </Button>
      </div>
    </div>
  );
};

const IntakeField = ({ label, icon, placeholder }: any) => (
  <div className="space-y-2">
    <Label className="text-slate-500 text-xs font-bold flex items-center gap-2">{icon} {label}</Label>
    <input className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-indigo-500" placeholder={placeholder} />
  </div>
);