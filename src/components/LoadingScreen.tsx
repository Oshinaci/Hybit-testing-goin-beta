import React, { useEffect, useRef, useState } from 'react';

interface LoadingScreenProps {
  duration?: number; // total duration in ms, default 3200ms
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  duration = 3200,
  onComplete,
}) => {
  // Top water wave layers (flowing downwards)
  const [topMainPath, setTopMainPath] = useState<string>('');
  const [topMidPath, setTopMidPath] = useState<string>('');
  const [topFrontPath, setTopFrontPath] = useState<string>('');

  // Bottom water wave layers (flowing upwards)
  const [bottomMainPath, setBottomMainPath] = useState<string>('');
  const [bottomMidPath, setBottomMidPath] = useState<string>('');
  const [bottomFrontPath, setBottomFrontPath] = useState<string>('');

  const [isFullyFilled, setIsFullyFilled] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  // Vibration / Wobble state (during pause when logo is full)
  const [shake, setShake] = useState({
    x: 0,
    y: 0,
    rot: 0,
  });

  // Dispersion state: 4 elements slowly moving away from each other
  // Top -> UP, Bottom -> DOWN, Left -> LEFT, Right -> RIGHT
  const [dispersion, setDispersion] = useState({
    leftX: 0,
    rightX: 0,
    topY: 0,
    bottomY: 0,
    opacity: 1,
  });

  // Use refs to prevent unintended closure or re-render issues
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const durationRef = useRef(duration);
  durationRef.current = duration;

  const animationFrameRef = useRef<number | null>(null);
  const completedRef = useRef<boolean>(false);

  useEffect(() => {
    const startTime = performance.now();
    completedRef.current = false;

    // ViewBox of Hybit logo is 0 0 100 100:
    // Center column top segment top edge: y = 25
    // Center column bottom segment bottom edge: y = 75
    // Middle meeting intersection: y = 50
    const startTopY = 12;
    const targetCenterY = 50;
    const startBottomY = 88;

    // Choreographed timeline breakdown:
    // 1. Water filling: 0ms to 2050ms (2.05s)
    // 2. Pause + Bergetar / Bergoyang (Vibration & Wobble): 2050ms to 2550ms (500ms)
    // 3. Perlahan Menjauh (Slow graceful outward dispersion): 2550ms to 3200ms (650ms)
    const fillDuration = 2050;
    const pauseDuration = 500;
    const disperseStart = fillDuration + pauseDuration; // 2550ms

    const renderFrame = (now: number) => {
      const totalDuration = durationRef.current;
      const elapsed = now - startTime;

      // -----------------------------------------------------------------
      // PHASE 1: WATER FILLING (0 to 2050ms)
      // -----------------------------------------------------------------
      if (elapsed < fillDuration) {
        const rawProgress = Math.min(elapsed / fillDuration, 1);

        // Smooth hydraulic flow curve
        const progress =
          rawProgress < 0.5
            ? 2 * rawProgress * rawProgress
            : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;

        const timeSec = elapsed * 0.001;

        // Wave amplitude: prominent & visibly undulating, decaying as water nears the middle
        const isNearFull = rawProgress >= 0.985;
        const amp = isNearFull ? 0 : 5.8 * Math.pow(1 - rawProgress, 0.9);
        const ampMid = amp * 0.75;
        const ampFront = amp * 1.15;

        const currentTopY = startTopY + (targetCenterY - startTopY) * progress;
        const currentBottomY = startBottomY - (startBottomY - targetCenterY) * progress;

        // Top Main Wave
        let topMain = `M 0 0 L 100 0 `;
        for (let x = 100; x >= 0; x -= 1) {
          const wave =
            amp * Math.sin(x * 0.22 + timeSec * 5.8) +
            amp * 0.42 * Math.cos(x * 0.38 - timeSec * 4.4) +
            amp * 0.28 * Math.sin(x * 0.11 + timeSec * 2.6);
          const y = isNearFull ? 50.5 : currentTopY + wave;
          topMain += `L ${x} ${y.toFixed(2)} `;
        }
        topMain += `L 0 0 Z`;

        // Top Mid Wave
        let topMid = `M 0 0 L 100 0 `;
        for (let x = 100; x >= 0; x -= 1) {
          const wave =
            ampMid * Math.sin(x * 0.25 - timeSec * 4.8 + 1.2) +
            ampMid * 0.38 * Math.cos(x * 0.42 + timeSec * 3.6) +
            ampMid * 0.25 * Math.sin(x * 0.14 - timeSec * 2.2);
          const y = isNearFull ? 50.5 : currentTopY + wave;
          topMid += `L ${x} ${y.toFixed(2)} `;
        }
        topMid += `L 0 0 Z`;

        // Top Front Wave
        let topFront = `M 0 0 L 100 0 `;
        for (let x = 100; x >= 0; x -= 1) {
          const wave =
            ampFront * Math.sin(x * 0.20 + timeSec * 6.6 + 2.1) +
            ampFront * 0.35 * Math.cos(x * 0.34 - timeSec * 5.0) +
            ampFront * 0.20 * Math.sin(x * 0.09 + timeSec * 3.1);
          const y = isNearFull ? 50.5 : currentTopY + wave;
          topFront += `L ${x} ${y.toFixed(2)} `;
        }
        topFront += `L 0 0 Z`;

        // Bottom Main Wave
        let bottomMain = `M 0 100 L 100 100 `;
        for (let x = 100; x >= 0; x -= 1) {
          const wave =
            amp * Math.sin(x * 0.22 - timeSec * 5.8 + Math.PI) +
            amp * 0.42 * Math.cos(x * 0.38 + timeSec * 4.4 + 1.5) +
            amp * 0.28 * Math.sin(x * 0.11 - timeSec * 2.6 + 0.8);
          const y = isNearFull ? 49.5 : currentBottomY + wave;
          bottomMain += `L ${x} ${y.toFixed(2)} `;
        }
        bottomMain += `L 0 100 Z`;

        // Bottom Mid Wave
        let bottomMid = `M 0 100 L 100 100 `;
        for (let x = 100; x >= 0; x -= 1) {
          const wave =
            ampMid * Math.sin(x * 0.25 + timeSec * 4.8 + Math.PI + 1.2) +
            ampMid * 0.38 * Math.cos(x * 0.42 - timeSec * 3.6 + 2.2) +
            ampMid * 0.25 * Math.sin(x * 0.14 + timeSec * 2.2 + 1.4);
          const y = isNearFull ? 49.5 : currentBottomY + wave;
          bottomMid += `L ${x} ${y.toFixed(2)} `;
        }
        bottomMid += `L 0 100 Z`;

        // Bottom Front Wave
        let bottomFront = `M 0 100 L 100 100 `;
        for (let x = 100; x >= 0; x -= 1) {
          const wave =
            ampFront * Math.sin(x * 0.20 - timeSec * 6.6 + Math.PI + 2.1) +
            ampFront * 0.35 * Math.cos(x * 0.34 + timeSec * 5.0 + 0.6) +
            ampFront * 0.20 * Math.sin(x * 0.09 - timeSec * 3.1 + 1.8);
          const y = isNearFull ? 49.5 : currentBottomY + wave;
          bottomFront += `L ${x} ${y.toFixed(2)} `;
        }
        bottomFront += `L 0 100 Z`;

        setTopMainPath(topMain);
        setTopMidPath(topMid);
        setTopFrontPath(topFront);
        setBottomMainPath(bottomMain);
        setBottomMidPath(bottomMid);
        setBottomFrontPath(bottomFront);
      } else {
        // -----------------------------------------------------------------
        // LOGO FULLY FORMED (PHASE 2 & PHASE 3)
        // -----------------------------------------------------------------
        setIsFullyFilled(true);

        if (elapsed < disperseStart) {
          // ---------------------------------------------------------------
          // PHASE 2: BERGETAR / BERGOYANG (Vibration & Fluid Wobble)
          // ---------------------------------------------------------------
          const shakeElapsed = elapsed - fillDuration;
          const pShake = Math.min(shakeElapsed / pauseDuration, 1);

          // Smooth envelope: rises from 0, peaks energetically, then cleanly settles
          const envelope = Math.sin(pShake * Math.PI);
          const ampX = 1.8 * envelope;
          const ampY = 1.3 * envelope;
          const ampRot = 1.6 * envelope; // subtle rotational wobble (degrees)

          // High-frequency kinetic oscillation
          const shakeX =
            Math.sin(shakeElapsed * 0.052) * ampX +
            Math.cos(shakeElapsed * 0.092) * (ampX * 0.35);
          const shakeY =
            Math.cos(shakeElapsed * 0.058) * ampY +
            Math.sin(shakeElapsed * 0.105) * (ampY * 0.3);
          const shakeRot = Math.sin(shakeElapsed * 0.046) * ampRot;

          setShake({
            x: shakeX,
            y: shakeY,
            rot: shakeRot,
          });

          setDispersion({
            leftX: 0,
            rightX: 0,
            topY: 0,
            bottomY: 0,
            opacity: 1,
          });
        } else {
          // ---------------------------------------------------------------
          // PHASE 3: PERLAHAN MENJAUH (Slow graceful outward dispersion)
          // ---------------------------------------------------------------
          setShake({ x: 0, y: 0, rot: 0 });

          const disperseElapsed = elapsed - disperseStart;
          const disperseDuration = Math.max(1, totalDuration - disperseStart);
          const dispProgress = Math.min(disperseElapsed / disperseDuration, 1);

          // Smooth, elegant deceleration curve ("perlahan menjauh")
          const moveCurve = 1 - Math.pow(1 - dispProgress, 2.4);
          const maxDistance = 42;

          // Outward travel offsets:
          // Left capsule moves LEFT (-X)
          // Right capsule moves RIGHT (+X)
          // Top segment moves UP (-Y)
          // Bottom segment moves DOWN (+Y)
          const leftX = -moveCurve * maxDistance;
          const rightX = moveCurve * maxDistance;
          const topY = -moveCurve * maxDistance;
          const bottomY = moveCurve * maxDistance;

          // Fade out gently as elements drift apart
          const opacity =
            dispProgress < 0.25
              ? 1
              : Math.max(0, 1 - (dispProgress - 0.25) / 0.75);

          setDispersion({
            leftX,
            rightX,
            topY,
            bottomY,
            opacity,
          });
        }
      }

      // Smooth backdrop dissolve in the final 140ms
      if (elapsed >= totalDuration - 140) {
        setIsFadingOut(true);
      }

      // Complete at totalDuration
      if (elapsed >= totalDuration) {
        if (!completedRef.current) {
          completedRef.current = true;
          onCompleteRef.current();
        }
      } else {
        animationFrameRef.current = requestAnimationFrame(renderFrame);
      }
    };

    animationFrameRef.current = requestAnimationFrame(renderFrame);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []); // Run ONCE on mount; relies on refs for dynamic values

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#09090B] select-none touch-none overscroll-none pointer-events-auto transition-opacity duration-150 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="status"
      aria-label="Loading Hybit"
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
      }}
      onTouchEnd={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseMove={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      onWheel={(e) => {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
      }}
    >
      {/* Pristine canvas - STRICTLY NO text, NO gradients, NO AI slop halos */}
      <div className="relative flex items-center justify-center w-44 h-44 sm:w-48 sm:h-48 md:w-56 md:h-56 max-w-[70vw] max-h-[70vw]">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* The exact geometric mask of the Hybit Logo Element */}
            <clipPath id="hybit-liquid-mask">
              {/* Left Column Capsule */}
              <rect x="23.5" y="32" width="12" height="36" rx="6" />

              {/* Center Column Top Segment */}
              <path d="M 44 47.2 L 44 25 A 6 6 0 0 1 56 25 L 56 47.2 Z" />

              {/* Center Column Bottom Segment */}
              <path d="M 44 52.8 L 56 52.8 L 56 75 A 6 6 0 0 1 44 75 Z" />

              {/* Right Column Capsule */}
              <rect x="64.5" y="32" width="12" height="36" rx="6" />
            </clipPath>
          </defs>

          {/* 1. Base Vessel/Silhouette: Visible only while filling */}
          {!isFullyFilled && (
            <g fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.16)" strokeWidth="0.6">
              <rect x="23.5" y="32" width="12" height="36" rx="6" />
              <path d="M 44 47.2 L 44 25 A 6 6 0 0 1 56 25 L 56 47.2 Z" />
              <path d="M 44 52.8 L 56 52.8 L 56 75 A 6 6 0 0 1 44 75 Z" />
              <rect x="64.5" y="32" width="12" height="36" rx="6" />
            </g>
          )}

          {/* 2. Flowing Liquid Water: Pure White (#FFFFFF) Multi-layer Waves (Phase 1) */}
          {!isFullyFilled && (
            <g clipPath="url(#hybit-liquid-mask)">
              {/* Top Waves */}
              {topFrontPath && <path d={topFrontPath} fill="rgba(255, 255, 255, 0.35)" />}
              {topMidPath && <path d={topMidPath} fill="rgba(255, 255, 255, 0.65)" />}
              {topMainPath && <path d={topMainPath} fill="#FFFFFF" />}

              {/* Bottom Waves */}
              {bottomFrontPath && <path d={bottomFrontPath} fill="rgba(255, 255, 255, 0.35)" />}
              {bottomMidPath && <path d={bottomMidPath} fill="rgba(255, 255, 255, 0.65)" />}
              {bottomMainPath && <path d={bottomMainPath} fill="#FFFFFF" />}
            </g>
          )}

          {/* 3. Fully Filled State (Phase 2: Bergetar/Bergoyang & Phase 3: Perlahan Menjauh) */}
          {isFullyFilled && (
            <g
              transform={`translate(${shake.x.toFixed(2)}, ${shake.y.toFixed(2)}) rotate(${shake.rot.toFixed(2)}, 50, 50)`}
            >
              {/* Left Column Capsule -> Glides slowly LEFT (-X) */}
              <g
                transform={`translate(${dispersion.leftX.toFixed(2)}, 0)`}
                opacity={dispersion.opacity}
              >
                <rect x="23.5" y="32" width="12" height="36" rx="6" fill="#FFFFFF" />
              </g>

              {/* Center Column Top Segment -> Glides slowly UP (-Y) */}
              <g
                transform={`translate(0, ${dispersion.topY.toFixed(2)})`}
                opacity={dispersion.opacity}
              >
                <path d="M 44 47.2 L 44 25 A 6 6 0 0 1 56 25 L 56 47.2 Z" fill="#FFFFFF" />
              </g>

              {/* Center Column Bottom Segment -> Glides slowly DOWN (+Y) */}
              <g
                transform={`translate(0, ${dispersion.bottomY.toFixed(2)})`}
                opacity={dispersion.opacity}
              >
                <path d="M 44 52.8 L 56 52.8 L 56 75 A 6 6 0 0 1 44 75 Z" fill="#FFFFFF" />
              </g>

              {/* Right Column Capsule -> Glides slowly RIGHT (+X) */}
              <g
                transform={`translate(${dispersion.rightX.toFixed(2)}, 0)`}
                opacity={dispersion.opacity}
              >
                <rect x="64.5" y="32" width="12" height="36" rx="6" fill="#FFFFFF" />
              </g>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
