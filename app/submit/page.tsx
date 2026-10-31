"use client";

import React from "react";
import { ComplaintForm } from "@/components/complaints/ComplaintForm";

export default function SubmitPage() {
  return (
    <div className="space-y-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Lodge a Campus Complaint
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Have an issue with campus facilities, power, Wi-Fi, or safety? Submit below for immediate AI triage.
        </p>
      </div>

      <ComplaintForm />
    </div>
  );
}
