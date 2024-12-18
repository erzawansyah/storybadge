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
}) => {
    return (
        <div
            className={`relative flex flex-col md:flex-row items-center w-full p-6 rounded-xl border shadow-lg transition duration-300 ${owned
                ? 'bg-gradient-to-br from-green-900 via-green-800 to-black border-green-500 hover:shadow-green-500/50'
                : 'bg-gradient-to-br from-red-900 via-red-800 to-black border-red-500 hover:shadow-red-500/50'
                }`}
        >
            {/* Additional Badge Indicator */}

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
                            src={image}
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
