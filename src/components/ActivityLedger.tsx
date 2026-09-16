"use client";

import React from "react";
import { History, ShieldCheck, ArrowUpRight, ExternalLink } from "lucide-react";
import { VoteActivity } from "../midnight/types";

interface ActivityLedgerProps {
  activities: VoteActivity[];
}

const ACTION_TYPES = ["castVote", "zkProof", "nullify", "castVote", "castVote", "zkProof"];

export const ActivityLedger: React.FC<ActivityLedgerProps> = ({ activities }) => {
  return (
    <div className="card-flat" style={{ borderRadius: "16px", overflow: "hidden" }}>
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
            <History className="w-4 h-4" style={{ color: "#4ade80" }} />
          </div>
          <div>
            <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: "#f0fdf0" }}>
              Transactions
              <span className="flex h-1.5 w-1.5 relative">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: "#4ade80" }}
                />
                <span
                  className="relative inline-flex rounded-full h-1.5 w-1.5"
                  style={{ background: "#4ade80" }}
                />
              </span>
            </h3>
            <p className="text-xs" style={{ color: "#4b7a54" }}>Live anonymous ballot ledger</p>
          </div>
        </div>
        <button className="text-xs font-semibold" style={{ color: "#4ade80" }}>
          See all
        </button>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Transaction Hash</th>
              <th>Action</th>
              <th>Block</th>
              <th>Nullifier</th>
              <th>Status</th>
              <th>Age</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {activities.map((act, idx) => {
              const actionType = ACTION_TYPES[idx % ACTION_TYPES.length];
              return (
                <tr key={act.id}>
                  {/* Tx Hash */}
                  <td>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded flex items-center justify-center shrink-0"
                        style={{ background: "rgba(74,222,128,0.08)" }}
                      >
                        <ShieldCheck className="w-3 h-3" style={{ color: "#4ade80" }} />
                      </div>
                      <span style={{ color: "#86efac" }}>
                        {act.txHash.slice(0, 10)}...{act.txHash.slice(-6)}
                      </span>
                    </div>
                  </td>

                  {/* Action badge */}
                  <td>
                    <span
                      className={`action-badge ${
                        actionType === "castVote"
                          ? "action-vote"
                          : actionType === "zkProof"
                          ? "action-proof"
                          : "action-nullify"
                      }`}
                    >
                      {actionType === "castVote"
                        ? "castBallot"
                        : actionType === "zkProof"
                        ? "zkVerify"
                        : "nullify"}
                    </span>
                  </td>

                  {/* Block */}
                  <td style={{ color: "#86efac" }}>#{act.blockHeight}</td>

                  {/* Nullifier */}
                  <td>
                    <span style={{ color: "#4b7a54", fontSize: "11px" }}>
                      {act.nullifierCommitment.slice(0, 14)}...
                    </span>
                  </td>

                  {/* Verified */}
                  <td>
                    {act.isVerified ? (
                      <span className="badge-green" style={{ fontSize: "11px" }}>
                        <ShieldCheck className="w-3 h-3" />
                        Verified
                      </span>
                    ) : (
                      <span className="badge-outline" style={{ fontSize: "11px" }}>
                        Pending
                      </span>
                    )}
                  </td>

                  {/* Age */}
                  <td style={{ color: "#4b7a54", fontSize: "12px" }}>{act.timestamp}</td>

                  {/* Link */}
                  <td>
                    <button
                      onClick={() => alert(`Preprod Explorer: ${act.txHash}`)}
                      className="p-1.5 rounded transition-colors"
                      style={{ color: "#4b7a54" }}
                      title="View on Explorer"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
