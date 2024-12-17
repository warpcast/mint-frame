'use client';

import React from 'react';

import { Loading } from '@/components/ui/loading';
import {
  usePrefetchCreatorRewards,
  usePrefetchCreatorRewardsLeaderboard,
  usePrefetchCreatorRewardsMetadata,
  usePrefetchCreatorRewardsPeriodSummary,
} from '@/lib/queries';

import { useViewer } from './FrameContextProvider';

function AuthedPrefetchesProvider({ children }: React.PropsWithChildren) {
  const { fid } = useViewer();

  const prefetchCreatorRewards = usePrefetchCreatorRewards();
  const prefetchRewardsMetadata = usePrefetchCreatorRewardsMetadata();
  const prefetchCreatorRewardsLeaderboard =
    usePrefetchCreatorRewardsLeaderboard();
  const prefetchCreatorRewardsPeriodSummary =
    usePrefetchCreatorRewardsPeriodSummary();

  const [readyToLoad, setReadyToLoad] = React.useState<boolean>(false);

  const prefetch = React.useCallback(async () => {
    await Promise.all([
      prefetchRewardsMetadata(),
      prefetchCreatorRewards({ fid }),
      prefetchCreatorRewardsLeaderboard(),
      prefetchCreatorRewardsPeriodSummary({ fid }),
      // Let's at least make sure to wait for small amount of seconds
      // so the splash dismiss is not too jarring. We can always remove later.
      await new Promise((resolve) => setTimeout(resolve, 1e3 * 2)),
    ]);

    setReadyToLoad(true);
  }, [
    fid,
    prefetchCreatorRewards,
    prefetchCreatorRewardsLeaderboard,
    prefetchRewardsMetadata,
    prefetchCreatorRewardsPeriodSummary,
  ]);

  React.useEffect(() => {
    prefetch();
  }, [prefetch]);

  if (!readyToLoad) {
    return <Loading />;
  }

  return children;
}

export { AuthedPrefetchesProvider };
