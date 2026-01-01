import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, ExternalLink, ShieldCheck, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export const PrescriptionsTab = () => {
  // Mock data representing the Clinical Memory Graph records
  const records = [
    {
      id: "RX-8832",
      date: "Oct 24, 2024",
      doctor: "Dr. Ananya Sharma",
      type: "Digital Prescription",
      tags: ["Hypertension", "Losartan"],
      isAI: false
    },
    {
      id: "SUM-991",
      date: "Oct 24, 2024",
      doctor: "TreatYourSelf AI",
      type: "AI Visit Summary",
      tags: ["SOAP Summary", "Graph Sync"],
      isAI: true
    }
  ];

  const handleDownload = (id: string) => {
    console.log(`Generating PDF for record: ${id}`);
    // Logic for generating/downloading doctor-approved PDF
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Medical Records Vault</h2>
          <p className="text-slate-500 text-sm mt-1 italic">Securely synced with your clinical trajectory.</p>
        </div>
        <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 rounded-full text-[10px] font-bold">
          <ShieldCheck size={12} className="mr-2" /> End-to-End Encrypted
        </Badge>
      </div>
      
      <div className="space-y-4">
        {records.map((record) => (
          <motion.div 
            key={record.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-900/40 border border-slate-800 rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-6 hover:bg-slate-900/60 transition-all group"
          >
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className={`p-4 rounded-2xl ${record.isAI ? 'bg-indigo-500/10 text-indigo-400' : 'bg-blue-500/10 text-blue-400'} border border-white/5 shadow-inner`}>
                <FileText size={28} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                  <Calendar size={12} /> {record.date} • {record.doctor}
                </div>
                <h4 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {record.type} <span className="text-slate-600 font-medium ml-2">{record.id}</span>
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {record.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="bg-slate-950/50 border border-slate-800 text-[10px] py-0.5 px-3 font-semibold text-slate-400">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <Button 
                variant="outline" 
                onClick={() => handleDownload(record.id)}
                className="border-slate-700 bg-slate-950/50 hover:bg-slate-800 flex-1 md:flex-none h-12 rounded-xl"
              >
                <Download size={18} className="mr-2 text-indigo-400" /> Download PDF
              </Button>
              <Button 
                variant="ghost" 
                className="text-slate-500 hover:text-white hover:bg-slate-800 h-12 w-12 rounded-xl"
              >
                <ExternalLink size={20} />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Verification Placeholder for Data Integrity */}
      <div className="mt-12 p-8 border border-dashed border-slate-800 rounded-[2rem] text-center bg-slate-950/20">
        <div className="inline-block p-4 bg-slate-900 rounded-full text-slate-600 mb-4">
          <ShieldCheck size={32} />
        </div>
        <h3 className="text-slate-400 font-bold">Verification Center</h3>
        <p className="text-slate-600 text-xs max-w-sm mx-auto mt-2">
          Only doctor-approved records are visible here. Pending lab results will appear once reviewed by the clinical team.
        </p>
      </div>
    </div>
  );
};