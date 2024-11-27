# Story Badge Checker

A web application for checking and managing NFT badges. Easily view which badges you own or need, and check the status of your **Main NFT**. Built with **Next.js**, **thirdweb**, and **Tailwind CSS**.

## Features

- **Badge Ownership Check**: Input your wallet address to view owned or unowned badges.
- **Main NFT Check**: See if you own the primary NFT for the project.
- **Filter Badges**: Easily filter badges by all, owned, or not owned.
- **NFT Collections**: Browse NFT collections with links to purchase badges directly.
- **Responsive Design**: Fully optimized for mobile and desktop.

## Demo

Try it out here:  
[Story Badge Checker](https://story-badge-checker.vercel.app/)

## Getting Started

### Prerequisites

- **Node.js** (v16 or later)
- **npm** or **yarn**
- A **thirdweb** client ID
- Deployed NFT contract addresses

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/erzawansyah/storybadge.git
   cd storybadge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your `.env` file:
   Create a `.env` or copy the `.env.example` file and add your **thirdweb** client ID and main NFT collection address:
   ```env
   NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_client_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open the app in your browser at `http://localhost:3000`.

### Deployment

1. Push your changes to a Git repository.
2. Connect the repository to **Vercel**.
3. Set up environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_THIRDWEB_CLIENT_ID`
4. Deploy your project with a single click.

---

## Folder Structure

Here is the folder structure of the project:

```
storybadge/
├── .next/                 # Build artifacts (auto-generated)
├── node_modules/          # Node dependencies
├── public/                # Static assets
│   └── icon.png           # App icon
├── src/                   # Source code
│   ├── app/
│   │   ├── collections/   # NFT collection pages
│   │   │   ├── page.tsx   # Collections page
│   │   │   └── layout.tsx # Layout for collections
│   │   ├── globals.css    # Global styles
│   │   └── page.tsx       # Main page
│   ├── components/        # Reusable components
│   │   ├── BadgeCards.tsx # Badge display component
│   │   ├── Footer.tsx     # Footer component
│   │   ├── Header.tsx     # Header component
│   │   ├── InputAddressForm.tsx # Address input form
│   │   ├── NFTChecker.tsx # Badge ownership checker
│   │   └── OdysseyNFT.tsx # Main NFT checker
│   ├── lib/               # Utility files
│   │   ├── story/
│   │   │   └── badges.ts  # Badge metadata
│   │   └── thirdweb/      # Thirdweb utility functions
│   │       └── index.ts   # Thirdweb API interactions
├── .env                   # Environment variables
├── .eslintrc.json         # Linter configuration
├── .gitignore             # Git ignored files
├── next.config.js         # Next.js configuration
├── package.json           # Project metadata and dependencies
├── postcss.config.mjs     # PostCSS configuration
├── README.md              # Documentation
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

---

## Usage

1. Navigate to the main page to check badge ownership.
2. Use the filter options to sort badges by all, owned, or not owned.
3. Visit the **NFT Collections** page to browse and purchase available collections.

---

## Technologies Used

- **Next.js**: Framework for building React applications.
- **thirdweb**: Blockchain SDK for interacting with NFT contracts.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Vercel**: Deployment platform.

---

## Contributing

Contributions are welcome! Feel free to fork this repository and submit a pull request with your improvements.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
