import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Repeat,
  Layers,
  Search,
  Download,
  Copy,
  Check,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { WalletTransaction } from '../../types/dashboard';
import { useToast } from '../../context/ToastContext';
import { useAppSettings } from '../../context/AppSettingsContext';

export const ActivityView: React.FC = () => {
  const { showToast } = useToast();
  const { t, formatCurrency, language } = useAppSettings();
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTx, setSelectedTx] = useState<WalletTransaction | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);
  const [exportNotice, setExportNotice] = useState(false);

  const transactions: WalletTransaction[] = [
    {
      id: 'tx-1',
      type: 'received',
      status: 'confirmed',
      chain: 'Base L2',
      from: 'sarah.eth',
      to: language === 'id' ? '0x7F2...8b1e (Anda)' : '0x7F2...8b1e (You)',
      amount: '+250.00 USDC',
      tokenSymbol: 'USDC',
      valueUsd: 250.0,
      timestamp: language === 'id' ? 'Hari ini pukul 09:27' : 'Today at 09:27 AM',
      hash: '0x8f2a9381b4dc12e4',
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
      timestamp: language === 'id' ? 'Hari ini pukul 07:15' : 'Today at 07:15 AM',
      hash: '0x3c1b6942aa1990bc',
      feeUsd: 0.14,
    },
    {
      id: 'tx-3',
      type: 'sent',
      status: 'confirmed',
      chain: 'Base L2',
      from: language === 'id' ? '0x7F2...8b1e (Anda)' : '0x7F2...8b1e (You)',
      to: 'Blue Bottle Coffee · Hybit Pay',
      amount: '-$6.50 USDC',
      tokenSymbol: 'USDC',
      valueUsd: 6.5,
      timestamp: language === 'id' ? 'Kemarin pukul 16:30' : 'Yesterday at 04:30 PM',
      hash: '0x49e1bb20aa991823',
      feeUsd: 0.0,
    },
    {
      id: 'tx-4',
      type: 'bridge',
      status: 'confirmed',
      chain: 'LayerZero',
      from: 'Ethereum Mainnet',
      to: 'Base L2',
      amount: '1.25 ETH',
      tokenSymbol: 'ETH',
      valueUsd: 4275.6,
      timestamp: language === 'id' ? '04 Okt 2026' : 'Oct 04, 2026',
      hash: '0x992ce01f4882ab30',
      feeUsd: 0.28,
    },
    {
      id: 'tx-5',
      type: 'received',
      status: 'confirmed',
      chain: 'Solana',
      from: 'Raydium Liquidity Pool',
      to: language === 'id' ? '0x7F2...8b1e (Anda)' : '0x7F2...8b1e (You)',
      amount: '+12.4 SOL',
      tokenSymbol: 'SOL',
      valueUsd: 2284.08,
      timestamp: language === 'id' ? '02 Okt 2026' : 'Oct 02, 2026',
      hash: '5UxNq1pLk478zQm3',
      feeUsd: 0.002,
    },
    {
      id: 'tx-6',
      type: 'sent',
      status: 'confirmed',
      chain: 'Ethereum',
      from: language === 'id' ? '0x7F2...8b1e (Anda)' : '0x7F2...8b1e (You)',
      to: language === 'id' ? '0x328a...4801 (Brankas Aman)' : '0x328a...4801 (Cold Vault)',
      amount: '-2.0 ETH',
      tokenSymbol: 'ETH',
      valueUsd: 6841.0,
      timestamp: language === 'id' ? '29 Sep 2026' : 'Sep 29, 2026',
      hash: '0x10bfae49817e0091',
      feeUsd: 0.85,
    },
  ];

  const filteredTx = transactions.filter((tx) => {
    const matchesType = filterType === 'all' || tx.type === filterType;
    const matchesSearch =
      tx.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.hash.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleCopyHash = (hash: string) => {
    navigator.clipboard?.writeText(hash);
    setCopiedHash(true);
    showToast(t.hashCopied, hash, 'copy');
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleExport = () => {
    setExportNotice(true);
    showToast(
      language === 'id' ? 'Ekspor CSV Dimulai' : 'Export CSV Initiated',
      language === 'id' ? 'Laporan transaksi pajak tahun 2026 sedang disiapkan' : 'Tax-compliant CSV report for 2026 is being generated',
      'info'
    );
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <div className="space-y-8 pb-28">
      
      {/* Activity Ledger Header & Controls (Unboxed - No card wrapper) */}
      <section className="space-y-4 pb-4 border-b border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{t.activityTitle}</h2>
            <p className="text-xs text-neutral-400 mt-1">
              {t.activitySubtitle}
            </p>
          </div>

          <button
            onClick={handleExport}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-neutral-200 hover:text-white transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#0095FF]" />
            <span>{t.exportCsv}</span>
          </button>
        </div>

        {exportNotice && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{language === 'id' ? 'Mengunduh laporan riwayat transaksi CSV tahun 2026...' : 'Exporting tax-compliant CSV report for tax year 2026...'}</span>
          </div>
        )}

        {/* Search & Filter Tabs (Unboxed) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder={language === 'id' ? 'Cari alamat, hash, atau token...' : 'Search by address, hash or token...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#0095FF]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: t.filterAll },
              { id: 'received', label: t.filterReceived },
              { id: 'sent', label: t.filterSent },
              { id: 'swap', label: t.filterSwap },
              { id: 'bridge', label: t.filterBridge },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  filterType === tab.id
                    ? 'bg-[#0095FF] text-white font-semibold'
                    : 'bg-white/[0.04] text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Transactions List (Unboxed - clean rows with dividers) */}
      <section className="divide-y divide-white/[0.05]">
        {filteredTx.map((tx) => {
          const isReceived = tx.type === 'received';
          const isSwap = tx.type === 'swap';
          const isBridge = tx.type === 'bridge';

          return (
            <div
              key={tx.id}
              onClick={() => setSelectedTx(tx)}
              className="flex items-center justify-between py-3.5 px-2 hover:bg-white/[0.03] rounded-xl transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
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
                  <div className="text-sm font-semibold text-white capitalize group-hover:text-[#0095FF] transition-colors">
                    {isReceived && (language === 'id' ? `Diterima dari ${tx.from}` : `Received from ${tx.from}`)}
                    {isSwap && (language === 'id' ? `Tukar ${tx.amount}` : `Swapped ${tx.amount}`)}
                    {isBridge && (language === 'id' ? `Bridge ${tx.amount}` : `Bridged ${tx.amount}`)}
                    {tx.type === 'sent' && (language === 'id' ? `Terkirim ke ${tx.to}` : `Sent to ${tx.to}`)}
                  </div>
                  <div className="text-xs text-neutral-400 font-mono mt-0.5">
                    {tx.timestamp} · {tx.chain} · Hash: {tx.hash}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div
                    className={`text-sm font-mono font-bold ${
                      isReceived ? 'text-emerald-400' : 'text-neutral-200'
                    }`}
                  >
                    {tx.amount}
                  </div>
                  <div className="text-xs text-neutral-500 font-mono">
                    {language === 'id' ? 'Biaya:' : 'Fee:'} {formatCurrency(tx.feeUsd)}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
              </div>
            </div>
          );
        })}
      </section>

      {/* Transaction Detail Modal */}
      <AnimatePresence>
        {selectedTx && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTx(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative z-10 w-full max-w-md rounded-3xl bg-[#141419] border border-white/10 p-6 text-white shadow-2xl shadow-black space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-sm font-bold text-white">{t.txDetails}</span>
                <button
                  onClick={() => setSelectedTx(null)}
                  className="text-neutral-400 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  {t.close}
                </button>
              </div>

              <div className="text-center py-2">
                <div className="text-2xl font-bold font-mono text-white">{selectedTx.amount}</div>
                <div className="text-xs text-neutral-400 font-mono mt-0.5">
                  ≈ {formatCurrency(selectedTx.valueUsd)}
                </div>
                <div className="text-xs text-emerald-400 flex items-center justify-center gap-1 mt-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{language === 'id' ? 'Terverifikasi & Selesai' : 'Settled & Confirmed'}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-neutral-400">{t.chain}</span>
                  <span className="text-white">{selectedTx.chain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">{t.from}</span>
                  <span className="text-neutral-200 truncate max-w-[200px]">{selectedTx.from}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">{t.to}</span>
                  <span className="text-neutral-200 truncate max-w-[200px]">{selectedTx.to}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">{t.timestamp}</span>
                  <span className="text-neutral-200">{selectedTx.timestamp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">{t.fee}</span>
                  <span className="text-emerald-400">{formatCurrency(selectedTx.feeUsd)}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-white/[0.06]">
                  <span className="text-neutral-400">{t.hash}</span>
                  <button
                    onClick={() => handleCopyHash(selectedTx.hash)}
                    className="flex items-center gap-1 text-[#0095FF] hover:underline cursor-pointer"
                  >
                    <span>{selectedTx.hash}</span>
                    {copiedHash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <button
                onClick={() => setSelectedTx(null)}
                className="w-full py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                {t.close}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
