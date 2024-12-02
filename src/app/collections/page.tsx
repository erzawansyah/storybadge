'use client';

import React from 'react';
import Image from 'next/image';

interface NFTCollection {
    name: string;
    description: string;
    collectionAddress: string;
    image: string;
}

const collections: NFTCollection[] = [
    {
        name: 'We Are Frustated, Bro!',
        description: 'Why cope when you can collect? These cats scream what we all feel. Join the chaos—because frustration never looked this good!',
        collectionAddress: '0x000461Bb4E358c79d1A4A375B208343b96001313',
        image: 'we-are-frustated.gif',
    },
    {
        name: "Chibi Cosmos Collection",
        description: "30 Adorable alien creatures from distant galaxies, each with unique traits and personalities to collect!",
        collectionAddress: "0xD5cb863Dfbb1B280D76b5d41E6a2c54F6C5302a3",
        image: "chibi-cosmos.jpg",
    },
    {
        name: "I Need More F*cking IP",
        description: "A raw depiction of creative frustration with the phrase 'I Need More Fvcking IP,' resonating with creators everywhere.",
        collectionAddress: "0xCDf8c0C442Bc0d02E8c9F84632Ca727e56C04A38",
        image: "i-need-more-ip.gif",
    }
];

const NFTCollectionCard: React.FC<NFTCollection> = ({ name, description, collectionAddress, image }) => (
    <div className="flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-lg shadow-lg border border-gray-700 p-4">
        <div className="w-full flex-grow h-60 md:h-72 lg:h-80 relative overflow-hidden rounded-lg mb-4">
            <Image
                src={`/collections/${image}`}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 100vw"
            />
        </div>
        <div className='flex flex-col h-1/2'>
            <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
            <p className="flex-grow text-gray-400 mb-4">{description}</p>
            <a
                href={`https://www.colormp.com/collections/${collectionAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block max-w-1/2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mr-auto"
            >
                Buy on Color
            </a>
        </div>
    </div>
);

const NFTCollectionPage: React.FC = () => (
    <div className="min-h-screen text-white py-10 px-6">
        <div className="container mx-auto">
            <h1 className="text-3xl font-extrabold text-center mb-10">NFT Collections</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map((collection, index) => (
                    <NFTCollectionCard key={index} {...collection} />
                ))}
            </div>
        </div>
    </div>
);

export default NFTCollectionPage;
