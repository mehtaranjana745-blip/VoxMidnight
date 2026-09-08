"use client";

import React from "react";
import { Vote, Clock, CheckCircle, XCircle, Users, FileText, ArrowUpRight, ShieldCheck, Lock } from "lucide-react";
import { GovernanceProposal } from "../midnight/types";

interface ProposalCardProps {
  proposal: GovernanceProposal;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({ proposal }) => {
  const yesPercentage = proposal.totalVotes > 0 ? Math.round((proposal.yesVotes / proposal.totalVotes) * 100) : 0;
  const noPercentage = proposal.totalVotes > 0 ? 100 - yesPercentage : 0;
  const quorumProgress = Math.min(100, Math.round((proposal.totalVotes / proposal.quorumRequired) * 100));

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden shadow-2xl">
      {/* Background ambient gradient */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-lunar-teal/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center space-x-2.5">
          <span className="px-3 py-1 rounded-lg bg-obsidian-800 border border-lunar-teal/30 text-lunar-teal text-xs font-mono font-bold">
            Proposal #{proposal.id.toString().padStart(3, "0")}
          </span>
          <span className="px-3 py-1 rounded-lg bg-obsidian-800/80 border border-white/10 text-slate-300 text-xs font-medium">
            {proposal.category}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-xs text-amber-400 font-medium px-3 py-1 rounded-lg bg-amber-400/10 border border-amber-400/20">
            <Clock className="w-3.5 h-3.5" />
            <span>Deadline: {proposal.votingDeadline}</span>
          </div>
          <span className="px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{proposal.status}</span>
          </span>
        </div>
      </div>

      {/* Title & Description */}
      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3 hover:text-lunar-teal transition-colors">
        {proposal.title}
      </h2>
      <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
        {proposal.description}
      </p>

      {/* Public Tally & Zero-Knowledge Stats */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center space-x-2 text-slate-300">
            <Users className="w-4 h-4 text-lunar-teal" />
            <span>Anonymous Voter Participation</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white font-mono font-bold">{proposal.totalVotes} ballots cast</span>
            <span className="text-slate-500 font-normal">/ Quorum: {proposal.quorumRequired} ({quorumProgress}%)</span>
          </div>
        </div>

        {/* Bi-Color Tally Bar */}
        <div className="h-4 w-full rounded-full bg-obsidian-900 border border-white/10 p-0.5 flex overflow-hidden">
          <div
            style={{ width: `${yesPercentage}%` }}
            className="h-full bg-gradient-to-r from-emerald-500 to-lunar-teal rounded-l-full transition-all duration-700 ease-out flex items-center justify-end pr-1 text-[9px] font-mono font-black text-obsidian-950"
          >
            {yesPercentage > 15 && `${yesPercentage}%`}
          </div>
          <div
            style={{ width: `${noPercentage}%` }}
            className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-r-full transition-all duration-700 ease-out flex items-center justify-start pl-1 text-[9px] font-mono font-black text-white"
          >
            {noPercentage > 15 && `${noPercentage}%`}
          </div>
        </div>

        {/* Detailed Count Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          {/* YES Box */}
          <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-[11px] font-medium text-slate-400">Approve (YES)</div>
                <div className="text-base font-mono font-bold text-emerald-400">{proposal.yesVotes} Votes</div>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold text-emerald-300">{yesPercentage}%</span>
          </div>

          {/* NO Box */}
          <div className="p-3.5 rounded-2xl bg-rose-500/5 border border-rose-500/20 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 flex items-center justify-center">
                <XCircle className="w-4 h-4 text-rose-400" />
              </div>
              <div>
                <div className="text-[11px] font-medium text-slate-400">Reject (NO)</div>
                <div className="text-base font-mono font-bold text-rose-400">{proposal.noVotes} Votes</div>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold text-rose-300">{noPercentage}%</span>
          </div>

          {/* Privacy Guarantee Box */}
          <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-obsidian-800/80 border border-white/10 flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-lunar-teal/10 flex items-center justify-center">
              <Lock className="w-4 h-4 text-lunar-teal" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-slate-400">Privacy Shield</div>
              <div className="text-xs font-semibold text-slate-200">Zero-Knowledge Tally</div>
            </div>
          </div>
        </div>

        {/* Compact Contract Address Footer */}
        <div className="flex flex-wrap items-center justify-between pt-3 text-[11px] text-slate-400 font-mono">
          <div className="flex items-center space-x-1.5">
            <span>Contract Address:</span>
            <span className="text-slate-300">{proposal.contractAddress.slice(0, 18)}...{proposal.contractAddress.slice(-8)}</span>
          </div>
          <div className="flex items-center space-x-1 text-lunar-teal hover:underline cursor-pointer">
            <span>View Compact Contract</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};
