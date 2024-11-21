import React, { useEffect, useRef, useState } from 'react';

interface DropdwonItem {
    label: string;
    onClick: () => void;
}

interface DropwonProps {
    title: React.ReactNode | string;
    items: DropdwonItem[];
}

export default function Dropdown({ title, items }: DropwonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            className="relative"
            ref={dropdownRef}
            onClick={(e) => e.stopPropagation()}
        >
            <button onClick={handleToggle}>{title}</button>
            <ul
                className={`absolute right-0 bg-white rounded-md shadow-xl p-2 transition duration-300 ease-in-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            >
                {items.map((item, idx) => (
                    <li
                        key={idx}
                        className={`py-2 px-4 rounded-md shadow-md whitespace-nowrap text-white text-xs cursor-pointer bg-point-500 transition duration-300 ease-out active:scale-90 hover:bg-point-600
														`}
                        onClick={() => {
                            item.onClick();
                            setIsOpen(false);
                        }}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}
