export function getShareUrl({
  name,
  username,
}: {
  name: string;
  username?: string;
}) {
  name;
  const text = username
    ? `I just collected "${name}" by @${username}`
    : `I just collected "${name}"`;

  return `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent("https://mint.warpcast.com/")}`;
}
