"use client";

import React from "react";
import { Eye, EyeOff, ShieldCheck, Database, Lock, Hash, UserX, Cpu, Server, Check } from "lucide-react";

export const ProofVisualizer: React.FC = () => {
  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
            <span>Midnight Zero-Knowledge Privacy Architecture</span>
          </h3>
          <p className="text-xs text-slate-400">Comparing On-Chain Public Ledger vs Client-Side Private Witness</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 rounded-lg bg-obsidian-800 border border-white/10 text-xs text-slate-300 font-mono">
            Compact DSL v0.17
          </span>
        </div>
      </div>

      {/* Dual Panel Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Panel 1: Public Ledger State */}
        <div className="p-5 rounded-2xl bg-obsidian-900/90 border border-cyan-500/20 relative overflow-hidden">
          <div className="flex items-center space-x-2.5 mb-4 text-cyan-400">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/15 flex items-center justify-center border border-cyan-500/30">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">What the Public Ledger Sees</h4>
              <span className="text-[11px] text-cyan-300 font-mono">On-Chain Transparent State</span>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-obsidian-950 border border-white/5 flex items-start justify-between">
              <div>
                <div className="text-slate-400 text-[11px]">Aggregated Tally Mutation</div>
                <div className="text-cyan-300 font-bold mt-0.5">yesCount++ or noCount++</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px]">Counter</span>
            </div>

            <div className="p-3 rounded-xl bg-obsidian-950 border border-white/5 flex items-start justify-between">
              <div>
                <div className="text-slate-400 text-[11px]">Cryptographic Nullifier</div>
                <div className="text-slate-300 font-bold mt-0.5 truncate max-w-[200px]">
                  0x94f28a01cd20e8b1...
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">Bytes&lt;32&gt;</span>
            </div>

            <div className="p-3 rounded-xl bg-obsidian-950 border border-white/5 flex items-start justify-between">
              <div>
                <div className="text-slate-400 text-[11px]">Halo2 Proof Verification</div>
                <div className="text-emerald-400 font-bold mt-0.5 flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Valid zk-SNARK SNARK Proof</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">Verified</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
            The blockchain verifies mathematical correctness and increments the public tally without acquiring any information about who voted or what option they selected.
          </p>
        </div>

        {/* Panel 2: Confidential Private Witness */}
        <div className="p-5 rounded-2xl bg-obsidian-900/90 border border-lunar-teal/30 relative overflow-hidden">
          <div className="flex items-center space-x-2.5 mb-4 text-lunar-teal">
            <div className="w-8 h-8 rounded-xl bg-lunar-teal/15 flex items-center justify-center border border-lunar-teal/40">
              <EyeOff className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">What Stays Hidden (Confidential)</h4>
              <span className="text-[11px] text-lunar-teal font-mono">Client-Side ZK Witness Sandbox</span>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-obsidian-950 border border-white/5 flex items-start justify-between">
              <div>
                <div className="text-slate-400 text-[11px]">Individual Voter Choice</div>
                <div className="text-lunar-teal font-bold mt-0.5">voterChoiceWitness(): Boolean</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-lunar-teal/20 text-lunar-teal text-[10px]">Private</span>
            </div>

            <div className="p-3 rounded-xl bg-obsidian-950 border border-white/5 flex items-start justify-between">
              <div>
                <div className="text-slate-400 text-[11px]">Voter Entropy Secret Salt</div>
                <div className="text-lunar-teal font-bold mt-0.5">voterSecretWitness(): Bytes&lt;32&gt;</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-lunar-teal/20 text-lunar-teal text-[10px]">Off-Chain</span>
            </div>

            <div className="p-3 rounded-xl bg-obsidian-950 border border-white/5 flex items-start justify-between">
              <div>
                <div className="text-slate-400 text-[11px]">Voter Governance Tier & Balance</div>
                <div className="text-lunar-teal font-bold mt-0.5">voterEligibilityWitness(): Uint&lt;16&gt;</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-lunar-teal/20 text-lunar-teal text-[10px]">Encrypted</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
            These parameters are strictly ingested inside your browser&apos;s local prover. They are never sent across the network, preventing any voter profiling or bribery.
          </p>
        </div>
      </div>
    </div>
  );
};
