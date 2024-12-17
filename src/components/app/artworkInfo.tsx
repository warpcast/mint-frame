import { ShareIcon } from "@/components/core/icons";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function ArtworkInfo() {
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-row items-start justify-between mb-4">
        <div className="space-y-1">
          <h1 className="text-xl font-bold">Name of Artwork</h1>
          <div className="flex flex-row items-center gap-1">
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted/60">by</span>
              <Avatar className="h-4 w-4">
                <AvatarImage
                  src="/placeholder-artist.png"
                  alt="Artist"
                  width={16}
                />
              </Avatar>
              <span className="text-sm text-primary hover:underline cursor-pointer">
                artisthandle
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted/60">on</span>
              <Avatar className="h-4 w-4">
                <AvatarImage src="/base-logo.svg" alt="Base" width={16} />
              </Avatar>
              <span className="text-sm text-muted">Base</span>
            </div>
          </div>
        </div>
        <Button variant="secondary" size="circle">
          <ShareIcon />
        </Button>
      </div>

      <p className="text-sm text-muted">
        Playgrounds meet Lord of the Flies, AI collaboration by YEDAI 2024.
        Frostbitten #YEDAI #playgrounds
      </p>
    </div>
  );
}
