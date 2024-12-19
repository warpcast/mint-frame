import sdk from "@farcaster/frame-sdk";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTitle,
} from "@/components/ui/drawer";
import { getShareUrl } from "@/lib/share";

interface MintSuccessSheetProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  imageUrl: string;
}

export function MintSuccessSheet({
  isOpen,
  onClose,
  name,
  imageUrl
}: MintSuccessSheetProps) {
  const handleShare = useCallback(() => {
    const url = getShareUrl({ name });
    sdk.actions.openUrl(url);
  }, [name]);

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerOverlay className="!bg-black/30 backdrop-blur-[7.5px]" />
      <DrawerContent className="bg-card [&>svg]:hidden">
        <DrawerTitle className="sr-only">Collection Successful</DrawerTitle>

        <div className="flex flex-col items-center pt-4 pb-1">
          <div className="flex items-center gap-1">
            <CheckCircle2
              className="text-[#43B748]"
              strokeWidth={2}
              size={24}
            />
            <span className="text-2xl font-semibold">Collected</span>
          </div>
        </div>

        <div className="max-w-[272px] mx-auto w-full">
          <div className="bg-mat rounded-xl p-2 shadow mb-10">
            <div className="relative aspect-square w-full rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="px-4 pb-[env(safe-area-inset-bottom)] mb-8">
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={onClose}>
              Done
            </Button>
            <Button variant="default" className="flex-1" onClick={handleShare}>
              Share
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
