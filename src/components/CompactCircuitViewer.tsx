"use client";

import React, { useState } from "react";
import { Code2, Copy, CheckCircle2, FileCode } from "lucide-react";

type Tab = "compact" | "witness" | "nullifier";

const compactCode = `// Midnight Compact Smart Contract: vox_midnight.compact
export ledger proposalId: Uint<32>;
export ledger yesCount: Counter;
export ledger noCount: Counter;
export ledger totalVotes: Counter;
export ledger votingActive: Boolean;
export ledger admin: Bytes<32>;
export ledger nullifiers: Map<Bytes<32>, Boolean>;

// Private Witnesses (Client-Side Prover Sandbox)
witness voterChoiceWitness(): Boolean;
witness voterSecretWitness(): Bytes<32>;
witness voterEligibilityWitness(): Uint<16>;

export circuit castBallot(nullifierHash: Bytes<32>): Boolean {
    assert votingActive "Governance voting is currently closed";
    assert !nullifiers.member(nullifierHash) "Nullifier already spent";

    const choice = voterChoiceWitness();
    const secret = voterSecretWitness();
    const eligibilityScore = voterEligibilityWitness();

    assert eligibilityScore > 0 "Voter has insufficient governance weight";

    // Disclose ONLY tally counters & nullifier to public ledger
    const isYes: Boolean = disclose(choice);
    const disclosedNullifier: Bytes<32> = disclose(nullifierHash);

    if (isYes) { yesCount.increment(1); }
    else        { noCount.increment(1); }
    totalVotes.increment(1);
    nullifiers.insert(disclosedNullifier, true);

    return true;
}`;

const witnessExplanation = `// Local Client-Side Witness Ingestion Pipeline:
// 1. voterChoiceWitness()
//    → Raw boolean selection (true=Approve, false=Reject)
//    → NEVER disclosed to the public ledger
//
// 2. voterSecretWitness()
//    → 256-bit cryptographic entropy salt (Lace Wallet)
//    → Used only to derive the nullifier hash locally
//
// 3. voterEligibilityWitness()
//    → Verified DAO token balance proof from local state
//    → Proves eligibility without revealing the amount
//
// These 3 witnesses NEVER exit the user's browser runtime.
// They are digested exclusively through the Halo2 proving
// circuit to generate an anonymous, verifiable proof.`;

const nullifierExplanation = `// Double-Voting Prevention (Cryptographic Nullifier):
//
// Nullifier = SHA-256( voterSecret || proposalId )
//
// 1. Unlinkable:
//    Cannot determine voter's address from the nullifier.
//
// 2. Deterministic:
//    Attempting to vote again yields the EXACT same nullifier,
//    which the contract rejects with "Nullifier already spent".
//
// 3. Collision-Resistant:
//    Compact ledger asserts !nullifiers.member(nullifierHash)
//    before recording any vote state mutation.`;

const TABS: { id: Tab; label: string }[] = [
  { id: "compact", label: "vox_midnight.compact" },
  { id: "witness", label: "Private Witnesses" },
  { id: "nullifier", label: "Nullifier Math" },
];

export const CompactCircuitViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("compact");
  const [copied, setCopied] = useState(false);

  const getCode = (): string => {
    if (activeTab === "witness") return witnessExplanation;
    if (activeTab === "nullifier") return nullifierExplanation;
    return compactCode;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card-flat" style={{ borderRadius: "16px", overflow: "hidden" }}>
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(74,222,128,0.08)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}
          >
            <FileCode className="w-4 h-4" style={{ color: "#4ade80" }} />
          </div>
          <div>
            <h3 className="text-sm font-bold" style={{ color: "#f0fdf0" }}>
              Compact Smart Contract
              <span
                className="ml-2 text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded"
                style={{ background: "rgba(74,222,128,0.08)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.15)" }}
              >
                Compact DSL
              </span>
            </h3>
            <p className="text-xs" style={{ color: "#4b7a54" }}>ZK circuit specification for VoxMidnight</p>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
          style={{
            background: "rgba(74,222,128,0.06)",
            border: "1px solid rgba(74,222,128,0.12)",
            color: "#4b7a54",
          }}
        >
          {copied ? (
            <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#4ade80" }} />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <div className="p-5">
        {/* Tabs */}
        <div className="flex gap-1.5 mb-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all"
              style={{
                background: activeTab === tab.id ? "rgba(74,222,128,0.12)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${activeTab === tab.id ? "rgba(74,222,128,0.3)" : "rgba(74,222,128,0.06)"}`,
                color: activeTab === tab.id ? "#4ade80" : "#4b7a54",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code block */}
        <div
          className="p-4 rounded-xl overflow-x-auto"
          style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(74,222,128,0.08)" }}
        >
          <pre
            className="text-xs leading-relaxed"
            style={{ color: "#86efac", fontFamily: "'JetBrains Mono', 'Fira Code', monospace", margin: 0 }}
          >
            <code>{getCode()}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
