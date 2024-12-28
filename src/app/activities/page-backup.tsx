import OnChainActivitiesChecker from '@/components/OnChainActivitiesChecker';
import Section from '@/components/Section';
import { NextPage } from 'next';

const OnChainActivitiesCheckerPage: NextPage = () => {
    return (
        <Section
            title="On-Chain Activities Checker"
            description={
                <p className="max-w-full md:max-w-lg text-white text-center">
                    Enter your wallet address to see your on-chain activities on the Story Odyssey.
                </p>
            }
            titleColor="gradient-2"
        >
            <div className="w-full md:max-w-xl text-white">
                <OnChainActivitiesChecker />
            </div>
        </Section>
    );
};

export default OnChainActivitiesCheckerPage;
