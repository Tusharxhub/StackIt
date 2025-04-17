import type React from "react"
import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

interface GlassmorphismCardProps extends HTMLAttributes<HTMLDivElement> {
  intensity?: "low" | "medium" | "high"
  className?: string
  children: React.ReactNode
}

export function GlassmorphismCard({ intensity = "medium", className, children, ...props }: GlassmorphismCardProps) {
  const intensityStyles = {
    low: "bg-background/30 backdrop-blur-sm border-white/10",
    medium: "bg-background/40 backdrop-blur-md border-white/20",
    high: "bg-background/50 backdrop-blur-lg border-white/30",
  }

  return (
    <div
      className={cn(
        "rounded-xl border shadow-lg",
        intensityStyles[intensity],
        "transition-all duration-300",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
