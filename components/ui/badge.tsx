import type { ReactNode } from "react";

type BadgeVariant = "default" | "brand" | "success" | "warning" | "outline" | "metallic";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-surface-secondary text-text-secondary border-border",
  brand:
    "bg-brand-red/10 text-brand-red border-brand-red/25",
  success:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  warning:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  outline:
    "bg-transparent text-text-secondary border-border hover:border-border-strong",
  metallic:
    "bg-surface text-metallic-dark dark:text-metallic-silver border-border",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-text-muted",
  brand: "bg-brand-red",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  outline: "bg-text-secondary",
  metallic: "bg-metallic-silver",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  dot = false,
  className = "",
}: BadgeProps) {
  const sizeClasses =
    size === "sm"
      ? "px-2 py-0.5 text-[10px] tracking-[0.16em]"
      : "px-2.5 py-1 text-xs tracking-[0.14em]";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border font-medium uppercase transition-colors ${variantStyles[variant]} ${sizeClasses} ${className}`}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${dotColors[variant]} shrink-0`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
