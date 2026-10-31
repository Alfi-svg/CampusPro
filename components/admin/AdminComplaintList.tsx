"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  Trash2,
  Edit,
  Eye,
  Shield,
  MapPin,
  RefreshCw,
  Building,
  User,
  AlertTriangle,
  RotateCcw
} from "lucide-react";
import {
  Complaint,
  ComplaintCategory,
  ComplaintPriority,
  ComplaintStatus
} from "@/lib/types";
import {
  getComplaints,
  updateComplaintStatus,
  assignComplaintDepartment,
  deleteComplaint,
  resetToDemoData,
  DEPARTMENTS_LIST
} from "@/lib/storage";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { GlassButton } from "@/components/ui/GlassButton";
import { useToast } from "@/components/ui/Toast";

export function AdminComplaintList() {
  const { showToast } = useToast();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [priorityFilter, setPriorityFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // Inspection / Update Modal state
  const [activeComplaint, setActiveComplaint] = useState<Complaint | null>(null);
  const [newStatus, setNewStatus] = useState<ComplaintStatus>("In Progress");
  const [statusNote, setStatusNote] = useState("");
  const [newDepartment, setNewDepartment] = useState("");

  const refreshData = () => {
    setComplaints(getComplaints());
  };

  useEffect(() => {
    refreshData();
    window.addEventListener("campuscare_data_updated", refreshData);
    window.addEventListener("storage", refreshData);
    return () => {
      window.removeEventListener("campuscare_data_updated", refreshData);
      window.removeEventListener("storage", refreshData);
    };
  }, []);

  const handleOpenModal = (c: Complaint) => {
    setActiveComplaint(c);
    setNewStatus(c.status);
    setNewDepartment(c.assignedDepartment);
    setStatusNote("");
  };

  const handleUpdateStatusAndDept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeComplaint) return;

    if (newStatus !== activeComplaint.status) {
      updateComplaintStatus(activeComplaint.id, newStatus, statusNote.trim() || undefined);
    }

    if (newDepartment && newDepartment !== activeComplaint.assignedDepartment) {
      assignComplaintDepartment(activeComplaint.id, newDepartment);
    }

    showToast({
      type: "success",
      title: "Complaint Updated",
      message: `Ticket ${activeComplaint.id} status updated to ${newStatus}.`
    });

    setActiveComplaint(null);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete complaint ${id}?`)) {
      deleteComplaint(id);
      showToast({
        type: "info",
        title: "Complaint Removed",
        message: `Ticket ${id} deleted.`
      });
    }
  };

  const handleResetData = () => {
    if (confirm("Reset all complaints back to the 8 realistic demo items?")) {
      resetToDemoData();
      showToast({
        type: "info",
        title: "Demo Data Restored",
        message: "Loaded standard realistic demo records."
      });
    }
  };

  // Filter complaints
  const filtered = complaints.filter(c => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.campusLocation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "ALL" || c.category === categoryFilter;
    const matchesPriority = priorityFilter === "ALL" || c.priority === priorityFilter;
    const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;

    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div className="rounded-2xl bg-[#0F172A]/80 backdrop-blur-2xl border border-white/10 p-5 shadow-glass space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by ID, title, student, or location..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60"
            />
          </div>

          {/* Action to reset demo data */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetData}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 text-xs transition-colors"
              title="Reset to 8 default realistic demo records"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#101A30] border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/60"
            >
              <option value="ALL">All Categories</option>
              <option value="Classroom & Projector">Classroom & Projector</option>
              <option value="Campus Wi-Fi">Campus Wi-Fi</option>
              <option value="Washroom & Cleanliness">Washroom & Cleanliness</option>
              <option value="Fan & AC">Fan & AC</option>
              <option value="Electricity">Electricity</option>
              <option value="Transportation">Transportation</option>
              <option value="Campus Security">Campus Security</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Priority
            </label>
            <select
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#101A30] border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/60"
            >
              <option value="ALL">All Priorities</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#101A30] border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/60"
            >
              <option value="ALL">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="rounded-2xl bg-[#0F172A]/80 backdrop-blur-2xl border border-white/10 shadow-glass overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>
            Showing <strong className="text-white">{filtered.length}</strong> of{" "}
            {complaints.length} records
          </span>
          <span className="text-[11px] text-slate-500">Click any row to manage status & department</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.02] border-b border-white/5 text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Ticket</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Complaint & Location</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Assigned Dept</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(c => (
                <tr
                  key={c.id}
                  onClick={() => handleOpenModal(c)}
                  className="hover:bg-white/[0.04] transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-indigo-400">
                    {c.id}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <p className="font-semibold text-slate-200">{c.studentName}</p>
                    <p className="text-[11px] text-slate-500">{c.studentId}</p>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="font-semibold text-white truncate">{c.title}</p>
                    <p className="text-[11px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      <span>{c.campusLocation}</span>
                    </p>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                    {c.category}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <Badge priority={c.priority} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <Badge status={c.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 max-w-[140px] truncate">
                    {c.assignedDepartment}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => handleOpenModal(c)}
                        className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 transition-colors"
                        title="Manage Ticket"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={e => handleDelete(c.id, e)}
                        className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-rose-600/20 text-slate-300 hover:text-rose-400 transition-colors"
                        title="Delete Ticket"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    No complaints match your search and filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Complaint Management Modal */}
      {activeComplaint && (
        <Modal
          isOpen={!!activeComplaint}
          onClose={() => setActiveComplaint(null)}
          title={`Manage Ticket: ${activeComplaint.id}`}
          description={`Filed by ${activeComplaint.studentName} • ${activeComplaint.department}`}
          maxWidth="2xl"
        >
          <form onSubmit={handleUpdateStatusAndDept} className="space-y-4 text-xs">
            {/* Title & Description */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
                Complaint Title
              </span>
              <p className="text-sm font-bold text-white">{activeComplaint.title}</p>
              <p className="text-slate-300 text-xs leading-relaxed mt-2 pt-2 border-t border-white/5">
                {activeComplaint.description}
              </p>
            </div>

            {/* AI Review Snippet */}
            <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  Gemini AI Recommendation
                </span>
                <Badge priority={activeComplaint.priority} size="sm" />
              </div>
              <p className="text-slate-200 leading-relaxed font-medium">
                {activeComplaint.aiAnalysis?.recommended_action}
              </p>
              <p className="text-[11px] text-slate-400">
                Rationale: {activeComplaint.aiAnalysis?.urgency_reason}
              </p>
            </div>

            {/* Department Assignment */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Assign Responsible Department
              </label>
              <select
                value={newDepartment}
                onChange={e => setNewDepartment(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#101A30] border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                {DEPARTMENTS_LIST.map(dept => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Update Status
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(["Submitted", "Under Review", "In Progress", "Resolved", "Rejected"] as ComplaintStatus[]).map(st => {
                  const isCurrent = newStatus === st;
                  return (
                    <button
                      type="button"
                      key={st}
                      onClick={() => setNewStatus(st)}
                      className={`py-2 px-2.5 rounded-xl border text-center font-semibold transition-all ${
                        isCurrent
                          ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30"
                          : "bg-white/[0.04] border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      {st}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Status Update Note */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Administrative Resolution Note (Visible to Student)
              </label>
              <input
                type="text"
                value={statusNote}
                onChange={e => setStatusNote(e.target.value)}
                placeholder="e.g. Technician dispatched with replacement part; room cleared."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60"
              />
            </div>

            {/* Form actions */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={e => {
                  handleDelete(activeComplaint.id, e);
                  setActiveComplaint(null);
                }}
                className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1 font-semibold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Ticket</span>
              </button>

              <div className="flex gap-2">
                <GlassButton
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveComplaint(null)}
                >
                  Cancel
                </GlassButton>
                <GlassButton
                  type="submit"
                  variant="primary"
                  size="sm"
                >
                  Save Admin Changes
                </GlassButton>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
