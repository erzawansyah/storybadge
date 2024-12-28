"use client";
import React, { useState } from "react";
import InputAddressForm from "./InputAddressForm";
import { usePublicClient } from "wagmi";
import { storyOdyssey } from "wagmi/chains";
import { Address, parseAbiItem } from "viem";
import Link from "next/link";

interface NFTData {
    tokenId: string;
    tokenUri: string;
}

const OnChainActivitiesChecker = () => {
    const [address, setAddress] = useState<string>("");
    const [nfts, setNfts] = useState<NFTData[]>([]);
    const [finished, setFinished] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const publicClient = usePublicClient({
        chainId: storyOdyssey.id,
    });

    // ABI untuk fungsi ERC721
    const erc721Abi = [
        parseAbiItem("function balanceOf(address owner) view returns (uint256)"),
        parseAbiItem("function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)"),
        parseAbiItem("function tokenURI(uint256 tokenId) view returns (string)"),
    ];

    const fetchNFTs = async (ownerAddress: Address, contractAddress: Address) => {
        if (!publicClient) {
            console.error("Public client is not initialized.");
            return [];
        }

        try {
            // Ambil jumlah NFT yang dimiliki oleh address
            const balance = await publicClient.readContract({
                address: contractAddress,
                abi: erc721Abi,
                functionName: "balanceOf",
                args: [ownerAddress],
            });

            const tokenIds: NFTData[] = [];
            for (let i = 0; i < balance; i++) {
                const tokenId = await publicClient.readContract({
                    address: contractAddress,
                    abi: erc721Abi,
                    functionName: "tokenOfOwnerByIndex",
                    args: [ownerAddress, BigInt(i)],
                });

                // Ambil metadata URI untuk token
                const tokenUri = await publicClient.readContract({
                    address: contractAddress,
                    abi: erc721Abi,
                    functionName: "tokenURI",
                    args: [tokenId],
                });

                tokenIds.push({ tokenId: tokenId.toString(), tokenUri });
            }
            return tokenIds;
        } catch (error) {
            console.error("Error fetching NFTs:", error);
            return [];
        }
    };

    const handleSubmit = async (address: `0x${string}`) => {
        if (!publicClient) {
            console.error("Public client is not initialized.");
            return;
        }

        setFinished(false);
        setLoading(true);
        setNfts([]);

        try {
            // Validasi address
            if (!address || !address.startsWith("0x") || address.length !== 42) {
                throw new Error("Invalid Ethereum address.");
            }

            setAddress(address);

            // Ganti dengan alamat kontrak NFT ERC721
            const nftContractAddress = "0xF1232F8ec9eBF034a4dB41996e336E9dBDdC3d37"; // Ganti dengan alamat kontrak yang relevan

            // Ambil data NFT
            const nftData = await fetchNFTs(address, nftContractAddress);
            setNfts(nftData);
        } catch (error) {
            console.error("Error in handleSubmit:", error);
        } finally {
            setLoading(false);
            setFinished(true);
        }
    };

    const handleChange = () => {
        setFinished(false);
    };

    return (
        <>
            <InputAddressForm
                onChange={() => handleChange()}
                onSubmit={(address) => handleSubmit(address)}
                isLoading={loading}
                buttonColor="gradient-1"
            />
            {address && finished && nfts.length > 0 && (
                <div className="p-4 rounded-lg bg-gray-800/50 mt-4">
                    <p className="text-white text-lg mb-2">
                        Address <span className="font-mono">{address}</span> owns the following NFTs:
                    </p>
                    <ul className="text-white space-y-2">
                        {nfts.map((nft, index) => (
                            <li key={index} className="font-mono bg-gray-700/50 p-2 rounded overflow-clip">
                                Token ID: {nft.tokenId}{" "}
                                <Link
                                    className="text-blue-400 hover:underline"
                                    target="_blank"
                                    href={nft.tokenUri}
                                    rel="noreferrer"
                                >
                                    View Metadata
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default OnChainActivitiesChecker;
