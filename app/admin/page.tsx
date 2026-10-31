"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ClipboardList,
  BarChart3,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react";
import { Complaint } from "@/lib/types";
import { getComplaints } from "@/lib/storage";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { TrendsChart } from "@/components/dashboard/TrendsChart";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { AdminComplaintList } from "@/components/admin/AdminComplaintList";
import { GlassButton } from "@/components/ui/GlassButton";

export default function AdminOverviewPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  const loadData = () => {
    setComplaints(getComplaints());
  };

  useEffect(() => {
    loadData();
    window.addEventListener("campuscare_data_updated", loadData);
    window.addEventListener("storage", loadData);
    return () => {
      window.removeEventListener("campuscare_data_updated", loadData);
      window.removeEventListener("storage", loadData);
    };
  }, []);

  const critical = complaints.filter(c => c.priority === "CRITICAL" && c.status !== "Resolved");

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-cyan-950/50 via-[#0B152A]/80 to-[#080D1A] border border-cyan-500/25 p-6 sm:p-8 backdrop-blur-2xl shadow-glass overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Campus Facilities & Incident Operations Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Administrative Control Center
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Real-time monitoring of campus tickets, Gemini automated triage recommendations, and cross-department service level agreements (SLAs).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/admin/complaints">
              <GlassButton
                variant="secondary"
                size="md"
                leftIcon={<ClipboardList className="w-4 h-4" />}
              >
                Manage All Tickets
              </GlassButton>
            </Link>
            <Link href="/admin/analytics">
              <GlassButton
                variant="outline"
                size="md"
                leftIcon={<BarChart3 className="w-4 h-4" />}
              >
                Analytics & SLA
              </GlassButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards complaints={complaints} />

      {/* Critical Alert Notice if any */}
      {critical.length > 0 && (
        <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/35 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-rose-400 shrink-0 animate-ping" />
            <div>
              <p className="font-bold text-rose-200 text-sm">
                Action Required: {critical.length} Critical Priority Complaint{critical.length > 1 ? "s" : ""}
              </p>
              <p className="text-rose-300/80 mt-0.5">
                Immediate electrical fire risks or campus security vulnerabilities require safety isolation.
              </p>
            </div>
          </div>

          <Link href="/admin/complaints">
            <GlassButton variant="danger" size="sm">
              Review Immediate Hazards
            </GlassButton>
          </Link>
        </div>
      )}

      {/* Visualizations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 p-5 sm:p-6 shadow-glass">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <div>
              <h3 className="text-sm font-bold text-white">Daily Complaint Throughput</h3>
              <p className="text-xs text-slate-400">Incoming student complaints vs. team completions</p>
            </div>
          </div>
          <TrendsChart complaints={complaints} />
        </div>

        <div className="rounded-2xl bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 p-5 sm:p-6 shadow-glass">
          <div className="pb-2 border-b border-white/5">
            <h3 className="text-sm font-bold text-white">Issue Breakdown by Category</h3>
            <p className="text-xs text-slate-400">Proportional load across service sectors</p>
          </div>
          <CategoryChart complaints={complaints} />
        </div>
      </div>

      {/* Admin Complaint Management Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Quick Ticket Management</h2>
          <Link
            href="/admin/complaints"
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
          >
            <span>Open Dedicated Ticket Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <AdminComplaintList />
      </div>
    </div>
  );
}
