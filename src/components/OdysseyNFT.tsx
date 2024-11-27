'use client';
import { FC } from 'react';

interface OdysseyNFTProps {
    owned: boolean | null;
}

const OdysseyNFT: FC<OdysseyNFTProps> = ({ owned }) => {
    if (owned === null) return null; // Don't render anything if the status is not available

    return (
        <div className="mt-6 p-4 rounded-lg border bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <p className="text-sm md:text-lg font-semibold">
                Odyssey Testnet Commemorative:{' '}
                <span className={`font-bold ${owned ? 'text-green-400' : 'text-red-400'}`}>
                    {owned ? 'Owned' : 'Not Owned'}
                </span>
            </p>
        </div>
    );
};

export default OdysseyNFT;
