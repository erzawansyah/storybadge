import { useEffect, useState } from "react";
import { Address } from "viem";
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

interface useNftOwnCheckProps {
  address: Address;
  contractAddress: Address;
}

export const useNftOwnCheck = ({
  address,
  contractAddress,
}: useNftOwnCheckProps) => {
  const [owned, setOwned] = useState<boolean | null>(null);
  const {
    data: balance,
    error,
    isPending,
  } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "balanceOf",
    args: [address],
  });

  useEffect(() => {
    if (balance !== undefined) {
      setOwned(BigInt(balance as string) > 0);
    }
  }, [balance]);

  return {
    owned,
    error,
    isPending,
  };
};
