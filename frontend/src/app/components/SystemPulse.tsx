import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Cpu, Database, Wifi } from 'lucide-react';

export const SystemPulse: React.FC = () => {
  const [stats, setStats] = useState({
    latency: 24,
    requests: 1250,
    uptime: 99.99,
    activeNodes: 842
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        latency: Math.max(10, Math.min(50, prev.latency + (Math.random() * 4 - 2))),
        requests: Math.floor(prev.requests + (Math.random() * 10)),
        uptime: 99.99,
        activeNodes: Math.max(800, Math.min(900, Math.floor(prev.activeNodes + (Math.random() * 2 - 1))))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full border-t border-white/10 bg-black/40 backdrop-blur-md py-3 overflow-hidden">
      <div className="flex items-center justify-center space-x-12 text-sm font-mono text-cyan-400/80 tracking-widest uppercase">
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-2"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px] shadow-green-500" />
          System Optimal
        </motion.div>

        <div className="hidden md:flex items-center gap-2">
          <Activity size={14} />
          <span>Latency: {stats.latency.toFixed(1)}ms</span>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Wifi size={14} />
          <span>Req/s: {stats.requests}</span>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Database size={14} />
          <span>Nodes: {stats.activeNodes}</span>
        </div>
        
        <div className="hidden md:flex items-center gap-2">
          <Cpu size={14} />
          <span>Load: 42%</span>
        </div>
      </div>
    </div>
  );
};
