import React from 'react';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { ApiCreatorRewardsLeaderboardUser } from '@/lib/api';
import { cn } from '@/lib/cn';
import { formatScore } from '@/lib/formatters';

type User = ApiCreatorRewardsLeaderboardUser['user'];

function ScoreSummaryRow({
  user,
  score,
  rank,
  className,
}: {
  user: User;
  score: number;
  rank: number;
  className: string | undefined;
}) {
  return (
    <div
      className={cn(
        'flex flex-row items-center justify-between py-2 px-3',
        className,
      )}
    >
      <div className="flex flex-row items-center">
        <Avatar className="h-[30px] w-[30px]">
          <AvatarImage
            className="object-cover"
            src={user.pfp?.url}
            alt={`Avatar for ${user.fid}`}
            loading="eager"
            width={30}
          />
        </Avatar>
        <div className="flex flex-col items-start justify-center pl-3">
          <div className="font-semibold">{user.username || `!${user.fid}`}</div>
          <div className="text-muted text-sm">{formatScore({ score })}</div>
        </div>
      </div>
      <div
        className={cn(
          'w-max text-center font-semibold [font-variant-numeric:tabular-nums]',
        )}
      >
        #{rank}
      </div>
    </div>
  );
}

export { ScoreSummaryRow };
