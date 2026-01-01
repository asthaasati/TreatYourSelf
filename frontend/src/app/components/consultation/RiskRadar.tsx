import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
  { subject: 'Cardio', A: 120, fullMark: 150 },
  { subject: 'Metabolic', A: 98, fullMark: 150 },
  { subject: 'Mobility', A: 86, fullMark: 150 },
  { subject: 'Neuro', A: 99, fullMark: 150 },
  { subject: 'Immune', A: 85, fullMark: 150 },
  { subject: 'Lifestyle', A: 65, fullMark: 150 },
];

export const RiskRadar: React.FC = () => {
  return (
    <div className="w-full h-full relative">
       {/* Custom customized look for the radar */}
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
          <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
          <Radar
            name="Patient Risk Profile"
            dataKey="A"
            stroke="#10b981"
            strokeWidth={2}
            fill="#10b981"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
      <div className="absolute top-0 right-0 p-2 bg-slate-900/80 backdrop-blur text-[10px] text-slate-400 rounded-bl-lg border-l border-b border-slate-700">
         RISK RADAR
      </div>
    </div>
  );
};
