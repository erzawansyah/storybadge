'use client';
import { FC, useState } from 'react';
import InputAddressForm from './InputAddressForm';
import { Address } from 'thirdweb';
import { storyBadges } from '@/lib/story/badges';
import BadgeCards from './BadgeCards';
import OdysseyNFT from '@/components/OdysseyNFT';
import { getStoryBadgesContract } from '@/lib/thirdweb';

interface OwnedBadge {
    name: string;
    owned: boolean;
    collectionAddress: Address;
    image?: string;
    additional?: boolean;
}

const MAIN_NFT_COLLECTION_ADDRESS: Address = '0x505097A7c6F8E97413Db0fb4d907e8982b35dce0'; // Replace with your Main NFT contract address

const NFTChecker: FC = () => {
    const [errors, setErrors] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [badges, setBadges] = useState<OwnedBadge[]>([]);
    const [odysseyNFTOwned, setOdysseyNFTOwned] = useState<boolean | null>(null);
    const [filter, setFilter] = useState<'all' | 'owned' | 'notOwned'>('all');

    const checkOwnership = async (walletAddress: Address) => {
        setLoading(true);
        setErrors(null);
        setBadges([]);
        setOdysseyNFTOwned(null);

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
            const badgePromises = storyBadges.map(async (badge) => {
                const data = await getStoryBadgesContract(walletAddress, badge.collectionAddress);
                return {
                    name: badge.name,
                    owned: Number(data.balance) > 0,
                    collectionAddress: badge.collectionAddress,
                    image: badge.img,
                    additional: badge.additional,
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
        <div className="p-4 md:p-8">
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
                                onClick={() => setFilter('all')}
                                className={`px-4 py-2 rounded-lg transition ${filter === 'all'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter('owned')}
                                className={`px-4 py-2 rounded-lg transition ${filter === 'owned'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                            >
                                Owned <span className="text-white">({totalOwned})</span>
                            </button>
                            <button
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
                            Last Updated:{' '}
                            {/* last update 29/11/2024 - 23:19 GMT +7 */}
                            <span className="text-white">06/12/2024 20:08 GMT+7</span>
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
                        additional={badge.additional}
                    />
                ))}
            </div>
            {/* Informative Message */}
            <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm text-center">
                    Have minted but havent found your badge?{' '}
                    <a
                        href={`https://odyssey.storyscan.xyz/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-600 underline"
                    >
                        Check on Explorer
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};

export default NFTChecker;
