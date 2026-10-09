import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Send,
  Download,
  Repeat,
  CreditCard,
  Layers,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Copy,
  Check,
  ChevronDown,
  ArrowUpDown,
  Search,
  Zap,
} from 'lucide-react';
import {
  EthereumIcon,
  SolanaIcon,
  BaseIcon,
  CircleIcon,
  ArbitrumIcon,
  PolygonIcon,
  OptimismIcon,
} from '../icons/NetworkIcons';
import { useToast } from '../../context/ToastContext';
import { useAppSettings } from '../../context/AppSettingsContext';

interface QuickActionModalProps {
  type: 'send' | 'receive' | 'swap' | 'buy' | 'bridge' | null;
  onClose: () => void;
  onSuccessTransaction?: (tx: any) => void;
}

interface TokenOption {
  id: string;
  symbol: string;
  name: string;
  priceUsd: number;
  balance: number;
  chain: string;
  icon: React.FC<{ className?: string }>;
}

interface ChainOption {
  id: string;
  name: string;
  symbol: string;
  badge: string;
  color: string;
  icon: React.FC<{ className?: string }>;
}

export const QuickActionModals: React.FC<QuickActionModalProps> = ({
  type,
  onClose,
  onSuccessTransaction,
}) => {
  const { showToast } = useToast();
  const { formatCurrency, language, t } = useAppSettings();
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState<'form' | 'success' | 'failed'>('form');
  const defaultFailReason = language === 'id'
    ? 'Batas toleransi slippage terlampaui (pergerakan harga > 1.0%). Saldo Anda tetap aman.'
    : 'Slippage tolerance exceeded (price movement > 1.0%). Your funds remain completely safe.';
  const [failReason, setFailReason] = useState<string>(defaultFailReason);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available Tokens
  const tokens: TokenOption[] = [
    { id: 'ETH', symbol: 'ETH', name: 'Ethereum', priceUsd: 3420.5, balance: 7.12, chain: 'Ethereum', icon: EthereumIcon },
    { id: 'USDC', symbol: 'USDC', name: 'USD Coin', priceUsd: 1.0, balance: 5116.25, chain: 'Base', icon: CircleIcon },
    { id: 'SOL', symbol: 'SOL', name: 'Solana', priceUsd: 184.2, balance: 62.15, chain: 'Solana', icon: SolanaIcon },
    { id: 'ARB', symbol: 'ARB', name: 'Arbitrum', priceUsd: 1.12, balance: 1785.7, chain: 'Arbitrum', icon: ArbitrumIcon },
    { id: 'POL', symbol: 'POL', name: 'Polygon', priceUsd: 0.48, balance: 850.0, chain: 'Polygon', icon: PolygonIcon },
  ];

  // Available Chains
  const chains: ChainOption[] = [
    { id: 'ethereum', name: 'Ethereum Mainnet', symbol: 'ETH', badge: language === 'id' ? 'Keamanan L1' : 'L1 Security', color: 'text-indigo-400', icon: EthereumIcon },
    { id: 'base', name: 'Base L2', symbol: 'ETH', badge: language === 'id' ? 'Tercepat ~1.2s' : 'Fastest ~1.2s', color: 'text-[#0095FF]', icon: BaseIcon },
    { id: 'arbitrum', name: 'Arbitrum One', symbol: 'ETH', badge: language === 'id' ? 'Gas Rendah L2' : 'Low Gas L2', color: 'text-blue-400', icon: ArbitrumIcon },
    { id: 'solana', name: 'Solana Network', symbol: 'SOL', badge: language === 'id' ? 'Sub-detik' : 'Sub-second', color: 'text-emerald-400', icon: SolanaIcon },
    { id: 'polygon', name: 'Polygon PoS', symbol: 'POL', badge: 'Sidechain', color: 'text-purple-400', icon: PolygonIcon },
    { id: 'optimism', name: 'Optimism Mainnet', symbol: 'ETH', badge: 'OP Stack', color: 'text-rose-400', icon: OptimismIcon },
  ];

  // Send state
  const [sendRecipient, setSendRecipient] = useState('');
  const [sendAmount, setSendAmount] = useState('150');
  const [sendTokenId, setSendTokenId] = useState('USDC');
  const [sendTokenDropdownOpen, setSendTokenDropdownOpen] = useState(false);
  const [sendSearch, setSendSearch] = useState('');

  // Swap state (You Pay & You Receive)
  const [swapPayAmount, setSwapPayAmount] = useState('0.5');
  const [swapPayTokenId, setSwapPayTokenId] = useState('ETH');
  const [swapReceiveTokenId, setSwapReceiveTokenId] = useState('USDC');
  const [swapPayDropdownOpen, setSwapPayDropdownOpen] = useState(false);
  const [swapReceiveDropdownOpen, setSwapReceiveDropdownOpen] = useState(false);
  const [swapPaySearch, setSwapPaySearch] = useState('');
  const [swapReceiveSearch, setSwapReceiveSearch] = useState('');

  // Buy state
  const [buyFiatAmount, setBuyFiatAmount] = useState('500');
  const [buyTokenId, setBuyTokenId] = useState('USDC');
  const [buyTokenDropdownOpen, setBuyTokenDropdownOpen] = useState(false);
  const [buySearch, setBuySearch] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'apple-pay' | 'card'>('apple-pay');

  // Bridge state (Source Chain & Destination Chain + You Pay & You Receive)
  const [bridgeSourceChainId, setBridgeSourceChainId] = useState('ethereum');
  const [bridgeDestChainId, setBridgeDestChainId] = useState('base');
  const [bridgeTokenId, setBridgeTokenId] = useState('ETH');
  const [bridgeAmount, setBridgeAmount] = useState('1.0');
  const [bridgeSourceDropdownOpen, setBridgeSourceDropdownOpen] = useState(false);
  const [bridgeDestDropdownOpen, setBridgeDestDropdownOpen] = useState(false);
  const [bridgeTokenDropdownOpen, setBridgeTokenDropdownOpen] = useState(false);
  const [bridgeSourceSearch, setBridgeSourceSearch] = useState('');
  const [bridgeDestSearch, setBridgeDestSearch] = useState('');
  const [bridgeTokenSearch, setBridgeTokenSearch] = useState('');

  const walletAddress = '0x7F2a45B083C29E41c7F3bDa208B49a37e89e8b1e';

  // Automatically reset step and state when modal type changes
  useEffect(() => {
    if (type) {
      setStep('form');
      setIsSubmitting(false);
      closeAllDropdowns();
    }
  }, [type]);

  // Helper getters
  const sendToken = tokens.find((t) => t.id === sendTokenId) || tokens[1];
  const swapPayToken = tokens.find((t) => t.id === swapPayTokenId) || tokens[0];
  const swapReceiveToken = tokens.find((t) => t.id === swapReceiveTokenId) || tokens[1];
  const buyToken = tokens.find((t) => t.id === buyTokenId) || tokens[1];
  const bridgeToken = tokens.find((t) => t.id === bridgeTokenId) || tokens[0];
  const bridgeSourceChain = chains.find((c) => c.id === bridgeSourceChainId) || chains[0];
  const bridgeDestChain = chains.find((c) => c.id === bridgeDestChainId) || chains[1];

  // Swap calculation: You Pay -> You Receive
  const parsedPayAmount = parseFloat(swapPayAmount) || 0;
  const payValueUsd = parsedPayAmount * swapPayToken.priceUsd;
  const calculatedReceiveAmount = swapReceiveToken.priceUsd > 0
    ? (payValueUsd / swapReceiveToken.priceUsd).toFixed(4)
    : '0';

  const handleCopy = () => {
    navigator.clipboard?.writeText(walletAddress);
    setCopied(true);
    showToast(
      language === 'id' ? 'Alamat Disalin ke Papan Klip' : 'Address Copied to Clipboard',
      walletAddress,
      'copy'
    );
    setTimeout(() => setCopied(false), 2000);
  };

  // Flip Swap Pay & Receive
  const handleFlipSwap = () => {
    const prevPayId = swapPayTokenId;
    const prevReceiveId = swapReceiveTokenId;
    setSwapPayTokenId(prevReceiveId);
    setSwapReceiveTokenId(prevPayId);
    setSwapPayAmount(calculatedReceiveAmount);
    showToast(
      language === 'id' ? 'Pasangan Tukar Dibalik' : 'Swap Pairs Flipped',
      `${swapReceiveToken.symbol} ➔ ${swapPayToken.symbol}`,
      'swap'
    );
  };

  // Flip Bridge Chains
  const handleFlipBridgeChains = () => {
    const prevSource = bridgeSourceChainId;
    const prevDest = bridgeDestChainId;
    setBridgeSourceChainId(prevDest);
    setBridgeDestChainId(prevSource);
    showToast(
      language === 'id' ? 'Rute Bridge Dibalik' : 'Bridge Route Inverted',
      `${bridgeDestChain.name} ➔ ${bridgeSourceChain.name}`,
      'bridge'
    );
  };

  const closeAllDropdowns = () => {
    setSendTokenDropdownOpen(false);
    setSwapPayDropdownOpen(false);
    setSwapReceiveDropdownOpen(false);
    setBuyTokenDropdownOpen(false);
    setBridgeSourceDropdownOpen(false);
    setBridgeDestDropdownOpen(false);
    setBridgeTokenDropdownOpen(false);
  };

  // Handle user closing modal without completing (X button or backdrop click)
  const handleCancelOrClose = () => {
    if (type === 'receive') {
      // Receive is informational (e.g. copying address/QR). No transaction form cancellation toast.
    } else if (step === 'form') {
      showToast(
        language === 'id' ? 'Transaksi Tidak Dilakukan' : 'Transaction Cancelled',
        language === 'id' ? 'Form dibatalkan, tidak ada transaksi yang diproses' : 'Form closed, no funds were moved',
        'info'
      );
    } else if (step === 'success') {
      // Transaction already confirmed, close cleanly without double toast
    } else if (step === 'failed') {
      // Transaction failed view closed
    }
    setStep('form');
    setIsSubmitting(false);
    setSendRecipient('');
    setSendAmount('150');
    setSwapPayAmount('0.5');
    setBuyFiatAmount('500');
    setBridgeAmount('1.0');
    closeAllDropdowns();
    onClose();
  };

  // Handle user clicking Done after successful transaction
  const handleDoneSuccess = () => {
    setStep('form');
    setIsSubmitting(false);
    setSendRecipient('');
    setSendAmount('150');
    setSwapPayAmount('0.5');
    setBuyFiatAmount('500');
    setBridgeAmount('1.0');
    closeAllDropdowns();
    onClose();
  };

  // Reset form inputs and stay in modal for another transaction
  const handleResetForm = () => {
    setStep('form');
    setIsSubmitting(false);
    setSendRecipient('');
    setSendAmount('150');
    setSwapPayAmount('0.5');
    setBuyFiatAmount('500');
    setBridgeAmount('1.0');
    closeAllDropdowns();
    showToast(
      language === 'id' ? 'Form Direset' : 'Form Reset',
      language === 'id' ? 'Siap melakukan transaksi baru' : 'Ready for a new transaction',
      'info'
    );
  };

  // Simulate failed transaction flow
  const handleSimulateFail = (
    reason = language === 'id'
      ? 'Batas toleransi slippage terlampaui (pergerakan harga > 1.0%). Transaksi dibatalkan secara aman.'
      : 'Slippage tolerance exceeded (price movement > 1.0%). Transaction cancelled safely.'
  ) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFailReason(reason);
      setStep('failed');
      showToast(
        language === 'id' ? 'Transaksi Gagal' : 'Transaction Failed',
        reason,
        'failed'
      );
    }, 700);
  };

  const handleActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // If input amount is invalid or zero, simulate safe transaction rejection
    const numAmount = type === 'send' ? parseFloat(sendAmount) : type === 'swap' ? parseFloat(swapPayAmount) : type === 'bridge' ? parseFloat(bridgeAmount) : parseFloat(buyFiatAmount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setTimeout(() => {
        setIsSubmitting(false);
        const errMsg = language === 'id'
          ? 'Nominal transaksi tidak valid. Jumlah harus lebih besar dari 0.'
          : 'Invalid transaction amount. Value must be greater than 0.';
        setFailReason(errMsg);
        setStep('failed');
        showToast(language === 'id' ? 'Transaksi Gagal' : 'Transaction Failed', errMsg, 'failed');
      }, 600);
      return;
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');

      if (type === 'send') {
        showToast(
          language === 'id' ? 'Pengiriman Berhasil' : 'Transfer Confirmed',
          language === 'id'
            ? `Mengirim ${sendAmount} ${sendToken.symbol} ke ${sendRecipient || 'penerima'}`
            : `Sent ${sendAmount} ${sendToken.symbol} to ${sendRecipient || 'recipient'}`,
          'send'
        );
      } else if (type === 'swap') {
        showToast(
          language === 'id' ? 'Tukar Token Berhasil' : 'Swap Executed',
          language === 'id'
            ? `Menukar ${swapPayAmount} ${swapPayToken.symbol} menjadi ${calculatedReceiveAmount} ${swapReceiveToken.symbol}`
            : `Swapped ${swapPayAmount} ${swapPayToken.symbol} into ${calculatedReceiveAmount} ${swapReceiveToken.symbol}`,
          'swap'
        );
      } else if (type === 'bridge') {
        showToast(
          language === 'id' ? 'Bridge Berhasil Diajukan' : 'Bridge Relay Submitted',
          language === 'id'
            ? `Mengirim ${bridgeAmount} ${bridgeToken.symbol} dari ${bridgeSourceChain.name} ke ${bridgeDestChain.name}`
            : `Relaying ${bridgeAmount} ${bridgeToken.symbol} from ${bridgeSourceChain.name} to ${bridgeDestChain.name}`,
          'bridge'
        );
      } else if (type === 'buy') {
        showToast(
          language === 'id' ? 'Pembelian Diproses' : 'Fiat Onramp Initiated',
          language === 'id'
            ? `Membeli ~${((parseFloat(buyFiatAmount) || 0) / buyToken.priceUsd).toFixed(4)} ${buyToken.symbol} via Stripe`
            : `Purchased ~${((parseFloat(buyFiatAmount) || 0) / buyToken.priceUsd).toFixed(4)} ${buyToken.symbol} via Stripe rail`,
          'buy'
        );
      }

              if (onSuccessTransaction) {
                if (type === 'send') {
                  onSuccessTransaction({
                    id: 'tx-' + Date.now(),
                    type: 'sent',
                    status: 'confirmed',
                    chain: sendToken.chain,
                    from: language === 'id' ? 'Anda (Dompet Privy)' : 'You (Privy Wallet)',
                    to: sendRecipient,
                    amount: `-${sendAmount} ${sendToken.symbol}`,
                    tokenSymbol: sendToken.symbol,
                    valueUsd: parseFloat(sendAmount || '0') * sendToken.priceUsd,
                    feeUsd: 0.0,
                    date: language === 'id' ? 'Baru saja' : 'Just now',
                  });
                } else if (type === 'swap') {
                  onSuccessTransaction({
                    id: 'tx-' + Date.now(),
                    type: 'swap',
                    status: 'confirmed',
                    chain: swapPayToken.chain,
                    from: `${swapPayAmount} ${swapPayToken.symbol}`,
                    to: `~${calculatedReceiveAmount} ${swapReceiveToken.symbol}`,
                    amount: `${swapPayAmount} ${swapPayToken.symbol} ➔ ${calculatedReceiveAmount} ${swapReceiveToken.symbol}`,
                    tokenSymbol: swapReceiveToken.symbol,
                    valueUsd: payValueUsd,
                    feeUsd: 0.0,
                    date: language === 'id' ? 'Baru saja' : 'Just now',
                  });
                } else if (type === 'bridge') {
                  onSuccessTransaction({
                    id: 'tx-' + Date.now(),
                    type: 'bridge',
                    status: 'confirmed',
                    chain: `${bridgeSourceChain.name} ➔ ${bridgeDestChain.name}`,
                    from: bridgeSourceChain.name,
                    to: bridgeDestChain.name,
                    amount: `${bridgeAmount} ${bridgeToken.symbol}`,
                    tokenSymbol: bridgeToken.symbol,
                    valueUsd: (parseFloat(bridgeAmount) || 0) * bridgeToken.priceUsd,
                    feeUsd: 0.0,
                    date: language === 'id' ? 'Baru saja' : 'Just now',
                  });
                } else if (type === 'buy') {
                  onSuccessTransaction({
                    id: 'tx-' + Date.now(),
                    type: 'received',
                    status: 'confirmed',
                    chain: 'Base',
                    from: 'Stripe Onramp',
                    to: language === 'id' ? 'Anda (Dompet Privy)' : 'You (Privy Wallet)',
                    amount: `+${((parseFloat(buyFiatAmount) || 0) / buyToken.priceUsd).toFixed(4)} ${buyToken.symbol}`,
                    tokenSymbol: buyToken.symbol,
                    valueUsd: parseFloat(buyFiatAmount || '0'),
                    feeUsd: 0.0,
                    date: language === 'id' ? 'Baru saja' : 'Just now',
                  });
                }
              }
            }, 1200);
          };

          if (!type) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCancelOrClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg rounded-3xl bg-[#141419] border border-white/15 p-6 shadow-2xl shadow-black text-white z-10 max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08] shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0095FF] text-white flex items-center justify-center">
                {type === 'send' && <Send className="w-4 h-4" />}
                {type === 'receive' && <Download className="w-4 h-4" />}
                {type === 'swap' && <Repeat className="w-4 h-4" />}
                {type === 'buy' && <CreditCard className="w-4 h-4" />}
                {type === 'bridge' && <Layers className="w-4 h-4" />}
              </div>
              <div>
                <h3 className="text-base font-bold text-white capitalize">
                  {type === 'send' && (language === 'id' ? 'Kirim Aset Digital' : 'Send Digital Assets')}
                  {type === 'receive' && (language === 'id' ? 'Terima Aset Digital' : 'Receive Digital Assets')}
                  {type === 'swap' && (language === 'id' ? 'Tukar Instan Lintas-DEX' : 'Cross-DEX Instant Swap')}
                  {type === 'buy' && (language === 'id' ? 'Beli Kripto dengan Fiat' : 'Buy Crypto with Fiat')}
                  {type === 'bridge' && (language === 'id' ? 'Bridge Aset Lintas-Jaringan' : 'Cross-Chain Asset Bridge')}
                </h3>
                <span className="text-[11px] text-neutral-400">
                  {type === 'send' && (language === 'id' ? 'Transfer tanpa gas via dompet embedded Privy' : 'Gasless transfers via Privy embedded wallet')}
                  {type === 'receive' && (language === 'id' ? 'Alamat setoran multi-chain terpadu' : 'Multi-chain deposit address')}
                  {type === 'swap' && (language === 'id' ? 'Likuiditas teragregasi · Biaya 0%' : 'Aggregated liquidity · 0% fee')}
                  {type === 'buy' && (language === 'id' ? 'Onramp langsung tanpa slippage' : 'Direct onramp with zero slippage')}
                  {type === 'bridge' && (language === 'id' ? 'Router bridge LayerZero & CCIP' : 'LayerZero & CCIP bridge router')}
                </span>
              </div>
            </div>

            <button
              onClick={handleCancelOrClose}
              className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="overflow-y-auto flex-1 pr-0.5">
            {step === 'failed' ? (
              <div className="text-center py-6 space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto shadow-lg shadow-rose-500/10">
                  <XCircle className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {language === 'id' ? 'Transaksi Gagal' : 'Transaction Failed'}
                  </h4>
                  <p className="text-xs text-neutral-300 mt-1.5 max-w-xs mx-auto leading-relaxed">
                    {failReason}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-left text-xs space-y-1.5 text-neutral-300">
                  <div className="flex items-center gap-2 text-rose-300 font-semibold">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{language === 'id' ? 'Status Saldo: Aman & Utuh' : 'Funds Status: Safe & Intact'}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-normal">
                    {language === 'id'
                      ? 'Tidak ada aset yang terpotong dari dompet Anda karena transaksi dibatalkan secara aman via smart contract.'
                      : 'No funds were deducted from your wallet as the transaction was reverted safely via smart contract.'}
                  </p>
                </div>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setStep('form');
                      showToast(
                        language === 'id' ? 'Mencoba Kembali' : 'Retrying',
                        language === 'id' ? 'Silakan sesuaikan parameter transaksi Anda' : 'Please adjust your transaction parameters',
                        'info'
                      );
                    }}
                    className="w-full py-3.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-xs border border-white/10 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <span>{language === 'id' ? 'Coba Lagi' : 'Try Again'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCancelOrClose}
                    className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-lg shadow-rose-600/25 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <span>{language === 'id' ? 'Tutup' : 'Close'}</span>
                  </button>
                </div>
              </div>
            ) : step === 'success' ? (
              <div className="text-center py-6 space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {language === 'id' ? 'Transaksi Berhasil!' : 'Transaction Confirmed!'}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1.5 max-w-xs mx-auto leading-relaxed">
                    {language === 'id'
                      ? `Permintaan ${type} Anda telah diajukan dan terkonfirmasi on-chain via dompet Privy MPC.`
                      : `Your ${type} request has been submitted and confirmed on-chain via Privy MPC wallet.`}
                  </p>
                </div>

                <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="w-full py-3.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-xs border border-white/10 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <span>{t.newTransaction}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDoneSuccess}
                    className="w-full py-3.5 rounded-xl bg-[#0095FF] hover:bg-[#0080E0] text-white font-semibold text-xs shadow-md shadow-black/30 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <span>{t.done}</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* 1. SEND MODAL */}
                {type === 'send' && (
                  <form onSubmit={handleActionSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                        {language === 'id' ? 'Penerima (Nomor ponsel, ENS, atau alamat 0x)' : 'Recipient (Phone number, ENS, or 0x address)'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="+1 (555) 019-2834 or alex.eth"
                        value={sendRecipient}
                        onChange={(e) => setSendRecipient(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1C23] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#0095FF]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Token Dropdown */}
                      <div className="relative">
                        <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                          {t.selectToken}
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setSendTokenDropdownOpen(!sendTokenDropdownOpen);
                            setSendSearch('');
                          }}
                          className="w-full px-3 py-2.5 rounded-xl bg-[#1C1C23] border border-white/10 hover:border-white/20 text-white text-sm flex items-center justify-between transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <sendToken.icon className="w-4 h-4 shrink-0 text-[#0095FF]" />
                            <span className="font-semibold">{sendToken.symbol}</span>
                            <span className="text-[11px] text-neutral-400">({sendToken.chain})</span>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${sendTokenDropdownOpen ? 'rotate-180 text-[#0095FF]' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {sendTokenDropdownOpen && (
                            <>
                              <div className="fixed inset-0 z-30" onClick={() => setSendTokenDropdownOpen(false)} />
                              <motion.div
                                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                                className="absolute left-0 right-0 mt-2 rounded-2xl bg-[#18181F] border border-white/15 shadow-2xl p-2 z-40 space-y-1.5 backdrop-blur-2xl"
                              >
                                <div className="relative">
                                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-neutral-500" />
                                  <input
                                    type="text"
                                    placeholder={t.searchToken}
                                    value={sendSearch}
                                    onChange={(e) => setSendSearch(e.target.value)}
                                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#111116] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#0095FF]"
                                  />
                                </div>
                                <div className="max-h-64 sm:max-h-72 overflow-y-auto space-y-1">
                                  {tokens
                                    .filter((t) => t.symbol.toLowerCase().includes(sendSearch.toLowerCase()) || t.name.toLowerCase().includes(sendSearch.toLowerCase()))
                                    .map((t) => (
                                      <button
                                        key={t.id}
                                        type="button"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          setSendTokenId(t.id);
                                          setSendTokenDropdownOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between p-1.5 sm:p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                                          sendTokenId === t.id ? 'bg-[#0095FF]/15 text-[#0095FF] font-semibold' : 'text-neutral-300 hover:bg-white/[0.06] hover:text-white'
                                        }`}
                                      >
                                        <div className="flex items-center gap-2">
                                          <t.icon className="w-4 h-4 shrink-0" />
                                          <div className="text-left">
                                            <div className="font-semibold text-white">{t.symbol}</div>
                                            <div className="text-[10px] text-neutral-400">{t.name} · {t.chain}</div>
                                          </div>
                                        </div>
                                        <div className="text-right font-mono text-[11px]">
                                          <div>{t.balance}</div>
                                          <div className="text-neutral-500">{formatCurrency(t.balance * t.priceUsd)}</div>
                                        </div>
                                      </button>
                                    ))}
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Amount Input */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5 text-xs text-neutral-400">
                          <label>{language === 'id' ? 'Jumlah' : 'Amount'}</label>
                          <span className="font-mono text-[10px]">{language === 'id' ? 'Saldo:' : 'Bal:'} {sendToken.balance}</span>
                        </div>
                        <div className="relative">
                          <input
                            type="number"
                            required
                            step="any"
                            value={sendAmount}
                            onChange={(e) => setSendAmount(e.target.value)}
                            className="w-full pl-3.5 pr-12 py-2.5 rounded-xl bg-[#1C1C23] border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-[#0095FF]"
                          />
                          <button
                            type="button"
                            onClick={() => setSendAmount(sendToken.balance.toString())}
                            className="absolute right-2 top-2.5 text-[10px] font-bold text-[#0095FF] hover:underline px-1 py-0.5"
                          >
                            MAX
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#18181E] border border-white/[0.06] text-xs text-neutral-400 space-y-1">
                      <div className="flex justify-between">
                        <span>{language === 'id' ? 'Rute Jaringan' : 'Network Routing'}</span>
                        <span className="text-white font-mono">{sendToken.chain} (Privy Gasless)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{language === 'id' ? 'Estimasi Biaya Jaringan' : 'Estimated Network Fee'}</span>
                        <span className="text-emerald-400 font-semibold">{formatCurrency(0)} (<span className="font-chinese text-emerald-300">Hybit</span> {language === 'id' ? 'Disubsidi' : 'Subsidized'})</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-[#0095FF] hover:bg-[#0080E0] text-white font-semibold text-sm shadow-md shadow-black/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {language === 'id' ? 'Mengotorisasi via Privy...' : 'Authorizing via Privy...'}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          {language === 'id' ? 'Kirim Sekarang' : 'Send Now'}
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* 2. RECEIVE MODAL */}
                {type === 'receive' && (
                  <div className="text-center space-y-4">
                    <div className="w-44 h-44 mx-auto p-3 rounded-2xl bg-white shadow-xl flex items-center justify-center">
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
                        <rect x="42" y="42" width="16" height="16" fill="#0095FF" rx="3" />
                        <rect x="40" y="10" width="8" height="8" fill="currentColor" />
                        <rect x="50" y="20" width="8" height="8" fill="currentColor" />
                        <rect x="65" y="40" width="8" height="8" fill="currentColor" />
                        <rect x="80" y="45" width="8" height="8" fill="currentColor" />
                        <rect x="40" y="65" width="8" height="8" fill="currentColor" />
                        <rect x="55" y="75" width="8" height="8" fill="currentColor" />
                        <rect x="70" y="80" width="8" height="8" fill="currentColor" />
                        <rect x="80" y="70" width="8" height="8" fill="currentColor" />
                      </svg>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#1C1C23] border border-white/10 flex items-center justify-between">
                      <span className="font-mono text-xs text-neutral-300 truncate max-w-[260px]">
                        {walletAddress}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="px-3 py-1.5 rounded-lg bg-[#0095FF] hover:bg-[#0080E0] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? (language === 'id' ? 'Disalin' : 'Copied') : (language === 'id' ? 'Salin' : 'Copy')}</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-neutral-400">
                      {language === 'id'
                        ? 'Mendukung setoran Ethereum, Base, Arbitrum, Solana, Polygon, dan Optimism.'
                        : 'Supports Ethereum, Base, Arbitrum, Solana, Polygon, and Optimism deposits.'}
                    </p>
                  </div>
                )}

                {/* 3. SWAP MODAL: Pilihan YOU PAY dan YOU RECEIVE */}
                {type === 'swap' && (
                  <form onSubmit={handleActionSubmit} className="space-y-3">
                    
                    {/* YOU PAY SECTION */}
                    <div className="p-4 rounded-2xl bg-[#1C1C23] border border-white/10 relative">
                      <div className="flex justify-between items-center text-xs text-neutral-400 mb-2">
                        <span className="font-bold text-white uppercase tracking-wider text-[11px]">{t.youPay}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[11px] text-neutral-400">{language === 'id' ? 'Saldo:' : 'Bal:'} {swapPayToken.balance}</span>
                          <div className="flex items-center gap-1 ml-1">
                            {['25%', '50%', '75%', 'MAX'].map((pct) => (
                              <button
                                key={pct}
                                type="button"
                                onClick={() => {
                                  if (pct === '25%') setSwapPayAmount((swapPayToken.balance * 0.25).toFixed(4));
                                  if (pct === '50%') setSwapPayAmount((swapPayToken.balance * 0.5).toFixed(4));
                                  if (pct === '75%') setSwapPayAmount((swapPayToken.balance * 0.75).toFixed(4));
                                  if (pct === 'MAX') setSwapPayAmount(swapPayToken.balance.toString());
                                }}
                                className="px-1.5 py-0.5 rounded bg-white/[0.06] hover:bg-white/15 text-[9px] font-mono text-[#0095FF] font-semibold cursor-pointer transition-colors"
                              >
                                {pct}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center gap-3">
                        <input
                          type="number"
                          step="any"
                          required
                          value={swapPayAmount}
                          onChange={(e) => setSwapPayAmount(e.target.value)}
                          placeholder="0.0"
                          className="bg-transparent text-2xl sm:text-3xl font-bold font-mono text-white focus:outline-none flex-1 min-w-0"
                        />

                        {/* You Pay Token Dropdown Button */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => {
                              setSwapPayDropdownOpen(!swapPayDropdownOpen);
                              setSwapReceiveDropdownOpen(false);
                              setSwapPaySearch('');
                            }}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 text-xs font-semibold text-white transition-all cursor-pointer shadow-sm"
                          >
                            <swapPayToken.icon className="w-4 h-4 shrink-0 text-[#0095FF]" />
                            <span>{swapPayToken.symbol}</span>
                            <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${swapPayDropdownOpen ? 'rotate-180 text-[#0095FF]' : ''}`} />
                          </button>

                          <AnimatePresence>
                            {swapPayDropdownOpen && (
                              <>
                                <div className="fixed inset-0 z-30" onClick={() => setSwapPayDropdownOpen(false)} />
                                <motion.div
                                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                                  className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#18181F] border border-white/15 shadow-2xl p-2 z-40 space-y-1.5 backdrop-blur-2xl"
                                >
                                  <div className="relative">
                                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-neutral-500" />
                                    <input
                                      type="text"
                                      placeholder={language === 'id' ? 'Cari token bayar...' : 'Search pay token...'}
                                      value={swapPaySearch}
                                      onChange={(e) => setSwapPaySearch(e.target.value)}
                                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#111116] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#0095FF]"
                                    />
                                  </div>
                                  <div className="max-h-64 sm:max-h-72 overflow-y-auto space-y-1">
                                    {tokens
                                      .filter((t) => t.symbol.toLowerCase().includes(swapPaySearch.toLowerCase()) || t.name.toLowerCase().includes(swapPaySearch.toLowerCase()))
                                      .map((t) => (
                                        <button
                                          key={t.id}
                                          type="button"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setSwapPayTokenId(t.id);
                                            setSwapPayDropdownOpen(false);
                                          }}
                                          className={`w-full flex items-center justify-between p-1.5 sm:p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                                            swapPayTokenId === t.id ? 'bg-[#0095FF]/15 text-[#0095FF] font-semibold' : 'text-neutral-300 hover:bg-white/[0.06] hover:text-white'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2">
                                            <t.icon className="w-4 h-4 shrink-0" />
                                            <div className="text-left">
                                              <div className="font-semibold text-white">{t.symbol}</div>
                                              <div className="text-[10px] text-neutral-400">{t.name} · {t.chain}</div>
                                            </div>
                                          </div>
                                          <div className="text-right font-mono text-[11px]">
                                            <div>{t.balance}</div>
                                            <div className="text-neutral-500">{formatCurrency(t.priceUsd)}</div>
                                          </div>
                                        </button>
                                      ))}
                                  </div>
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      <div className="text-[11px] text-neutral-400 font-mono mt-1">
                        ≈ {formatCurrency(payValueUsd)}
                      </div>
                    </div>

                    {/* FLIP BUTTON */}
                    <div className="flex justify-center -my-2.5 relative z-10">
                      <button
                        type="button"
                        onClick={handleFlipSwap}
                        className="w-9 h-9 rounded-full bg-[#181820] hover:bg-[#22222C] border border-white/15 shadow-md flex items-center justify-center text-neutral-300 hover:text-white transition-all cursor-pointer active:scale-90"
                        title={language === 'id' ? 'Tukar Posisi Bayar dan Terima' : 'Switch Pay and Receive'}
                      >
                        <ArrowUpDown className="w-4 h-4 text-[#0095FF]" />
                      </button>
                    </div>

                    {/* YOU RECEIVE SECTION */}
                    <div className="p-4 rounded-2xl bg-[#1C1C23] border border-white/10 relative">
                      <div className="flex justify-between items-center text-xs text-neutral-400 mb-2">
                        <span className="font-bold text-white uppercase tracking-wider text-[11px]">{t.youReceive}</span>
                        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                          <Zap className="w-3 h-3 text-emerald-400" />
                          {language === 'id' ? 'Rute DEX Terbaik' : 'Best DEX Route'}
                        </span>
                      </div>

                      <div className="flex justify-between items-center gap-3">
                        <div className="text-2xl sm:text-3xl font-bold font-mono text-white flex-1 min-w-0 truncate">
                          {calculatedReceiveAmount}
                        </div>

                        {/* You Receive Token Dropdown Button */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => {
                              setSwapReceiveDropdownOpen(!swapReceiveDropdownOpen);
                              setSwapPayDropdownOpen(false);
                              setSwapReceiveSearch('');
                            }}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 text-xs font-semibold text-white transition-all cursor-pointer shadow-sm"
                          >
                            <swapReceiveToken.icon className="w-4 h-4 shrink-0 text-[#0095FF]" />
                            <span>{swapReceiveToken.symbol}</span>
                            <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${swapReceiveDropdownOpen ? 'rotate-180 text-[#0095FF]' : ''}`} />
                          </button>

                          <AnimatePresence>
                            {swapReceiveDropdownOpen && (
                              <>
                                <div className="fixed inset-0 z-30" onClick={() => setSwapReceiveDropdownOpen(false)} />
                                <motion.div
                                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                                  className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#18181F] border border-white/15 shadow-2xl p-2 z-40 space-y-1.5 backdrop-blur-2xl"
                                >
                                  <div className="relative">
                                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-neutral-500" />
                                    <input
                                      type="text"
                                      placeholder={language === 'id' ? 'Cari token terima...' : 'Search receive token...'}
                                      value={swapReceiveSearch}
                                      onChange={(e) => setSwapReceiveSearch(e.target.value)}
                                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#111116] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#0095FF]"
                                    />
                                  </div>
                                  <div className="max-h-64 sm:max-h-72 overflow-y-auto space-y-1">
                                    {tokens
                                      .filter((t) => t.symbol.toLowerCase().includes(swapReceiveSearch.toLowerCase()) || t.name.toLowerCase().includes(swapReceiveSearch.toLowerCase()))
                                      .map((t) => (
                                        <button
                                          key={t.id}
                                          type="button"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setSwapReceiveTokenId(t.id);
                                            setSwapReceiveDropdownOpen(false);
                                          }}
                                          className={`w-full flex items-center justify-between p-1.5 sm:p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                                            swapReceiveTokenId === t.id ? 'bg-[#0095FF]/15 text-[#0095FF] font-semibold' : 'text-neutral-300 hover:bg-white/[0.06] hover:text-white'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2">
                                            <t.icon className="w-4 h-4 shrink-0" />
                                            <div className="text-left">
                                              <div className="font-semibold text-white">{t.symbol}</div>
                                              <div className="text-[10px] text-neutral-400">{t.name} · {t.chain}</div>
                                            </div>
                                          </div>
                                          <div className="text-right font-mono text-[11px]">
                                            <div>{formatCurrency(t.priceUsd)}</div>
                                          </div>
                                        </button>
                                      ))}
                                  </div>
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[11px] text-neutral-400 font-mono mt-1 pt-1 border-t border-white/[0.04]">
                        <span>{language === 'id' ? 'Kurs:' : 'Rate:'} 1 {swapPayToken.symbol} = {(swapPayToken.priceUsd / (swapReceiveToken.priceUsd || 1)).toFixed(2)} {swapReceiveToken.symbol}</span>
                        <span className="text-emerald-400 font-semibold">{language === 'id' ? '0% Biaya Platform' : '0% Platform Fee'}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-[#0095FF] hover:bg-[#0080E0] text-white font-semibold text-sm shadow-md shadow-black/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {language === 'id' ? 'Memproses Swap Multi-Rute...' : 'Executing Multi-Route Swap...'}
                        </>
                      ) : (
                        <>
                          <Repeat className="w-4 h-4" />
                          {language === 'id' ? 'Eksekusi Tukar Sekarang' : 'Execute Swap Now'}
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* 4. BUY MODAL */}
                {type === 'buy' && (
                  <form onSubmit={handleActionSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                        {language === 'id' ? 'Nominal Pembelian (USD)' : 'Spend Amount (USD)'}
                      </label>
                      <input
                        type="number"
                        value={buyFiatAmount}
                        onChange={(e) => setBuyFiatAmount(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1C23] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-[#0095FF]"
                      />
                    </div>

                    {/* Token to receive dropdown */}
                    <div className="relative">
                      <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                        {language === 'id' ? 'Aset Kripto yang Diterima' : 'Receive Crypto Asset'}
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setBuyTokenDropdownOpen(!buyTokenDropdownOpen);
                          setBuySearch('');
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1C1C23] border border-white/10 hover:border-white/20 text-white text-sm flex items-center justify-between transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <buyToken.icon className="w-4 h-4 shrink-0 text-[#0095FF]" />
                          <span className="font-semibold">{buyToken.symbol}</span>
                          <span className="text-neutral-400 text-xs">({buyToken.name})</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${buyTokenDropdownOpen ? 'rotate-180 text-[#0095FF]' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {buyTokenDropdownOpen && (
                          <>
                            <div className="fixed inset-0 z-30" onClick={() => setBuyTokenDropdownOpen(false)} />
                            <motion.div
                              initial={{ opacity: 0, y: 6, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 6, scale: 0.96 }}
                              className="absolute left-0 right-0 mt-2 rounded-2xl bg-[#18181F] border border-white/15 shadow-2xl p-2 z-40 space-y-1.5 backdrop-blur-2xl"
                            >
                              <div className="relative">
                                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-neutral-500" />
                                <input
                                  type="text"
                                  placeholder={t.searchToken}
                                  value={buySearch}
                                  onChange={(e) => setBuySearch(e.target.value)}
                                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#111116] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#0095FF]"
                                />
                              </div>
                              <div className="max-h-64 sm:max-h-72 overflow-y-auto space-y-1">
                                {tokens
                                  .filter((t) => t.symbol.toLowerCase().includes(buySearch.toLowerCase()) || t.name.toLowerCase().includes(buySearch.toLowerCase()))
                                  .map((t) => (
                                    <button
                                      key={t.id}
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setBuyTokenId(t.id);
                                        setBuyTokenDropdownOpen(false);
                                      }}
                                      className={`w-full flex items-center justify-between p-1.5 sm:p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                                        buyTokenId === t.id ? 'bg-[#0095FF]/15 text-[#0095FF] font-semibold' : 'text-neutral-300 hover:bg-white/[0.06] hover:text-white'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <t.icon className="w-4 h-4 shrink-0" />
                                        <div className="text-left">
                                          <div className="font-semibold text-white">{t.symbol}</div>
                                          <div className="text-[10px] text-neutral-400">{t.name}</div>
                                        </div>
                                      </div>
                                      <div className="text-right font-mono text-[11px] text-neutral-300">
                                        {formatCurrency(t.priceUsd)}
                                      </div>
                                    </button>
                                  ))}
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('apple-pay')}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          paymentMethod === 'apple-pay'
                            ? 'border-[#0095FF] bg-[#0095FF]/10 text-white'
                            : 'border-white/10 text-neutral-400'
                        }`}
                      >
                        Apple Pay
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          paymentMethod === 'card'
                            ? 'border-[#0095FF] bg-[#0095FF]/10 text-white'
                            : 'border-white/10 text-neutral-400'
                        }`}
                      >
                        {language === 'id' ? 'Kartu Kredit / Debit' : 'Credit Card'}
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-[#18181E] border border-white/[0.06] text-xs text-neutral-400 space-y-1">
                      <div className="flex justify-between">
                        <span>{language === 'id' ? 'Anda Terima' : 'You Receive'}</span>
                        <span className="text-white font-mono font-bold">
                          ~{((parseFloat(buyFiatAmount) || 0) / buyToken.priceUsd).toFixed(4)} {buyToken.symbol}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>{language === 'id' ? 'Penyedia Layanan' : 'Provider'}</span>
                        <span className="text-neutral-300">{language === 'id' ? 'Stripe Onramp (Langsung ke Dompet Privy)' : 'Stripe Onramp (Direct to Privy Wallet)'}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-[#0095FF] hover:bg-[#0080E0] text-white font-semibold text-sm shadow-md shadow-black/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {language === 'id' ? 'Menghubungkan Jalur Fiat...' : 'Connecting Fiat Rail...'}
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          {language === 'id'
                            ? (paymentMethod === 'apple-pay' ? 'Beli dengan Apple Pay' : 'Beli dengan Kartu')
                            : (paymentMethod === 'apple-pay' ? 'Buy with Apple Pay' : 'Buy with Card')}
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* 5. BRIDGE MODAL: SOURCE CHAIN & DESTINATION CHAIN & TOKEN & YOU PAY / YOU RECEIVE */}
                {type === 'bridge' && (
                  <form onSubmit={handleActionSubmit} className="space-y-3">
                    
                    {/* YOU PAY (SOURCE CHAIN) */}
                    <div className="p-4 rounded-2xl bg-[#1C1C23] border border-white/10 relative">
                      <div className="flex justify-between items-center text-xs text-neutral-400 mb-2">
                        <span className="font-bold text-white uppercase tracking-wider text-[11px]">{t.youPayFrom}</span>
                        <span className="font-mono text-[10px]">{language === 'id' ? 'Saldo:' : 'Bal:'} {bridgeToken.balance} {bridgeToken.symbol}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
                        {/* Source Chain Dropdown */}
                        <div className="relative">
                          <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1">
                            {t.sourceChain}
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setBridgeSourceDropdownOpen(!bridgeSourceDropdownOpen);
                              setBridgeDestDropdownOpen(false);
                              setBridgeTokenDropdownOpen(false);
                              setBridgeSourceSearch('');
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-[#141419] border border-white/10 hover:border-white/20 text-white text-xs flex items-center justify-between transition-all cursor-pointer"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <bridgeSourceChain.icon className="w-4 h-4 shrink-0 text-[#0095FF]" />
                              <span className="font-semibold truncate">{bridgeSourceChain.name}</span>
                            </div>
                            <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 shrink-0 transition-transform ${bridgeSourceDropdownOpen ? 'rotate-180 text-[#0095FF]' : ''}`} />
                          </button>

                          <AnimatePresence>
                            {bridgeSourceDropdownOpen && (
                              <>
                                <div className="fixed inset-0 z-30" onClick={() => setBridgeSourceDropdownOpen(false)} />
                                <motion.div
                                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                                  className="absolute left-0 right-0 mt-2 rounded-2xl bg-[#18181F] border border-white/15 shadow-2xl p-2 z-40 space-y-1.5 backdrop-blur-2xl"
                                >
                                  <div className="relative">
                                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-neutral-500" />
                                    <input
                                      type="text"
                                      placeholder={language === 'id' ? 'Cari jaringan asal...' : 'Search source chain...'}
                                      value={bridgeSourceSearch}
                                      onChange={(e) => setBridgeSourceSearch(e.target.value)}
                                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#111116] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#0095FF]"
                                    />
                                  </div>
                                  <div className="max-h-64 sm:max-h-72 overflow-y-auto space-y-1">
                                    {chains
                                      .filter((c) => c.name.toLowerCase().includes(bridgeSourceSearch.toLowerCase()))
                                      .map((c) => (
                                        <button
                                          key={c.id}
                                          type="button"
                                          disabled={c.id === bridgeDestChainId}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setBridgeSourceChainId(c.id);
                                            setBridgeSourceDropdownOpen(false);
                                          }}
                                          className={`w-full flex items-center justify-between p-1.5 sm:p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                                            c.id === bridgeDestChainId
                                              ? 'opacity-35 cursor-not-allowed text-neutral-500'
                                              : bridgeSourceChainId === c.id
                                              ? 'bg-[#0095FF]/15 text-[#0095FF] font-semibold'
                                              : 'text-neutral-300 hover:bg-white/[0.06] hover:text-white'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2">
                                            <c.icon className="w-4 h-4 shrink-0" />
                                            <span className="font-medium">{c.name}</span>
                                          </div>
                                          <span className="text-[10px] font-mono text-neutral-400">{c.badge}</span>
                                        </button>
                                      ))}
                                  </div>
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Token to Bridge Dropdown */}
                        <div className="relative">
                          <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1">
                            {language === 'id' ? 'Aset Token' : 'Token Asset'}
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setBridgeTokenDropdownOpen(!bridgeTokenDropdownOpen);
                              setBridgeSourceDropdownOpen(false);
                              setBridgeDestDropdownOpen(false);
                              setBridgeTokenSearch('');
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-[#141419] border border-white/10 hover:border-white/20 text-white text-xs flex items-center justify-between transition-all cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <bridgeToken.icon className="w-4 h-4 shrink-0 text-[#0095FF]" />
                              <span className="font-semibold">{bridgeToken.symbol}</span>
                            </div>
                            <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${bridgeTokenDropdownOpen ? 'rotate-180 text-[#0095FF]' : ''}`} />
                          </button>

                          <AnimatePresence>
                            {bridgeTokenDropdownOpen && (
                              <>
                                <div className="fixed inset-0 z-30" onClick={() => setBridgeTokenDropdownOpen(false)} />
                                <motion.div
                                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                                  className="absolute left-0 right-0 mt-2 rounded-2xl bg-[#18181F] border border-white/15 shadow-2xl p-2 z-40 space-y-1.5 backdrop-blur-2xl"
                                >
                                  <div className="relative">
                                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-neutral-500" />
                                    <input
                                      type="text"
                                      placeholder={t.searchToken}
                                      value={bridgeTokenSearch}
                                      onChange={(e) => setBridgeTokenSearch(e.target.value)}
                                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#111116] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#0095FF]"
                                    />
                                  </div>
                                  <div className="max-h-48 overflow-y-auto space-y-1">
                                    {tokens
                                      .filter((t) => t.symbol.toLowerCase().includes(bridgeTokenSearch.toLowerCase()))
                                      .map((t) => (
                                        <button
                                          key={t.id}
                                          type="button"
                                          onClick={() => {
                                            setBridgeTokenId(t.id);
                                            setBridgeTokenDropdownOpen(false);
                                          }}
                                          className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                                            bridgeTokenId === t.id ? 'bg-[#0095FF]/15 text-[#0095FF] font-semibold' : 'text-neutral-300 hover:bg-white/[0.06] hover:text-white'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2">
                                            <t.icon className="w-4 h-4 shrink-0" />
                                            <span className="font-semibold text-white">{t.symbol}</span>
                                          </div>
                                          <span className="text-[11px] font-mono text-neutral-400">{language === 'id' ? 'Saldo:' : 'Bal:'} {t.balance}</span>
                                        </button>
                                      ))}
                                  </div>
                                </motion.div>
                              </>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Bridge Amount Input */}
                      <div className="relative">
                        <input
                          type="number"
                          step="any"
                          required
                          value={bridgeAmount}
                          onChange={(e) => setBridgeAmount(e.target.value)}
                          placeholder="0.0"
                          className="w-full pl-3.5 pr-14 py-2.5 rounded-xl bg-[#141419] border border-white/10 text-white font-mono text-lg font-bold focus:outline-none focus:border-[#0095FF]"
                        />
                        <button
                          type="button"
                          onClick={() => setBridgeAmount(bridgeToken.balance.toString())}
                          className="absolute right-2 top-2.5 text-[10px] font-bold text-[#0095FF] hover:underline px-1 py-0.5"
                        >
                          MAX
                        </button>
                      </div>
                    </div>

                    {/* FLIP CHAINS BUTTON */}
                    <div className="flex justify-center -my-2.5 relative z-10">
                      <button
                        type="button"
                        onClick={handleFlipBridgeChains}
                        className="w-9 h-9 rounded-full bg-[#181820] hover:bg-[#22222C] border border-white/15 shadow-md flex items-center justify-center text-neutral-300 hover:text-white transition-all cursor-pointer active:scale-90"
                        title={language === 'id' ? 'Tukar Jaringan Asal & Tujuan' : 'Swap Source & Destination Chain'}
                      >
                        <ArrowUpDown className="w-4 h-4 text-[#0095FF]" />
                      </button>
                    </div>

                    {/* YOU RECEIVE (DESTINATION CHAIN) */}
                    <div className="p-4 rounded-2xl bg-[#1C1C23] border border-white/10 relative">
                      <div className="flex justify-between items-center text-xs text-neutral-400 mb-2">
                        <span className="font-bold text-white uppercase tracking-wider text-[11px]">{t.youReceiveOn}</span>
                        <span className="text-[10px] text-emerald-400 font-mono">{language === 'id' ? 'Penyelesaian ~25 dtk' : '~25s Settlement'}</span>
                      </div>

                      {/* Destination Chain Dropdown */}
                      <div className="relative mb-3">
                        <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1">
                          {t.destinationChain}
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setBridgeDestDropdownOpen(!bridgeDestDropdownOpen);
                            setBridgeSourceDropdownOpen(false);
                            setBridgeTokenDropdownOpen(false);
                            setBridgeDestSearch('');
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-[#141419] border border-white/10 hover:border-white/20 text-white text-xs flex items-center justify-between transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <bridgeDestChain.icon className="w-4 h-4 shrink-0 text-[#0095FF]" />
                            <span className="font-semibold truncate">{bridgeDestChain.name}</span>
                          </div>
                          <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 shrink-0 transition-transform ${bridgeDestDropdownOpen ? 'rotate-180 text-[#0095FF]' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {bridgeDestDropdownOpen && (
                            <>
                              <div className="fixed inset-0 z-30" onClick={() => setBridgeDestDropdownOpen(false)} />
                              <motion.div
                                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                                className="absolute left-0 right-0 mt-2 rounded-2xl bg-[#18181F] border border-white/15 shadow-2xl p-2 z-40 space-y-1.5 backdrop-blur-2xl"
                              >
                                <div className="relative">
                                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-neutral-500" />
                                  <input
                                    type="text"
                                    placeholder={language === 'id' ? 'Cari jaringan tujuan...' : 'Search destination chain...'}
                                    value={bridgeDestSearch}
                                    onChange={(e) => setBridgeDestSearch(e.target.value)}
                                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#111116] border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#0095FF]"
                                  />
                                </div>
                                <div className="max-h-48 overflow-y-auto space-y-1">
                                  {chains
                                    .filter((c) => c.name.toLowerCase().includes(bridgeDestSearch.toLowerCase()))
                                    .map((c) => (
                                      <button
                                        key={c.id}
                                        type="button"
                                        disabled={c.id === bridgeSourceChainId}
                                        onClick={() => {
                                          setBridgeDestChainId(c.id);
                                          setBridgeDestDropdownOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                                          c.id === bridgeSourceChainId
                                            ? 'opacity-35 cursor-not-allowed text-neutral-500'
                                            : bridgeDestChainId === c.id
                                            ? 'bg-[#0095FF]/15 text-[#0095FF] font-semibold'
                                            : 'text-neutral-300 hover:bg-white/[0.06] hover:text-white'
                                        }`}
                                      >
                                        <div className="flex items-center gap-2">
                                          <c.icon className="w-4 h-4 shrink-0" />
                                          <span className="font-medium">{c.name}</span>
                                        </div>
                                        <span className="text-[10px] font-mono text-neutral-400">{c.badge}</span>
                                      </button>
                                    ))}
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="p-3 rounded-xl bg-[#141419] border border-white/[0.06] flex items-center justify-between">
                        <div>
                          <div className="text-[10px] uppercase font-mono text-neutral-500">{language === 'id' ? 'Estimasi Output' : 'Estimated Output'}</div>
                          <div className="text-xl font-bold font-mono text-white mt-0.5">
                            {bridgeAmount || '0.0'} {bridgeToken.symbol}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-emerald-400">
                            LayerZero OFT
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-[#0095FF] hover:bg-[#0080E0] text-white font-semibold text-sm shadow-md shadow-black/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {language === 'id' ? 'Menyalurkan Lintas-Jaringan via LayerZero...' : 'Relaying Cross-Chain via LayerZero...'}
                        </>
                      ) : (
                        <>
                          <Layers className="w-4 h-4" />
                          {language === 'id' ? 'Mulai Bridge Aset Sekarang' : 'Bridge Assets Now'}
                        </>
                      )}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
