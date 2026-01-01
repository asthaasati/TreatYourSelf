import React from 'react';
import { CheckCircle, FileText, ExternalLink } from 'lucide-react';
import { Button } from '../../ui/button';

export const DoctorVerification = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white mb-8">Pending Credentials Review</h2>
    <div className="grid gap-4">
      <VerificationRow name="Dr. Ananya Sharma" specialty="Cardiology" id="MC-9921" />
      <VerificationRow name="Dr. Michael Chen" specialty="Internal Medicine" id="MC-8832" />
    </div>
  </div>
);

const VerificationRow = ({ name, specialty, id }: any) => (
  <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center justify-between group hover:border-indigo-500/50 transition-all">
    <div className="flex items-center gap-6">
      <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center font-bold text-indigo-400 border border-indigo-500/20">
        {name[4]}
      </div>
      <div>
        <div className="text-sm font-bold text-white">{name}</div>
        <div className="text-xs text-slate-500">{specialty} • License {id}</div>
      </div>
    </div>
    <div className="flex gap-3">
      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
        <FileText size={16} className="mr-2" /> View Documents
      </Button>
      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 font-bold px-6">Approve</Button>
    </div>
  </div>
);