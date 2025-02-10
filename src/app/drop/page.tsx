"use client";
import { useState } from "react";
import EligibilityInput from "@/components/EligibilityInputForm";
import EligibilityResult from "@/components/EligibilityResult";
import { Address } from "thirdweb";
import { calculateEligibility, EligibilityMessage } from "@/lib/story/eligibilityUtils";
import Image from "next/image";

const EligibilityPage = () => {
  const [eligibilityData, setEligibilityData] = useState<EligibilityMessage | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("Initializing...");

  // Variasi pesan loading
  const messages = [
    "Calculating eligibility....",
    "Fetching blockchain data...",
    "Analyzing transaction history...",
    "Verifying eligibility...",
    "Smart contract interaction detected...",
    "Unexpected input. Recalculating...",
    "Warning: Gas fee anomaly detected!",
    "Blockchain overload, retrying...",
    `Processing eligibility hash: 0x${Math.floor(Math.random() * 1000000).toString(16)}...`,
    "Eligibility matrix compromised. Attempting fix...",
    "Decrypting smart contract response...",
    "Connecting to Layer 2 nodes...",
    "Checking transaction finality...",
  ];

  const checkEligibility = (walletAddress: Address) => {
    setLoading(true);
    let messageCount = 0

    // Simulasi loading interaktif selama 20 detik
    const interval = setInterval(() => {
      messageCount += 1

      if (messageCount >= messages.length) {
        clearInterval(interval);
        const result = calculateEligibility(walletAddress);
        setEligibilityData(result);
        setLoading(false);
        return;
      }

      // Pilih pesan loading acak & angka random
      setLoadingMessage(messages[messageCount]);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center mt-4 px-4 transition-opacity duration-500">
      {/* Form hanya tampil jika belum loading & belum ada hasil */}
      {!eligibilityData && !loading && (
        <div className="max-w-lg w-full text-center transition-all duration-700 animate-fadeIn">
          <h1 className="text-3xl font-bold text-white animate-glitch">
            Check Your Eligibility
          </h1>
          <p className="mt-2 text-gray-300">
            Enter your wallet address below to check if you qualify for a special reward.
          </p>

          {/* Ilustrasi gambar saat input */}
          <div className="flex justify-center my-6">
            <Image
              src="/ip_token.png"
              alt="IP Token Logo"
              className="w-40 h-40 rounded-lg shadow-lg animate-zoomIn"
              width={160}
              height={160}
            />
          </div>

          {/* Form Input */}
          <EligibilityInput onSubmit={checkEligibility} isLoading={loading} />
        </div>
      )}

      {/* Jika loading, tampilkan efek loading dramatis */}
      {loading && (
        <div className="text-white text-lg font-semibold mt-6 text-center animate-pulseSlow">
          <p className="animate-glitchText">{loadingMessage}</p>
        </div>
      )}

      {/* Jika hasil eligibility sudah keluar, tampilkan hasilnya */}
      {eligibilityData && (
        <EligibilityResult
          id={eligibilityData.id}
          status={eligibilityData.status}
          message={eligibilityData.message}
          tweet_content={eligibilityData.tweet_content}
          image={eligibilityData.image}
        />
      )}
    </div>
  );
};

export default EligibilityPage;
