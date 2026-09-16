"use client";

import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { ProposalCard } from "../components/ProposalCard";
import { VotingBooth } from "../components/VotingBooth";
import { ZKProofModal } from "../components/ZKProofModal";
import { ProofVisualizer } from "../components/ProofVisualizer";
import { ActivityLedger } from "../components/ActivityLedger";
import { CompactCircuitViewer } from "../components/CompactCircuitViewer";
import { MidnightLaceConnector } from "../midnight/laceConnector";
import { VoxMidnightClient } from "../midnight/contractClient";
import { WalletState, ZKProofProgress, GovernanceProposal, VoteActivity } from "../midnight/types";
import { Shield, BarChart3, Layers, RefreshCw, Search } from "lucide-react";

const STATS = [
  { label: "Total Ballots Cast", value: "165", delta: "+12 today" },
  { label: "Quorum Progress", value: "66%", delta: "165 / 250" },
  { label: "Approval Rate", value: "86%", delta: "142 yes / 23 no" },
  { label: "Active Proposals", value: "1", delta: "Preprod" },
];

export default function Home() {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    isConnecting: false,
    account: null,
    network: "preprod",
    error: null,
  });

  const client = VoxMidnightClient.getInstance();
  const [proposal, setProposal] = useState<GovernanceProposal>(client.getProposal());
  const [activities, setActivities] = useState<VoteActivity[]>(client.getActivities());
  const [isVoting, setIsVoting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proofProgress, setProofProgress] = useState<ZKProofProgress | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleConnectWallet = async () => {
    setWallet((prev) => ({ ...prev, isConnecting: true }));
    const connector = MidnightLaceConnector.getInstance();
    const state = await connector.connect();
    setWallet(state);
  };

  const handleDisconnectWallet = () => {
    const connector = MidnightLaceConnector.getInstance();
    const state = connector.disconnect();
    setWallet(state);
  };

  const handleCastVote = async (choice: boolean, salt: Uint8Array) => {
    setIsVoting(true);
    setIsModalOpen(true);
    try {
      await client.castConfidentialVote(choice, salt, (progress) => { setProofProgress(progress); });
      setProposal(client.getProposal());
      setActivities(client.getActivities());
    } catch (err: any) {
      alert(`Vote Failed: ${err?.message || "Error submitting ZK ballot"}`);
      setIsModalOpen(false);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", paddingBottom: "48px" }}>
      {/* Nav */}
      <Navbar wallet={wallet} onConnect={handleConnectWallet} onDisconnect={handleDisconnectWallet} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-7">
          <div>
            <h1
              className="section-header flex items-center gap-2"
              style={{ color: "#f0fdf0" }}
            >
              VoxMidnight governance explorer
            </h1>
            <p className="text-sm mt-1" style={{ color: "#4b7a54" }}>
              Private on-chain balloting powered by Zero-Knowledge proofs on Midnight Preprod
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="btn-ghost flex items-center gap-1.5 text-sm">
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", color: "#4ade80" }}
            >
              <span className="live-dot" style={{ width: "6px", height: "6px" }} />
              <span>Preprod</span>
            </div>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="text-[11px] font-medium mb-1" style={{ color: "#4b7a54" }}>
                {stat.label}
              </div>
              <div className="text-xl font-bold font-mono mb-0.5" style={{ color: "#f0fdf0" }}>
                {stat.value}
              </div>
              <div className="text-[11px]" style={{ color: "#4ade80" }}>{stat.delta}</div>
            </div>
          ))}
        </div>

        {/* ── Search bar ── */}
        <div className="relative mb-6">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "#4b7a54" }}
          />
          <input
            type="text"
            placeholder="Search address, tx hash, block, proposal ID..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] px-1.5 py-0.5 rounded font-mono"
            style={{ background: "rgba(74,222,128,0.08)", color: "#4b7a54", border: "1px solid rgba(74,222,128,0.12)" }}
          >
            /
          </span>
        </div>

        {/* ── Main Two-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
          <div className="lg:col-span-7">
            <ProposalCard proposal={proposal} />
          </div>
          <div className="lg:col-span-5">
            <VotingBooth
              wallet={wallet}
              onCastVote={handleCastVote}
              isVoting={isVoting}
              onConnectWallet={handleConnectWallet}
            />
          </div>
        </div>

        {/* ── Proof Visualizer ── */}
        <div className="mb-5">
          <ProofVisualizer />
        </div>

        {/* ── Activity Ledger (Transactions table) ── */}
        <div className="mb-5">
          <ActivityLedger activities={activities} />
        </div>

        {/* ── Compact Circuit Viewer (Blocks-style panel) ── */}
        <div className="mb-5">
          <CompactCircuitViewer />
        </div>
      </div>

      {/* ZK Proof Modal */}
      <ZKProofModal isOpen={isModalOpen} progress={proofProgress} onClose={() => setIsModalOpen(false)} />

      {/* Footer */}
      <footer
        className="mt-12 py-6"
        style={{ borderTop: "1px solid rgba(74,222,128,0.08)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5" style={{ color: "#4ade80" }} />
            <span className="text-xs font-semibold" style={{ color: "#86efac" }}>VoxMidnight Protocol</span>
            <span className="text-xs" style={{ color: "#4b7a54" }}>— Level-3 Compliant Midnight dApp</span>
          </div>
          <div className="text-xs font-mono" style={{ color: "#2d5c36" }}>
            Compact DSL • Halo2 Prover • Lace Preprod Connector
          </div>
        </div>
      </footer>
    </main>
  );
}
