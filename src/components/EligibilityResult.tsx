"use client";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { EligibilityMessage } from "@/lib/story/eligibilityUtils";
import Markdown from "react-markdown";

const EligibilityResult: FC<EligibilityMessage> = ({ status, message, tweet_content, image }) => {
  const [finalResult, setFinalResult] = useState<string | null>(null);
  
  useEffect(() => {
    setTimeout(() => {
      setFinalResult(message);
    }, 500);
  }, [message]);

  return (
    <div className="w-full max-w-lg text-center flex flex-col items-center animate-fadeIn">
      {/* Gambar hasil eligibility */}
      <div className="relative w-48 h-48 animate-glitch">
        <Image
          src={image}
          alt="Eligibility Result"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Status Eligibility */}
      <h2 className={`mt-4 text-2xl font-bold ${status ? "text-green-400" : "text-red-400"} animate-glitch`}>
        {status ? "✅ ELIGIBLE" : "❌ NOT ELIGIBLE"}
      </h2>
      <Markdown className="mt-2 text-small text-white">{finalResult}</Markdown>

      {/* Tombol Copy Image & Share Twitter */}
      <div className="flex gap-4 mt-8">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet_content)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded-lg text-white font-semibold animate-glow"
        >
          Share on Twitter
        </a>
      </div>

      {/* Disclaimer & Appreciation Message */}
      <div className="mt-6 text-gray-400 text-xs text-center max-w-sm">
        <p>⚠️ This is <strong>not an official announcement from the Story team</strong>. This is just for fun! Please wait for the <em>official announcement and links</em> from the Story Protocol team.</p>
        <p className="mt-2">
          🙌 If you are a <strong>real participant</strong> and not just a farmer, and you&apos;ve truly <em>contributed and engaged</em>, be confident that your efforts will be <strong>recognized and appreciated by the team</strong>.
        </p>
      </div>
    </div>
  );
};

export default EligibilityResult;
