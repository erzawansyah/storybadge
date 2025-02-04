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
    return (
        <div
            className={`relative group p-4 rounded-xl border shadow-md text-white overflow-hidden 
            transition-transform duration-300 hover:scale-105
            ${owned ? 'bg-green-900/80 border-green-500' : 'bg-red-900/80 border-red-500'}`}
        >
            {/* Gambar Badge - diperbesar */}
            <div className="mx-auto mb-3 w-32 h-32 md:w-40 md:h-40 relative flex items-center justify-center">
                {image ? (
                    <div className="max-w-64 h-64">
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                        />
                    </div>
                ) : (
                    <div className="w-full h-full rounded-full flex items-center justify-center bg-gray-700">
                        <span className="text-4xl font-bold">
                            {name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                )}
            </div>

            {/* Nama Badge (font lebih kecil) */}
            <h3 className="text-sm md:text-base font-semibold text-center">{name}</h3>

            {/* Status kepemilikan (owned / not owned) */}
            <p
                className={`mt-1 text-xs md:text-sm font-medium text-center 
                ${owned ? 'text-green-300' : 'text-red-300'}`}
            >
                {owned ? 'Owned' : 'Not Owned'}
            </p>

            {/* Link ke Explorer */}
            <div className="flex justify-center mt-2">
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://explorer.story.foundation/collections/${collectionAddress}`}
                    className="text-blue-400 hover:text-blue-600 underline text-xs md:text-sm transition-colors"
                >
                    See on Explorer
                </a>
            </div>
        </div>
    );
};

export default BadgeCards;
