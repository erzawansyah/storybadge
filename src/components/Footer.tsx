import Link from "next/link";
import { SiGithub, SiX } from "react-icons/si";

const Footer = () => (
    <footer className="bg-gray-900 border-t border-gray-700 py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm text-center md:text-left">
                &copy; {new Date().getFullYear()} MEW Web3 Experiment. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-4 md:mt-0">
                <Link
                    href="https://twitter.com/mew294071"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-75 transition-opacity"
                >
                    <SiX 
                        color="#fff"
                    />
                </Link>
                <Link
                    href="https://github.com/erzawansyah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-75 transition-opacity"
                >
                    <SiGithub
                        color="#fff"
                    />
                </Link>
            </div>
        </div>
    </footer>
);

export default Footer;
