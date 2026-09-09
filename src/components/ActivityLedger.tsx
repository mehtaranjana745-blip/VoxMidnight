"use client";

import React from "react";
import { History, ShieldCheck, ExternalLink, ArrowUpRight, Blocks, Hash } from "lucide-react";
import { VoteActivity } from "../midnight/types";

interface ActivityLedgerProps {
  activities: VoteActivity[];
}

export const ActivityLedger: React.FC<ActivityLedgerProps> = ({ activities }) => {
  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-lunar-teal/15 border border-lunar-teal/30 flex items-center justify-center">
            <History className="w-5 h-5 text-lunar-teal" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
              <span>Live Anonymous Governance Ledger</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
            </h3>
            <p className="text-xs text-slate-400">Preprod Consensus Activity & Verifiable Proof Log</p>
          </div>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Total Recorded: <span className="text-white font-bold">{activities.length} Events</span>
        </div>
      </div>

      {/* Activity Table / List */}
      <div className="space-y-3">
        {activities.map((act) => (
          <div
            key={act.id}
            className="p-4 rounded-2xl bg-obsidian-900/90 border border-white/5 hover:border-lunar-teal/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3"
          >
            {/* Tx & Nullifier Info */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-obsidian-800 text-[10px] font-mono font-bold text-slate-300 border border-white/10">
                  Block #{act.blockHeight}
                </span>
                <span className="font-mono text-xs font-bold text-slate-200">
                  {act.txHash.slice(0, 14)}...{act.txHash.slice(-8)}
                </span>
                <span className="text-slate-500 text-xs">• {act.timestamp}</span>
              </div>

              <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
                <span className="text-slate-500">Nullifier:</span>
                <span className="text-lunar-teal font-medium">{act.nullifierCommitment}</span>
              </div>
            </div>

            {/* Proof Status Badge */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>ZK-Proof Verified</span>
              </div>

              <button
                type="button"
                onClick={() => alert(`Preprod Explorer Transaction: ${act.txHash}`)}
                className="p-2 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 text-slate-400 hover:text-white transition border border-white/5"
                title="View on Preprod Indexer"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
