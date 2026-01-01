import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Loader2, CheckCircle, ShieldCheck, FileCheck, Stethoscope } from 'lucide-react';
import { Button } from '../ui/button';
import { clsx } from 'clsx';

interface Step3Props {
  onReset: () => void;
}

export const Step3Verification: React.FC<Step3Props> = ({ onReset }) => {
  const [progress, setProgress] = useState(0);
  
  // Checklist states: 0=waiting, 1=loading, 2=done
  const [checklist, setChecklist] = useState({
    hipaa: 0,
    consent: 0,
    license: 0
  });

  useEffect(() => {
    // Simulate verification process
    const timer = setInterval(() => {
      setProgress(old => {
        if (old >= 100) {
          clearInterval(timer);
          return 100;
        }
        return old + 1;
      });
    }, 50);

    // Timed checklist updates
    setTimeout(() => setChecklist(prev => ({ ...prev, hipaa: 1 })), 500);
    setTimeout(() => setChecklist(prev => ({ ...prev, hipaa: 2 })), 1500);
    
    setTimeout(() => setChecklist(prev => ({ ...prev, consent: 1 })), 1800);
    setTimeout(() => setChecklist(prev => ({ ...prev, consent: 2 })), 2800);

    setTimeout(() => setChecklist(prev => ({ ...prev, license: 1 })), 3000);
    setTimeout(() => setChecklist(prev => ({ ...prev, license: 2 })), 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-[600px] bg-slate-950/50 rounded-3xl overflow-hidden border border-slate-800 relative flex flex-col items-center justify-center p-8">
      {/* Background Grid Animation */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-500 opacity-20 blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        
        {/* Central Loader */}
        <div className="relative mb-12">
          <svg className="w-48 h-48 -rotate-90">
            <circle
              className="text-slate-800"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r="90"
              cx="96"
              cy="96"
            />
            <circle
              className="text-emerald-500 transition-all duration-200 ease-out"
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 90}
              strokeDashoffset={2 * Math.PI * 90 * (1 - progress / 100)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="90"
              cx="96"
              cy="96"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
             <span className="text-4xl font-bold text-white font-mono">{progress}%</span>
             <span className="text-xs text-emerald-400 uppercase tracking-widest mt-1">Verifying</span>
          </div>
          
          {/* Orbiting particles */}
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0 w-full h-full"
           >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
           </motion.div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-8">Admin Verification in Progress</h2>

        {/* Checklist */}
        <div className="w-full space-y-4 mb-8">
          <ChecklistItem 
            label="HIPAA Compliance Check" 
            status={checklist.hipaa} 
            icon={ShieldCheck}
          />
          <ChecklistItem 
            label="Data Consent Protocols" 
            status={checklist.consent} 
            icon={FileCheck}
          />
          <ChecklistItem 
            label="Medical License Validation" 
            status={checklist.license} 
            icon={Stethoscope}
          />
        </div>

        {progress === 100 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2 w-full"
          >
             <Button 
              onClick={onReset}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20 py-6 text-lg font-medium tracking-wide"
            >
              Enter Dashboard
            </Button>
            <Button 
              onClick={onReset}
              variant="ghost"
              className="text-slate-400 hover:text-white text-xs"
            >
              Back to Landing
            </Button>
          </motion.div>
        )}

      </div>
    </div>
  );
};

const ChecklistItem = ({ label, status, icon: Icon }: { label: string, status: number, icon: any }) => {
  return (
    <div className="flex items-center justify-between bg-slate-900/40 border border-slate-800 p-4 rounded-xl backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className={clsx(
          "p-2 rounded-lg transition-colors duration-500",
          status === 2 ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-500"
        )}>
          <Icon size={18} />
        </div>
        <span className={clsx(
          "font-medium transition-colors duration-500",
          status === 2 ? "text-white" : "text-slate-400"
        )}>{label}</span>
      </div>
      
      <div className="w-6 h-6 flex items-center justify-center">
        {status === 0 && <div className="w-2 h-2 rounded-full bg-slate-700" />}
        {status === 1 && <Loader2 className="animate-spin text-indigo-400" size={16} />}
        {status === 2 && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <CheckCircle className="text-emerald-500" size={20} />
          </motion.div>
        )}
      </div>
    </div>
  );
};
