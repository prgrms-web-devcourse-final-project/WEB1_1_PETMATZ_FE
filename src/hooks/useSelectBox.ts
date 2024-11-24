import { useState, useRef } from 'react';

export interface Option {
    value: string | number;
    label: string;
}

const useSelectBox = (
    initialOptions: Option[] = [],
    initialSelected?: Option,
    externalValue?: Option | null, // 외부에서 전달된 값
    externalOnChange?: (option: Option) => void, // 외부에서 전달된 onChange
) => {
    const [options] = useState<Option[]>(initialOptions);
    const [internalSelectedOption, setInternalSelectedOption] =
        useState<Option | null>(initialSelected || null);
    const [isOpen, setIsOpen] = useState(false);
    const selectBoxRef = useRef<HTMLDivElement>(null);

    // 선택된 옵션 (외부 값 우선 사용)
    const selectedOption = externalValue ?? internalSelectedOption;

    // 선택된 옵션 변경 (외부 onChange 우선 호출)
    const setSelectedOption = (option: Option) => {
        if (externalOnChange) {
            externalOnChange(option);
        } else {
            setInternalSelectedOption(option);
        }
    };

    // 드롭다운 열기/닫기
    const toggleSelectBox = () => {
        setIsOpen((prev) => !prev);
    };

    // 옵션 선택
    const selectOption = (option: Option) => {
        setSelectedOption(option);
        setIsOpen(false); // 드롭다운 닫기
    };

    return {
        options,
        selectedOption,
        setSelectedOption,
        isOpen,
        toggleSelectBox,
        selectOption,
        selectBoxRef,
    };
};

export default useSelectBox;
