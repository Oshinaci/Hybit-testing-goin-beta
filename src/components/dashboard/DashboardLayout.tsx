import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  PieChart,
  History,
  Settings,
  Bell,
  Copy,
  Check,
  ChevronDown,
  Repeat,
} from 'lucide-react';
import { DashboardPage, NetworkOption, NotificationItem } from '../../types/dashboard';
import { EthereumIcon, BaseIcon, SolanaIcon, ArbitrumIcon, PolygonIcon, OptimismIcon } from '../icons/NetworkIcons';
import { useAppSettings } from '../../context/AppSettingsContext';
import { useToast } from '../../context/ToastContext';
import { usePullToRefresh } from '../../context/PullToRefreshContext';

interface DashboardLayoutProps {
  currentPage: DashboardPage;
  onPageChange: (page: DashboardPage) => void;
  onBackToLanding: () => void;
  onQuickAction: (action: 'send' | 'receive' | 'swap' | 'buy' | 'bridge') => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  currentPage,
  onPageChange,
  onBackToLanding,
  onQuickAction,
  children,
}) => {
  const { t, language } = useAppSettings();
  const { showToast } = useToast();
  const { cancelRefresh } = usePullToRefresh();
  const [copied, setCopied] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState('base');
  const [networkDropdownOpen, setNetworkDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const networkRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (networkRef.current && !networkRef.current.contains(event.target as Node)) {
        setNetworkDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const walletAddress = '0x7F2a45B083C29E41c7F3bDa208B49a37e89e8b1e';

  const networks: NetworkOption[] = [
    { id: 'base', name: 'Base L2', symbol: 'ETH', iconColor: 'text-[#0095FF]', badge: language === 'id' ? 'Tercepat' : 'Fastest' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', iconColor: 'text-indigo-400', badge: 'L1' },
    { id: 'solana', name: 'Solana', symbol: 'SOL', iconColor: 'text-emerald-400', badge: language === 'id' ? 'Cepat' : 'Fast' },
    { id: 'arbitrum', name: 'Arbitrum One', symbol: 'ETH', iconColor: 'text-blue-400', badge: 'L2' },
    { id: 'polygon', name: 'Polygon PoS', symbol: 'POL', iconColor: 'text-purple-400', badge: 'L2' },
    { id: 'optimism', name: 'Optimism', symbol: 'ETH', iconColor: 'text-red-500', badge: 'OP Stack' },
  ];

  const currentNetworkObj = networks.find((n) => n.id === selectedNetwork) || networks[0];

  const [readNotifIds, setReadNotifIds] = useState<string[]>(['n-3']);

  const notifications: NotificationItem[] = [
    {
      id: 'n-1',
      title: language === 'id' ? 'Menerima 250 USDC' : 'Received 250 USDC',
      message: language === 'id' ? 'Dari sarah.eth via Base L2. Selesai dalam 1,4 detik.' : 'From sarah.eth via Base L2. Settled in 1.4s.',
      time: language === 'id' ? '14 mnt lalu' : '14m ago',
      read: readNotifIds.includes('n-1'),
      type: 'tx',
    },
    {
      id: 'n-2',
      title: language === 'id' ? 'Enklaf MPC Tersinkronisasi' : 'MPC Cloud Enclave Synced',
      message: language === 'id' ? 'Cadangan ambang biometrik berhasil diverifikasi.' : 'Biometric threshold backup verified successfully.',
      time: language === 'id' ? '1 jam lalu' : '1h ago',
      read: readNotifIds.includes('n-2'),
      type: 'security',
    },
    {
      id: 'n-3',
      title: language === 'id' ? 'Bridge LayerZero Selesai' : 'LayerZero Bridge Complete',
      message: language === 'id' ? '1,25 ETH dipindahkan dari Ethereum ke Base.' : '1.25 ETH moved from Ethereum to Base.',
      time: language === 'id' ? '1 hari lalu' : '1d ago',
      read: readNotifIds.includes('n-3'),
      type: 'tx',
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleCopy = () => {
    navigator.clipboard?.writeText(walletAddress);
    setCopied(true);
    showToast(t.copyAddress, t.addressCopied, 'copy');
    setTimeout(() => setCopied(false), 2000);
  };

  const getNetworkIcon = (id: string) => {
    switch (id) {
      case 'base':
        return <BaseIcon className="w-4 h-4 text-[#0095FF]" />;
      case 'ethereum':
        return <EthereumIcon className="w-4 h-4 text-indigo-400" />;
      case 'solana':
        return <SolanaIcon className="w-4 h-4 text-emerald-400" />;
      case 'arbitrum':
        return <ArbitrumIcon className="w-4 h-4 text-blue-400" />;
      case 'polygon':
        return <PolygonIcon className="w-4 h-4 text-purple-400" />;
      case 'optimism':
        return <OptimismIcon className="w-4 h-4 text-red-500" />;
      default:
        return <BaseIcon className="w-4 h-4 text-white" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white flex flex-col overflow-x-hidden selection:bg-[#0095FF]/30 pb-28">
      
      {/* 1. TOPBAR: Sticky transparent background, no borders/separators, elements styled as cards */}
      <header className="sticky top-0 z-40 bg-transparent px-4 sm:px-6 pt-4 pb-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Left: Wallet Address Card */}
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#141419] border border-white/10 shadow-lg shadow-black/40 hover:border-white/20 transition-all">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="text-xs font-mono font-medium text-neutral-200">
              0x7F2...8b1e
            </span>
            <button
              onClick={handleCopy}
              className="text-neutral-400 hover:text-white transition-colors ml-0.5 p-1 rounded-lg hover:bg-white/[0.06] cursor-pointer"
              title={t.copyAddress}
              aria-label={t.copyAddress}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Right: Network Selector Card + Notification Bell Card */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Network Selector Card */}
            <div className="relative" ref={networkRef}>
              <button
                onClick={() => {
                  setNetworkDropdownOpen(!networkDropdownOpen);
                  setNotificationsOpen(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#141419] border ${
                  networkDropdownOpen
                    ? 'border-[#0095FF] text-white'
                    : 'border-white/10 hover:border-white/20 text-neutral-200 hover:text-white'
                } shadow-md shadow-black/40 text-xs font-medium transition-colors duration-150 active:scale-[0.98] cursor-pointer select-none`}
                aria-label="Select Network"
              >
                {getNetworkIcon(currentNetworkObj.id)}
                <span className="hidden sm:inline font-medium">{currentNetworkObj.name}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ease-out ${
                    networkDropdownOpen ? 'rotate-180 text-white' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {networkDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.12, ease: 'easeOut' }}
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#141419] border border-white/10 shadow-2xl shadow-black/80 p-2 z-50 space-y-1"
                  >
                    <div className="px-3 py-1 text-[10px] uppercase font-mono text-neutral-500 font-semibold">
                      {t.selectActiveNetwork}
                    </div>
                    {networks.map((net) => (
                      <button
                        key={net.id}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedNetwork(net.id);
                          setNetworkDropdownOpen(false);
                          showToast(
                            language === 'id' ? `Jaringan Aktif: ${net.name}` : `Active Network: ${net.name}`,
                            language === 'id' ? `Tersambung ke RPC ${net.name}` : `Connected to ${net.name} RPC`,
                            'info'
                          );
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-colors duration-100 text-left cursor-pointer ${
                          selectedNetwork === net.id
                            ? 'bg-[#0095FF]/20 text-white font-semibold'
                            : 'hover:bg-white/[0.05] text-neutral-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {getNetworkIcon(net.id)}
                          <span>{net.name}</span>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-400">{net.badge}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notification Bell Card */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setNetworkDropdownOpen(false);
                }}
                className={`p-2.5 rounded-2xl bg-[#141419] border ${
                  notificationsOpen
                    ? 'border-[#0095FF] text-white'
                    : 'border-white/10 hover:border-white/20 text-neutral-300 hover:text-white'
                } shadow-md shadow-black/40 transition-colors duration-150 active:scale-[0.98] relative cursor-pointer select-none`}
                aria-label="Notifications"
              >
                <Bell
                  className={`w-4 h-4 transition-transform duration-200 ease-out ${
                    notificationsOpen ? 'rotate-12 text-[#0095FF]' : ''
                  }`}
                />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#0095FF]" />
                )}
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.12, ease: 'easeOut' }}
                    className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#141419] border border-white/10 shadow-2xl shadow-black/80 p-4 z-50 space-y-2"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                      <span className="text-xs font-bold text-white">{t.notifications}</span>
                      <button
                        onClick={() => {
                          setReadNotifIds(['n-1', 'n-2', 'n-3']);
                          showToast(
                            language === 'id' ? 'Notifikasi Ditandai' : 'Notifications Updated',
                            language === 'id' ? 'Semua notifikasi telah ditandai dibaca' : 'All notifications marked as read',
                            'info'
                          );
                        }}
                        className="text-[10px] text-[#0095FF] hover:underline cursor-pointer"
                      >
                        {t.markAllRead}
                      </button>
                    </div>

                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-2.5 rounded-xl border text-xs transition-colors ${
                            notif.read
                              ? 'bg-transparent border-transparent text-neutral-400'
                              : 'bg-white/[0.03] border-white/[0.06] text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-white">{notif.title}</span>
                            <span className="text-[10px] text-neutral-500 font-mono">{notif.time}</span>
                          </div>
                          <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                            {notif.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </header>

      {/* 2. MAIN CONTENT VIEWPORT */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-4 sm:py-6 min-w-0">
        {children}
      </main>

      {/* 3. CAPSULE BOTTOM NAVBAR: Portaled to document.body so it stays strictly fixed to the viewport during pull-to-refresh without shifting */}
      {typeof document !== 'undefined'
        ? createPortal(
            <nav
              aria-label="Bottom Navigation"
              className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto w-[calc(100%-1.25rem)] max-w-xl sm:max-w-2xl px-1"
            >
              <div className="w-full flex items-center justify-around sm:justify-between px-2 sm:px-8 py-2.5 rounded-full bg-[#141419]/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/90">
                {/* Item 1: Dashboard */}
                <button
                  onClick={() => {
                    cancelRefresh();
                    onPageChange('dashboard');
                  }}
                  aria-label={t.navDashboard}
                  title={t.navDashboard}
                  className="relative flex-1 max-w-[56px] h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer group"
                >
                  {currentPage === 'dashboard' && (
                    <motion.div
                      layoutId="glassesLens"
                      className="absolute inset-0 rounded-full bg-white/[0.12] backdrop-blur-md border border-white/20 shadow-inner"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <LayoutDashboard
                    className={`w-5 h-5 relative z-10 transition-colors ${
                      currentPage === 'dashboard' ? 'text-[#0095FF]' : 'text-neutral-400 group-hover:text-white'
                    }`}
                  />
                </button>

                {/* Item 2: Portfolio */}
                <button
                  onClick={() => {
                    cancelRefresh();
                    onPageChange('portfolio');
                  }}
                  aria-label={t.navPortfolio}
                  title={t.navPortfolio}
                  className="relative flex-1 max-w-[56px] h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer group"
                >
                  {currentPage === 'portfolio' && (
                    <motion.div
                      layoutId="glassesLens"
                      className="absolute inset-0 rounded-full bg-white/[0.12] backdrop-blur-md border border-white/20 shadow-inner"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <PieChart
                    className={`w-5 h-5 relative z-10 transition-colors ${
                      currentPage === 'portfolio' ? 'text-[#0095FF]' : 'text-neutral-400 group-hover:text-white'
                    }`}
                  />
                </button>

                {/* Item 3: CENTER ITEM (ELEVATED DISTINCT FLOATING SWAP BUTTON) */}
                <div className="relative -translate-y-3.5 sm:-translate-y-4 px-1 sm:px-2 shrink-0">
                  <button
                    onClick={() => {
                      cancelRefresh();
                      onQuickAction('swap');
                    }}
                    aria-label={t.navSwap}
                    title={t.navSwap}
                    className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-2xl sm:rounded-full bg-[#0095FF] hover:bg-[#0080E0] text-white shadow-lg shadow-black/50 border border-white/20 flex flex-col items-center justify-center p-1 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <Repeat className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white group-hover:rotate-180 transition-transform duration-300" />
                      <span className="text-[8px] font-bold uppercase tracking-wider text-white/90 mt-0.5 font-mono">
                        {t.navSwap}
                      </span>
                    </div>
                  </button>
                </div>

                {/* Item 4: Activity */}
                <button
                  onClick={() => {
                    cancelRefresh();
                    onPageChange('activity');
                  }}
                  aria-label={t.navActivity}
                  title={t.navActivity}
                  className="relative flex-1 max-w-[56px] h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer group"
                >
                  {currentPage === 'activity' && (
                    <motion.div
                      layoutId="glassesLens"
                      className="absolute inset-0 rounded-full bg-white/[0.12] backdrop-blur-md border border-white/20 shadow-inner"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <History
                    className={`w-5 h-5 relative z-10 transition-colors ${
                      currentPage === 'activity' ? 'text-[#0095FF]' : 'text-neutral-400 group-hover:text-white'
                    }`}
                  />
                </button>

                {/* Item 5: Settings (Privy Embedded Wallet & Preferences) */}
                <button
                  onClick={() => {
                    cancelRefresh();
                    onPageChange('settings');
                  }}
                  aria-label={t.navSettings}
                  title={t.navSettings}
                  className="relative flex-1 max-w-[56px] h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer group"
                >
                  {(currentPage === 'settings' || currentPage === 'wallet') && (
                    <motion.div
                      layoutId="glassesLens"
                      className="absolute inset-0 rounded-full bg-white/[0.12] backdrop-blur-md border border-white/20 shadow-inner"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <Settings
                    className={`w-5 h-5 relative z-10 transition-colors ${
                      currentPage === 'settings' || currentPage === 'wallet' ? 'text-[#0095FF]' : 'text-neutral-400 group-hover:text-white'
                    }`}
                  />
                </button>
              </div>
            </nav>,
            document.body
          )
        : null}

    </div>
  );
};
