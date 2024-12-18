import { Address } from "thirdweb";
import { supabase } from "@/lib/supabase/supa-client";

export const LAST_UPDATE_INFORMATION = "19/12/2024 04:13 GMT+7";

export const MAIN_NFT_COLLECTION_ADDRESS: Address =
  "0x505097A7c6F8E97413Db0fb4d907e8982b35dce0"; // Replace with your Main NFT contract address

export const storyBadges = async () => {
  const { data: badges, error } = await supabase
    .from("story_badges")
    .select("*");
  if (error) {
    console.error("Error fetching story badges", error);
    return;
  }

  return badges;
};
