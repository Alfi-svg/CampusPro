"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  PlusCircle,
  Search,
  MapPin,
  Clock,
  Eye,
  Building
} from "lucide-react";
import { Complaint } from "@/lib/types";
import { getComplaints } from "@/lib/storage";
import { Badge } from "@/components/ui/Badge";
import { GlassButton } from "@/components/ui/GlassButton";
import { Modal } from "@/components/ui/Modal";

export default function MyComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            My Submitted Complaints
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Review status updates and resolution timelines for all tickets registered under your account.
          </p>
        </div>

        <Link href="/submit">
          <GlassButton
            variant="primary"
            size="md"
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            Lodge New Complaint
          </GlassButton>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search by ticket ID, location, or issue..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60"
        />
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(c => (
          <div
            key={c.id}
            onClick={() => setSelectedComplaint(c)}
            className="rounded-2xl bg-[#0F172A]/80 backdrop-blur-xl border border-white/10 p-5 shadow-glass space-y-3 cursor-pointer hover:border-indigo-500/30 hover:bg-[#0F172A]/95 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-sm text-indigo-400">
                {c.id}
              </span>
              <div className="flex items-center gap-2">
                <Badge priority={c.priority} size="sm" />
                <Badge status={c.status} size="sm" />
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors line-clamp-1">
                {c.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                {c.description}
              </p>
            </div>

            <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
              <span className="flex items-center gap-1 truncate max-w-[200px]">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="truncate">{c.campusLocation}</span>
              </span>
              <span className="flex items-center gap-1 text-[11px] text-slate-500">
                <Clock className="w-3 h-3" />
                {new Date(c.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
            <FileText className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-300">No complaints found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven&apos;t filed any complaints matching this search filter.
            </p>
          </div>
        )}
      </div>

      {/* Complaint Inspection Modal */}
      {selectedComplaint && (
        <Modal
          isOpen={!!selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          title={`Ticket Details: ${selectedComplaint.id}`}
          description={`Reported on ${new Date(selectedComplaint.createdAt).toLocaleDateString()}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Current Status:</span>
                <Badge status={selectedComplaint.status} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Assigned Severity:</span>
                <Badge priority={selectedComplaint.priority} />
              </div>
            </div>

            <div>
              <span className="text-slate-400 font-semibold block mb-1">Issue Title</span>
              <p className="text-sm font-bold text-white">{selectedComplaint.title}</p>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
              <span className="text-slate-400 font-semibold block">Description</span>
              <p className="text-slate-200 leading-relaxed">{selectedComplaint.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-slate-400 block mb-1">Location:</span>
                <span className="font-semibold text-white">{selectedComplaint.campusLocation}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-slate-400 block mb-1">Department:</span>
                <span className="font-semibold text-indigo-300">{selectedComplaint.assignedDepartment}</span>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                Resolution Steps
              </span>
              <div className="space-y-2 border-l border-white/10 pl-3 ml-1">
                {selectedComplaint.timeline.map((item, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-indigo-400" />
                    <p className="font-semibold text-white">{item.status}</p>
                    <p className="text-[11px] text-slate-400">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Link href={`/track?id=${selectedComplaint.id}`}>
                <GlassButton variant="primary" size="sm">
                  Open Full Tracker
                </GlassButton>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
