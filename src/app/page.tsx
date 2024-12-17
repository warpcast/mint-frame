"use client";

import React from "react";

import { ArtworkImage } from "@/components/app/artworkImage";
import { ArtworkInfo } from "@/components/app/artworkInfo";
import { CollectButton } from "@/components/app/collectButton";
import { Card } from "@/components/ui/card";

export default function Home() {
  const oneHourFromNow = Date.now() + 60 * 60 * 1000;

  return (
    <div className="w-full min-h-screen flex flex-col">
      <ArtworkImage />
      <Card className="flex flex-col p-4 -mt-6 relative z-1 rounded-t-xl rounded-b-none flex-grow">
        <ArtworkInfo />
        <CollectButton timestamp={oneHourFromNow} />
      </Card>
    </div>
  );
}
