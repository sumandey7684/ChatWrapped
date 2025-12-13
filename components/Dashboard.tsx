import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { AnalysisResult } from '../types';
import ActivityChart from './charts/ActivityChart';
import HourlyHeatmap from './charts/HourlyHeatmap';
import StatCard from './StatCard';
import { 
  MessageCircle, 
  Calendar, 
  Flame, 
  Clock, 
  Download, 
  RefreshCcw, 
  MessageSquarePlus,
  Type,
  Users
} from 'lucide-react';

interface DashboardProps {
  data: AnalysisResult;
  selectedYear: number | null;
  onYearChange: (year: number) => void;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, selectedYear, onYearChange, onReset }) => {
  const dashboardRef = useRef<HTMLDivElement>(null);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(num);
  };

  const downloadReport = async () => {
    if (!dashboardRef.current) return;
    try {
      const canvas = await html2canvas(dashboardRef.current, {
        backgroundColor: '#09090b',
        scale: 2, // Retina quality
      });
      const link = document.createElement('a');
      link.download = `chat-wrapped-${selectedYear || 'all-time'}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (err) {
      console.error("Failed to download", err);
    }
  };

  // Top 5 users for Chart visualization (to keep it clean)
  const topUsersForChart = data.users.slice(0, 5);

  return (
    <div className="w-full max-w-7xl mx-auto pb-12 px-4">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 animate-fadeIn">
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 md:pb-0 scrollbar-hide">
           <button
             onClick={() => onYearChange(0)} // 0 = All Time
             className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
               selectedYear === null || selectedYear === 0
               ? 'bg-white text-black'
               : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
             }`}
           >
             All Time
           </button>
           {data.yearOptions.map(year => (
             <button
               key={year}
               onClick={() => onYearChange(year)}
               className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                 selectedYear === year
                 ? 'bg-white text-black'
                 : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
               }`}
             >
               {year}
             </button>
           ))}
        </div>

        <div className="flex gap-2">
          <button 
            onClick={downloadReport}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-zinc-200 text-sm font-medium transition-colors"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Save Image</span>
          </button>
          <button 
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-red-900/50 hover:text-red-200 rounded-full text-zinc-200 text-sm font-medium transition-colors"
          >
            <RefreshCcw size={16} />
            <span className="hidden sm:inline">New Upload</span>
          </button>
        </div>
      </div>

      {/* Main Grid to Capture */}
      <div ref={dashboardRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#09090b] p-4 rounded-3xl">
        
        {/* 1. Total Messages & Timeline */}
        <StatCard title="Total Messages" className="md:col-span-2 lg:col-span-2 aspect-[2/1] bg-gradient-to-br from-violet-900/20 to-fuchsia-900/20 border-violet-500/20" icon={<MessageCircle className="text-violet-400"/>} delay={0}>
          <div className="flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter">
                  {formatNumber(data.totalMessages)}
                </h1>
                <p className="text-zinc-400 mt-2 text-sm md:text-base">
                  Messages exchanged {selectedYear ? `in ${selectedYear}` : 'since the beginning'}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <Users size={14} className="text-zinc-400" />
                <span className="text-xs text-zinc-300 font-medium">{data.activeUsersCount} Active Members</span>
              </div>
            </div>
            
            <div className="mt-4 h-32 w-full opacity-90 transition-all duration-500">
              {/* Pass Top Users so the chart knows which keys to stack and color */}
              <ActivityChart data={data.timeline} topUsers={topUsersForChart} />
            </div>
          </div>
        </StatCard>

        {/* 2. Leaderboard (Chatterbox) */}
        <StatCard title="Leaderboard" className="row-span-2 bg-zinc-900/80" icon={<Type className="text-emerald-400"/>} delay={100}>
          <div className="flex flex-col h-full gap-4 overflow-y-auto pr-2 max-h-[600px] scrollbar-thin scrollbar-thumb-zinc-700">
             {data.users.map((user, i) => (
               <div key={user.name} className="relative group">
                 <div className="flex justify-between text-sm mb-1">
                   <div className="flex items-center gap-2 max-w-[70%]">
                      <span className="text-zinc-500 text-xs font-mono w-4">{i + 1}</span>
                      <span className="font-bold truncate text-white">{user.name}</span>
                   </div>
                   <span className="text-zinc-400 text-xs">{((user.messageCount / data.totalMessages) * 100).toFixed(1)}%</span>
                 </div>
                 <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                   <div 
                     className="h-full rounded-full" 
                     style={{ width: `${(user.messageCount / data.totalMessages) * 100}%`, backgroundColor: user.color }}
                   />
                 </div>
                 {i < 3 && (
                   <div className="text-[10px] text-zinc-500 mt-1 flex gap-2">
                      <span>{formatNumber(user.wordCount)} words</span>
                      {user.emojis.length > 0 && <span title="Top emoji"> {user.emojis[0].char}</span>}
                   </div>
                 )}
               </div>
             ))}
          </div>
        </StatCard>

        {/* 3. Longest Streak */}
        <StatCard title="Longest Streak" className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/20" icon={<Flame className="text-orange-400"/>} delay={200}>
           <div className="flex items-baseline gap-2">
             <span className="text-5xl font-black text-white">{data.longestStreak}</span>
             <span className="text-xl text-orange-200/80 font-bold">days</span>
           </div>
           <p className="text-xs text-orange-200/50 mt-2">
             Consecutive days of conversation.
           </p>
        </StatCard>

        {/* 4. Peak Hours */}
        <StatCard title="Peak Hours" className="md:col-span-2" icon={<Clock className="text-cyan-400"/>} delay={300}>
          <div className="flex gap-6 items-center h-full">
            <div className="flex-1 h-32">
              <HourlyHeatmap data={data.hourlyHeatmap} />
            </div>
            <div className="hidden md:block text-right">
               <div className="text-4xl font-bold text-white">
                 {data.busiestHour}:00
               </div>
               <div className="text-sm text-cyan-400 font-medium uppercase tracking-wide">
                 Most Active Hour
               </div>
            </div>
          </div>
        </StatCard>

        {/* 5. Conversation Starter */}
        <StatCard title="The Initiator" className="" icon={<MessageSquarePlus className="text-pink-400"/>} delay={400}>
          <div className="text-center py-4 flex flex-col items-center justify-center h-full">
             <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 truncate w-full px-2">
               {data.topStarter}
             </div>
             <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
               Most likely to revive the chat.
             </p>
          </div>
        </StatCard>

        {/* 6. Busiest Day */}
        <StatCard title="Busiest Day" className="md:col-span-2" icon={<Calendar className="text-yellow-400"/>} delay={500}>
           <div className="flex justify-between items-end">
             <div>
               <div className="text-4xl font-bold text-white">
                 {data.mostActiveDate.count > 0 ? new Date(data.mostActiveDate.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric'}) : 'N/A'}
               </div>
               <p className="text-sm text-zinc-400 mt-1">
                 {formatNumber(data.mostActiveDate.count)} messages in 24 hours
               </p>
             </div>
           </div>
        </StatCard>
      </div>
      
      <div className="text-center mt-12 text-zinc-600 text-xs">
         Generated locally by ChatWrapped. No data sent to servers.
      </div>
    </div>
  );
};

export default Dashboard;