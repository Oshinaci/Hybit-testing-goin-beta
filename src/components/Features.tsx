import React from 'react';
import { motion } from 'motion/react';
import {
  Wallet,
  Repeat,
  Layers,
  LineChart,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from 'lucide-react';

export const Features: React.FC<{ onExploreFeature?: (id: string) => void }> = ({
  onExploreFeature,
}) => {

  const features = [
    {
      id: 'easy-wallet',
      title: 'Easy Wallet',
      subtitle: 'Digital Cash Simplicity',
      description:
        'Create a self-custody wallet in 5 seconds with Passkey or biometric login. No 24-word paper seeds to misplace, just GoPay-level simplicity.',
      icon: Wallet,
      details: [
        'WebAuthn & Apple FaceID / TouchID support',
        'Automatic cloud enclave sync',
        'Instant multi-account switching',
      ],
    },
    {
      id: 'one-tap-swap',
      title: 'One Tap Swap',
      subtitle: 'Smart Liquidity Engine',
      description:
        'Swap any token across 40+ decentralized exchanges in one tap. Built-in MEV protection guarantees lowest slippage and zero hidden markups.',
      icon: Repeat,
      details: [
        'Deep routing across Uniswap, Curve & Aerodrome',
        'Automated slippage guard',
        'Zero extra platform protocol fees',
      ],
    },
    {
      id: 'cross-chain-bridge',
      title: 'Cross Chain Bridge',
      subtitle: 'Powered by LayerZero',
      description:
        'Move native assets across Ethereum, Base, Solana, and 10+ networks without dealing with confusing wrapped tokens or dangerous bridges.',
      icon: Layers,
      details: [
        'Sub-30 second cross-chain settlement',
        'Native USDC transfer via Circle CCTP',
        'Unified multi-network balance view',
      ],
    },
    {
      id: 'portfolio-tracking',
      title: 'Portfolio Tracking',
      subtitle: 'Bank-Grade Financial Clarity',
      description:
        'Live P&L calculations, historical return charts, staking rewards, and automated tax-ready reporting across every linked blockchain address.',
      icon: LineChart,
      details: [
        'Real-time price feeds via Chainlink',
        'Historical cost basis calculation',
        'DeFi LP and staking yield breakdowns',
      ],
    },
    {
      id: 'secure-recovery',
      title: 'Secure Recovery',
      subtitle: 'Multi-Party Computation',
      description:
        'Never stress about losing your phrase again. Multi-Party Computation splits keys into encrypted shares with seamless social and cloud recovery.',
      icon: ShieldCheck,
      details: [
        '2-of-3 threshold signature scheme',
        'AES-256 encrypted zero-knowledge backup',
        'Trusted contact guardian recovery',
      ],
    },
    {
      id: 'fast-transfer',
      title: 'Fast Transfer',
      subtitle: 'Send Like a Message',
      description:
        'Transfer crypto to friends using phone numbers, usernames, ENS tags, or instant QR codes. Enjoy near-instant finality with zero gas fees on Hybit Pay.',
      icon: Zap,
      details: [
        'Peer-to-peer phone number resolution',
        'Scan-to-pay QR code generator',
        'Batch transfers in single transaction',
      ],
    },
  ];

  return (
    <section id="features" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <p className="text-xs font-semibold text-[#0095FF] uppercase tracking-wider mb-3">
            Engineered for Daily Life
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Built with the Simplicity You Expect,
            <span className="block text-neutral-400 mt-1">the Power Web3 Deserves.</span>
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Every feature in <span className="font-chinese text-lg sm:text-xl text-white inline-block">Hybit</span> is crafted with Apple-grade precision and Stripe-level clarity, eliminating blockchain friction for good.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.id}
                onClick={() => onExploreFeature && onExploreFeature(feature.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative rounded-3xl bg-[#141418] hover:bg-[#18181D] border border-white/[0.08] hover:border-white/[0.18] p-7 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg shadow-black/40 cursor-pointer"
              >
                <div>
                  {/* Icon & Index */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover:border-[#0095FF]/50 group-hover:bg-[#0095FF]/10 transition-colors">
                      <Icon className="w-6 h-6 text-[#0095FF] transition-colors" />
                    </div>
                    <span className="text-xs font-mono text-neutral-500 tracking-wider">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-[#0095FF] uppercase tracking-wider">
                      {feature.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1 group-hover:text-white transition-colors">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="pt-4 border-t border-white/[0.06] space-y-2">
                  {feature.details.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
