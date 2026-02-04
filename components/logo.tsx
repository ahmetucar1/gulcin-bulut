import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("logo-mark", className)} aria-hidden="true">
      <span className="logo-tree" />
      <span className="logo-face" />
    </span>
  );
}
