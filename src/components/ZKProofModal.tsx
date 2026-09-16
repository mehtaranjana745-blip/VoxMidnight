"use client";

import React from "react";
import { Check, Loader2, Shield, Lock, Cpu, Send, CheckCircle2 } from "lucide-react";
import { ZKProofProgress } from "../midnight/types";

interface ZKProofModalProps {
  isOpen: boolean;
  progress: ZKProofProgress | null;
  onClose: () => void;
}

const STEPS = [
  { id: "WITNESS_GENERATION", title: "Local Witness Formulation", desc: "Ingesting confidential choice & entropy salt inside local browser prover sandbox.", Icon: Lock },
  { id: "NULLIFIER_PROVING", title: "Cryptographic Nullifier Derivation", desc: "Computing deterministic hash nullifier to enforce one-person-one-vote rule.", Icon: Shield },
  { id: "CIRCUIT_SYNTHESIS", title: "Compact Halo2 ZK Proof Synthesis", desc: "Executing Compact circuit constraints without revealing private witness variables.", Icon: Cpu },
  { id: "LEDGER_SUBMISSION", title: "Midnight Preprod Settlement", desc: "Submitting verified proof transaction to Midnight Preprod consensus.", Icon: Send },
];

export const ZKProofModal: React.FC<ZKProofModalProps> = ({ isOpen, progress, onClose }) => {
  if (!isOpen || !progress) return null;

  const isComplete = progress.step === "FINALIZED";

  const getStatus = (idx: number) => {
    const cur = progress.stepNumber - 1;
    if (isComplete) return "completed";
    if (idx < cur) return "completed";
    if (idx === cur) return "active";
    return "pending";
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" }}
    >
      <div
        className="w-full max-w-lg rounded-2xl p-6"
        style={{
          background: "var(--bg-card)",
          border: "1px solid rgba(74,222,128,0.25)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 40px rgba(74,222,128,0.06)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-5 pb-4" style={{ borderBottom: "1px solid rgba(74,222,128,0.08)" }}>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.25)" }}
          >
            <Shield className="w-4 h-4" style={{ color: "#4ade80" }} />
          </div>
          <div>
            <h3 className="text-sm font-bold" style={{ color: "#f0fdf0" }}>Zero-Knowledge Proof Execution</h3>
            <p className="text-xs" style={{ color: "#4b7a54" }}>Midnight Compact Circuit Sandbox</p>
          </div>
        </div>

        {/* Current Step Box */}
        <div
          className="mb-5 p-4 rounded-xl"
          style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(74,222,128,0.1)" }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#4ade80" }}>
              {progress.title}
            </span>
            <span className="text-xs font-mono" style={{ color: "#4b7a54" }}>
              Step {progress.stepNumber} / 4
            </span>
          </div>
          <p className="text-xs font-mono leading-relaxed" style={{ color: "#86efac" }}>
            {progress.details}
          </p>
          {progress.txHash && (
            <div
              className="mt-2.5 pt-2 flex items-center justify-between text-[11px] font-mono"
              style={{ borderTop: "1px solid rgba(74,222,128,0.08)", color: "#4b7a54" }}
            >
              <span>Tx Hash:</span>
              <span className="truncate max-w-[220px]" style={{ color: "#4ade80" }}>{progress.txHash}</span>
            </div>
          )}
        </div>

        {/* Stepper */}
        <div className="space-y-3 mb-6">
          {STEPS.map(({ id, title, desc, Icon }, idx) => {
            const status = getStatus(idx);
            return (
              <div key={id} className="flex items-start gap-3">
                {/* Node */}
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all"
                  style={{
                    background:
                      status === "completed"
                        ? "rgba(74,222,128,0.15)"
                        : status === "active"
                        ? "rgba(74,222,128,0.12)"
                        : "rgba(255,255,255,0.02)",
                    border: `1px solid ${
                      status === "completed"
                        ? "rgba(74,222,128,0.3)"
                        : status === "active"
                        ? "rgba(74,222,128,0.4)"
                        : "rgba(74,222,128,0.06)"
                    }`,
                  }}
                >
                  {status === "completed" ? (
                    <Check className="w-3.5 h-3.5" style={{ color: "#4ade80" }} />
                  ) : status === "active" ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" style={{ color: "#4ade80" }} />
                  ) : (
                    <span className="text-[10px] font-mono" style={{ color: "#2d5c36" }}>{idx + 1}</span>
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div
                    className="text-xs font-semibold"
                    style={{
                      color:
                        status === "active"
                          ? "#4ade80"
                          : status === "completed"
                          ? "#86efac"
                          : "#2d5c36",
                    }}
                  >
                    {title}
                  </div>
                  <div className="text-[11px] mt-0.5 leading-tight" style={{ color: "#2d5c36" }}>
                    {desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        {isComplete ? (
          <div className="space-y-3">
            <div
              className="p-3 rounded-xl flex items-center gap-2 text-xs font-medium"
              style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.2)", color: "#4ade80" }}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Ballot verified & counted without leaking your identity or choice.</span>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl text-sm font-bold transition-all"
              style={{
                background: "#4ade80",
                color: "#0a0f0a",
                boxShadow: "0 0 16px rgba(74,222,128,0.2)",
              }}
            >
              Done — Return to Dashboard
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-xs" style={{ color: "#4b7a54" }}>
            <Loader2 className="w-3.5 h-3.5 animate-spin" style={{ color: "#4ade80" }} />
            <span>Computing cryptographic zero-knowledge circuit...</span>
          </div>
        )}
      </div>
    </div>
  );
};
