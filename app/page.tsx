"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  PlusCircle,
  Search,
  Bot,
  Activity,
  ArrowRight,
  ShieldAlert,
  GraduationCap
} from "lucide-react";
import { Complaint } from "@/lib/types";
import { getComplaints } from "@/lib/storage";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { TrendsChart } from "@/components/dashboard/TrendsChart";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { RecentComplaintsTable } from "@/components/dashboard/RecentComplaintsTable";
import { CampusInsights } from "@/components/dashboard/CampusInsights";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassButton } from "@/components/ui/GlassButton";

export default function DashboardPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isClient, setIsClient] = useState(false);

  const loadData = () => {
    setComplaints(getComplaints());
  };

  useEffect(() => {
    setIsClient(true);
    loadData();
    window.addEventListener("campuscare_data_updated", loadData);
    window.addEventListener("storage", loadData);
    return () => {
      window.removeEventListener("campuscare_data_updated", loadData);
      window.removeEventListener("storage", loadData);
    };
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* 1. Welcome Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-r from-indigo-950/60 via-[#101A30]/80 to-[#0B132B]/80 border border-white/10 p-6 sm:p-8 backdrop-blur-2xl shadow-glass overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>CampusCare AI • Student & Campus Ops Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              A Smarter Campus. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">A Better Experience.</span>
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Report campus facilities issues, Wi-Fi deadzones, lab hazards, and classroom glitches.
              Our Gemini AI triage automatically classifies urgency and routes tickets directly to university responders.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/submit">
              <GlassButton
                variant="primary"
                size="md"
                leftIcon={<PlusCircle className="w-4 h-4" />}
              >
                Submit Complaint
              </GlassButton>
            </Link>
            <Link href="/track">
              <GlassButton
                variant="outline"
                size="md"
                leftIcon={<Search className="w-4 h-4" />}
              >
                Track Ticket
              </GlassButton>
            </Link>
          </div>
        </div>
      </div>

      {/* 2-6. Stats Cards Row */}
      <StatsCards complaints={complaints} />

      {/* 10. AI Campus Insights Section */}
      <CampusInsights complaints={complaints} />

      {/* 7-8. Visualizations Row: Trends & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Complaint Trends Area Chart */}
        <div className="lg:col-span-2 rounded-2xl bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 p-5 sm:p-6 shadow-glass">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                7-Day Complaint Inflow & Clearance
              </h3>
              <p className="text-xs text-slate-400">
                Comparing reported issues vs. successfully resolved tickets
              </p>
            </div>
            <span className="text-xs font-mono text-indigo-400 font-semibold px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
              Live Feed
            </span>
          </div>

          <TrendsChart complaints={complaints} />
        </div>

        {/* Category Distribution Pie Chart */}
        <div className="rounded-2xl bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 p-5 sm:p-6 shadow-glass">
          <div className="pb-2 border-b border-white/5">
            <h3 className="text-sm font-bold text-white tracking-wide">
              Category Distribution
            </h3>
            <p className="text-xs text-slate-400">
              Share of tickets across campus services
            </p>
          </div>

          <CategoryChart complaints={complaints} />
        </div>
      </div>

      {/* 9. Recent Complaints Table */}
      <RecentComplaintsTable complaints={complaints} />
    </div>
  );
}
