import React, { useEffect, useState } from 'react';
import { usePublicClient } from 'wagmi';
import { Log } from 'viem';
import { storyOdyssey } from 'wagmi/chains';

interface TxCounterProps {
    walletAddress: string; // Alamat wallet yang ingin dihitung interaksinya
    contractAddress: string; // Alamat kontrak pintar yang ingin dianalisis
}

const TxCounter: React.FC<TxCounterProps> = ({
    walletAddress,
    contractAddress,
}) => {
    const [transactionCount, setTransactionCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const publicClient = usePublicClient({
        chainId: storyOdyssey.id,
    });

    useEffect(() => {
        const fetchTransactionCount = async () => {
            if (!publicClient) return;
            try {
                setLoading(true);

                // Ambil log transaksi dari jaringan
                const logs: Log[] = await publicClient.getLogs({
                    address: contractAddress as `0x${string}`, // Pastikan format address sesuai dengan tipe TypeScript
                    fromBlock: BigInt(0),
                    toBlock: 'latest'
                });
                console.log('Transaction logs:', logs);

                // Hitung jumlah log transaksi
                setTransactionCount(logs.length);
            } catch (error) {
                console.error('Error fetching transaction logs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactionCount();
    }, [walletAddress, contractAddress, publicClient]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <p>
                Alamat {walletAddress} telah berinteraksi dengan kontrak{' '}
                {contractAddress} sebanyak {transactionCount} kali.
            </p>
        </div>
    );
};

export default TxCounter;
