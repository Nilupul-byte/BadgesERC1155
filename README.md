# 🎓 CourseBadge ERC-1155 Smart Contract

This smart contract implements an ERC-1155-based achievement badge system for students who complete different phases of a course. Each phase has a unique badge represented by a specific token ID (e.g., Phase 1 → Token ID 1).

---

## 📦 Features

- ERC-1155 multi-token standard.
- Students claim badges (NFTs) upon completing course phases.
- One claim per wallet per phase (non-transferable logic can be added if needed).
- Dynamic URI generation based on baseURI + tokenId.
- IPFS used for decentralized metadata and asset storage.

---

## 🧠 Contract Overview

- `MAX_PHASE_ID`: Maximum number of course phases (set to 4).
- `claimBadge(uint256 tokenId)`: Students call this to mint a badge for the specified phase.
- `uri(uint256 tokenId)`: Returns the metadata URI for a given token ID.

---

## 🛠 Constructor Input

When deploying the contract, provide the **IPFS base URI** for metadata files as the constructor argument.
`ipfs://bafybeifcpasy4s3iupuj5uezcnpld4ra5wx2mtlv2kf7a246lnapmipgli/`
