"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  Bell,
  Sparkles,
  Plus,
  Shield,
  GraduationCap,
  Activity,
  CheckCircle2
} from "lucide-react";
import { useRole } from "./RoleContext";
import { getComplaints } from "@/lib/storage";

interface TopNavbarProps {
  onOpenMobileMenu?: () => void;
}

export function TopNavbar({ onOpenMobileMenu }: TopNavbarProps) {
  const { role, setRole } = useRole();
  const [criticalCount, setCriticalCount] = useState<number>(0);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      const all = getComplaints();
      const critical = all.filter(c => c.priority === "CRITICAL" && c.status !== "Resolved").length;
      setCriticalCount(critical);
    };

    updateCount();
    window.addEventListener("campuscare_data_updated", updateCount);
    window.addEventListener("storage", updateCount);
    return () => {
      window.removeEventListener("campuscare_data_updated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 w-full bg-[#080D1A]/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Toggle & Brand/Tagline */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <h1 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            CampusCare AI
            <span className="text-slate-500 font-normal">|</span>
            <span className="text-xs text-slate-400 font-normal">
              A Smarter Campus. A Better Experience.
            </span>
          </h1>
        </div>

        {/* Live System Indicator */}
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>AI Triage Active</span>
        </div>
      </div>

      {/* Right: Quick actions, notifications, role switcher */}
      <div className="flex items-center gap-3">
        {/* Role Switcher Pill */}
        <div className="flex items-center bg-white/[0.04] p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setRole("student")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              role === "student"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Student</span>
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              role === "admin"
                ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </button>
        </div>

        {/* New Complaint CTA button */}
        <Link
          href="/submit"
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 border border-indigo-400/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Complaint</span>
        </Link>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors border border-white/5"
            aria-label="View alerts and notifications"
          >
            <Bell className="w-4 h-4" />
            {criticalCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {criticalCount}
              </span>
            )}
          </button>

          {/* Notification dropdown */}
          {showNotifications && (
            <div
              className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-[#101A30]/95 backdrop-blur-2xl border border-white/15 shadow-2xl p-4 z-50 text-slate-200 animate-in fade-in zoom-in-95 duration-150"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Campus Alerts
                </span>
                <span className="text-xs text-indigo-400 font-medium">Live Feed</span>
              </div>

              <div className="space-y-2.5">
                {criticalCount > 0 ? (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400 mt-1 shrink-0 animate-ping" />
                    <div>
                      <p className="text-xs font-semibold text-rose-300">
                        {criticalCount} Critical Ticket{criticalCount > 1 ? "s" : ""} Pending
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Lab electrical spark or urgent safety hazards requiring review.
                      </p>
                      <Link
                        href="/admin/complaints"
                        onClick={() => setShowNotifications(false)}
                        className="text-[11px] text-rose-400 font-semibold hover:underline mt-1 inline-block"
                      >
                        Inspect in Admin View →
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-2 text-xs text-emerald-300">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>All critical tickets addressed.</span>
                  </div>
                )}

                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-slate-300">
                  <p className="font-semibold text-white">Gemini AI Model Triage</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Real-time severity classification and department routing active.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowNotifications(false)}
                className="mt-3 w-full py-1.5 text-xs text-center text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                Close Alerts
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
