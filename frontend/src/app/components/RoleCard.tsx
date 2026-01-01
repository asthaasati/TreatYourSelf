import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

export type CardTheme = 'blue' | 'green' | 'silver' | 'purple';

interface RoleCardProps {
  title: string;
  icon: LucideIcon;
  theme: CardTheme;
  delay?: number;
  onClick?: () => void;
}

const themeStyles: Record<CardTheme, { border: string; glow: string; icon: string }> = {
  blue: {
    border: 'border-blue-500',
    glow: 'shadow-blue-500/50',
    icon: 'text-blue-400',
  },
  green: {
    border: 'border-emerald-500',
    glow: 'shadow-emerald-500/50',
    icon: 'text-emerald-400',
  },
  silver: {
    border: 'border-slate-400',
    glow: 'shadow-slate-400/50',
    icon: 'text-slate-300',
  },
  purple: {
    border: 'border-purple-500',
    glow: 'shadow-purple-500/50',
    icon: 'text-purple-400',
  },
};

export const RoleCard: React.FC<RoleCardProps> = ({ title, icon: Icon, theme, delay = 0, onClick }) => {
  const styles = themeStyles[theme];

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={clsx(
        'relative group cursor-pointer flex flex-col items-center justify-center p-8 rounded-2xl',
        'bg-white/5 backdrop-blur-md border border-white/10',
        'hover:border-opacity-100 transition-all duration-300',
        styles.border,
        'hover:shadow-[0_0_30px_-5px] hover:z-10',
        `hover:${styles.glow}`
      )}
    >
      <div className={clsx(
        'mb-6 p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors',
        styles.icon
      )}>
        <Icon size={48} strokeWidth={1.5} />
      </div>
      <h3 className="text-2xl font-bold text-white tracking-wide group-hover:text-white/90 transition-colors">
        {title}
      </h3>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};
