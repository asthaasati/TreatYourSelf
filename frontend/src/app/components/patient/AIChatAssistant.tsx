import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, User, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../ui/button';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  timestamp: Date;
}

export const AIChatAssistant = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      text: "Hello Rohit! I'm your TreatYourSelf AI. I have analyzed your recent BP of 155/95 and your current Losartan protocol. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate AI clinical reasoning delay
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: "Based on Clinical_BERT_v2.4, your elevated BP suggests we should monitor your adherence to the 4PM Pranayama session. Would you like to see how this correlates with your heart rate trends?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed bottom-6 right-6 w-[440px] h-[600px] bg-slate-950 border border-slate-800 rounded-[2.5rem] shadow-2xl z-50 flex flex-col overflow-hidden"
        >
          {/* Header with Safety Status */}
          <div className="p-6 bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Clinical AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[10px] text-indigo-100 font-medium uppercase tracking-tighter">Verified v2.4.1</span>
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="hover:bg-white/10 p-1.5 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Chat Canvas */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-95">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-800 text-slate-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
                    {msg.role === 'user' ? <User size={14} /> : <Sparkles size={14} />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-900 text-slate-300 border border-slate-800 rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-slate-950 border-t border-slate-800">
            <div className="flex gap-3 items-center relative">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about medications or vitals..."
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3.5 pl-5 pr-12 text-sm text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
              <ShieldCheck size={12} /> HIPAA Encrypted Channel
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};