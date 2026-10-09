import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '../context/ToastContext';
import { PullToRefreshContext } from '../context/PullToRefreshContext';

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
  const lastYRef = useRef<number>(0);
  const maxPullYRef = useRef<number>(0);
  const canPullRef = useRef<boolean>(false);
  const isRefreshingRef = useRef<boolean>(false);
  const pullDistanceRef = useRef<number>(0);
  const refreshIdRef = useRef<number>(0);
  const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  isRefreshingRef.current = isRefreshing;
  pullDistanceRef.current = pullDistance;

  // Threshold to trigger refresh and resting distance while refreshing
  // Made lighter and smoother with a lower threshold and deeper page movement
  const PULL_THRESHOLD = 68;
  const REFRESH_HOLD_DISTANCE = 82;

  // Cancel pull-to-refresh immediately without showing any toast
  const cancelRefresh = useCallback(() => {
    // If neither pulling nor refreshing, nothing to cancel
    if (!isRefreshingRef.current && pullDistanceRef.current === 0) return;

    // Increment refresh ID to invalidate any pending async promises
    refreshIdRef.current += 1;

    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
      refreshTimeoutRef.current = null;
    }

    isRefreshingRef.current = false;
    canPullRef.current = false;
    pullDistanceRef.current = 0;

    setIsRefreshing(false);
    setIsPulling(false);
    setPullDistance(0);
  }, []);

  const handleRefresh = useCallback(async () => {
    const currentId = ++refreshIdRef.current;
    setIsRefreshing(true);
    isRefreshingRef.current = true;
    setPullDistance(REFRESH_HOLD_DISTANCE);
    pullDistanceRef.current = REFRESH_HOLD_DISTANCE;

    try {
      if (onRefresh) {
        await onRefresh();
      } else {
        // Natural network/wallet sync simulation
        await new Promise<void>((resolve) => {
          refreshTimeoutRef.current = setTimeout(() => {
            resolve();
          }, 1600);
        });
      }

      // If cancelled during the async operation, do not show toast!
      if (refreshIdRef.current !== currentId || !isRefreshingRef.current) {
        return;
      }

      showToast('Data Diperbarui', 'Saldo dan riwayat transaksi telah disinkronkan.', 'info');
    } catch {
      // If cancelled, do not show error toast either
      if (refreshIdRef.current === currentId && isRefreshingRef.current) {
        showToast('Gagal Memperbarui', 'Silakan coba beberapa saat lagi.', 'error');
      }
    } finally {
      if (refreshIdRef.current === currentId) {
        setIsRefreshing(false);
        isRefreshingRef.current = false;
        setPullDistance(0);
        pullDistanceRef.current = 0;
      }
    }
  }, [onRefresh, showToast]);

  useEffect(() => {
    // -------------------------------------------------------------
    // Touch Events for Mobile Web
    // -------------------------------------------------------------
    const handleTouchStart = (e: TouchEvent) => {
      // 1. If pull to refresh is already in progress, any touch cancels it immediately without toast
      if (isRefreshingRef.current) {
        cancelRefresh();
        return;
      }

      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      if (scrollTop <= 0 && e.touches.length > 0) {
        startYRef.current = e.touches[0].clientY;
        lastYRef.current = e.touches[0].clientY;
        maxPullYRef.current = e.touches[0].clientY;
        canPullRef.current = true;
      } else {
        canPullRef.current = false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const currentY = e.touches[0].clientY;

      // 2. If pull to refresh is in progress, any movement (especially upward swipe) cancels it
      if (isRefreshingRef.current) {
        cancelRefresh();
        return;
      }

      if (!canPullRef.current) return;

      const deltaY = currentY - startYRef.current;
      const moveUpFromMax = maxPullYRef.current - currentY;
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;

      // Track max downwards pull achieved during this gesture
      if (currentY > maxPullYRef.current) {
        maxPullYRef.current = currentY;
      }

      // If user drags back up from bottom to top during gesture, cancel the pull
      if (moveUpFromMax > 30 || deltaY <= 0) {
        canPullRef.current = false;
        setIsPulling(false);
        setPullDistance(0);
        return;
      }

      if (scrollTop <= 0 && deltaY > 0) {
        // Prevent default browser refresh
        if (e.cancelable) {
          e.preventDefault();
        }

        // Fluid and lighter rubber-band curve: easy to pull, responsive, and reaches target smoothly
        const distance = Math.min(Math.pow(deltaY, 0.88) * 1.55, 140);
        setPullDistance(distance);
        setIsPulling(true);
      } else {
        canPullRef.current = false;
        setPullDistance(0);
        setIsPulling(false);
      }

      lastYRef.current = currentY;
    };

    const handleTouchEnd = () => {
      // If was refreshing, cancel was already handled or keep refreshing
      if (isRefreshingRef.current) return;

      if (!canPullRef.current) {
        setPullDistance(0);
        setIsPulling(false);
        return;
      }

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
    let mouseMaxY = 0;
    let isMouseDown = false;

    const handleMouseDown = (e: MouseEvent) => {
      // Any click while refresh is in progress cancels it immediately
      if (isRefreshingRef.current) {
        cancelRefresh();
        return;
      }

      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      if (scrollTop <= 0 && e.clientY < 220) {
        mouseStartY = e.clientY;
        mouseMaxY = e.clientY;
        isMouseDown = true;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isRefreshingRef.current) {
        cancelRefresh();
        return;
      }

      if (!isMouseDown) return;

      const dy = e.clientY - mouseStartY;
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;

      if (e.clientY > mouseMaxY) {
        mouseMaxY = e.clientY;
      }

      // Dragged back up
      if (mouseMaxY - e.clientY > 30 || dy <= 0) {
        isMouseDown = false;
        setIsPulling(false);
        setPullDistance(0);
        return;
      }

      if (scrollTop <= 0 && dy > 0) {
        const distance = Math.min(Math.pow(dy, 0.88) * 1.55, 140);
        setPullDistance(distance);
        setIsPulling(true);
      }
    };

    const handleMouseUp = () => {
      if (isRefreshingRef.current) return;
      if (!isMouseDown) return;

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

    // Wheel event: scrolling upward or downward during refresh cancels it
    const handleWheel = () => {
      if (isRefreshingRef.current) {
        cancelRefresh();
      }
    };

    // Global click/pointer handler to cancel on any interaction while refreshing
    const handlePointerDown = () => {
      if (isRefreshingRef.current) {
        cancelRefresh();
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true, capture: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    window.addEventListener('mousedown', handleMouseDown, { capture: true });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { capture: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart, { capture: true });
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);

      window.removeEventListener('mousedown', handleMouseDown, { capture: true });
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('pointerdown', handlePointerDown, { capture: true });
    };
  }, [handleRefresh, cancelRefresh]);

  const progress = Math.min(pullDistance / PULL_THRESHOLD, 1);
  const isVisible = pullDistance > 0 || isRefreshing;

  // As entire page (and topbar) shifts down, give it slightly more downward translation
  // (pullDistance * 0.72) creates a roomier, lighter, and more satisfying pull gesture
  const pageTranslateY = pullDistance > 0 ? pullDistance * 0.72 : 0;
  // Position the Hybit logo gracefully in the upper gap above topbar
  const indicatorY = isVisible ? Math.min(pageTranslateY * 0.42, 28) : -48;

  return (
    <PullToRefreshContext.Provider value={{ isRefreshing, cancelRefresh }}>
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
                : 'transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]'
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
              : 'transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]'
          }`}
          style={{
            transform: pageTranslateY > 0 ? `translateY(${pageTranslateY}px)` : undefined,
          }}
        >
          {children}
        </div>
      </div>
    </PullToRefreshContext.Provider>
  );
};
