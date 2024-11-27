'use client';
import { FC, FormEvent, useState } from 'react';
import { Address } from 'thirdweb';

interface InputAddressFormProps {
    onSubmit: (address: Address) => void;
    isLoading?: boolean;
}

const InputAddressForm: FC<InputAddressFormProps> = ({ onSubmit, isLoading }) => {
    const [address, setAddress] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const isValidAddress = (addr: string): boolean => {
        return addr.startsWith('0x') && addr.length === 42;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isValidAddress(address)) {
            onSubmit(address as Address);
            setError(null); // Reset error state if valid
        } else {
            setError('Invalid wallet address. Please check and try again.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 rounded-xl shadow-lg border border-gray-700"
        >
            {/* Input Field */}
            <input
                type="text"
                placeholder="Enter Wallet Address"
                value={address}
                autoComplete="off"
                onChange={(e) => setAddress(e.target.value)}
                className={`w-full p-3 rounded-lg bg-gray-800 text-white border focus:outline-none ${error
                    ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                    : 'border-gray-700 focus:ring-2 focus:ring-blue-500'
                    }`}
            />

            {/* Error Message */}
            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                className={`w-full p-3 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ${isLoading
                    ? 'opacity-70 cursor-not-allowed'
                    : 'hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 hover:shadow-blue-500/50'
                    }`}
                disabled={isLoading}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                        <span>Loading...</span>
                    </div>
                ) : (
                    'Check My Badges'
                )}
            </button>

        </form>
    );
};

export default InputAddressForm;
