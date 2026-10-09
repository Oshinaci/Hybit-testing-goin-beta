import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

export type AppLanguage = 'id' | 'en';

export interface CurrencyConfig {
  id: string;
  symbol: string;
  code: string;
  name: string;
  rate: number; // Multiplier from USD
  locale: string;
  decimals: number;
}

export const CURRENCY_OPTIONS: CurrencyConfig[] = [
  { id: 'USD', symbol: '$', code: 'USD', name: 'US Dollar', rate: 1.0, locale: 'en-US', decimals: 2 },
  { id: 'IDR', symbol: 'Rp', code: 'IDR', name: 'Indonesian Rupiah', rate: 16000, locale: 'id-ID', decimals: 0 },
  { id: 'EUR', symbol: '€', code: 'EUR', name: 'Euro', rate: 0.92, locale: 'de-DE', decimals: 2 },
  { id: 'GBP', symbol: '£', code: 'GBP', name: 'British Pound', rate: 0.79, locale: 'en-GB', decimals: 2 },
  { id: 'JPY', symbol: '¥', code: 'JPY', name: 'Japanese Yen', rate: 154.5, locale: 'ja-JP', decimals: 0 },
  { id: 'SGD', symbol: 'S$', code: 'SGD', name: 'Singapore Dollar', rate: 1.35, locale: 'en-SG', decimals: 2 },
];

export interface LanguageOption {
  id: AppLanguage;
  name: string;
  nativeName: string;
  code: string;
  flag: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { id: 'id', name: 'Bahasa Indonesia', nativeName: 'Bahasa Indonesia', code: 'ID', flag: '🇮🇩' },
  { id: 'en', name: 'English', nativeName: 'English (US)', code: 'EN', flag: '🇺🇸' },
];

export interface TranslationDictionary {
  // Navigation & Topbar
  navDashboard: string;
  navPortfolio: string;
  navActivity: string;
  navSettings: string;
  navSwap: string;
  copyAddress: string;
  addressCopied: string;
  notifications: string;
  markAllRead: string;
  noNotifications: string;
  walletVerified: string;
  
  // Balance Card
  balanceLabel: string;
  balanceHiddenNotice: string;
  balanceShownNotice: string;
  todayGainSuffix: string;
  
  // Quick Actions
  actionSend: string;
  actionReceive: string;
  actionSwap: string;
  actionBuy: string;
  actionBridge: string;
  
  // Portfolio Assets Section
  portfolioAssetsTitle: string;
  viewAll: string;
  colAsset: string;
  colBalance: string;
  colPrice: string;
  colValue: string;
  col24hChange: string;
  
  // Recent Activity
  recentActivityTitle: string;
  txReceived: string;
  txSent: string;
  txSwap: string;
  txBridge: string;
  txConfirmed: string;
  txPending: string;
  
  // Portfolio View
  portfolioTitle: string;
  portfolioSubtitle: string;
  totalValue: string;
  allChains: string;
  searchTokens: string;
  tf1D: string;
  tf1W: string;
  tf1M: string;
  tf1Y: string;
  tfALL: string;
  assetAllocation: string;
  
  // Activity View
  activityTitle: string;
  activitySubtitle: string;
  filterAll: string;
  filterReceived: string;
  filterSent: string;
  filterSwap: string;
  filterBridge: string;
  exportCsv: string;
  txDetails: string;
  close: string;
  status: string;
  chain: string;
  timestamp: string;
  hash: string;
  fee: string;
  from: string;
  to: string;
  copyHash: string;
  hashCopied: string;
  
  // Settings View
  settingsTitle: string;
  settingsSubtitle: string;
  walletCardTitle: string;
  walletEmailLabel: string;
  walletAddressLabel: string;
  securitySectionTitle: string;
  passkeyTitle: string;
  passkeyDesc: string;
  autoLockTitle: string;
  autoLockDesc: string;
  selectAutoLockTimer: string;
  preferencesSectionTitle: string;
  primaryCurrencyTitle: string;
  primaryCurrencyDesc: string;
  selectPrimaryCurrency: string;
  languageTitle: string;
  languageDesc: string;
  selectLanguage: string;
  connectedDappsTitle: string;
  disconnectSession: string;
  savedNoticeDefault: string;
  languageChangedToast: (langName: string) => string;
  currencyChangedToast: (currName: string, currCode: string) => string;
  
