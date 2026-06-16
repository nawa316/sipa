"use client";

import { RadarData } from "@/lib/mockMatchingAlgo";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { COTA, Anak } from "@/types";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-xl">
        <p className="font-bold text-sm text-slate-800 mb-2">{payload[0].payload.subject}</p>
        <p className="text-xs text-blue-600 font-medium">Kebutuhan Anak: {payload[0].value}</p>
        <p className="text-xs text-emerald-600 font-medium">Kapasitas COTA: {payload[1].value}</p>
      </div>
    );
  }
  return null;
};

export function RadarComparison({ 
  data,
  anak,
  cota
}: { 
  data: RadarData[],
  anak: Anak,
  cota: COTA
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center">
      <h3 className="font-bold text-slate-800 mb-6 text-center w-full">Analisis Dimensi Kecocokan</h3>
      
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
            <Radar 
              name={`Kebutuhan: ${anak.nama}`} 
              dataKey="A" 
              stroke="#3b82f6" 
              fill="#3b82f6" 
              fillOpacity={0.2} 
            />
            <Radar 
              name={`Kapasitas: ${cota.namaSuami} & ${cota.namaIstri}`} 
              dataKey="B" 
              stroke="#10b981" 
              fill="#10b981" 
              fillOpacity={0.4} 
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
