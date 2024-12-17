import {
  useInfiniteQuery,
  useQueryClient,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useCallback } from 'react';

import { api } from './api';

type PaginatedResponse = {
  next: { cursor: string };
};

function isPaginatedResponse(response: unknown): response is PaginatedResponse {
  return !!(response && (response as PaginatedResponse).next?.cursor);
}

/**
 * Tries to extract a pagination cursor from the given paginated response.
 * @param lastPage - A `PaginatedResponse` object for the last page.
 * @returns The cursor or undefined.
 */
function getNextPageParam(lastPage: unknown): string | undefined {
  if (isPaginatedResponse(lastPage)) {
    return lastPage.next.cursor;
  }
  return undefined;
}

const usePrefetchCreatorRewardsMetadata = () => {
  const qc = useQueryClient();

  return useCallback(() => {
    return qc.prefetchQuery({
      queryKey: ['creatorRewardsMetadata'],
      queryFn: async () => {
        const response = await api.getCreatorRewardsMetadata();
        return response.data;
      },
    });
  }, [qc]);
};

const usePrefetchCreatorRewards = () => {
  const qc = useQueryClient();

  return useCallback(
    ({ fid }: { fid: number }) => {
      return qc.prefetchQuery({
        queryKey: ['creatorReward', fid],
        queryFn: async () => {
          const response = await api.getCreatorRewardsForUser({ fid });
          return response.data;
        },
      });
    },
    [qc],
  );
};

const usePrefetchCreatorRewardsLeaderboard = () => {
  const qc = useQueryClient();

  return useCallback(() => {
    return qc.prefetchInfiniteQuery({
      queryKey: ['creatorRewardsLeaderboard'],
      queryFn: async () => {
        const response = await api.getCreatorRewardsLeaderboard({ limit: 30 });
        return response.data;
      },
      initialPageParam: undefined,
    });
  }, [qc]);
};

const usePrefetchCreatorRewardsPeriodSummary = () => {
  const qc = useQueryClient();

  return useCallback(
    ({ fid }: { fid: number }) => {
      return qc.prefetchQuery({
        queryKey: ['creatorRewardsPeriodSummary', fid],
        queryFn: async () => {
          const response = await api.getCreatorRewardsPeriodSummary({ fid });
          return response.data;
        },
      });
    },
    [qc],
  );
};

const useCreatorRewardsMetadata = () => {
  return useSuspenseQuery({
    queryKey: ['creatorRewardsMetadata'],
    queryFn: async () => {
      const response = await api.getCreatorRewardsMetadata();
      return response.data;
    },
  });
};

const useCreatorRewardsLeaderboard = () => {
  return useInfiniteQuery({
    queryKey: ['creatorRewardsLeaderboard'],
    queryFn: async ({ pageParam: cursor }) => {
      const params =
        typeof cursor !== 'undefined' ? { cursor, limit: 30 } : { limit: 30 };
      const response = await api.getCreatorRewardsLeaderboard(params);
      return response.data;
    },
    initialPageParam: undefined,
    getNextPageParam: getNextPageParam,
  });
};

const useCreatorRewards = ({ fid }: { fid: number }) => {
  return useSuspenseQuery({
    queryKey: ['creatorReward', fid],
    queryFn: async () => {
      const response = await api.getCreatorRewardsForUser({ fid });
      return response.data;
    },
  });
};

const useCreatorRewardsEarningHistory = ({ fid }: { fid: number }) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['creatorRewardsEarningHistory', fid],
    queryFn: async ({ pageParam: cursor }) => {
      const params =
        typeof cursor !== 'undefined'
          ? { cursor, fid, limit: 52 }
          : { fid, limit: 52 };
      const response = await api.getCreatorRewardsEarningsHistory(params);
      return response.data;
    },
    initialPageParam: undefined,
    getNextPageParam: getNextPageParam,
  });
};

const useCreatorRewardsPeriodSummary = ({ fid }: { fid: number }) => {
  return useSuspenseQuery({
    queryKey: ['creatorRewardsPeriodSummary', fid],
    queryFn: async () => {
      const response = await api.getCreatorRewardsPeriodSummary({ fid });
      return response.data;
    },
  });
};

export {
  useCreatorRewards,
  useCreatorRewardsEarningHistory,
  useCreatorRewardsLeaderboard,
  useCreatorRewardsMetadata,
  useCreatorRewardsPeriodSummary,
  usePrefetchCreatorRewards,
  usePrefetchCreatorRewardsLeaderboard,
  usePrefetchCreatorRewardsMetadata,
  usePrefetchCreatorRewardsPeriodSummary,
};
