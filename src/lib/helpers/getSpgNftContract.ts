import { TransactionReceipt } from "thirdweb/transaction";

// Fungsi untuk mendapatkan alamat kontrak SPGNFT dari logs
export const getSpgNftContract = (
  receipt: TransactionReceipt | undefined
): `0x${string}` | undefined => {
  if (receipt) {
    const logs = receipt.logs;
    const topics = logs[logs.length - 1].topics;

    if (topics.length > 0 && topics[1] !== undefined) {
      return `0x${topics[1].slice(26)}`;
    }
  }
};
