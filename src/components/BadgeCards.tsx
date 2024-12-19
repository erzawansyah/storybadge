'use client';
import Image from "next/image";
import React from "react";

interface BadgeCardProps {
    name: string;
    owned: boolean;
    collectionAddress: string;
    image?: string;
}

const BadgeCards: React.FC<BadgeCardProps> = ({
    name,
    owned,
    collectionAddress,
    image,
}) => {
    // Fungsi untuk menyalin alamat ke clipboard

    return (
        <div
            className={`relative flex flex-col md:flex-row items-center w-full p-6 rounded-xl border shadow-lg transition duration-300 ${owned
                ? 'bg-gradient-to-br from-green-900 via-green-800 to-black border-green-500 hover:shadow-green-500/50'
                : 'bg-gradient-to-br from-red-900 via-red-800 to-black border-red-500 hover:shadow-red-500/50'
                }`}
        >
            {/* Badge Image or Icon */}
            <div
                className={`hover-zoom flex items-center justify-center w-32 h-32 md:w-24 md:h-24  rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6 ${owned
                    ? 'bg-gradient-to-br from-gray-400 to-green-400'
                    : 'bg-gradient-to-br from-gray-400 to-red-400'
                    }`}
            >
                {image ? (
                    <div className="relative w-full h-full hover-zoom">
                        <Image
                            src={image || "/default-badge.png"}
                            alt={name}
                            fill
                            sizes="100px"
                            className="rounded-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                    </div>
                ) : (
                    <span className="text-white text-3xl font-bold">
                        {name.charAt(0).toUpperCase()}
                    </span>
                )}
            </div>

            {/* Badge Details */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left flex-grow">
                {/* Badge Name */}
                <h3 className="text-2xl font-semibold mb-2">{name}</h3>

                {/* Ownership Status */}
                <p
                    className={`text-lg font-medium ${owned ? 'text-green-400' : 'text-red-400'
                        }`}
                >
                    {owned ? 'Owned' : 'Not Owned'}
                </p>

                {/* Collection Address with Copy Feature */}
                <div className="flex items-center mt-4">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://explorer.story.foundation/collections/${collectionAddress}`}
                        className="text-blue-400 hover:text-blue-600 underline transition duration-300"
                    >
                        See on Explorer
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BadgeCards;
