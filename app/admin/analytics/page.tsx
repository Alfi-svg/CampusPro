"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Building
} from "lucide-react";
import { Complaint, ComplaintPriority } from "@/lib/types";
import { getComplaints, DEPARTMENTS_LIST } from "@/lib/storage";
import { TrendsChart } from "@/components/dashboard/TrendsChart";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { Badge } from "@/components/ui/Badge";

export default function AnalyticsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    setComplaints(getComplaints());
  }, []);

  const total = complaints.length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;
  const inProgress = complaints.filter(c => c.status === "In Progress").length;
  const critical = complaints.filter(c => c.priority === "CRITICAL").length;
  const high = complaints.filter(c => c.priority === "HIGH").length;

  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

  // Department ticket counts
  const deptStats = DEPARTMENTS_LIST.map(dept => {
    const assigned = complaints.filter(c => c.assignedDepartment === dept);
    const resolvedCount = assigned.filter(c => c.status === "Resolved").length;
    return {
      name: dept,
      total: assigned.length,
      resolved: resolvedCount,
      rate: assigned.length > 0 ? Math.round((resolvedCount / assigned.length) * 100) : 100
    };
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Complaint Analytics & SLA Performance
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Deep-dive telemetry into resolution turnaround times, department workloads, and severity distributions.
        </p>
      </div>

      {/* KPI Top Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0F172A]/70 backdrop-blur-xl border border-indigo-500/30 shadow-glass">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Overall Clearance Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{resolutionRate}%</div>
          <p className="text-xs text-emerald-400 mt-2 font-medium">
            {resolved} tickets resolved out of {total}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0F172A]/70 backdrop-blur-xl border border-cyan-500/30 shadow-glass">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Average Turnaround</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">4.2 hrs</div>
          <p className="text-xs text-slate-400 mt-2">
            Target SLA is &lt; 6.0 hours
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0F172A]/70 backdrop-blur-xl border border-rose-500/30 shadow-glass">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Critical Severity Ratio</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-extrabold text-rose-300">
            {total > 0 ? Math.round((critical / total) * 100) : 0}%
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {critical} life-safety or fire tickets
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0F172A]/70 backdrop-blur-xl border border-amber-500/30 shadow-glass">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Active In-Progress</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{inProgress}</div>
          <p className="text-xs text-amber-400 mt-2 font-medium">
            Technicians currently deployed
          </p>
        </div>
      </div>

      {/* Visualizations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 p-6 shadow-glass">
          <h3 className="text-sm font-bold text-white mb-1">
            Weekly Activity & Clearance Velocity
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Total reported tickets versus tickets resolved each day
          </p>
          <TrendsChart complaints={complaints} />
        </div>

        <div className="rounded-2xl bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 p-6 shadow-glass">
          <h3 className="text-sm font-bold text-white mb-1">
            Category Breakdown
          </h3>
          <p className="text-xs text-slate-400 mb-2">
            Distribution across facilities units
          </p>
          <CategoryChart complaints={complaints} />
        </div>
      </div>

      {/* Department Workload Table */}
      <div className="rounded-2xl bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 shadow-glass overflow-hidden">
        <div className="p-5 border-b border-white/10">
          <h3 className="text-sm font-bold text-white">
            Departmental Workload & Completion Benchmarks
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time ticket load by assigned administrative department
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.02] border-b border-white/5 text-slate-400 uppercase font-semibold">
              <tr>
                <th className="py-3 px-5">Department Unit</th>
                <th className="py-3 px-5">Active Tickets</th>
                <th className="py-3 px-5">Resolved Tickets</th>
                <th className="py-3 px-5">Resolution %</th>
                <th className="py-3 px-5">Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {deptStats.map(d => (
                <tr key={d.name} className="hover:bg-white/[0.03]">
                  <td className="py-3.5 px-5 font-semibold text-slate-200 flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>{d.name}</span>
                  </td>
                  <td className="py-3.5 px-5 font-mono text-white">
                    {d.total - d.resolved}
                  </td>
                  <td className="py-3.5 px-5 font-mono text-emerald-400">
                    {d.resolved}
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${d.rate}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-slate-400">{d.rate}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Optimal
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
