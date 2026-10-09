import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Wallet, ShieldCheck, Check, Mail, ArrowRight } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectedSuccess?: () => void;
}

export const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({
  isOpen,
  onClose,
  onConnectedSuccess,
}) => {
  const { connectWallet, isWalletConnected, walletProvider } = useWallet();
  const [connectingId, setConnectingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const walletOptions = [
    {
      id: 'privy',
      name: 'Privy Embedded Wallet',
      description: 'Email & Passkey 1-Click login (Recommended)',
      badge: 'Fast & Secure',
      iconBg: 'bg-[#0095FF]/20 text-[#0095FF]',
      recommended: true,
    },
    {
      id: 'metamask',
      name: 'MetaMask',
      description: 'Connect via browser extension or mobile app',
      badge: 'EVM',
      iconBg: 'bg-amber-500/20 text-amber-400',
    },
    {
      id: 'coinbase',
      name: 'Coinbase Smart Wallet',
      description: 'Zero gas passes & passkey verification',
      badge: 'Passkey',
      iconBg: 'bg-blue-600/20 text-blue-400',
    },
    {
      id: 'phantom',
      name: 'Phantom',
      description: 'Solana & Ethereum multi-chain wallet',
      badge: 'Multi-Chain',
      iconBg: 'bg-purple-500/20 text-purple-400',
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      description: 'Scan QR code with 300+ crypto wallets',
      badge: 'Universal',
      iconBg: 'bg-cyan-500/20 text-cyan-400',
    },
  ];

  const handleSelectProvider = (name: string, id: string) => {
    setConnectingId(id);
    setTimeout(() => {
      connectWallet(name);
      setConnectingId(null);
      if (onConnectedSuccess) {
        onConnectedSuccess();
      }
    }, 450);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md bg-[#141419] border border-white/10 rounded-3xl shadow-2xl shadow-black/90 p-6 sm:p-7 overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0095FF]/15 text-[#0095FF] flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Connect Wallet</h3>
                <p className="text-[11px] text-neutral-400 font-mono">1 Email : 1 Self-Custody Wallet</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wallet List */}
          <div className="mt-4 space-y-2">
            {walletOptions.map((opt) => {
              const isSelected = isWalletConnected && walletProvider === opt.name;
              const isConnecting = connectingId === opt.id;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectProvider(opt.name, opt.id)}
                  disabled={isConnecting}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0095FF]/15 border-[#0095FF]/40 text-white'
                      : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/[0.06] hover:border-white/15 text-neutral-200 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${opt.iconBg}`}>
                      {opt.id === 'privy' ? (
                        <Mail className="w-5 h-5" />
                      ) : opt.id === 'coinbase' ? (
                        <ShieldCheck className="w-5 h-5" />
                      ) : (
                        <Wallet className="w-5 h-5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-semibold truncate">{opt.name}</span>
                        {opt.recommended && (
                          <span className="px-1.5 py-0.5 rounded-md bg-[#0095FF]/20 text-[#0095FF] text-[9px] font-semibold tracking-wide">
                            RECOMMENDED
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5">{opt.description}</p>
                    </div>
                  </div>

                  <div className="shrink-0 ml-2">
                    {isConnecting ? (
                      <div className="w-4 h-4 border-2 border-[#0095FF] border-t-transparent rounded-full animate-spin" />
                    ) : isSelected ? (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                        <Check className="w-3.5 h-3.5" />
                        Connected
                      </span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-300" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer Notice */}
          <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-400 font-mono">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Non-custodial MPC Encryption
            </span>
            <span className="text-neutral-500">v1.0.0</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
