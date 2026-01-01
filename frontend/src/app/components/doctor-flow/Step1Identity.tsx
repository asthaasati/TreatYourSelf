import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HeartPulse, Upload, FileUp, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card } from '../ui/card';

interface Step1Props {
  onNext: () => void;
}

export const Step1Identity: React.FC<Step1Props> = ({ onNext }) => {
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full min-h-[600px] bg-slate-950/50 rounded-3xl overflow-hidden border border-slate-800">
      
      {/* Left Panel - Animation */}
      <div className="w-full lg:w-5/12 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 relative overflow-hidden flex items-center justify-center p-8">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full animate-pulse" />
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative bg-gradient-to-tr from-slate-900 to-indigo-900 p-8 rounded-full border border-indigo-500/30 shadow-2xl"
            >
              <HeartPulse size={64} className="text-emerald-400" />
            </motion.div>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-white mb-4 tracking-tight"
          >
            Join the Future of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Augmented Care
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-400 max-w-xs"
          >
            Your expertise, amplified by our Neural Health Engine.
          </motion.p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-7/12 p-8 lg:p-12 bg-slate-950/80 backdrop-blur-sm flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full space-y-8">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">Identify Verification</h3>
            <p className="text-slate-400 text-sm">Please provide your medical credentials.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-slate-300">Full Name</Label>
              <Input 
                id="fullName" 
                placeholder="Dr. Sarah Connor" 
                className="bg-slate-900/50 border-slate-700 text-white focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="license" className="text-slate-300">Medical License Number</Label>
              <div className="flex gap-3">
                <Input 
                  id="license" 
                  placeholder="MD-29384-CA" 
                  className="bg-slate-900/50 border-slate-700 text-white focus:border-emerald-500 transition-colors"
                />
                <Button 
                  onClick={handleVerify}
                  disabled={verifying || verified}
                  className={`min-w-[100px] ${verified ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                  {verifying ? (
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <ShieldCheck size={18} />
                    </motion.div>
                  ) : verified ? (
                    <span className="flex items-center gap-2">Verified <CheckCircle2 size={16}/></span>
                  ) : (
                    "Verify"
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Specialization</Label>
              <Select>
                <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white">
                  <SelectValue placeholder="Select Specialization" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700 text-white">
                  <SelectItem value="gp">General Practice</SelectItem>
                  <SelectItem value="cardio">Cardiology</SelectItem>
                  <SelectItem value="neuro">Neurology</SelectItem>
                  <SelectItem value="psych">Psychiatry</SelectItem>
                  <SelectItem value="derma">Dermatology</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-2">
              <Label className="text-slate-300 mb-2 block">Upload Credentials</Label>
              <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500/50 hover:bg-slate-900/50 transition-all group">
                <div className="p-3 rounded-full bg-slate-800 group-hover:bg-slate-700 transition-colors mb-3">
                  <FileUp className="text-slate-400 group-hover:text-emerald-400" size={24} />
                </div>
                <p className="text-sm text-slate-400 text-center">
                  Drag & drop your <span className="text-emerald-400">Medical License PDF</span> or <span className="text-emerald-400">ID Image</span>
                </p>
              </div>
            </div>

            <Button 
              onClick={onNext}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-lg shadow-emerald-900/20 py-6 text-lg font-medium tracking-wide mt-4"
            >
              Continue to Practice Setup
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
