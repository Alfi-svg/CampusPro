import React from "react";
import { CampusCareAssistant } from "@/components/chatbot/CampusCareAssistant";

export default function AssistantPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          CampusCare Assistant
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Autonomous offline campus guide and troubleshooting assistant. Works with zero external network connectivity.
        </p>
      </div>

      <CampusCareAssistant isPageMode={true} />
    </div>
  );
}
