import { useRef, useState } from 'react';

export interface Option {
    value: string | number;
    label: string;
}

const useSelectBox = (initialOptions: Option[] = [], initialValue?: Option) => {
    const [selectedOption, setSelectedOption] = useState<Option | null>(
        initialValue || null,
    );
    const [isOpen, setIsOpen] = useState(false);
    const selectBoxRef = useRef<HTMLDivElement>(null);

    // 드롭다운 열기/닫기 토글
    const toggleSelectBox = () => {
        setIsOpen((prev) => !prev);
    };

    // 옵션 선택
    const selectOption = (option: Option) => {
        setSelectedOption(option);
        setIsOpen(false); // 드롭다운 닫기
    };

    return {
        options: initialOptions, // 옵션 리스트
        selectedOption, // 현재 선택된 옵션
        isOpen, // 드롭다운 열림 상태
        toggleSelectBox, // 드롭다운 토글 함수
        selectOption, // 옵션 선택 함수
        selectBoxRef, // 드롭다운 참조
    };
};

export default useSelectBox;
