import React, { useState, useEffect } from 'react';
import {
  Send,
  Download,
  Repeat,
  CreditCard,
  Layers,
  Eye,
  EyeOff,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronRight,
} from 'lucide-react';
import { WalletAsset, WalletTransaction } from '../../types/dashboard';
import { EthereumIcon, SolanaIcon, BaseIcon, CircleIcon, ArbitrumIcon, HybitMark } from '../icons/NetworkIcons';
import { useToast } from '../../context/ToastContext';
import { useAppSettings } from '../../context/AppSettingsContext';

interface DashboardHomeProps {
  onQuickAction: (action: 'send' | 'receive' | 'swap' | 'buy' | 'bridge') => void;
  onNavigateToPortfolio: () => void;
  onNavigateToActivity: () => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  onQuickAction,
  onNavigateToPortfolio,
  onNavigateToActivity,
}) => {
  const { showToast } = useToast();
  const { t, formatCurrency, formatGain, language } = useAppSettings();
  const [balanceHidden, setBalanceHidden] = useState(false);
  const [animatedBalance, setAnimatedBalance] = useState(0);

  const targetBalance = 42918.24;

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = targetBalance / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetBalance) {
        setAnimatedBalance(targetBalance);
        clearInterval(timer);
      } else {
        setAnimatedBalance(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const portfolioAssets: WalletAsset[] = [
    {
      id: 'eth',
      symbol: 'ETH',
      name: 'Ethereum',
      chain: 'Ethereum',
      balance: 7.12,
      price: 3420.5,
      value: 24353.96,
      change24h: 4.25,
      sparkline: [3200, 3250, 3310, 3280, 3390, 3420],
      color: '#6366F1',
      iconBg: 'bg-indigo-600/20 text-indigo-400',
    },
    {
      id: 'sol',
      symbol: 'SOL',
      name: 'Solana',
      chain: 'Solana',
      balance: 62.15,
      price: 184.2,
      value: 11448.03,
      change24h: 7.82,
      sparkline: [168, 172, 175, 179, 181, 184],
      color: '#10B981',
      iconBg: 'bg-emerald-600/20 text-emerald-400',
    },
    {
      id: 'usdc',
      symbol: 'USDC',
      name: 'USD Coin',
      chain: 'Base',
      balance: 5116.25,
      price: 1.0,
      value: 5116.25,
      change24h: 0.01,
      sparkline: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
      color: '#0EA5E9',
      iconBg: 'bg-sky-600/20 text-sky-400',
    },
    {
      id: 'arb',
      symbol: 'ARB',
      name: 'Arbitrum',
      chain: 'Arbitrum',
      balance: 1785.7,
      price: 1.12,
      value: 2000.0,
      change24h: -1.45,
      sparkline: [1.18, 1.16, 1.14, 1.15, 1.11, 1.12],
      color: '#3B82F6',
      iconBg: 'bg-blue-600/20 text-blue-400',
    },
  ];

  const recentTransactions: WalletTransaction[] = [
    {
      id: 'tx-1',
      type: 'received',
      status: 'confirmed',
      chain: 'Base',
      from: 'sarah.eth',
      to: language === 'id' ? 'Anda (Dompet Privy)' : 'You (Privy Wallet)',
      amount: '+250.00 USDC',
      tokenSymbol: 'USDC',
      valueUsd: 250.0,
      timestamp: language === 'id' ? '14 menit lalu' : '14 mins ago',
      hash: '0x8f2a...1e4c',
      feeUsd: 0.0,
    },
    {
      id: 'tx-2',
      type: 'swap',
      status: 'confirmed',
      chain: 'Ethereum',
      from: '0.4 ETH',
      to: '7.42 SOL',
      amount: 'ETH → SOL',
      tokenSymbol: 'SOL',
      valueUsd: 1368.2,
      timestamp: language === 'id' ? '2 jam lalu' : '2 hours ago',
      hash: '0x3c1b...99a0',
      feeUsd: 0.14,
    },
    {
      id: 'tx-3',
      type: 'sent',
      status: 'confirmed',
      chain: 'Base',
      from: language === 'id' ? 'Anda (Dompet Privy)' : 'You (Privy Wallet)',
      to: 'Blue Bottle Coffee · Hybit Pay',
      amount: '-$6.50 USDC',
      tokenSymbol: 'USDC',
      valueUsd: 6.5,
      timestamp: language === 'id' ? 'Kemarin, 16:30' : 'Yesterday at 04:30 PM',
      hash: '0x49e1...1823',
      feeUsd: 0.0,
    },
  ];

  const renderAssetIcon = (id: string) => {
    switch (id) {
      case 'eth':
        return <EthereumIcon className="w-5 h-5 text-indigo-400" />;
      case 'sol':
        return <SolanaIcon className="w-5 h-5 text-emerald-400" />;
      case 'usdc':
        return <CircleIcon className="w-5 h-5 text-sky-400" />;
      case 'arb':
        return <ArbitrumIcon className="w-5 h-5 text-blue-400" />;
      default:
        return <BaseIcon className="w-5 h-5 text-neutral-300" />;
    }
  };

  return (
    <div className="space-y-8 pb-28">
      
      {/* Balance Card - Solid Color, No Gradient */}
      <div className="relative rounded-3xl bg-[#0095FF] p-6 sm:p-8 text-white shadow-xl shadow-black/40 border border-white/20 overflow-hidden">
        {/* Hybit Brand Mark Watermark (Signature Left-Slanted Half-Cropped Emblem) */}
        <div 
          className="absolute -right-8 sm:-right-10 -bottom-8 sm:-bottom-10 w-36 h-36 sm:w-44 sm:h-44 pointer-events-none select-none opacity-[0.10] text-white transform -rotate-12"
          aria-hidden="true"
        >
          <HybitMark size="100%" className="w-full h-full" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between text-xs text-white/90 mb-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wide">
              <span className="font-chinese text-lg sm:text-xl text-white font-normal select-none">Hybit</span>
              <span className="text-white/70">~</span>
              <span className="text-white/90 font-medium">{t.balanceLabel}</span>
            </div>
            
            <button
              onClick={() => {
                const nextState = !balanceHidden;
                setBalanceHidden(nextState);
                showToast(
                  nextState ? (language === 'id' ? 'Saldo Disembunyikan' : 'Balance Masked') : (language === 'id' ? 'Saldo Ditampilkan' : 'Balance Shown'),
                  nextState ? t.balanceHiddenNotice : t.balanceShownNotice,
                  'info'
                );
              }}
              className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 transition-colors cursor-pointer"
              aria-label="Toggle balance visibility"
            >
              {balanceHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="mt-1 mb-2">
            <div className="text-3xl sm:text-5xl font-extrabold tracking-tight font-mono">
              {balanceHidden
                ? '••••••••••'
                : formatCurrency(animatedBalance)}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/95 font-mono">
              <TrendingUp className="w-3.5 h-3.5 text-white" />
              <span>{formatGain(1142.30)} (+8.4%) {t.todayGainSuffix}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Row */}
      <div className="grid grid-cols-5 gap-2 sm:gap-4">
        {[
          { id: 'send', label: t.actionSend, icon: Send, color: 'text-white' },
          { id: 'receive', label: t.actionReceive, icon: Download, color: 'text-white' },
          { id: 'swap', label: t.actionSwap, icon: Repeat, color: 'text-white' },
          { id: 'buy', label: t.actionBuy, icon: CreditCard, color: 'text-white' },
          { id: 'bridge', label: t.actionBridge, icon: Layers, color: 'text-white' },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => {
                onQuickAction(action.id as any);
              }}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#141419] hover:bg-[#1C1C24] border border-white/10 group-hover:border-[#0095FF]/60 flex items-center justify-center shadow-lg shadow-black/40 group-active:scale-95 transition-all">
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${action.color} group-hover:scale-110 transition-transform`} />
              </div>
              <span className="text-xs font-medium text-neutral-300 group-hover:text-white transition-colors">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Top Holdings (Unboxed - NOT in a card container) */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">{t.portfolioAssetsTitle}</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              {language === 'id' ? 'Aset tersimpan langsung di dalam brankas self-custody Anda' : 'Assets held directly in your self-custody vault'}
            </p>
          </div>

          <button
            onClick={onNavigateToPortfolio}
            className="text-xs font-semibold text-[#0095FF] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{t.viewAll}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-white/[0.05]">
          {portfolioAssets.map((asset) => {
            const isPos = asset.change24h >= 0;
            return (
              <div
                key={asset.id}
                onClick={onNavigateToPortfolio}
                className="flex items-center justify-between py-3.5 px-2 hover:bg-white/[0.03] rounded-xl transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center">
                    {renderAssetIcon(asset.id)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white group-hover:text-[#0095FF] transition-colors">
                      {asset.symbol}
                    </div>
                    <div className="text-xs text-neutral-400 flex items-center gap-1.5 font-mono">
                      <span>{asset.name}</span>
                      <span className="text-neutral-600">·</span>
                      <span className="text-neutral-400">{asset.chain}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-white font-mono">
                    {balanceHidden ? '••••••' : formatCurrency(asset.value)}
                  </div>
                  <div className="text-xs font-mono flex items-center justify-end gap-1.5">
                    <span className="text-neutral-400">{balanceHidden ? '••' : `${asset.balance} ${asset.symbol}`}</span>
                    <span className={`font-semibold ${isPos ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isPos ? `+${asset.change24h}%` : `${asset.change24h}%`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Activity (Unboxed - NOT in a card container) */}
      <section className="space-y-3 pt-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">{t.recentActivityTitle}</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              {language === 'id' ? 'Daftar transaksi on-chain terverifikasi terkini' : 'Latest confirmed on-chain transactions'}
            </p>
          </div>

          <button
            onClick={onNavigateToActivity}
            className="text-xs font-semibold text-[#0095FF] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{language === 'id' ? 'Riwayat Lengkap' : 'Full History'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-white/[0.05]">
          {recentTransactions.map((tx) => {
            const isReceived = tx.type === 'received';
            const isSwap = tx.type === 'swap';
            const isBridge = tx.type === 'bridge';

            return (
              <div
                key={tx.id}
                className="flex items-center justify-between py-3.5 px-2 hover:bg-white/[0.03] rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isReceived
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : isSwap
                        ? 'bg-[#0095FF]/15 text-[#0095FF]'
                        : isBridge
                        ? 'bg-indigo-500/15 text-indigo-400'
                        : 'bg-white/10 text-neutral-300'
                    }`}
                  >
                    {isReceived && <ArrowDownLeft className="w-4 h-4" />}
                    {isSwap && <Repeat className="w-4 h-4" />}
                    {isBridge && <Layers className="w-4 h-4" />}
                    {!isReceived && !isSwap && !isBridge && <ArrowUpRight className="w-4 h-4" />}
                  </div>

                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-white capitalize">
                      {isReceived && (language === 'id' ? `Diterima dari ${tx.from}` : `Received from ${tx.from}`)}
                      {isSwap && (language === 'id' ? `Tukar ${tx.amount}` : `Swapped ${tx.amount}`)}
                      {isBridge && (language === 'id' ? `Bridge ${tx.amount}` : `Bridged ${tx.amount}`)}
                      {tx.type === 'sent' && (language === 'id' ? `Terkirim ke ${tx.to}` : `Sent to ${tx.to}`)}
                    </div>
                    <div className="text-[11px] text-neutral-400 font-mono">
                      {tx.timestamp} · {tx.chain}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`text-xs sm:text-sm font-mono font-bold ${
                      isReceived ? 'text-emerald-400' : 'text-neutral-200'
                    }`}
                  >
                    {balanceHidden ? '••••' : tx.amount}
                  </div>
                  <div className="text-[10px] text-neutral-500 font-mono">
                    {language === 'id' ? 'Biaya:' : 'Fee:'} {formatCurrency(tx.feeUsd)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
