import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Edit3, FileText, Send, ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export const PostConsultationReview = ({ onFinalize }: { onFinalize: () => void }) => {
  const [summary, setSummary] = useState(
    "Patient presents with elevated BP (155/95). Adjusted Losartan to 50mg daily. Yoga protocol updated to focus on Pranayama; high-intensity inversions restricted until BP stabilizes."
  );

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8 animate-in fade-in duration-700">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white">Finalize Consultation</h2>
          <p className="text-slate-500 text-sm mt-1">Review AI-generated records before synchronization.</p>
        </div>
        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-4 py-2">
          <ShieldCheck size={14} className="mr-2" /> HIPAA Compliant Session
        </Badge>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Left: AI Summary Editor */}
        <div className="col-span-8 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <FileText size={14} className="text-indigo-400" /> Clinical SOAP Summary
              </label>
              <Badge variant="outline" className="text-[10px] border-slate-700 text-slate-400">AI Generated</Badge>
            </div>
            <textarea 
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full h-48 bg-slate-950/50 border border-slate-800 rounded-2xl p-6 text-slate-300 text-sm leading-relaxed focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 flex gap-4">
            <AlertCircle className="text-amber-500 shrink-0" size={20} />
            <p className="text-[11px] text-amber-200/70 italic leading-relaxed">
              Note: Approving this summary will automatically update the patient's **Daily Protocol** and **Health Snapshot** view.
            </p>
          </div>
        </div>

        {/* Right: Prescriptions & Actions */}
        <div className="col-span-4 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Final Orders</h3>
            <div className="space-y-3">
              <OrderItem label="Losartan - 50mg" sub="1 Daily - Oral" />
              <OrderItem label="Pranayama Session" sub="20 min - Daily" />
            </div>
          </div>

          <Button 
            onClick={onFinalize}
            className="w-full h-16 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-xl shadow-emerald-900/20 transition-all flex items-center justify-center gap-3"
          >
            <Send size={18} /> Finalize & Sync
          </Button>
        </div>
      </div>
    </div>
  );
};

const OrderItem = ({ label, sub }: any) => (
  <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-xl">
    <div className="text-sm font-bold text-slate-200">{label}</div>
    <div className="text-[10px] text-slate-500 font-mono uppercase mt-1">{sub}</div>
  </div>
);