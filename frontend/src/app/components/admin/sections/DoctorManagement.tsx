import React from 'react';
import { CheckCircle, XCircle, FileText, ExternalLink } from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

export const DoctorManagement = () => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-white">Practitioner Verification</h2>
      <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">4 Pending Review</Badge>
    </div>

    <div className="grid gap-4">
      <VerificationRow name="Dr. Sarah Jenkins" specialty="Neurology" date="Oct 24" status="Pending" />
      <VerificationRow name="Dr. James Wilson" specialty="General Surgery" date="Oct 23" status="Verified" />
    </div>
  </div>
);

const VerificationRow = ({ name, specialty, date, status }: any) => (
  <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center justify-between group">
    <div className="flex items-center gap-4">
      <div className="h-12 w-12 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-indigo-400">
        {name[4]}
      </div>
      <div>
        <div className="text-sm font-bold text-white">{name}</div>
        <div className="text-xs text-slate-500">{specialty} • Joined {date}</div>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
        <FileText size={16} className="mr-2" /> View License
      </Button>
      {status === 'Pending' ? (
        <div className="flex gap-2">
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500">Approve</Button>
          <Button size="sm" variant="destructive">Reject</Button>
        </div>
      ) : (
        <Badge className="bg-emerald-500/10 text-emerald-500">Active License</Badge>
      )}
    </div>
  </div>
);