  // Quick Action Modals & Global Terms
  sendTitle: string;
  receiveTitle: string;
  swapTitle: string;
  buyTitle: string;
  bridgeTitle: string;
  recipientAddress: string;
  amount: string;
  available: string;
  networkFee: string;
  confirmSend: string;
  confirmSwap: string;
  confirmBuy: string;
  confirmBridge: string;
  sending: string;
  successTitle: string;
  failedTitle: string;
  done: string;
  youPay: string;
  youReceive: string;
  youPayFrom: string;
  youReceiveOn: string;
  newTransaction: string;
  selectToken: string;
  searchToken: string;
  sourceChain: string;
  destinationChain: string;
  selectSourceChain: string;
  selectDestChain: string;
  paymentMethod: string;
  creditOrDebit: string;
  selectActiveNetwork: string;
  fullHistory: string;
  feeLabel: string;
}

const TRANSLATIONS: Record<AppLanguage, TranslationDictionary> = {
  id: {
    navDashboard: 'Dashboard',
    navPortfolio: 'Portofolio',
    navActivity: 'Aktivitas',
    navSettings: 'Pengaturan',
    navSwap: 'Tukar',
    copyAddress: 'Salin Alamat Dompet',
    addressCopied: 'Alamat Dompet Disalin',
    notifications: 'Notifikasi',
    markAllRead: 'Tandai semua dibaca',
    noNotifications: 'Tidak ada notifikasi baru',
    walletVerified: 'Aktif & Terverifikasi',
    
    balanceLabel: 'Saldo',
    balanceHiddenNotice: 'Nominal saldo disamarkan',
    balanceShownNotice: 'Nominal saldo ditampilkan penuh',
    todayGainSuffix: 'Hari Ini',
    
    actionSend: 'Kirim',
    actionReceive: 'Terima',
    actionSwap: 'Tukar',
    actionBuy: 'Beli',
    actionBridge: 'Bridge',
    
    portfolioAssetsTitle: 'Aset Portofolio',
    viewAll: 'Lihat Semua',
    colAsset: 'Aset',
    colBalance: 'Saldo',
    colPrice: 'Harga',
    colValue: 'Nilai',
    col24hChange: '24 Jam',
    
    recentActivityTitle: 'Aktivitas Terkini',
    txReceived: 'Diterima',
    txSent: 'Terkirim',
    txSwap: 'Tukar',
    txBridge: 'Bridge',
    txConfirmed: 'Berhasil',
    txPending: 'Memproses',
    
    portfolioTitle: 'Portofolio & Analitik',
    portfolioSubtitle: 'Pelacakan aset multi-chain terpadu, kinerja portofolio, dan alokasi modal.',
    totalValue: 'Total Nilai Portofolio',
    allChains: 'Semua Jaringan',
    searchTokens: 'Cari token atau nama jaringan...',
    tf1D: '24 Jam Terakhir',
    tf1W: '7 Hari Terakhir',
    tf1M: '30 Hari Terakhir',
    tf1Y: '1 Tahun Terakhir',
    tfALL: 'Sepanjang Waktu',
    assetAllocation: 'Alokasi Aset',
    
    activityTitle: 'Riwayat Transaksi',
    activitySubtitle: 'Catatan seluruh transaksi on-chain, penukaran, bridge, dan transfer masuk/keluar.',
    filterAll: 'Semua',
    filterReceived: 'Diterima',
    filterSent: 'Terkirim',
    filterSwap: 'Tukar',
    filterBridge: 'Bridge',
    exportCsv: 'Unduh CSV',
    txDetails: 'Rincian Transaksi',
    close: 'Tutup',
    status: 'Status',
    chain: 'Jaringan Chain',
    timestamp: 'Waktu Transaksi',
    hash: 'Hash Transaksi',
    fee: 'Biaya Gas On-Chain',
    from: 'Pengirim (Dari)',
    to: 'Penerima (Ke)',
    copyHash: 'Salin Hash',
    hashCopied: 'Hash Transaksi Disalin',
    
    settingsTitle: 'Pengaturan & Keamanan',
    settingsSubtitle: 'Kelola dompet Privy embedded, keamanan biometrik, mata uang, dan preferensi bahasa.',
    walletCardTitle: 'Dompet Tertanam Privy MPC',
    walletEmailLabel: 'Terkait Akun Email',
    walletAddressLabel: 'Alamat Publik MPC',
    securitySectionTitle: 'Keamanan & Akses Biometrik',
    passkeyTitle: 'Passkey Biometrik (Face ID / Sidik Jari)',
    passkeyDesc: 'Gunakan keamanan perangkat untuk otorisasi transaksi tanpa seed phrase.',
    autoLockTitle: 'Kunci Otomatis Sesi',
    autoLockDesc: 'Kunci sesi dompet secara otomatis ketika tidak ada aktivitas aktif.',
    selectAutoLockTimer: 'PILIH WAKTU KUNCI OTOMATIS',
    preferencesSectionTitle: 'Preferensi & Tampilan',
    primaryCurrencyTitle: 'Mata Uang Utama',
    primaryCurrencyDesc: 'Denominasi mata uang untuk total saldo dompet, harga token, dan portofolio',
    selectPrimaryCurrency: 'PILIH MATA UANG UTAMA',
    languageTitle: 'Bahasa',
    languageDesc: 'Pilih bahasa tampilan antarmuka aplikasi yang Anda inginkan',
    selectLanguage: 'PILIH BAHASA',
    connectedDappsTitle: 'Sesi Aplikasi Terhubung',
    disconnectSession: 'Putus Koneksi',
    savedNoticeDefault: 'Pengaturan berhasil diperbarui dan disimpan.',
    languageChangedToast: (langName) => `Bahasa berhasil diubah ke ${langName}.`,
    currencyChangedToast: (currName, currCode) => `Mata uang utama diubah ke ${currName} (${currCode}).`,
    
    sendTitle: 'Kirim Aset Kripto',
    receiveTitle: 'Terima Aset Kripto',
    swapTitle: 'Tukar Token',
    buyTitle: 'Beli Kripto',
    bridgeTitle: 'Bridge Lintas Jaringan',
    recipientAddress: 'Alamat Dompet Penerima (0x... / ENS / SNS)',
    amount: 'Jumlah Nominal',
    available: 'Tersedia',
    networkFee: 'Estimasi Biaya Gas',
    confirmSend: 'Kirim Sekarang',
    confirmSwap: 'Konfirmasi Tukar',
    confirmBuy: 'Lanjutkan Pembelian',
    confirmBridge: 'Mulai Transfer Bridge',
    sending: 'Memproses Transaksi...',
    successTitle: 'Transaksi Berhasil',
    failedTitle: 'Transaksi Gagal Diproses',
    done: 'Selesai',
    youPay: 'Anda Bayar',
    youReceive: 'Anda Terima (Estimasi)',
    youPayFrom: 'Anda Bayar (Dari Jaringan Asal)',
    youReceiveOn: 'Anda Terima (Di Jaringan Tujuan)',
    newTransaction: 'Transaksi Baru',
    selectToken: 'Pilih Token',
    searchToken: 'Cari token...',
    sourceChain: 'Jaringan Asal',
    destinationChain: 'Jaringan Tujuan',
    selectSourceChain: 'Pilih Jaringan Asal',
    selectDestChain: 'Pilih Jaringan Tujuan',
    paymentMethod: 'Metode Pembayaran',
    creditOrDebit: 'Kartu Kredit / Debit',
    selectActiveNetwork: 'PILIH JARINGAN AKTIF',
    fullHistory: 'Riwayat Lengkap',
    feeLabel: 'Biaya:',
  },
  en: {
    navDashboard: 'Dashboard',
    navPortfolio: 'Portfolio',
    navActivity: 'Activity',
    navSettings: 'Settings',
    navSwap: 'Swap',
    copyAddress: 'Copy Wallet Address',
    addressCopied: 'Wallet Address Copied',
    notifications: 'Notifications',
    markAllRead: 'Mark all as read',
    noNotifications: 'No new notifications',
    walletVerified: 'Active & Verified',
    
    balanceLabel: 'Balance',
    balanceHiddenNotice: 'Balance masked for privacy',
    balanceShownNotice: 'Balance displayed in full',
    todayGainSuffix: 'Today',
    
    actionSend: 'Send',
    actionReceive: 'Receive',
    actionSwap: 'Swap',
    actionBuy: 'Buy',
    actionBridge: 'Bridge',
    
    portfolioAssetsTitle: 'Portfolio Assets',
    viewAll: 'View All',
    colAsset: 'Asset',
    colBalance: 'Balance',
    colPrice: 'Price',
    colValue: 'Value',
    col24hChange: '24h',
    
    recentActivityTitle: 'Recent Activity',
    txReceived: 'Received',
    txSent: 'Sent',
    txSwap: 'Swap',
    txBridge: 'Bridge',
    txConfirmed: 'Confirmed',
    txPending: 'Processing',
    
    portfolioTitle: 'Portfolio & Analytics',
    portfolioSubtitle: 'Unified multi-chain asset tracking, performance analytics, and capital allocation.',
    totalValue: 'Total Portfolio Value',
    allChains: 'All Chains',
    searchTokens: 'Search token symbol or chain name...',
    tf1D: 'Past 24 Hours',
    tf1W: 'Past 7 Days',
    tf1M: 'Past 30 Days',
    tf1Y: 'Past 1 Year',
    tfALL: 'All Time',
    assetAllocation: 'Asset Allocation',
    
    activityTitle: 'Transaction History',
    activitySubtitle: 'Comprehensive ledger of all on-chain transactions, swaps, bridges, and transfers.',
    filterAll: 'All',
    filterReceived: 'Received',
    filterSent: 'Sent',
    filterSwap: 'Swap',
    filterBridge: 'Bridge',
    exportCsv: 'Export CSV',
    txDetails: 'Transaction Details',
    close: 'Close',
    status: 'Status',
    chain: 'Chain Network',
    timestamp: 'Timestamp',
    hash: 'Transaction Hash',
    fee: 'On-Chain Gas Fee',
    from: 'From',
    to: 'To',
    copyHash: 'Copy Hash',
    hashCopied: 'Transaction Hash Copied',
    
    settingsTitle: 'Settings & Security',
    settingsSubtitle: 'Manage your Privy embedded wallet, biometric passkeys, currency, and language preferences.',
    walletCardTitle: 'Privy Embedded Wallet',
    walletEmailLabel: 'Tied Email Account',
    walletAddressLabel: 'Public MPC Address',
    securitySectionTitle: 'Security & Biometrics',
    passkeyTitle: 'Biometric Passkey (Face ID / Fingerprint)',
    passkeyDesc: 'Use hardware enclave for gasless transaction signing without seed phrase.',
    autoLockTitle: 'Session Auto-Lock',
    autoLockDesc: 'Automatically lock wallet session when inactive.',
    selectAutoLockTimer: 'SELECT AUTO-LOCK TIMER',
    preferencesSectionTitle: 'Preferences & Display',
    primaryCurrencyTitle: 'Primary Currency',
    primaryCurrencyDesc: 'Currency denomination for total wallet balance, token prices, and portfolio',
    selectPrimaryCurrency: 'SELECT PRIMARY CURRENCY',
    languageTitle: 'Language',
    languageDesc: 'Choose your preferred application interface language',
    selectLanguage: 'SELECT LANGUAGE',
    connectedDappsTitle: 'Connected dApp Sessions',
    disconnectSession: 'Revoke Access',
    savedNoticeDefault: 'Preferences updated and synced to encrypted enclave.',
    languageChangedToast: (langName) => `Language changed to ${langName}.`,
    currencyChangedToast: (currName, currCode) => `Primary currency changed to ${currName} (${currCode}).`,
    
    sendTitle: 'Send Crypto Assets',
    receiveTitle: 'Receive Crypto Assets',
    swapTitle: 'Swap Tokens',
    buyTitle: 'Buy Crypto (Fiat On-Ramp)',
    bridgeTitle: 'Cross-Chain Bridge',
    recipientAddress: 'Recipient Wallet Address (0x... / ENS / SNS)',
    amount: 'Amount',
    available: 'Available',
    networkFee: 'Estimated Gas Fee',
    confirmSend: 'Send Now',
    confirmSwap: 'Confirm Swap',
    confirmBuy: 'Proceed to Buy',
    confirmBridge: 'Initiate Bridge',
    sending: 'Processing Transaction...',
    successTitle: 'Transaction Confirmed',
    failedTitle: 'Transaction Failed',
    done: 'Done',
    youPay: 'You Pay',
    youReceive: 'You Receive (Estimated)',
    youPayFrom: 'You Pay (From Source Chain)',
    youReceiveOn: 'You Receive (On Destination Chain)',
    newTransaction: 'New Transaction',
    selectToken: 'Select Token',
    searchToken: 'Search token...',
    sourceChain: 'Source Chain',
    destinationChain: 'Destination Chain',
    selectSourceChain: 'Select Source Chain',
    selectDestChain: 'Select Destination Chain',
    paymentMethod: 'Payment Method',
    creditOrDebit: 'Credit / Debit Card',
    selectActiveNetwork: 'SELECT ACTIVE NETWORK',
    fullHistory: 'Full History',
    feeLabel: 'Fee:',
  },
};

