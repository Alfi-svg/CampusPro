"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Send,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  Wifi,
  Monitor,
  Droplets,
  Wind,
  Zap,
  Bus,
  Shield
} from "lucide-react";
import {
  Complaint,
  ComplaintCategory,
  AIAnalysisResult
} from "@/lib/types";
import { saveComplaint, generateComplaintId } from "@/lib/storage";
import { useToast } from "@/components/ui/Toast";
import { AIAnalysisCard } from "./AIAnalysisCard";
import { GlassButton } from "@/components/ui/GlassButton";

const CATEGORIES: { label: ComplaintCategory; icon: React.ElementType }[] = [
  { label: "Classroom & Projector", icon: Monitor },
  { label: "Campus Wi-Fi", icon: Wifi },
  { label: "Washroom & Cleanliness", icon: Droplets },
  { label: "Fan & AC", icon: Wind },
  { label: "Electricity", icon: Zap },
  { label: "Transportation", icon: Bus },
  { label: "Campus Security", icon: Shield }
];

export function ComplaintForm() {
  const router = useRouter();
  const { showToast } = useToast();

  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("Computer Science & Engineering");
  const [campusLocation, setCampusLocation] = useState("");
  const [category, setCategory] = useState<ComplaintCategory>("Campus Wi-Fi");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [completedComplaint, setCompletedComplaint] = useState<Complaint | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validation
    if (!studentName.trim()) {
      setValidationError("Please enter your Student Name.");
      return;
    }
    if (!studentId.trim()) {
      setValidationError("Please enter your Student ID.");
      return;
    }
    if (!campusLocation.trim()) {
      setValidationError("Please specify the exact Campus Location (e.g., Building 2, Room 301).");
      return;
    }
    if (!title.trim() || title.trim().length < 5) {
      setValidationError("Complaint title must be at least 5 characters long.");
      return;
    }
    if (!description.trim() || description.trim().length < 15) {
      setValidationError("Detailed description must provide at least 15 characters describing the issue.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Call the Next.js server-side API route for Gemini AI analysis
      const res = await fetch("/api/analyze-complaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName,
          studentId,
          department,
          campusLocation,
          category,
          title,
          description
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const analysis: AIAnalysisResult = data.analysis;

      // 2. Generate unique Complaint ID
      const newId = generateComplaintId();
      const now = new Date().toISOString();

      // 3. Construct complaint entity
      const newComplaint: Complaint = {
        id: newId,
        studentName: studentName.trim(),
        studentId: studentId.trim(),
        department: department.trim(),
        campusLocation: campusLocation.trim(),
        category: analysis.category || category,
        title: title.trim(),
        description: description.trim(),
        priority: analysis.priority || "MEDIUM",
        status: "Submitted",
        createdAt: now,
        updatedAt: now,
        assignedDepartment: analysis.assigned_department || "Facilities Management",
        aiAnalysis: analysis,
        timeline: [
          {
            status: "Submitted",
            timestamp: now,
            note: "Complaint submitted and processed by Gemini AI triage engine."
          }
        ]
      };

      // 4. Save to LocalStorage
      saveComplaint(newComplaint);
      setCompletedComplaint(newComplaint);

      showToast({
        type: "success",
        title: "Complaint Lodged Successfully",
        message: `Assigned ID ${newId} with priority ${newComplaint.priority}.`
      });
    } catch (err: unknown) {
      console.error("Submission failed, falling back to local creation:", err);
      // Fallback in case of server route failure
      const newId = generateComplaintId();
      const now = new Date().toISOString();
      const fallbackAnalysis: AIAnalysisResult = {
        category,
        priority: "MEDIUM",
        summary: `[DEMO ANALYSIS] Issue reported at ${campusLocation}: ${title}`,
        recommended_action: "Field team dispatched to verify complaint.",
        assigned_department: "Campus Facilities Division",
        urgency_reason: "Standard operational triage.",
        isDemo: true
      };

      const fallbackComplaint: Complaint = {
        id: newId,
        studentName: studentName.trim(),
        studentId: studentId.trim(),
        department: department.trim(),
        campusLocation: campusLocation.trim(),
        category,
        title: title.trim(),
        description: description.trim(),
        priority: "MEDIUM",
        status: "Submitted",
        createdAt: now,
        updatedAt: now,
        assignedDepartment: "Campus Facilities Division",
        aiAnalysis: fallbackAnalysis,
        timeline: [
          {
            status: "Submitted",
            timestamp: now,
            note: "Complaint logged under offline fallback mode."
          }
        ]
      };

      saveComplaint(fallbackComplaint);
      setCompletedComplaint(fallbackComplaint);

      showToast({
        type: "warning",
        title: "Complaint Lodged (Demo Mode)",
        message: `Ticket ID ${newId} created.`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setCompletedComplaint(null);
    setTitle("");
    setDescription("");
    setCampusLocation("");
  };

  // If complaint was just submitted, show result view with direct actions
  if (completedComplaint) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-xl text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">
            Complaint Registered Successfully!
          </h3>
          <p className="text-sm text-slate-300">
            Your ticket has been recorded with ID{" "}
            <span className="font-mono font-bold text-indigo-300 text-base">
              {completedComplaint.id}
            </span>
            . Our AI system has evaluated the priority and routed it to{" "}
            <span className="font-semibold text-emerald-300">
              {completedComplaint.assignedDepartment}
            </span>
            .
          </p>

          <div className="pt-3 flex flex-wrap justify-center gap-3">
            <GlassButton
              variant="primary"
              size="md"
              onClick={() => router.push(`/track?id=${completedComplaint.id}`)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Track This Complaint
            </GlassButton>
            <GlassButton
              variant="outline"
              size="md"
              onClick={handleResetForm}
            >
              Submit Another Complaint
            </GlassButton>
          </div>
        </div>

        {/* AI Analysis Preview */}
        <AIAnalysisCard
          analysis={completedComplaint.aiAnalysis}
          complaintId={completedComplaint.id}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
      {/* Form Card */}
      <div className="rounded-2xl bg-[#0F172A]/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-glass space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            Submit Campus Complaint
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              AI Triage Powered
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Provide details below. Our Gemini AI triage will analyze your issue, score its urgency, and dispatch the designated campus facility team.
          </p>
        </div>

        {/* Validation error banner */}
        {validationError && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Student Info Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Student Full Name *
            </label>
            <input
              type="text"
              value={studentName}
              onChange={e => setStudentName(e.target.value)}
              placeholder="e.g. Alfi Rahman"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.07] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Student ID *
            </label>
            <input
              type="text"
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
              placeholder="e.g. CSE-2022-108"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.07] transition-all font-mono"
            />
          </div>
        </div>

        {/* Department & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Academic Department
            </label>
            <select
              value={department}
              onChange={e => setDepartment(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#101A30] border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500/60"
            >
              <option value="Computer Science & Engineering">Computer Science & Engineering</option>
              <option value="Electrical & Electronic Engineering">Electrical & Electronic Engineering</option>
              <option value="School of Business">School of Business</option>
              <option value="Architecture">Architecture</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Department of English">Department of English</option>
              <option value="Department of Law">Department of Law</option>
              <option value="General & Foundational Studies">General & Foundational Studies</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Campus Location *
            </label>
            <input
              type="text"
              value={campusLocation}
              onChange={e => setCampusLocation(e.target.value)}
              placeholder="e.g. Building 3, Room 402 or Library 2nd Fl"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.07] transition-all"
            />
          </div>
        </div>

        {/* Complaint Category selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Complaint Category *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isSelected = category === cat.label;
              return (
                <button
                  type="button"
                  key={cat.label}
                  onClick={() => setCategory(cat.label)}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-2 text-center transition-all ${
                    isSelected
                      ? "bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-500/20"
                      : "bg-white/[0.03] border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isSelected ? "text-indigo-400" : "text-slate-400"}`} />
                  <span className="text-xs font-medium leading-tight">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Complaint Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Brief summary (e.g., Projector bulb flickering during lectures)"
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.07] transition-all"
          />
        </div>

        {/* Detailed Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
            Detailed Description *
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe exactly what happened, when it started, and any immediate risks..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60 focus:bg-white/[0.07] transition-all resize-none leading-relaxed"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <GlassButton
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="w-full"
            leftIcon={!isSubmitting ? <Sparkles className="w-4 h-4" /> : undefined}
          >
            {isSubmitting ? "Running Gemini AI Triage..." : "Submit Complaint with AI Analysis"}
          </GlassButton>
        </div>
      </div>
    </form>
  );
}
