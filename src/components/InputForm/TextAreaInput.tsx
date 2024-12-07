// components/inputs/TextareaInput.tsx
import React, { ChangeEvent } from 'react';

interface TextareaInputProps {
    label: string;
    id: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    required?: boolean;
    rows?: number;
}

const TextareaInput: React.FC<TextareaInputProps> = ({
    label,
    id,
    name,
    value,
    onChange,
    placeholder = '',
    required = false,
    rows = 4,
}) => (
    <div>
        <label htmlFor={id} className="block text-lg font-medium mb-2">
            {label}
        </label>
        <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder}
            rows={rows}
        ></textarea>
    </div>
);

export default TextareaInput;
