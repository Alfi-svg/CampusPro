import React, { Suspense } from "react";
import { ComplaintTracker } from "@/components/complaints/ComplaintTracker";

export default function TrackPage() {
  return (
    <div className="space-y-6">
      <Suspense
        fallback={
          <div className="p-12 text-center text-slate-400">
            <span className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin inline-block mb-3" />
            <p className="text-xs">Loading complaint tracking engine...</p>
          </div>
        }
      >
        <ComplaintTracker />
      </Suspense>
    </div>
  );
}
