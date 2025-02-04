'use client';
import { FC, useEffect, useState } from 'react';
import InputAddressForm from './InputAddressForm';
import { Address } from 'thirdweb';
import { LAST_UPDATE_INFORMATION, MAIN_NFT_COLLECTION_ADDRESS, ODYSSEY_COMMEMORATIVE_IP_COMMUNITY_NFT, storyBadges } from '@/lib/story/config';
import BadgeCards from './BadgeCards';
import OdysseyNFT from '@/components/OdysseyNFT';
import { getStoryBadgesContract } from '@/lib/thirdweb';
import Modal from './Modal';
import Link from 'next/link';
import CIPCNFT from './CommunityNFT';

interface OwnedBadge {
    name: string;
    owned: boolean;
    collectionAddress: Address;
    image?: string;
}

interface StoryBadges {
    contract_address: string;
    id: number;
    image_url: string | null;
    name: string;
}

const NFTChecker: FC = () => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false); // Modal initial state
    const [errors, setErrors] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [availableBadges, setAvailableBadges] = useState<StoryBadges[]>([]);
    const [badges, setBadges] = useState<OwnedBadge[]>([]);
    const [odysseyNFTOwned, setOdysseyNFTOwned] = useState<boolean | null>(null);
    const [ipCommunityNft, setIpCommunityNft] = useState<boolean | null>(null);
    const [filter, setFilter] = useState<'all' | 'owned' | 'notOwned'>('all');

    // Check sessionStorage for modal state
    useEffect(() => {
        const modalClosed = sessionStorage.getItem('modalClosed');
        if (!modalClosed) {
            setTimeout(() => setModalOpen(true), 2500); // Open modal after 2.5 seconds if not closed
        }

        // Fetch badges
        storyBadges().then((data) => {
            console.log(data);
            if (data) {
                setAvailableBadges(data);
            } else {
                setErrors('Error fetching data. Please try again.');
            }
        });
    }, []);

    const handleCloseModal = () => {
        setModalOpen(false);
        sessionStorage.setItem('modalClosed', 'true'); // Store modal closed state in sessionStorage
    };

    const checkOwnership = async (walletAddress: Address) => {
        setLoading(true);
        setErrors(null);
        setBadges([]);
        setOdysseyNFTOwned(null);
        setIpCommunityNft(null);

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

            // Check Commemorative IP Community NFT
            const IpCommunityNft = await getStoryBadgesContract(walletAddress, ODYSSEY_COMMEMORATIVE_IP_COMMUNITY_NFT);
            setIpCommunityNft(Number(IpCommunityNft.balance) > 0);

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
        /* 
          Ubah layout utama menjadi grid:
          - grid-cols-1: Satu kolom di mobile
          - md:grid-cols-1: Bisa tetap satu kolom juga di tablet, silakan ubah sesuai keinginan
          - gap-8: Jarak antar elemen grid
        */
        <div className="grid grid-cols-1 gap-8 p-4 md:p-8">
            {/* Modal Announcement */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <div className="text-center space-y-2 bg-gradient-to-br rounded-xl">
                    {/* Heading */}
                    <h4 className="text-[60px]">🚀</h4>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-snug">
                        Odyssey Testnet Is Coming to an End — A New Chapter Begins!
                    </h2>

                    {/* Description */}
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                        The <strong>Odyssey Testnet</strong> will officially end on <strong>February 15, 2025</strong>.
                        But this isn&apos;t the end—it&apos;s the beginning of a new journey with the <strong>Aeneid Testnet</strong>
                        just around the corner.
                    </p>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                        Meanwhile, the countdown to <strong>Mainnet Launch</strong> has already begun.
                        Development for the mainnet is in progress, and we&apos;re getting closer than ever to
                        the public release. Stay curious, keep exploring, and be part of this evolving ecosystem!
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col gap-4 justify-center">
                        <Link
                            href="https://www.story.foundation/ecosystem"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-lg font-bold text-lg transition 
                    bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white 
                    hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 
                    shadow-lg hover:shadow-indigo-500/50"
                        >
                            Explore the Ecosystem 🌌
                        </Link>
                        <Link
                            href="/activities"
                            className="px-6 py-3 rounded-lg font-bold text-lg transition 
                    bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white 
                    hover:from-teal-600 hover:via-blue-600 hover:to-purple-600 
                    shadow-lg hover:shadow-teal-500/50"
                        >
                            Things to Explore 🛠️
                        </Link>
                    </div>
                </div>
            </Modal>


            {/* Input Address Form */}
            <InputAddressForm onSubmit={checkOwnership} isLoading={loading} />

            {/* Error Message */}
            {errors && <p className="text-red-500">{errors}</p>}

            {/* Main NFT Status */}
            <OdysseyNFT owned={odysseyNFTOwned} />

            {/* Commemorative IP Community NFT */}
            <CIPCNFT owned={ipCommunityNft} />

            {/* Summary, Filter, and Last Updated */}
            {badges.length > 0 && (
                <div>
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
                            Last Updated: <span className="text-white">{LAST_UPDATE_INFORMATION}</span>
                        </p>
                    </div>
                </div>
            )}

            {/* Badge Cards => grid 2 kolom di mobile, 3 kolom di tablet, 4 kolom di desktop */}
            {badges.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pt-4">
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
            )}

        </div>
    );
};

export default NFTChecker;