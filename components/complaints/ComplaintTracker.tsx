"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  Building,
  Sparkles,
  Calendar,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from "lucide-react";
import { Complaint, ComplaintStatus } from "@/lib/types";
import { getComplaintById, getComplaints } from "@/lib/storage";
import { Badge } from "@/components/ui/Badge";
import { GlassButton } from "@/components/ui/GlassButton";
import { AIAnalysisCard } from "./AIAnalysisCard";

export function ComplaintTracker() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "";

  const [searchId, setSearchId] = useState(initialId);
  const [activeComplaint, setActiveComplaint] = useState<Complaint | null>(null);
  const [searched, setSearched] = useState(false);
  const [recentComplaints, setRecentComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    const all = getComplaints();
    setRecentComplaints(all.slice(0, 5));

    if (initialId) {
      const match = getComplaintById(initialId);
      if (match) {
        setActiveComplaint(match);
        setSearched(true);
      }
    }
  }, [initialId]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchId.trim()) return;

    setSearched(true);
    const found = getComplaintById(searchId.trim());
    setActiveComplaint(found || null);
  };

  const statusSteps: ComplaintStatus[] = [
    "Submitted",
    "Under Review",
    "In Progress",
    "Resolved"
  ];

  const getStepState = (step: ComplaintStatus, currentStatus: ComplaintStatus) => {
    if (currentStatus === "Rejected") {
      return step === "Submitted" ? "completed" : "rejected";
    }
    const order = ["Submitted", "Under Review", "In Progress", "Resolved"];
    const currentIndex = order.indexOf(currentStatus);
    const stepIndex = order.indexOf(step);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Search Bar Card */}
      <div className="rounded-2xl bg-[#0F172A]/80 backdrop-blur-2xl border border-white/10 p-6 shadow-glass space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            Track Your Complaint
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Live Timeline
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Enter your unique Complaint ID (e.g. CC-9012, CC-8841) to view real-time department routing, AI assessment, and technician progress.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchId}
              onChange={e => setSearchId(e.target.value)}
              placeholder="Enter Complaint ID (e.g. CC-9012)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60 font-mono uppercase"
            />
          </div>
          <GlassButton
            type="submit"
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Track
          </GlassButton>
        </form>

        {/* Quick chip suggestions */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-500">Quick track demo tickets:</span>
          {recentComplaints.slice(0, 4).map(c => (
            <button
              key={c.id}
              onClick={() => {
                setSearchId(c.id);
                setActiveComplaint(c);
                setSearched(true);
              }}
              className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-indigo-300 font-mono font-medium transition-colors"
            >
              {c.id}
            </button>
          ))}
        </div>
      </div>

      {/* Result Section */}
      {searched && !activeComplaint && (
        <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 mx-auto flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No Ticket Found for &quot;{searchId}&quot;</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Please verify the ticket ID. Complaint IDs are formatted as CC-XXXX (for example, CC-9012).
          </p>
        </div>
      )}

      {activeComplaint && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Main Status & Stepper Card */}
          <div className="rounded-2xl bg-[#0F172A]/85 backdrop-blur-2xl border border-white/10 p-6 shadow-glass space-y-6">
            {/* Top row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xl font-extrabold text-indigo-400">
                    {activeComplaint.id}
                  </span>
                  <Badge status={activeComplaint.status} size="md" />
                  <Badge priority={activeComplaint.priority} size="md" />
                </div>
                <h3 className="text-base font-bold text-white mt-1">
                  {activeComplaint.title}
                </h3>
              </div>

              <div className="text-right text-xs text-slate-400">
                <p>Reported on: {new Date(activeComplaint.createdAt).toLocaleDateString()}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Last updated: {new Date(activeComplaint.updatedAt).toLocaleTimeString()}
                </p>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="py-2">
              <div className="grid grid-cols-4 gap-2 relative">
                {statusSteps.map((step, idx) => {
                  const state = getStepState(step, activeComplaint.status);

                  return (
                    <div key={step} className="flex flex-col items-center text-center space-y-2">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          state === "completed"
                            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                            : state === "current"
                            ? "bg-indigo-600 text-white ring-4 ring-indigo-500/30 animate-pulse"
                            : "bg-white/10 text-slate-500 border border-white/10"
                        }`}
                      >
                        {state === "completed" ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <div>
                        <p
                          className={`text-xs font-semibold ${
                            state === "current"
                              ? "text-indigo-400"
                              : state === "completed"
                              ? "text-emerald-400"
                              : "text-slate-500"
                          }`}
                        >
                          {step}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-slate-400 block mb-1">Campus Location</span>
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  {activeComplaint.campusLocation}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-slate-400 block mb-1">Assigned Department</span>
                <span className="font-semibold text-indigo-300 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  {activeComplaint.assignedDepartment}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-slate-400 block mb-1">Category</span>
                <span className="font-semibold text-white">
                  {activeComplaint.category}
                </span>
              </div>
            </div>

            {/* Complaint Description */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5 text-xs">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Detailed Issue Description
              </span>
              <p className="text-slate-200 leading-relaxed">
                {activeComplaint.description}
              </p>
            </div>
          </div>

          {/* AI Analysis Assessment Card */}
          <AIAnalysisCard
            analysis={activeComplaint.aiAnalysis}
            complaintId={activeComplaint.id}
          />

          {/* Timeline History */}
          <div className="rounded-2xl bg-[#0F172A]/80 backdrop-blur-2xl border border-white/10 p-6 shadow-glass space-y-4">
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>Full Audit Timeline</span>
            </h4>

            <div className="space-y-4 border-l-2 border-indigo-500/30 pl-4 ml-2">
              {activeComplaint.timeline.map((item, idx) => (
                <div key={idx} className="relative text-xs space-y-1">
                  <span className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-[#080D1A]" />
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{item.status}</span>
                    <span className="text-[11px] text-slate-500">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
