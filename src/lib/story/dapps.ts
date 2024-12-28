import { Address } from "viem";

export interface dAppsActivityInterface {
  title: string;
  contractAddress?: Address;
  description?: string;
  identifier?: string;
}

export interface dAppsContractInterface {
  name: string;
  activity: dAppsActivityInterface[];
}

export const dAppsContract: dAppsContractInterface[] = [
  {
    name: "ColorMP",
    activity: [
      {
        title: "Buy NFT/IP Asset",
        contractAddress: "0x0be1dF4139d1592fDdD71C2479af46fF52142EF2",
        description: "Buy NFT/IP Asset from ColorMP",
      },
    ],
  },
];
