'use client';
import Image from 'next/image';
import { FC } from 'react';

interface CIPCNFTProps {
    owned: boolean | null;
}

const CIPCNFT: FC<CIPCNFTProps> = ({ owned }) => {
    if (owned === null) return null;

    const nftName = "Story's Odyssey Commemorative IP Community NFT";

    return (
        <div 
            className="
                p-6 rounded-xl border border-gray-700 shadow-lg 
                bg-gradient-to-br from-gray-900/80 to-gray-800/70 backdrop-blur-md 
                text-white flex flex-col md:flex-row 
                items-center md:items-start text-center md:text-left 
                gap-4 transition-transform duration-300 hover:scale-105
            "
        >
            {/* NFT Image */}
            <div className="relative w-36 h-36 md:w-48 md:h-48 mx-auto md:mx-0 flex-shrink-0">
                <Image
                    alt={nftName}
                    src="/communitynft.png"
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                />
            </div>

            {/* NFT Information */}
            <div className="flex flex-col w-full">
                <h3 className="text-lg md:text-xl font-extrabold">
                    {nftName}
                </h3>

                {/* Dynamic Copywriting */}
                {owned ? (
                    <p className="text-sm md:text-base text-gray-300 mt-2 leading-relaxed">
                        <strong>Congratulations!</strong> You hold the <em>{nftName}</em>. 
                        The sign-up event officially ended on <strong>February 3, 2025</strong>, 
                        so you&apos;re part of a special group. As mainnet approaches, 
                        keep exploring the <strong>Story Protocol</strong> ecosystem 
                        to discover all it has to offer!
                    </p>
                ) : (
                    <p className="text-sm md:text-base text-gray-300 mt-2 leading-relaxed">
                        The sign-up event for the <em>{nftName}</em> ended on 
                        <strong> February 3, 2025</strong>. While this NFT is no longer claimable, 
                        there&apos;s still plenty to explore in the <strong>Story Protocol</strong> ecosystem. 
                        Dive deeper, stay informed, and get ready for what&apos;s coming next as mainnet draws near!
                    </p>
                )}

                {/* Ownership Status */}
                <span
                    className={`
                        mt-4 px-4 py-2 text-sm md:text-base font-semibold rounded-full self-center md:self-start
                        ${owned 
                            ? 'bg-green-500/20 text-green-400 border border-green-400' 
                            : 'bg-red-500/20 text-red-400 border border-red-400'
                        }
                    `}
                >
                    {owned ? '✅ You own this badge!' : '❌ You do not own this badge.'}
                </span>
            </div>
        </div>
    );
};

export default CIPCNFT;
