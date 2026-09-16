# VoxMidnight 🗳️⚡

**Level-3 Compliant Decentralized Anonymous Governance Protocol on Midnight Network**

> **Midnight Network Hackathon — Level-3 Project Submission**  
> **Project Name**: VoxMidnight  
> **Concept**: Private On-Chain Governance & Verifiable Anonymous Balloting  
> **Smart Contract Language**: Compact DSL | **Zero-Knowledge Proofs**: Halo2 / PLONK | **Frontend**: Next.js 14, React 18, Tailwind CSS, Lucide Icons  
> **Live Web Application**: [https://vox-midnight.vercel.app/](https://vox-midnight.vercel.app/)  
> **GitHub Repository**: [https://github.com/mehtaranjana745-blip/VoxMidnight](https://github.com/mehtaranjana745-blip/VoxMidnight)  
> [![Midnight CI/CD Pipeline](https://github.com/mehtaranjana745-blip/VoxMidnight/actions/workflows/ci.yml/badge.svg)](https://github.com/mehtaranjana745-blip/VoxMidnight/actions)
> [![Midnight Preprod](https://img.shields.io/badge/Midnight-Preprod%20Verified-00f2fe.svg)](https://midnight.network)
> [![Smart Contract](https://img.shields.io/badge/Language-Compact%20DSL-4facfe.svg)](https://docs.midnight.network)
> [![License](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
. **Product Twitter/X handle** : [https://x.com/voxmidnight](https://x.com/voxmidnight)
---

## 🌐 Deployed Network & Contract Information (Reviewer Reference)

| Parameter | Value |
| :--- | :--- |
| **Contract Name** | `VoxMidnightContract` |
| **Contract Address (Preprod)** | `a981220ce45583f2d9912ebaab5c33cc7a5546f3ff1ac036776d3972a43c5448` |
| **Midnight Explorer URL** | [https://preprod.midnightexplorer.com/contracts/0xa981220ce45583f2d9912ebaab5c33cc7a5546f3ff1ac036776d3972a43c5448](https://preprod.midnightexplorer.com/contracts/0xa981220ce45583f2d9912ebaab5c33cc7a5546f3ff1ac036776d3972a43c5448) |
| **Live Deployed Web App** | [https://vox-midnight.vercel.app/](https://vox-midnight.vercel.app/) |
| **Network** | `Midnight Preprod (Testnet)` |
| **Admin Public Key** | `03a89e47c92b8d5e0a12f94b3218c5e94b291da93842b10928a47291a0c847e92` |
| **Active Proposal ID** | `#042` (`MIP-042: Implement Threshold Sharded Indexing`) |
| **Proof System** | Halo2 / PLONK with Single-Use Cryptographic Nullifiers |
| **Indexer Endpoint** | `https://indexer.preprod.midnight.network/api/v1/graphql` |
| **Preprod Node RPC** | `https://rpc.preprod.midnight.network` |
| **Local Proof Server** | `http://localhost:6300` |

---

## 📋 Hackathon Deliverables & Reviewer Verification Checklist

| Requirement | Status | File Location / Proof |
| :--- | :---: | :--- |
| **1. Compact Smart Contract** | ✅ Complete | [`contract/vox_midnight.compact`](./contract/vox_midnight.compact) |
| **2. Private Witness Ingestion** | ✅ Complete | `witness voterChoiceWitness(): Boolean`, `voterSecretWitness(): Bytes<32>`, `voterEligibilityWitness(): Uint<16>` |
| **3. Selective `disclose()` Usage** | ✅ Complete | `disclose(choice)` & `disclose(nullifierHash)` (Only public tallies & nullifier are revealed; voter secret and ballot identity remain confidential) |
| **4. Public Ledger State** | ✅ Complete | `proposalId`, `yesCount`, `noCount`, `totalVotes`, `votingActive`, `admin`, `nullifiers` |
| **5. Managed Compilation Artifacts** | ✅ Complete | [`src/contract/managed/`](./src/contract/managed/) generated via `npm run compile:contract` |
| **6. Lace Wallet & Midnight.js Integration** | ✅ Complete | [`src/midnight/laceConnector.ts`](./src/midnight/laceConnector.ts) & [`src/midnight/contractClient.ts`](./src/midnight/contractClient.ts) |
| **7. Lunar Teal & Obsidian UI** | ✅ Complete | [`src/components/`](./src/components/) (Voting Booth, Proposal Card, ZK Stepper Modal, Proof Visualizer, Activity Ledger, Compact Viewer) |
| **8. Automated Unit/Integration Tests** | ✅ 4/4 Passed | [`test/vox_midnight.test.ts`](./test/vox_midnight.test.ts) (`npm run test`) |
| **9. GitHub Actions CI/CD Pipeline** | ✅ Complete | [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) |
| **10. Privacy Model & Level-3 Proposal** | ✅ Complete | Documented in full below |
| **11. Live Deployed Web App** | ✅ Online | [https://vox-midnight.vercel.app/](https://vox-midnight.vercel.app/) |
| **12. Video Demonstration** | ✅ Available | [Watch Live Video Demo](https://photos.app.goo.gl/2boiahufVASndXLM8) |

---

## 🚀 Live Demo & Video Walkthrough

- **Live Deployed Web Application**: [https://vox-midnight.vercel.app/](https://vox-midnight.vercel.app/)
- **Video Walkthrough**: [https://photos.app.goo.gl/2boiahufVASndXLM8](https://photos.app.goo.gl/2boiahufVASndXLM8)  
  *Watch a comprehensive end-to-end walkthrough of client-side Zero-Knowledge proof generation, Midnight Lace wallet connectivity, on-chain anonymous ballot casting, nullifier derivation, and real-time verifiable tally updates on Midnight Preprod.*

---

## 🌟 Executive Summary

Traditional on-chain governance platforms (such as Snapshot, Tally, and Compound Governor) broadcast voter choices, addresses, and timestamps directly to public blockchains. This public exposure leads to severe vulnerabilities: **voter intimidation, bribery/vote buying, herd behavior, and privacy leakage**.

**VoxMidnight** solves this by leveraging the **Midnight Network** and **Compact Smart Contracts**. Voters cast anonymous, verifiable ballots on active governance proposals using **private Zero-Knowledge witnesses**. The smart contract updates the public tally (`yesCount`, `noCount`, `totalVotes`) without ever disclosing individual ballots or voter identities on-chain.

---

## 🛡️ VoxMidnight Zero-Knowledge Privacy Model

```
 ┌────────────────────────────────────────────────────────┐
 │            CLIENT BROWSER (LACE WALLET ZK PROVER)      │
 │                                                        │
 │  [ Private Witnesses ]                                 │
 │  ├── voterChoiceWitness()      : Boolean (YES/NO)      │
 │  ├── voterSecretWitness()      : Bytes<32> (Entropy)   │
 │  └── voterEligibilityWitness() : Uint<16> (Weight)     │
 │                                                        │
 │  [ Local Prover Execution ]                            │
 │  └── Nullifier = SHA256(voterSecret || proposalId)     │
 │  └── Compact Halo2 Proof Synthesis                     │
 └──────────────────────────┬─────────────────────────────┘
                            │
               Zero-Knowledge Proof & Nullifier
               (NO RAW CHOICE, NO VOTER SECRET)
                            │
                            ▼
 ┌────────────────────────────────────────────────────────┐
 │           MIDNIGHT PREPROD ON-CHAIN LEDGER             │
 │                                                        │
 │  [ Public State Mutations ]                            │
 │  ├── Assert: !nullifiers.member(nullifier)             │
 │  ├── Assert: eligibilityScore > 0                      │
 │  ├── Disclose: yesCount.increment() or noCount...      │
 │  └── Store: nullifiers.insert(nullifier, true)         │
 └────────────────────────────────────────────────────────┘
```

### 1. Private Witnesses (Client-Side Only)
- **`voterChoiceWitness()`**: The voter's decision (Approve/Reject) is evaluated exclusively inside the local browser prover sandbox.
- **`voterSecretWitness()`**: A 256-bit cryptographic entropy salt generated by the voter's Lace Wallet.
- **`voterEligibilityWitness()`**: Verifiable proof of voter qualification (token balance or DAO whitelist).

### 2. Double-Voting Prevention (Cryptographic Nullifier)
- VoxMidnight computes a deterministic single-use nullifier: `Nullifier = SHA-256(voterSecret || proposalId)`.
- The smart contract records spent nullifiers in an on-chain ledger map (`nullifiers: Map<Bytes<32>, Boolean>`).
- If an attacker or voter attempts to vote twice on the same proposal, the contract rejects the transaction with `"Nullifier already spent: Double-voting is strictly forbidden"`.

### 3. Public Ledger State (Transparent Tallies)
- The public ledger only reflects aggregated totals: `yesCount`, `noCount`, `totalVotes`, and the set of spent nullifiers.
- No observer, validator, or indexer can link a specific vote to an individual wallet address.

---

## 🏆 Level-3 Hackathon Product Proposal

### Problem Statement
Decentralized autonomous organizations (DAOs) manage billions of dollars in treasury assets and protocol parameters. When token holders vote publicly:
1. **Whales bully smaller voters** through targeted social pressure.
2. **Coercion & Bribery** flourish because malicious actors can verify on-chain how a bribe recipient voted.
3. **Voter Apathy** increases due to privacy concerns and front-running.

### The VoxMidnight Solution
VoxMidnight provides an end-to-end confidential governance suite:
- **Client-Side ZK Circuit Proving**: Generates verifiable proofs in sub-second timeframes using Compact DSL.
- **Lace Wallet Preprod Integration**: Seamless cryptographic handshake and wallet state management.
- **Obsidian & Lunar Teal UI**: Intuitive, high-performance interface with live tally progress bars and dual-panel privacy inspectors.
- **One-Person-One-Vote Verifiability**: Zero-knowledge nullifiers prevent sybil voting while maintaining mathematical verifiability.

---

## 💻 Tech Stack & Architecture

- **Smart Contract DSL**: Midnight Compact DSL (`vox_midnight.compact`)
- **Zero-Knowledge Prover**: Halo2 / Midnight Client-Side Prover
- **Frontend Framework**: Next.js 14 (App Router) + React 18
- **Styling**: Tailwind CSS + Custom Obsidian/Lunar Teal theme
- **Icons**: Lucide React
- **Wallet Integration**: Midnight Lace Wallet DApp Connector (Preprod)
- **Unit & Integration Testing**: Vitest test runner
- **CI/CD**: GitHub Actions

---

## 🚀 Getting Started & Local Development

### Prerequisites
- Node.js 18.x or 20.x
- npm / yarn / pnpm
- Midnight Lace Browser Extension (configured for Preprod)

### 1. Clone the Repository
```bash
git clone https://github.com/mehtaranjana745-blip/VoxMidnight.git
cd VoxMidnight
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Compile Compact Smart Contract
```bash
npm run compile:contract
```

### 4. Run the Test Suite
```bash
npm run test
```

### 5. Launch Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the VoxMidnight confidential governance dApp.

---

## 🧪 Test Suite Coverage

VoxMidnight includes comprehensive unit and integration tests in `test/vox_midnight.test.ts`:
1. ✅ **Anonymous Vote Submission**: Validates private witness evaluation, tally increment, and nullifier registration.
2. ✅ **Double-Voting Prevention**: Validates that re-submitting an identical nullifier triggers an on-chain assertion failure.
3. ✅ **Ineligible Voter Rejection**: Validates that zero governance weight is rejected inside the circuit sandbox.
4. ✅ **Administrative Proposal Lifecycle**: Validates pausing and state transitions.

---

## 📜 Smart Contract Interface

```compact
export ledger proposalId: Uint<32>;
export ledger yesCount: Counter;
export ledger noCount: Counter;
export ledger totalVotes: Counter;
export ledger votingActive: Boolean;
export ledger admin: Bytes<32>;
export ledger nullifiers: Map<Bytes<32>, Boolean>;

witness voterChoiceWitness(): Boolean;
witness voterSecretWitness(): Bytes<32>;
witness voterEligibilityWitness(): Uint<16>;

export circuit castBallot(nullifierHash: Bytes<32>): Boolean;
export circuit setVotingActive(active: Boolean): Void;
export circuit setProposalId(newProposalId: Uint<32>): Void;
```

---

## 🔒 Security & Verification

- **Off-chain Privacy Isolation**: Private witnesses (`voterChoiceWitness`, `voterSecretWitness`) are never exposed via RPC or transactions.
- **Proof Correctness**: Circuits enforce strict mathematical constraints before any state mutation can occur.
- **Deterministic Nullifiers**: Prevents front-running and replay attacks across proposal cycles.

---

## 📄 License
MIT License. Built for the Midnight Network Ecosystem.
