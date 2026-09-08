"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, XCircle, ShieldCheck, KeyRound, Lock, Sparkles, AlertCircle, Cpu, Vote, RefreshCw } from "lucide-react";
import { WalletState } from "../midnight/types";

interface VotingBoothProps {
  wallet: WalletState;
  onCastVote: (choice: boolean, salt: Uint8Array) => Promise<void>;
  isVoting: boolean;
  onConnectWallet: () => void;
}

export const VotingBooth: React.FC<VotingBoothProps> = ({
  wallet,
  onCastVote,
  isVoting,
  onConnectWallet,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<boolean | null>(null);
  const [secretEntropyHex, setSecretEntropyHex] = useState<string>("");
  const [secretBytes, setSecretBytes] = useState<Uint8Array>(new Uint8Array(32));
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Generate randomized entropy salt on mount or reset
  const generateNewEntropy = () => {
    const bytes = new Uint8Array(32);
    if (typeof window !== "undefined" && window.crypto) {
      window.crypto.getRandomValues(bytes);
    } else {
      for (let i = 0; i < 32; i++) bytes[i] = Math.floor(Math.random() * 256);
    }
    setSecretBytes(bytes);
    const hex = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    setSecretEntropyHex(hex);
  };

  useEffect(() => {
    generateNewEntropy();
  }, []);

  const handleVoteSubmission = async () => {
    if (selectedChoice === null) {
      setErrorMsg("Please select your governance decision (Approve or Reject).");
      return;
    }
    if (!wallet.isConnected) {
      onConnectWallet();
      return;
    }

    setErrorMsg(null);
    try {
      await onCastVote(selectedChoice, secretBytes);
      // Reset after vote
      generateNewEntropy();
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to execute zero-knowledge vote transaction.");
    }
  };

  return (
    <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-lunar-teal/30 relative overflow-hidden shadow-2xl">
      {/* Ambient background glow */}
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-lunar-teal/15 border border-lunar-teal/40 flex items-center justify-center">
            <Vote className="w-5 h-5 text-lunar-teal" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
              <span>Confidential Voting Booth</span>
              <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider font-mono rounded bg-lunar-teal/20 text-lunar-teal border border-lunar-teal/40">
                ZK Sandbox
              </span>
            </h3>
            <p className="text-xs text-slate-400">Zero-Knowledge Witness Evaluation</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
          <Lock className="w-3.5 h-3.5 text-lunar-teal" />
          <span>Client-Side Proving</span>
        </div>
      </div>

      {/* Choice Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Approve Option */}
        <button
          type="button"
          onClick={() => setSelectedChoice(true)}
          className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden group ${
            selectedChoice === true
              ? "bg-emerald-500/15 border-emerald-400 glow-teal"
              : "bg-obsidian-800/80 border-white/10 hover:border-emerald-500/40 hover:bg-obsidian-800"
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2.5">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition ${
                  selectedChoice === true ? "bg-emerald-500 text-obsidian-950" : "bg-emerald-500/20 text-emerald-400"
                }`}
              >
                <CheckCircle2 className="w-4 h-4 font-bold" />
              </div>
              <span className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                APPROVE (YES)
              </span>
            </div>
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                selectedChoice === true
                  ? "border-emerald-400 bg-emerald-400"
                  : "border-slate-600 group-hover:border-slate-400"
              }`}
            >
              {selectedChoice === true && <div className="w-2 h-2 rounded-full bg-obsidian-950" />}
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-normal mb-3">
            Vote in favor of MIP-042 threshold sharded indexing architecture upgrade.
          </p>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="text-emerald-400 font-semibold">Private Witness: true</span>
            <span>State: yesCount +1</span>
          </div>
        </button>

        {/* Reject Option */}
        <button
          type="button"
          onClick={() => setSelectedChoice(false)}
          className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden group ${
            selectedChoice === false
              ? "bg-rose-500/15 border-rose-400 glow-rose"
              : "bg-obsidian-800/80 border-white/10 hover:border-rose-500/40 hover:bg-obsidian-800"
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2.5">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition ${
                  selectedChoice === false ? "bg-rose-500 text-white" : "bg-rose-500/20 text-rose-400"
                }`}
              >
                <XCircle className="w-4 h-4 font-bold" />
              </div>
              <span className="text-base font-bold text-white group-hover:text-rose-300 transition">
                REJECT (NO)
              </span>
            </div>
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                selectedChoice === false
                  ? "border-rose-400 bg-rose-400"
                  : "border-slate-600 group-hover:border-slate-400"
              }`}
            >
              {selectedChoice === false && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-normal mb-3">
            Vote against proposal and request further technical review on threshold parameters.
          </p>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="text-rose-400 font-semibold">Private Witness: false</span>
            <span>State: noCount +1</span>
          </div>
        </button>
      </div>

      {/* Confidential Entropy Witness Box */}
      <div className="mb-6 p-4 rounded-2xl bg-obsidian-900/90 border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <KeyRound className="w-3.5 h-3.5 text-lunar-teal" />
            <span className="text-xs font-bold text-slate-300">Confidential Voter Entropy Salt (Local Witness)</span>
          </div>
          <button
            onClick={generateNewEntropy}
            className="flex items-center space-x-1 text-[11px] text-lunar-teal hover:text-cyan-300 transition"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Re-roll Salt</span>
          </button>
        </div>

        <div className="p-2 rounded-lg bg-obsidian-950 font-mono text-[11px] text-slate-400 break-all select-all border border-white/5 flex items-center justify-between">
          <span>0x{secretEntropyHex.slice(0, 32)}...{secretEntropyHex.slice(-16)}</span>
          <span className="px-2 py-0.5 rounded bg-lunar-teal/10 text-lunar-teal text-[10px] font-semibold">256-bit</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-2 font-light">
          This entropy salt is used to derive your anonymous single-use nullifier. It is NEVER broadcasted to the public ledger.
        </p>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center space-x-2.5 text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Cast Ballot Trigger */}
      <button
        type="button"
        onClick={handleVoteSubmission}
        disabled={isVoting}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-lunar-teal via-cyan-400 to-lunar-teal text-obsidian-950 font-black text-sm tracking-wide uppercase hover:opacity-95 transition-all shadow-[0_0_25px_rgba(0,242,254,0.35)] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center space-x-2.5"
      >
        <Cpu className="w-4 h-4" />
        <span>
          {isVoting
            ? "Synthesizing Zero-Knowledge Proof..."
            : !wallet.isConnected
            ? "Connect Lace Wallet to Cast Vote"
            : selectedChoice === null
            ? "Select Choice to Cast Encrypted Ballot"
            : "Cast Confidential Ballot (ZK Witness)"}
        </span>
      </button>
    </div>
  );
};
