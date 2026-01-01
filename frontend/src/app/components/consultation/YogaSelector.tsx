import React from 'react';
import { Leaf, Search, Info } from 'lucide-react';

export const YogaSelector = () => {
  const asanas = [
    { name: 'Vajrasana', safety: '98%', status: 'Safe', color: 'text-emerald-400' },
    { name: 'Pranayama', safety: '99%', status: 'Highly Recommended', color: 'text-emerald-400' },
    { name: 'Sirsasana', safety: '12%', status: 'High Risk', color: 'text-red-400', warning: 'Inversion contraindicated for HTN' }
  ];

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
      <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2 mb-4">
        <Leaf size={14} /> Complementary Care Selector
      </h3>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 text-slate-600" size={14} />
        <input className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-300 outline-none focus:border-emerald-500/50" placeholder="Search approved asanas..." />
      </div>

      <div className="space-y-2">
        {asanas.map((asana) => (
          <div key={asana.name} className="p-3 bg-slate-950 border border-slate-800 rounded-lg hover:border-emerald-500/30 transition-all cursor-pointer group">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-semibold text-slate-200">{asana.name}</span>
              <span className={`text-[10px] font-bold ${asana.color}`}>{asana.safety} Safety</span>
            </div>
            <p className="text-[10px] text-slate-500 group-hover:text-slate-400 transition-colors">{asana.status}</p>
            {asana.warning && (
              <div className="mt-2 flex items-start gap-1 text-[9px] text-amber-500 italic">
                <Info size={10} className="mt-0.5" /> {asana.warning}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};