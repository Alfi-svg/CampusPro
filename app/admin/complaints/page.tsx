"use client";

import React from "react";
import { AdminComplaintList } from "@/components/admin/AdminComplaintList";

export default function AdminComplaintsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          All Campus Complaints
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Review, triage, reassign departments, and update resolution statuses across all student tickets.
        </p>
      </div>

      <AdminComplaintList />
    </div>
  );
}
