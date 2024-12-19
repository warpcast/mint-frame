import sdk from "@farcaster/frame-sdk";
import {
  CheckIcon,
  ChevronDown,
  ChevronUp,
  CopyIcon,
  XCircle,
} from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTitle,
} from "@/components/ui/drawer";
import { cn } from "@/lib/cn";

interface MintErrorSheetProps {
  isOpen: boolean;
  onClose: () => void;
  error: string;
}

export function MintErrorSheet({
  isOpen,
  onClose,
  error,
}: Omit<MintErrorSheetProps, "onCloseFrame">) {
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(error);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCloseFrame = useCallback(() => {
    sdk.actions.close();
  }, []);

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerOverlay className="backdrop-blur-[7.5px]" />
      <DrawerContent className="bg-card [&>svg]:hidden">
        <DrawerTitle className="sr-only">Failed</DrawerTitle>

        <div className="flex flex-col items-center pt-4">
          <div className="flex items-center gap-2">
            <XCircle className="text-destructive" strokeWidth={2} size={24} />
            <span className="text-2xl">Failed</span>
          </div>
        </div>

        <div className="p-4">
          <p className="text-center">Something went wrong.</p>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-center gap-1 text-action-foreground"
          >
            {showDetails ? "Hide" : "Show"} error
            {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          <div
            className={cn(
              "transition-all",
              showDetails
                ? "overflow-y-scroll max-h-screen"
                : "overflow-hidden max-h-0"
            )}
          >
            <pre
              onClick={handleCopy}
              className="text-xs text-muted whitespace-pre-wrap break-words bg-well p-4 rounded-lg relative cursor-pointer group mt-4"
            >
              <div className="absolute right-2 top-2 opacity-50 group-hover:opacity-100 transition-opacity">
                {copied ? (
                  <CheckIcon size={16} className="text-[#43B748]" />
                ) : (
                  <CopyIcon size={16} />
                )}
              </div>
              {error}
            </pre>
          </div>
        </div>

        <div className="px-4 pb-[env(safe-area-inset-bottom)] mb-8">
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={onClose}>
              Back
            </Button>
            <Button
              variant="default"
              className="flex-1"
              onClick={handleCloseFrame}
            >
              Close
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
