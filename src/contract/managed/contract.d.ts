/**
 * Auto-generated TypeScript definitions for VoxMidnight Compact Smart Contract.
 * Generated from contract/vox_midnight.compact via Midnight Compact Compiler.
 */

export type Uint<N extends number> = bigint | number;
export type Bytes<N extends number> = Uint8Array | string;

export interface LedgerState {
  proposalId: bigint;
  yesCount: bigint;
  noCount: bigint;
  totalVotes: bigint;
  votingActive: boolean;
  admin: Uint8Array;
  nullifiers: Map<string, boolean>;
}

export interface PrivateWitnesses {
  voterChoiceWitness: () => boolean;
  voterSecretWitness: () => Uint8Array;
  voterEligibilityWitness: () => number;
}

export interface ContractCircuits {
  castBallot(nullifierHash: Uint8Array): Promise<boolean>;
  setVotingActive(active: boolean): Promise<void>;
  setProposalId(newProposalId: bigint): Promise<void>;
}

export declare class VoxMidnightContract {
  constructor(initialProposalId: bigint, adminPublicKey: Uint8Array);
  readonly circuits: ContractCircuits;
  queryLedgerState(): Promise<LedgerState>;
}
