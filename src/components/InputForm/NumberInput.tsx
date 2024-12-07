// components/inputs/NumberInput.tsx
import React, { ChangeEvent } from 'react';

interface NumberInputProps {
    label: string;
    id: string;
    name: string;
    value: number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    min?: number;
    max?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({
    label,
    id,
    name,
    value,
    onChange,
    placeholder = '',
    required = false,
    min,
    max,
}) => (
    <div>
        <label htmlFor={id} className="block text-lg font-medium mb-2">
            {label}
        </label>
        <input
            type="number"
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            min={min}
            max={max}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder}
        />
    </div>
);

export default NumberInput;
