"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";
import { RoleProvider } from "./RoleContext";
import { ToastProvider } from "@/components/ui/Toast";
import { CampusCareAssistant } from "@/components/chatbot/CampusCareAssistant";
import { X } from "lucide-react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <RoleProvider>
      <ToastProvider>
        <div className="relative min-h-screen bg-[#080D1A] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
          {/* Ambient background glows */}
          <div className="ambient-glow-1 pointer-events-none" />
          <div className="ambient-glow-2 pointer-events-none" />

          {/* Mobile Drawer Backdrop */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div
                className="w-72 h-full bg-[#080D1A] border-r border-white/10 shadow-2xl relative"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
                <Sidebar onCloseMobile={() => setMobileMenuOpen(false)} />
              </div>
            </div>
          )}

          {/* Main Layout Container */}
          <div className="flex flex-1 relative z-10">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block shrink-0 sticky top-0 h-screen">
              <Sidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
              <TopNavbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
              <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                {children}
              </main>
            </div>
          </div>

          {/* Floating CampusCare Assistant (Available across all pages) */}
          <CampusCareAssistant />
        </div>
      </ToastProvider>
    </RoleProvider>
  );
}
