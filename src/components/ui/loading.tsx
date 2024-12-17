import React from 'react';

import SplashImage from '../../../public/splash.png';

const FRAME_SPLASH_IMAGE_SIZE = 88;

function Loading() {
  return (
    <div className="inset-0 absolute w-full items-center justify-center flex flex-col flex-grow h-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SplashImage.src}
        alt="Warpcast Rewards splash screen image"
        className="animate-pulse"
        style={{ marginTop: `-${FRAME_SPLASH_IMAGE_SIZE}px` }}
        width={FRAME_SPLASH_IMAGE_SIZE}
        height={FRAME_SPLASH_IMAGE_SIZE}
      />
    </div>
  );
}

export { Loading };
