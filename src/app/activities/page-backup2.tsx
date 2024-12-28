import React from 'react';

const IntroductionPage: React.FC = () => {
    const resources = {
        Articles: [
            { title: "Oops, I Clicked It Again – A Beginner's Guide to Story Protocol", link: '/articles/beginners-guide' },
            { title: "What the Heck is an IP Asset? – A Quick Breakdown", link: '/articles/ip-assets' },
            { title: "Licensing Demystified: Don’t Let Legal Stuff Scare You", link: '/articles/licensing-demystified' },
            { title: "Royalty Sharing for Dummies (Like Me)", link: '/articles/royalty-sharing' },
        ],
        Guides: [
            { title: "How to Register Your IP Without Losing Your Sanity", link: '/guides/register-ip' },
            { title: "Batch Execution: Because Who Has Time for Single Transactions?", link: '/guides/batch-execution' },
            { title: "Making Derivatives Without Breaking Things (Too Much)", link: '/guides/making-derivatives' },
            { title: "Your Dispute Module Survival Kit", link: '/guides/dispute-survival-kit' },
        ],
        Tools: [
            { title: "NFT Checker: Did You Actually Get That Badge?", link: '/tools/nft-checker' },
            { title: "Badge Tracker: Where’s My Shiny Stuff?", link: '/tools/badge-tracker' },
            { title: "Story Ecosystem Explorer: Because Curiosity is Cool", link: '/tools/ecosystem-explorer' },
            { title: "Claimed a Badge? Now What?", link: '/tools/claimed-badge-guide' },
        ],
        "Tips & Tricks": [
            { title: "Things I Wish I Knew Before Joining the Testnet", link: '/tips/things-i-wish-i-knew' },
            { title: "My Top 5 Fails and How You Can Avoid Them", link: '/tips/top-5-fails' },
            { title: "Surviving the Testnet: A Guide to Not Losing It", link: '/tips/surviving-testnet' },
            { title: "Shortcuts I Found While Breaking Things", link: '/tips/shortcuts-from-fails' },
        ],
    };


    return (
        <div className="max-w-xl mx-auto py-10">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
                Yo, Welcome Bruh!
            </h1>
            <p className="text-gray-300 text-sm md:text-base mb-8">
                Hold on tight, folks! Here’s my not-so-genius roadmap to surviving Story Odyssey’s testnet—a chaotic medley of clicking random buttons, breaking things like a pro, and somehow stumbling my way into building tools, writing guides, and pretending I know stuff (spoiler: I barely do). This isn’t just some boring list of tips—it’s a curated masterpiece of my finest blunders and accidental successes. Who knows, maybe the things I made will actually help you? Or at least give you a laugh. You’re welcome (I think?)! 😅
            </p>
            <div className="space-y-8">
                {Object.entries(resources).map(([category, links]) => (
                    <div key={category}>
                        <h2 className="text-lg md:text-xl font-bold mb-4 text-gray-200">
                            {category}
                        </h2>
                        <ul className="space-y-2">
                            {links.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.link}
                                        className="text-pink-400 hover:underline hover:text-yellow-400 transition"
                                    >
                                        {item.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IntroductionPage;
