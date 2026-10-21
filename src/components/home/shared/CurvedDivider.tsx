import React from 'react';

export interface CurvedDividerProps {
  direction?: 'toDark' | 'toLight';
  className?: string;
  hasGoldBorder?: boolean;
  lightColor?: string;
  brownColor?: string;
  darkColor?: string;
  strokeWidth?: number;
}

/**
 * CurvedDivider featuring the authentic original Monarch color palette:
 * - Light ivory (#FAF5EE / #FAF7F2 / #F7F0E5)
 * - Authentic royal burgundy/brown (#291116)
 * - Deep dark section color (#0E0507 - the dark box also curved)
 * - Subtle 1.5px gold hairline accent along each curve
 */
export const CurvedDivider: React.FC<CurvedDividerProps> = ({
  direction = 'toDark',
  className = '',
  hasGoldBorder = true,
  lightColor,
  brownColor = '#291116',
  darkColor = '#0E0507',
  strokeWidth = 1.5,
}) => {
  const isToDark = direction === 'toDark';
  const resolvedLightColor = lightColor || (isToDark ? '#FAF5EE' : '#FAF7F2');
  const clampedStrokeWidth = Math.min(Math.max(strokeWidth, 1), 2);

  if (isToDark) {
    // Transition from Light Ivory into Dark Section:
    // Layer 1: Ivory base
    // Layer 2: Curved #291116 ribbon with gold hairline
    // Layer 3: Curved #0E0507 (the dark color of the section box is also curved!) with gold hairline
    return (
      <div
        className={`relative w-full overflow-hidden leading-none select-none ${className}`}
        style={{ backgroundColor: resolvedLightColor }}
      >
        <svg
          className="relative block w-full h-12 sm:h-18 md:h-22 lg:h-24"
          viewBox="0 0 1440 140"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Layer 2: Curved #291116 Wave */}
          <path
            d="M0,20 C340,75 740,95 1080,55 C1240,38 1360,26 1440,18 L1440,140 L0,140 Z"
            fill={brownColor}
          />
          {hasGoldBorder && (
            <path
              d="M0,20 C340,75 740,95 1080,55 C1240,38 1360,26 1440,18"
              fill="none"
              stroke="rgba(199, 161, 91, 0.45)"
              strokeWidth={clampedStrokeWidth}
              vectorEffect="non-scaling-stroke"
            />
          )}

          {/* Layer 3: Curved #0E0507 Dark Color Wave ("the dark brown it also curved") */}
          <path
            d="M0,52 C340,107 740,127 1080,87 C1240,70 1360,58 1440,50 L1440,140 L0,140 Z"
            fill={darkColor}
          />
          {hasGoldBorder && (
            <path
              d="M0,52 C340,107 740,127 1080,87 C1240,70 1360,58 1440,50"
              fill="none"
              stroke="rgba(199, 161, 91, 0.45)"
              strokeWidth={clampedStrokeWidth}
              vectorEffect="non-scaling-stroke"
            />
          )}
        </svg>
      </div>
    );
  }

  // Transition from Dark Section back to Light Ivory:
  // Layer 3: Dark section base (#0E0507)
  // Layer 2: Curved #291116 ribbon with gold hairline
  // Layer 1: Curved Ivory wave with gold hairline, expanding into the next section
  return (
    <div
      className={`relative w-full overflow-hidden leading-none select-none ${className}`}
      style={{ backgroundColor: darkColor }}
    >
      <svg
        className="relative block w-full h-12 sm:h-18 md:h-22 lg:h-24"
        viewBox="0 0 1440 140"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 2: Curved #291116 Wave */}
        <path
          d="M0,20 C340,75 740,40 1080,65 C1240,80 1360,65 1440,35 L1440,140 L0,140 Z"
          fill={brownColor}
        />
        {hasGoldBorder && (
          <path
            d="M0,20 C340,75 740,40 1080,65 C1240,80 1360,65 1440,35"
            fill="none"
            stroke="rgba(199, 161, 91, 0.45)"
            strokeWidth={clampedStrokeWidth}
            vectorEffect="non-scaling-stroke"
          />
        )}

        {/* Layer 1: Curved Light Section Color Layer (Next Section Base) */}
        <path
          d="M0,52 C340,107 740,72 1080,97 C1240,112 1360,97 1440,67 L1440,140 L0,140 Z"
          fill={resolvedLightColor}
        />
        {hasGoldBorder && (
          <path
            d="M0,52 C340,107 740,72 1080,97 C1240,112 1360,97 1440,67"
            fill="none"
            stroke="rgba(199, 161, 91, 0.45)"
            strokeWidth={clampedStrokeWidth}
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
    </div>
  );
};
