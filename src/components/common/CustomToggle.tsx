import { useState, useEffect, useRef } from 'react';
import type { UseFormRegister, UseFormWatch } from 'react-hook-form';

interface CustomToggleProps {
    name: string;
    label?: string;
    leftText: string;
    rightText: string;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    register?: UseFormRegister<any>;
    watch?: UseFormWatch<any>;
}

const CustomToggle = ({
    name,
    label,
    leftText,
    rightText,
    defaultChecked = true,
    onChange,
    register,
    watch,
}: CustomToggleProps) => {
    const [localChecked, setLocalChecked] = useState(defaultChecked);
    const maxTextLength = Math.max(leftText.length, rightText.length);
    const minWidth =
        name === 'pleaseTab'
            ? Math.max(84, maxTextLength * 18) // pleaseTab일 때 더 넓은 너비 계산
            : Math.max(64, maxTextLength * 16);

    const toggleRef = useRef<HTMLDivElement>(null);

    // name이 pleaseTab일 때의 스타일 설정
    const isPleasePage = name === 'pleaseTab';
    const toggleHeight = isPleasePage ? 'h-[44px]' : 'h-8';
    const togglePadding = isPleasePage ? 'p-0' : 'p-2';
    const textStyle = isPleasePage ? 'text-body-m font-extrabold' : '';

    const value = watch ? watch(name) : localChecked;
    const isChecked = value ?? defaultChecked;

    useEffect(() => {
        if (toggleRef.current) {
            // pleaseTab일 때 너비 계산 조정
            const transformWidth =
                name === 'pleaseTab' ? minWidth + 2 : minWidth - 4;

            toggleRef.current.style.transform = `translateX(${!isChecked ? transformWidth : -4}px)`;
        }
    }, [isChecked, minWidth, name]);

    const handleToggle = () => {
        if (!register) {
            setLocalChecked(!localChecked);
            onChange?.(!localChecked);
        }
    };

    const inputProps = register
        ? {
              ...register(name),
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  register(name).onChange(e);
                  onChange?.(e.target.checked);
              },
          }
        : {
              checked: localChecked,
              onChange: () => {
                  handleToggle();
              },
          };

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label
                    htmlFor={name}
                    className="text-label-m text-gray-500 w-fit"
                >
                    {label}
                </label>
            )}
            <label className="relative inline-flex w-fit cursor-pointer items-center">
                <input
                    type="checkbox"
                    id={name}
                    className="peer sr-only"
                    {...inputProps}
                />
                <div
                    className={`relative flex items-center ${toggleHeight} rounded-full transition-colors duration-200 bg-point-50 ${togglePadding}`}
                    style={{ width: `${minWidth * 2 + 8}px` }}
                >
                    <div
                        ref={toggleRef}
                        className={`absolute rounded-full bg-point-500 transition-transform duration-200 ease-in-out ${toggleHeight}`}
                        style={{
                            width: `${minWidth + 8}px`,
                        }}
                    />
                    <div
                        className={`relative flex w-full justify-between text-white`}
                    >
                        <span
                            className={`z-10 flex items-center justify-center ${isPleasePage ? 'px-[18px]' : 'px-2'} whitespace-nowrap transition-colors duration-200
                                ${isChecked ? 'text-white' : 'text-gray-300'} ${textStyle}`}
                            style={{ minWidth: `${minWidth}px` }}
                        >
                            {leftText}
                        </span>
                        <span
                            className={`z-10 flex items-center justify-center ${isPleasePage ? 'px-[18px]' : 'px-2'} whitespace-nowrap transition-colors duration-200
                                ${!isChecked ? 'text-white' : 'text-gray-300'} ${textStyle}`}
                            style={{ minWidth: `${minWidth}px` }}
                        >
                            {rightText}
                        </span>
                    </div>
                </div>
            </label>
        </div>
    );
};

export default CustomToggle;
