import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Wand2, Flower2, Clock } from 'lucide-react';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';
import { clsx } from 'clsx';

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
}

export const Step2Practice: React.FC<Step2Props> = ({ onNext, onBack }) => {
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const times = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

  const toggleSlot = (day: string, time: string) => {
    const id = `${day}-${time}`;
    if (selectedSlots.includes(id)) {
      setSelectedSlots(selectedSlots.filter(s => s !== id));
    } else {
      setSelectedSlots([...selectedSlots, id]);
    }
  };

  return (
    <div className="w-full min-h-[600px] bg-slate-950/50 rounded-3xl overflow-hidden border border-slate-800 p-8 flex flex-col">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">The Practice Engine</h2>
        <p className="text-slate-400">Configure your availability and AI integration preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1">
        
        {/* Calendar Grid */}
        <div className="flex-1 bg-slate-900/40 rounded-2xl border border-slate-800 p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <CalendarIcon className="text-indigo-400" size={20} />
            </div>
            <h3 className="text-lg font-medium text-white">Availability Grid</h3>
            <span className="text-xs text-slate-500 ml-auto">Click to toggle slots</span>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-4">
            {/* Times Column */}
            <div className="flex flex-col gap-2 pt-8">
              {times.map(time => (
                <div key={time} className="h-10 flex items-center justify-end text-xs text-slate-500 font-mono pr-2">
                  {time}
                </div>
              ))}
            </div>

            {/* Days Columns */}
            <div className="grid grid-cols-5 gap-2">
              {days.map(day => (
                <div key={day} className="flex flex-col gap-2">
                  <div className="text-center text-sm font-medium text-slate-300 mb-2">{day}</div>
                  {times.map(time => {
                    const id = `${day}-${time}`;
                    const isSelected = selectedSlots.includes(id);
                    return (
                      <motion.button
                        key={id}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleSlot(day, time)}
                        className={clsx(
                          "h-10 rounded-md border transition-all duration-200 w-full relative group overflow-hidden",
                          isSelected 
                            ? "bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]" 
                            : "bg-slate-800/30 border-slate-700/50 hover:bg-slate-800"
                        )}
                      >
                         {isSelected && (
                           <motion.div 
                             initial={{ scale: 0 }} 
                             animate={{ scale: 1 }}
                             className="absolute inset-0 flex items-center justify-center"
                           >
                             <div className="w-2 h-2 rounded-full bg-emerald-400" />
                           </motion.div>
                         )}
                      </motion.button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6 backdrop-blur-sm space-y-6">
            <h3 className="text-lg font-medium text-white mb-4">Augmented Features</h3>
            
            <div className="flex items-start gap-4">
              <div className="p-2 bg-purple-500/10 rounded-lg shrink-0">
                <Wand2 className="text-purple-400" size={20} />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="ai-soap" className="text-white font-medium cursor-pointer">AI SOAP Notes</Label>
                  <Switch id="ai-soap" className="data-[state=checked]:bg-purple-600" />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Automatically generate structured clinical notes from consultation audio.
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-slate-800" />

            <div className="flex items-start gap-4">
              <div className="p-2 bg-rose-500/10 rounded-lg shrink-0">
                <Flower2 className="text-rose-400" size={20} />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="yoga" className="text-white font-medium cursor-pointer">Yoga Integration</Label>
                  <Switch id="yoga" className="data-[state=checked]:bg-rose-600" />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Suggest complementary yoga flows based on patient physical status.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 flex gap-4">
             <Button 
              variant="outline" 
              onClick={onBack}
              className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Back
            </Button>
            <Button 
              onClick={onNext}
              className="flex-[2] bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20"
            >
              Finish Setup
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
