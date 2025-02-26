"use client";

import React from "react";

import { Loading } from "@/components/ui/loading";
import { usePrefetchFeaturedMint } from "@/lib/queries";

function AuthedPrefetchesProvider({ children }: React.PropsWithChildren) {
  const [readyToLoad, setReadyToLoad] = React.useState<boolean>(false);
  const prefetchFeaturedMint = usePrefetchFeaturedMint({ collection: "0xb9e4c1ee1ea774cfcba8d9c5bb5e872a53594093" });

  const prefetch = React.useCallback(async () => {
    await Promise.all([
      prefetchFeaturedMint(),

      // Let's at least make sure to wait for small amount of seconds
      // so the splash dismiss is not too jarring. We can always remove later.
      await new Promise((resolve) => setTimeout(resolve, 1e3 * 2)),
    ]);

    setReadyToLoad(true);
  }, [prefetchFeaturedMint]);

  React.useEffect(() => {
    prefetch();
  }, [prefetch]);

  if (!readyToLoad) {
    return <Loading />;
  }

  return children;
}

export { AuthedPrefetchesProvider };
