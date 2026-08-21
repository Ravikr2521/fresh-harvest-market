import { Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({
  icon: Icon = Sprout,
  title = "Nothing here yet",
  description,
  actionLabel,
  onAction,
  children,
}) {
  return (
    <div className="surface-card flex flex-col items-center gap-4 px-6 py-14 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
        <Icon className="size-7" aria-hidden="true" />
      </span>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description ? (
          <p className="mx-auto max-w-md text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actionLabel && onAction ? (
        <Button onClick={onAction} className="rounded-full">
          {actionLabel}
        </Button>
      ) : null}
      {children}
    </div>
  );
}
