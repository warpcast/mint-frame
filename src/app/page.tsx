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
  const { data } = useFeaturedMint();
  const { mint } = data.result;

  const [showSuccess, setShowSuccess] = React.useState(false);
  const [error, setError] = React.useState<string>();

  useEffect(() => {
    dismiss();
  }, [dismiss]);

  return (
    <div className="w-full min-h-screen flex flex-col pb-4">
      <ArtworkImage imageUrl={mint.imageUrl} name={mint.name} />
      <Card className="flex flex-col -mt-6 relative z-1 flex-grow">
        <ArtworkInfo
          name={mint.name}
          creator={mint.creator}
          chain={mint.chain}
          description={mint.description}
        />
        <CollectButton
          timestamp={mint.endsAt}
          price={mint.priceUsd}
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
