import { NextPage } from 'next';
import NFTChecker from '../components/NFTChecker';

const Home: NextPage = () => {
  return (
    <div className="text-white py-10 flex flex-col items-center">
      {/* Header */}
      {/* NFT Checker */}
      <div className="w-full max-w-4xl hover:shadow-neon transition duration-300">
        <h1 className="text-3xl font-extrabold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Story Badge Checker
        </h1>
        <p className='text-center text-sm md:text-base mb-6'>
          From November 2024 to February 2025 this tool let Story Odyssey testnet participants check which ecosystem badges their wallet held. The testnet has ended, so this page is now an archive and a catalog of the badges.
        </p>
        <NFTChecker />
      </div>
    </div>
  );
};

export default Home;
