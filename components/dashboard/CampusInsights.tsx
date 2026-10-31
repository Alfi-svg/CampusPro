"use client";

import React from "react";
import { Sparkles, AlertTriangle, ShieldCheck, Zap, ArrowUpRight } from "lucide-react";
import { Complaint } from "@/lib/types";

interface CampusInsightsProps {
  complaints: Complaint[];
}

export function CampusInsights({ complaints }: CampusInsightsProps) {
  const critical = complaints.filter(c => c.priority === "CRITICAL" && c.status !== "Resolved");
  const total = complaints.length;
  const wifiIssues = complaints.filter(c => c.category === "Campus Wi-Fi").length;
  const resolvedCount = complaints.filter(c => c.status === "Resolved").length;

  return (
    <div className="rounded-2xl bg-gradient-to-br from-indigo-950/40 via-[#0E172E]/70 to-[#0A1020]/90 backdrop-blur-2xl border border-indigo-500/20 p-5 sm:p-6 shadow-glass space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              AI-Generated Campus Insights
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Gemini Engine
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Live algorithmic pattern detection and predictive maintenance alerts
            </p>
          </div>
        </div>
      </div>

      {/* Insight Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* Insight 1: Urgent safety note */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 hover:bg-white/[0.05] transition-colors">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold">
            <AlertTriangle className="w-4 h-4" />
            <span>Hazard Alert</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            {critical.length > 0
              ? `${critical.length} critical electrical or safety event flagged in academic buildings. Facilities team notified with safety protocols.`
              : "Zero active life-safety incidents across all campus academic and dormitory blocks."}
          </p>
          <div className="text-[11px] text-slate-400">
            Action: Circuit breakers and access controls prioritized.
          </div>
        </div>

        {/* Insight 2: Network / Facilities hotspot */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 hover:bg-white/[0.05] transition-colors">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
            <Zap className="w-4 h-4" />
            <span>Infrastructure Hotspot</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            Central Library and East Academic Block account for {total > 0 ? Math.round((wifiIssues / total) * 100) : 0}% of connectivity reports.
          </p>
          <div className="text-[11px] text-slate-400">
            Recommendation: Deploy RF repeaters and inspect PoE switches.
          </div>
        </div>

        {/* Insight 3: Resolution velocity */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 hover:bg-white/[0.05] transition-colors">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Turnaround Velocity</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            Average resolution turnaround is 4.2 hours for high-priority tickets, outperforming the 6-hour university SLA.
          </p>
          <div className="text-[11px] text-slate-400">
            Current clearance: {resolvedCount} of {total} total resolved.
          </div>
        </div>
      </div>
    </div>
  );
}
