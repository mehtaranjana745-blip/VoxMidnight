/**
 * Midnight DApp type definitions for VoxMidnight
 */

export interface WalletAccount {
  address: string;
  coinPublicKey: string;
  encryptionPublicKey: string;
  balanceTDU: string;
}

export interface WalletState {
  isConnected: boolean;
  isConnecting: boolean;
  account: WalletAccount | null;
  network: "preprod" | "testnet" | "mainnet" | "devnet";
  error: string | null;
}

export interface GovernanceProposal {
  id: number;
  title: string;
  category: string;
  description: string;
  proposer: string;
  votingDeadline: string;
  status: "Active" | "Passed" | "Rejected" | "Pending";
  quorumRequired: number;
  yesVotes: number;
  noVotes: number;
  totalVotes: number;
  contractAddress: string;
}

export interface VoteActivity {
  id: string;
  txHash: string;
  proposalId: number;
  nullifierCommitment: string;
  timestamp: string;
  blockHeight: number;
  isVerified: boolean;
  privacyShield: "Zero-Knowledge Circuit Proof (Confidential)";
}

export type ProofStep = "WITNESS_GENERATION" | "NULLIFIER_PROVING" | "CIRCUIT_SYNTHESIS" | "LEDGER_SUBMISSION" | "FINALIZED";

export interface ZKProofProgress {
  step: ProofStep;
  stepNumber: number;
  totalSteps: number;
  title: string;
  details: string;
  proofTimeMs?: number;
  txHash?: string;
}
