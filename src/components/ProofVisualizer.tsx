"use client";

import React from "react";
import { Eye, EyeOff, Check } from "lucide-react";

const PUBLIC_ITEMS = [
  { label: "Aggregated Tally Mutation", value: "yesCount++ or noCount++", tag: "Counter", tagColor: "#4ade80" },
  { label: "Cryptographic Nullifier", value: "0x94f28a01cd20e8b1...", tag: "Bytes<32>", tagColor: "#4b7a54" },
  { label: "Halo2 Proof Verification", value: "Valid zk-SNARK", tag: "Verified", tagColor: "#4ade80", check: true },
];

const PRIVATE_ITEMS = [
  { label: "Individual Voter Choice", value: "voterChoiceWitness(): Boolean", tag: "Private" },
  { label: "Voter Entropy Secret Salt", value: "voterSecretWitness(): Bytes<32>", tag: "Off-Chain" },
  { label: "Governance Tier & Balance", value: "voterEligibilityWitness(): Uint<16>", tag: "Encrypted" },
];

export const ProofVisualizer: React.FC = () => {
  return (
    <div className="card-flat" style={{ borderRadius: "16px", overflow: "hidden" }}>
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(74,222,128,0.08)" }}
      >
        <div>
          <h3 className="text-sm font-bold" style={{ color: "#f0fdf0" }}>
            Midnight Zero-Knowledge Privacy Architecture
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "#4b7a54" }}>
            On-Chain public ledger vs client-side private witness
          </p>
        </div>
        <span
          className="text-[11px] px-2 py-1 rounded font-mono"
          style={{ background: "rgba(74,222,128,0.06)", color: "#4b7a54", border: "1px solid rgba(74,222,128,0.1)" }}
        >
          Compact DSL v0.31
        </span>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Panel 1: Public Ledger */}
          <div
            className="p-4 rounded-xl"
            style={{ background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.15)" }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.2)" }}
              >
                <Eye className="w-3.5 h-3.5" style={{ color: "#4ade80" }} />
              </div>
              <div>
                <div className="text-xs font-bold" style={{ color: "#f0fdf0" }}>What the Public Ledger Sees</div>
                <div className="text-[11px] font-mono" style={{ color: "#4ade80" }}>On-Chain Transparent State</div>
              </div>
            </div>

            <div className="space-y-2">
              {PUBLIC_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="p-3 rounded-lg flex items-start justify-between"
                  style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(74,222,128,0.06)" }}
                >
                  <div>
                    <div className="text-[11px] mb-0.5" style={{ color: "#4b7a54" }}>{item.label}</div>
                    <div
                      className="text-xs font-bold font-mono flex items-center gap-1"
                      style={{ color: item.check ? "#4ade80" : "#86efac" }}
                    >
                      {item.check && <Check className="w-3 h-3" />}
                      {item.value}
                    </div>
                  </div>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded font-mono ml-2 shrink-0"
                    style={{
                      background: `rgba(${item.tagColor === "#4ade80" ? "74,222,128" : "75,122,84"},0.12)`,
                      color: item.tagColor,
                      border: `1px solid ${item.tagColor === "#4ade80" ? "rgba(74,222,128,0.2)" : "rgba(75,122,84,0.2)"}`,
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[11px] mt-3 leading-relaxed" style={{ color: "#4b7a54" }}>
              The blockchain verifies mathematical correctness and increments the public tally without learning who voted or what they chose.
            </p>
          </div>

          {/* Panel 2: Private Witness */}
          <div
            className="p-4 rounded-xl"
            style={{ background: "rgba(239,68,68,0.03)", border: "1px solid rgba(239,68,68,0.12)" }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}
              >
                <EyeOff className="w-3.5 h-3.5" style={{ color: "#f87171" }} />
              </div>
              <div>
                <div className="text-xs font-bold" style={{ color: "#f0fdf0" }}>What Stays Hidden</div>
                <div className="text-[11px] font-mono" style={{ color: "#f87171" }}>Client-Side ZK Witness Sandbox</div>
              </div>
            </div>

            <div className="space-y-2">
              {PRIVATE_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="p-3 rounded-lg flex items-start justify-between"
                  style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(74,222,128,0.06)" }}
                >
                  <div>
                    <div className="text-[11px] mb-0.5" style={{ color: "#4b7a54" }}>{item.label}</div>
                    <div className="text-xs font-bold font-mono" style={{ color: "#4ade80" }}>{item.value}</div>
                  </div>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded font-mono ml-2 shrink-0"
                    style={{
                      background: "rgba(74,222,128,0.08)",
                      color: "#4ade80",
                      border: "1px solid rgba(74,222,128,0.15)",
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[11px] mt-3 leading-relaxed" style={{ color: "#4b7a54" }}>
              These parameters are ingested inside your browser&apos;s local prover and never sent across the network, preventing voter profiling or bribery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
