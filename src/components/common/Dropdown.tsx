import React, { useEffect, useRef, useState } from 'react';

interface DropdownProps {
    icon: React.ReactNode; // 드롭다운을 열기 위한 라벨
    children: React.ReactNode; // 드롭다운 내부에 들어갈 내용
}

export default function Dropdown({ icon, children }: DropdownProps) {
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
            onClick={(e) => handleToggle(e)}
        >
            {icon}
            {isOpen && (
                <ul className="absolute right-0 top-[44px] flex flex-col w-[100px] rounded-lg text-gray-900 bg-white shadow-lg text-label-s font-extrabold z-20 broder-1 border-gray-100 divide-y-1 divide-gray-100 cursor-pointer">
                    {children}
                </ul>
            )}
        </div>
    );
}
