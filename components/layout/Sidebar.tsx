"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Search,
  Bot,
  ShieldCheck,
  ClipboardList,
  BarChart3,
  Building2,
  Sparkles,
  ArrowRightLeft,
  GraduationCap
} from "lucide-react";
import { useRole } from "./RoleContext";

interface SidebarProps {
  onCloseMobile?: () => void;
}

export function Sidebar({ onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { role, setRole, toggleRole } = useRole();

  const studentLinks = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Submit Complaint", href: "/submit", icon: PlusCircle },
    { label: "My Complaints", href: "/my-complaints", icon: FileText },
    { label: "Track Complaint", href: "/track", icon: Search },
    { label: "Campus Assistant", href: "/assistant", icon: Bot }
  ];

  const adminLinks = [
    { label: "Admin Overview", href: "/admin", icon: ShieldCheck },
    { label: "All Complaints", href: "/admin/complaints", icon: ClipboardList },
    { label: "Complaint Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Department Management", href: "/admin/departments", icon: Building2 }
  ];

  const currentLinks = role === "student" ? studentLinks : adminLinks;

  return (
    <aside className="w-64 h-full flex flex-col justify-between bg-[#0B1224]/80 backdrop-blur-2xl border-r border-white/10 p-4 select-none">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="px-2 py-1">
          <Link
            href="/"
            onClick={onCloseMobile}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/25">
              <div className="w-full h-full bg-[#080D1A] rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-white">CampusCare</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">A Smarter Campus.</p>
            </div>
          </Link>
        </div>

        {/* Role Switcher Pill */}
        <div className="p-1 rounded-xl bg-white/[0.04] border border-white/10">
          <div className="grid grid-cols-2 gap-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all duration-200 ${
                role === "student"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all duration-200 ${
                role === "admin"
                  ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin
            </button>
          </div>
        </div>

        {/* Navigation Section */}
        <div>
          <div className="px-2 pb-2 text-[11px] font-semibold tracking-wider uppercase text-slate-500">
            {role === "student" ? "Student Portal" : "Admin Management"}
          </div>

          <nav className="space-y-1">
            {currentLinks.map(link => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onCloseMobile}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500/20 to-cyan-500/10 text-white border border-indigo-500/30 shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-indigo-400" : "text-slate-400"
                    }`}
                  />
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#6366F1]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer / Active Role Indicator */}
      <div className="pt-4 border-t border-white/10 space-y-3">
        <div className="px-2 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                role === "student" ? "bg-indigo-400" : "bg-cyan-400"
              } animate-ping`}
            />
            <div>
              <p className="text-xs font-semibold text-slate-200 capitalize">
                {role} Mode
              </p>
              <p className="text-[10px] text-slate-500">Active View</p>
            </div>
          </div>
          <button
            onClick={toggleRole}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Switch View"
            aria-label="Switch active role"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-[10px] text-center text-slate-500">
          CampusCare AI • v1.0.0
        </p>
      </div>
    </aside>
  );
}
