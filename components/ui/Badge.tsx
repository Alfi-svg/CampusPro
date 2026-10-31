import React from "react";
import { ComplaintPriority, ComplaintStatus } from "@/lib/types";

interface BadgeProps {
  children?: React.ReactNode;
  variant?: "priority" | "status" | "default" | "outline";
  priority?: ComplaintPriority;
  status?: ComplaintStatus;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Badge({
  children,
  variant = "default",
  priority,
  status,
  className = "",
  size = "md"
}: BadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs font-medium",
    md: "px-2.5 py-1 text-xs font-semibold",
    lg: "px-3 py-1.5 text-sm font-semibold"
  }[size];

  // If priority is specified
  if (priority || variant === "priority") {
    const p = priority || (children as ComplaintPriority) || "LOW";
    const colors: Record<ComplaintPriority, string> = {
      LOW: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25",
      MEDIUM: "bg-blue-500/10 text-blue-400 border border-blue-500/25",
      HIGH: "bg-amber-500/10 text-amber-400 border border-amber-500/25",
      CRITICAL: "bg-rose-500/15 text-rose-400 border border-rose-500/35 animate-pulse"
    };

    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full ${colors[p] || colors.LOW} ${sizeClasses} ${className}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${
          p === "CRITICAL" ? "bg-rose-400" : p === "HIGH" ? "bg-amber-400" : p === "MEDIUM" ? "bg-blue-400" : "bg-emerald-400"
        }`} />
        {children || p}
      </span>
    );
  }

  // If status is specified
  if (status || variant === "status") {
    const s = status || (children as ComplaintStatus) || "Submitted";
    const colors: Record<ComplaintStatus, string> = {
      Submitted: "bg-indigo-500/15 text-indigo-300 border border-indigo-500/25",
      "Under Review": "bg-amber-500/15 text-amber-300 border border-amber-500/25",
      "In Progress": "bg-cyan-500/15 text-cyan-300 border border-cyan-500/25",
      Resolved: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25",
      Rejected: "bg-slate-500/15 text-slate-400 border border-slate-500/25"
    };

    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full ${colors[s] || colors.Submitted} ${sizeClasses} ${className}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${
          s === "Resolved" ? "bg-emerald-400" : s === "In Progress" ? "bg-cyan-400" : s === "Under Review" ? "bg-amber-400" : s === "Rejected" ? "bg-slate-400" : "bg-indigo-400"
        }`} />
        {children || s}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center rounded-full bg-white/10 text-slate-200 border border-white/15 ${sizeClasses} ${className}`}>
      {children}
    </span>
  );
}
