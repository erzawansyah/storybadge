'use client';
import { useNftOwnCheck } from "@/lib/hooks/useNftOwnCheck";
import { MAIN_NFT_COLLECTION_ADDRESS } from "@/lib/story/config";
import { Address } from "viem";

interface OdysseyNFTProps {
    address: Address;
}

const OdysseyNFT: React.FC<OdysseyNFTProps> = ({ address }) => {
    const {
        owned,
        error,
        isPending,
    } = useNftOwnCheck({
        address,
        contractAddress: MAIN_NFT_COLLECTION_ADDRESS,
    });


    return (
        <div className="mt-6 p-4 rounded-lg border bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <p className="text-sm md:text-lg font-semibold">
                Odyssey Testnet Commemorative:{' '}
                {
                    error ? (
                        <span className="text-red-400">Error fetching data</span>
                    ) : isPending ? (
                        <span className="text-yellow-400">Loading...</span>
                    ) : owned ? (
                        <span className="font-bold text-green-400">Owned</span>
                    ) : (
                        <span className="font-bold text-red-400">Not Owned</span>
                    )
                }
            </p>
        </div>
    );
}

export default OdysseyNFT;
