"use client";

import React from "react";
import {
  Inbox,
  Clock,
  PlayCircle,
  CheckCircle2,
  AlertOctagon,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { Complaint } from "@/lib/types";

interface StatsCardsProps {
  complaints: Complaint[];
}

export function StatsCards({ complaints }: StatsCardsProps) {
  const total = complaints.length;
  const pending = complaints.filter(
    c => c.status === "Submitted" || c.status === "Under Review"
  ).length;
  const inProgress = complaints.filter(c => c.status === "In Progress").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;
  const critical = complaints.filter(
    c => c.priority === "CRITICAL" && c.status !== "Resolved"
  ).length;

  const cards = [
    {
      title: "Total Complaints",
      value: total,
      subtext: "+12% this month",
      trend: "up",
      icon: Inbox,
      color: "indigo",
      gradient: "from-indigo-500/20 to-indigo-600/5",
      border: "border-indigo-500/30",
      textCol: "text-indigo-400"
    },
    {
      title: "Pending Review",
      value: pending,
      subtext: "Awaiting triage",
      trend: "neutral",
      icon: Clock,
      color: "amber",
      gradient: "from-amber-500/20 to-amber-600/5",
      border: "border-amber-500/30",
      textCol: "text-amber-400"
    },
    {
      title: "In Progress",
      value: inProgress,
      subtext: "Actively dispatched",
      trend: "up",
      icon: PlayCircle,
      color: "cyan",
      gradient: "from-cyan-500/20 to-cyan-600/5",
      border: "border-cyan-500/30",
      textCol: "text-cyan-400"
    },
    {
      title: "Resolved",
      value: resolved,
      subtext: `${total > 0 ? Math.round((resolved / total) * 100) : 0}% clearance rate`,
      trend: "up",
      icon: CheckCircle2,
      color: "emerald",
      gradient: "from-emerald-500/20 to-emerald-600/5",
      border: "border-emerald-500/30",
      textCol: "text-emerald-400"
    },
    {
      title: "Critical Priority",
      value: critical,
      subtext: "Emergency attention",
      trend: critical > 0 ? "warning" : "down",
      icon: AlertOctagon,
      color: "rose",
      gradient: "from-rose-500/20 to-rose-600/5",
      border: "border-rose-500/35",
      textCol: "text-rose-400",
      isPulse: critical > 0
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`relative p-5 rounded-2xl bg-[#0F172A]/70 backdrop-blur-xl border ${card.border} shadow-glass overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:bg-[#0F172A]/90`}
          >
            {/* Top row */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 tracking-wide">
                {card.title}
              </span>
              <div
                className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${card.gradient} flex items-center justify-center ${card.textCol} ${
                  card.isPulse ? "animate-pulse" : ""
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Value */}
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {card.value}
              </span>
            </div>

            {/* Subtext */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              {card.trend === "up" && (
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              )}
              {card.trend === "down" && (
                <TrendingDown className="w-3.5 h-3.5 text-cyan-400" />
              )}
              {card.trend === "warning" && (
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              )}
              <span>{card.subtext}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
