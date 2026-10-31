import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "hover" | "interactive" | "glow" | "subtle";
  glowColor?: "indigo" | "cyan" | "rose" | "none";
  className?: string;
}

export function GlassCard({
  children,
  variant = "default",
  glowColor = "none",
  className = "",
  ...props
}: GlassCardProps) {
  let baseStyle = "rounded-2xl transition-all duration-300 relative overflow-hidden ";

  switch (variant) {
    case "hover":
      baseStyle += "bg-white/[0.05] hover:bg-white/[0.08] backdrop-blur-xl border border-white/10 hover:border-white/20 shadow-glass hover:shadow-2xl hover:-translate-y-0.5 ";
      break;
    case "interactive":
      baseStyle += "bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur-lg border border-white/10 hover:border-indigo-500/40 cursor-pointer shadow-glass ";
      break;
    case "glow":
      baseStyle += "bg-white/[0.06] backdrop-blur-2xl border border-white/15 shadow-glass ";
      break;
    case "subtle":
      baseStyle += "bg-white/[0.02] backdrop-blur-md border border-white/[0.06] ";
      break;
    default:
      baseStyle += "bg-white/[0.05] backdrop-blur-xl border border-white/10 shadow-glass ";
  }

  const glowStyles = {
    indigo: "after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-tr after:from-indigo-500/10 after:to-transparent after:pointer-events-none ",
    cyan: "after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-tr after:from-cyan-500/10 after:to-transparent after:pointer-events-none ",
    rose: "after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-tr after:from-rose-500/10 after:to-transparent after:pointer-events-none ",
    none: ""
  }[glowColor];

  return (
    <div className={`${baseStyle} ${glowStyles} ${className}`} {...props}>
      {children}
    </div>
  );
}
