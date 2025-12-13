import React from 'react';

interface StatCardProps {
  title: string;
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, children, className = '', icon, delay = 0 }) => {
  return (
    <div 
      className={`
        relative overflow-hidden
        bg-zinc-900/50 backdrop-blur-md border border-white/5 
        rounded-3xl p-6 flex flex-col
        hover:border-white/10 transition-colors
        animate-fadeInUp
        ${className}
      `}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest">{title}</h3>
        {icon && <div className="text-zinc-500">{icon}</div>}
      </div>
      <div className="flex-1 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
};

export default StatCard;