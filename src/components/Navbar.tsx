import React, { useState } from 'react';
import { Menu, ArrowRight, Wallet, Globe } from 'lucide-react';
import { HybitLogo } from './icons/NetworkIcons';
import { MobileDrawer } from './MobileDrawer';
import { useToast } from '../context/ToastContext';
import { useWallet } from '../context/WalletContext';
import { useAppSettings } from '../context/AppSettingsContext';
import { useLandingTranslation } from '../translations/landingTranslations';

interface NavbarProps {
  onLaunchApp: () => void;
  onDownload?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLaunchApp, onDownload }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { showComingSoon } = useToast();
  const { isWalletConnected, openConnectModal } = useWallet();
  const { language, setLanguage } = useAppSettings();
  const t = useLandingTranslation();

  const handleDownloadClick = () => {
    if (onDownload) {
      onDownload();
    } else {
      showComingSoon(language === 'id' ? 'Aplikasi Mobile Hybit' : 'Hybit Mobile App');
    }
  };

  const navLinks = [
    { label: t.navbar.features, href: '#features' },
    { label: t.navbar.preview, href: '#preview' },
    { label: t.navbar.security, href: '#security' },
    { label: t.navbar.networks, href: '#ecosystem' },
    { label: t.navbar.faq, href: '#faq' },
  ];

  return (
    <>
      <header
        className="sticky top-0 z-40 bg-transparent py-4 sm:py-5 transition-colors duration-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Logo */}
            <a
              href="#"
              className="flex items-center gap-2 text-decoration-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0095FF] rounded-lg"
              aria-label={t.navbar.homeAria}
            >
              <HybitLogo size={36} showText={true} />
            </a>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative py-1 text-neutral-300 hover:text-white transition-colors duration-200 group text-sm"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0095FF] transition-all duration-200 group-hover:w-full rounded-full" />
                </a>
              ))}
              <button
                onClick={handleDownloadClick}
                className="relative py-1 text-neutral-300 hover:text-white transition-colors duration-200 group text-sm cursor-pointer flex items-center gap-1.5"
              >
                <span>{t.navbar.app}</span>
                <span className="text-[10px] font-mono text-neutral-500">
                  {t.navbar.comingSoon}
                </span>
              </button>
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Quick Language Toggle (synchronized with dashboard settings) */}
              <button
                onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
                title={language === 'id' ? 'Ganti ke English' : 'Switch to Bahasa Indonesia'}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-neutral-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-neutral-400" />
                <span className="uppercase font-semibold tracking-wider text-[11px]">
                  {language}
                </span>
              </button>

              {!isWalletConnected ? (
                <button
                  onClick={openConnectModal}
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold text-neutral-200 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Wallet className="w-3.5 h-3.5 text-[#0095FF]" />
                  <span>{t.navbar.connectWallet}</span>
                </button>
              ) : (
                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-neutral-300 bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>alex.hybit</span>
                </div>
              )}

              <button
                onClick={onLaunchApp}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide text-white bg-[#0095FF] hover:bg-[#0080E0] shadow-sm active:scale-[0.98] transition-colors duration-150 cursor-pointer"
              >
                <span>{t.navbar.openHybit}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0095FF]"
                aria-label={t.navbar.menuAria}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onLaunchApp={onLaunchApp}
        onDownload={onDownload}
      />
    </>
  );
};
