import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface MintSuccessSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MintSuccessSheet({ isOpen, onClose }: MintSuccessSheetProps) {
  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerOverlay className="!bg-black/30 backdrop-blur-[7.5px]" />
      <DrawerContent className="bg-card [&>svg]:hidden">
        <DrawerTitle className="sr-only">Collection Successful</DrawerTitle>

        <div className="flex flex-col items-center pt-4 pb-1">
          <div className="flex items-center gap-2">
            <CheckCircle2
              className="text-[#43B748]"
              strokeWidth={2}
              size={24}
            />
            <span className="text-2xl">Collected</span>
          </div>
        </div>

        <div className="max-w-[272px] mx-auto w-full">
          <div className="bg-card rounded-xl p-3 shadow-lg mb-8">
            <div className="relative aspect-square w-full rounded-lg overflow-hidden">
              <Image
                src="/placeholder-nft.png"
                alt="NFT Artwork"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="px-4 pb-[env(safe-area-inset-bottom)] mb-8">
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Done
            </Button>
            <Button variant="secondary" className="flex-1">
              Share
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
