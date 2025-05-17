"use client";

import type { NextPage } from "next";
import { useState } from "react";
import { useWalletClient } from "wagmi";
import { ethers } from "ethers";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";

const ClaimPage: NextPage = () => {
  const [loadingTokenId, setLoadingTokenId] = useState<number | null>(null);
  const [claimed, setClaimed] = useState<number | null>(null);

  const { data: walletClient } = useWalletClient();
  const { data: courseBadge } = useScaffoldContract({ contractName: "CourseBadge" });

  const handleClaim = async (tokenId: number) => {
    try {
      setLoadingTokenId(tokenId);
      if (!walletClient || !courseBadge) throw new Error("Wallet not connected or contract missing");

      // Create a provider and signer from the walletClient
      const provider = new ethers.BrowserProvider(walletClient.transport);
      const signer = await provider.getSigner();

      // Create a new contract instance with the signer
      const contractWithSigner = new ethers.Contract(
        courseBadge.address,
        courseBadge.abi,
        signer
      );

      // Call the contract method
      const tx = await contractWithSigner.claimBadge(tokenId);
      await tx.wait();

      setClaimed(tokenId);
    } catch (err) {
      console.error("Claim failed", err);
    } finally {
      setLoadingTokenId(null);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">🎓 Claim Your Course Achievements</h1>

      {[1, 2, 3, 4].map(id => (
        <div key={id} className="mb-4">
          <button
            onClick={() => handleClaim(id)}
            disabled={loadingTokenId === id}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loadingTokenId === id
              ? "Processing..."
              : `Claim Phase 0${id} Achievement`}
          </button>

          {claimed === id && (
            <p className="text-green-600 mt-2">✅ Successfully claimed Phase 0{id}!</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ClaimPage;
