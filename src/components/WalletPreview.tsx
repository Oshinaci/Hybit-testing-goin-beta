import React, { useState } from 'react';
import {
  TrendingUp,
  ArrowUpRight,
  Repeat,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { EthereumIcon, SolanaIcon, BaseIcon, CircleIcon } from './icons/NetworkIcons';
import { useToast } from '../context/ToastContext';
import { useLandingTranslation } from '../translations/landingTranslations';

export const WalletPreview: React.FC<{ onLaunchApp?: () => void }> = ({ onLaunchApp }) => {
  const { showToast } = useToast();
  const t = useLandingTranslation();
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y' | 'ALL'>('1M');

  // Interactive Swap Simulator state
  const [swapFromAmount, setSwapFromAmount] = useState('1.5');
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapSuccess, setSwapSuccess] = useState(false);

  // Chart data points per timeframe
  const chartPaths: Record<string, { d: string; points: { x: number; y: number }[]; gain: string; total: string }> = {
    '1D': {
      d: 'M 0 160 C 80 140, 160 170, 240 130 C 320 90, 400 120, 480 80 C 560 40, 640 60, 720 30',
      points: [
        { x: 100, y: 150 },
        { x: 300, y: 100 },
        { x: 500, y: 70 },
        { x: 720, y: 30 },
      ],
      gain: '+$1,142.30 (+2.7%)',
      total: '$42,918.24',
    },
    '1W': {
      d: 'M 0 180 C 80 150, 160 120, 240 140 C 320 100, 400 70, 480 90 C 560 50, 640 40, 720 20',
      points: [
        { x: 120, y: 135 },
        { x: 340, y: 85 },
        { x: 580, y: 45 },
        { x: 720, y: 20 },
      ],
      gain: '+$3,450.80 (+8.7%)',
      total: '$42,918.24',
    },
    '1M': {
      d: 'M 0 200 C 90 190, 180 130, 270 140 C 360 150, 450 80, 540 60 C 630 40, 680 50, 720 15',
      points: [
        { x: 150, y: 150 },
        { x: 350, y: 110 },
        { x: 550, y: 55 },
        { x: 720, y: 15 },
      ],
      gain: '+$7,812.50 (+22.2%)',
      total: '$42,918.24',
    },
    '1Y': {
      d: 'M 0 220 C 100 210, 200 170, 300 120 C 400 140, 500 90, 600 50 C 660 30, 700 20, 720 10',
      points: [
        { x: 200, y: 170 },
        { x: 400, y: 130 },
        { x: 600, y: 50 },
        { x: 720, y: 10 },
      ],
      gain: '+$18,940.00 (+79.1%)',
      total: '$42,918.24',
    },
    'ALL': {
      d: 'M 0 230 C 120 220, 240 180, 360 110 C 480 130, 580 60, 660 30, 700 25, 720 8',
      points: [
        { x: 180, y: 190 },
        { x: 380, y: 100 },
        { x: 620, y: 40 },
        { x: 720, y: 8 },
      ],
      gain: '+$31,200.00 (+266.7%)',
      total: '$42,918.24',
    },
  };

  const currentChart = chartPaths[timeframe];

  const handleSimulateSwap = () => {
    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);
      setSwapSuccess(true);
      setTimeout(() => setSwapSuccess(false), 3500);
    }, 1200);
  };

  const calculatedOutput = (parseFloat(swapFromAmount || '0') * 3420.5).toFixed(2);

  return (
    <section id="preview" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold text-[#0095FF] uppercase tracking-wider mb-3">
            {t.walletPreview.kicker}
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            {t.walletPreview.title}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            {t.walletPreview.subtitle}
          </p>
        </div>

        {/* Desktop Interface Card */}
        <div className="relative rounded-3xl bg-[#101014] border border-white/10 shadow-2xl shadow-black overflow-hidden backdrop-blur-xl">
          
          {/* Top Window Bar */}
          <div className="px-6 py-4 border-b border-white/[0.08] bg-[#0B0B0E] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-neutral-700 hover:bg-rose-500 transition-colors" />
              <span className="w-3 h-3 rounded-full bg-neutral-700 hover:bg-amber-500 transition-colors" />
              <span className="w-3 h-3 rounded-full bg-neutral-700 hover:bg-emerald-500 transition-colors" />
              <span className="ml-3 text-xs text-neutral-400 font-mono hidden sm:inline-block">
                app.hybit.wallet/dashboard
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-xs font-mono text-neutral-400">
                {t.walletPreview.tagline}
              </span>
              <button
                onClick={onLaunchApp}
                className="text-xs text-[#0095FF] hover:text-[#0080E0] flex items-center gap-1 font-semibold transition-colors cursor-pointer"
              >
                <span>{t.walletPreview.openHybit}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Main Dashboard Layout */}
          <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Col (8 cols): Balance + Interactive Chart */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <div className="text-xs text-neutral-400 font-medium tracking-wide">
                      {t.walletPreview.totalBalanceLabel}
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono mt-1 tracking-tight">
                      {currentChart.total}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-sm font-semibold text-emerald-400 flex items-center gap-1 font-mono">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        {currentChart.gain}
                      </span>
                      <span className="text-xs text-neutral-500">{t.walletPreview.vsPreviousPeriod}</span>
                    </div>
                  </div>

                  {/* Timeframe Switcher */}
                  <div className="flex items-center p-1 rounded-xl bg-white/[0.05] border border-white/[0.08] w-fit">
                    {(['1D', '1W', '1M', '1Y', 'ALL'] as const).map((tf) => (
                      <button
                        key={tf}
                        onClick={() => {
                          setTimeframe(tf);
                          const data = chartPaths[tf];
                          showToast(
                            `${t.walletPreview.toastTimeframe}: ${tf}`,
                            `${t.walletPreview.toastChange}: ${data.gain}`,
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

                {/* SVG Line Chart */}
                <div className="relative h-56 sm:h-64 w-full pt-4">
                  <svg
                    viewBox="0 0 720 240"
                    fill="none"
                    className="w-full h-full overflow-visible"
                    preserveAspectRatio="none"
                  >
                    {/* Main stroke line */}
                    <path
                      d={currentChart.d}
                      stroke="#0095FF"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Current point highlight */}
                    <circle cx="720" cy="15" r="4" fill="#0095FF" />
                  </svg>
                </div>
              </div>

              {/* Bottom Asset Breakdown Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-4 border-t border-white/[0.08]">
                {[
                  { name: 'Ethereum', symbol: 'ETH', val: '$24,320.10', pct: '56.6%', icon: EthereumIcon },
                  { name: 'Solana', symbol: 'SOL', val: '$11,450.40', pct: '26.7%', icon: SolanaIcon },
                  { name: 'USD Coin', symbol: 'USDC', val: '$5,147.74', pct: '12.0%', icon: CircleIcon },
                  { name: 'Base L2', symbol: 'BASE', val: '$2,000.00', pct: '4.7%', icon: BaseIcon },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.symbol} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Icon className="w-4 h-4 text-neutral-300" />
                        <span className="text-xs font-semibold text-white">{item.symbol}</span>
                        <span className="text-[10px] text-neutral-500 ml-auto font-mono">{item.pct}</span>
                      </div>
                      <div className="text-xs font-mono font-bold text-neutral-200">{item.val}</div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Right Col (4 cols): Interactive One-Tap Swap Simulator */}
            <div className="lg:col-span-4 rounded-2xl bg-[#16161B] border border-white/[0.08] p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
                  <span className="text-sm font-bold text-white flex items-center gap-2">
                    <Repeat className="w-4 h-4 text-[#0095FF]" />
                    {t.walletPreview.swapTitle}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    {t.walletPreview.swapEstFeeBadge}
                  </span>
                </div>

                {/* Sell Box */}
                <div className="p-3.5 rounded-xl bg-[#0F0F12] border border-white/[0.06] mb-2">
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                    <span>{t.walletPreview.payLabel}</span>
                    <span>{t.walletPreview.payBalance}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <input
                      type="number"
                      value={swapFromAmount}
                      onChange={(e) => setSwapFromAmount(e.target.value)}
                      className="bg-transparent text-xl font-bold font-mono text-white focus:outline-none w-28"
                      placeholder="0.0"
                    />
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.08] text-xs font-semibold text-white">
                      <EthereumIcon className="w-4 h-4 text-indigo-400" />
                      <span>ETH</span>
                    </div>
                  </div>
                </div>

                {/* Flip Divider */}
                <div className="flex justify-center -my-2 relative z-10">
                  <div className="w-7 h-7 rounded-full bg-[#1F1F26] border border-white/10 flex items-center justify-center text-[#0095FF] shadow-sm">
                    <Repeat className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Receive Box */}
                <div className="p-3.5 rounded-xl bg-[#0F0F12] border border-white/[0.06] mt-2 mb-4">
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                    <span>{t.walletPreview.receiveLabel}</span>
                    <span>{t.walletPreview.receiveEstFee}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold font-mono text-white">
                      ~${calculatedOutput}
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.08] text-xs font-semibold text-white">
                      <CircleIcon className="w-4 h-4 text-sky-400" />
                      <span>USDC</span>
                    </div>
                  </div>
                </div>

                {/* Routing & Quote Details */}
                <div className="space-y-1.5 text-[11px] text-neutral-400 pb-2">
                  <div className="flex items-center justify-between">
                    <span>{t.walletPreview.exchangeRateLabel}</span>
                    <span className="text-neutral-200 font-mono">1 ETH = 3,420.50 USDC</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t.walletPreview.swapRouteLabel}</span>
                    <span className="text-neutral-200">{t.walletPreview.swapRouteValue}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t.walletPreview.txCheckLabel}</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> {t.walletPreview.txCheckValue}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4">
                {swapSuccess ? (
                  <div className="w-full py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-semibold text-xs flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    {t.walletPreview.simulatedSuccess}
                  </div>
                ) : (
                  <button
                    onClick={handleSimulateSwap}
                    disabled={isSwapping}
                    className="w-full py-3 rounded-xl bg-[#0095FF] hover:bg-[#0080E0] text-white font-semibold text-xs shadow-md shadow-black/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSwapping ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t.walletPreview.simulatingRoute}
                      </>
                    ) : (
                      <>
                        <Repeat className="w-3.5 h-3.5" />
                        {t.walletPreview.trySwapSimulation}
                      </>
                    )}
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
