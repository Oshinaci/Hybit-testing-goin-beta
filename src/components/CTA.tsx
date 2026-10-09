import React from 'react';
import { ArrowRight, Download, ShieldCheck } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface CTAProps {
  onLaunchApp: () => void;
  onDownload?: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onLaunchApp, onDownload }) => {
  const { showComingSoon } = useToast();

  const handleDownloadClick = () => {
    if (onDownload) {
      onDownload();
    } else {
      showComingSoon('Hybit Mobile App (iOS & Android)');
    }
  };

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Container */}
        <div className="relative rounded-[36px] bg-[#141418] border border-white/10 p-8 sm:p-14 lg:p-20 text-center overflow-hidden shadow-2xl shadow-black">
          
          <div className="relative z-10 max-w-3xl mx-auto">
            
            {/* Clean Unboxed Kicker */}
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-neutral-400 mb-6 tracking-wide">
              <span className="text-neutral-200">Early Access v1.0.0</span>
              <span className="text-neutral-600">·</span>
              <span>Non-Custodial</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight text-balance">
              Start Your Crypto Journey Today.
            </h2>

            <p className="mt-6 text-base sm:text-xl text-neutral-300 leading-relaxed max-w-xl mx-auto text-balance">
              Experience the everyday wallet built for everyone. No complicated seeds, no confusing bridges. Just instant, safe crypto.
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onLaunchApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#0095FF] hover:bg-[#0080E0] text-white text-base font-semibold shadow-lg shadow-black/30 active:scale-[0.98] transition-all cursor-pointer group"
              >
                <span>Launch App</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleDownloadClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 text-white text-base font-medium active:scale-[0.98] transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-neutral-400" />
                <span>Download App</span>
                <span className="text-xs font-mono text-neutral-400 ml-1">
                  · Coming Soon
                </span>
              </button>
            </div>

            {/* Micro guarantees */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                100% Non-Custodial
              </span>
              <span className="text-neutral-600">·</span>
              <span>Available on iOS, Android & Web</span>
              <span className="text-neutral-600">·</span>
              <span>Set Up in 5 Seconds</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
