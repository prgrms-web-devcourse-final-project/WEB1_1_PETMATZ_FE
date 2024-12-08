import { Option } from '@/hooks/useSelectBox';
import ReactDOM from 'react-dom';
import WarningIcon from '@/assets/images/warning.svg?react';
import React from 'react';

// SVG
import ArrowBottomIcon from '@/assets/images/arrow/arrowBottom.svg?react';

interface SelectBoxProps {
    id: string;
    label: string;
    design?: 'solid' | 'outline';
    options: Option[];
    className?: string;
    value?: Option | null; // 현재 선택된 값
    onChange: (option: Option) => void; // 선택 값 변경 핸들러
    toggleSelectBox: () => void;
    isOpen: boolean; // 셀렉트 박스 열림 상태
    selectBoxRef: React.RefObject<HTMLDivElement>; // 셀렉트 박스 Ref
    error?: string | null; // 에러 메시지
}

export default function SelectBox({
    id,
    label,
    design = 'solid',
    error,
    options,
    value,
    onChange,
    isOpen,
    toggleSelectBox,
    selectBoxRef,
    className = '',
}: SelectBoxProps) {
    const solidClasses = `w-full h-[48px] py-[12px] px-[24px] text-gray-400 bg-gray-100 text-body-m focus:text-point-300 active:text-point-300 hover:text-point-300 border-1 border-gray-100 ${value && 'text-gray-900'} ${error && 'border-warning-400'}`;
    const outlineClasses = `w-full h-[48px] py-[12px] px-[24px] bg-inherit border-1 border-gray-200 text-gray-400 focus:text-point-300 active:text-point-300 hover:text-point-300 focus:border-point-300 active:border-point-300 hover:border-point-300 ${value && 'text-gray-900'} ${error && 'border-warning-400'}`;
    const selectBoxClasses = `${design === 'solid' ? solidClasses : outlineClasses} cursor-pointer rounded-lg ${className}`;

    const modalContent = (
        <div
            onClick={toggleSelectBox}
            className="fixed mx-auto inset-0 z-50 bg-[rgba(0,0,0,0.8)] flex justify-center min-w-[360px] max-w-[768px] cursor-pointer"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="absolute w-full bottom-0 rounded-t-2xl bg-white"
            >
                <div className="rounded-t-2xl text-body-m text-gray-900 font-extrabold h-[52px] flex items-center justify-center">{`${label}(을/를) 선택해주세요.`}</div>
                <ul className="overflow-y-auto max-h-[192px]">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className="text-body-s hover:bg-point-100 py-[15px] px-[24px] cursor-pointer h-[48px]"
                            onClick={() => {
                                onChange(option);
                            }}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col text-gray-500 gap-[8px]">
            <label className="text-label-m" htmlFor={id}>
                {label}
            </label>
            <div className="flex flex-col gap-[4px]">
                <div
                    ref={selectBoxRef}
                    className={`${selectBoxClasses} flex justify-between items-center`}
                    onClick={toggleSelectBox}
                >
                    {value ? value.label : `${label}(을/를) 선택해주세요.`}
                    <ArrowBottomIcon />
                </div>
                <p className="text-label-s px-[24px]">
                    {error ? (
                        <span className="text-warning-400 flex items-center gap-[0.5px]">
                            <WarningIcon />
                            {error}
                        </span>
                    ) : (
                        <span>&nbsp;</span>
                    )}
                </p>
            </div>

            {isOpen && ReactDOM.createPortal(modalContent, document.body)}
        </div>
    );
}
