import Link from "next/link";

const ArchiveBanner = () => (
    <div
        role="status"
        className="bg-yellow-500/15 border-b border-yellow-500/40 text-yellow-200 text-xs md:text-sm text-center px-4 py-2"
    >
        <strong>Archive:</strong> the Story Odyssey testnet (chain 1516) has ended, so live badge checks are no
        longer possible. This site is kept as a read-only archive.{" "}
        <Link
            href="https://github.com/erzawansyah/storybadge"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-yellow-100"
        >
            Read the story behind it
        </Link>
        .
    </div>
);

export default ArchiveBanner;
