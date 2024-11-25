import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { useEffect, useRef } from 'react';

interface CustomToggleProps {
    name: string;
    label?: string;
    leftText: string;
    rightText: string;
    register: UseFormRegister<any>;
    watch?: UseFormWatch<any>;
    defaultChecked?: boolean;
}

export default function CustomToggle({
    name,
    label,
    leftText,
    rightText,
    register,
    watch,
    defaultChecked = true,
}: CustomToggleProps) {
    const maxTextLength = Math.max(leftText.length, rightText.length);
    const minWidth = Math.max(64, maxTextLength * 16);
    const toggleRef = useRef<HTMLDivElement>(null);

    const value = watch ? watch(name) : undefined;

    useEffect(() => {
        if (toggleRef.current) {
            const isChecked = value ?? defaultChecked;
            toggleRef.current.style.transform = `translateX(${!isChecked ? minWidth - 4 : -4}px)`; // 논리 반전
        }
    }, [value, defaultChecked, minWidth]);

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label
                    htmlFor={name}
                    className="text-label-m text-gray-500 w-[fit-content]"
                >
                    {label}
                </label>
            )}
            <label className="relative inline-flex w-[fit-content] cursor-pointer items-center">
                <input
                    type="checkbox"
                    {...register(name)}
                    defaultChecked={defaultChecked}
                    id={name}
                    className="peer sr-only"
                />
                <div
                    className="relative flex items-center h-8 rounded-full p-1 transition-colors duration-200 bg-point-50 peer-checked:bg-point-50"
                    style={{ width: `${minWidth * 2 + 8}px` }}
                >
                    <div
                        ref={toggleRef}
                        className="absolute h-8 rounded-full bg-point-500 transition-transform duration-200 ease-in-out"
                        style={{
                            width: `${minWidth + 8}px`,
                        }}
                    />
                    <div className="relative flex w-full justify-between text-white">
                        <span
                            className={`text-body-m z-10 flex items-center justify-center px-2 whitespace-nowrap transition-colors duration-200
                                ${(value ?? defaultChecked) ? 'text-white' : 'text-point-300'}`}
                            style={{ minWidth: `${minWidth}px` }}
                        >
                            {leftText}
                        </span>
                        <span
                            className={`text-body-m z-10 flex items-center justify-center px-2 whitespace-nowrap transition-colors duration-200
                                ${!(value ?? defaultChecked) ? 'text-white' : 'text-point-300'}`}
                            style={{ minWidth: `${minWidth}px` }}
                        >
                            {rightText}
                        </span>
                    </div>
                </div>
            </label>
        </div>
    );
}
