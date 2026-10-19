import React from 'react';

export interface CurvedDividerProps {
  direction?: 'toDark' | 'toLight';
  className?: string;
  hasGoldBorder?: boolean;
  lightColor?: string;
  lightBrownColor?: string;
  darkBrownColor?: string;
  strokeWidth?: number;
}

/**
 * Three-tier multi-layered organic curved divider
 * Layer 1: Light ivory background (#FAF5EE / #FAF7F2)
 * Layer 2: Curved warm light brown layer (#966035) with razor-sharp 1px gold hairline
 * Layer 3: Curved rich dark brown layer (#3D1A12) with razor-sharp 1px gold hairline (3rd layer)
 */
export const CurvedDivider: React.FC<CurvedDividerProps> = ({
  direction = 'toDark',
  className = '',
  hasGoldBorder = true,
  lightColor,
  lightBrownColor = '#966035',
  darkBrownColor = '#3D1A12',
  strokeWidth = 1,
}) => {
  const isToDark = direction === 'toDark';
  const resolvedLightColor = lightColor || (isToDark ? '#FAF5EE' : '#FAF7F2');

  // Enforce strokeWidth strictly between 1px and 2px as requested ("only 1px or 2px that good")
  const clampedStrokeWidth = Math.min(Math.max(strokeWidth, 1), 2);

  if (isToDark) {
    // Transition from Light Ivory Section into Dark Bridal Section
    return (
      <div
        className={`relative w-full overflow-hidden leading-none select-none ${className}`}
        style={{ backgroundColor: resolvedLightColor }}
      >
        <svg
          className="relative block w-full h-14 sm:h-20 md:h-24 lg:h-28"
          viewBox="0 0 1440 180"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Layer 2: Curved Warm Light Brown Wave */}
          <path
            d="M0,24 C360,84 760,114 1100,64 C1260,44 1370,28 1440,18 L1440,180 L0,180 Z"
            fill={lightBrownColor}
          />
          {hasGoldBorder && (
            <path
              d="M0,24 C360,84 760,114 1100,64 C1260,44 1370,28 1440,18"
              fill="none"
              stroke="#C7A15B"
              strokeOpacity="0.75"
              strokeWidth={clampedStrokeWidth}
              vectorEffect="non-scaling-stroke"
            />
          )}

          {/* Layer 3: Curved Rich Dark Brown Wave (3rd Layer merging into Section) */}
          <path
            d="M0,64 C340,124 740,148 1080,104 C1240,84 1360,68 1440,58 L1440,180 L0,180 Z"
            fill={darkBrownColor}
          />
          {hasGoldBorder && (
            <path
              d="M0,64 C340,124 740,148 1080,104 C1240,84 1360,68 1440,58"
              fill="none"
              stroke="#C7A15B"
              strokeOpacity="0.75"
              strokeWidth={clampedStrokeWidth}
              vectorEffect="non-scaling-stroke"
            />
          )}
        </svg>
      </div>
    );
  }

  // Transition from Dark Bridal Section back into Light Section (toLight)
  return (
    <div
      className={`relative w-full overflow-hidden leading-none select-none ${className}`}
      style={{ backgroundColor: darkBrownColor }}
    >
      <svg
        className="relative block w-full h-14 sm:h-20 md:h-24 lg:h-28"
        viewBox="0 0 1440 180"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 2: Curved Warm Light Brown Wave */}
        <path
          d="M0,28 C340,88 740,44 1080,78 C1240,94 1360,78 1440,48 L1440,180 L0,180 Z"
          fill={lightBrownColor}
        />
        {hasGoldBorder && (
          <path
            d="M0,28 C340,88 740,44 1080,78 C1240,94 1360,78 1440,48"
            fill="none"
            stroke="#C7A15B"
            strokeOpacity="0.75"
            strokeWidth={clampedStrokeWidth}
            vectorEffect="non-scaling-stroke"
          />
        )}

        {/* Layer 1: Curved Light Section Color Layer (Next Section Base) */}
        <path
          d="M0,68 C340,128 740,84 1080,118 C1240,134 1360,118 1440,88 L1440,180 L0,180 Z"
          fill={resolvedLightColor}
        />
        {hasGoldBorder && (
          <path
            d="M0,68 C340,128 740,84 1080,118 C1240,134 1360,118 1440,88"
            fill="none"
            stroke="#C7A15B"
            strokeOpacity="0.75"
            strokeWidth={clampedStrokeWidth}
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
    </div>
  );
};
