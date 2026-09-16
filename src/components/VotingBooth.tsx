"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, XCircle, ShieldCheck, KeyRound, Lock, AlertCircle, Cpu, Vote, RefreshCw } from "lucide-react";
import { WalletState } from "../midnight/types";

interface VotingBoothProps {
  wallet: WalletState;
  onCastVote: (choice: boolean, salt: Uint8Array) => Promise<void>;
  isVoting: boolean;
  onConnectWallet: () => void;
}

export const VotingBooth: React.FC<VotingBoothProps> = ({ wallet, onCastVote, isVoting, onConnectWallet }) => {
  const [selectedChoice, setSelectedChoice] = useState<boolean | null>(null);
  const [secretEntropyHex, setSecretEntropyHex] = useState<string>("");
  const [secretBytes, setSecretBytes] = useState<Uint8Array>(new Uint8Array(32));
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const generateNewEntropy = () => {
    const bytes = new Uint8Array(32);
    if (typeof window !== "undefined" && window.crypto) {
      window.crypto.getRandomValues(bytes);
    } else {
      for (let i = 0; i < 32; i++) bytes[i] = Math.floor(Math.random() * 256);
    }
    setSecretBytes(bytes);
    setSecretEntropyHex(Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join(""));
  };

  useEffect(() => { generateNewEntropy(); }, []);

  const handleVoteSubmission = async () => {
    if (selectedChoice === null) { setErrorMsg("Select your governance decision first."); return; }
    if (!wallet.isConnected) { onConnectWallet(); return; }
    setErrorMsg(null);
    try {
      await onCastVote(selectedChoice, secretBytes);
      generateNewEntropy();
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to execute zero-knowledge vote transaction.");
    }
  };

  return (
    <div
      className="card-flat"
      style={{ borderRadius: "16px", overflow: "hidden" }}
    >
      {/* ── Header ── */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(74,222,128,0.08)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.2)" }}
          >
            <Vote className="w-4 h-4" style={{ color: "#4ade80" }} />
          </div>
          <div>
            <h3 className="text-sm font-bold" style={{ color: "#f0fdf0" }}>
              Confidential Voting Booth
              <span
                className="ml-2 text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded"
                style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}
              >
                ZK Circuit
              </span>
            </h3>
            <p className="text-xs" style={{ color: "#4b7a54" }}>Zero-Knowledge witness evaluation</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "#4b7a54", fontFamily: "'JetBrains Mono', monospace" }}>
          <Lock className="w-3 h-3" style={{ color: "#4ade80" }} />
          <span>Client-side proving</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* ── Vote Choice Cards ── */}
        <div className="grid grid-cols-2 gap-3">
          {/* APPROVE */}
          <button
            type="button"
            onClick={() => setSelectedChoice(true)}
            className="p-4 rounded-xl text-left transition-all"
            style={{
              background: selectedChoice === true ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${selectedChoice === true ? "rgba(74,222,128,0.4)" : "rgba(74,222,128,0.08)"}`,
              boxShadow: selectedChoice === true ? "0 0 16px rgba(74,222,128,0.12)" : "none",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{
                  background: selectedChoice === true ? "#4ade80" : "rgba(74,222,128,0.12)",
                }}
              >
                <CheckCircle2
                  className="w-4 h-4"
                  style={{ color: selectedChoice === true ? "#0a0f0a" : "#4ade80" }}
                />
              </div>
              <div
                className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                style={{
                  borderColor: selectedChoice === true ? "#4ade80" : "rgba(74,222,128,0.2)",
                  background: selectedChoice === true ? "#4ade80" : "transparent",
                }}
              >
                {selectedChoice === true && <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#0a0f0a" }} />}
              </div>
            </div>
            <div className="text-sm font-bold mb-1" style={{ color: "#4ade80" }}>APPROVE</div>
            <div className="text-[11px] leading-relaxed" style={{ color: "#4b7a54" }}>
              Vote in favor — MIP-042 upgrade
            </div>
            <div
              className="mt-2 pt-2 text-[10px] font-mono"
              style={{ borderTop: "1px solid rgba(74,222,128,0.08)", color: "#4b7a54" }}
            >
              witness: <span style={{ color: "#4ade80" }}>true</span> → yesCount +1
            </div>
          </button>

          {/* REJECT */}
          <button
            type="button"
            onClick={() => setSelectedChoice(false)}
            className="p-4 rounded-xl text-left transition-all"
            style={{
              background: selectedChoice === false ? "rgba(239,68,68,0.08)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${selectedChoice === false ? "rgba(239,68,68,0.35)" : "rgba(74,222,128,0.08)"}`,
              boxShadow: selectedChoice === false ? "0 0 16px rgba(239,68,68,0.1)" : "none",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{
                  background: selectedChoice === false ? "#ef4444" : "rgba(239,68,68,0.12)",
                }}
              >
                <XCircle
                  className="w-4 h-4"
                  style={{ color: selectedChoice === false ? "#fff" : "#f87171" }}
                />
              </div>
              <div
                className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                style={{
                  borderColor: selectedChoice === false ? "#ef4444" : "rgba(74,222,128,0.2)",
                  background: selectedChoice === false ? "#ef4444" : "transparent",
                }}
              >
                {selectedChoice === false && <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#fff" }} />}
              </div>
            </div>
            <div className="text-sm font-bold mb-1" style={{ color: "#f87171" }}>REJECT</div>
            <div className="text-[11px] leading-relaxed" style={{ color: "#4b7a54" }}>
              Against — request further review
            </div>
            <div
              className="mt-2 pt-2 text-[10px] font-mono"
              style={{ borderTop: "1px solid rgba(74,222,128,0.08)", color: "#4b7a54" }}
            >
              witness: <span style={{ color: "#f87171" }}>false</span> → noCount +1
            </div>
          </button>
        </div>

        {/* ── Entropy Salt Box ── */}
        <div
          className="p-4 rounded-xl"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(74,222,128,0.08)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <KeyRound className="w-3.5 h-3.5" style={{ color: "#4ade80" }} />
              <span className="text-xs font-semibold" style={{ color: "#86efac" }}>
                Entropy Salt (Local Witness)
              </span>
            </div>
            <button
              onClick={generateNewEntropy}
              className="flex items-center gap-1 text-[11px] transition-colors"
              style={{ color: "#4b7a54" }}
            >
              <RefreshCw className="w-3 h-3" />
              <span>Re-roll</span>
            </button>
          </div>
          <div
            className="p-2 rounded-lg text-[11px] break-all font-mono flex items-center justify-between"
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(74,222,128,0.06)",
              color: "#4b7a54",
            }}
          >
            <span>0x{secretEntropyHex.slice(0, 28)}...{secretEntropyHex.slice(-12)}</span>
            <span
              className="shrink-0 ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold"
              style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80" }}
            >
              256-bit
            </span>
          </div>
          <p className="text-[10px] mt-1.5" style={{ color: "#2d5c36" }}>
            Never broadcasted. Used to derive anonymous single-use nullifier.
          </p>
        </div>

        {/* ── Error ── */}
        {errorMsg && (
          <div
            className="p-3 rounded-xl flex items-center gap-2.5 text-xs"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* ── Submit Button ── */}
        <button
          type="button"
          onClick={handleVoteSubmission}
          disabled={isVoting}
          className="w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2.5"
          style={{
            background: isVoting ? "rgba(74,222,128,0.3)" : "#4ade80",
            color: "#0a0f0a",
            boxShadow: isVoting ? "none" : "0 0 20px rgba(74,222,128,0.25)",
            opacity: isVoting ? 0.7 : 1,
          }}
        >
          <Cpu className="w-4 h-4" />
          <span>
            {isVoting
              ? "Synthesizing ZK Proof..."
              : !wallet.isConnected
              ? "Connect wallet to vote"
              : selectedChoice === null
              ? "Select your choice"
              : "Cast Confidential Ballot"}
          </span>
        </button>
      </div>
    </div>
  );
};
