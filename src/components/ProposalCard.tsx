"use client";

import React, { useState } from "react";
import { Vote, Clock, CheckCircle, XCircle, Users, Lock, ArrowUpRight, BarChart3, ChevronDown } from "lucide-react";
import { GovernanceProposal } from "../midnight/types";

interface ProposalCardProps {
  proposal: GovernanceProposal;
}

const BAR_DATA = [55, 70, 45, 90, 65, 80, 58, 95, 72, 60, 85, 78];
const TIME_FILTERS = ["12d", "7d", "30d"];
const METRIC_TABS = ["Block height", "Transactions", "Network hashrate", "Token price", "Total wallets"];

export const ProposalCard: React.FC<ProposalCardProps> = ({ proposal }) => {
  const [activeFilter, setActiveFilter] = useState("12d");
  const [activeMetric, setActiveMetric] = useState("Block height");

  const yesPercentage = proposal.totalVotes > 0 ? Math.round((proposal.yesVotes / proposal.totalVotes) * 100) : 0;
  const noPercentage = proposal.totalVotes > 0 ? 100 - yesPercentage : 0;
  const quorumProgress = Math.min(100, Math.round((proposal.totalVotes / proposal.quorumRequired) * 100));

  return (
    <div className="card-flat" style={{ borderRadius: "16px", overflow: "hidden" }}>
      {/* ── Metric selector header ── */}
      <div className="p-5 pb-4" style={{ borderBottom: "1px solid rgba(74,222,128,0.08)" }}>
        {/* Chip row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {METRIC_TABS.slice(0, 2).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveMetric(tab)}
              className={activeMetric === tab ? "chip" : "chip-outline"}
            >
              {tab}
            </button>
          ))}
          {/* Time filter */}
          <button
            className="chip ml-auto"
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            {activeFilter}
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-5">
          {METRIC_TABS.slice(2).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveMetric(tab)}
              className={activeMetric === tab ? "chip" : "chip-outline"}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Big metric number */}
        <div className="mb-4">
          <div className="metric-number">{proposal.totalVotes.toLocaleString()}</div>
          <div className="metric-delta mt-1 flex items-center gap-1">
            <span>+{yesPercentage}%</span>
            <span style={{ color: "#4b7a54", fontWeight: 400 }}> approval rate</span>
          </div>
        </div>

        {/* Bar chart */}
        <div className="bar-chart-container">
          {BAR_DATA.map((h, i) => (
            <div
              key={i}
              className={`bar-item ${i === BAR_DATA.length - 1 ? "highlighted" : ""}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      {/* ── Proposal info ── */}
      <div className="p-5 space-y-4">
        {/* Header badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge-green" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px" }}>
            #{proposal.id.toString().padStart(3, "0")}
          </span>
          <span className="badge-outline">{proposal.category}</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#fbbf24" }}>
              <Clock className="w-3.5 h-3.5" />
              {proposal.votingDeadline}
            </span>
            <span className="badge-green">
              <span className="live-dot" style={{ width: "6px", height: "6px" }} />
              {proposal.status}
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-base font-bold leading-snug" style={{ color: "#f0fdf0", letterSpacing: "-0.01em" }}>
          {proposal.title}
        </h2>

        {/* Description */}
        <p className="text-sm leading-relaxed" style={{ color: "#4b7a54" }}>
          {proposal.description}
        </p>

        {/* Divider */}
        <hr className="divider" />

        {/* Participation */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5" style={{ color: "#4b7a54" }}>
            <Users className="w-3.5 h-3.5" style={{ color: "#4ade80" }} />
            <span>Anonymous Voter Participation</span>
          </div>
          <div style={{ color: "#86efac", fontFamily: "'JetBrains Mono', monospace" }}>
            <span className="font-bold" style={{ color: "#f0fdf0" }}>{proposal.totalVotes}</span>
            <span style={{ color: "#4b7a54" }}> / Quorum {proposal.quorumRequired} ({quorumProgress}%)</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${quorumProgress}%` }} />
        </div>

        {/* Vote tally */}
        <div className="grid grid-cols-2 gap-3">
          <div
            className="p-3.5 rounded-xl flex items-center justify-between"
            style={{ background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.15)" }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(74,222,128,0.12)" }}
              >
                <CheckCircle className="w-4 h-4" style={{ color: "#4ade80" }} />
              </div>
              <div>
                <div className="text-[11px]" style={{ color: "#4b7a54" }}>Approve</div>
                <div className="text-sm font-bold font-mono" style={{ color: "#4ade80" }}>
                  {proposal.yesVotes}
                </div>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold" style={{ color: "#4ade80" }}>
              {yesPercentage}%
            </span>
          </div>

          <div
            className="p-3.5 rounded-xl flex items-center justify-between"
            style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(239,68,68,0.12)" }}
              >
                <XCircle className="w-4 h-4" style={{ color: "#f87171" }} />
              </div>
              <div>
                <div className="text-[11px]" style={{ color: "#4b7a54" }}>Reject</div>
                <div className="text-sm font-bold font-mono" style={{ color: "#f87171" }}>
                  {proposal.noVotes}
                </div>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold" style={{ color: "#f87171" }}>
              {noPercentage}%
            </span>
          </div>
        </div>

        {/* Contract footer */}
        <div className="flex flex-wrap items-center justify-between pt-1 text-[11px]" style={{ color: "#4b7a54", fontFamily: "'JetBrains Mono', monospace" }}>
          <div className="flex items-center gap-1.5">
            <Lock className="w-3 h-3" />
            <span>Contract: {proposal.contractAddress.slice(0, 16)}...{proposal.contractAddress.slice(-8)}</span>
          </div>
          <a
            href={`https://preprod.midnight.network/contract/${proposal.contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 transition-colors"
            style={{ color: "#4ade80" }}
          >
            <span>View on Explorer</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
