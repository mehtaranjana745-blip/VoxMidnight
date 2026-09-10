import { describe, it, expect, beforeEach } from "vitest";
import { VoxMidnightContractImpl } from "../src/contract/managed/contract";
import { VoxZKProver } from "../src/midnight/zkProver";

describe("VoxMidnight Compact Smart Contract & ZK Governance Test Suite", () => {
  let contract: VoxMidnightContractImpl;
  const adminKey = new Uint8Array(32).fill(1);
  const proposalId = 42;

  beforeEach(() => {
    contract = new VoxMidnightContractImpl(BigInt(proposalId), adminKey);
  });

  it("1. Should successfully cast an anonymous YES ballot and update public tally", async () => {
    const voterSecret = new Uint8Array(32).fill(7);
    const { bytes: nullifierBytes, hex: nullifierHex } = await VoxZKProver.deriveNullifier(voterSecret, proposalId);

    const initialState = await contract.queryLedgerState();
    const initialYes = initialState.yesCount;
    const initialTotal = initialState.totalVotes;

    // Set private witness: voter selects YES (true) with governance weight 100
    contract.setWitnesses({
      voterChoiceWitness: () => true,
      voterSecretWitness: () => voterSecret,
      voterEligibilityWitness: () => 100,
    });

    const result = await contract.circuits.castBallot(nullifierBytes);
    expect(result).toBe(true);

    const updatedState = await contract.queryLedgerState();
    expect(updatedState.yesCount).toBe(initialYes + 1n);
    expect(updatedState.totalVotes).toBe(initialTotal + 1n);
    expect(updatedState.nullifiers.has(nullifierHex.replace("0x", ""))).toBe(true);
  });

  it("2. Should strictly prevent double-voting when reusing the same nullifier", async () => {
    const voterSecret = new Uint8Array(32).fill(9);
    const { bytes: nullifierBytes } = await VoxZKProver.deriveNullifier(voterSecret, proposalId);

    contract.setWitnesses({
      voterChoiceWitness: () => false,
      voterSecretWitness: () => voterSecret,
      voterEligibilityWitness: () => 50,
    });

    // First vote succeeds
    await contract.circuits.castBallot(nullifierBytes);

    // Attempting second vote with same nullifier MUST throw double-voting error
    await expect(contract.circuits.castBallot(nullifierBytes)).rejects.toThrow(
      "Nullifier already spent: Double-voting is strictly forbidden"
    );
  });

  it("3. Should reject voter with zero governance weight (ineligible)", async () => {
    const voterSecret = new Uint8Array(32).fill(3);
    const { bytes: nullifierBytes } = await VoxZKProver.deriveNullifier(voterSecret, proposalId);

    // Set witness with 0 eligibility weight
    contract.setWitnesses({
      voterChoiceWitness: () => true,
      voterSecretWitness: () => voterSecret,
      voterEligibilityWitness: () => 0,
    });

    await expect(contract.circuits.castBallot(nullifierBytes)).rejects.toThrow(
      "Voter has insufficient governance weight or is ineligible"
    );
  });

  it("4. Should reject votes when proposal voting is paused by admin", async () => {
    await contract.circuits.setVotingActive(false);

    const voterSecret = new Uint8Array(32).fill(4);
    const { bytes: nullifierBytes } = await VoxZKProver.deriveNullifier(voterSecret, proposalId);

    contract.setWitnesses({
      voterChoiceWitness: () => true,
      voterSecretWitness: () => voterSecret,
      voterEligibilityWitness: () => 100,
    });

    await expect(contract.circuits.castBallot(nullifierBytes)).rejects.toThrow(
      "Governance voting is currently closed or resolved"
    );
  });
});
