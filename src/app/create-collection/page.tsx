// app/create-collection/page.tsx
'use client';
import CreateCollectionForm, { FormDataInterface } from '@/components/CreateCollectionForm';
import { getSpgNftContract } from '@/lib/helpers/getSpgNftContract';
import { client, getRegistrationWorkflowContract } from '@/lib/thirdweb';
import { AddressZero } from '@story-protocol/core-sdk';
import React, { useEffect } from 'react';
import { defineChain, prepareContractCall } from 'thirdweb';
import { ConnectButton, useActiveAccount, useSendTransaction, useWaitForReceipt } from 'thirdweb/react';

const CreateCollectionPage: React.FC = () => {
    const [txHash, setTxHash] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const account = useActiveAccount();
    const {
        data: txresult,
        mutateAsync: sendAsyncTx,
    } = useSendTransaction({
        payModal: {
            theme: 'dark',
        }
    })

    const handleSubmit = async (formData: FormDataInterface) => {
        if (!account) {
            return;
        }
        const spgNftInitParams = {
            name: formData.collectionName,
            symbol: 'SPG',
            baseURI: '',
            contractURI: '',
            maxSupply: formData.totalMint,
            mintFee: BigInt(0),
            mintFeeToken: AddressZero,
            mintFeeRecipient: AddressZero,
            owner: account.address,
            mintOpen: true,
            isPublicMinting: true,
        };
        const contract = await getRegistrationWorkflowContract();
        const transaction = prepareContractCall({
            contract: contract,
            method:
                "function createCollection((string name, string symbol, string baseURI, string contractURI, uint32 maxSupply, uint256 mintFee, address mintFeeToken, address mintFeeRecipient, address owner, bool mintOpen, bool isPublicMinting) spgNftInitParams) returns (address spgNftContract)",
            params: [spgNftInitParams],
        });

        const tx = await sendAsyncTx(transaction, {
            onSuccess: (data) => {
                setTxHash(data.transactionHash);
            },
            onError: (error) => {
                setError(error.message);
            }
        })

        console.log("tx", tx);
    };


    useEffect(() => {
        if (txresult) {
            setTxHash(txresult.transactionHash);
        }
    }, [txresult]);


    return (
        <div className="min-h-screen  text-white py-10 px-6">
            <div className="container mx-auto max-w-3xl bg-gray-800 rounded-lg shadow-neon p-8">
                <h1 className="text-3xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Create New Collection
                </h1>
                {
                    account ? (
                        <CreateCollectionForm onSubmit={handleSubmit} />
                    ) : (
                        <ConnectButton
                            client={client}
                        />
                    )
                }
                {txHash && <TransactionStatus txHash={txHash as `0x${string}`} />}
                {error && <div className="text-red-500">{error}</div>}
            </div>
        </div>
    );
};

export default CreateCollectionPage;



const TransactionStatus: React.FC<{ txHash: `0x${string}` }> = ({ txHash }) => {
    const { data: receipt, isLoading } = useWaitForReceipt({
        client,
        chain: defineChain(1516),
        transactionHash: txHash
    });
    useEffect(() => {
        console.log("receipt", receipt);
        if (receipt?.logs) {
            const addresses = getSpgNftContract(receipt);
            console.log("addresses", addresses);
        }
    }, [receipt]);

    if (isLoading) {
        return <div>Processing...</div>;
    } else if (receipt) {
        return <div>Transaction successful</div>;
    } else {
        return <div>Transaction failed</div>;
    }
}

