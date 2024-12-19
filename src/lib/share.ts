export function getShareUrl({
  name,
  username,
}: {
  name: string;
  username?: string;
}) {
  const text = username
    ? `I just collected "${name}" by ${username}`
    : `I just collected ${name}`;

  return `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent("https://wc-featured-mint.vercel.app/")}`;
}
