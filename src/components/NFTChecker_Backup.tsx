'use client';
import { FC, useEffect, useState } from 'react';
import InputAddressForm from './InputAddressForm';
import { Address } from 'viem';
import { LAST_UPDATE_INFORMATION, MAIN_NFT_COLLECTION_ADDRESS, storyBadges } from '@/lib/story/config';
import BadgeCards from '../app/badge-tracker/_components/BadgeCards';
import OdysseyNFT from '@/app/badge-tracker/_components/OdysseyNFT';
import { getStoryBadgesContract } from '@/lib/wagmi/checkBadge';
import { Tables } from '@/lib/supabase/database.types';

interface OwnedBadge {
    name: string;
    owned: boolean;
    collectionAddress: Address;
    image?: string;
}

type StoryBadges = Tables<'story_badges'>;

const NFTChecker: FC = () => {
    const [errors, setErrors] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [availableBadges, setAvailableBadges] = useState<StoryBadges[]>([]);

    const [filter, setFilter] = useState<'all' | 'owned' | 'notOwned'>('all');
    const [odysseyNFTOwned, setOdysseyNFTOwned] = useState<boolean | null>(null);
    const [badges, setBadges] = useState<OwnedBadge[]>([]);

    const initialClick = () => {
        setLoading(true);
        setErrors(null);
        setBadges([]);
        setOdysseyNFTOwned(null);
    }

    // Initial fetch of available badges for story
    useEffect(() => {
        // Fetch badges
        storyBadges().then((data) => {
            if (data) {
                setAvailableBadges(data);
            } else {
                setErrors('Error fetching data. Please try again.');
            }
        });
    }, []);

    const checkOwnership = async (walletAddress: Address) => {
        initialClick();

        if (!walletAddress) {
            setErrors('Missing parameters');
            setLoading(false);
            return;
        }

        if (typeof walletAddress !== 'string') {
            setErrors('Invalid address');
            setLoading(false);
            return;
        }

        try {
            // Check Main NFT Ownership
            const OdysseyNFTData = await getStoryBadgesContract(walletAddress, MAIN_NFT_COLLECTION_ADDRESS);
            setOdysseyNFTOwned(Number(OdysseyNFTData.balance) > 0);

            // Check Badge Ownership
            const badgePromises = availableBadges.map(async (badge) => {
                const data = await getStoryBadgesContract(walletAddress, badge.contract_address as Address);
                return {
                    name: badge.name,
                    owned: Number(data.balance) > 0,
                    collectionAddress: badge.contract_address as Address,
                    image: badge.image_url ? badge.image_url : undefined,
                };
            });

            const results = await Promise.all(badgePromises);
            setBadges(results);
            setLoading(false);
        } catch (error) {
            console.log(`Error fetching data: ${error}`);
            setErrors('Error fetching data. Please try again.');
            setLoading(false);
        }
    };

    const filteredBadges = badges.filter((badge) => {
        if (filter === 'owned') return badge.owned;
        if (filter === 'notOwned') return !badge.owned;
        return true;
    });

    const totalOwned = badges.filter((badge) => badge.owned).length;

    return (
        <div>
            {/* Input Address Form */}
            <InputAddressForm onSubmit={checkOwnership} isLoading={loading} />

            {/* Error Message */}
            {errors && <p className="text-red-500 mt-4">{errors}</p>}

            {/* Main NFT Status */}
            <OdysseyNFT owned={odysseyNFTOwned} />

            {/* Summary, Filter, and Last Updated */}
            {badges.length > 0 && (
                <div className="mt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                        {/* Summary */}
                        <p className="text-white text-lg">
                            You own <span className="font-bold text-green-400">{totalOwned}</span> out of{' '}
                            <span className="font-bold text-blue-400">{badges.length}</span> badges.
                        </p>

                        {/* Filter */}
                        <div className="flex gap-4 mt-4 md:mt-0">
                            <button
                                type='button'
                                onClick={() => setFilter('all')}
                                className={`px-4 py-2 rounded-lg transition ${filter === 'all'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                            >
                                All
                            </button>
                            <button
                                type='button'
                                onClick={() => setFilter('owned')}
                                className={`px-4 py-2 rounded-lg transition ${filter === 'owned'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                            >
                                Owned <span className="text-white">({totalOwned})</span>
                            </button>
                            <button
                                type='button'
                                onClick={() => setFilter('notOwned')}
                                className={`px-4 py-2 rounded-lg transition ${filter === 'notOwned'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                            >
                                Not Owned <span className="text-white">({badges.length - totalOwned})</span>
                            </button>
                        </div>
                    </div>

                    {/* Last Updated Information */}
                    <div className="flex justify-center md:justify-end">
                        <p className="text-gray-400 text-sm">
                            Last Updated: <span className="text-white">{LAST_UPDATE_INFORMATION}</span>
                        </p>
                    </div>
                </div>
            )}

            {/* Badge Cards */}
            <div className="flex flex-col md:flex-row flex-wrap gap-4 pt-4">
                {filteredBadges.map((badge, index) => (
                    <BadgeCards
                        key={index}
                        name={badge.name}
                        owned={badge.owned}
                        collectionAddress={badge.collectionAddress}
                        image={badge.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default NFTChecker;
