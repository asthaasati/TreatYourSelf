import React from 'react';
import { Search, Star, Video, Brain, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export const DoctorDiscovery = ({ onBook }: { onBook: (doc: any) => void }) => {
  const doctors = [
    { id: '1', name: 'Dr. Ananya Sharma', specialty: 'Cardiologist', exp: '12 Yrs', match: '98%', price: '$50' },
    { id: '2', name: 'Dr. Michael Chen', specialty: 'Internal Medicine', exp: '15 Yrs', match: '92%', price: '$45' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Find Specialists</h1>
          <p className="text-slate-500 text-sm italic">AI-ranked providers based on your clinical memory.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3.5 text-slate-500" size={18} />
          <input className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3.5 pl-10 text-sm text-white focus:border-indigo-500 outline-none" placeholder="Search by specialty or name..." />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {doctors.map(doc => (
          <div key={doc.id} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 flex gap-6 hover:border-indigo-500/50 transition-all group">
            <div className="h-24 w-24 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 font-bold text-2xl border border-indigo-500/20">
              {doc.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{doc.name}</h3>
                  <p className="text-indigo-400 text-sm font-medium">{doc.specialty} • {doc.exp}</p>
                </div>
                <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 px-3 py-1">
                  <Brain size={12} className="mr-1.5"/> {doc.match} Match
                </Badge>
              </div>
              <div className="flex gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Star size={14} className="text-amber-500 fill-amber-500"/> 4.9 (120 reviews)</span>
                <span className="flex items-center gap-1"><Video size={14} className="text-emerald-500"/> Video Consultation</span>
              </div>
              <div className="pt-4 flex justify-between items-center border-t border-slate-800/50">
                <span className="text-xl font-bold text-white">{doc.price}<span className="text-xs text-slate-500 font-normal"> / session</span></span>
                <Button onClick={() => onBook(doc)} className="bg-indigo-600 hover:bg-indigo-500 font-bold px-6">Book Now</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};