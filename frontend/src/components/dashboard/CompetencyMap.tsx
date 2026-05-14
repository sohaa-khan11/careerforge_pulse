"use client";

import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { motion } from "framer-motion";

interface CompetencyMapProps {
  data: {
    label: string;
    score: number;
  }[];
}

export function CompetencyMap({ data }: CompetencyMapProps) {
  // Map labels to short versions if needed
  const chartData = data.map(d => ({
    subject: d.label,
    A: d.score,
    fullMark: 100,
  }));

  return (
    <div className="w-full h-full flex flex-col items-center justify-center min-h-[300px]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
            <PolarGrid stroke="#27272a" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: "#71717a", fontSize: 10, fontWeight: 500 }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={false} 
              axisLine={false}
            />
            <Radar
              name="Candidate"
              dataKey="A"
              stroke="#e4e4e7"
              fill="#e4e4e7"
              fillOpacity={0.1}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>
      
      <div className="grid grid-cols-2 gap-4 mt-4 w-full px-4">
        {data.map((item, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">{item.label}</div>
            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${item.score}%` }}
                transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                className="h-full bg-zinc-400"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
