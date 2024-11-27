import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from '@vercel/analytics/next';


export const metadata: Metadata = {
  title: "Story Odyssey Badge Checker",
  description: "This tool allows you to check your NFT collection and see which Story Badges you own. Simply enter your wallet address and click the 'Check My Badges' button. Created by MEW Web3 Experiment.",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icon.png"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body
        className={`${inter.className} bg-gradient-to-b from-black via-gray-900 to-gray-800 antialiasedn flex flex-col min-h-dvh`}
      >
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow container mx-auto p-6">
          {children}
        </main>

        {/* Footer */}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
