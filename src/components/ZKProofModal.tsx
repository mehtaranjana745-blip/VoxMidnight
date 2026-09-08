"use client";

import React from "react";
import { Check, Loader2, Shield, Lock, Cpu, Send, CheckCircle2, ArrowRight } from "lucide-react";
import { ZKProofProgress } from "../midnight/types";

interface ZKProofModalProps {
  isOpen: boolean;
  progress: ZKProofProgress | null;
  onClose: () => void;
}

export const ZKProofModal: React.FC<ZKProofModalProps> = ({ isOpen, progress, onClose }) => {
  if (!isOpen || !progress) return null;

  const steps = [
    {
      id: "WITNESS_GENERATION",
      title: "Local Witness Formulation",
      desc: "Ingesting confidential choice & 256-bit entropy salt inside local browser prover sandbox.",
      icon: Lock,
    },
    {
      id: "NULLIFIER_PROVING",
      title: "Cryptographic Nullifier Derivation",
      desc: "Computing deterministic hash nullifier to enforce one-person-one-vote rule.",
      icon: Shield,
    },
    {
      id: "CIRCUIT_SYNTHESIS",
      title: "Compact Halo2 ZK Proof Synthesis",
      desc: "Executing Compact circuit constraints without revealing private witness variables.",
      icon: Cpu,
    },
    {
      id: "LEDGER_SUBMISSION",
      title: "Midnight Preprod Settlement",
      desc: "Submitting verified proof transaction to Midnight Preprod consensus.",
      icon: Send,
    },
  ];

  const getStepStatus = (index: number) => {
    const currentStepIndex = progress.stepNumber - 1;
    if (progress.step === "FINALIZED") return "completed";
    if (index < currentStepIndex) return "completed";
    if (index === currentStepIndex) return "active";
    return "pending";
  };

  const isComplete = progress.step === "FINALIZED";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl glass-panel-glow p-6 sm:p-8 border border-lunar-teal/30 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-white/10">
          <div className="w-10 h-10 rounded-2xl bg-lunar-teal/20 flex items-center justify-center border border-lunar-teal/40">
            <Shield className="w-5 h-5 text-lunar-teal" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Zero-Knowledge Proof Execution</h3>
            <p className="text-xs text-slate-400">Midnight Compact Circuit Sandbox</p>
          </div>
        </div>

        {/* Current Status Pill */}
        <div className="mb-6 p-4 rounded-2xl bg-obsidian-900 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-lunar-teal uppercase tracking-wider">
              {progress.title}
            </span>
            <span className="text-xs font-mono text-slate-400">
              Step {progress.stepNumber} of 4
            </span>
          </div>
          <p className="text-xs text-slate-300 font-mono leading-relaxed">
            {progress.details}
          </p>
          {progress.txHash && (
            <div className="mt-2.5 pt-2 border-t border-white/10 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Tx Hash:</span>
              <span className="text-lunar-teal truncate max-w-[220px]">{progress.txHash}</span>
            </div>
          )}
        </div>

        {/* Stepper Timeline */}
        <div className="space-y-4 mb-8">
          {steps.map((step, idx) => {
            const status = getStepStatus(idx);
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex items-start space-x-3.5">
                {/* Step Node */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                    status === "completed"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : status === "active"
                      ? "bg-lunar-teal/20 text-lunar-teal border border-lunar-teal animate-pulse"
                      : "bg-obsidian-800 text-slate-600 border border-white/5"
                  }`}
                >
                  {status === "completed" ? (
                    <Check className="w-4 h-4 text-emerald-400 font-bold" />
                  ) : status === "active" ? (
                    <Loader2 className="w-4 h-4 animate-spin text-lunar-teal" />
                  ) : (
                    <span className="text-xs font-mono">{idx + 1}</span>
                  )}
                </div>

                {/* Step Details */}
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-xs font-semibold ${
                      status === "active"
                        ? "text-lunar-teal"
                        : status === "completed"
                        ? "text-slate-200"
                        : "text-slate-500"
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-light mt-0.5 leading-tight">
                    {step.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        {isComplete ? (
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center space-x-2 text-emerald-300 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Ballot verified & counted without leaking your identity or choice.</span>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-lunar-teal to-cyan-400 text-obsidian-950 font-bold text-sm hover:opacity-95 transition shadow-[0_0_15px_rgba(0,242,254,0.3)]"
            >
              Done & Return to Dashboard
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2 text-xs text-slate-400">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-lunar-teal" />
            <span>Computing cryptographic zero-knowledge circuit...</span>
          </div>
        )}
      </div>
    </div>
  );
};
