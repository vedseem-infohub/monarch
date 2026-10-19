import React from 'react';

interface CurvedDividerProps {
  direction?: 'toDark' | 'toLight';
  className?: string;
  hasGoldBorder?: boolean;
}

export const CurvedDivider: React.FC<CurvedDividerProps> = ({
  direction = 'toDark',
  className = '',
  hasGoldBorder = true,
}) => {
  // If transitioning to dark: the top background is ivory (#F7F0E5), the filled shape is burgundy (#291116)
  // If transitioning to light: the top background is burgundy (#291116), the filled shape is ivory (#F7F0E5)
  const isToDark = direction === 'toDark';

  const fillColor = isToDark ? '#291116' : '#F7F0E5';
  const bgColor = isToDark ? 'bg-[#F7F0E5]' : 'bg-[#291116]';

  return (
    <div className={`relative w-full overflow-hidden leading-none ${bgColor} ${className}`}>
      <svg
        className="relative block w-full h-10 sm:h-16 md:h-20"
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {hasGoldBorder && (
          <path
            d="M0,0 C320,80 720,120 1080,70 C1240,48 1360,25 1440,0 L1440,120 L0,120 Z"
            fill="none"
            stroke="rgba(199, 161, 91, 0.4)"
            strokeWidth="2"
          />
        )}
        <path
          d="M0,20 C320,95 720,130 1080,85 C1240,65 1360,40 1440,20 L1440,120 L0,120 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};
