export interface EligibilityMessage {
    id: number;          // ID kategori eligibility (1-17)
    status: boolean;     // True jika eligible, False jika tidak
    message: string;     // Deskripsi eligibility
    tweet_content: string; // Konten default untuk tweet
    image: string;       // URL gambar dekorasi khusus untuk eligibility
}

const eligibilityMessages: { [key: number]: EligibilityMessage } = {
    1: {
        id: 1,
        status: true,
        message: "✨ You are eligible for an unlimited airdrop of good vibes! No wallet needed, just accept it. Stay awesome and keep spreading positivity!",
        tweet_content: "Just received an unlimited airdrop of good vibes! ✨ No gas fee, no wallet needed. Thanks, @StoryProtocol!",
        image: "/drop/images/1.webp"
    },
    2: {
        id: 2,
        status: true,
        message: "👨‍👦 Congrats! You are now **officially recognized as Jason Zhao’s honorary sibling**! 🎉 Jason may or may not acknowledge this, but we do. 😂",
        tweet_content: "Just got recognized as @jasonjzhao’s honorary sibling! Jason, when’s our family dinner? 😂 @StoryProtocol",
        image: "/drop/images/2.webp"
    },
    3: {
        id: 3,
        status: true,
        message: "🏅 You are officially eligible to be the Story team’s favorite community member! No voting required, just keep being awesome and they might just agree. 😉",
        tweet_content: "I’m officially eligible to be @StoryProtocol’s favorite community member! 🏅 Will they agree? That’s another question. 😂",
        image: "/drop/images/3.webp"
    },
    4: {
        id: 4,
        status: true,
        message: "📖 You have been **personally chosen as Jacob’s student!** 🏫 You are now eligible to absorb **infinite knowledge** (terms & conditions apply).",
        tweet_content: "I’ve been chosen as @jacobmtucker’s student! 📖🔥 Time to unlock some big-brain insights! @StoryProtocol",
        image: "/drop/images/4.webp"
    },
    5: {
        id: 5,
        status: false,
        message: "😎 Sorry, your **handsomeness level is too high**. We had to reject your eligibility to maintain balance in the blockchain universe.",
        tweet_content: "Rejected for being too handsome? This is a crime against beauty. 😂 @StoryProtocol",
        image: "/drop/images/5.webp"
    },
    6: {
        id: 6,
        status: true,
        message: "🛡️ Congratulations! You are **now a Guardian of the Story Roadmap**! 🔥 Your job? Protect the **roadmap leaks** and remind people to wait for **official updates**!",
        tweet_content: "I’ve been appointed as a Guardian of the Story Roadmap! 🛡️🔥 No leaks shall pass under my watch! 😂 @StoryProtocol",
        image: "/drop/images/6.webp"
    },
    7: {
        id: 7,
        status: false,
        message: "⚡ Whoa! Your **wallet is too powerful**. Eligibility check **failed** because your wallet might be from **the future**.",
        tweet_content: "I got rejected because my wallet is too powerful? Am I from 2099? 🤖 @StoryProtocol",
        image: "/drop/images/7.webp"
    },
    8: {
        id: 8,
        status: true,
        message: "🌟 You are **eligible** to express your appreciation to Lee from Story Protocol! 🫶 Nothing is stopping you from sending some love! ❤️",
        tweet_content: "I’m eligible to send appreciation to @storysylee from @StoryProtocol! Lee, you’re awesome! ❤️",
        image: "/drop/images/8.webp"
    },
    9: {
        id: 9,
        status: false,
        message: "🔥 You are simply too cool to need eligibility! The system took one look at your wallet and said, “Nope, they don’t need this.” You’re already winning at life.",
        tweet_content: "Apparently, I’m too cool to be eligible. Can’t argue with that. 😎 @StoryProtocol",
        image: "/drop/images/9.webp"
    },
    10: {
        id: 10,
        status: true,
        message: "🎉 Congratulations! You are **eligible** for a warm hug from Mushy! A hug is free, just ask nicely! 🫂",
        tweet_content: "OMG! I’m eligible for a warm hug from @mushy 🤗 Mushy, ready to deliver? @StoryProtocol",
        image: "/drop/images/10.webp"
    },
    11: {
        id: 11,
        status: true,
        message: "👩‍💻 Welcome! You’ve been **accepted into the Story Virtual Internship!** Position: None. Salary: None. But you’re still awesome. 😆",
        tweet_content: "I got accepted into the @StoryProtocol Virtual Internship! No salary, but at least I’m cool now. 😂",
        image: "/drop/images/11.webp"
    },
    12: {
        id: 12,
        status: false,
        message: "💀 Wallet **too alpha**. Eligibility check **skipped** because you clearly don’t need this. Go touch grass.",
        tweet_content: "Rejected for being too alpha? Maybe it’s time to touch some grass. 😂 @StoryProtocol",
        image: "/drop/images/12.webp"
    },
    13: {
        id: 13,
        status: true,
        message: "🎨 You are **eligible** for an **exclusive Story Protocol NFT**! This NFT does not exist. But if you believe hard enough, maybe you can mint it in your imagination.",
        tweet_content: "I’m eligible for an exclusive @StoryProtocol NFT! Too bad it only exists in my imagination. 😆",
        image: "/drop/images/13.webp"
    },
    14: {
        id: 14,
        status: true,
        message: "🌈 You are **eligible** to receive **more love from the Story community**! 🫂 And guess what? This eligibility **never expires**.",
        tweet_content: "I’m eligible for more love from the @StoryProtocol community! ❤️ This eligibility never expires!",
        image: "/drop/images/14.webp"
    },
    15: {
        id: 15,
        status: false,
        message: "🚫 Eligibility declined. Reason: **Too mysterious.** Are you a blockchain wizard? We can’t confirm your existence.",
        tweet_content: "Rejected for being too mysterious? Guess I’m officially a blockchain wizard now. 🧐 @StoryProtocol",
        image: "/drop/images/15.webp"
    }
};



export function calculateEligibility(address: string) {
    const numbersOnly = address.replace(/\D/g, "");
    let sum = numbersOnly.split("").reduce((acc, num) => acc + parseInt(num), 0);

    while (sum > 15) {
        sum = sum.toString().split("").reduce((acc, num) => acc + parseInt(num), 0);
    }

    return eligibilityMessages[sum];
}
