import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { FormData } from '@/types/Sos';

interface TimeInputProps {
    register: UseFormRegister<FormData>;
    name: 'startTime' | 'endTime';
    required?: boolean;
    className?: string;
}

export default function TimeInput({
    register,
    name,
    required = false,
    className = '',
}: TimeInputProps) {
    const [prevValue, setPrevValue] = useState('');

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentValue = e.target.value;

        if (
            prevValue &&
            currentValue.length === 5 &&
            prevValue.split(':')[0] === currentValue.split(':')[0]
        ) {
            e.target.blur();
        }

        setPrevValue(currentValue);
    };

    return (
        <div className="relative">
            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        fillRule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <input
                type="time"
                {...register(name, { required })}
                onChange={handleTimeChange}
                className={`bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${className}`}
            />
        </div>
    );
}
