"use client";
import { FC, FormEvent, useState } from "react";
import { Address } from "thirdweb";

interface Props {
  onSubmit: (address: Address) => void;
  isLoading?: boolean;
}

const EligibilityInputForm: FC<Props> = ({ onSubmit, isLoading }) => {
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const isValidAddress = (addr: string): boolean => addr.startsWith("0x") && addr.length === 42;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidAddress(address)) {
      onSubmit(address as Address);
      setError(null);
    } else {
      setError("Invalid wallet address. Please check and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4 mt-6 px-4">
      <input
        type="text"
        placeholder="Paste your wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full bg-gray-800 text-white text-center p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 transition px-6 py-2 rounded-lg text-white font-semibold"
        disabled={isLoading}
      >
        {isLoading ? "Checking..." : "Check Eligibility"}
      </button>
    </form>
  );
};

export default EligibilityInputForm;
