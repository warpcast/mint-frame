"use client";

import React, { useEffect } from "react";

import { ArtworkImage } from "@/components/app/artworkImage";
import { ArtworkInfo } from "@/components/app/artworkInfo";
import { CollectButton } from "@/components/app/collectButton";
import { MintErrorSheet } from "@/components/app/mintErrorSheet";
import { MintSuccessSheet } from "@/components/app/mintSuccessSheet";
import { Card } from "@/components/ui/card";
import { useFeaturedMint } from "@/lib/queries";
import { useFrameSplash } from "@/providers/FrameSplashProvider";

// eslint-disable-next-line import/no-default-export
export default function Home() {
  const { dismiss } = useFrameSplash();
  const { data } = useFeaturedMint({ collection: "0xb9e4c1ee1ea774cfcba8d9c5bb5e872a53594093" });
  const { mint } = data.result;

  const [showSuccess, setShowSuccess] = React.useState(false);
  const [error, setError] = React.useState<string>();

  useEffect(() => {
    dismiss();
  }, [dismiss]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <ArtworkImage imageUrl={mint.imageUrl} name={mint.name} />
      <Card className="flex flex-col -mt-6 relative z-1 flex-grow pb-4">
        <ArtworkInfo
          name={mint.name}
          creator={mint.creator}
          chain={mint.chain}
          description={mint.description}
          isMinting={mint.isMinting}
        />
        <CollectButton
          timestamp={mint.endsAt}
          price={mint.priceUsd}
          isMinting={mint.isMinting}
          onCollect={() => setShowSuccess(true)}
          onError={setError}
        />
      </Card>
      <MintSuccessSheet
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        name={mint.name}
        imageUrl={mint.imageUrl}
      />
      <MintErrorSheet
        isOpen={!!error}
        onClose={() => setError(undefined)}
        error={error || ""}
      />
    </div>
  );
}
