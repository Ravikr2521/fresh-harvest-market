import { Mail, Phone, Store, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

function Row({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs text-muted-foreground">{label}</span>
        <span className="block wrap-anywhere text-sm font-medium">{value}</span>
      </span>
    </div>
  );
}

export function SellerDialog({ seller, trigger }) {
  const name = seller?.user_name || "Farmer";

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <button
            type="button"
            className="text-left text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {name}
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Seller details</DialogTitle>
          <DialogDescription>Farm-direct seller information from the marketplace.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Row icon={Store} label="Seller name" value={name} />
          <Separator />
          <Row icon={Phone} label="Mobile" value={seller?.user_mobile} />
          <Row icon={Mail} label="Email" value={seller?.email || "Not provided"} />
          <Row icon={User} label="Seller ID" value={seller?.user_id} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
