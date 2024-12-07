import React, { ChangeEvent } from 'react';

interface TextInputProps {
    label: string;
    id: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    pattern?: string;
    title?: string;
}

const TextInput: React.FC<TextInputProps> = ({
    label,
    id,
    name,
    value,
    onChange,
    placeholder = '',
    required = false,
    pattern,
    title,
}) => (
    <div>
        <label htmlFor={id} className="block text-lg font-medium mb-2">
            {label}
        </label>
        <input
            type="text"
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            pattern={pattern}
            title={title}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder}
        />
    </div>
);

export default TextInput;
