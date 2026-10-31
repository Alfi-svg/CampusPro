import React from "react";
import { Loader2 } from "lucide-react";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function GlassButton({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}: GlassButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
    md: "px-4 py-2 text-sm rounded-xl gap-2",
    lg: "px-5 py-2.5 text-base rounded-xl gap-2.5"
  }[size];

  const variantClasses = {
    primary:
      "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/30 hover:border-indigo-300/50 active:scale-[0.98]",
    secondary:
      "bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/30 border border-cyan-400/30 hover:border-cyan-300/50 active:scale-[0.98]",
    outline:
      "bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/15 hover:border-white/30 backdrop-blur-md active:scale-[0.98]",
    danger:
      "bg-rose-600/80 hover:bg-rose-600 text-white shadow-lg shadow-rose-600/30 border border-rose-400/30 active:scale-[0.98]",
    ghost:
      "bg-transparent hover:bg-white/[0.06] text-slate-300 hover:text-white border border-transparent active:scale-[0.98]"
  }[variant];

  return (
    <button
      className={`inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
}
