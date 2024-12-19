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
    <div className="w-full max-w-md mx-auto min-h-screen flex flex-col">
      <ArtworkImage imageUrl={mint.imageUrl} name={mint.name} />
      <Card className="flex flex-col p-4 -mt-6 relative z-1 rounded-t-xl rounded-b-none flex-grow">
        <ArtworkInfo
          name={mint.name}
          creator={mint.creator}
          chain={mint.chain}
          description={mint.description}
          onError={setError}
        />
        <CollectButton
          timestamp={mint.mint.endsAt}
          price={mint.mint.priceEth}
          totalMinted={mint.mint.totalMinted}
          maxPerWallet={mint.mint.maxPerWallet}
          onCollect={() => setShowSuccess(true)}
          onError={setError}
          mintData={mint.mint.data}
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
