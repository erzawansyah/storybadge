'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const internalLinks = [
    { name: "Checker", href: "/", hidden: false },
    { name: "Eligibility Checker", href: "/drop", hidden: false }
];

const ecosystemLinks = "https://story.foundation/ecosystem";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-gray-900 border-b border-gray-700 py-4">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Logo */}
                <Link
                    onClick={() => setIsMenuOpen(false)}
                    href="/"
                    className="flex items-center text-2xl font-bold text-white"
                >
                    <Image src="/favicon.png" alt="Logo" width={50} height={50} />
                    <span className="ml-2">Odyssey Check</span>
                </Link>

                {/* Hamburger Menu (Mobile) */}
                <button
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-gray-400 hover:text-white focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        />
                    </svg>
                </button>

                {/* Navigation Links */}
                <nav
                    className={`${isMenuOpen ? "block px-4" : "hidden"
                        } absolute md:relative top-16 left-0 w-full md:w-auto md:top-auto md:left-auto md:block bg-gray-900 md:bg-transparent z-10`}
                >
                    <ul className="flex flex-col md:flex-row md:space-x-6 items-center justify-center space-y-4 md:space-y-0 px-6 md:px-0 py-4 md:py-0">
                        {internalLinks
                            .filter((link) => !link.hidden) // Tampilkan hanya tautan yang tidak disembunyikan
                            .map((link, index) => (
                                <li key={index}>
                                    <Link
                                        onClick={() => setIsMenuOpen(false)}
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        <li
                            className="block w-full md:w-auto px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium text-center rounded-lg mt-4 md:mt-0"
                        >
                            <Link
                                href={ecosystemLinks}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Explore
                            </Link>
                        </li>
                    </ul>
                    {/**Explore the ecosystem button */}

                </nav>
            </div>
        </header>
    );
};

export default Header;
