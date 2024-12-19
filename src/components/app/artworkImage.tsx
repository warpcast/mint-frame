import Image from "next/image";
import { useCallback, useRef } from "react";

interface ArtworkImageProps {
  imageUrl: string;
  name: string;
  onError: (error: string) => void;
}

export function ArtworkImage({ imageUrl, name, onError }: ArtworkImageProps) {
  const lastTap = useRef<number>(0);

  const handleTap = useCallback(() => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300; // ms

    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      // Double tap detected
      onError("This is a test error message to demonstrate the error sheet!");
    }

    lastTap.current = now;
  }, [onError]);

  return (
    <div
      className="relative w-full aspect-square"
      onClick={handleTap}
      onContextMenu={(e) => {
        e.preventDefault();
        handleTap();
      }}
    >
      <Image src={imageUrl} alt={name} fill className="object-cover" priority />
    </div>
  );
}
