'use client';
import { FC } from 'react';

/**
 * Archive mode: the wallet input is kept for context but permanently disabled.
 * The original form called `balanceOf` on chain 1516 (see src/lib/thirdweb/index.ts),
 * which no longer exists.
 */
const InputAddressForm: FC = () => {
    return (
        <div className="flex flex-col gap-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 rounded-xl shadow-lg border border-gray-700">
            <input
                type="text"
                placeholder="Enter Wallet Address"
                disabled
                aria-disabled="true"
                aria-describedby="archive-note"
                className="w-full p-3 rounded-lg bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed"
            />
            <button
                type="button"
                disabled
                className="w-full p-3 bg-gray-700 text-gray-400 font-semibold rounded-lg cursor-not-allowed"
            >
                Check My Badges (disabled)
            </button>
            <p id="archive-note" className="text-sm text-gray-300 leading-relaxed">
                The <strong>Story Odyssey testnet</strong> (chain 1516) has been shut down, so its RPC and explorer
                no longer respond and badge ownership can no longer be read on-chain. Wallet checks are disabled
                instead of showing misleading results. The badge list below is kept as a catalog of the Odyssey
                ecosystem.
            </p>
        </div>
    );
};

export default InputAddressForm;
