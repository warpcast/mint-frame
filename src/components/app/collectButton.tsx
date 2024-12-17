import React from "react";

import { FormattedTimeWithCountdown } from "@/components/app/formattedTimeWithCountdown";
import { MintSuccessSheet } from "@/components/app/mintSuccessSheet";
import { Button } from "@/components/ui/button";

interface CollectButtonProps {
  timestamp: number;
}

export function CollectButton({ timestamp }: CollectButtonProps) {
  const [showSuccess, setShowSuccess] = React.useState(false);

  return (
    <>
      <div className="sticky bottom-0 left-0 right-0 pb-[env(safe-area-inset-bottom)] bg-card">
        <Button
          className="w-full mb-4"
          onClick={() => setShowSuccess(true)}
        >
          Collect for 0.04 ETH
        </Button>

        <div className="flex justify-center gap-1 text-sm text-muted">
          <span>12 collected</span>
          <span className="text-muted/60">•</span>
          <span>Max 2 per wallet</span>
          <span className="text-muted/60">•</span>
          <span className="inline-block min-w-[65px]">
            <FormattedTimeWithCountdown timestamp={timestamp} />
          </span>
        </div>
      </div>

      <MintSuccessSheet
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </>
  );
}
