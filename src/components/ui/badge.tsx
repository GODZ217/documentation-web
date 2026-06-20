import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "accent" | "outline"
  className?: string
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        {
          "bg-blue-500/10 text-blue-400 border border-blue-500/20": variant === "default",
          "bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 border border-blue-500/30": variant === "accent",
          "border border-blue-500/30 text-blue-400 bg-transparent": variant === "outline",
        },
        className
      )}
    >
      {children}
    </span>
  )
}
