"use client";
import { http, createConfig, WagmiProvider as Provider } from 'wagmi'
import { storyOdyssey } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'



export const config = createConfig({
    chains: [storyOdyssey],
    transports: {
        [storyOdyssey.id]: http(),
    },
})

const queryClient = new QueryClient()

const WagmiProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <Provider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </Provider>
    )
}

export default WagmiProvider
