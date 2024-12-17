import React from 'react';

import * as Drawer from '@/components/ui/drawer';

import {
  CastAndEngageIcon,
  GetRankedIcon,
  ReceiveUSDCIcon,
} from '../core/icons';
import { BottomSheetTriggerPill } from '../core/pill';
import { Card } from '../ui/card';

function HowToEarnPill() {
  return (
    <Drawer.Drawer>
      <Drawer.DrawerTrigger className="w-full outline-none">
        <BottomSheetTriggerPill icon="bulb" actionText="How to Earn" />
      </Drawer.DrawerTrigger>
      <Drawer.DrawerContent aria-describedby={undefined}>
        <div className="w-full">
          <Drawer.DrawerHeader className="mx-4">
            <Drawer.DrawerTitle>How to Earn</Drawer.DrawerTitle>
          </Drawer.DrawerHeader>
          <Card className="flex flex-col mb-4 mx-4">
            <div className="flex flex-row border-b p-3">
              <CastAndEngageIcon />
              <div className="flex flex-col ml-2 space-y-0.5">
                <div className="font-semibold text-sm">Cast and Engage</div>
                <div className="text-muted text-sm">
                  Your score is based on the engagement your casts receive,
                  adjusted by the number of followers.
                </div>
              </div>
            </div>
            <div className="flex flex-row border-b py-2 px-3">
              <GetRankedIcon />
              <div className="flex flex-col ml-2 space-y-0.5">
                <div className="font-semibold text-sm">
                  {'Get Ranked -> Top 400'}
                </div>
                <div className="text-muted text-sm">
                  Each week, the top 400 accounts with the highest scores
                  receive USDC rewards.
                </div>
              </div>
            </div>
            <div className="flex flex-row py-2 px-3">
              <ReceiveUSDCIcon />
              <div className="flex flex-col ml-2 space-y-0.5">
                <div className="font-semibold text-sm">Receive USDC</div>
                <div className="text-muted text-sm">
                  Rewards are sent to your connected Ethereum address on Base.
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Drawer.DrawerContent>
    </Drawer.Drawer>
  );
}

export { HowToEarnPill };
