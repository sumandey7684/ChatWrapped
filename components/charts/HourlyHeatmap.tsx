import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Cell
} from 'recharts';
import { HourlyActivity } from '../../types';

interface HourlyHeatmapProps {
  data: HourlyActivity[];
}

const HourlyHeatmap: React.FC<HourlyHeatmapProps> = ({ data }) => {
  return (
    <div className="h-full w-full min-h-[150px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis 
            dataKey="hour" 
            tick={{ fill: '#71717a', fontSize: 10 }} 
            tickLine={false}
            axisLine={false}
            interval={3}
            tickFormatter={(h) => {
              const hour = Number(h);
              const ampm = hour >= 12 ? 'PM' : 'AM';
              const hour12 = hour % 12 || 12;
              return `${hour12} ${ampm}`;
            }}
          />
          <Tooltip 
            cursor={{fill: '#27272a'}}
            contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '8px' }}
            itemStyle={{ color: '#fff' }}
            labelFormatter={(h) => {
               const hour = Number(h);
               const nextHour = (hour + 1) % 24;
               const format = (n: number) => {
                  const ampm = n >= 12 ? 'PM' : 'AM';
                  const hour12 = n % 12 || 12;
                  return `${hour12} ${ampm}`;
               }
               return `${format(hour)} - ${format(nextHour)}`;
            }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={
                  // Gradient logic based on hour (Work/Day vs Night)
                  index >= 9 && index <= 17 ? '#06b6d4' : // Cyan for work hours
                  index > 17 && index <= 23 ? '#ec4899' : // Pink for evening
                  '#6366f1' // Indigo for late night/morning
                } 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HourlyHeatmap;