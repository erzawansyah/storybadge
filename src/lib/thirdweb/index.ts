import {
  Address,
  ContractOptions,
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

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string,
});

export const getRegistrationWorkflowContract =
  async (): Promise<ContractOptions> => {
    const client = createThirdwebClient({
      clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string,
    });

    const contract = getContract({
      client,
      chain: defineChain(1516),
      address: "0xde13Be395E1cd753471447Cf6A656979ef87881c",
    });

    return contract;
  };
