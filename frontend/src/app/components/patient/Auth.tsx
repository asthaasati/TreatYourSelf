import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Github } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export const PatientAuth = ({ onAuthSuccess }: { onAuthSuccess: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Treat<span className="text-indigo-500">YourSelf</span>
          </h1>
          <p className="text-slate-400 text-sm font-light">
            {isLogin ? "Welcome back. Access your AI health records." : "Join the advanced healthcare ecosystem."}
          </p>
        </div>

        <div className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-slate-500" size={18} />
              <Input className="pl-10 bg-slate-950 border-slate-800 text-white" placeholder="Full Name" />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
            <Input className="pl-10 bg-slate-950 border-slate-800 text-white" placeholder="Email Address" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
            <Input className="pl-10 bg-slate-950 border-slate-800 text-white" type="password" placeholder="Password" />
          </div>
          
          <Button onClick={onAuthSuccess} className="w-full bg-indigo-600 hover:bg-indigo-500 h-12 font-bold transition-all shadow-lg shadow-indigo-900/20">
            {isLogin ? "Sign In" : "Create Account"} <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          {isLogin ? "New to TreatYourSelf?" : "Already have an account?"} 
          <button onClick={() => setIsLogin(!isLogin)} className="text-indigo-400 ml-2 font-bold hover:underline">
            {isLogin ? "Create an account" : "Log in here"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};