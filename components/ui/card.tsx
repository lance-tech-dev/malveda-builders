import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  variant?: "default" | "subtle" | "elevated" | "accent";
}

export function Card({
  children,
  className = "",
  variant = "default",
  ...props
}: CardProps) {
  const variantStyles = {
    default:
      "bg-surface-card border-border shadow-card hover:border-border-strong",
    subtle:
      "bg-surface border-border/70 hover:border-border",
    elevated:
      "bg-surface-card border-border shadow-elevated",
    accent:
      "bg-surface-card border-brand-red/30 shadow-card hover:border-brand-red/60",
  };

  return (
    <div
      className={`relative rounded-xl border p-6 transition-all duration-200 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-4 flex flex-col gap-1.5 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={`text-base font-bold tracking-tight text-text-primary ${className}`}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-xs text-text-secondary leading-relaxed ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mt-5 flex items-center border-t border-border pt-4 text-xs text-text-muted ${className}`}
    >
      {children}
    </div>
  );
}
