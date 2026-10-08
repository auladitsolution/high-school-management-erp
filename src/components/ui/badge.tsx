import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "destructive" | "outline" | "purple" | "cyan";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-blue-50 text-blue-700 border-blue-200/80 font-bold",
    secondary: "bg-slate-100 text-slate-700 border-slate-200 font-semibold",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200/80 font-bold",
    warning: "bg-amber-50 text-amber-800 border-amber-200/80 font-bold",
    destructive: "bg-rose-50 text-rose-700 border-rose-200/80 font-bold",
    outline: "text-slate-700 border-slate-300 font-medium bg-white",
    purple: "bg-purple-50 text-purple-700 border-purple-200/80 font-bold",
    cyan: "bg-cyan-50 text-cyan-700 border-cyan-200/80 font-bold",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs transition-colors shadow-2xs",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
