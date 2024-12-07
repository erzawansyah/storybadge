import {
  CreateNFTCollectionRequest,
  StoryClient,
  StoryConfig,
} from "@story-protocol/core-sdk";
import { Account, http } from "viem";

export const createSpgNftCollection = async function (
  nftCollectionConfig: CreateNFTCollectionRequest,
  account: Account | `0x${string}` | undefined
) {
  /** 1. Set up your Story Config
   * @docs https://docs.story.foundation/docs/typescript-sdk-setup
   */
  const config: StoryConfig = {
    account: account,
    transport: http("https://odyssey.storyrpc.io"),
    chainId: "odyssey",
  };
  const client = StoryClient.newClient(config);
  /** 2. Create a new SPG NFT collection
   *
   * NOTE: Use this code to create a new SPG NFT collection. You can then use the
   * `newCollection.nftContract` address as the `nftContract` argument in
   * functions like `mintAndRegisterIpAssetWithPilTerms` in the `metadataExample.ts` file.
   *
   * You will mostly only have to do this once. Once you get your nft contract address,
   * you can use it in SPG functions.
   *
   */
  const response = await client.nftClient.createNFTCollection(
    nftCollectionConfig
  );

  console.log(
    `New SPG NFT collection created at transaction hash ${response.txHash}`
  );
  console.log(`NFT contract address: ${response.spgNftContract}`);
  return response;
};
