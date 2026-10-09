import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download } from 'lucide-react';
import { PhoneMockup } from './PhoneMockup';
import { useToast } from '../context/ToastContext';
import { useAppSettings } from '../context/AppSettingsContext';
import { useLandingTranslation } from '../translations/landingTranslations';

interface HeroProps {
  onLaunchApp: () => void;
  onDownload?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLaunchApp, onDownload }) => {
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
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Subtle Brand Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-xs font-medium text-neutral-400 mb-6 tracking-wide"
            >
              <span className="text-neutral-200">1 Email, 1 Wallet</span>
              <span className="text-neutral-600">·</span>
              <span>Hybit ID</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-tight text-white leading-[1.08] max-w-2xl text-balance"
            >
              {t.hero.headlinePart1}
              <span className="text-[#0095FF]">
                {t.hero.headlineHighlight}
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-neutral-300 leading-relaxed max-w-xl text-balance"
            >
              {t.hero.subheadline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={onLaunchApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0095FF] hover:bg-[#0080E0] text-white text-base font-semibold shadow-md shadow-black/20 active:scale-[0.98] transition-all cursor-pointer group"
              >
                <span>{t.hero.openHybit}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={handleDownloadClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white text-base font-medium active:scale-[0.98] transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-neutral-400" />
                <span>{t.hero.downloadApp}</span>
                <span className="text-xs font-mono text-neutral-400 ml-1">
                  {t.hero.comingSoon}
                </span>
              </button>
            </motion.div>

            {/* Proof & Trust Signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 pt-8 border-t border-white/[0.07] grid grid-cols-3 gap-6 sm:gap-8 w-full max-w-lg"
            >
              <div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono tracking-tight">{t.hero.fact1Title}</div>
                <div className="text-xs text-neutral-400 mt-0.5">{t.hero.fact1Subtitle}</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-[#0095FF] font-mono tracking-tight">{t.hero.fact2Title}</div>
                <div className="text-xs text-neutral-400 mt-0.5">{t.hero.fact2Subtitle}</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono tracking-tight">{t.hero.fact3Title}</div>
                <div className="text-xs text-neutral-400 mt-0.5">{t.hero.fact3Subtitle}</div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, type: 'spring', damping: 25 }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            <PhoneMockup />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
