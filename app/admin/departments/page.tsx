"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  Mail,
  Phone,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Shield
} from "lucide-react";
import { Complaint } from "@/lib/types";
import { getComplaints, DEPARTMENTS_LIST } from "@/lib/storage";
import { GlassButton } from "@/components/ui/GlassButton";

interface DepartmentDetail {
  name: string;
  head: string;
  email: string;
  phone: string;
  location: string;
  targetSla: string;
}

const DEPT_DETAILS: Record<string, DepartmentDetail> = {
  "Electrical & Facilities Division": {
    name: "Electrical & Facilities Division",
    head: "Engr. Mahmudul Hasan",
    email: "facilities.electrical@university.edu",
    phone: "+880-2-998877 Ext. 401",
    location: "Facilities Annex, Room 104",
    targetSla: "2 Hours (Critical)"
  },
  "IT Network & Infrastructure": {
    name: "IT Network & Infrastructure",
    head: "Dr. Farzana Kabir",
    email: "network.ops@university.edu",
    phone: "+880-2-998877 Ext. 205",
    location: "Central Library, Ground Floor Server Room",
    targetSla: "4 Hours"
  },
  "Audio-Visual & Multimedia Services": {
    name: "Audio-Visual & Multimedia Services",
    head: "Imran Chowdhury",
    email: "av.services@university.edu",
    phone: "+880-2-998877 Ext. 312",
    location: "Auditorium Control Booth",
    targetSla: "3 Hours"
  },
  "Sanitation & Housekeeping": {
    name: "Sanitation & Housekeeping",
    head: "Nasreen Sultana",
    email: "housekeeping@university.edu",
    phone: "+880-2-998877 Ext. 110",
    location: "Student Center, Basement Wing",
    targetSla: "1 Hour"
  },
  "HVAC Maintenance Unit": {
    name: "HVAC Maintenance Unit",
    head: "Engr. Tanvir Ahmed",
    email: "hvac.maintenance@university.edu",
    phone: "+880-2-998877 Ext. 415",
    location: "Engineering Workshop B",
    targetSla: "6 Hours"
  },
  "Campus Safety & Security": {
    name: "Campus Safety & Security",
    head: "Major (Retd.) Rafiqul Islam",
    email: "security.control@university.edu",
    phone: "+880-1700-000999 (24/7 Helpline)",
    location: "Main Gate Security HQ",
    targetSla: "Immediate (15 Mins)"
  },
  "Transport & Logistics Wing": {
    name: "Transport & Logistics Wing",
    head: "Kazi Moniruzzaman",
    email: "transport@university.edu",
    phone: "+880-2-998877 Ext. 502",
    location: "Transport Depot Terminal",
    targetSla: "12 Hours"
  },
  "Student Affairs & Administration": {
    name: "Student Affairs & Administration",
    head: "Prof. Dr. Shamim Ara",
    email: "student.affairs@university.edu",
    phone: "+880-2-998877 Ext. 101",
    location: "Admin Building, 2nd Floor",
    targetSla: "24 Hours"
  }
};

export default function DepartmentsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    setComplaints(getComplaints());
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Campus Department Directory & SLAs
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Department roster, active incident allocations, and service-level commitments.
          </p>
        </div>

        <Link href="/admin/complaints">
          <GlassButton variant="outline" size="md">
            View All Department Tickets
          </GlassButton>
        </Link>
      </div>

      {/* Grid of Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DEPARTMENTS_LIST.map(deptName => {
          const detail = DEPT_DETAILS[deptName] || {
            name: deptName,
            head: "Department Supervisor",
            email: "support@university.edu",
            phone: "+880-2-998877",
            location: "Main Admin Block",
            targetSla: "24 Hours"
          };

          const deptComplaints = complaints.filter(c => c.assignedDepartment === deptName);
          const activeTickets = deptComplaints.filter(c => c.status !== "Resolved").length;
          const criticalTickets = deptComplaints.filter(
            c => c.priority === "CRITICAL" && c.status !== "Resolved"
          ).length;

          return (
            <div
              key={deptName}
              className="rounded-2xl bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 sm:p-6 shadow-glass space-y-4 hover:border-indigo-500/30 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400 shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      {detail.name}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <User className="w-3 h-3 text-slate-500" />
                      <span>{detail.head}</span>
                    </p>
                  </div>
                </div>

                {criticalTickets > 0 && (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse shrink-0">
                    {criticalTickets} Hazard
                  </span>
                )}
              </div>

              {/* Stats pill */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-slate-500 text-[11px] block">Active Workload</span>
                  <span className="font-bold text-white text-sm">
                    {activeTickets} Ticket{activeTickets === 1 ? "" : "s"}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-slate-500 text-[11px] block">Target SLA</span>
                  <span className="font-bold text-cyan-400 text-sm">{detail.targetSla}</span>
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate">{detail.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="font-mono">{detail.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>Office: {detail.location}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
