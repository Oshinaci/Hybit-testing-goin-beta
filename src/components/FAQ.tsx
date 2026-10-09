import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '../types';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'How is Hybit as easy as GoPay?',
      answer:
        'Traditional crypto wallets overwhelm users with 24-word seed phrases, manual RPC network configurations, and cryptic hex addresses. Hybit removes this complexity entirely. You create your wallet in 5 seconds with Passkeys or Face ID, send funds using contact phone numbers or QR codes, and pay with near-zero friction—delivering the familiar simplicity of GoPay or Apple Cash while preserving true Web3 self-custody.',
      category: 'general',
    },
    {
      id: 'faq-2',
      question: 'Is Hybit truly non-custodial? Who owns the keys?',
      answer:
        'Yes, 100% non-custodial. Hybit never stores, transmits, or has access to your private cryptographic keys. We use Multi-Party Computation (MPC) and native smart accounts (ERC-4337). Your key shares reside within your local device Secure Enclave and your private encrypted cloud storage. Only you can initiate or sign transactions.',
      category: 'security',
    },
    {
      id: 'faq-3',
      question: 'What happens if I lose my phone or break my device?',
      answer:
        'With Hybit Encrypted Cloud Recovery and MPC threshold cryptography, you never lose your funds. When you set up Hybit, your secondary key share is backed up to your encrypted iCloud Keychain or Google Drive with end-to-end AES-256-GCM encryption. You can also configure trusted guardians (such as hardware keys or verified friends) to authorize account restoration in seconds.',
      category: 'security',
    },
    {
      id: 'faq-4',
      question: 'What blockchains and tokens are supported?',
      answer:
        'Hybit natively supports Ethereum, Base, Solana, Arbitrum, Optimism, Polygon, BNB Chain, Sui, and Aptos. We support all native assets, ERC-20, SPL, and Move tokens, with automated token discovery so you never have to manually import contract addresses.',
      category: 'transfers',
    },
    {
      id: 'faq-5',
      question: 'Are there hidden fees or markups when swapping tokens?',
      answer:
        'Zero hidden markups. Hybit routes swaps through leading decentralized liquidity protocols (Uniswap v3, Curve, Balancer, Aerodrome, Raydium) and applies smart MEV sandwich protection to ensure you get the absolute best execution rate. You only pay network gas fees, which are subsidised or pennies on L2s like Base.',
      category: 'fees',
    },
    {
      id: 'faq-6',
      question: 'Can I pay for everyday merchants and coffees with Hybit?',
      answer:
        'Yes! The Hybit QR Scanner lets you scan any merchant QR code (including ERC-681, Solana Pay, and Hybit Merchant tags) to pay directly with stablecoins like USDC. Transfers settle in under 2 seconds with zero network gas on our partner merchant layer.',
      category: 'transfers',
    },
  ];

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-[#0095FF] uppercase tracking-wider mb-3">
            Frequently Asked Questions
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Everything You Need to Know.
          </h2>

          <p className="mt-4 text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Have questions about security, transfers, or supported chains? Here are straightforward answers.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#141418] border border-white/[0.08] hover:border-white/[0.14] transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-5 flex items-center justify-between text-left text-white font-semibold text-base sm:text-lg cursor-pointer focus:outline-none"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#0095FF]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-neutral-400 leading-relaxed border-t border-white/[0.04]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
