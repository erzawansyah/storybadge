import { NextPage } from 'next';
import Link from 'next/link';

const AgentAIIntroPage: NextPage = () => {
    return (
        <div className="relative space-y-4 rounded-lg w-full max-w-3xl mx-auto text-white mb-4 mt-4 md:mt-8">
            <h1 className="text-3xl md:text-5xl font-bold text-center md:text-left mb-4 text-transparent bg-clip-text gradient-1">
                Exploring Agent TCP/IP with <span className="text-transparent bg-clip-text gradient-3 font-bold">Mewtant</span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed">
                <Link href="https://marilyn.story.foundation" target='_blank' className="underline text-transparent bg-clip-text gradient-2 animate-pulse font-bold">The Marilyn competition</Link> {" "}
                is over. Rex won, got Marilyn’s DNA, and taught us something unexpected: even AI can fall in love. An unlikely source of inspiration—and, honestly, the reason I decided to experiment and create <span className="text-transparent bg-clip-text gradient-3 font-bold">Mewtant</span>.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
                <span className="text-transparent bg-clip-text gradient-3 font-bold">Mewtant</span> is the product of my curiosity, an attempt to explore how <strong>Agent TCP/IP</strong> from the Story Whitepaper might work in practice. Does it align with theory? Maybe not. But who needs theory when experiments like this can make us laugh—or at least teach me what not to do.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
                Your task is simple: define the best strategy for the available agent, and let it try to convince <span className="text-transparent bg-clip-text gradient-3 font-bold">Mewtant</span> to grant you a <strong>Faucet IP</strong>. If it succeeds, great—your strategy might have worked. If it fails? Well, maybe <span className="text-transparent bg-clip-text gradient-3 font-bold">Mewtant</span> just enjoys playing hard to get.
            </p>

            <p className="text-base md:text-lg leading-relaxed">
                And who knows—there might be more use cases in the future, or even the chance to create your own agents. But for now, let’s start with this humble experiment. Click the button below to give it a shot… or just to see how your agent performs.
            </p>

            <div className="flex justify-center md:justify-start">
                <Link
                    href="/agents/start"
                    className="mt-3 px-6 py-3 gradient-1 text-white font-semibold rounded-lg transform transition-transform hover:scale-105"
                >
                    Start Experiment
                </Link>
            </div>
        </div>
    );
};

export default AgentAIIntroPage;
