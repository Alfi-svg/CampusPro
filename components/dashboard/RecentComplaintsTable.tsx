"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, Clock, MapPin, Sparkles, Building, ArrowUpRight, Search } from "lucide-react";
import { Complaint } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";

interface RecentComplaintsTableProps {
  complaints: Complaint[];
  title?: string;
  showAllLink?: boolean;
}

export function RecentComplaintsTable({
  complaints,
  title = "Recent Complaints",
  showAllLink = true
}: RecentComplaintsTableProps) {
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = complaints.filter(c => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      c.id.toLowerCase().includes(term) ||
      c.title.toLowerCase().includes(term) ||
      c.campusLocation.toLowerCase().includes(term) ||
      c.category.toLowerCase().includes(term)
    );
  });

  return (
    <>
      <div className="rounded-2xl bg-[#0F172A]/70 backdrop-blur-xl border border-white/10 shadow-glass overflow-hidden">
        {/* Table Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">{title}</h3>
            <p className="text-xs text-slate-400">
              Live status, department assignments, and AI severity triage
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search ticket..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-white/[0.04] border border-white/10 rounded-xl text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50"
              />
            </div>

            {showAllLink && (
              <Link
                href="/admin/complaints"
                className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors shrink-0"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.02] border-b border-white/5 text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Complaint & Location</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.slice(0, 7).map(c => (
                <tr
                  key={c.id}
                  className="hover:bg-white/[0.03] transition-colors group"
                >
                  {/* ID */}
                  <td className="py-3.5 px-4 font-mono font-bold text-indigo-300">
                    {c.id}
                  </td>

                  {/* Title & Location */}
                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="font-semibold text-slate-200 truncate group-hover:text-white transition-colors">
                      {c.title}
                    </p>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      <span>{c.campusLocation}</span>
                    </p>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                    {c.category}
                  </td>

                  {/* Priority */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <Badge priority={c.priority} size="sm" />
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <Badge status={c.status} size="sm" />
                  </td>

                  {/* Department */}
                  <td className="py-3.5 px-4 text-slate-400 max-w-[160px] truncate">
                    {c.assignedDepartment}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => setSelectedComplaint(c)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 border border-white/10 hover:border-indigo-500/30 transition-all font-medium"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No matching complaints found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Complaint Inspection Modal */}
      {selectedComplaint && (
        <Modal
          isOpen={!!selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          title={`Ticket ${selectedComplaint.id}`}
          description={`Reported by ${selectedComplaint.studentName} (${selectedComplaint.studentId})`}
          maxWidth="xl"
        >
          <div className="space-y-4">
            {/* Status and Priority pills */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Status:</span>
                <Badge status={selectedComplaint.status} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Severity:</span>
                <Badge priority={selectedComplaint.priority} />
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs uppercase font-semibold text-slate-400 tracking-wider mb-1">
                Complaint Title
              </h4>
              <p className="text-sm font-bold text-white">{selectedComplaint.title}</p>
              <h4 className="text-xs uppercase font-semibold text-slate-400 tracking-wider mt-3 mb-1">
                Detailed Description
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
                {selectedComplaint.description}
              </p>
            </div>

            {/* Location & Department */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-slate-400 block mb-1">Campus Location:</span>
                <span className="font-semibold text-white">{selectedComplaint.campusLocation}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-slate-400 block mb-1">Assigned Department:</span>
                <span className="font-semibold text-indigo-300">
                  {selectedComplaint.assignedDepartment}
                </span>
              </div>
            </div>

            {/* AI Analysis Card */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/50 to-slate-900/80 border border-indigo-500/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>Gemini AI Triage Assessment</span>
                </div>
                {selectedComplaint.aiAnalysis?.isDemo && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    DEMO ANALYSIS
                  </span>
                )}
              </div>

              <div className="text-xs space-y-1.5">
                <div>
                  <span className="text-slate-400">Summary: </span>
                  <span className="text-slate-200 font-medium">
                    {selectedComplaint.aiAnalysis?.summary}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Urgency Rationale: </span>
                  <span className="text-slate-200">
                    {selectedComplaint.aiAnalysis?.urgency_reason}
                  </span>
                </div>
                <div className="pt-1 border-t border-white/10">
                  <span className="text-cyan-400 font-semibold">Recommended Action: </span>
                  <span className="text-slate-200">
                    {selectedComplaint.aiAnalysis?.recommended_action}
                  </span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h4 className="text-xs uppercase font-semibold text-slate-400 tracking-wider mb-2">
                Resolution Timeline
              </h4>
              <div className="space-y-2 border-l border-white/10 pl-3 ml-2">
                {selectedComplaint.timeline.map((entry, idx) => (
                  <div key={idx} className="relative text-xs">
                    <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-500 border border-[#101A30]" />
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{entry.status}</span>
                      <span className="text-[10px] text-slate-500">
                        {new Date(entry.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{entry.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedComplaint(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/15 text-white transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
