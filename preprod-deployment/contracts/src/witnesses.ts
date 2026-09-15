/*
 * Witness definitions for VoxMidnight Compact smart contract on Midnight Network.
 */

import { Ledger } from "./managed/bboard/contract/index.js";
import { WitnessContext } from "@midnight-ntwrk/midnight-js-protocol/compact-runtime";

export type VoxMidnightPrivateState = {
  readonly voterChoice: boolean;
  readonly voterSecret: Uint8Array;
  readonly voterEligibility: number;
};

export const createVoxMidnightPrivateState = (
  voterChoice: boolean = true,
  voterSecret: Uint8Array = new Uint8Array(32),
  voterEligibility: number = 100
): VoxMidnightPrivateState => ({
  voterChoice,
  voterSecret,
  voterEligibility,
});

export const witnesses = {
  voterChoiceWitness: ({
    privateState,
  }: WitnessContext<Ledger, VoxMidnightPrivateState>): [
    VoxMidnightPrivateState,
    boolean,
  ] => [privateState, privateState.voterChoice],

  voterSecretWitness: ({
    privateState,
  }: WitnessContext<Ledger, VoxMidnightPrivateState>): [
    VoxMidnightPrivateState,
    Uint8Array,
  ] => [privateState, privateState.voterSecret],

  voterEligibilityWitness: ({
    privateState,
  }: WitnessContext<Ledger, VoxMidnightPrivateState>): [
    VoxMidnightPrivateState,
    number,
  ] => [privateState, privateState.voterEligibility],
};
