import { readContract } from "@wagmi/core";
import { Address } from "viem";
import { config } from "@/lib/wagmi/WagmiProvider";
import { useReadContract } from "wagmi";

export const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const getStoryBadgesContract = async (
  walletAddress: Address,
  contractAddress: Address
): Promise<boolean | null> => {
  try {
    // Membaca data kontrak menggunakan wagmi
    const balance = await readContract(config, {
      address: contractAddress,
      abi: abi,
      functionName: "balanceOf",
      args: [walletAddress],
    });
    const ownedStatus = BigInt(balance as string) > 0;
    return ownedStatus;
  } catch (error) {
    console.error("Error fetching contract data:", error);
    return null;
  }
};

export const useCheckBadges = (contractAddress: Address, address: Address) => {
  const result = useReadContract({
    address: contractAddress,
    abi: ["function balanceOf(address owner) view returns (uint256)"],
    functionName: "balanceOf",
    args: [address],
  });

  return result;
};
