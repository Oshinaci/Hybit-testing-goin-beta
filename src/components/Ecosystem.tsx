import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  EthereumIcon,
  BaseIcon,
  PolygonIcon,
  OptimismIcon,
  ArbitrumIcon,
  BNBIcon,
  SolanaIcon,
  SuiIcon,
  AptosIcon,
} from './icons/NetworkIcons';
import { Globe2 } from 'lucide-react';
import { useLandingTranslation } from '../translations/landingTranslations';

export const Ecosystem: React.FC = () => {
  const t = useLandingTranslation();
  const [filter, setFilter] = useState<'ALL' | 'L2' | 'EVM' | 'Non-EVM'>('ALL');

  const getNetworkIcon = (id: string) => {
    switch (id) {
      case 'ethereum':
        return <EthereumIcon className="w-6 h-6 text-indigo-400" />;
      case 'base':
        return <BaseIcon className="w-6 h-6 text-[#0095FF]" />;
      case 'arbitrum':
        return <ArbitrumIcon className="w-6 h-6 text-blue-400" />;
      case 'optimism':
        return <OptimismIcon className="w-6 h-6 text-red-500" />;
      case 'polygon':
        return <PolygonIcon className="w-6 h-6 text-purple-400" />;
      case 'bnb':
        return <BNBIcon className="w-6 h-6 text-amber-400" />;
      case 'solana':
        return <SolanaIcon className="w-6 h-6 text-emerald-400" />;
      case 'sui':
        return <SuiIcon className="w-6 h-6 text-sky-400" />;
      case 'aptos':
        return <AptosIcon className="w-6 h-6 text-teal-400" />;
      default:
        return <Globe2 className="w-6 h-6 text-white" />;
    }
  };

  const filteredNetworks =
    filter === 'ALL'
      ? t.ecosystem.networks
      : t.ecosystem.networks.filter((n) => n.type === filter);

  const filterTabs = [
    { key: 'ALL' as const, label: t.ecosystem.filters.all },
    { key: 'L2' as const, label: t.ecosystem.filters.l2 },
    { key: 'EVM' as const, label: t.ecosystem.filters.evm },
    { key: 'Non-EVM' as const, label: t.ecosystem.filters.nonEvm },
  ];

  return (
    <section id="ecosystem" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold text-[#0095FF] uppercase tracking-wider mb-3">
              {t.ecosystem.kicker}
            </p>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              {t.ecosystem.title}
            </h2>
            
            <p className="mt-3 text-base text-neutral-400 max-w-xl">
              {t.ecosystem.subtitle}
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center p-1 rounded-xl bg-white/[0.05] border border-white/[0.08] w-fit">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  filter === tab.key
                    ? 'bg-[#0095FF] text-white shadow-sm font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Network Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNetworks.map((net) => (
            <motion.div
              key={net.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-[#141418] hover:bg-[#18181D] border border-white/[0.08] hover:border-white/[0.16] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                      {getNetworkIcon(net.id)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{net.name}</h3>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        Token: {net.token}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-neutral-400">
                    {net.type}
                  </span>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  {net.description}
                </p>
              </div>

              {/* Telemetry Row */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/[0.06] text-center">
                <div className="p-2 rounded-lg bg-white/[0.02]">
                  <div className="text-[10px] text-neutral-500 font-mono">{t.ecosystem.telemetry.speed}</div>
                  <div className="text-xs font-mono font-bold text-white mt-0.5">{net.tps}</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02]">
                  <div className="text-[10px] text-neutral-500 font-mono">{t.ecosystem.telemetry.gasFee}</div>
                  <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">{net.avgFee}</div>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02]">
                  <div className="text-[10px] text-neutral-500 font-mono">{t.ecosystem.telemetry.finality}</div>
                  <div className="text-xs font-mono font-bold text-neutral-200 mt-0.5">{net.finality}</div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
