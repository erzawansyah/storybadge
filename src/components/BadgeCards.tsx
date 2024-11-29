'use client';
import Image from "next/image";

interface BadgeCardProps {
    name: string;
    owned: boolean;
    collectionAddress: string;
    image?: string;
    additional?: boolean;
}

const BadgeCards: React.FC<BadgeCardProps> = ({
    name,
    owned,
    collectionAddress,
    image,
    additional = false
}) => {
    return (
        <div
            className={`relative flex flex-col md:flex-row items-center w-full p-6 rounded-xl border shadow-lg transition duration-300 ${owned
                ? 'bg-gradient-to-br from-green-900 via-green-800 to-black border-green-500 hover:shadow-green-500/50'
                : 'bg-gradient-to-br from-red-900 via-red-800 to-black border-red-500 hover:shadow-red-500/50'
                }`}
        >
            {/* Additional Badge Indicator */}
            {additional && (
                <div className="absolute top-4 right-4">
                    <div className="relative group">
                        <span className="flex items-center justify-center w-8 h-8 bg-yellow-500 text-white text-lg font-bold rounded-full cursor-pointer">
                            !
                        </span>
                        {/* Tooltip */}
                        <div className="absolute -top-12 right-0 w-48 bg-gray-800 text-white text-sm rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="relative">
                                <span>Not confirmed as a core badge</span>
                                {/* Tooltip Arrow */}
                                <svg className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full" width="12" height="6" viewBox="0 0 12 6" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 6L0 0H12L6 6Z" fill="#4B5563" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Badge Image or Icon */}
            <div
                className={`flex items-center justify-center w-24 h-24 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6 ${owned
                    ? 'bg-gradient-to-br from-gray-400 to-green-400'
                    : 'bg-gradient-to-br from-gray-400 to-red-400'
                    }`}
            >
                {image ? (
                    <div className="relative w-full h-full">
                        <Image
                            src={`/badge_images/${image}`}
                            alt={name}
                            fill
                            sizes="100px"
                            className="rounded-full object-cover"
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

                {/* Collection Address */}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://explorer.story.foundation/collections/${collectionAddress}`}
                    className="mt-4 text-blue-400 hover:text-blue-600 underline transition duration-300"
                >
                    See on Explorer
                </a>
            </div>
        </div>
    );
};

export default BadgeCards;
