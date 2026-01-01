import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Users, Activity, Brain, Lock, 
  AlertTriangle, Settings, Database, Power, LayoutDashboard 
} from 'lucide-react';

// Sections
import { GovernanceOverview } from './sections/GovernanceOverview';
import { DoctorVerification } from './sections/DoctorVerification';
import { AISafetyConsole } from './sections/AISafetyConsole';
import { AuditComplianceLogs } from './sections/AuditComplianceLogs';
import { SystemHealth } from './sections/SystemHealth';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden">
      {/* Sidebar: Platform Governance & Safety */}
      <aside className="w-72 border-r border-slate-800 bg-slate-950 flex flex-col">
        <div className="p-8 border-b border-slate-800">
          <h1 className="text-lg font-bold text-white flex items-center gap-3">
            <ShieldCheck className="text-indigo-500" /> Control Tower
          </h1>
          <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-2">
            Governance & AI Safety
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="pt-2 mb-4 px-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">
            Human Governance
          </div>
          <NavItem active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<LayoutDashboard size={18}/>} label="Overview" />
          <NavItem active={activeTab === 'verification'} onClick={() => setActiveTab('verification')} icon={<Users size={18}/>} label="Doctor Verification" />
          
          <div className="pt-6 mb-4 px-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">
            AI Oversight
          </div>
          <NavItem active={activeTab === 'ai-safety'} onClick={() => setActiveTab('ai-safety')} icon={<Brain size={18}/>} label="AI Safety Console" />
          <NavItem active={activeTab === 'audit'} onClick={() => setActiveTab('audit')} icon={<Database size={18}/>} label="Compliance Logs" />
          <NavItem active={activeTab === 'health'} onClick={() => setActiveTab('health')} icon={<Activity size={18}/>} label="System Reliability" />
        </nav>
      </aside>

      {/* Main Command Workspace */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-10 bg-slate-950/40 backdrop-blur-xl">
          <div>
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-500">Node: {activeTab}</h2>
            <div className="flex items-center gap-3 mt-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
              <span className="text-sm font-bold text-slate-200">Trust Index: 100%</span>
            </div>
          </div>
          <button className="px-4 py-2 bg-red-600/10 border border-red-600/30 text-red-500 text-xs font-bold rounded-xl hover:bg-red-600/20 transition-all uppercase">
            <Power size={14} className="inline mr-2" /> Emergency Kill Switch
          </button>
        </header>

        <section className="flex-1 overflow-y-auto p-10 bg-[#020617]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && <GovernanceOverview />}
              {activeTab === 'verification' && <DoctorVerification />}
              {activeTab === 'ai-safety' && <AISafetyConsole />}
              {activeTab === 'audit' && <AuditComplianceLogs />}
              {activeTab === 'health' && <SystemHealth />}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-sm font-bold border border-transparent mb-1 ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/30 border-indigo-500/20' 
        : 'text-slate-500 hover:bg-slate-900 hover:text-slate-300'
    }`}
  >
    {icon} {label}
  </button>
);