interface AppSettingsContextValue {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  currency: string;
  setCurrency: (currId: string) => void;
  currentCurrency: CurrencyConfig;
  currentLanguage: LanguageOption;
  t: TranslationDictionary;
  formatCurrency: (usdValue: number, customDecimals?: number) => string;
  formatGain: (usdValue: number) => string;
  convertUsd: (usdValue: number) => number;
}

const STORAGE_LANG_KEY = 'hybit_language';
const STORAGE_CURR_KEY = 'hybit_currency';

const AppSettingsContext = createContext<AppSettingsContextValue | undefined>(undefined);

export const AppSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize language from localStorage (defaults to 'id')
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LANG_KEY);
      if (saved === 'id' || saved === 'en') {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'id';
  });

  // Initialize currency from localStorage (defaults to 'USD')
  const [currency, setCurrencyState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CURR_KEY);
      if (saved && CURRENCY_OPTIONS.some((c) => c.id === saved)) {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'USD';
  });

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: AppLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_LANG_KEY, lang);
    } catch (e) {
      console.warn('Failed to save language to localStorage:', e);
    }
  }, []);

  const setCurrency = useCallback((currId: string) => {
    if (CURRENCY_OPTIONS.some((c) => c.id === currId)) {
      setCurrencyState(currId);
      try {
        localStorage.setItem(STORAGE_CURR_KEY, currId);
      } catch (e) {
        console.warn('Failed to save currency to localStorage:', e);
      }
    }
  }, []);

  const currentCurrency = useMemo(() => {
    return CURRENCY_OPTIONS.find((c) => c.id === currency) || CURRENCY_OPTIONS[0];
  }, [currency]);

  const currentLanguage = useMemo(() => {
    return LANGUAGE_OPTIONS.find((l) => l.id === language) || LANGUAGE_OPTIONS[0];
  }, [language]);

  const t = useMemo(() => {
    return TRANSLATIONS[language] || TRANSLATIONS.id;
  }, [language]);

  // Convert USD number into current currency formatted string
  const formatCurrency = useCallback(
    (usdValue: number, customDecimals?: number): string => {
      const converted = usdValue * currentCurrency.rate;
      const dec =
        typeof customDecimals === 'number'
          ? customDecimals
          : currentCurrency.decimals;

      const formattedNum = converted.toLocaleString(currentCurrency.locale, {
        minimumFractionDigits: dec,
        maximumFractionDigits: dec,
      });

      if (currentCurrency.id === 'IDR') {
        return `Rp ${formattedNum}`;
      }
      if (currentCurrency.id === 'EUR') {
        return `€${formattedNum}`;
      }
      if (currentCurrency.id === 'GBP') {
        return `£${formattedNum}`;
      }
      if (currentCurrency.id === 'JPY') {
        return `¥${formattedNum}`;
      }
      if (currentCurrency.id === 'SGD') {
        return `S$${formattedNum}`;
      }
      return `$${formattedNum}`;
    },
    [currentCurrency]
  );

  const formatGain = useCallback(
    (usdValue: number): string => {
      const isPositive = usdValue >= 0;
      const absFormatted = formatCurrency(Math.abs(usdValue));
      return isPositive ? `+${absFormatted}` : `-${absFormatted}`;
    },
    [formatCurrency]
  );

  const convertUsd = useCallback(
    (usdValue: number): number => {
      return usdValue * currentCurrency.rate;
    },
    [currentCurrency]
  );

  return (
    <AppSettingsContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        currentCurrency,
        currentLanguage,
        t,
        formatCurrency,
        formatGain,
        convertUsd,
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = (): AppSettingsContextValue => {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error('useAppSettings must be used within an AppSettingsProvider');
  }
  return context;
};
