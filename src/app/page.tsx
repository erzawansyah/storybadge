import Section from '@/components/Section';
import { NextPage } from 'next';
import Link from 'next/link';


interface ActivitiesButton {
  text: string;
  link: string;
  color: string;
  new_tab?: boolean;
}

const activitiesButton: ActivitiesButton[] = [
  { text: "Badge Tracker", link: "/badge-tracker", color: "gradient-1" },
  { text: "Try Agent AI", link: "/agents", color: "gradient-2" },
  { text: "What's Next?", link: "/activities", color: "gradient-3" },
  // { text: "Explore Story Ecosystem", link: "https://story.foundation/ecosystem", color: "gradient-4", new_tab: true },
]


const Home: NextPage = () => {
  return (
    <Section
      title="So, What Brings You Here?"
      description="Whether you’re here to flex your badges, figure out what this testnet chaos is all about, or just pretend you’ve got it all together, this is the spot. No fluff, no drama—just tools and my little experiments to (maybe) help you navigate Story Odyssey Testnet like a pro (or at least look like one)."
    >
      {/* Navigation Menu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {
          activitiesButton.map((button, index) => (
            <Link
              key={index}
              href={button.link}
              {...(button.new_tab ? { target: "_blank" } : {})}
              className={`block py-4 rounded-lg text-white text-center font-bold text-lg transition ${button.color}`}
            >
              {button.text}
            </Link>
          ))
        }
      </div>
    </Section>
  );
};

export default Home;
