'use client';
import Image from "next/image";
import React from "react";

interface BadgeCardProps {
    name: string;
    collectionAddress: string;
    image?: string;
}

/**
 * Catalog card for a single Odyssey badge.
 * Archive mode: no ownership status is shown because the testnet is gone.
 */
const BadgeCards: React.FC<BadgeCardProps> = ({
    name,
    collectionAddress,
    image,
}) => {
    return (
        <div
            className="relative group p-3 md:p-4 rounded-xl border shadow-md text-white overflow-hidden
            transition-transform duration-300 hover:scale-105 bg-gray-900/80 border-gray-700"
        >
            <div className="mx-auto mb-2 w-28 h-28 md:w-36 md:h-36 relative flex items-center justify-center">
                {image ? (
                    <Image
                        src={image}
                        alt={name}
                        fill
                        sizes="(max-width: 768px) 112px, 144px"
                        className="object-contain rounded-full transition-transform duration-300 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full rounded-full flex items-center justify-center bg-gray-700">
                        <span className="text-4xl font-bold">
                            {name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                )}
            </div>

            <h3 className="text-sm md:text-base font-semibold text-center">{name}</h3>

            <p
                className="mt-1 text-[10px] md:text-xs text-gray-400 text-center font-mono break-all"
                title={collectionAddress}
            >
                {collectionAddress.slice(0, 6)}...{collectionAddress.slice(-4)}
            </p>
        </div>
    );
};

export default BadgeCards;
