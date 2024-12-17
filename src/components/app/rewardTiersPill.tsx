import React from 'react';

import * as Drawer from '@/components/ui/drawer';

import { BottomSheetTriggerPill } from '../core/pill';
import { Card } from '../ui/card';

function RewardTiersPill() {
  return (
    <Drawer.Drawer>
      <Drawer.DrawerTrigger className="w-full outline-none">
        <BottomSheetTriggerPill icon="cup" actionText="Reward Tiers" />
      </Drawer.DrawerTrigger>
      <Drawer.DrawerContent aria-describedby={undefined}>
        <div className="w-full">
          <Drawer.DrawerHeader className="mx-4">
            <Drawer.DrawerTitle>Reward Tiers</Drawer.DrawerTitle>
          </Drawer.DrawerHeader>
          <Card className="flex flex-col mb-4 mx-4">
            <div className="flex flex-row border-b p-3">
              <div className="flex flex-col ml-2 space-y-0.5">
                <div className="font-semibold text-sm">Tier 1 – $200 Prize</div>
                <div className="text-muted text-sm">Top 5 winners</div>
              </div>
            </div>
            <div className="flex flex-row border-b p-3">
              <div className="flex flex-col ml-2 space-y-0.5">
                <div className="font-semibold text-sm">Tier 2 – $50 Prize</div>
                <div className="text-muted text-sm">Next 20 winners</div>
              </div>
            </div>
            <div className="flex flex-row border-b p-3">
              <div className="flex flex-col ml-2 space-y-0.5">
                <div className="font-semibold text-sm">Tier 3 – $20 Prize</div>
                <div className="text-muted text-sm">Next 75 winners</div>
              </div>
            </div>
            <div className="flex flex-row border-b p-3">
              <div className="flex flex-col ml-2 space-y-0.5">
                <div className="font-semibold text-sm">Tier 4 – $15 Prize</div>
                <div className="text-muted text-sm">Next 100 winners</div>
              </div>
            </div>
            <div className="flex flex-row p-3">
              <div className="flex flex-col ml-2 space-y-0.5">
                <div className="font-semibold text-sm">Tier 5 – $10 Prize</div>
                <div className="text-muted text-sm">Next 200 winners</div>
              </div>
            </div>
          </Card>
        </div>
      </Drawer.DrawerContent>
    </Drawer.Drawer>
  );
}

export { RewardTiersPill };
