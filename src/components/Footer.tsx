import React from 'react';
import { HybitLogo } from './icons/NetworkIcons';
import { useToast } from '../context/ToastContext';

export const Footer: React.FC<{ onDownload?: () => void }> = ({ onDownload }) => {
  const { showToast, showComingSoon } = useToast();

  const handleLinkClick = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    if (label.toLowerCase().includes('download') || label.toLowerCase().includes('app')) {
      if (onDownload) {
        onDownload();
      } else {
        showComingSoon('Hybit Mobile App');
      }
    } else {
      showToast(`${label} Portal`, 'Opening documentation & security portal resources', 'info');
    }
  };
  const links = {
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Brand Assets', href: '#' },
      { label: 'Security & Audits', href: '#security' },
    ],
    resources: [
      { label: 'Documentation', href: '#' },
      { label: 'Ecosystem', href: '#ecosystem' },
      { label: 'Developers API', href: '#' },
      { label: 'Status Page', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Bug Bounty', href: '#' },
      { label: 'Responsible Disclosure', href: '#' },
    ],
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#070709] text-neutral-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-block mb-4">
              <HybitLogo size={36} showText={true} />
            </a>
            
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed mb-6">
              <span className="font-chinese text-base sm:text-lg text-white">Hybit</span> is the everyday crypto wallet where anyone can safely store, send, receive, swap, and manage digital assets with GoPay-level simplicity.
            </p>

            {/* System Status Indicator - Clean unboxed text */}
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {links.company.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => handleLinkClick(e, l.label)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {links.resources.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => handleLinkClick(e, l.label)}
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
              Legal & Trust
            </h4>
            <ul className="space-y-2.5">
              {links.legal.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => handleLinkClick(e, l.label)}
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
            © {new Date().getFullYear()} <span className="font-chinese text-sm sm:text-base text-neutral-200">Hybit</span> Labs, Inc. All rights reserved. Crypto as Easy as GoPay.
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
