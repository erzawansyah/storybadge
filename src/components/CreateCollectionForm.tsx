// components/CreateCollectionForm.tsx
'use client';

import React, { useState, useCallback, useMemo } from 'react';
import TextInput from '@/components/InputForm/TextInput';
import NumberInput from '@/components/InputForm/NumberInput';
import TextareaInput from '@/components/InputForm/TextAreaInput';
import FileInput from '@/components/InputForm/FileInput';

export interface FormDataInterface {
    collectionName: string;
    description: string;
    totalMint: number;
    recipient: string;
    photo: File | null;
}

export interface CreateCollectionFormProps {
    onSubmit: (formData: FormDataInterface) => void;
}


const CreateCollectionForm: React.FC<CreateCollectionFormProps> = ({ onSubmit }) => {
    const initialFormData: FormDataInterface = useMemo(() => ({
        collectionName: '',
        description: '',
        totalMint: 1,
        recipient: '',
        photo: null,
    }), []);

    const [formData, setFormData] = useState<FormDataInterface>(initialFormData);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        },
        []
    );

    const handleFileChange = useCallback((file: File | null) => {
        setFormData((prev) => ({
            ...prev,
            photo: file,
        }));
    }, []);

    const handleReset = useCallback(() => {
        setFormData(initialFormData);
    }, [initialFormData]);

    const handleSubmitInternal = (e: React.FormEvent) => {
        e.preventDefault();

        // Validasi tambahan untuk recipient
        if (!/^0x[a-fA-F0-9]{40}$/.test(formData.recipient)) {
            alert('Recipient address is invalid. Please enter a valid Ethereum address.');
            return;
        }

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmitInternal} className="space-y-6">
            {/* Upload Foto */}
            <FileInput
                label="Upload Foto"
                id="photo"
                name="photo"
                onFileChange={handleFileChange}
            />

            {/* Collection Name */}
            <TextInput
                label="Collection Name"
                id="collectionName"
                name="collectionName"
                value={formData.collectionName}
                onChange={handleChange}
                required
                placeholder="Enter collection name"
            />

            {/* Description */}
            <TextareaInput
                label="Description"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Enter description"
                rows={4}
            />

            {/* Total Mint */}
            <NumberInput
                label="Total Mint (max 10)"
                id="totalMint"
                name="totalMint"
                value={formData.totalMint}
                onChange={handleChange}
                required
                placeholder="Enter total mint"
                min={1}
                max={10}
            />

            {/* Recipient */}
            <TextInput
                label="Recipient"
                id="recipient"
                name="recipient"
                value={formData.recipient}
                onChange={handleChange}
                required
                placeholder="0x..."
                pattern="^0x[a-fA-F0-9]{40}$"
                title="Recipient address should start with 0x followed by 40 hexadecimal characters."
            />

            {/* Submit and Reset Buttons */}
            <div className="flex justify-center space-x-4">
                <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-600 transition duration-300"
                >
                    Create Collection
                </button>
                <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition duration-300"
                >
                    Reset
                </button>
            </div>
        </form>
    );
};

export default CreateCollectionForm;
