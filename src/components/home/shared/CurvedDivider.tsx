import React from 'react';

export interface CurvedDividerProps {
  direction?: 'toDark' | 'toLight';
  className?: string;
  hasGoldBorder?: boolean;
  lightColor?: string;
  lightBrownColor?: string;
  darkBrownColor?: string;
}

/**
 * Three-tier multi-layered organic curved divider
 * Layer 1: Light ivory background
 * Layer 2: Curved light brown layer with gold crest accent
 * Layer 3: Curved dark brown layer with royal gold accent (3rd layer)
 */
export const CurvedDivider: React.FC<CurvedDividerProps> = ({
  direction = 'toDark',
  className = '',
  hasGoldBorder = true,
  lightColor,
  lightBrownColor = '#8C6036',
  darkBrownColor = '#240E13',
}) => {
  const isToDark = direction === 'toDark';
  const resolvedLightColor = lightColor || (isToDark ? '#FAF5EE' : '#FAF7F2');

  if (isToDark) {
    // Transition from Light Section into Dark Bridal Section
    return (
      <div
        className={`relative w-full overflow-hidden leading-none ${className}`}
        style={{ backgroundColor: resolvedLightColor }}
      >
        <svg
          className="relative block w-full h-12 sm:h-20 md:h-24 lg:h-28"
          viewBox="0 0 1440 160"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Layer 2: Curved Light Brown Layer */}
          <path
            d="M0,28 C360,98 760,128 1100,78 C1260,54 1370,32 1440,22 L1440,160 L0,160 Z"
            fill={lightBrownColor}
          />
          {hasGoldBorder && (
            <path
              d="M0,28 C360,98 760,128 1100,78 C1260,54 1370,32 1440,22"
              fill="none"
              stroke="rgba(199, 161, 91, 0.55)"
              strokeWidth="2"
            />
          )}

          {/* Layer 3: Curved Dark Brown Layer ("here dark brown also curve that 3rd layer") */}
          <path
            d="M0,68 C340,138 740,160 1080,118 C1240,94 1360,72 1440,62 L1440,160 L0,160 Z"
            fill={darkBrownColor}
          />
          {hasGoldBorder && (
            <path
              d="M0,68 C340,138 740,160 1080,118 C1240,94 1360,72 1440,62"
              fill="none"
              stroke="rgba(223, 190, 127, 0.45)"
              strokeWidth="1.5"
            />
          )}
        </svg>
      </div>
    );
  }

  // Transition from Dark Bridal Section back into Light Section (toLight)
  return (
    <div
      className={`relative w-full overflow-hidden leading-none ${className}`}
      style={{ backgroundColor: darkBrownColor }}
    >
      <svg
        className="relative block w-full h-12 sm:h-20 md:h-24 lg:h-28"
        viewBox="0 0 1440 160"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 2: Curved Light Brown Layer */}
        <path
          d="M0,32 C340,98 740,48 1080,88 C1240,108 1360,88 1440,58 L1440,160 L0,160 Z"
          fill={lightBrownColor}
        />
        {hasGoldBorder && (
          <path
            d="M0,32 C340,98 740,48 1080,88 C1240,108 1360,88 1440,58"
            fill="none"
            stroke="rgba(199, 161, 91, 0.55)"
            strokeWidth="2"
          />
        )}

        {/* Layer 1: Curved Light Section Color Layer (Next Section Base) */}
        <path
          d="M0,72 C340,138 740,88 1080,128 C1240,148 1360,128 1440,98 L1440,160 L0,160 Z"
          fill={resolvedLightColor}
        />
        {hasGoldBorder && (
          <path
            d="M0,72 C340,138 740,88 1080,128 C1240,148 1360,128 1440,98"
            fill="none"
            stroke="rgba(199, 161, 91, 0.4)"
            strokeWidth="1.5"
          />
        )}
      </svg>
    </div>
  );
};
