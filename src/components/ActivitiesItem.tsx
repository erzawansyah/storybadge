import React from 'react'

interface ActivitiesItemProps {
    title: string
    description: string
    link: string
    buttonText: string
}


const ActivitiesItem: React.FC<ActivitiesItemProps> = ({
    title,
    description,
    link,
    buttonText
}) => {
    return (
        <div
            className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-neon transition duration-300"
        >
            <h2 className="text-2xl font-bold mb-4 text-gradient-to-r from-blue-400 to-purple-500">
                {title}
            </h2>
            <p className="text-sm md:text-base mb-6 text-gray-300">{description}</p>
            <a
                href={link}
                className="inline-block px-6 py-3 rounded-lg font-bold text-lg transition bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-purple-600 hover:to-indigo-600"
            >
                {buttonText}
            </a>
        </div>
    )
}

export default ActivitiesItem
