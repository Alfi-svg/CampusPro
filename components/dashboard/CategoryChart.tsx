"use client";

import React, { useMemo, useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { Complaint, ComplaintCategory } from "@/lib/types";

interface CategoryChartProps {
  complaints: Complaint[];
}

const CATEGORY_COLORS: Record<ComplaintCategory, string> = {
  "Electricity": "#EF4444",
  "Campus Wi-Fi": "#06B6D4",
  "Classroom & Projector": "#6366F1",
  "Washroom & Cleanliness": "#10B981",
  "Fan & AC": "#F59E0B",
  "Campus Security": "#8B5CF6",
  "Transportation": "#EC4899"
};

export function CategoryChart({ complaints }: CategoryChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of complaints) {
      counts[c.category] = (counts[c.category] || 0) + 1;
    }

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
      color: CATEGORY_COLORS[name as ComplaintCategory] || "#6366F1"
    }));
  }, [complaints]);

  const total = complaints.length;

  if (!mounted) {
    return (
      <div className="h-[220px] w-full flex items-center justify-center text-slate-500 text-xs">
        <span className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mr-2" />
        Loading category data...
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
      <div className="h-[220px] w-full md:w-1/2 relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0];
                  const pct = total > 0 ? Math.round(((item.value as number) / total) * 100) : 0;
                  return (
                    <div className="rounded-xl bg-[#080D1A]/95 backdrop-blur-xl border border-white/20 p-2.5 shadow-2xl text-xs space-y-1">
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-slate-300">
                        {item.value} issues ({pct}%)
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.5)" strokeWidth={1} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-black text-white">{total}</span>
          <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
            Complaints
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="w-full md:w-1/2 space-y-2">
        {data.map(item => {
          const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
          return (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-300 truncate">{item.name}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-semibold text-white">{item.value}</span>
                <span className="text-slate-500 text-[10px]">({pct}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
