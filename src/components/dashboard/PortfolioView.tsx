import React, { useState } from 'react';
import {
  TrendingUp,
  Search,
  ArrowUpRight,
  Repeat,
} from 'lucide-react';
import { WalletAsset } from '../../types/dashboard';
import { EthereumIcon, SolanaIcon, BaseIcon, CircleIcon, ArbitrumIcon } from '../icons/NetworkIcons';
import { useToast } from '../../context/ToastContext';
import { useAppSettings } from '../../context/AppSettingsContext';

interface PortfolioViewProps {
  onQuickAction: (action: 'send' | 'receive' | 'swap') => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ onQuickAction }) => {
  const { showToast } = useToast();
  const { t, formatCurrency, formatGain, language } = useAppSettings();
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y' | 'ALL'>('1M');
  const [searchQuery, setSearchQuery] = useState('');
  const [chainFilter, setChainFilter] = useState('ALL');

  // Timeframe PNL USD baselines
  const timeframeGainsUsd: Record<'1D' | '1W' | '1M' | '1Y' | 'ALL', { usd: number; percent: string }> = {
    '1D': { usd: 1142.30, percent: '+2.7%' },
    '1W': { usd: 3450.80, percent: '+8.7%' },
    '1M': { usd: 7812.50, percent: '+22.2%' },
    '1Y': { usd: 18940.00, percent: '+79.1%' },
    'ALL': { usd: 31200.00, percent: '+266.7%' },
  };

  const timeframeLabels: Record<'1D' | '1W' | '1M' | '1Y' | 'ALL', string> = {
    '1D': t.tf1D,
    '1W': t.tf1W,
    '1M': t.tf1M,
    '1Y': t.tf1Y,
    'ALL': t.tfALL,
  };

  const timeframeSvgPaths: Record<
    '1D' | '1W' | '1M' | '1Y' | 'ALL',
    { pathLine: string; pathArea: string; endY: number }
  > = {
    '1D': {
      pathLine: 'M 0 120 C 100 110, 200 130, 300 90 C 400 100, 500 50, 600 35',
      pathArea: 'M 0 120 C 100 110, 200 130, 300 90 C 400 100, 500 50, 600 35 L 600 160 L 0 160 Z',
      endY: 35,
    },
    '1W': {
      pathLine: 'M 0 135 C 100 120, 200 140, 300 80 C 400 95, 500 45, 600 25',
      pathArea: 'M 0 135 C 100 120, 200 140, 300 80 C 400 95, 500 45, 600 25 L 600 160 L 0 160 Z',
      endY: 25,
    },
    '1M': {
      pathLine: 'M 0 140 C 90 120, 180 80, 270 100 C 360 110, 450 50, 600 15',
      pathArea: 'M 0 140 C 90 120, 180 80, 270 100 C 360 110, 450 50, 600 15 L 600 160 L 0 160 Z',
      endY: 15,
    },
    '1Y': {
      pathLine: 'M 0 150 C 100 135, 200 110, 300 85 C 400 90, 500 35, 600 10',
      pathArea: 'M 0 150 C 100 135, 200 110, 300 85 C 400 90, 500 35, 600 10 L 600 160 L 0 160 Z',
      endY: 10,
    },
    'ALL': {
      pathLine: 'M 0 155 C 100 145, 200 120, 300 70 C 400 80, 500 25, 600 5',
      pathArea: 'M 0 155 C 100 145, 200 120, 300 70 C 400 80, 500 25, 600 5 L 600 160 L 0 160 Z',
      endY: 5,
    },
  };

  const activeTfSvg = timeframeSvgPaths[timeframe];
  const activeGainObj = timeframeGainsUsd[timeframe];
  const activeGainFormatted = `${formatGain(activeGainObj.usd)} (${activeGainObj.percent})`;
  const activeLabel = timeframeLabels[timeframe];

  const assets: WalletAsset[] = [
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

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChain = chainFilter === 'ALL' || asset.chain === chainFilter;
    return matchesSearch && matchesChain;
  });

  const totalPortfolioValue = assets.reduce((sum, a) => sum + a.value, 0);

  const renderIcon = (id: string) => {
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
      
      {/* Net Assets Value Section (Unboxed - No card wrapper) */}
      <section className="space-y-6 pb-8 border-b border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">
              {t.totalValue}
            </span>
            <div className="text-3xl sm:text-5xl font-extrabold text-white font-mono mt-1 tracking-tight">
              {formatCurrency(totalPortfolioValue)}
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs text-emerald-400 font-semibold font-mono">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>{activeGainFormatted} · {activeLabel}</span>
            </div>
          </div>

          {/* Timeframe switch */}
          <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] w-fit">
            {(['1D', '1W', '1M', '1Y', 'ALL'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => {
                  setTimeframe(tf);
                  showToast(
                    language === 'id' ? `Periode Grafik: ${tf}` : `Chart Period: ${tf}`,
                    `${timeframeLabels[tf]} (${timeframeGainsUsd[tf].percent})`,
                    'info'
                  );
                }}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                  timeframe === tf
                    ? 'bg-[#0095FF] text-white font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Chart SVG - Clean, Anti-Slop Minimalist Line */}
        <div className="relative h-44 w-full pt-2">
          <svg viewBox="0 0 600 160" fill="none" className="w-full h-full" preserveAspectRatio="none">
            {/* Crisp financial line */}
            <path
              d={activeTfSvg.pathLine}
              stroke="#0095FF"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />
            <circle cx="600" cy={activeTfSvg.endY} r="4" fill="#0095FF" className="transition-all duration-500 ease-out" />
          </svg>
        </div>

        {/* Multi-Chain Distribution (Unboxed) */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
            <span>{language === 'id' ? 'Distribusi Multi-Chain' : 'Multi-Chain Distribution'}</span>
            <span className="font-mono text-neutral-300">
              {language === 'id' ? '4 Ekosistem Aktif' : '4 Active Ecosystems'}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden flex gap-0.5">
            <div className="h-full bg-indigo-500 rounded-l-full" style={{ width: '56%' }} title="Ethereum 56%" />
            <div className="h-full bg-emerald-500" style={{ width: '27%' }} title="Solana 27%" />
            <div className="h-full bg-sky-500" style={{ width: '12%' }} title="Base 12%" />
            <div className="h-full bg-blue-500 rounded-r-full" style={{ width: '5%' }} title="Arbitrum 5%" />
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              Ethereum (56.7%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Solana (26.7%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              Base (11.9%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Arbitrum (4.7%)
            </span>
          </div>
        </div>
      </section>

      {/* Select Token or Symbol & Token List (Unboxed - No card wrapper) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder={t.searchTokens}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#0095FF]"
            />
          </div>

          {/* Chain Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['ALL', 'Ethereum', 'Solana', 'Base', 'Arbitrum'].map((c) => (
              <button
                key={c}
                onClick={() => setChainFilter(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  chainFilter === c
                    ? 'bg-[#0095FF] text-white font-semibold'
                    : 'bg-white/[0.04] text-neutral-400 hover:text-white'
                }`}
              >
                {c === 'ALL' ? t.allChains : c}
              </button>
            ))}
          </div>
        </div>

        {/* Tokens List (Unboxed - clean rows with dividers) */}
        <div className="divide-y divide-white/[0.05]">
          {filteredAssets.map((asset) => {
            const isPos = asset.change24h >= 0;
            return (
              <div
                key={asset.id}
                className="flex items-center justify-between py-3.5 px-2 hover:bg-white/[0.03] rounded-xl transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center">
                    {renderIcon(asset.id)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      {asset.name}
                      <span className="text-[10px] font-mono text-neutral-400">
                        {asset.symbol}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400 font-mono mt-0.5">
                      {formatCurrency(asset.price)} · {asset.chain}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="text-right">
                    <div className="text-sm font-bold text-white font-mono">
                      {formatCurrency(asset.value)}
                    </div>
                    <div className="text-xs font-mono flex items-center justify-end gap-1.5">
                      <span className="text-neutral-400">{asset.balance} {asset.symbol}</span>
                      <span className={`font-semibold ${isPos ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {isPos ? `+${asset.change24h}%` : `${asset.change24h}%`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onQuickAction('send')}
                      className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      title={t.actionSend}
                      aria-label={t.actionSend}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onQuickAction('swap')}
                      className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-[#0095FF] hover:text-white transition-colors cursor-pointer"
                      title={t.actionSwap}
                      aria-label={t.actionSwap}
                    >
                      <Repeat className="w-4 h-4" />
                    </button>
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
