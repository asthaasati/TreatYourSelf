import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { DoctorRegistration } from './components/doctor-flow/DoctorRegistration';
import { DoctorDashboard } from './components/dashboard/DoctorDashboard';
import { ConsultationWorkspace } from './components/consultation/ConsultationWorkspace';
import { PatientAuth } from './components/patient/Auth';
import { HealthIntake } from './components/patient/HealthIntake';
import { PatientDashboard } from './components/patient/PatientDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

type AppView = 
  | 'landing' 
  | 'doctor-flow' 
  | 'doctor-dashboard' 
  | 'consultation' 
  | 'patient-auth' 
  | 'patient-intake' 
  | 'patient-dashboard'
  | 'governance-dashboard';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  
  return (
    <div className="min-h-screen bg-[#020617]">
      {currentView === 'landing' && (
        <LandingPage onNavigate={(role) => {
          if (role === 'doctor') setCurrentView('doctor-flow');
          if (role === 'patient') setCurrentView('patient-auth');
          if (role === 'governance') setCurrentView('governance-dashboard');
        }} />
      )}
      
      {/* Doctor Persona */}
      {currentView === 'doctor-flow' && (
        <DoctorRegistration 
          onBack={() => setCurrentView('landing')} 
          onComplete={() => setCurrentView('doctor-dashboard')}
        />
      )}
      {currentView === 'doctor-dashboard' && (
        <DoctorDashboard onNavigate={(view) => {
          if (view === 'consultation') setCurrentView('consultation');
        }} />
      )}
      {currentView === 'consultation' && (
        <ConsultationWorkspace onBack={() => setCurrentView('doctor-dashboard')} />
      )}

      {/* Patient Persona */}
      {currentView === 'patient-auth' && (
        <PatientAuth onAuthSuccess={() => setCurrentView('patient-intake')} />
      )}
      {currentView === 'patient-intake' && (
        <HealthIntake onComplete={() => setCurrentView('patient-dashboard')} />
      )}
      {currentView === 'patient-dashboard' && (
        <PatientDashboard />
      )}

      {/* Unified Governance Persona */}
      {currentView === 'governance-dashboard' && (
        <AdminDashboard />
      )}
    </div>
  );
}

export default App;