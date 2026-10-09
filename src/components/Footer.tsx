import React from 'react';
import { HybitLogo } from './icons/NetworkIcons';
import { useToast } from '../context/ToastContext';
import { useLandingTranslation } from '../translations/landingTranslations';

export const Footer: React.FC<{ onDownload?: () => void }> = ({ onDownload }) => {
  const { showToast, showComingSoon } = useToast();
  const t = useLandingTranslation();

  const handleLinkClick = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    if (
      label.toLowerCase().includes('unduh') ||
      label.toLowerCase().includes('aplikasi') ||
      label.toLowerCase().includes('download') ||
      label.toLowerCase().includes('app')
    ) {
      if (onDownload) {
        onDownload();
      } else {
        showComingSoon('Hybit Mobile App');
      }
    } else {
      showToast(label, t.footer.noticePlaceholder, 'info');
    }
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#070709] text-neutral-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-block mb-4" aria-label="Hybit">
              <HybitLogo size={36} showText={true} />
            </a>
            
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed mb-6">
              {t.footer.description}
            </p>

            {/* Version Information */}
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0095FF]" />
              <span>{t.footer.version}</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              {t.footer.productHeading}
            </h4>
            <ul className="space-y-2.5">
              {t.footer.links.product.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides / Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              {t.footer.guidesHeading}
            </h4>
            <ul className="space-y-2.5">
              {t.footer.links.guides.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      if (l.href === '#faq') return;
                      handleLinkClick(e, l.label);
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              {t.footer.legalHeading}
            </h4>
            <ul className="space-y-2.5">
              {t.footer.links.legal.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      if (l.href === '#security') return;
                      handleLinkClick(e, l.label);
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            {t.footer.copyright}
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#"
              onClick={(e) => handleLinkClick(e, 'Twitter (X)')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Twitter (X)
            </a>
            <a
              href="#"
              onClick={(e) => handleLinkClick(e, 'GitHub')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              GitHub
            </a>
            <a
              href="#"
              onClick={(e) => handleLinkClick(e, 'Discord')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Discord
            </a>
            <a
              href="#"
              onClick={(e) => handleLinkClick(e, 'Telegram')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Telegram
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
