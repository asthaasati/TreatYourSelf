import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Step1Identity } from './Step1Identity';
import { Step2Practice } from './Step2Practice';
import { Step3Verification } from './Step3Verification';

interface DoctorRegistrationProps {
  onBack: () => void;
  onComplete: () => void;
}

export const DoctorRegistration: React.FC<DoctorRegistrationProps> = ({ onBack, onComplete }) => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);
  const reset = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 md:p-8 font-sans selection:bg-emerald-500/30">
      
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-indigo-900/20 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-emerald-900/10 blur-[100px] rounded-full" />
      </div>

      <div className="w-full max-w-6xl relative z-10">
        {/* Header Navigation - Only show on steps 1 & 2 */}
        {step < 3 && (
          <div className="mb-8 flex items-center justify-between">
            <button 
              onClick={onBack}
              className="text-slate-400 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase flex items-center gap-2"
            >
              ← Back to Portal
            </button>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full transition-colors ${step >= 1 ? 'bg-emerald-500' : 'bg-slate-700'}`} />
              <div className={`w-2 h-2 rounded-full transition-colors ${step >= 2 ? 'bg-emerald-500' : 'bg-slate-700'}`} />
              <div className={`w-2 h-2 rounded-full transition-colors ${step >= 3 ? 'bg-emerald-500' : 'bg-slate-700'}`} />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full"
          >
            {step === 1 && <Step1Identity onNext={nextStep} />}
            {step === 2 && <Step2Practice onNext={nextStep} onBack={prevStep} />}
            {step === 3 && <Step3Verification onReset={reset} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
