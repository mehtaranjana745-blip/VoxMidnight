"use client";

import React, { useState } from "react";
import { Shield, Radio, Wallet, CheckCircle2, ChevronDown, Copy, Moon, Bell, ExternalLink, ShieldCheck } from "lucide-react";
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

  const navLinks = [
    { label: "Overview", href: "#overview", active: true },
    { label: "Proposals", href: "#proposals" },
    { label: "Ballots", href: "#ballots" },
    { label: "ZK Proofs", href: "#proofs" },
  ];

  return (
    <header className="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)" }}>
              <Shield className="w-4 h-4" style={{ color: "#4ade80" }} />
            </div>
            <span className="font-bold text-base tracking-tight" style={{ color: "#f0fdf0" }}>
              Vox<span style={{ color: "#4ade80" }}>Midnight</span>
            </span>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 rounded-md text-sm font-medium transition-all"
                style={{
                  color: link.active ? "#4ade80" : "#4b7a54",
                  background: link.active ? "rgba(74,222,128,0.08)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!link.active) (e.currentTarget as HTMLElement).style.color = "#86efac";
                }}
                onMouseLeave={(e) => {
                  if (!link.active) (e.currentTarget as HTMLElement).style.color = "#4b7a54";
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Network badge */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer"
            style={{ border: "1px solid rgba(255,255,255,0.08)", color: "#86efac", background: "transparent" }}
          >
            <span className="live-dot" />
            <span>Preprod</span>
            <ChevronDown className="w-3 h-3 ml-0.5" style={{ color: "#4b7a54" }} />
          </div>

          {/* Dark mode icon */}
          <button className="btn-ghost p-2 rounded-md" style={{ padding: "8px" }}>
            <Moon className="w-4 h-4" style={{ color: "#4b7a54" }} />
          </button>

          {/* Notification icon */}
          <button className="btn-ghost p-2 rounded-md relative" style={{ padding: "8px" }}>
            <Bell className="w-4 h-4" style={{ color: "#4b7a54" }} />
            <span
              className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
              style={{ background: "#4ade80" }}
            />
          </button>

          {/* Wallet */}
          {wallet.isConnected && wallet.account ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-sm font-semibold rounded-lg px-4 py-2"
                style={{
                  background: "rgba(74,222,128,0.1)",
                  border: "1px solid rgba(74,222,128,0.3)",
                  color: "#4ade80",
                }}
              >
                <span className="live-dot" style={{ width: "6px", height: "6px" }} />
                <span className="font-mono text-xs">
                  {wallet.account.address.slice(0, 8)}...{wallet.account.address.slice(-6)}
                </span>
                <ChevronDown className="w-3.5 h-3.5" style={{ color: "#4b7a54" }} />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-72 rounded-xl p-4 z-50 shadow-2xl"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid rgba(74,222,128,0.25)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
                  }}
                >
                  <div className="flex items-center justify-between pb-3" style={{ borderBottom: "1px solid rgba(74,222,128,0.1)" }}>
                    <span className="text-xs font-semibold" style={{ color: "#4b7a54" }}>Lace Preprod Session</span>
                    <span className="badge-green text-[10px]">Connected</span>
                  </div>

                  <div className="py-3 space-y-3">
                    <div>
                      <div className="text-[11px] mb-1" style={{ color: "#4b7a54" }}>Voter Address</div>
                      <div
                        className="flex items-center justify-between p-2 rounded-lg font-mono text-[11px]"
                        style={{ background: "var(--bg-input)", border: "1px solid rgba(74,222,128,0.1)", color: "#86efac" }}
                      >
                        <span className="truncate max-w-[180px]">{wallet.account.address}</span>
                        <button onClick={copyAddress} className="ml-2" style={{ color: "#4b7a54" }}>
                          {copied ? (
                            <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#4ade80" }} />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span style={{ color: "#4b7a54" }}>Test Token Balance:</span>
                      <span className="font-mono font-bold" style={{ color: "#4ade80" }}>
                        {wallet.account.balanceTDU}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "#4b7a54" }}>
                      <ShieldCheck className="w-3.5 h-3.5" style={{ color: "#4ade80" }} />
                      <span>ZK Witness Prover: Active</span>
                    </div>
                  </div>

                  <button
                    onClick={() => { setDropdownOpen(false); onDisconnect(); }}
                    className="w-full py-2 px-3 rounded-lg text-xs font-semibold transition-all"
                    style={{
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.2)",
                      color: "#f87171",
                    }}
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
              className="btn-primary"
              style={{ opacity: wallet.isConnecting ? 0.6 : 1 }}
            >
              <Wallet className="w-4 h-4" />
              <span>{wallet.isConnecting ? "Connecting..." : "Connect wallet"}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
