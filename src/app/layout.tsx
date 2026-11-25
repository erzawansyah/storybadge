import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArchiveBanner from "@/components/ArchiveBanner";


export const metadata: Metadata = {
  title: "Story Odyssey Badge Checker",
  description: "Archive of the community-built badge checker for the Story Odyssey testnet (Nov 2024 to Feb 2025). The testnet has ended; the badge list is kept as a catalog. Created by MEW Web3 Experiment.",
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
        {/* Archive notice (Odyssey testnet has ended) */}
        <ArchiveBanner />

        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow container mx-auto p-6">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
