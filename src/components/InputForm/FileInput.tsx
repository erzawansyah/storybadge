"use client";
// components/inputs/FileInput.tsx
import React, { ChangeEvent, useState, useCallback } from 'react';
import Image from 'next/image';

interface FileInputProps {
    label: string;
    id: string;
    name: string;
    onFileChange: (file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({
    label,
    id,
    name,
    onFileChange,
}) => {
    const [photoURL, setPhotoURL] = useState<string | null>(null);

    const handleFileChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                onFileChange(file);
                setPhotoURL(URL.createObjectURL(file));
            }
        },
        [onFileChange]
    );

    const handleRemovePhoto = useCallback(() => {
        onFileChange(null);
        setPhotoURL(null);
    }, [onFileChange]);

    return (
        <div>
            <label className="block text-lg font-medium mb-2">{label}</label>
            <div className="flex items-center justify-center w-full">
                {photoURL ? (
                    <div className="relative w-32 h-32">
                        <Image
                            src={photoURL}
                            alt="Uploaded Photo"
                            fill
                            className="object-cover rounded-lg"
                        />
                        <button
                            type="button"
                            onClick={handleRemovePhoto}
                            className="absolute top-0 right-0 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300 w-[24px] h-[24px] flex justify-center items-center"
                            title="Remove Photo"
                        >
                            &times;
                        </button>
                    </div>
                ) : (
                    <label
                        htmlFor={id}
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition duration-300"
                    >
                        <svg
                            className="w-12 h-12 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 15a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4v8z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 11l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6"
                            />
                        </svg>
                        <span className="mt-2 text-gray-400">Click to upload</span>
                    </label>
                )}
                <input
                    type="file"
                    id={id}
                    name={name}
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
};

export default FileInput;
