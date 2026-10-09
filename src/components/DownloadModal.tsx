import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode, Smartphone, Chrome, Apple, Play, CheckCircle2, ArrowRight } from 'lucide-react';
import { HybitLogo } from './icons/NetworkIcons';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [platform, setPlatform] = useState<'ios' | 'android' | 'extension'>('ios');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const handleDownload = (name: string) => {
    setDownloadSuccess(name);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-lg rounded-3xl bg-[#121216] border border-white/10 shadow-2xl shadow-black p-6 sm:p-8 text-white overflow-hidden"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between mb-6">
              <HybitLogo size={38} showText={true} />
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-white/[0.08] text-neutral-400">
                Coming Soon
              </span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
              Get <span className="font-chinese text-3xl text-white inline-block">Hybit</span> on Your Device
            </h3>
            <p className="text-sm text-neutral-400 mb-6">
              Experience everyday crypto with zero friction. Mobile apps are currently in early access testing.
            </p>

            {/* Platform Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] mb-6">
              <button
                onClick={() => setPlatform('ios')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  platform === 'ios'
                    ? 'bg-[#0095FF] text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Apple className="w-4 h-4" />
                iOS App
              </button>
              <button
                onClick={() => setPlatform('android')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  platform === 'android'
                    ? 'bg-[#0095FF] text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                Android
              </button>
              <button
                onClick={() => setPlatform('extension')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  platform === 'extension'
                    ? 'bg-[#0095FF] text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Chrome className="w-4 h-4" />
                Extension
              </button>
            </div>

            {/* Platform Body */}
            <div className="p-6 rounded-2xl bg-[#18181E] border border-white/[0.06] flex flex-col sm:flex-row items-center gap-6 mb-6">
              {/* QR Code Container */}
              <div className="w-32 h-32 p-2 rounded-xl bg-white flex flex-col items-center justify-center shrink-0 shadow-inner">
                {/* SVG QR Code Simulation */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#09090B]">
                  {/* Outer corner squares */}
                  <rect x="5" y="5" width="26" height="26" fill="currentColor" rx="2" />
                  <rect x="10" y="10" width="16" height="16" fill="white" rx="1" />
                  <rect x="14" y="14" width="8" height="8" fill="currentColor" rx="1" />

                  <rect x="69" y="5" width="26" height="26" fill="currentColor" rx="2" />
                  <rect x="74" y="10" width="16" height="16" fill="white" rx="1" />
                  <rect x="78" y="14" width="8" height="8" fill="currentColor" rx="1" />

                  <rect x="5" y="69" width="26" height="26" fill="currentColor" rx="2" />
                  <rect x="10" y="74" width="16" height="16" fill="white" rx="1" />
                  <rect x="14" y="78" width="8" height="8" fill="currentColor" rx="1" />

                  {/* QR Pattern dots */}
                  <rect x="36" y="8" width="8" height="8" fill="currentColor" />
                  <rect x="48" y="14" width="8" height="8" fill="currentColor" />
                  <rect x="36" y="24" width="8" height="8" fill="currentColor" />
                  <rect x="8" y="36" width="8" height="8" fill="currentColor" />
                  <rect x="20" y="44" width="8" height="8" fill="currentColor" />
                  <rect x="38" y="38" width="12" height="12" fill="#0095FF" rx="2" />
                  <rect x="54" y="36" width="8" height="8" fill="currentColor" />
                  <rect x="70" y="44" width="8" height="8" fill="currentColor" />
                  <rect x="84" y="36" width="8" height="8" fill="currentColor" />
                  <rect x="40" y="56" width="8" height="8" fill="currentColor" />
                  <rect x="52" y="66" width="8" height="8" fill="currentColor" />
                  <rect x="66" y="78" width="8" height="8" fill="currentColor" />
                  <rect x="78" y="68" width="8" height="8" fill="currentColor" />
                  <rect x="36" y="82" width="8" height="8" fill="currentColor" />
                </svg>
              </div>

              {/* Text Instructions */}
              <div className="text-center sm:text-left">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wide">
                  {platform === 'ios' && 'Apple App Store (iOS 16+)'}
                  {platform === 'android' && 'Google Play Store (Android 11+)'}
                  {platform === 'extension' && 'Chrome / Brave / Edge Store'}
                </span>
                <h4 className="text-base font-semibold text-white mt-1 mb-1.5">
                  Scan to Install on Device
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Point your phone camera at the QR code to open directly in your device app repository.
                </p>
              </div>
            </div>

            {/* Direct Download / Early Access Button */}
            {downloadSuccess ? (
              <div className="w-full py-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-semibold text-sm flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Joined Early Access List for {downloadSuccess}!
              </div>
            ) : (
              <button
                onClick={() =>
                  handleDownload(
                    platform === 'ios'
                      ? 'Apple App Store'
                      : platform === 'android'
                      ? 'Google Play Store'
                      : 'Chrome Web Store'
                  )
                }
                className="w-full py-3.5 rounded-2xl bg-[#0095FF] hover:bg-[#0080E0] text-white font-semibold text-sm shadow-md shadow-black/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get Early Access on {platform === 'ios' ? 'iOS' : platform === 'android' ? 'Android' : 'Chrome'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <div className="mt-4 text-center">
              <span className="text-[11px] text-neutral-500 font-mono">
                SHA-256 Verified · Early Access v1.0.0 · Privy MPC Core
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
