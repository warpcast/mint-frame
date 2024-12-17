const WARPCAST_CLOUDFLARE_CDN_PREFIX =
  'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw';

const WRPCDN_PREFIX = 'https://wrpcd.net/cdn-cgi/image';

function applyCloudflarePath({
  url,
  width,
}: {
  url: string | undefined;
  width: number;
}) {
  if (!url) {
    return undefined;
  }

  const options = [
    'anim=false',
    'fit=contain',
    'f=auto',
    `w=${width * 2}`,
  ].join(',');

  if (
    url.startsWith(WARPCAST_CLOUDFLARE_CDN_PREFIX) &&
    (url.endsWith('/original') ||
      url.endsWith('/rectcontain1') ||
      url.endsWith('/rectcontain2') ||
      url.endsWith('/rectcontain3') ||
      url.endsWith('/rectcrop1') ||
      url.endsWith('/rectcrop2') ||
      url.endsWith('/rectcrop3') ||
      url.endsWith('/squarecrop1') ||
      url.endsWith('/squarecrop2') ||
      url.endsWith('/squarecrop3') ||
      url.endsWith('/squarecover1') ||
      url.endsWith('/squarecover2') ||
      url.endsWith('/squarecover3'))
  ) {
    const path = url
      .replace(WARPCAST_CLOUDFLARE_CDN_PREFIX, '')
      .replace('/original', `/${options}`)
      .replace('/rectcontain1', `/${options}`)
      .replace('/rectcontain2', `/${options}`)
      .replace('/rectcontain3', `/${options}`)
      .replace('/rectcontain1', `/${options}`)
      .replace('/rectcrop1', `/${options}`)
      .replace('/rectcrop2', `/${options}`)
      .replace('/rectcrop3', `/${options}`)
      .replace('/squarecrop1', `/${options}`)
      .replace('/squarecrop2', `/${options}`)
      .replace('/squarecrop3', `/${options}`)
      .replace('/squarecover1', `/${options}`)
      .replace('/squarecover2', `/${options}`)
      .replace('/squarecover3', `/${options}`);

    return `https://wrpcd.net/cdn-cgi/imagedelivery/BXluQx4ige9GuW0Ia56BHw${path}`;
  }

  // Cloudflare image but not Warpcast - Cloudflare won't allow re-transform so attempt
  // to transform from those serving these images.
  if (
    url.startsWith('https://imagedelivery.net') &&
    url.indexOf('BXluQx4ige9GuW0Ia56BHw') === -1
  ) {
    return url
      .replace('/original', `/${options}`)
      .replace('/public', `/${options}`);
  }

  return `${WRPCDN_PREFIX}/${options}/${encodeURIComponent(url)}`;
}

export { applyCloudflarePath };
