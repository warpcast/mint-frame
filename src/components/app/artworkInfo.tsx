import sdk from "@farcaster/frame-sdk";

import { ShareIcon } from "@/components/core/icons";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { ApiChain, ApiUser } from "@/lib/api";

interface ArtworkInfoProps {
  name: string;
  creator: ApiUser;
  chain: ApiChain;
  description: string;
  onError: (error: string) => void;
}

export function ArtworkInfo({
  name,
  creator,
  description,
  onError,
}: ArtworkInfoProps) {
  const handleUsernameClick = () => {
    sdk.actions.openUrl(`https://warpcast.com/${creator.username}`);
  };

  const handleShareClick = () => {
    onError("This is a test error message to demonstrate the error sheet!");
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-row items-start justify-between mb-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold">{name}</h1>
          <div className="flex flex-row items-center gap-1">
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted/60">by</span>
              <Avatar className="h-4 w-4">
                <AvatarImage
                  src={creator.pfp?.url}
                  alt={creator.displayName}
                  width={16}
                />
              </Avatar>
              <span
                className="text-sm text-primary hover:underline cursor-pointer"
                onClick={handleUsernameClick}
              >
                {creator.username}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted/60">on</span>
              <Avatar className="h-4 w-4">
                <AvatarImage src="/base-logo.png" alt="Base" width={16} />
              </Avatar>
              <span className="text-sm text-muted">Base</span>
            </div>
          </div>
        </div>
        <Button variant="secondary" size="circle" onClick={handleShareClick}>
          <ShareIcon />
        </Button>
      </div>

      <p className="text-sm text-muted mb-4">{description}</p>
    </div>
  );
}
