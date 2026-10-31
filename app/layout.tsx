import type { Metadata } from "next";
import "./globals.css";
import { AppLayout } from "@/components/layout/AppLayout";

export const metadata: Metadata = {
  title: "CampusCare AI — Smart Campus Complaint Management",
  description: "AI-Powered University Campus Complaint Management Platform. Real-time triage, intelligent routing, and transparent resolution tracking.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#080D1A] text-[#F8FAFC] antialiased">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
