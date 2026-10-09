import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustedBy } from './components/TrustedBy';
import { Features } from './components/Features';
import { WalletPreview } from './components/WalletPreview';
import { Security } from './components/Security';
import { Ecosystem } from './components/Ecosystem';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { PullToRefresh } from './components/PullToRefresh';
import { ConnectWalletModal } from './components/ConnectWalletModal';
import { useToast } from './context/ToastContext';
import { useWallet, WALLET_STORAGE_KEY } from './context/WalletContext';

// Dashboard Components
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { DashboardHome } from './components/dashboard/DashboardHome';
import { PortfolioView } from './components/dashboard/PortfolioView';
import { ActivityView } from './components/dashboard/ActivityView';
import { SettingsView } from './components/dashboard/SettingsView';
import { QuickActionModals } from './components/dashboard/QuickActionModals';
import { DashboardPage } from './types/dashboard';

export default function App() {
  const { showComingSoon } = useToast();
  const {
    isWalletConnected,
    isConnectModalOpen,
    closeConnectModal,
    openConnectModal,
  } = useWallet();

  // Browser refresh & initial route logic:
  // - Belum connect wallet: arahkan user ke landing page
  // - Sudah connect wallet: arahkan user ke loading screen langsung tanpa ke landing page untuk melakukan launch app
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>(() => {
    try {
      const isConnected = localStorage.getItem(WALLET_STORAGE_KEY) === 'true';
      return isConnected ? 'dashboard' : 'landing';
    } catch {
      return 'landing';
    }
  });
  const [dashboardPage, setDashboardPage] = useState<DashboardPage>('dashboard');

  // Quick action modal state (Send, Receive, Swap, Buy, Bridge)
  const [activeQuickAction, setActiveQuickAction] = useState<
    'send' | 'receive' | 'swap' | 'buy' | 'bridge' | null
  >(null);

  // Launching loading screen state:
  // When browser refreshes, if wallet is already connected, start directly with pure loading screen!
  const [isLaunching, setIsLaunching] = useState<boolean>(() => {
    try {
      return localStorage.getItem(WALLET_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [loadingKey, setLoadingKey] = useState<number>(0);

  // Track wallet connection in ref for background resume listener
  const isWalletConnectedRef = useRef(isWalletConnected);
  isWalletConnectedRef.current = isWalletConnected;

  // Logic Sesi Waktu Latar Belakang (10 Detik):
  // - User meninggalkan Hybit di latar belakang browser (tab switch / minimize / app switch):
  //   1. Kurang dari 10 detik (< 10.000 ms):
  //      - TIDAK menampilkan loading screen. Pengguna tetap di layar dan fitur saat ini tanpa gangguan.
  //   2. 10 detik atau lebih (>= 10.000 ms):
  //      - User SUDAH connect wallet: langsung tampilkan Loading Screen Hybit dan masuk ke dashboard tanpa ke landing page.
  //      - User BELUM connect wallet: arahkan ke landing page dan TIDAK menampilkan loading screen.
  //   * Catatan Penting: HANYA gunakan Page Visibility API (document.visibilitychange).
  //     DILARANG menggunakan window blur/focus/pagehide karena blur terpanggil saat pengguna masih aktif di dashboard
  //     (misal saat klik elemen, berpindah fitur, klik di luar iframe, atau saat sedang membaca) sehingga
  //     menyebabkan loading screen muncul sendiri atau muncul saat klik fitur lain.
  useEffect(() => {
    let wasBackground = false;
    let leaveTimestamp = 0;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Tab benar-benar masuk ke latar belakang browser
        wasBackground = true;
        leaveTimestamp = Date.now();
      } else if (document.visibilityState === 'visible') {
        // Tab kembali ke latar depan
        if (!wasBackground) return;
        wasBackground = false;

        const timeAway = Date.now() - leaveTimestamp;
        leaveTimestamp = 0;

        // Kurang dari 10 detik: jangan tampilkan loading screen, biarkan user di posisi saat ini
        if (timeAway < 10000) {
          return;
        }

        // 10 detik atau lebih (>= 10.000 ms):
        const isConnected = isWalletConnectedRef.current;

        if (isConnected) {
          // User SUDAH connect wallet:
          // Langsung tampilkan Loading Screen Hybit dan masuk ke dashboard tanpa ke landing page
          setCurrentView('dashboard');
          setActiveQuickAction(null);
          setLoadingKey((prev) => prev + 1);
          setIsLaunching(true);
          if (window.scrollY > 0) {
            window.scrollTo(0, 0);
          }
        } else {
          // User BELUM connect wallet:
          // Arahkan ke landing page dan TIDAK menampilkan loading screen
          setIsLaunching(false);
          setActiveQuickAction(null);
          setCurrentView('landing');
          if (window.scrollY > 0) {
            window.scrollTo(0, 0);
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // "Launch App" triggers the 3-second Hybit logo water loading screen
  const handleLaunchApp = () => {
    setCurrentView('dashboard');
    setDashboardPage('dashboard');
    setLoadingKey((prev) => prev + 1);
    setIsLaunching(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleLaunchComplete = () => {
    setIsLaunching(false);
  };

  const handleBackToLanding = () => {
    setIsLaunching(false);
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWalletConnectedFromLanding = () => {
    setCurrentView('dashboard');
    setDashboardPage('dashboard');
    setLoadingKey((prev) => prev + 1);
    setIsLaunching(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Only trigger coming soon notification, no download page shown
  const handleDownload = () => {
    showComingSoon('Hybit Mobile App (iOS & Android)');
  };

  // Render Dashboard View
  if (currentView === 'dashboard') {
    return (
      <>
        {/* Pure Loading Screen: rendered completely outside PullToRefresh, perfectly isolating loading screen */}
        {isLaunching && (
          <LoadingScreen
            key={loadingKey}
            duration={3200}
            onComplete={handleLaunchComplete}
          />
        )}

        <PullToRefresh disabled={isLaunching}>
          <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] font-sans antialiased overflow-x-hidden selection:bg-[#0095FF]/30 selection:text-white">
            <DashboardLayout
              currentPage={dashboardPage}
              onPageChange={(page) => {
                setDashboardPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBackToLanding={handleBackToLanding}
              onQuickAction={(action) => setActiveQuickAction(action)}
            >
              {dashboardPage === 'dashboard' && (
                <DashboardHome
                  onQuickAction={(action) => setActiveQuickAction(action)}
                  onNavigateToPortfolio={() => setDashboardPage('portfolio')}
                  onNavigateToActivity={() => setDashboardPage('activity')}
                />
              )}

              {dashboardPage === 'portfolio' && (
                <PortfolioView
                  onQuickAction={(action) => setActiveQuickAction(action)}
                />
              )}

              {dashboardPage === 'activity' && <ActivityView />}

              {(dashboardPage === 'wallet' || dashboardPage === 'settings') && <SettingsView />}
            </DashboardLayout>

            {/* Interactive Quick Action Modals */}
            <QuickActionModals
              type={activeQuickAction}
              onClose={() => setActiveQuickAction(null)}
            />

            {/* Connect Wallet Modal */}
            <ConnectWalletModal
              isOpen={isConnectModalOpen}
              onClose={closeConnectModal}
            />
          </div>
        </PullToRefresh>
      </>
    );
  }

  // Render Landing Page View
  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] font-sans antialiased overflow-x-hidden selection:bg-[#0095FF]/30 selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar onLaunchApp={handleLaunchApp} onDownload={handleDownload} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section with GoPay-inspired crypto phone mockup */}
        <Hero onLaunchApp={handleLaunchApp} onDownload={handleDownload} />

        {/* Trusted By & Protocol Integrations */}
        <TrustedBy />

        {/* 6 Core Feature Cards */}
        <Features onExploreFeature={(_id) => handleLaunchApp()} />

        {/* Full-Fidelity Desktop Wallet Preview with interactive chart & swap */}
        <WalletPreview onLaunchApp={handleLaunchApp} />

        {/* Security Pillars: Non-custodial, Open Source, Audited, MPC, Encrypted Recovery */}
        <Security />

        {/* Multi-Chain Ecosystem Grid with live telemetry */}
        <Ecosystem />

        {/* Verified User & Developer Testimonials */}
        <Testimonials />

        {/* FAQ Accordion */}
        <FAQ />

        {/* Large Conversion CTA Banner */}
        <CTA onLaunchApp={handleLaunchApp} onDownload={handleDownload} />
      </main>

      {/* Footer with Legal, Company, and Operational status */}
      <Footer onDownload={handleDownload} />

      {/* Connect Wallet Modal */}
      <ConnectWalletModal
        isOpen={isConnectModalOpen}
        onClose={closeConnectModal}
        onConnectedSuccess={handleWalletConnectedFromLanding}
      />

      {/* Hybit Water Flow Loading Screen (only triggered when user clicks Launch App) */}
      {isLaunching && (
        <LoadingScreen
          key={loadingKey}
          duration={3200}
          onComplete={handleLaunchComplete}
        />
      )}
    </div>
  );
}
