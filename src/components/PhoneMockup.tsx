import React from 'react';
import { motion } from 'motion/react';
import {
  Send,
  Download,
  Repeat,
  CreditCard,
  Layers,
  Eye,
  Bell,
  ChevronDown,
  TrendingUp,
  LayoutDashboard,
  PieChart,
  History,
  Settings,
  Copy,
  ChevronRight,
  Wifi,
} from 'lucide-react';
import { EthereumIcon, SolanaIcon, BaseIcon, CircleIcon, ArbitrumIcon, HybitMark } from './icons/NetworkIcons';
import { useLandingTranslation } from '../translations/landingTranslations';

export const PhoneMockup: React.FC = () => {
  const t = useLandingTranslation();

  const assets = [
    {
      id: 'eth',
      symbol: 'ETH',
      name: 'Ethereum',
      chain: 'Ethereum',
      amount: '7.12 ETH',
      change: '+4.25%',
      isPos: true,
      val: '$24,353.96',
      icon: <EthereumIcon className="w-5 h-5 text-indigo-400" />,
    },
    {
      id: 'sol',
      symbol: 'SOL',
      name: 'Solana',
      chain: 'Solana',
      amount: '62.15 SOL',
      change: '+7.82%',
      isPos: true,
      val: '$11,448.03',
      icon: <SolanaIcon className="w-5 h-5 text-emerald-400" />,
    },
    {
      id: 'usdc',
      symbol: 'USDC',
      name: 'USD Coin',
      chain: 'Base',
      amount: '5116.25 USDC',
      change: '+0.01%',
      isPos: true,
      val: '$5,116.25',
      icon: <CircleIcon className="w-5 h-5 text-sky-400" />,
    },
    {
      id: 'arb',
      symbol: 'ARB',
      name: 'Arbitrum',
      chain: 'Arbitrum',
      amount: '1785.7 ARB',
      change: '-1.45%',
      isPos: false,
      val: '$2,000.00',
      icon: <ArbitrumIcon className="w-5 h-5 text-blue-400" />,
    },
  ];

  const quickActions = [
    { id: 'send', label: t.phoneMockup.actions.send, icon: Send },
    { id: 'receive', label: t.phoneMockup.actions.receive, icon: Download },
    { id: 'swap', label: t.phoneMockup.actions.swap, icon: Repeat },
    { id: 'buy', label: t.phoneMockup.actions.buy, icon: CreditCard },
    { id: 'bridge', label: t.phoneMockup.actions.bridge, icon: Layers },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[360px] py-4 [perspective:1200px]">
      
      {/* 3D Smartphone Body */}
      <motion.div
        initial={{ rotateY: -8, rotateX: 6, y: 0 }}
        whileHover={{ rotateY: -1, rotateX: 2, y: -6 }}
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative select-none"
      >
        
        {/* Physical Hardware Buttons */}
        <div className="absolute -left-[3px] top-[90px] w-[3.5px] h-[22px] bg-gradient-to-r from-[#18181C] to-[#3A3A42] rounded-l-sm border-l border-y border-white/20 shadow-[-2px_0_4px_rgba(0,0,0,0.6)] z-0" />
        <div className="absolute -left-[3px] top-[126px] w-[3.5px] h-[40px] bg-gradient-to-r from-[#18181C] to-[#3A3A42] rounded-l-sm border-l border-y border-white/20 shadow-[-2px_0_4px_rgba(0,0,0,0.6)] z-0" />
        <div className="absolute -left-[3px] top-[176px] w-[3.5px] h-[40px] bg-gradient-to-r from-[#18181C] to-[#3A3A42] rounded-l-sm border-l border-y border-white/20 shadow-[-2px_0_4px_rgba(0,0,0,0.6)] z-0" />
        <div className="absolute -right-[3px] top-[125px] w-[3.5px] h-[55px] bg-gradient-to-l from-[#18181C] to-[#3A3A42] rounded-r-sm border-r border-y border-white/20 shadow-[2px_0_4px_rgba(0,0,0,0.6)] z-0" />

        {/* Chassis Frame */}
        <div className="relative rounded-[48px] p-[9px] bg-gradient-to-b from-[#383842] via-[#222228] to-[#121216] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_10px_20px_-5px_rgba(0,149,255,0.15)] ring-1 ring-white/25 border border-white/10">
          
          <div className="rounded-[40px] p-[2.5px] bg-gradient-to-b from-[#2A2A32] to-[#0D0D10] shadow-inner">
            
            <div className="relative rounded-[38px] bg-[#09090B] overflow-hidden border border-white/10 text-white font-sans flex flex-col h-[595px] shadow-2xl">
              
              <div 
                className="absolute inset-0 pointer-events-none z-25 bg-gradient-to-tr from-transparent via-white/[0.035] to-transparent" 
                aria-hidden="true" 
              />

              {/* Status Bar */}
              <div className="px-5 pt-3 pb-1.5 flex items-center justify-between text-xs text-neutral-300 font-medium z-30 shrink-0">
                <span className="font-semibold text-[12px] tracking-tight text-white w-10 text-left">
                  {t.phoneMockup.time}
                </span>

                {/* Dynamic Island */}
                <div 
                  className="bg-black rounded-full flex items-center justify-between px-2.5 w-24 h-5.5 border border-white/[0.08] shadow-inner"
                  title="Dynamic Island"
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#111116] border border-white/10 relative flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-[#0095FF]/60" />
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#181820]" />
                  </div>
                  
                  <div className="w-2 h-2 rounded-full bg-[#0095FF]/30 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#0095FF]" />
                  </div>
                </div>

                {/* Signal, WiFi, Battery */}
                <div className="flex items-center gap-1.5 w-14 justify-end">
                  <svg className="w-3.5 h-2.5 text-white" viewBox="0 0 17 12" fill="currentColor">
                    <rect x="0" y="9" width="2.5" height="3" rx="0.5" />
                    <rect x="4.5" y="6" width="2.5" height="6" rx="0.5" />
                    <rect x="9" y="3" width="2.5" height="9" rx="0.5" />
                    <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" />
                  </svg>
                  <Wifi className="w-3 h-3 text-white" />
                  <div className="flex items-center gap-0.5">
                    <div className="w-5 h-2.5 rounded-[4px] border border-neutral-300 p-0.5 flex items-center relative">
                      <div className="h-full w-[88%] bg-emerald-400 rounded-[1.5px]" />
                      <div className="w-0.5 h-1 bg-neutral-300 rounded-r-xs absolute -right-1 top-0.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Sub-Bar: Hybit ID Pill + Network + Bell */}
              <div className="px-3.5 pt-1.5 pb-2.5 flex items-center justify-between shrink-0 z-20">
                <div 
                  className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#141419] border border-white/10 shadow-md shadow-black/30"
                  title="Hybit ID"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span className="text-xs font-mono font-medium text-white">{t.phoneMockup.hybitId}</span>
                  <div className="text-neutral-400 p-0.5 ml-0.5">
                    <Copy className="w-3 h-3" />
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <div 
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl bg-[#141419] border border-white/10 shadow-md shadow-black/30"
                  >
                    <BaseIcon className="w-3.5 h-3.5 text-[#0095FF]" />
                    <ChevronDown className="w-3 h-3 text-neutral-400" />
                  </div>

                  <div 
                    className="p-2 rounded-2xl bg-[#141419] border border-white/10 shadow-md shadow-black/30 relative"
                  >
                    <Bell className="w-3.5 h-3.5 text-neutral-300" />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#0095FF] rounded-full" />
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="px-3.5 flex-1 overflow-y-auto space-y-3 pb-20 scrollbar-none z-10">
                
                {/* Balance Card */}
                <div className="relative rounded-3xl bg-[#0095FF] p-4.5 text-white shadow-xl shadow-black/40 border border-white/20 overflow-hidden shrink-0">
                  <div 
                    className="absolute -right-6 -bottom-6 w-32 h-32 pointer-events-none select-none opacity-[0.14] text-white transform -rotate-12"
                    aria-hidden="true"
                  >
                    <HybitMark size="100%" className="w-full h-full" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between text-xs text-white/90 mb-1">
                      <div className="flex items-center gap-1.5 text-xs font-medium">
                        <span className="text-base sm:text-lg text-white font-normal select-none">Hybit</span>
                        <span className="text-white/70">·</span>
                        <span className="text-white/90 font-medium">{t.phoneMockup.saldoLabel}</span>
                      </div>
                      
                      <div className="p-1 rounded-full bg-white/15 text-white">
                        <Eye className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>

                    <div className="my-1.5">
                      <div className="text-3xl font-extrabold tracking-tight font-mono text-white">
                        $42,918.24
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 pt-0.5">
                      <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-white/95 font-mono">
                        <TrendingUp className="w-3 h-3 text-white" />
                        <span>{t.phoneMockup.todayGain}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="grid grid-cols-5 gap-1.5 pt-0.5 shrink-0">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <div
                        key={action.id}
                        className="flex flex-col items-center gap-1.5 select-none"
                      >
                        <div className="w-11 h-11 rounded-2xl bg-[#141419] border border-white/10 flex items-center justify-center shadow-md shadow-black/40">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-[10px] font-medium text-neutral-300">
                          {action.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Portfolio Assets Section */}
                <div className="pt-1.5 shrink-0">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-tight">{t.phoneMockup.assetsHeading}</h3>
                      <p className="text-[10px] text-neutral-400 mt-0.5">
                        {t.phoneMockup.assetsSubheading}
                      </p>
                    </div>

                    <div className="text-[11px] font-semibold text-[#0095FF] flex items-center gap-0.5 select-none">
                      <span>{t.phoneMockup.viewAll}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Asset List Rows */}
                  <div className="divide-y divide-white/[0.05]">
                    {assets.map((asset) => (
                      <div
                        key={asset.id}
                        className="flex items-center justify-between py-2.5 px-1 rounded-xl"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center shrink-0">
                            {asset.icon}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">
                              {asset.symbol}
                            </div>
                            <div className="text-[10px] text-neutral-400 font-mono">
                              {asset.name} · {asset.chain}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-xs font-bold text-white font-mono">
                            {asset.val}
                          </div>
                          <div className="text-[10px] font-mono flex items-center justify-end gap-1">
                            <span className="text-neutral-400">{asset.amount}</span>
                            <span className={`font-semibold ${asset.isPos ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {asset.change}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Nav Bar */}
              <div className="absolute bottom-2.5 left-3 right-3 z-30 pointer-events-none select-none">
                <div className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-full bg-[#141419]/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/90">
                  
                  {/* Home */}
                  <div className="w-9 h-9 rounded-full flex items-center justify-center relative" title={t.phoneMockup.nav.home}>
                    <div className="absolute inset-0 rounded-full bg-white/[0.12] border border-white/20 shadow-inner" />
                    <LayoutDashboard className="w-4 h-4 relative z-10 text-[#0095FF]" />
                  </div>

                  {/* Portfolio */}
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-400" title={t.phoneMockup.nav.portfolio}>
                    <PieChart className="w-4 h-4" />
                  </div>

                  {/* SWAP */}
                  <div className="relative -translate-y-2 shrink-0">
                    <div className="w-10 h-10 rounded-2xl bg-[#0095FF] text-white shadow-lg shadow-black/60 border border-white/20 flex flex-col items-center justify-center p-0.5">
                      <Repeat className="w-4 h-4 text-white" />
                      <span className="text-[7px] font-bold uppercase tracking-wider text-white font-mono">
                        SWAP
                      </span>
                    </div>
                  </div>

                  {/* History */}
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-400" title={t.phoneMockup.nav.history}>
                    <History className="w-4 h-4" />
                  </div>

                  {/* Settings */}
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-400" title={t.phoneMockup.nav.settings}>
                    <Settings className="w-4 h-4" />
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
