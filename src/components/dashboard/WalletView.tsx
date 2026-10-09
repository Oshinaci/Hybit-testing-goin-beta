import React, { useState } from 'react';
import {
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Trash2,
  Lock,
  Smartphone,
  Mail,
  ArrowUpRight,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useAppSettings } from '../../context/AppSettingsContext';

export const WalletView: React.FC = () => {
  const { showToast } = useToast();
  const { formatCurrency, language } = useAppSettings();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // 1 Wallet Saja Tanpa Vault - Authenticated via Privy
  const mockEmail = 'kaitosogen@gmail.com';
  const singleWallet = {
    id: 'privy-wallet-main',
    name: 'Privy Embedded Wallet',
    email: mockEmail,
    address: '0x7F2a45B083C29E41c7F3bDa208B49a37e89e8b1e',
    balanceUsd: 42918.24,
    status: 'Active & Verified',
    authProvider: 'Privy Web3 Auth',
    type: '1 Email : 1 Wallet Non-Custodial MPC',
  };

  const [connectedDApps, setConnectedDApps] = useState([
    { id: 'dapp-1', name: 'Uniswap v3', url: 'app.uniswap.org', chain: 'Ethereum', icon: '🦄' },
    { id: 'dapp-2', name: 'Aerodrome Finance', url: 'aerodrome.finance', chain: 'Base', icon: '✈️' },
    { id: 'dapp-3', name: 'Raydium DEX', url: 'raydium.io', chain: 'Solana', icon: '⚡' },
  ]);

  const handleCopy = (address: string, id: string) => {
    navigator.clipboard?.writeText(address);
    setCopiedId(id);
    showToast('Wallet Address Copied', address, 'copy');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRevoke = (id: string, name: string) => {
    setConnectedDApps(connectedDApps.filter((d) => d.id !== id));
    showToast('Session Revoked', `Disconnected and revoked permissions for ${name}`, 'warning');
  };

  return (
    <div className="space-y-8 pb-28">
      
      {/* Header (Unboxed) */}
      <div className="pb-4 border-b border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Your Embedded Wallet</h2>
              <span className="text-xs font-mono text-neutral-400">
                · Privy Auth
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Single self-custody wallet secured via Privy MPC embedded authentication. 1 Email · 1 Wallet.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Privy Session Active</span>
          </div>
        </div>
      </div>

      {/* 1 Single Wallet Card */}
      <div className="rounded-3xl bg-[#141419] border border-white/[0.08] p-6 sm:p-8 shadow-2xl shadow-black/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#0095FF] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              H
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{singleWallet.name}</h3>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {singleWallet.status}
                </span>
              </div>
              <div className="text-xs text-neutral-400 flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5 text-[#0095FF]" />
                <span className="font-mono text-neutral-300">{singleWallet.email}</span>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-400">{singleWallet.type}</span>
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-xs text-neutral-400 font-medium">{language === 'id' ? 'Total Saldo Dompet' : 'Total Balance'}</div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono mt-0.5">
              {formatCurrency(singleWallet.balanceUsd)}
            </div>
          </div>
        </div>

        {/* Address & Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <span className="text-[10px] font-mono text-neutral-500 uppercase block">Wallet Public Address (EVM & Multi-Chain)</span>
              <span className="font-mono text-xs sm:text-sm text-white font-medium truncate block">
                {singleWallet.address}
              </span>
            </div>
            <button
              onClick={() => handleCopy(singleWallet.address, singleWallet.id)}
              className="px-3 py-2 rounded-xl bg-[#0095FF] hover:bg-[#0080E0] text-white text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer shadow-sm"
            >
              {copiedId === singleWallet.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === singleWallet.id ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase block">Network Status</span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                MPC Sync 100%
              </span>
            </div>
            <a
              href={`https://etherscan.io/address/${singleWallet.address}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-neutral-300 transition-colors"
              title="View on Explorer"
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* MPC Shards & Security Status */}
      <div className="rounded-3xl bg-[#141419] border border-white/[0.08] p-6 sm:p-8 shadow-xl shadow-black/30">
        <div className="flex items-center gap-2.5 mb-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white">Privy MPC Cryptography Health</h3>
        </div>

        <p className="text-xs text-neutral-400 mb-6 max-w-xl">
          Your wallet key is split into 3 independent mathematical shares. Any 2 shares authorize transactions seamlessly without seed phrases.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Local Device Enclave', desc: 'Passkey / Biometrics on device', status: 'Active & Verified', icon: Smartphone, color: 'text-emerald-400' },
            { title: 'Privy Cloud Enclave', desc: 'Authenticated by ' + mockEmail, status: 'Synced & Encrypted', icon: Lock, color: 'text-[#0095FF]' },
            { title: 'Guardian Recovery Share', desc: 'End-to-End Encrypted Cloud Key', status: 'Ready for Recovery', icon: ShieldCheck, color: 'text-indigo-400' },
          ].map((shard, i) => {
            const Icon = shard.icon;
            return (
              <div
                key={i}
                className="p-4 rounded-2xl bg-[#101015] border border-white/[0.06] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`w-5 h-5 ${shard.color}`} />
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {shard.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{shard.title}</h4>
                  <p className="text-xs text-neutral-400">{shard.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Connected DApps & Session Keys */}
      <div className="rounded-3xl bg-[#141419] border border-white/[0.08] p-6 sm:p-8 shadow-xl shadow-black/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-white">Connected DApps & Authorized Sessions</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Privy session keys authorized to interact with Web3 protocols. Revoke access instantly.
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-400 self-start sm:self-auto">
            {connectedDApps.length} Active Sessions
          </span>
        </div>

        <div className="space-y-3">
          {connectedDApps.map((dapp) => (
            <div
              key={dapp.id}
              className="p-4 rounded-2xl bg-[#101015] border border-white/[0.06] flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{dapp.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{dapp.name}</h4>
                    <span className="text-xs font-mono text-neutral-400">
                      · {dapp.chain}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">{dapp.url}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://${dapp.url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-neutral-300 transition-colors"
                  title="Visit App"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => handleRevoke(dapp.id, dapp.name)}
                  className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                  title="Revoke Session"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
