import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Pill, Flower2, MessageSquare, History, CheckCircle2, 
  Bell, User, LayoutDashboard, Stethoscope, FileText, Brain
} from 'lucide-react';
import { Button } from '../ui/button';
import { HealthSummaryPanel } from './HealthSummaryPanel';
import { DoctorDiscovery } from './DoctorDiscovery';
import { PrescriptionsTab } from './PrescriptionsTab';
import { AIChatAssistant } from './AIChatAssistant'; // Ensure this file is created

export const PatientDashboard = () => {
  // Navigation State for Web View
  const [activeTab, setActiveTab] = useState<'dash' | 'discovery' | 'records'>('dash');
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans flex flex-col">
      {/* 1. Web Navigation Bar */}
      <nav className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-30">
        <div className="flex items-center gap-10">
          <span 
            className="text-xl font-bold tracking-tighter cursor-pointer hover:text-indigo-400 transition-colors"
            onClick={() => setActiveTab('dash')}
          >
            Treat<span className="text-indigo-500">YourSelf</span>
          </span>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold">
            <button 
              onClick={() => setActiveTab('dash')}
              className={`flex items-center gap-2 py-1 border-b-2 transition-all ${activeTab === 'dash' ? 'text-indigo-400 border-indigo-500' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
            >
              <LayoutDashboard size={16}/> Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('discovery')}
              className={`flex items-center gap-2 py-1 border-b-2 transition-all ${activeTab === 'discovery' ? 'text-indigo-400 border-indigo-500' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
            >
              <Stethoscope size={16}/> Find Doctors
            </button>
            <button 
              onClick={() => setActiveTab('records')}
              className={`flex items-center gap-2 py-1 border-b-2 transition-all ${activeTab === 'records' ? 'text-indigo-400 border-indigo-500' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
            >
              <FileText size={16}/> Prescriptions
            </button>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button className="p-2 text-slate-400 hover:text-white relative bg-slate-900 rounded-lg">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-indigo-500 rounded-full border border-slate-950" />
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <User size={18} />
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-[1400px] w-full mx-auto p-6 md:p-10">
        <AnimatePresence mode="wait">
          {activeTab === 'dash' && (
            <motion.div 
              key="dash" 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-12 gap-8"
            >
              {/* Left Column: Health Metrics & AI Insights */}
              <div className="col-span-12 lg:col-span-8 space-y-8">
                <HealthSummaryPanel />
                
                <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 group">
                  <h3 className="font-bold flex items-center gap-2 text-slate-200 uppercase tracking-widest text-xs mb-6">
                    <History size={16} className="text-indigo-400" /> Recent Visit Summary
                  </h3>
                  <div className="p-6 bg-slate-950/50 border border-slate-800 rounded-2xl border-l-4 border-l-indigo-500">
                    <p className="text-sm text-slate-400 leading-relaxed italic">
                      "AI Summary: Based on your Oct 24 consult, your Losartan dosage was adjusted to 50mg. 
                      The system has updated your yoga protocol to focus on stress-management routines. 
                      Please avoid high-intensity inversions until your systolic BP stabilizes below 140."
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Protocols & AI Engagement */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 px-2">Daily Protocol</h3>
                  <div className="space-y-4">
                    <ScheduleItem icon={<Pill className="text-blue-400" />} title="Losartan - 50mg" time="08:00 PM" isDone={false} />
                    <ScheduleItem icon={<Flower2 className="text-emerald-400" />} title="Pranayama Session" time="04:00 PM" isDone={true} />
                  </div>
                </div>

                <div className="bg-indigo-600 rounded-[2rem] p-8 shadow-2xl shadow-indigo-900/40 relative overflow-hidden group">
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-3">AI Clinical Assistant</h3>
                    <p className="text-indigo-100 text-xs mb-8 leading-relaxed">
                      Instant answers about your medications, yoga metrics, or medical history.
                    </p>
                    <Button 
                      onClick={() => setIsChatOpen(true)}
                      className="w-full bg-white text-indigo-600 hover:bg-slate-100 font-bold py-7 rounded-2xl shadow-xl transition-transform active:scale-95"
                    >
                      <MessageSquare size={18} className="mr-2" /> Start AI Chat
                    </Button>
                  </div>
                  <Brain size={120} className="absolute -bottom-8 -right-8 text-white/10 rotate-12 group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'discovery' && (
            <motion.div key="discovery" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <DoctorDiscovery onBook={(doc) => console.log("Booking:", doc)} />
            </motion.div>
          )}

          {activeTab === 'records' && (
            <motion.div key="records" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <PrescriptionsTab />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 2. Global AI Chat Overlay */}
      <AIChatAssistant isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

// Reusable Schedule Item Component
const ScheduleItem = ({ icon, title, time, isDone }: any) => (
  <div className={`p-4 rounded-2xl border ${isDone ? 'border-emerald-500/20 bg-emerald-900/5' : 'border-slate-800 bg-slate-950/50'} flex items-center justify-between group transition-all`}>
    <div className="flex items-center gap-4">
      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 group-hover:border-indigo-500/50 transition-colors">{icon}</div>
      <div>
        <div className="text-sm font-bold text-slate-200">{title}</div>
        <div className="text-[10px] text-slate-500 uppercase font-mono tracking-tighter">{time}</div>
      </div>
    </div>
    {isDone ? <CheckCircle2 className="text-emerald-500" size={20} /> : <div className="h-5 w-5 rounded-full border-2 border-slate-700 group-hover:border-indigo-500 transition-colors" />}
  </div>
);