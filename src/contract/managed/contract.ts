/**
 * Managed contract client implementation and circuit bridge for VoxMidnight.
 * Compliant with Midnight Network Level-3 standard.
 */

import type { LedgerState, PrivateWitnesses, ContractCircuits } from "./contract.d";

export class VoxMidnightContractImpl {
  private ledgerState: LedgerState;
  private witnesses?: PrivateWitnesses;

  constructor(initialProposalId: bigint = 42n, adminPublicKey: Uint8Array = new Uint8Array(32)) {
    this.ledgerState = {
      proposalId: initialProposalId,
      yesCount: 142n,
      noCount: 23n,
      totalVotes: 165n,
      votingActive: true,
      admin: adminPublicKey,
      nullifiers: new Map<string, boolean>(),
    };
  }

  public setWitnesses(witnesses: PrivateWitnesses): void {
    this.witnesses = witnesses;
  }

  public readonly circuits: ContractCircuits = {
    castBallot: async (nullifierHash: Uint8Array): Promise<boolean> => {
      if (!this.ledgerState.votingActive) {
        throw new Error("Governance voting is currently closed or resolved");
      }

      const nullifierHex = Array.from(nullifierHash)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      if (this.ledgerState.nullifiers.has(nullifierHex)) {
        throw new Error("Nullifier already spent: Double-voting is strictly forbidden");
      }

      if (!this.witnesses) {
        throw new Error("Client ZK Prover Error: Private witnesses not supplied to local prover");
      }

      const eligibility = this.witnesses.voterEligibilityWitness();
      if (eligibility <= 0) {
        throw new Error("Voter has insufficient governance weight or is ineligible");
      }

      const choice = this.witnesses.voterChoiceWitness();
      
      // Simulate Compact disclose() behavior: Only tally updates and nullifier are exposed on-chain
      if (choice) {
        this.ledgerState.yesCount += 1n;
      } else {
        this.ledgerState.noCount += 1n;
      }
      this.ledgerState.totalVotes += 1n;
      this.ledgerState.nullifiers.set(nullifierHex, true);

      return true;
    },

    setVotingActive: async (active: boolean): Promise<void> => {
      this.ledgerState.votingActive = active;
    },

    setProposalId: async (newProposalId: bigint): Promise<void> => {
      if (newProposalId <= this.ledgerState.proposalId) {
        throw new Error("New proposal ID must be strictly greater than previous");
      }
      this.ledgerState.proposalId = newProposalId;
      this.ledgerState.votingActive = true;
    },
  };

  public async queryLedgerState(): Promise<LedgerState> {
    return {
      ...this.ledgerState,
      nullifiers: new Map(this.ledgerState.nullifiers),
    };
  }
}
