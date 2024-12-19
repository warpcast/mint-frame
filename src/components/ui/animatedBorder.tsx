import React from "react";

interface AnimatedBorderProps {
  children: React.ReactNode;
  startOffset?: number;
}

const AnimatedBorder = ({ children }: AnimatedBorderProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-0">
        <svg className="w-full h-full">
          <defs>
            <linearGradient id="borderGradient">
              <stop
                offset="0%"
                stopColor="var(--action-foreground)"
                stopOpacity="0"
              />
              <stop
                offset="50%"
                stopColor="var(--action-foreground)"
                stopOpacity="1"
              />
              <stop
                offset="100%"
                stopColor="var(--action-foreground)"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
          <rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="9"
            ry="9"
            fill="none"
            stroke="url(#borderGradient)"
            strokeWidth="2"
            pathLength="100"
            className="animate-border-slide"
            strokeDasharray="30 70"
          />
        </svg>
      </div>
      {children}
    </div>
  );
};

export { AnimatedBorder };
