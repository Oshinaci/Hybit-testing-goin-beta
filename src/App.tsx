import React, { useState } from 'react';
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
import { useToast } from './context/ToastContext';

// Dashboard Components
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { DashboardHome } from './components/dashboard/DashboardHome';
import { PortfolioView } from './components/dashboard/PortfolioView';
import { ActivityView } from './components/dashboard/ActivityView';
import { WalletView } from './components/dashboard/WalletView';
import { SettingsView } from './components/dashboard/SettingsView';
import { QuickActionModals } from './components/dashboard/QuickActionModals';
import { DashboardPage } from './types/dashboard';

export default function App() {
  const { showComingSoon } = useToast();
  // Navigation view: 'landing' or 'dashboard'
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');
  const [dashboardPage, setDashboardPage] = useState<DashboardPage>('dashboard');

  // Quick action modal state (Send, Receive, Swap, Buy, Bridge)
  const [activeQuickAction, setActiveQuickAction] = useState<
    'send' | 'receive' | 'swap' | 'buy' | 'bridge' | null
  >(null);

  // Launching loading screen state
  const [isLaunching, setIsLaunching] = useState(false);

  // "Launch App" triggers the 3-second Hybit logo water loading screen
  const handleLaunchApp = () => {
    setCurrentView('dashboard');
    setDashboardPage('dashboard');
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

  // Only trigger coming soon notification, no download page shown
  const handleDownload = () => {
    showComingSoon('Hybit Mobile App (iOS & Android)');
  };

  // Render Dashboard View
  if (currentView === 'dashboard') {
    return (
      <PullToRefresh>
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

          {/* Hybit Water Flow Loading Screen (shown on launch) */}
          {isLaunching && (
            <LoadingScreen duration={3200} onComplete={handleLaunchComplete} />
          )}
        </div>
      </PullToRefresh>
    );
  }

  // Render Landing Page View (Unchanged, fully intact)
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

      {/* Hybit Water Flow Loading Screen (only triggered when user clicks Launch App) */}
      {isLaunching && (
        <LoadingScreen duration={3200} onComplete={handleLaunchComplete} />
      )}
    </div>
  );
}
