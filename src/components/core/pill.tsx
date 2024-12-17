'use client';

import React from 'react';

import { Card } from '../ui/card';
import { BulbPillIcon, CupPillIcon } from './icons';

function PillWrapper({ children }: React.PropsWithChildren) {
  return (
    <Card className="flex flex-row space-x-2 items-center p-3 px-4 h-16">
      {children}
    </Card>
  );
}

function BottomSheetTriggerPill({
  icon,
  actionText,
}: {
  icon: 'bulb' | 'cup';
  actionText: string;
}) {
  return (
    <PillWrapper>
      <div className="rounded-full border border-[#402750] bg-action h-[32px] w-[32px] flex items-center justify-center">
        {icon === 'bulb' && <BulbPillIcon />}
        {icon === 'cup' && <CupPillIcon />}
      </div>
      <div className="text-sm text-action-foreground">{actionText}</div>
    </PillWrapper>
  );
}

export { BottomSheetTriggerPill, PillWrapper };
