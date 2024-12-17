'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatScore } from '@/lib/formatters';
import { useCreatorRewardsPeriodSummary } from '@/lib/queries';
import { useViewer } from '@/providers/FrameContextProvider';

function FormattedDateRange({
  startMilliseconds,
  endMilliseconds,
}: {
  startMilliseconds: number;
  endMilliseconds: number;
}): string {
  const start = new Date(startMilliseconds);
  const end = new Date(endMilliseconds);

  const startMonth = start.toLocaleDateString(undefined, { month: 'long' });
  const startDay = start.getDate();
  const startYear = start.getFullYear();

  const endMonth = end.toLocaleDateString(undefined, { month: 'long' });
  const endDay = end.getDate();
  const endYear = end.getFullYear();

  // If within the same month and year
  if (startMonth === endMonth && startYear === endYear) {
    return `${startMonth} ${startDay} - ${endDay}`;
  }

  // Different month or year
  return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
}

// eslint-disable-next-line import/no-default-export
export default function WeeklySummary() {
  const { fid, pfpUrl } = useViewer();

  const { data } = useCreatorRewardsPeriodSummary({ fid });

  const weeklySummary = React.useMemo(() => {
    return data.result.summary;
  }, [data.result.summary]);

  const router = useRouter();

  const onLeaderboardClick = React.useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <div className="w-full h-full space-y-4 pt-16 grow">
      <Card className="flex flex-col items-center p-4 mx-4">
        <Avatar className="h-[68px] w-[68px]">
          <AvatarImage
            className="object-cover"
            src={pfpUrl}
            alt={`Avatar for ${fid}`}
            loading="eager"
            width={68}
          />
        </Avatar>
        <div className="gap-2 flex flex-col items-center justify-center w-full relative my-4">
          <div className="text-muted text-sm">Your weekly score</div>
          <div className="font-semibold text-4xl text-center">
            {formatScore({ score: weeklySummary.score })}
          </div>
        </div>
        <div className="gap-2 flex flex-col items-center justify-center w-full relative">
          <div className="flex flex-row items-center py-2 w-full justify-between">
            <div className="text-muted text-sm">Ranking</div>
            <div className="text-right font-semibold [font-variant-numeric:tabular-nums]">
              {typeof weeklySummary.rank === 'undefined'
                ? 'N/A'
                : weeklySummary.rank}
            </div>
          </div>
          <div className="flex flex-row items-center py-2 border-t w-full justify-between">
            <div className="text-muted text-sm">Week</div>
            <div className="text-right font-semibold">
              <FormattedDateRange
                startMilliseconds={weeklySummary.periodStartDate}
                endMilliseconds={weeklySummary.periodEndDate}
              />
            </div>
          </div>
          {weeklySummary.rewardCents > 0 && (
            <div className="flex flex-row items-center py-2 border-t w-full justify-between">
              <div className="text-muted text-sm">Reward</div>
              <div className="text-right font-semibold [font-variant-numeric:tabular-nums] text-[#43B748]">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(weeklySummary.rewardCents / 100)}
              </div>
            </div>
          )}
        </div>
      </Card>
      <div className="fixed bottom-0 h-20 bg-background w-full items-center py-4 grid grid-cols-1 gap-4 px-4">
        <Button onClick={onLeaderboardClick} variant={'default'}>
          Leaderboard
        </Button>
      </div>
    </div>
  );
}
