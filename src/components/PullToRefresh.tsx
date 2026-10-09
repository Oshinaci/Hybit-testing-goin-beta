import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '../context/ToastContext';

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh?: () => Promise<void> | void;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  children,
  onRefresh,
}) => {
  const { showToast } = useToast();
  const [pullDistance, setPullDistance] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isPulling, setIsPulling] = useState<boolean>(false);

  const startYRef = useRef<number>(0);
  const canPullRef = useRef<boolean>(false);
  const isRefreshingRef = useRef<boolean>(false);
  isRefreshingRef.current = isRefreshing;

  // Threshold to trigger refresh and resting distance while refreshing
  const PULL_THRESHOLD = 75;
  const REFRESH_HOLD_DISTANCE = 70;

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setPullDistance(REFRESH_HOLD_DISTANCE);

    try {
      if (onRefresh) {
        await onRefresh();
      } else {
        // Natural network/wallet sync simulation
        await new Promise((resolve) => setTimeout(resolve, 1600));
      }
      showToast('Data Diperbarui', 'Saldo dan riwayat transaksi telah disinkronkan.', 'info');
    } catch {
      showToast('Gagal Memperbarui', 'Silakan coba beberapa saat lagi.', 'error');
    } finally {
      setIsRefreshing(false);
      setPullDistance(0);
    }
  }, [onRefresh, showToast]);

  useEffect(() => {
    // -------------------------------------------------------------
    // Touch Events for Mobile Web
    // -------------------------------------------------------------
    const handleTouchStart = (e: TouchEvent) => {
      if (isRefreshingRef.current) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      if (scrollTop <= 0) {
        startYRef.current = e.touches[0].clientY;
        canPullRef.current = true;
      } else {
        canPullRef.current = false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!canPullRef.current || isRefreshingRef.current) return;
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - startYRef.current;

      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      if (scrollTop <= 0 && deltaY > 0) {
        // Prevent default browser refresh
        if (e.cancelable) {
          e.preventDefault();
        }

        // Fluid logarithmic rubber-band curve
        const distance = Math.min(Math.pow(deltaY, 0.82) * 1.45, 120);
        setPullDistance(distance);
        setIsPulling(true);
      } else {
        if (canPullRef.current && deltaY < 0) {
          canPullRef.current = false;
        }
        setPullDistance(0);
        setIsPulling(false);
      }
    };

    const handleTouchEnd = () => {
      if (!canPullRef.current || isRefreshingRef.current) return;
      canPullRef.current = false;
      setIsPulling(false);

      setPullDistance((prev) => {
        if (prev >= PULL_THRESHOLD) {
          handleRefresh();
          return REFRESH_HOLD_DISTANCE;
        }
        return 0;
      });
    };

    // -------------------------------------------------------------
    // Mouse Events for Desktop Testing in AI Studio Preview
    // -------------------------------------------------------------
    let mouseStartY = 0;
    let isMouseDown = false;

    const handleMouseDown = (e: MouseEvent) => {
      if (isRefreshingRef.current) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      if (scrollTop <= 0 && e.clientY < 200) {
        mouseStartY = e.clientY;
        isMouseDown = true;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown || isRefreshingRef.current) return;
      const dy = e.clientY - mouseStartY;
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      if (scrollTop <= 0 && dy > 0) {
        const distance = Math.min(Math.pow(dy, 0.82) * 1.45, 120);
        setPullDistance(distance);
        setIsPulling(true);
      }
    };

    const handleMouseUp = () => {
      if (!isMouseDown || isRefreshingRef.current) return;
      isMouseDown = false;
      setIsPulling(false);

      setPullDistance((prev) => {
        if (prev >= PULL_THRESHOLD) {
          handleRefresh();
          return REFRESH_HOLD_DISTANCE;
        }
        return 0;
      });
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);

      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleRefresh]);

  const progress = Math.min(pullDistance / PULL_THRESHOLD, 1);
  const isVisible = pullDistance > 0 || isRefreshing;

  // As entire page (and topbar) shifts down by (pullDistance * 0.54)px,
  // the indicator is positioned in the opening gap ABOVE the topbar!
  const pageTranslateY = pullDistance > 0 ? pullDistance * 0.54 : 0;
  const indicatorY = isVisible ? Math.min(pageTranslateY * 0.35, 20) : -48;

  return (
    <div className="relative w-full">
      {/* 
        PULL TO REFRESH INDICATOR:
        - PLACED ABOVE THE TOPBAR!
        - Positioned dead-center horizontally: fixed top-0 left-0 right-0 flex justify-center
        - Appears in the gap above the descending topbar
        - 100% TRANSPARENT: NO card, NO background, NO border, NO separator line
        - EXACT ORIGINAL HYBIT LOGO GEOMETRY: viewBox="0 0 100 100", identical mark shapes
        - MEDIUM PROPORTIONAL SIZE: w-10 h-10 on mobile (40px), sm:w-11 sm:h-11 (44px) on desktop
        - SLOW & SMOOTH ROTATION: animate-spin-slow (1.8s per revolution)
      */}
      <div
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none flex justify-center items-start pt-3 sm:pt-4"
        aria-hidden={!isVisible}
      >
        <div
          className={`flex items-center justify-center ${
            isPulling
              ? 'transition-none'
              : 'transition-all duration-450 ease-[cubic-bezier(0.16,1,0.3,1)]'
          }`}
          style={{
            transform: `translateY(${indicatorY}px)`,
            opacity: isVisible ? Math.min(pullDistance / 18, 1) : 0,
          }}
        >
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center ${
              isRefreshing ? 'animate-spin-slow' : ''
            }`}
            style={
              !isRefreshing
                ? {
                    transform: `rotate(${progress * 180}deg) scale(${0.78 + progress * 0.22})`,
                    transition: isPulling ? 'none' : 'transform 0.2s ease-out',
                  }
                : undefined
            }
          >
            {/* Exact original official Hybit logo geometry: viewBox="0 0 100 100" */}
            <svg
              viewBox="0 0 100 100"
              fill="none"
              className="w-full h-full drop-shadow-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="23.5" y="32" width="12" height="36" rx="6" fill="#FFFFFF" />
              <path d="M 44 47.2 L 44 25 A 6 6 0 0 1 56 25 L 56 47.2 Z" fill="#FFFFFF" />
              <path d="M 44 52.8 L 56 52.8 L 56 75 A 6 6 0 0 1 44 75 Z" fill="#FFFFFF" />
              <rect x="64.5" y="32" width="12" height="36" rx="6" fill="#FFFFFF" />
            </svg>
          </div>
        </div>
      </div>

      {/* 
        ENTIRE PAGE MOVES SMOOTHLY TOGETHER (INCLUDING TOPBAR):
        Smooth spring deceleration easing: cubic-bezier(0.16, 1, 0.3, 1)
      */}
      <div
        className={`w-full ${
          isPulling
            ? 'transition-none'
            : 'transition-transform duration-450 ease-[cubic-bezier(0.16,1,0.3,1)]'
        }`}
        style={{
          transform: pageTranslateY > 0 ? `translateY(${pageTranslateY}px)` : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
};
