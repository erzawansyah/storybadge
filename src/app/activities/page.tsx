import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const Activities: NextPage = () => {
    return (
        <div className="text-white py-10 flex flex-col items-center">
            {/* Header */}
            <div className="w-full max-w-2xl text-center">
                {/* GIF Animation */}
                <div className="w-80 h-80 mx-auto mb-6 relative">
                    <Image
                        src="/cooking-mew.gif" // Path to your GIF file
                        alt="Cooking Animation"
                        className="rounded-lg shadow-lg"
                        fill
                    />
                </div>

                {/* Title */}
                <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-500">
                    MEW is Cooking
                </h1>

                {/* Subtitle */}
                <p className="text-gray-300 text-sm">
                    Chill out, it’s not ready yet. 🍳<br />
                    I’m cooking something for this page. Check back later… if you dare. 😏
                </p>
                <p className="text-gray-300 text-sm mt-2 italic">
                    Since this page isn’t ready, why not explore the Story ecosystem instead? Go on, I dare you.
                </p>

                {/* Explore Ecosystem Link */}
                <div className="mt-8">
                    <Link
                        href="https://story.foundation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-lg font-bold text-lg transition gradient-4 text-white hover:gradient-4-reverse hover:shadow-teal-500/50"
                    >
                        Explore the Ecosystem 🌌
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Activities;
