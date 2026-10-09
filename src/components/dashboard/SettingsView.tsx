import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Smartphone,
  Lock,
  Globe,
  Copy,
  Check,
  Wallet,
  Mail,
  ChevronDown,
  Languages,
  Zap,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import {
  useAppSettings,
  CURRENCY_OPTIONS,
  LANGUAGE_OPTIONS,
  AppLanguage,
} from '../../context/AppSettingsContext';
import { useWallet } from '../../context/WalletContext';

export const SettingsView: React.FC = () => {
  const { showToast } = useToast();
  const { isWalletConnected, walletProvider, openConnectModal, disconnectWallet } = useWallet();
  const {
    language,
    setLanguage,
    currentLanguage,
    currency,
    setCurrency,
    currentCurrency,
    t,
    formatCurrency,
  } = useAppSettings();

  const [passkeyEnabled, setPasskeyEnabled] = useState(true);
  const [autoLockTime, setAutoLockTime] = useState('5m');
  const [autoLockOpen, setAutoLockOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [gasPreset, setGasPreset] = useState<'standard' | 'fast' | 'instant'>('fast');
  const [gasPresetOpen, setGasPresetOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // 1 Wallet Only - Privy Embedded Wallet tied 1 Email : 1 Wallet
  const userMockEmail = 'kaitosogen@gmail.com';
  const walletData = {
    name: 'Privy Embedded Wallet',
    email: userMockEmail,
    authProvider: 'Privy Web3 Auth',
    type: 'Non-Custodial MPC · 1 Email : 1 Wallet',
    address: '0x7F2a45B083C29E41c7F3bDa208B49a37e89e8b1e',
    rawBalanceUsd: 42918.24,
    status: t.walletVerified,
  };

  const autoLockOptions = [
    { id: '1m', label: language === 'id' ? '1 Menit' : '1 Minute', desc: language === 'id' ? 'Keamanan tertinggi · Cepat mengunci' : 'Highest security · Locks quickly' },
    { id: '5m', label: language === 'id' ? '5 Menit' : '5 Minutes', desc: language === 'id' ? 'Keseimbangan optimal (Direkomendasikan)' : 'Optimal balance (Recommended)' },
    { id: '15m', label: language === 'id' ? '15 Menit' : '15 Minutes', desc: language === 'id' ? 'Sesi trading aktif' : 'Extended active trading session' },
    { id: '1h', label: language === 'id' ? '1 Jam' : '1 Hour', desc: language === 'id' ? 'Sesi desktop diperpanjang' : 'Extended desktop workspace' },
    { id: 'never', label: language === 'id' ? 'Jangan Pernah' : 'Never', desc: language === 'id' ? 'Tidak disarankan pada perangkat bersama' : 'Not recommended for shared devices' },
  ];

  const gasPresetOptions = [
    { id: 'standard' as const, label: language === 'id' ? 'Standar (Ekonomis)' : 'Standard (Economic)', desc: language === 'id' ? 'Biaya hemat · ~1.2s' : 'Economic fee · ~1.2s', badge: 'Standar' },
    { id: 'fast' as const, label: language === 'id' ? 'Cepat (Direkomendasikan)' : 'Fast (Recommended)', desc: language === 'id' ? 'Prioritas tinggi · Sub-detik' : 'High priority · Sub-second', badge: 'Cepat' },
    { id: 'instant' as const, label: language === 'id' ? 'Instan (MEV Boost)' : 'Instant (MEV Boost)', desc: language === 'id' ? 'Proteksi front-running' : 'MEV frontrun protection', badge: 'Instan' },
  ];

  const currentAutoLockObj = autoLockOptions.find((o) => o.id === autoLockTime) || autoLockOptions[1];
  const currentGasPresetObj = gasPresetOptions.find((o) => o.id === gasPreset) || gasPresetOptions[1];

  const handleCopy = (address: string, id: string) => {
    navigator.clipboard?.writeText(address);
    setCopiedKey(id);
    showToast(t.copyAddress, address, 'copy');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveNotice = (message?: string) => {
    const finalMessage = message || t.savedNoticeDefault;
    showToast(language === 'id' ? 'Pengaturan Disimpan' : 'Settings Updated', finalMessage, 'success');
  };

  return (
    <div className="space-y-8 pb-28">
      
      {/* Title (Unboxed - No card) */}
      <div className="pb-4 border-b border-white/[0.08]">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{t.settingsTitle}</h2>
        <p className="text-xs text-neutral-400 mt-1">
          {t.settingsSubtitle}
        </p>
      </div>

      {/* 1. Privy Embedded Wallet (1 Wallet Saja Tanpa Vault - Unboxed) */}
      <section className="space-y-4 pb-6 border-b border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">{t.walletCardTitle}</h3>
              <span className="text-xs font-mono text-neutral-400">
                · Privy Auth
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              {language === 'id'
                ? 'Arsitektur embedded 1 Email · 1 Dompet. Tanpa perlu seed phrase.'
                : '1 Email · 1 Wallet embedded architecture. No seed phrase required.'}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{language === 'id' ? 'Privy Terhubung' : 'Privy Connected'}</span>
          </div>
        </div>

        <div className="pt-2 space-y-4">
          
          {/* Linked Email Display */}
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0095FF]/15 text-[#0095FF] flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-neutral-400 font-medium">{t.walletEmailLabel}</div>
                <div className="text-sm font-semibold text-white font-mono mt-0.5 flex items-center gap-2">
                  <span>{walletData.email}</span>
                  <span className="text-xs font-mono text-emerald-400">
                    · {t.walletVerified}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-xs text-neutral-400 font-mono sm:text-right">
              <span className="text-neutral-500">{language === 'id' ? 'Kebijakan:' : 'Policy:'}</span> 1 Email · 1 {language === 'id' ? 'Dompet' : 'Wallet'}
            </div>
          </div>

          {/* The 1 Wallet Details (Unboxed Row) */}
          <div className="py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0095FF] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">
                    {isWalletConnected ? (walletProvider || walletData.name) : 'No Wallet Connected'}
                  </span>
                  <span className={`text-[11px] font-mono flex items-center gap-1 ${
                    isWalletConnected ? 'text-emerald-400' : 'text-neutral-500'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      isWalletConnected ? 'bg-emerald-400' : 'bg-neutral-600'
                    }`} />
                    {isWalletConnected ? walletData.status : 'Disconnected'}
                  </span>
                </div>
                <div className="text-xs text-neutral-400 font-mono mt-0.5">
                  {isWalletConnected ? walletData.type : 'Connect your Web3 wallet to access Hybit'}
                </div>
                {isWalletConnected ? (
                  <div className="flex items-center gap-2 mt-2 font-mono text-xs text-neutral-300">
                    <span className="truncate max-w-[220px] sm:max-w-sm">{walletData.address}</span>
                    <button
                      onClick={() => handleCopy(walletData.address, 'wallet')}
                      className="text-neutral-400 hover:text-white transition-colors cursor-pointer p-1 rounded-md hover:bg-white/[0.06]"
                      title={t.copyAddress}
                      aria-label={t.copyAddress}
                    >
                      {copiedKey === 'wallet' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={disconnectWallet}
                      className="text-neutral-400 hover:text-red-400 transition-colors ml-2 px-2 py-0.5 rounded-md hover:bg-white/[0.06] cursor-pointer text-[10px] font-mono border border-white/10"
                    >
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <div className="mt-2.5">
                    <button
                      onClick={openConnectModal}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0095FF] hover:bg-[#0080E0] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                    >
                      <Wallet className="w-3.5 h-3.5" />
                      <span>Connect Wallet</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="sm:text-right font-mono">
              <div className="text-xs text-neutral-400">{language === 'id' ? 'Total Valuasi' : 'Total Valuation'} ({currentCurrency.code})</div>
              <div className="text-lg font-bold text-white tracking-tight">
                {isWalletConnected ? formatCurrency(walletData.rawBalanceUsd) : formatCurrency(0)}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Security & Biometrics (Unboxed with Custom Hybit Theme Dropdowns) */}
      <section className="space-y-4 pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#0095FF]" />
          <h3 className="text-base font-bold text-white tracking-tight">{t.securitySectionTitle}</h3>
        </div>

        <div className="divide-y divide-white/[0.06]">
          {/* Toggle Passkey */}
          <div className="py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
              <Smartphone className="w-4 h-4 text-neutral-400 shrink-0" />
              <div>
                <div className="text-sm font-semibold text-white">{t.passkeyTitle}</div>
                <div className="text-xs text-neutral-400 mt-0.5 leading-relaxed">{t.passkeyDesc}</div>
              </div>
            </div>
            <button
              onClick={() => {
                setPasskeyEnabled(!passkeyEnabled);
                handleSaveNotice();
              }}
              className={`w-12 h-6 rounded-full transition-colors p-0.5 cursor-pointer shrink-0 ${
                passkeyEnabled ? 'bg-[#0095FF]' : 'bg-neutral-700'
              }`}
              aria-label="Toggle Passkey"
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  passkeyEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Custom Hybit Theme Dropdown: Auto-Lock Timer */}
          <div className="py-4.5 flex items-center justify-between gap-4 sm:gap-8 relative">
            <div className="flex items-center gap-3 flex-1 min-w-0 pr-2 sm:pr-4">
              <Lock className="w-4 h-4 text-neutral-400 shrink-0" />
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white">{t.autoLockTitle}</div>
                <div className="text-xs text-neutral-400 mt-0.5 leading-relaxed truncate sm:whitespace-normal">{t.autoLockDesc}</div>
              </div>
            </div>

            {/* Custom Dropdown Trigger - Pinned to the Right */}
            <div className="relative shrink-0 ml-auto">
              <button
                type="button"
                onClick={() => {
                  setAutoLockOpen(!autoLockOpen);
                  setCurrencyOpen(false);
                  setLanguageOpen(false);
                  setGasPresetOpen(false);
                }}
                className={`flex items-center justify-between gap-2.5 min-w-[140px] sm:min-w-[160px] px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98] ${
                  autoLockOpen
                    ? 'bg-[#171720] border border-[#0095FF] ring-2 ring-[#0095FF]/20 text-white shadow-lg shadow-[#0095FF]/10'
                    : 'bg-[#141419] border border-white/10 hover:border-white/20 hover:bg-[#1a1a22] text-neutral-200'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Lock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span className="font-semibold text-white truncate">{currentAutoLockObj.label}</span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 shrink-0 ${
                    autoLockOpen ? 'rotate-180 text-[#0095FF]' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {autoLockOpen && (
                  <>
                    {/* Click outside backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setAutoLockOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 mt-2 w-64 sm:w-72 rounded-2xl bg-[#141419]/95 border border-white/10 shadow-2xl shadow-black/90 p-1.5 z-50 backdrop-blur-2xl"
                    >
                      <div className="px-3 py-1.5 text-[10px] uppercase font-mono text-neutral-400 font-semibold border-b border-white/[0.08] mb-1">
                        {t.selectAutoLockTimer}
                      </div>
                      <div className="max-h-52 overflow-y-auto scrollbar-none space-y-0.5 pr-0.5">
                        {autoLockOptions.map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setAutoLockTime(opt.id);
                              setAutoLockOpen(false);
                              handleSaveNotice();
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                              autoLockTime === opt.id
                                ? 'bg-[#0095FF]/15 text-white font-semibold border border-[#0095FF]/30'
                                : 'text-neutral-300 hover:bg-white/[0.06] hover:text-white'
                            }`}
                          >
                            <div>
                              <div className={autoLockTime === opt.id ? 'text-[#0095FF]' : 'text-neutral-200'}>
                                {opt.label}
                              </div>
                              <div className="text-[10px] text-neutral-400 mt-0.5">{opt.desc}</div>
                            </div>
                            {autoLockTime === opt.id && (
                              <Check className="w-3.5 h-3.5 text-[#0095FF] shrink-0 ml-2" />
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Preferences & Display (Language, Currency & Default Gas Preset) */}
      <section className="space-y-4 pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#0095FF]" />
          <h3 className="text-base font-bold text-white tracking-tight">{t.preferencesSectionTitle}</h3>
        </div>

        <div className="divide-y divide-white/[0.06]">
          {/* Custom Hybit Theme Dropdown: Language Selection */}
          <div className="py-4.5 flex items-center justify-between gap-4 sm:gap-8 relative">
            <div className="flex-1 min-w-0 pr-2 sm:pr-4">
              <div className="text-sm font-semibold text-white flex items-center gap-2">
                <span>{t.languageTitle}</span>
              </div>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed max-w-lg">
                {t.languageDesc}
              </p>
            </div>

            {/* Custom Dropdown Trigger - Pinned to the Right */}
            <div className="relative shrink-0 ml-auto">
              <button
                type="button"
                onClick={() => {
                  setLanguageOpen(!languageOpen);
                  setCurrencyOpen(false);
                  setAutoLockOpen(false);
                  setGasPresetOpen(false);
                }}
                className={`flex items-center justify-between gap-2.5 min-w-[150px] sm:min-w-[170px] px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98] ${
                  languageOpen
                    ? 'bg-[#171720] border border-[#0095FF] ring-2 ring-[#0095FF]/20 text-white shadow-lg shadow-[#0095FF]/10'
                    : 'bg-[#141419] border border-white/10 hover:border-white/20 hover:bg-[#1a1a22] text-neutral-200'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base leading-none shrink-0">{currentLanguage.flag}</span>
                  <span className="font-semibold text-white truncate">{currentLanguage.name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.08] text-neutral-300 shrink-0">
                    {currentLanguage.code}
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 shrink-0 ${
                    languageOpen ? 'rotate-180 text-[#0095FF]' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {languageOpen && (
                  <>
                    {/* Click outside backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setLanguageOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 mt-2 w-64 sm:w-72 rounded-2xl bg-[#141419]/95 border border-white/10 shadow-2xl shadow-black/90 p-1.5 z-50 backdrop-blur-2xl"
                    >
                      <div className="px-3 py-1.5 text-[10px] uppercase font-mono text-neutral-400 font-semibold border-b border-white/[0.08] mb-1">
                        {t.selectLanguage}
                      </div>
                      <div className="max-h-52 overflow-y-auto scrollbar-none space-y-0.5 pr-0.5">
                        {LANGUAGE_OPTIONS.map((langOpt) => (
                          <button
                            key={langOpt.id}
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setLanguage(langOpt.id as AppLanguage);
                              setLanguageOpen(false);
                              handleSaveNotice(t.languageChangedToast(langOpt.name));
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                              language === langOpt.id
                                ? 'bg-[#0095FF]/15 text-white font-semibold border border-[#0095FF]/30'
                                : 'text-neutral-300 hover:bg-white/[0.06] hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-base leading-none">{langOpt.flag}</span>
                              <div>
                                <div className="font-medium text-white">{langOpt.name}</div>
                                <div className="text-[10px] text-neutral-400">{langOpt.nativeName}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.08] text-neutral-300">
                                {langOpt.code}
                              </span>
                              {language === langOpt.id && (
                                <Check className="w-3.5 h-3.5 text-[#0095FF] shrink-0" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Custom Hybit Theme Dropdown: Primary Currency */}
          <div className="py-4.5 flex items-center justify-between gap-4 sm:gap-8 relative">
            <div className="flex-1 min-w-0 pr-2 sm:pr-4">
              <div className="text-sm font-semibold text-white flex items-center gap-2">
                <span>{t.primaryCurrencyTitle}</span>
              </div>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed max-w-lg">
                {t.primaryCurrencyDesc}
              </p>
            </div>

            {/* Custom Dropdown Trigger - Pinned to the Right */}
            <div className="relative shrink-0 ml-auto">
              <button
                type="button"
                onClick={() => {
                  setCurrencyOpen(!currencyOpen);
                  setAutoLockOpen(false);
                  setLanguageOpen(false);
                  setGasPresetOpen(false);
                }}
                className={`flex items-center justify-between gap-2.5 min-w-[150px] sm:min-w-[170px] px-3.5 py-2.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98] ${
                  currencyOpen
                    ? 'bg-[#171720] border border-[#0095FF] ring-2 ring-[#0095FF]/20 text-white shadow-lg shadow-[#0095FF]/10'
                    : 'bg-[#141419] border border-white/10 hover:border-white/20 hover:bg-[#1a1a22] text-neutral-200'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 rounded-md bg-[#0095FF]/15 text-[#0095FF] font-mono font-bold flex items-center justify-center text-xs shrink-0">
                    {currentCurrency.symbol}
                  </span>
                  <span className="font-semibold text-white truncate">{currentCurrency.name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.08] text-neutral-300 shrink-0">
                    {currentCurrency.code}
                  </span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 shrink-0 ${
                    currencyOpen ? 'rotate-180 text-[#0095FF]' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {currencyOpen && (
                  <>
                    {/* Click outside backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setCurrencyOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 mt-2 w-64 sm:w-72 rounded-2xl bg-[#141419]/95 border border-white/10 shadow-2xl shadow-black/90 p-1.5 z-50 backdrop-blur-2xl"
                    >
                      <div className="px-3 py-1.5 text-[10px] uppercase font-mono text-neutral-400 font-semibold border-b border-white/[0.08] mb-1">
                        {t.selectPrimaryCurrency}
                      </div>
                      <div className="max-h-52 overflow-y-auto scrollbar-none space-y-0.5 pr-0.5">
                        {CURRENCY_OPTIONS.map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setCurrency(c.id);
                              setCurrencyOpen(false);
                              handleSaveNotice(t.currencyChangedToast(c.name, c.code));
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                              currency === c.id
                                ? 'bg-[#0095FF]/15 text-white font-semibold border border-[#0095FF]/30'
                                : 'text-neutral-300 hover:bg-white/[0.06] hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 font-mono">
                              <span className="w-5 h-5 rounded-md bg-[#0095FF]/15 text-[#0095FF] font-bold flex items-center justify-center text-xs shrink-0">
                                {c.symbol}
                              </span>
                              <span className="font-sans text-neutral-200">{c.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono text-neutral-400">{c.code}</span>
                              {currency === c.id && (
                                <Check className="w-3.5 h-3.5 text-[#0095FF] shrink-0" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Custom Hybit Theme Dropdown: Default Gas Preset */}
          <div className="py-4.5 flex items-center justify-between gap-4 sm:gap-8 relative">
            <div className="flex-1 min-w-0 pr-2 sm:pr-4">
              <div className="text-sm font-semibold text-white flex items-center gap-2">
                <span>{language === 'id' ? 'Preset Gas Default' : 'Default Gas Preset'}</span>
              </div>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed max-w-lg">
                {language === 'id'
                  ? 'Kecepatan eksekusi transaksi default dan strategi prioritas biaya gas on-chain.'
                  : 'Default execution speed and on-chain gas fee priority strategy.'}
              </p>
            </div>

            {/* Custom Dropdown Trigger - Pinned to the Right */}
            <div className="relative shrink-0 ml-auto">
              <button
                type="button"
                onClick={() => {
                  setGasPresetOpen(!gasPresetOpen);
                  setCurrencyOpen(false);
                  setAutoLockOpen(false);
                  setLanguageOpen(false);
                }}
                className={`flex items-center justify-between gap-2.5 min-w-[150px] sm:min-w-[170px] px-3.5 py-2.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.98] ${
                  gasPresetOpen
                    ? 'bg-[#171720] border border-[#0095FF] ring-2 ring-[#0095FF]/20 text-white shadow-lg shadow-[#0095FF]/10'
                    : 'bg-[#141419] border border-white/10 hover:border-white/20 hover:bg-[#1a1a22] text-neutral-200'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Zap className="w-3.5 h-3.5 text-[#0095FF] shrink-0" />
                  <span className="font-semibold text-white truncate">{currentGasPresetObj.badge}</span>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 shrink-0 ${
                    gasPresetOpen ? 'rotate-180 text-[#0095FF]' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {gasPresetOpen && (
                  <>
                    {/* Click outside backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setGasPresetOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 mt-2 w-64 sm:w-72 rounded-2xl bg-[#141419]/95 border border-white/10 shadow-2xl shadow-black/90 p-1.5 z-50 backdrop-blur-2xl"
                    >
                      <div className="px-3 py-1.5 text-[10px] uppercase font-mono text-neutral-400 font-semibold border-b border-white/[0.08] mb-1">
                        {language === 'id' ? 'Pilih Kecepatan Gas Default' : 'Select Default Gas Preset'}
                      </div>
                      <div className="max-h-52 overflow-y-auto scrollbar-none space-y-0.5 pr-0.5">
                        {gasPresetOptions.map((g) => (
                          <button
                            key={g.id}
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setGasPreset(g.id);
                              setGasPresetOpen(false);
                              handleSaveNotice(
                                language === 'id'
                                  ? `Preset Gas diubah menjadi: ${g.label}`
                                  : `Default Gas preset set to: ${g.label}`
                              );
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left ${
                              gasPreset === g.id
                                ? 'bg-[#0095FF]/15 text-white font-semibold border border-[#0095FF]/30'
                                : 'text-neutral-300 hover:bg-white/[0.06] hover:text-white'
                            }`}
                          >
                            <div>
                              <div className={gasPreset === g.id ? 'text-[#0095FF] font-semibold' : 'text-neutral-200'}>
                                {g.label}
                              </div>
                              <div className="text-[10px] text-neutral-400 mt-0.5">{g.desc}</div>
                            </div>
                            {gasPreset === g.id && (
                              <Check className="w-3.5 h-3.5 text-[#0095FF] shrink-0 ml-2" />
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 4. About & Audits (Unboxed - With enlarged Hybit font) */}
      <section className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
        <div>
          <span className="font-semibold text-white flex items-center gap-2">
            <span className="font-chinese text-xl sm:text-2xl text-white inline-block">Hybit</span>
            <span className="text-neutral-300 font-mono">Early Access v1.0.0</span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-neutral-400">
          <span className="font-mono text-xs text-neutral-300 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Privy MPC Protocol
          </span>
        </div>
      </section>

    </div>
  );
};
