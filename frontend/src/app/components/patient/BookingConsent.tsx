import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button'; // Ensure this import is present

export const BookingConsent = ({ onConfirm }: { onConfirm: (scope: string) => void }) => {
  const [scope, setScope] = useState('full');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md mx-auto space-y-6 shadow-2xl">
      <div className="text-center">
        <div className="p-4 bg-emerald-500/10 w-fit mx-auto rounded-full text-emerald-500 mb-4 border border-emerald-500/20">
          <ShieldCheck size={32} />
        </div>
        <h2 className="text-xl font-bold text-white">Data Sharing Consent</h2>
        <p className="text-xs text-slate-500 mt-2 italic">
          Grant the specialist access to your longitudinal health trajectory.
        </p>
      </div>

      <div className="space-y-3">
        <ConsentOption 
          active={scope === 'full'} 
          onClick={() => setScope('full')} 
          label="Full Profile" 
          desc="Includes past visits, AI SOAP summaries, and yoga adherence." 
        />
        <ConsentOption 
          active={scope === 'vitals'} 
          onClick={() => setScope('vitals')} 
          label="Vitals Only" 
          desc="Share only biometric data: BP, Sugar, and Heart Rate." 
        />
      </div>

      <div className="pt-4">
        <Button 
          onClick={() => onConfirm(scope)} 
          className="w-full bg-emerald-600 hover:bg-emerald-500 h-12 font-bold rounded-xl shadow-lg shadow-emerald-900/20 transition-all"
        >
          Confirm & Book Appointment
        </Button>
        <p className="text-[9px] text-center text-slate-600 mt-4 uppercase tracking-widest font-bold">
          End-to-End Encrypted Access
        </p>
      </div>
    </div>
  );
};

const ConsentOption = ({ active, onClick, label, desc }: any) => (
  <div 
    onClick={onClick} 
    className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
      active 
        ? 'border-emerald-500 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]' 
        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
    }`}
  >
    <div className="flex justify-between items-center mb-1">
      <span className={`text-sm font-bold ${active ? 'text-emerald-400' : 'text-white'}`}>{label}</span>
      {active && <CheckCircle2 size={16} className="text-emerald-500" />}
    </div>
    <p className="text-[10px] text-slate-500 leading-relaxed">{desc}</p>
  </div>
);