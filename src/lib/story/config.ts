import { Address } from "thirdweb";

export const LAST_UPDATE_INFORMATION = "04/02/2025 21:34 GMT+7";

export const MAIN_NFT_COLLECTION_ADDRESS: Address =
  "0x505097A7c6F8E97413Db0fb4d907e8982b35dce0"; // Replace with your Main NFT contract address

export const ODYSSEY_COMMEMORATIVE_IP_COMMUNITY_NFT: Address = "0x012eceaf56AE189992F838B58D5E7d39Fe43338F"

export const storyBadges = async () => {
  try {
    const response = await fetch('/badges.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const badges = await response.json();
    return badges;
  } catch (error) {
    console.error("Error fetching story badges", error);
    return;
  }
};
