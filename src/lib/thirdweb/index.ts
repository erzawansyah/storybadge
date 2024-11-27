import {
  Address,
  createThirdwebClient,
  defineChain,
  getContract,
  readContract,
} from "thirdweb";

interface StoryBadgeData {
  balance: number;
}

export const getStoryBadgesContract = async (
  walletAddress: Address,
  contractAddress: Address
): Promise<StoryBadgeData> => {
  const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string,
  });

  const contract = getContract({
    client,
    chain: defineChain(1516),
    address: contractAddress,
  });

  const balance = await readContract({
    contract,
    method: "function balanceOf(address owner) view returns (uint256)",
    params: [walletAddress],
  });

  return {
    balance: Number(balance),
  };
};
