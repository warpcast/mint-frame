export function getShareUrl({
  name,
  username,
}: {
  name: string;
  username?: string;
}) {
  name;
  const text = username
    ? `I just collected "Name of Work" by handle`
    : `I just collected "Name of Work"`;

  return `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent("https://mint.warpcast.com/")}`;
}
