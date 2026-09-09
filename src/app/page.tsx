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
import { Shield, Sparkles, Lock, Cpu, Globe, ArrowRight } from "lucide-react";

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

  // ZK Modal state
  const [isVoting, setIsVoting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proofProgress, setProofProgress] = useState<ZKProofProgress | null>(null);

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
      await client.castConfidentialVote(choice, salt, (progress) => {
        setProofProgress(progress);
      });

      // Refresh proposal and activity state
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
    <main className="min-h-screen pb-20">
      {/* Top Navigation */}
      <Navbar
        wallet={wallet}
        onConnect={handleConnectWallet}
        onDisconnect={handleDisconnectWallet}
      />

      {/* Hero Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-lunar-teal/10 border border-lunar-teal/30 text-lunar-teal text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Midnight Network Preprod • Zero-Knowledge Governance</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Confidential Balloting. <br />
            <span className="text-gradient-teal">Verifiable On-Chain Consensus.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            Cast anonymous governance ballots using private Zero-Knowledge witnesses. Your choice and identity remain cryptographically isolated in your browser while updating the public tally.
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Active Proposal */}
          <div className="lg:col-span-7 space-y-8">
            <ProposalCard proposal={proposal} />
          </div>

          {/* Right Column: Confidential Voting Booth */}
          <div className="lg:col-span-5 space-y-8">
            <VotingBooth
              wallet={wallet}
              onCastVote={handleCastVote}
              isVoting={isVoting}
              onConnectWallet={handleConnectWallet}
            />
          </div>
        </div>

        {/* Full-Width Section 1: Privacy Architecture Inspector */}
        <ProofVisualizer />

        {/* Full-Width Section 2: Live Anonymous Governance Ledger */}
        <ActivityLedger activities={activities} />

        {/* Full-Width Section 3: Compact Smart Contract Viewer */}
        <CompactCircuitViewer />
      </div>

      {/* ZK Proof Progress Stepper Modal */}
      <ZKProofModal
        isOpen={isModalOpen}
        progress={proofProgress}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-20 border-t border-white/10 pt-8 pb-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-lunar-teal" />
            <span className="font-bold text-slate-400">VoxMidnight Protocol</span>
            <span>— Level-3 Compliant Midnight dApp</span>
          </div>
          <div className="font-mono text-slate-500">
            Powered by Compact DSL • Halo2 Prover • Lace Preprod Connector
          </div>
        </div>
      </footer>
    </main>
  );
}
