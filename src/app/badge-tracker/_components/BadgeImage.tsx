import Image from 'next/image'
import React from 'react'

interface BadgeImageProps {
    name: string;
    image_url: string | null;
    owned: boolean | null;
}

const BadgeImage: React.FC<BadgeImageProps> = ({
    name,
    image_url,
    owned,
}) => {
    return (
        <div
            className={`hover-zoom flex items-center justify-center aspect-square w-full rounded-full overflow-hidden ${owned
                ? 'gradient-success'
                : 'gradient-danger'
                }`}
        >
            {image_url !== null ? (
                <div className={`relative w-full h-full hover-zoom`}>
                    <div className={`absolute inset-0 flex items-center justify-center z-0 opacity-40  ${owned ? 'bg-green-600' : 'bg-red-600'}`}>
                    </div>
                    <Image
                        src={image_url || "/default-badge.png"}
                        alt={name}
                        fill
                        sizes='100%'
                        className={`rounded-full object-cover transition-transform duration-300 hover:scale-110`}
                    />
                </div>
            ) : (
                <span className="text-white text-3xl font-bold">
                    {name.charAt(0).toUpperCase()}
                </span>
            )
            }
        </div >
    )
}

export default BadgeImage
