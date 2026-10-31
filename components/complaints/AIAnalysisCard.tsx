import React from "react";
import { Sparkles, AlertOctagon, CheckCircle2, Shield, Wrench, Info } from "lucide-react";
import { AIAnalysisResult } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

interface AIAnalysisCardProps {
  analysis: AIAnalysisResult;
  complaintId?: string;
}

export function AIAnalysisCard({ analysis, complaintId }: AIAnalysisCardProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-indigo-950/60 via-[#101A30]/90 to-[#0A1020]/95 backdrop-blur-2xl border border-indigo-500/30 p-5 sm:p-6 shadow-glass relative overflow-hidden space-y-4 animate-in fade-in zoom-in-95 duration-200">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              Gemini AI Triage Assessment
              {complaintId && (
                <span className="text-xs font-mono text-indigo-400">({complaintId})</span>
              )}
            </h4>
            <p className="text-[11px] text-slate-400">
              Autonomous severity scoring and automated routing
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {analysis.isDemo && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              DEMO ANALYSIS
            </span>
          )}
          <Badge priority={analysis.priority} size="md" />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs relative z-10">
        {/* Category & Department */}
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Target Department
          </span>
          <div className="flex items-center gap-2 text-indigo-300 font-semibold text-sm">
            <Shield className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>{analysis.assigned_department}</span>
          </div>
          <p className="text-[11px] text-slate-400 pt-0.5">
            Category Classified: <span className="text-slate-200">{analysis.category}</span>
          </p>
        </div>

        {/* Urgency Rationale */}
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Urgency Evaluation
          </span>
          <div className="flex items-start gap-2 text-slate-200">
            <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed">{analysis.urgency_reason}</p>
          </div>
        </div>
      </div>

      {/* AI Summary */}
      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1 relative z-10">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
          Executive Incident Summary
        </span>
        <p className="text-xs text-slate-200 leading-relaxed font-medium">
          {analysis.summary}
        </p>
      </div>

      {/* Recommended Action */}
      <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1 relative z-10">
        <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-xs uppercase tracking-wider">
          <Wrench className="w-3.5 h-3.5" />
          <span>Recommended Technical Action</span>
        </div>
        <p className="text-xs text-cyan-100 leading-relaxed font-medium">
          {analysis.recommended_action}
        </p>
      </div>
    </div>
  );
}
