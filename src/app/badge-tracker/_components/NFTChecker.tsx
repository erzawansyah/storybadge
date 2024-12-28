'use client';
import React, { useEffect, useState } from 'react';
import { Address } from 'viem';
import { useAppContext, type StoryBadgesType } from '@/lib/context/AppContext';
import { LAST_UPDATE_INFORMATION } from '@/lib/story/config';
import InputAddressForm from './InputAddressForm';
import BadgeCard from './BadgeCards';
import { getStoryBadgesContract } from '@/lib/wagmi/checkBadge';
import OdysseyNFT from './OdysseyNFT';

type OwnStatus = 'owned' | 'notOwned' | 'loading' | 'error' | 'idle';

export interface OwnableBadge extends StoryBadgesType {
    owned_status: OwnStatus;
}

const NFTChecker: React.FC = () => {
    const { storyBadges } = useAppContext();
    const [badges, setBadges] = useState<OwnableBadge[]>([]);
    const [errors, setErrors] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [filter, setFilter] = useState<'all' | 'owned' | 'notOwned'>('all');
    const [address, setAddress] = useState<Address | null>(null);

    useEffect(() => {
        if (storyBadges.length > 0) {
            const initialBadges = storyBadges.map((badge) => ({
                ...badge,
                owned_status: 'idle' as OwnStatus,
            }));
            setBadges(initialBadges);
        }
    }, [storyBadges]);

    const handleChange = () => {
        setErrors(null);
        setAddress(null);
        setLoading(false);
    };

    const checkOwnedStatus = async (walletAddress: Address) => {
        const updatedBadges = await Promise.all(
            badges.map(async (badge) => {
                const status = await getStoryBadgesContract(walletAddress, badge.contract_address as Address);
                const ownedStatus: OwnStatus = status === null ? 'error' : status ? 'owned' : 'notOwned';
                return {
                    ...badge,
                    owned_status: ownedStatus,
                };
            })
        );
        return updatedBadges;
    };


    const handleSubmit = async (walletAddress: Address) => {
        if (!walletAddress || typeof walletAddress !== 'string' || walletAddress.length !== 42) {
            setErrors('Invalid wallet address.');
            return;
        }
        setLoading(true);
        setErrors(null);
        setAddress(walletAddress);
        setBadges((prevBadges) => prevBadges.map((badge) => ({ ...badge, owned_status: 'loading' })));
        const updatedBadges = await checkOwnedStatus(walletAddress);
        setBadges(updatedBadges);
        setLoading(false);
    };


    const filteredBadges = filter === 'all' ? badges : badges.filter((badge) => (filter === 'owned' ? badge.owned_status === 'owned' : badge.owned_status === 'notOwned'));

    const totalOwned = badges.filter((badge) => badge.owned_status === 'owned').length;

    return (
        <div>
            <InputAddressForm onSubmit={handleSubmit} onChange={handleChange} isLoading={loading} />
            {errors && <p className="text-red-500 mt-4">{errors}</p>}
            {
                address && !errors && (
                    <>
                        <OdysseyNFT address={address} />
                        {badges.length > 0 && (
                            <div className="mt-6">
                                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                                    <p className="text-white text-lg">
                                        You own <span className="font-bold text-green-400">{totalOwned}</span> out of{' '}
                                        <span className="font-bold text-blue-400">{badges.length}</span> badges.
                                    </p>
                                    <div className="flex gap-4 mt-4 md:mt-0">
                                        {['all', 'owned', 'notOwned'].map((type) => (
                                            <button
                                                type='button'
                                                key={type}
                                                onClick={() => setFilter(type as typeof filter)}
                                                className={`px-4 py-2 rounded-lg transition ${filter === type
                                                    ? `bg-${type === 'owned' ? 'green' : type === 'notOwned' ? 'red' : 'blue'}-500 text-white`
                                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                    }`}
                                            >
                                                {type === 'owned'
                                                    ? `Owned (${totalOwned})`
                                                    : type === 'notOwned'
                                                        ? `Not Owned (${badges.length - totalOwned})`
                                                        : 'All'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm">
                                    Last Updated: <span className="text-white">{LAST_UPDATE_INFORMATION}</span>
                                </p>
                            </div>
                        )}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mt-6">
                            {filteredBadges.map((badge) => (
                                <BadgeCard
                                    key={badge.id}
                                    {...badge}
                                />
                            ))}
                        </div>
                    </>
                )
            }


        </div>
    );
};

export default NFTChecker;
