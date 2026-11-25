'use client';
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import InputAddressForm from './InputAddressForm';
import {
    LAST_UPDATE_INFORMATION,
    MAIN_NFT_COLLECTION_ADDRESS,
    ODYSSEY_COMMEMORATIVE_IP_COMMUNITY_NFT,
    storyBadges,
} from '@/lib/story/config';
import BadgeCards from './BadgeCards';

interface StoryBadge {
    contract_address: string;
    id: number;
    image_url: string | null;
    name: string;
}

/**
 * Archive mode of the checker.
 * Live checks are disabled; the badge data from public/badges.json is shown as a catalog.
 */
const NFTChecker: FC = () => {
    const [errors, setErrors] = useState<string | null>(null);
    const [badges, setBadges] = useState<StoryBadge[]>([]);

    useEffect(() => {
        storyBadges().then((data) => {
            if (data) {
                setBadges(data);
            } else {
                setErrors('Could not load the badge catalog.');
            }
        });
    }, []);

    return (
        <div className="grid grid-cols-1 gap-8 p-4 md:p-8">
            <InputAddressForm />

            {errors && <p className="text-red-500">{errors}</p>}

            {/* Main collections (catalog only) */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                    <h2 className="text-base md:text-lg font-semibold">Odyssey Testnet Commemorative NFT</h2>
                    <p className="mt-1 text-xs text-gray-400 font-mono break-all">{MAIN_NFT_COLLECTION_ADDRESS}</p>
                    <p className="mt-2 text-sm text-gray-300">
                        The main Odyssey NFT that the checker looked up first for every wallet.
                    </p>
                </div>
                <div className="p-4 rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 text-white flex gap-4 items-center">
                    <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                            src="/communitynft.webp"
                            alt="Story's Odyssey Commemorative IP Community NFT"
                            fill
                            sizes="80px"
                            className="object-contain rounded-lg"
                        />
                    </div>
                    <div>
                        <h2 className="text-base md:text-lg font-semibold">Commemorative IP Community NFT</h2>
                        <p className="mt-1 text-xs text-gray-400 font-mono break-all">{ODYSSEY_COMMEMORATIVE_IP_COMMUNITY_NFT}</p>
                        <p className="mt-2 text-sm text-gray-300">Sign-up event ended on February 3, 2025.</p>
                    </div>
                </div>
            </section>

            {/* Badge catalog */}
            {badges.length > 0 && (
                <section>
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
                        <h2 className="text-white text-lg">
                            Odyssey badge catalog: <span className="font-bold text-blue-400">{badges.length}</span> badges
                        </h2>
                        <p className="text-gray-400 text-sm">
                            Badge list last updated: <span className="text-white">{LAST_UPDATE_INFORMATION}</span>
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pt-4">
                        {badges.map((badge) => (
                            <BadgeCards
                                key={badge.id}
                                name={badge.name}
                                collectionAddress={badge.contract_address}
                                image={badge.image_url ?? undefined}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default NFTChecker;
