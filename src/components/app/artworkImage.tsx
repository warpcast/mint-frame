import Image from "next/image";

interface ArtworkImageProps {
  imageUrl: string;
  name: string;
}

export function ArtworkImage({ imageUrl, name }: ArtworkImageProps) {
  return (
    <div className="relative w-full aspect-square">
      <Image
        src={imageUrl}
        alt={name}
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
