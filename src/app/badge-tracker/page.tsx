import { NextPage } from "next";
import NFTChecker from "./_components/NFTChecker";
import Section from "@/components/Section";

const BadgeTrackerPage: NextPage = () => {
    return (
        <Section
            title="Story Badge Tracker"
            description={
                <p className="max-w-full md:max-w-lg text-white text-center">
                    Simply enter your wallet address and click the button to see all the badges you’ve got.
                </p>
            }
            titleColor='gradient-3'
        >
            <div className="w-full md:max-w-xl lg:max-w-2xl text-white">
                <NFTChecker />
            </div>
        </Section>
    );
}

export default BadgeTrackerPage;
