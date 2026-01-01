import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DashboardHeader } from './DashboardHeader';
import { PatientList } from './PatientList';
import { NeuralSidebar } from './NeuralSidebar';
import { ActionHub } from './ActionHub';
import { AISafetyDashboard } from './AISafetyDashboard';
import { PreConsultationIntelligence } from './PreConsultation';

interface DoctorDashboardProps {
  onNavigate?: (view: string) => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'main' | 'pre-ops' | 'oversight'>('main');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const handlePatientSelect = (patient: any) => {
    setSelectedPatient(patient);
    setActiveTab('pre-ops');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans overflow-hidden flex flex-col p-4 md:p-6">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-950/20 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col h-full max-w-[1600px] mx-auto w-full">
        <div className="flex gap-4 mb-6 self-end bg-slate-900/50 p-1 rounded-xl border border-slate-800">
          <button onClick={() => setActiveTab('main')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab !== 'oversight' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>Clinical View</button>
          <button onClick={() => setActiveTab('oversight')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'oversight' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>AI Safety</button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'main' && (
            <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col">
              <DashboardHeader />
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0 mb-6">
                <div className="lg:col-span-2 min-h-[400px]">
                  <PatientList onSelectPatient={handlePatientSelect} />
                </div>
                <div className="min-h-[400px]"><NeuralSidebar /></div>
              </div>
              <div className="mt-auto"><ActionHub /></div>
            </motion.div>
          )}

          {activeTab === 'pre-ops' && (
            <motion.div key="pre-ops" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <PreConsultationIntelligence 
                patient={selectedPatient} 
                onStartCall={() => onNavigate?.('consultation')} 
              />
            </motion.div>
          )}

          {activeTab === 'oversight' && (
            <motion.div key="oversight" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AISafetyDashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};