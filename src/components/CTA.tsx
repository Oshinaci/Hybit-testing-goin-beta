import React from 'react';
import { ArrowRight, Download, ShieldCheck, Mail, Zap } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAppSettings } from '../context/AppSettingsContext';
import { useLandingTranslation } from '../translations/landingTranslations';

interface CTAProps {
  onLaunchApp: () => void;
  onDownload?: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onLaunchApp, onDownload }) => {
  const { showComingSoon } = useToast();
  const { language } = useAppSettings();
  const t = useLandingTranslation();

  const handleDownloadClick = () => {
    if (onDownload) {
      onDownload();
    } else {
      showComingSoon(language === 'id' ? 'Aplikasi Mobile Hybit' : 'Hybit Mobile App');
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
              <span className="text-neutral-200">1 Email, 1 Wallet</span>
              <span className="text-neutral-600">·</span>
              <span>Hybit ID</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight text-balance">
              {t.cta.title}
            </h2>

            <p className="mt-6 text-base sm:text-xl text-neutral-300 leading-relaxed max-w-xl mx-auto text-balance">
              {t.cta.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onLaunchApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#0095FF] hover:bg-[#0080E0] text-white text-base font-semibold shadow-lg shadow-black/30 active:scale-[0.98] transition-all cursor-pointer group"
              >
                <span>{t.cta.openHybit}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleDownloadClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 text-white text-base font-medium active:scale-[0.98] transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-neutral-400" />
                <span>{t.cta.downloadApp}</span>
                <span className="text-xs font-mono text-neutral-400 ml-1">
                  {t.cta.comingSoon}
                </span>
              </button>
            </div>

            {/* Micro details */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-[#0095FF]" />
                {t.cta.guarantee1}
              </span>
              <span className="text-neutral-600">·</span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                {t.cta.guarantee2}
              </span>
              <span className="text-neutral-600">·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {t.cta.guarantee3}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
