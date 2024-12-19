import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import React from "react";
import {
  useAccount,
  useConnect,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";

import { FormattedTimeWithCountdown } from "@/components/app/formattedTimeWithCountdown";
import { AnimatedBorder } from "@/components/ui/animatedBorder";
import { Button } from "@/components/ui/button";
import { isUserRejectionError } from "@/lib/errors";

const formatMaxPerWallet = (max: number) => {
  return max > 100 ? ">100" : max.toString();
};

interface CollectButtonProps {
  timestamp: number | null;
  price: string;
  totalMinted: number;
  maxPerWallet: number;
  onCollect: () => void;
  onError: (error: string | undefined) => void;
  mintData: {
    to: `0x${string}`;
    value: string;
    data: `0x${string}`;
  };
}

export function CollectButton({
  timestamp,
  price,
  totalMinted,
  maxPerWallet,
  onCollect,
  onError,
  mintData,
}: CollectButtonProps) {
  const { isConnected } = useAccount();
  const { connect } = useConnect();
  const { sendTransactionAsync, isPending: isSending } = useSendTransaction();
  const [hash, setHash] = React.useState<`0x${string}`>();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const isPending = isSending || isConfirming;

  const successHandled = React.useRef(false);

  React.useEffect(() => {
    if (isSuccess && !successHandled.current) {
      successHandled.current = true;
      onCollect();
    }
  }, [isSuccess, onCollect]);

  const handleClick = async () => {
    try {
      if (!isConnected) {
        connect({ connector: farcasterFrame() });
        return;
      }

      const hash = await sendTransactionAsync({
        to: mintData.to,
        value: BigInt(mintData.value),
        data: mintData.data,
      });

      setHash(hash);
    } catch (error) {
      if (!isUserRejectionError(error)) {
        onError(
          error instanceof Error ? error.message : "Something went wrong."
        );
      }
    }
  };

  return (
    <>
      <div className="sticky bottom-0 left-0 right-0 pb-[env(safe-area-inset-bottom)] bg-card">
        <div className="mb-4">
          {isPending ? (
            <AnimatedBorder>
              <Button className="w-full relative" disabled>
                Collecting...
              </Button>
            </AnimatedBorder>
          ) : (
            <Button className="w-full" onClick={handleClick}>
              {isConnected ? `Collect for ${price} ETH` : "Connect"}
            </Button>
          )}
        </div>

        <div className="flex justify-center gap-1 text-sm text-muted">
          <span>{totalMinted} collected</span>
          <span className="text-muted">•</span>
          <span>Max {formatMaxPerWallet(maxPerWallet)} per wallet</span>
          {timestamp && (
            <>
              <span className="text-muted">•</span>
              <span className="inline-block min-w-[65px]">
                <FormattedTimeWithCountdown timestamp={timestamp} />
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
}
