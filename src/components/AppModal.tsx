import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Send,
  Download,
  Repeat,
  Copy,
  Check,
  CheckCircle2,
  TrendingUp,
  History,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  QrCode,
  Wallet,
} from 'lucide-react';
import { HybitLogo, HybitMark, EthereumIcon, SolanaIcon, BaseIcon, CircleIcon } from './icons/NetworkIcons';

interface AppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppModal: React.FC<AppModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'send' | 'receive' | 'swap'>('overview');
  const [copied, setCopied] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState('Base L2');

  // Send state
  const [sendRecipient, setSendRecipient] = useState('');
  const [sendAmount, setSendAmount] = useState('50');
  const [sendToken, setSendToken] = useState('USDC');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  // Swap state
  const [swapAmount, setSwapAmount] = useState('0.5');
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapSuccess, setSwapSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const handleCopy = () => {
    navigator.clipboard?.writeText('0x7F2a45B083C29E41c7F3bDa208B49a37e89e8b1e');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sendRecipient) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSendSuccess(true);
      setTimeout(() => {
        setSendSuccess(false);
        setActiveTab('overview');
      }, 2500);
    }, 1200);
  };

  const handleSwap = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);
      setSwapSuccess(true);
      setTimeout(() => {
        setSwapSuccess(false);
        setActiveTab('overview');
      }, 2500);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative z-10 w-full max-w-2xl rounded-3xl bg-[#121216] border border-white/10 shadow-2xl shadow-black overflow-hidden flex flex-col text-white max-h-[90vh]"
          >
            {/* Top Bar */}
            <div className="px-6 py-4 border-b border-white/[0.08] bg-[#0E0E12] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HybitLogo size={32} showText={true} />
                <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                  <span className="text-neutral-300">0x7F2...8b1e</span>
                  <button onClick={handleCopy} className="text-neutral-400 hover:text-white ml-1 cursor-pointer" aria-label="Copy address">
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Network pill */}
                <select
                  value={selectedNetwork}
                  onChange={(e) => setSelectedNetwork(e.target.value)}
                  className="bg-[#1C1C22] text-xs font-medium text-neutral-200 border border-white/10 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#0095FF]"
                >
                  <option value="Base L2">Base L2 (Fastest)</option>
                  <option value="Ethereum">Ethereum Mainnet</option>
                  <option value="Solana">Solana</option>
                  <option value="Arbitrum">Arbitrum One</option>
                </select>

                <button
                  onClick={onClose}
                  aria-label="Close app"
                  className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="px-6 pt-3 pb-2 border-b border-white/[0.06] flex items-center gap-2 bg-[#121216]">
              {[
                { id: 'overview', label: 'Overview', icon: Wallet },
                { id: 'send', label: 'Send', icon: Send },
                { id: 'receive', label: 'Receive', icon: Download },
                { id: 'swap', label: 'Swap', icon: Repeat },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0095FF] text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Balance Card */}
                  <div className="relative rounded-2xl bg-[#0095FF] p-6 text-white shadow-xl shadow-black/40 overflow-hidden">
                    {/* Hybit Brand Mark Watermark (Signature Left-Slanted Half-Cropped Emblem) */}
                    <div 
                      className="absolute -right-6 -bottom-6 w-32 h-32 pointer-events-none select-none opacity-[0.10] text-white transform -rotate-12"
                      aria-hidden="true"
                    >
                      <HybitMark size="100%" className="w-full h-full" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/90 mb-2">
                      <span className="flex items-center gap-1.5 font-medium">
                        <span className="font-chinese text-lg sm:text-xl text-white font-normal">Hybit</span>
                        <span className="text-white/70">~</span>
                        <span>Balance · {selectedNetwork}</span>
                      </span>
                    </div>

                    <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight mb-2">
                      $14,820.50
                    </div>

                    <div className="flex items-center gap-2 text-xs text-emerald-100">
                      <TrendingUp className="w-4 h-4" />
                      <span>+$1,142.30 (+8.4%) Today</span>
                    </div>

                    {/* Quick Launch Buttons inside card */}
                    <div className="grid grid-cols-3 gap-2.5 mt-6 pt-4 border-t border-white/20">
                      <button
                        onClick={() => setActiveTab('send')}
                        className="py-2 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" /> Send
                      </button>
                      <button
                        onClick={() => setActiveTab('receive')}
                        className="py-2 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" /> Receive
                      </button>
                      <button
                        onClick={() => setActiveTab('swap')}
                        className="py-2 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Repeat className="w-3.5 h-3.5" /> Swap
                      </button>
                    </div>
                  </div>

                  {/* Asset List */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                      Assets in Vault
                    </h4>
                    <div className="space-y-2">
                      {[
                        { name: 'Ethereum', sym: 'ETH', bal: '2.45 ETH', val: '$8,383.90', chg: '+4.2%', icon: EthereumIcon, color: 'text-indigo-400' },
                        { name: 'Solana', sym: 'SOL', bal: '24.8 SOL', val: '$4,575.60', chg: '+7.8%', icon: SolanaIcon, color: 'text-emerald-400' },
                        { name: 'USD Coin', sym: 'USDC', bal: '1,861.00 USDC', val: '$1,861.00', chg: '0.0%', icon: CircleIcon, color: 'text-sky-400' },
                      ].map((asset) => {
                        const Icon = asset.icon;
                        return (
                          <div
                            key={asset.sym}
                            className="flex items-center justify-between p-3.5 rounded-xl bg-[#18181E] hover:bg-[#1E1E26] border border-white/[0.05] transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center">
                                <Icon className={`w-5 h-5 ${asset.color}`} />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-white">{asset.name}</div>
                                <div className="text-xs text-neutral-400 font-mono">{asset.bal}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-white font-mono">{asset.val}</div>
                              <div className="text-xs text-emerald-400 font-mono">{asset.chg}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SEND */}
              {activeTab === 'send' && (
                <form onSubmit={handleSend} className="space-y-4 max-w-md mx-auto">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-white">Send Crypto Instantly</h3>
                    <p className="text-xs text-neutral-400">
                      Send by Phone Number, ENS Domain, or Blockchain Address with GoPay ease.
                    </p>
                  </div>

                  {sendSuccess ? (
                    <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center space-y-3">
                      <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                      <h4 className="text-base font-bold text-white">Transfer Confirmed!</h4>
                      <p className="text-xs text-neutral-300">
                        Successfully sent {sendAmount} {sendToken} to {sendRecipient}.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-400 mb-1.5">
                          Recipient (Phone Number, ENS, or Address)
                        </label>
                        <input
                          type="text"
                          required
                          value={sendRecipient}
                          onChange={(e) => setSendRecipient(e.target.value)}
                          placeholder="e.g. +1 555-0192 or alex.eth"
                          className="w-full px-4 py-3 rounded-xl bg-[#18181E] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#0095FF]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-400 mb-1.5">
                            Asset
                          </label>
                          <select
                            value={sendToken}
                            onChange={(e) => setSendToken(e.target.value)}
                            className="w-full px-3 py-3 rounded-xl bg-[#18181E] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0095FF]"
                          >
                            <option value="USDC">USDC (USD Coin)</option>
                            <option value="ETH">ETH (Ethereum)</option>
                            <option value="SOL">SOL (Solana)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-neutral-400 mb-1.5">
                            Amount
                          </label>
                          <input
                            type="number"
                            required
                            value={sendAmount}
                            onChange={(e) => setSendAmount(e.target.value)}
                            placeholder="0.0"
                            className="w-full px-4 py-3 rounded-xl bg-[#18181E] border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-[#0095FF]"
                          />
                        </div>
                      </div>

                      {/* Fee Preview */}
                      <div className="p-3 rounded-xl bg-[#18181E] border border-white/[0.06] text-xs text-neutral-400 space-y-1">
                        <div className="flex justify-between">
                          <span>Network Speed</span>
                          <span className="text-emerald-400 font-mono">Instant (~1.2s)</span>
                        </div>
                        <div className="flex justify-between">
                          <span><span className="font-chinese text-white">Hybit</span> Pay Fee</span>
                          <span className="text-emerald-400 font-semibold">$0.00 (Gas Subsidized)</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSending}
                        className="w-full py-3.5 rounded-xl bg-[#0095FF] hover:bg-[#0080E0] text-white font-semibold text-sm shadow-md shadow-black/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isSending ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Broadcasting Transaction...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Authorize & Send
                          </>
                        )}
                      </button>
                    </>
                  )}
                </form>
              )}

              {/* TAB 3: RECEIVE */}
              {activeTab === 'receive' && (
                <div className="max-w-md mx-auto text-center space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">Receive Digital Assets</h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Share your QR code or address. Supports Ethereum, Base, Arbitrum & EVM.
                    </p>
                  </div>

                  {/* QR Code Display */}
                  <div className="w-48 h-48 mx-auto p-3 rounded-2xl bg-white shadow-xl flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-[#09090B]">
                      <rect x="5" y="5" width="28" height="28" fill="currentColor" rx="3" />
                      <rect x="11" y="11" width="16" height="16" fill="white" rx="1" />
                      <rect x="15" y="15" width="8" height="8" fill="currentColor" rx="1" />

                      <rect x="67" y="5" width="28" height="28" fill="currentColor" rx="3" />
                      <rect x="73" y="11" width="16" height="16" fill="white" rx="1" />
                      <rect x="77" y="15" width="8" height="8" fill="currentColor" rx="1" />

                      <rect x="5" y="67" width="28" height="28" fill="currentColor" rx="3" />
                      <rect x="11" y="73" width="16" height="16" fill="white" rx="1" />
                      <rect x="15" y="77" width="8" height="8" fill="currentColor" rx="1" />

                      <rect x="40" y="10" width="8" height="8" fill="currentColor" />
                      <rect x="50" y="20" width="8" height="8" fill="currentColor" />
                      <rect x="40" y="30" width="8" height="8" fill="currentColor" />
                      <rect x="10" y="40" width="8" height="8" fill="currentColor" />
                      <rect x="25" y="45" width="8" height="8" fill="currentColor" />
                      <rect x="42" y="42" width="16" height="16" fill="#0095FF" rx="3" />
                      <rect x="65" y="40" width="8" height="8" fill="currentColor" />
                      <rect x="80" y="45" width="8" height="8" fill="currentColor" />
                      <rect x="40" y="65" width="8" height="8" fill="currentColor" />
                      <rect x="55" y="75" width="8" height="8" fill="currentColor" />
                      <rect x="70" y="80" width="8" height="8" fill="currentColor" />
                      <rect x="80" y="70" width="8" height="8" fill="currentColor" />
                    </svg>
                  </div>

                  {/* Address Box */}
                  <div className="p-3.5 rounded-xl bg-[#18181E] border border-white/10 flex items-center justify-between">
                    <span className="font-mono text-xs text-neutral-300 truncate max-w-[280px]">
                      0x7F2a45B083C29E41c7F3bDa208B49a37e89e8b1e
                    </span>
                    <button
                      onClick={handleCopy}
                      className="px-3 py-1.5 rounded-lg bg-[#0095FF] text-white text-xs font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-neutral-500">
                    Send only supported assets to this address. Sending unsupported tokens may result in permanent loss.
                  </p>
                </div>
              )}

              {/* TAB 4: SWAP */}
              {activeTab === 'swap' && (
                <form onSubmit={handleSwap} className="max-w-md mx-auto space-y-4">
                  <div className="text-center mb-2">
                    <h3 className="text-lg font-bold text-white">Aggregated DEX Swap</h3>
                    <p className="text-xs text-neutral-400">
                      Best rate discovered automatically across 40+ decentralized pools.
                    </p>
                  </div>

                  {swapSuccess ? (
                    <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center space-y-3">
                      <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                      <h4 className="text-base font-bold text-white">Swap Executed!</h4>
                      <p className="text-xs text-neutral-300">
                        Swapped {swapAmount} ETH into ~${(parseFloat(swapAmount || '0') * 3420.5).toFixed(2)} USDC with 0% slippage.
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Sell */}
                      <div className="p-3.5 rounded-xl bg-[#18181E] border border-white/10">
                        <div className="flex justify-between text-xs text-neutral-400 mb-1">
                          <span>You Pay</span>
                          <span>Balance: 2.45 ETH</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <input
                            type="number"
                            value={swapAmount}
                            onChange={(e) => setSwapAmount(e.target.value)}
                            className="bg-transparent text-xl font-bold font-mono text-white focus:outline-none w-32"
                          />
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 font-semibold text-xs">
                            <EthereumIcon className="w-4 h-4 text-indigo-400" />
                            <span>ETH</span>
                          </div>
                        </div>
                      </div>

                      {/* Buy */}
                      <div className="p-3.5 rounded-xl bg-[#18181E] border border-white/10">
                        <div className="flex justify-between text-xs text-neutral-400 mb-1">
                          <span>You Receive (Estimated)</span>
                          <span>Fee: $0.12 (Base)</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold font-mono text-white">
                            ~${(parseFloat(swapAmount || '0') * 3420.5).toFixed(2)}
                          </span>
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 font-semibold text-xs">
                            <CircleIcon className="w-4 h-4 text-sky-400" />
                            <span>USDC</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSwapping}
                        className="w-full py-3.5 rounded-xl bg-[#0095FF] hover:bg-[#0080E0] text-white font-semibold text-sm shadow-md shadow-black/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isSwapping ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Executing Multi-Route Swap...
                          </>
                        ) : (
                          <>
                            <Repeat className="w-4 h-4" />
                            Swap Now
                          </>
                        )}
                      </button>
                    </>
                  )}
                </form>
              )}

            </div>

            {/* Bottom Bar Info */}
            <div className="px-6 py-3 bg-[#0A0A0E] border-t border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-500">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Connected: Secure Hardware Enclave
              </span>
              <span className="font-mono"><span className="font-chinese text-neutral-300">Hybit</span> Early Access v1.0.0</span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
