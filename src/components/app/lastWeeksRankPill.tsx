import Link from 'next/link';
import React from 'react';

import { formatScore } from '@/lib/formatters';

import { PillWrapper } from '../core/pill';

type LastWeeksRankPillProps = {
  score: number;
};

function LastWeeksRankPill({ score }: LastWeeksRankPillProps) {
  return (
    <Link className="w-full" href={'/weekly-summary'}>
      <PillWrapper>
        <div className="flex flex-col items-start">
          <div className="text-muted font-semibold text-xs">
            Scored last week
          </div>
          {formatScore({ score })}
        </div>
      </PillWrapper>
    </Link>
  );
}

export { LastWeeksRankPill };
