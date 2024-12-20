import Image from "next/image";

interface ArtworkImageProps {
  imageUrl: string;
  name: string;
}

export function ArtworkImage({ imageUrl, name }: ArtworkImageProps) {
  const imageSrc = imageUrl.replace("?width=250", "?width=800");

  return (
    <div className="relative w-full aspect-square">
      <Image src={imageSrc} alt={name} fill className="object-cover" priority />
    </div>
  );
}
