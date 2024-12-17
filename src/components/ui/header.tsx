'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

function HeaderLogoSvg({
  className,
  onClick,
}: {
  className: string;
  onClick: () => void;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      className={className}
      onClick={onClick}
    >
      <g clipPath="url(#clip0_12351_27116)">
        <circle cx="15" cy="15" r="15" fill="#7C65C1" />
        <circle cx="15" cy="15" r="15" fill="#7C65C1" />
        <path
          d="M14.9998 22.5093C15.8475 22.5093 17.6744 25.2722 18.471 24.9781C19.2677 24.6838 18.9169 21.3757 19.5664 20.8225C20.2158 20.2694 23.3651 21.1944 23.7892 20.4494C24.213 19.7044 21.8491 17.3988 21.9964 16.5516C22.1436 15.7045 25.1421 14.3584 24.9947 13.5113C24.8476 12.664 21.5765 12.44 21.1524 11.695C20.7286 10.9499 22.173 7.96306 21.5235 7.40978C20.8742 6.85675 18.2264 8.81905 17.4298 8.52475C16.6331 8.23046 15.8477 5 15 5C14.1523 5 13.3669 8.23042 12.5702 8.52475C11.7736 8.81908 9.12584 6.85675 8.47646 7.40978C7.82712 7.96282 9.27143 10.95 8.8476 11.695C8.42376 12.44 5.15245 12.6641 5.00524 13.5113C4.85806 14.3586 7.85643 15.7045 8.0036 16.5516C8.15079 17.3988 5.78678 19.7044 6.21078 20.4494C6.63461 21.1944 9.78419 20.2696 10.4336 20.8225C11.0829 21.3755 10.7323 24.6836 11.529 24.9781C12.3256 25.2723 14.1523 22.5093 15.0002 22.5093H14.9998Z"
          fill="white"
        />
        <path
          d="M12.4328 18.5L11 12.5H12.7588L13.5003 16.3437H13.5469L14.3421 12.5H16.0579L16.8746 16.3164H16.9212L17.6412 12.5H19.4L17.9636 18.5H16.0901L15.2304 15.0039H15.1696L14.3099 18.5H12.4328Z"
          fill="#7C65C1"
        />
      </g>
      <defs>
        <clipPath id="clip0_12351_27116">
          <rect width="30" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function Header() {
  const router = useRouter();

  const onLogoClick = React.useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <div className="w-full flex flex-row items-center justify-between p-4">
      <HeaderLogoSvg className="opacity-100" onClick={onLogoClick} />
      <div className="text-xl font-semibold pt-[2px] leading-[30px] h-[30px]">
        Warpcast Rewards
      </div>
      <div className="opacity-0 h-[30px] w-[30px]" />
    </div>
  );
}

export { Header };
