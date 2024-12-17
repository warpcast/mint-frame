import Image from "next/image";

export function ArtworkImage() {
  return (
    <div className="relative w-full aspect-square">
      <Image
        src="/placeholder-nft.png"
        alt="NFT Artwork"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
