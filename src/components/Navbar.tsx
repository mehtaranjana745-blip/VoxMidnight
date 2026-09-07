"use client";

import React, { useState } from "react";
import { Shield, Radio, Wallet, CheckCircle2, ChevronDown, Copy, ExternalLink, Zap, ShieldCheck } from "lucide-react";
import { WalletState } from "../midnight/types";

interface NavbarProps {
  wallet: WalletState;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ wallet, onConnect, onDisconnect }) => {
  const [copied, setCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const copyAddress = () => {
    if (wallet.account?.address) {
      navigator.clipboard.writeText(wallet.account.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-obsidian-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3.5">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-lunar-teal/20 border border-lunar-teal/40 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
            <Shield className="w-6 h-6 text-lunar-teal animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lunar-teal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-lunar-teal"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black tracking-tight text-white">VOX</span>
              <span className="text-xl font-bold tracking-tight text-gradient-teal">MIDNIGHT</span>
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-lunar-teal/15 text-lunar-teal border border-lunar-teal/30">
                L3 Privacy DApp
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Private On-Chain Governance Protocol</p>
          </div>
        </div>

        {/* Network Badge & Wallet Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Midnight Network Preprod Indicator */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-obsidian-800/90 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>Midnight Preprod</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </div>

          {/* Wallet State Button */}
          {wallet.isConnected && wallet.account ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2.5 px-4 py-2 rounded-xl bg-obsidian-800/90 border border-lunar-teal/40 text-slate-100 hover:border-lunar-teal transition-all shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-lunar-teal animate-ping" />
                <span className="text-xs font-mono font-medium">
                  {wallet.account.address.slice(0, 8)}...{wallet.account.address.slice(-6)}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl glass-panel-glow p-4 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-semibold text-slate-400">Lace Preprod Session</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">Connected</span>
                  </div>

                  <div className="py-3 space-y-2">
                    <div>
                      <div className="text-[11px] text-slate-400 mb-1">Voter Address</div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-obsidian-900 border border-white/5 font-mono text-[11px] text-slate-300">
                        <span className="truncate max-w-[180px]">{wallet.account.address}</span>
                        <button onClick={copyAddress} className="text-slate-400 hover:text-lunar-teal ml-2">
                          {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs py-1">
                      <span className="text-slate-400">Test Token Balance:</span>
                      <span className="font-mono font-bold text-lunar-teal">{wallet.account.balanceTDU}</span>
                    </div>

                    <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>ZK Witness Prover: Active</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onDisconnect();
                    }}
                    className="w-full mt-2 py-2 px-3 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold transition"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onConnect}
              disabled={wallet.isConnecting}
              className="flex items-center space-x-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-lunar-teal to-cyan-400 text-obsidian-950 font-bold text-xs sm:text-sm hover:opacity-95 transition-all shadow-[0_0_20px_rgba(0,242,254,0.3)] active:scale-95 disabled:opacity-50"
            >
              <Wallet className="w-4 h-4 text-obsidian-950" />
              <span>{wallet.isConnecting ? "Connecting Lace..." : "Connect Lace Wallet"}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
