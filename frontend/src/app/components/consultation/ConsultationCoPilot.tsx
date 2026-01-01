import React, { useState } from 'react';
import { Video, Mic, PhoneOff, Brain, Sparkles, FilePlus } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export const ConsultationCoPilot = () => {
  const [isLive, setIsLive] = useState(false);
  const [entities, setEntities] = useState<string[]>(['Hypertension', 'Lisinopril']);

  return (
    <div className="h-full flex flex-col bg-slate-950">
      {/* 1. Video & Live Transcription Grid */}
      <div className="flex-1 grid grid-cols-12 gap-4 p-4">
        <div className="col-span-8 bg-slate-900 rounded-3xl relative overflow-hidden border border-slate-800">
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
             {!isLive ? (
               <Button onClick={() => setIsLive(true)} className="bg-indigo-600">Start Secure Video</Button>
             ) : (
               <div className="w-full h-full bg-slate-800" /> /* Replace with actual WebRTC Video element */
             )}
          </div>
          
          {/* Live AI Overlay */}
          {isLive && (
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-indigo-500/30">
              <div className="flex gap-2 items-center mb-2">
                <Sparkles size={14} className="text-indigo-400 animate-pulse" />
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Live NLP Highlights</span>
              </div>
              <div className="flex gap-2">
                {entities.map(e => (
                  <Badge key={e} className="bg-indigo-500/20 text-indigo-300 border-indigo-500/40">{e}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 2. Side Panel: Decision Support */}
        <aside className="col-span-4 space-y-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Brain size={16} className="text-purple-400" /> Similar Patient Insights
            </h3>
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <p className="text-xs text-slate-300 leading-relaxed">
                In <span className="text-white font-bold">12 similar patients</span>, Treatment X (Yoga + Dosage Adjust) improved outcomes in 8 cases.
              </p>
            </div>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <FilePlus size={16} className="text-emerald-400" /> Quick Actions
            </h3>
            <Button className="w-full justify-start gap-2 mb-2" variant="outline">Prescribe Medications</Button>
            <Button className="w-full justify-start gap-2" variant="outline">Order Blood Tests</Button>
          </div>
        </aside>
      </div>

      {/* 3. Call Controls */}
      <footer className="h-20 bg-slate-950 border-t border-slate-800 flex items-center justify-center gap-6">
        <Button variant="outline" size="icon" className="rounded-full"><Mic size={20}/></Button>
        <Button variant="destructive" size="icon" className="rounded-full w-12 h-12" onClick={() => setIsLive(false)}>
          <PhoneOff size={24}/>
        </Button>
      </footer>
    </div>
  );
};